import { expect, test, type Page } from "@playwright/test";
import { experiences, impact } from "../src/lib/content.ts";

const locales = ["en", "ru", "de", "ge"] as const;
const slugs = [
  "ypay",
  "ydesk",
  "grindlike",
  "raid-signal",
  "regrind",
  "flygod-studios",
  "alice-plays",
  "rifle-revolver",
  "incendiary-revolver",
];

// Explicit viewport matrices run once instead of repeating under presets.
test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "explicit viewport matrix");
});

async function filledPrimariesInView(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>(".button--primary")]
      .filter((element) => {
        const box = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          box.width > 0 &&
          box.bottom > 0 &&
          box.top < innerHeight &&
          style.visibility === "visible" &&
          !element.closest("[inert], [hidden]")
        );
      })
      .map((element) => element.textContent?.trim() ?? ""),
  );
}

for (const locale of locales) {
  test(`${locale}: the landing first viewport has one primary action and visible proof`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const [width, height] of [[1440, 900], [1280, 720], [1120, 720], [1366, 650], [820, 1180], [414, 896], [390, 844], [360, 740]] as const) {
      await page.setViewportSize({ width, height });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);
      const primaries = await filledPrimariesInView(page);
      expect(primaries, `${width}x${height}: one dominant primary action`).toHaveLength(1);
      await expect(page.locator('[data-fast-path] a.button--primary[href="#contact"]')).toBeVisible();
      await expect(page.locator(".site-header__hire")).not.toHaveClass(/button--primary/);
      const proof = await page.locator("[data-proof]").first().boundingBox();
      expect(proof, `${width}x${height}: proof exists`).not.toBeNull();
      expect(proof!.y, `${width}x${height}: proof starts in the first viewport`).toBeLessThan(height);
    }
  });
}

for (const locale of locales) {
  test(`${locale}: landing controls keep 44px targets on narrow phones`, async ({ page }) => {
    for (const [width, height] of [[320, 568], [390, 844]] as const) {
      await page.setViewportSize({ width, height });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);
      const tooSmall = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("a, button, summary")]
          .filter((element) => {
            const box = element.getBoundingClientRect();
            return box.width > 0 && box.height > 0 && getComputedStyle(element).visibility !== "hidden" && !element.closest("[inert], [hidden], wa-drawer, p, dd, .skip-link");
          })
          .filter((element) => element.getBoundingClientRect().height < (element.closest("h2, h3") ? 24 : 43.5))
          .map((element) => `${element.textContent?.trim().slice(0, 24)} ${Math.round(element.getBoundingClientRect().height)}px`),
      );
      expect(tooSmall, `${width}x${height}`).toEqual([]);
    }
  });
}

test("hero proof lists exactly the live work records and states their count", async ({ page }) => {
  await page.goto("/en/");
  const proof = page.locator(".hero-proof");
  const items = proof.locator("[data-proof] a");
  await expect(items).toHaveCount(4);
  const hrefs = await items.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(hrefs).toEqual(["/en/work/ypay/", "/en/work/ydesk/", "/en/work/grindlike/", "/en/work/raid-signal/"]);
  await expect(proof.locator(".hero-proof__count")).toHaveText("04 LIVE");
  // Regrind is a prerelease: it is public work but not proof of a live system.
  await expect(proof.locator('a[href="/en/work/regrind/"]')).toHaveCount(0);
});

test("every hero impact line is backed by the experience it cites", () => {
  for (const item of impact) {
    const sources = item.sources.map((slug) => experiences.find((entry) => entry.slug === slug));
    expect(sources.every(Boolean), item.text.en).toBe(true);
    if (!item.figure) continue;
    const evidence = sources.flatMap((entry) => [entry!.summary.en, ...entry!.details.en]).join(" ");
    expect(evidence, item.text.en).toContain(item.figure.en);
  }
});

for (const locale of locales) {
  test(`${locale}: the hero keeps the English title and lists the track record`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    await expect(page.locator(".hero-panel h1")).toHaveText(/^Senior platform engineer/i);
    await expect(page.locator(".hero-impact [data-impact]")).toHaveCount(impact.length);
  });
}

test("the hero states availability and a direct email next to the primary action", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator(".hero-panel__status")).toContainText("available for systems work");
  const direct = page.locator(".hero-panel__direct a");
  await expect(direct).toHaveText("suren@mouchsiadis-solutions.com");
  await expect(direct).toHaveAttribute("href", /^mailto:suren@mouchsiadis-solutions\.com\?subject=/);
});

for (const locale of locales) {
  test(`${locale}: every case file ends with a contextual call to action`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    for (const slug of slugs) {
      await page.goto(`/${locale}/work/${slug}/`);
      const last = page.locator(".case-file > :last-child");
      await expect(last, slug).toHaveClass(/case-file__cta/);
      const action = last.locator("a.button--primary");
      await expect(action, slug).toHaveCount(1);
      const href = (await action.getAttribute("href"))!;
      expect(href, slug).toMatch(/^mailto:suren@mouchsiadis-solutions\.com\?subject=/);
      const title = (await page.locator("h1").textContent())!.trim();
      expect(decodeURIComponent(href), slug).toContain(title);
      // The header shows evidence; it never sends visitors away with a primary button.
      await expect(page.locator(".case-file__header .button--primary"), slug).toHaveCount(0);
      await expect(last.locator("[data-email-address]")).toHaveText("suren@mouchsiadis-solutions.com");
    }
  });
}

