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
  // on console pages the side nav is the desktop navigation (the header drops its duplicate links)
  await expect(page.locator(".site-header__nav")).toBeHidden();
  const about = page.locator('.terminal-side-nav a[href="/en/#experience"]');
  await expect(about).toHaveAttribute("data-astro-prefetch", "");
  await about.click();
  await expect(page).toHaveURL(/\/en\/#experience$/);
  await expect(page.locator("#experience")).toBeVisible();
  await expect(page.locator("#experience")).not.toHaveAttribute("inert", "");
  await expect.poll(() => page.locator("#experience").evaluate((element) => element.scrollTop)).toBe(0);
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

test("desktop panels scroll inside the terminal and reset on tab changes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "desktop terminal scrolling");
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/");

  const contentHeight = await page.locator(".terminal-console__content").evaluate((element) => element.clientHeight);
  const overview = page.locator("#overview");
  const overviewState = await overview.evaluate((element) => {
    const styles = getComputedStyle(element);
    element.scrollTop = Math.min(240, element.scrollHeight - element.clientHeight);
    return {
      clientHeight: element.clientHeight,
      overflowX: styles.overflowX,
      overflowY: styles.overflowY,
      scrollHeight: element.scrollHeight,
      scrollTop: element.scrollTop,
    };
  });

  expect(overviewState.clientHeight).toBe(contentHeight);
  expect(overviewState.overflowX).toBe("hidden");
  expect(overviewState.overflowY).toBe("auto");
  expect(overviewState.scrollHeight).toBeGreaterThan(overviewState.clientHeight);
  expect(overviewState.scrollTop).toBeGreaterThan(0);

  await page.locator('[data-terminal-tab][href="#experience"]').click();
  const experience = page.locator("#experience");
  await expect.poll(() => experience.evaluate((element) => element.scrollTop)).toBe(0);
  const experienceState = await experience.evaluate((element) => {
    const styles = getComputedStyle(element);
    element.scrollTop = Math.min(180, element.scrollHeight - element.clientHeight);
    return {
      overflowX: styles.overflowX,
      overflowY: styles.overflowY,
      scrollTop: element.scrollTop,
    };
  });
  expect(experienceState).toMatchObject({ overflowX: "hidden", overflowY: "auto" });
  expect(experienceState.scrollTop).toBeGreaterThan(0);

  await page.locator('[data-terminal-tab][href="#overview"]').click();
  await expect.poll(() => overview.evaluate((element) => element.scrollTop)).toBe(0);
  await page.locator('[data-terminal-tab][href="#experience"]').click();
  await expect.poll(() => experience.evaluate((element) => element.scrollTop)).toBe(0);
});

test("tooling is a terminal panel with the tool card deck", async ({ page }) => {
  await page.goto("/en/tooling/");
  await expect(page.locator("h1")).toHaveText("Working systems, mapped.");
  const cards = page.locator("#tooling [data-card]");
  await expect(cards).toHaveCount(2);
  await expect(cards.first()).toHaveAttribute("data-suit", "tool");
  await expect(page.locator("#tooling [data-card-open]").first()).toHaveAttribute("href", "/en/work/grindlike/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  if ((page.viewportSize()?.width ?? 0) >= 1120) {
    await expect(page.locator('.terminal-side-nav a[aria-current="page"]')).toHaveText(/Tooling/);
    await expect(page.locator("#tooling [data-deck]")).toHaveClass(/is-draggable/);
  }
});

test("tool case files lead back to Tooling", async ({ page }) => {
  await page.goto("/en/work/raid-signal/");
  await page.getByRole("link", { name: "← Back to tooling" }).click();
  await expect(page).toHaveURL(/\/en\/tooling\/$/);
});

test("blog is grouped as a dated archive", async ({ page }) => {
  await page.goto("/en/blog/");
  await expect(page.locator(".blog-year").first()).toBeVisible();
  await expect(page.locator("article[lang]").first()).toBeVisible();
});

for (const path of ["/en/", "/en/tooling/", "/ru/work/ypay/", "/ru/blog/tonight-i-cry/"]) {
  test(`${path} is touch-friendly: 44px controls, no overflow, footer actions`, async ({ page }) => {
    await page.goto(path);
    const report = await page.evaluate(() => {
      const visible = (el: Element) => {
        const box = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return box.width > 0 && box.height > 0 && style.visibility !== "hidden" && !el.closest("[inert], [hidden], wa-drawer");
      };
      const controls = [...document.querySelectorAll("a, button, summary")].filter(
        (el) => visible(el) && !el.closest("p, dd, .article-prose, .proof-card, .skip-link"),
      );
      const tooSmall = controls
        .filter((el) => {
          const height = el.getBoundingClientRect().height;
          // headline links in lists only need the WCAG 2.2 AA 24px target
          return el.closest("h2, h3") ? height < 24 : height < 43.5;
        })
        .map((el) => `${el.textContent?.trim().slice(0, 24)} ${Math.round(el.getBoundingClientRect().height)}px`);
      return {
        tooSmall,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    expect(report.tooSmall).toEqual([]);
    expect(report.overflow).toBeLessThanOrEqual(1);
    const footer = page.locator(".site-footer");
    await expect(footer.getByRole("link", { name: "suren@mouchsiadis-solutions.com" })).toHaveAttribute("href", "mailto:suren@mouchsiadis-solutions.com");
    await expect(footer.getByRole("link", { name: /\(PDF\)/ })).toHaveAttribute("href", "/cv/Suren_Mouchsiadis_CV.pdf");
  });
}

for (const path of ["/en/", "/en/tooling/", "/404.html"]) {
  test(`${path} footer sits on the bottom edge, never mid-page`, async ({ page }) => {
    await page.goto(path);
    const { footerBottom, docHeight, viewport } = await page.evaluate(() => ({
      footerBottom: document.querySelector(".site-footer")!.getBoundingClientRect().bottom + scrollY,
      docHeight: document.documentElement.scrollHeight,
      viewport: innerHeight,
    }));
    expect(docHeight).toBeGreaterThanOrEqual(viewport);
    expect(Math.abs(docHeight - footerBottom)).toBeLessThanOrEqual(1);
  });
}
