import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { caseRecords } from "../src/lib/cards.ts";
import { experiences } from "../src/lib/content.ts";

// The default view for a first visit: no stored preference.
test.use({ storageState: { cookies: [], origins: [] } });

const locales = ["en", "ru", "de", "ge"] as const;

async function primaryInViewport(page: Page): Promise<number> {
  return page.locator(".button--primary").evaluateAll((nodes) =>
    nodes.filter((node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return style.display !== "none" && style.visibility === "visible" && rect.width > 0 && rect.bottom > 0 && rect.top < innerHeight;
    }).length,
  );
}

test("a first visit gets the Simple view, with the terminal chrome and cards hidden", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("data-view", "simple");
  await expect(page.locator(".terminal-chassis")).toBeHidden();
  await expect(page.locator("[data-deck]").first()).toBeHidden();
  await expect(page.locator(".work-rows").first()).toBeVisible();
  const hrefs = await page.locator(".work-row a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(hrefs.sort()).toEqual(caseRecords.map(({ entry }) => `/en/work/${entry.slug}/`).sort());
  // datasheet + pixels: every row carries its PixelLab card art, crisp
  const art = page.locator(".work-row .card-art__img");
  expect(await art.count()).toBe(caseRecords.length);
  await expect(art.first()).toHaveCSS("image-rendering", "pixelated");
  // The hero carries no buttons (owner, 22 November 2026); Contact is in the header.
  expect(await primaryInViewport(page)).toBe(0);
  await expect(page.locator(".sheet-bar")).toBeVisible();
  await expect(page.locator(".hero-spec")).toBeVisible();
});

test("the rusty switch is a named switch that boots the terminal and remembers it", async ({ page }) => {
  await page.goto("/en/");
  const lever = page.locator(".site-header [data-view-switch]");
  await expect(lever).toHaveAttribute("role", "switch");
  await expect(lever).toHaveAccessibleName("Terminal mode");
  await expect(lever).toHaveAttribute("aria-checked", "false");
  const box = (await lever.boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
  expect(await lever.evaluate((node) => node.classList.contains("button--primary"))).toBe(false);

  await lever.focus();
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveAttribute("data-view", "terminal");
  await expect(lever).toHaveAttribute("aria-checked", "true");
  await expect(page.locator(".terminal-chassis")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("interfaceView"))).toBe("terminal");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-view", "terminal");
  await page.locator(".site-header [data-view-switch]").click();
  await expect(page.locator("html")).toHaveAttribute("data-view", "simple");
  await expect(page.locator(".terminal-chassis")).toBeHidden();
});

test("a ?view= link chooses the view before first paint and is stored", async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      (window as unknown as { viewAtReady: string }).viewAtReady = document.documentElement.dataset.view ?? "";
    });
  });
  await page.goto("/en/?view=terminal");
  expect(await page.evaluate(() => (window as unknown as { viewAtReady: string }).viewAtReady)).toBe("terminal");
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("data-view", "terminal");
  await page.goto("/en/?view=simple");
  await expect(page.locator("html")).toHaveAttribute("data-view", "simple");
});

test("reduced motion stills the switch", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");
  await expect(page.locator(".site-header [data-view-switch]")).toHaveCSS("animation-name", "none");
});

for (const path of ["/en/", "/ge/", "/en/work/ylead/", "/de/work/last-standard/"]) {
  test(`${path}: the Simple view has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((item) => item.impact === "serious" || item.impact === "critical").map((item) => item.id)).toEqual([]);
  });
}

test.describe("matrix", () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "explicit viewport matrix");
  });
  for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [1280, 720], [1440, 900], [1920, 1080]] as const) {
    test(`${width}x${height}: the Simple view fits in every locale with one primary`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      for (const locale of locales) {
        for (const path of [`/${locale}/`, `/${locale}/work/neouniverse/`, `/${locale}/work/surikmods/`]) {
          await page.goto(path);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
          expect(overflow, path).toBeLessThanOrEqual(1);
          if (path.endsWith(`/${locale}/`)) expect(await primaryInViewport(page), path).toBe(0);
        }
      }
    });
  }
});

test("case files lead with an eager hero shot and describe every image", async ({ page }) => {
  await page.goto("/en/work/neo-taxi-site/");
  const hero = page.locator(".case-file__hero-shot img");
  await expect(hero).toHaveAttribute("loading", "eager");
  await expect(hero).toHaveAttribute("fetchpriority", "high");
  for (const image of await page.locator(".shot img").all()) {
    expect((await image.getAttribute("alt"))?.length, "alt text").toBeGreaterThan(0);
    expect(await image.getAttribute("width")).toBeTruthy();
    expect(await image.getAttribute("height")).toBeTruthy();
  }
  await expect(page.locator(".glance")).toContainText("Live in production");
  await expect(page.locator(".arch")).toHaveCount(0);
  await page.goto("/en/work/ylead/");
  await expect(page.locator(".arch__stage")).toHaveCount(3);
  await expect(page.locator(".case-file__hero-shot")).toHaveCount(0);
});

test("the gallery opens a lightbox that Escape closes, returning focus", async ({ page }) => {
  await page.goto("/en/work/last-standard/");
  const tiles = page.locator("[data-gallery-open]");
  await expect(tiles).toHaveCount(5);
  await tiles.first().scrollIntoViewIfNeeded();
  await tiles.first().click();
  const dialog = page.locator("[data-lightbox]");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("[data-lightbox-count]")).toHaveText("Image 1 of 5");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator("[data-lightbox-count]")).toHaveText("Image 2 of 5");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(tiles.first()).toBeFocused();
});

test("SurikMods lists its three mods with Thunderstore links", async ({ page }) => {
  await page.goto("/en/work/surikmods/");
  const parts = page.locator(".part");
  await expect(parts).toHaveCount(3);
  await expect(parts.locator("h3 a").first()).toHaveAttribute("href", /^https:\/\/thunderstore\.io\/c\/valheim\/p\/SurikMods\//);
  await expect(page.locator("body")).not.toContainText(/\bAI\b/);
});

test("every experience role carries its PixelLab art, early roles included", async ({ page }) => {
  await page.goto("/en/");
  const main = experiences.filter((entry) => !entry.early).length;
  const art = page.locator("#experience .archive-entry .card-art__img");
  await expect(page.locator("#experience .archive-grid--timeline").first().locator(".card-art__img")).toHaveCount(main);
  await page.locator("[data-early-roles] > summary").click();
  await expect(art).toHaveCount(experiences.length);
  for (const image of await art.all()) {
    await expect(image).toHaveAttribute("alt", "");
    await expect(image).toHaveCSS("image-rendering", "pixelated");
  }
});