test("the open-source showcase gives each project one button and quiet links", async ({ page }) => {
  await page.goto("/en/");
  const projects = page.locator(".open-source-showcase__project");
  await expect(projects).toHaveCount(2);
  for (const project of await projects.all()) {
    await expect(project.locator(".button")).toHaveCount(1);
    await expect(project.locator(".button")).toHaveAttribute("href", /\/en\/work\//);
    await expect(project.locator(".open-source-showcase__links a")).not.toHaveCount(0);
    await expect(project.locator(".open-source-showcase__links .button")).toHaveCount(0);
  }
});

test("contact offers one email action, a visible address and a working copy button", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/#contact");
  const panel = page.locator("#contact .contact-panel");
  await expect(panel.locator("a.button--primary")).toHaveAttribute("href", /^mailto:suren@mouchsiadis-solutions\.com\?subject=/);
  await expect(panel.locator("[data-email-address]")).toHaveText("suren@mouchsiadis-solutions.com");
  const copy = panel.locator("[data-copy-email]");
  await expect(copy).toBeVisible();
  await copy.click();
  await expect(copy).toHaveText("Copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("suren@mouchsiadis-solutions.com");
  expect(await filledPrimariesInView(page)).toEqual(["Email me"]);
});

test("without JavaScript the copy button stays hidden and the address stays readable", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4322/en/work/ypay/");
  await expect(page.locator(".case-file__cta [data-copy-email]")).toBeHidden();
  await expect(page.locator(".case-file__cta [data-email-address]")).toBeVisible();
  await context.close();
});

test("reading surfaces never glow", async ({ page }) => {
  const shadows = async (selectors: string[]) =>
    page.evaluate((list) => list.flatMap((selector) => [...document.querySelectorAll(selector)].map((element) => `${selector}: ${getComputedStyle(element).textShadow}`)), selectors);
  await page.goto("/en/");
  const landing = await shadows([".hero-panel__body", ".hero-panel__direct", ".deck-card__outcome", ".section-heading__body", ".hero-proof__text > span"]);
  await page.goto("/en/work/ypay/");
  const caseFile = await shadows([".case-file h1", ".case-file h2", ".case-file p", ".case-file li", ".case-file dd"]);
  await page.goto("/ru/blog/tonight-i-cry/");
  const article = await shadows([".article-shell h1", ".article-prose p", ".article-shell__contact"]);
  const glowing = [...landing, ...caseFile, ...article].filter((entry) => !entry.endsWith(": none"));
  expect(glowing).toEqual([]);
  expect(landing.length + caseFile.length + article.length).toBeGreaterThan(20);
});

for (const [locale, family] of [["en", "Montserrat"], ["ru", "Montserrat"], ["de", "Montserrat"], ["ge", "Noto Sans Georgian"]] as const) {
  test(`${locale}: the display headline renders ${family}`, async ({ page, context }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/`);
    await page.evaluate(() => document.fonts.ready);
    const session = await context.newCDPSession(page);
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    const { root } = await session.send("DOM.getDocument");
    const { nodeId } = await session.send("DOM.querySelector", { nodeId: root.nodeId, selector: ".hero-panel h1" });
    const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
    expect(fonts.some((font) => font.isCustomFont && font.familyName.startsWith(family) && font.glyphCount > 0), fonts.map((font) => font.familyName).join(", ")).toBe(true);
  });
}

test("the 404 page speaks the requested locale and offers contact", async ({ page }) => {
  // Production nginx answers unknown paths with /404.html (deploy/nginx.conf).
  await page.route(/\/no-such-record\/$/, (route) => route.fulfill({ status: 404, path: "dist/404.html", contentType: "text/html" }));
  await page.goto("/ru/no-such-record/");
  await expect(page.locator('[data-not-found="ru"]')).toBeVisible();
  await expect(page.locator('[data-not-found="en"]')).toBeHidden();
  await expect(page.locator('[data-not-found="ru"] h1')).toHaveText("сигнал потерян");
  await expect(page.locator('[data-not-found="ru"] a.button--primary')).toHaveAttribute("href", "/ru/");
  await expect(page.locator('[data-not-found="ru"] .not-found__contact a')).toHaveAttribute("href", /^mailto:/);
  await page.goto("/no-such-record/");
  await expect(page.locator('[data-not-found="en"]')).toBeVisible();
});

test("articles end with a quiet contact line", async ({ page }) => {
  await page.goto("/de/blog/de-translation-tonight-i-cry/");
  const line = page.locator(".article-shell__contact");
  await expect(line).toContainText("Möchten Sie über ein Projekt oder eine Rolle sprechen?");
  await expect(line.locator("a")).toHaveAttribute("href", /^mailto:/);
});

test("the fanned hand never overlaps and lies flat when motion is reduced", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  await page.locator('[data-terminal-tab][href="#software-work"]').click();
  const deck = page.locator("#software-work [data-deck]");
  await expect(deck).toHaveAttribute("data-motion", "system");
  const geometry = () =>
    deck.locator("[data-card]").evaluateAll((cards) =>
      cards.map((card) => {
        const box = card.getBoundingClientRect();
        return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, rotate: getComputedStyle(card).rotate };
      }),
    );
  const fanned = await geometry();
  expect(fanned.some((card) => card.rotate !== "none")).toBe(true);
  for (const [index, card] of fanned.entries()) {
    for (const other of fanned.slice(index + 1)) {
      const overlapX = Math.min(card.right, other.right) - Math.max(card.left, other.left);
      const overlapY = Math.min(card.bottom, other.bottom) - Math.max(card.top, other.top);
      expect(overlapX > 0 && overlapY > 0, "cards in the hand never overlap").toBe(false);
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(deck).toHaveAttribute("data-motion", "reduced");
  expect((await geometry()).every((card) => card.rotate === "none")).toBe(true);
});
