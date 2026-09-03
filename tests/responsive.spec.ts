import { expect, test } from "@playwright/test";

const locales = ["en", "ru", "de", "ge"];

for (const locale of locales) {
  test(`${locale} home exposes the complete archive`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toBeVisible();
    const width = page.viewportSize()?.width ?? 1280;
    if (width >= 1120) {
      const terminal = await page.locator(".terminal-console").boundingBox();
      expect(terminal ? terminal.y + terminal.height : Number.POSITIVE_INFINITY).toBeLessThanOrEqual(page.viewportSize()?.height ?? 720);

      const portrait = await page.locator(".signal-card__portrait").boundingBox();
      expect(Math.abs((portrait?.width ?? 0) - (portrait?.height ?? 1))).toBeLessThanOrEqual(1);

      await page.locator('[data-terminal-tab][href="#software-work"]').click();
      await expect(page.locator("#software-work")).toBeVisible();
      await expect(page.locator("#software-work")).not.toHaveAttribute("inert", "");
      await expect(page.locator("#overview")).toHaveAttribute("inert", "");
      await expect(page.locator("#overview")).toHaveAttribute("aria-hidden", "true");
      await page.locator('[data-terminal-tab][href="#experience"]').click();
      await expect(page.locator("#experience")).toBeVisible();
      await page.locator('[data-terminal-tab][href="#contact"]').click();
      await expect(page.locator("#contact")).toBeVisible();
    } else {
      const portrait = await page.locator(".signal-card__portrait").boundingBox();
      expect(Math.abs((portrait?.width ?? 0) - (portrait?.height ?? 1))).toBeLessThanOrEqual(1);
      await expect(page.locator("#software-work")).toBeVisible();
      await expect(page.locator("#experience")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("menu exposes navigation, languages, and preferences", async ({ page }) => {
  await page.goto("/en");
  const width = page.viewportSize()?.width ?? 1280;
  await page.getByRole("button", { name: width <= 767 ? "Menu" : "Options" }).click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).last()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Languages" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Interface options" })).toBeVisible();
});

test("Tooling to About uses the prefetched direct route", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1120, "desktop primary navigation");
  await page.goto("/en/tooling/");
  const about = page.locator('.site-header__nav a[href="/en/#experience"]');
  await expect(about).toHaveAttribute("data-astro-prefetch", "");
  await about.click();
  await expect(page).toHaveURL(/\/en\/#experience$/);
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#experience")).not.toHaveAttribute("inert", "");
});

test("desktop terminal fits common laptop and monitor heights", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop sizing matrix");
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/en/");
    const terminal = await page.locator(".terminal-console").boundingBox();
    expect(terminal ? terminal.y + terminal.height : Number.POSITIVE_INFINITY).toBeLessThanOrEqual(viewport.height);
    const portrait = await page.locator(".signal-card__portrait").boundingBox();
    expect(Math.abs((portrait?.width ?? 0) - (portrait?.height ?? 1))).toBeLessThanOrEqual(1);
  }
});

test("desktop tab state changes synchronously with only a short fade", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop tab controller");
  await page.goto("/en/");
  const state = await page.evaluate(() => {
    document.querySelector<HTMLAnchorElement>('[data-terminal-tab][href="#experience"]')?.click();
    const active = document.querySelector<HTMLElement>("#experience");
    const previous = document.querySelector<HTMLElement>("#overview");
    return {
      active: active?.classList.contains("is-active"),
      activeInert: active?.inert,
      previousInert: previous?.inert,
      duration: active ? Number.parseFloat(getComputedStyle(active).transitionDuration) * 1000 : Infinity,
    };
  });
  expect(state).toMatchObject({ active: true, activeInert: false, previousInert: true });
  expect(state.duration).toBeLessThanOrEqual(120);
});

test("tooling uses touch-first records on mobile", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1280) > 720, "phone composition");
  await page.goto("/en/tooling/");
  await expect(page.locator(".atlas-mobile-list")).toBeVisible();
  await expect(page.locator(".atlas-index")).toBeHidden();
  await expect(page.locator(".atlas-mobile-list details")).toHaveCount(5);
});

test("blog is grouped as a dated archive", async ({ page }) => {
  await page.goto("/en/blog/");
  await expect(page.locator(".blog-year").first()).toBeVisible();
  await expect(page.locator("article[lang]").first()).toBeVisible();
});
