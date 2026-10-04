import { expect, test } from "@playwright/test";

// The full browser projects cover normal interaction. These scenarios target
// transitions and degraded states that static viewport screenshots miss.
test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "run transition scenarios once");
});

for (const locale of ["en", "ru", "de", "ge"]) {
  test(`${locale}: phone hiring and Work links scroll without hiding the archive`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const target of ["contact", "software-work"]) {
      await page.goto(`/${locale}/`);
      await page.locator(`[data-fast-path] a[href="#${target}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${target}$`));
      await expect(page.locator(`#${target} h2`).first()).toBeInViewport();
      await expect(page.locator("[data-terminal-panel][inert], [data-terminal-panel][aria-hidden=true]")).toHaveCount(0);
    }
  });
}

test("short wide laptops expose separate, scrollable sections", async ({ page }) => {
  for (const viewport of [{ width: 1280, height: 650 }, { width: 1366, height: 650 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/ge/");
    const sections = await page.locator("[data-terminal-panel]").evaluateAll((elements) => elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom, position: getComputedStyle(element).position, inert: (element as HTMLElement).inert };
    }));
    for (const [index, section] of sections.entries()) {
      expect(section.position).not.toBe("absolute");
      expect(section.inert).toBe(false);
      if (index) expect(section.top).toBeGreaterThanOrEqual(sections[index - 1]!.bottom);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  }
});

test("resizing restores all content and updates the card reader", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en/");
  await page.locator('[data-terminal-tab][href="#software-work"]').click();
  const deck = page.locator("#software-work [data-deck]");
  await expect(deck).toHaveClass(/is-draggable/);
  await expect(deck).not.toHaveClass(/is-fanned/);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("[data-terminal-panel][inert]")).toHaveCount(0);
  for (const panel of await page.locator("[data-terminal-panel]").all()) await expect(panel).toBeVisible();
  await expect(deck).not.toHaveClass(/is-draggable/);
  await expect(deck.locator("[data-card-reader]")).toBeHidden();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator("#software-work")).not.toHaveAttribute("inert", "");
  await expect(page.locator("#overview")).toHaveAttribute("inert", "");
  await expect(deck).toHaveClass(/is-draggable/);
});

test("keyboard fast path moves focus out of the hidden hero and Back restores the panel", async ({ page }) => {
  await page.goto("/en/");
  const contact = page.locator('[data-fast-path] a[href="#contact"]');
  await contact.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contact h2").first()).toBeFocused();
  await expect(page.locator("#overview")).toHaveAttribute("inert", "");
  await page.locator('[data-terminal-tab][href="#software-work"]').click();
  await page.goBack();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).not.toHaveAttribute("inert", "");
});

test("content and navigation remain usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  for (const locale of ["en", "ge"]) {
    await page.goto(`http://127.0.0.1:4322/${locale}/`);
    for (const panel of await page.locator("[data-terminal-panel]").all()) await expect(panel).toBeVisible();
    await expect(page.locator(".site-header__nav")).toBeVisible();
    await expect(page.locator(".site-header .locale-switcher")).toBeVisible();
    await expect(page.locator("[data-drawer-open]")).toBeHidden();
    await expect(page.locator('[data-card][data-title="Regrind"] [data-card-open]')).toBeVisible();
    await page.locator(`.site-header__nav a[href="/${locale}/tooling/"]`).click();
    await expect(page.locator("h1")).toBeVisible();
  }
  await context.close();
});

test("touch swiping the cards never flips them", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4322/en/");
  const hand = page.locator("#software-work [data-card-hand]");
  await hand.scrollIntoViewIfNeeded();
  const box = (await hand.boundingBox())!;
  const session = await context.newCDPSession(page);
  const y = Math.max(100, box.y + 90);
  await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 290, y }] });
  for (let x = 270; x >= 65; x -= 25) {
    await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y }] });
  }
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => hand.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(hand.locator('[data-card-flip][aria-pressed="true"]')).toHaveCount(0);
  await context.close();
});

