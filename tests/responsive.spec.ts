import { expect, test } from "@playwright/test";

const locales = ["en", "ru", "de", "ge"];

for (const locale of locales) {
  test(`${locale} home exposes the complete archive`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("h1")).toBeVisible();
    const width = page.viewportSize()?.width ?? 1280;
    if (width >= 1120) {
      await page.locator('[data-terminal-tab][href="#software-work"]').click();
      await expect(page.locator("#software-work")).toBeVisible();
      await page.locator('[data-terminal-tab][href="#experience"]').click();
      await expect(page.locator("#experience")).toBeVisible();
      await page.locator('[data-terminal-tab][href="#contact"]').click();
      await expect(page.locator("#contact")).toBeVisible();
    } else {
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
