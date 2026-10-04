import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const viewports = [
  [320, 568], [360, 740], [375, 667], [390, 844], [414, 896],
  [844, 390], [768, 1024], [820, 1180], [1024, 768],
  [1180, 820], [1280, 720], [1440, 900], [1920, 1080],
  [1280, 650], [1366, 650],
] as const;
const locales = ["en", "ru", "de", "ge"] as const;

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "the explicit matrix already covers all viewport sizes");
  await page.emulateMedia({ reducedMotion: "reduce" });
});

async function assertContentFits(page: Page, label: string): Promise<void> {
  const report = await page.evaluate(() => {
    const visible = (element: HTMLElement): boolean => {
      if (element.closest("[inert], [hidden], .skip-link, wa-drawer")) return false;
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility === "visible" && style.opacity !== "0" && element.getClientRects().length > 0;
    };
    const describe = (element: HTMLElement): string => `${element.tagName.toLowerCase()}.${element.className}: ${element.textContent?.trim().replace(/\s+/g, " ").slice(0, 65)}`;
    const controls = [...document.querySelectorAll<HTMLElement>("a, button, summary")].filter(visible);
    return {
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      clippedControls: controls.filter((element) => element.clientWidth > 0 && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1)).map(describe),
      clippedCardFaces: [...document.querySelectorAll<HTMLElement>(".deck-card__face")].filter((element) => element.clientWidth > 0 && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1)).map(describe),
    };
  });
  expect(report.overflow, `${label}: document overflow`).toBeLessThanOrEqual(1);
  expect(report.clippedControls, `${label}: local control overflow`).toEqual([]);
  expect(report.clippedCardFaces, `${label}: card front/back overflow`).toEqual([]);
}

async function assertLandingComposition(page: Page, width: number, height: number): Promise<void> {
  const fitted = width >= 1120 && height >= 720;
  if (fitted) {
    const inactive = page.locator('[data-terminal-panel]:not(.is-active)');
    await expect(inactive).toHaveCount(5);
    for (const panel of await inactive.all()) {
      await expect(panel).toBeHidden();
      await expect(panel).toHaveAttribute("inert", "");
      await expect(panel).toHaveAttribute("aria-hidden", "true");
      // Visibility is inherited by actual links as well as the container.
      for (const link of await panel.locator("a, button").all()) await expect(link).toBeHidden();
    }
  } else {
    const panels = await page.locator("[data-terminal-panel]").evaluateAll((elements) => elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom, visibility: getComputedStyle(element).visibility, inert: (element as HTMLElement).inert };
    }));
    for (const [index, panel] of panels.entries()) {
      expect(panel.visibility).toBe("visible");
      expect(panel.inert).toBe(false);
      if (index) expect(panel.top).toBeGreaterThanOrEqual(panels[index - 1]!.bottom - 1);
    }
  }
  // Short landscape is deliberately a scrolling composition. Every other
  // documented viewport must expose the hiring actions before any interaction.
  if (height >= 568) {
    for (const selector of ['[data-fast-path] a[href="#contact"]', '[data-fast-path] a[href$=".pdf"]', '[data-fast-path] a[href="#software-work"]']) {
      const box = await page.locator(selector).boundingBox();
      expect(box, selector).not.toBeNull();
      expect(box!.y, selector).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height, `${selector}: first viewport`).toBeLessThanOrEqual(height);
    }
  }
}

for (const locale of locales) {
  for (const [width, height] of viewports) {
    test(`${locale} ${width}x${height}: primary pages remain readable and navigable`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      for (const suffix of ["", "tooling/", "work/regrind/", "blog/"]) {
        const path = `/${locale}/${suffix}`;
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await assertContentFits(page, path);
        if (!suffix) {
          await assertLandingComposition(page, width, height);
          for (const id of ["software-work", "game-dev"]) {
            if (width >= 1120 && height >= 720) await page.locator(`[data-terminal-tab][href="#${id}"]`).click();
            const deck = page.locator(`#${id} [data-deck]`);
            await assertContentFits(page, `${path}#${id}`);
            const flip = deck.locator("[data-card-flip]").first();
            await flip.scrollIntoViewIfNeeded();
            const before = await flip.boundingBox();
            await flip.click();
            await expect(flip).toHaveAttribute("aria-pressed", "true");
            const after = await flip.boundingBox();
            expect(Math.abs(after!.y - before!.y), `${id}: flipping must not move its controls`).toBeLessThanOrEqual(1);
            await assertContentFits(page, `${path}#${id} (back face)`);
            await deck.locator('[data-deck-view="list"]').click();
            await assertContentFits(page, `${path}#${id} (List)`);
            await deck.locator('[data-deck-view="cards"]').click();
          }
        }
      }
    });
  }
}

for (const [width, height] of viewports) {
  test(`${width}x${height}: original Russian and German articles preserve readable layouts`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    for (const path of ["/ru/blog/tonight-i-cry/", "/de/blog/de-translation-tonight-i-cry/"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await assertContentFits(page, path);
      await expect(page.locator(".article-prose")).toBeVisible();
      const bounds = await page.locator(".article-prose").boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    }
  });
}

async function assertAccessible(page: Page): Promise<void> {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const violations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");
  expect(violations, violations.map(({ id, help, nodes }) => `${id}: ${help}: ${nodes.map((node) => node.target.join(" ")).join(", ")}`).join("\n")).toEqual([]);
}

for (const state of ["software-work", "game-dev", "list", "drawer", "contact"] as const) {
  test(`Georgian ${state} has no serious accessibility violations`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/ge/");
    if (state === "drawer") await page.locator("[data-drawer-open]").click();
    else {
      await page.locator(`[data-terminal-tab][href="#${state === "list" ? "software-work" : state}"]`).click();
      if (state === "list") {
        await page.locator('#software-work [data-deck-view="list"]').click();
        await page.locator("#software-work .archive-entry summary").first().click();
      }
    }
    await assertAccessible(page);
  });
}

for (const path of ["/ge/tooling/", "/ge/work/regrind/", "/ge/blog/", "/ru/blog/tonight-i-cry/", "/de/blog/de-translation-tonight-i-cry/"]) {
  test(`${path} has no serious accessibility violations at narrow phone width`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(path);
    await assertAccessible(page);
  });
}