test("live reduced-motion preferences clear tilt and cancel a seated card without navigation", async ({ page }) => {
  await page.goto("/en/#software-work");
  const deck = page.locator("#software-work [data-deck]");
  const body = deck.locator(".deck-card__body").first();
  await body.hover({ position: { x: 25, y: 25 } });
  await expect(body).toHaveClass(/is-tracking/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(deck).toHaveAttribute("data-motion", "reduced");
  await expect(body).not.toHaveClass(/is-tracking/);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("[data-drawer-open]").click();
  await page.locator("[data-effects-preference]").click();
  await expect(deck).toHaveAttribute("data-motion", "reduced");
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-drawer-open]")).toBeFocused();

  await page.evaluate(() => { document.documentElement.dataset.effects = "system"; });
  await expect(deck).toHaveAttribute("data-motion", "system");
  // Deliver a complete drag in one task, then cancel its seating animation
  // before its navigation promise resolves. This catches cancel=>navigate bugs.
  await deck.evaluate((element) => {
    const card = element.querySelector<HTMLElement>("[data-card]")!;
    const from = card.getBoundingClientRect();
    const reader = element.querySelector("[data-card-reader]")!.getBoundingClientRect();
    const send = (type: string, x: number, y: number) => card.dispatchEvent(new PointerEvent(type, { bubbles: true, button: 0, isPrimary: true, pointerType: "mouse", pointerId: 1, clientX: x, clientY: y }));
    // Synthetic events cannot capture a real pointer; guard capture for this
    // explicit cancellation scenario, while normal dragging has separate e2e.
    card.setPointerCapture = () => {};
    send("pointerdown", from.x + 20, from.y + 20);
    send("pointermove", reader.x + reader.width / 2, reader.y + reader.height / 2);
    send("pointerup", reader.x + reader.width / 2, reader.y + reader.height / 2);
    document.documentElement.dataset.effects = "reduced";
  });
  await expect(deck.locator(".is-played, .is-dragging")).toHaveCount(0);
  await page.waitForTimeout(250);
  await expect(page).toHaveURL(/\/en\/#software-work$/);
});

test("blocked storage still permits drawer preferences and the List view", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException("Blocked", "SecurityError"); };
    Storage.prototype.setItem = () => { throw new DOMException("Blocked", "SecurityError"); };
  });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/en/#software-work");
  await page.locator("[data-drawer-open]").click();
  await page.locator("[data-effects-preference]").click();
  await expect(page.locator("html")).toHaveAttribute("data-effects", "reduced");
  await page.locator("[data-effects-preference]").click();
  await expect(page.locator("html")).toHaveAttribute("data-effects", "system");
  await page.keyboard.press("Escape");
  await page.locator('#software-work [data-deck-view="list"]').click();
  await expect(page.locator("#software-work [data-deck-list]")).toBeVisible();
  expect(errors).toEqual([]);
});

for (const locale of ["en", "ru", "de", "ge"]) {
  test(`${locale}: Regrind is shared across the showcase, collections, and case file`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    await expect(page.locator('.open-source-showcase a[href*="/work/regrind/"]').first()).toBeAttached();
    await page.locator('[data-terminal-tab][href="#software-work"]').click();
    const regrind = page.locator('#software-work [data-card][data-title="Regrind"]');
    await expect(regrind).toBeVisible();
    await expect(regrind.locator(".deck-card__live")).toHaveCount(0);
    await page.locator('#software-work [data-deck-view="list"]').click();
    await expect(page.locator(`#software-work [data-deck-list] a[href="/${locale}/work/regrind/"]`).first()).toBeVisible();
    await page.goto(`/${locale}/tooling/`);
    await expect(page.locator(`#tooling [data-deck-list] a[href="/${locale}/work/regrind/"]`).first()).toBeVisible();
    await page.goto(`/${locale}/work/regrind/`);
    await expect(page.locator("h1")).toHaveText("Regrind");
    await expect(page.locator("html")).toHaveAttribute("lang", locale === "ge" ? "ka-GE" : new RegExp(`^${locale}`));
    await expect(page.locator('a[href="https://github.com/QTtrash/regrind"]')).toBeAttached();
  });
}

test("Georgian headings and controls render glyphs from the intended web font", async ({ page, context }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto("/ge/");
  await page.evaluate(() => document.fonts.ready);
  const session = await context.newCDPSession(page);
  await session.send("DOM.enable");
  await session.send("CSS.enable");
  const { root } = await session.send("DOM.getDocument");
  for (const selector of [".hero-panel h1", ".site-header__hire", "#software-work h2", "#software-work [data-card-open]", "#software-work [data-card-flip]"]) {
    const { nodeId } = await session.send("DOM.querySelector", { nodeId: root.nodeId, selector });
    const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
    expect(fonts.some((font) => font.isCustomFont && font.familyName.startsWith("Noto Sans Georgian") && font.glyphCount > 0), `${selector}: ${fonts.map((font) => font.familyName).join(", ")}`).toBe(true);
    const element = page.locator(selector).first();
    await expect(element).toHaveCSS("text-transform", "none");
    expect(await element.evaluate((node) => node.scrollWidth - node.clientWidth), selector).toBeLessThanOrEqual(1);
  }
});

for (const locale of ["en", "ge"]) {
  test(`${locale}: the reader remains reachable when dragging lower-row Regrind`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`/${locale}/#software-work`);
    const panel = page.locator("#software-work");
    const deck = panel.locator("[data-deck]");
    const regrind = deck.locator('[data-card][data-title="Regrind"]');
    const first = await deck.locator("[data-card]").first().boundingBox();
    const initial = await regrind.boundingBox();
    expect(initial!.y, "Regrind occupies a later grid row").toBeGreaterThanOrEqual(first!.y + first!.height);

    await regrind.scrollIntoViewIfNeeded();
    const bounds = (await panel.boundingBox())!;
    const reader = deck.locator("[data-card-reader]");
    const target = (await reader.locator(".card-reader__slot").boundingBox())!;
    expect(target.y, "reader remains below the panel's upper edge").toBeGreaterThanOrEqual(bounds.y);
    expect(target.y + target.height, "reader remains inside the scrolling panel").toBeLessThanOrEqual(bounds.y + bounds.height);

    const art = (await regrind.locator(".deck-card__art").boundingBox())!;
    await page.mouse.move(art.x + art.width / 2, art.y + art.height / 2);
    await page.mouse.down();
    await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 12 });
    await expect(reader).toHaveClass(/is-armed/);
    await page.mouse.up();
    await expect(page).toHaveURL(new RegExp(`/${locale}/work/regrind/$`));
    await expect(page.locator("h1")).toHaveText("Regrind");
  });
}
