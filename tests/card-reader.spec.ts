import { expect, test, type Locator, type Page } from "@playwright/test";

const locales = ["en", "ru", "de", "ge"] as const;
const panels = ["software-work", "game-dev", "tooling"] as const;
type Panel = (typeof panels)[number];

// Explicit viewport/input scenarios run once instead of repeating under presets.
test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "explicit reader viewport and input coverage");
});

async function openDeck(page: Page, panel: Panel = "software-work", locale = "en"): Promise<Locator> {
  await page.goto(`/${locale}/${panel === "tooling" ? "tooling/" : ""}`);
  if (panel !== "tooling" && (await page.locator(".terminal-side-nav").isVisible())) {
    await page.locator(`[data-terminal-tab][href="#${panel}"]`).click();
  }
  await page.evaluate(() => document.fonts.ready);
  const deck = page.locator(`#${panel} [data-deck]`);
  await expect(deck).toHaveClass(/is-enhanced/);
  if (await deck.getAttribute("data-view") === "list") await deck.locator('[data-deck-view="cards"]').click();
  return deck;
}

async function assertReachable(control: Locator): Promise<void> {
  await control.focus();
  await expect(control).toBeFocused();
  await expect.poll(() => control.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
  }), "focused control is visible and receives pointer input").toBe(true);
}

async function pickup(page: Page, card: Locator) {
  const art = card.locator(".deck-card__art");
  await art.scrollIntoViewIfNeeded();
  const source = (await card.boundingBox())!;
  const box = (await art.boundingBox())!;
  const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + 28, start.y + 24, { steps: 3 });
  await expect(card).toHaveClass(/is-dragging/);
  await expect(page.locator("[data-drag-preview]")).toHaveCount(1);
  return { source, start, pointer: { x: start.x + 28, y: start.y + 24 } };
}

async function assertIdle(page: Page, deck: Locator): Promise<void> {
  await expect(page.locator("[data-drag-preview], [data-drag-feedback]")).toHaveCount(0);
  await expect(deck.locator("[data-card-reader]")).toHaveAttribute("data-state", "idle");
  await expect(deck.locator(".is-dragging, .is-played")).toHaveCount(0);
  await expect(deck.locator("[data-reader-status]")).toHaveText((await deck.locator("[data-reader-status]").getAttribute("data-idle"))!);
}

for (const locale of locales) {
  for (const panel of panels) {
    test(`${locale} ${panel}: reader lane cannot obscure cards or keyboard controls`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      for (const width of [1120, 1280, 1440]) {
        await page.setViewportSize({ width, height: width === 1440 ? 900 : 720 });
        const deck = await openDeck(page, panel, locale);
        const reader = deck.locator("[data-card-reader]");
        await expect(reader).toBeVisible();
        const target = (await reader.boundingBox())!;
        const cards = await deck.locator("[data-card]").evaluateAll((elements) => elements.map((element) => {
          const box = element.getBoundingClientRect();
          return { right: box.right, width: box.width };
        }));
        for (const card of cards) {
          expect(card.width, `${width}: cards retain a readable width`).toBeGreaterThanOrEqual(230);
          expect(card.right, `${width}: every card is separate from the reader lane`).toBeLessThanOrEqual(target.x - 8);
        }
        for (const card of [deck.locator("[data-card]").first(), deck.locator("[data-card]").last()]) {
          await assertReachable(card.locator("[data-card-flip]"));
          await page.keyboard.press("Tab");
          const open = card.locator("[data-card-open]");
          await expect(open).toBeFocused();
          await expect(open).not.toHaveCSS("outline-style", "none");
          await assertReachable(open);
        }
        const panelBox = (await page.locator(`#${panel}`).boundingBox())!;
        const dock = (await reader.boundingBox())!;
        expect(dock.y).toBeGreaterThanOrEqual(panelBox.y - 1);
        expect(dock.y + dock.height).toBeLessThanOrEqual(panelBox.y + panelBox.height + 1);
        const clipped = await reader.locator(".card-reader__label, [data-reader-status], .card-reader__hint").evaluateAll((elements) => elements.filter((element) => element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1).map((element) => element.textContent));
        expect(clipped, `${locale} reader labels fit after font loading`).toEqual([]);
        await deck.locator('[data-deck-view="list"]').click();
        await expect(reader).toBeHidden();
        await expect(deck.locator("[data-deck-list]")).toBeVisible();
        await deck.locator('[data-deck-view="cards"]').click();
      }
    });
  }
}

for (const panel of panels) {
  test(`${panel}: a lower-row card keeps its full-size preview and opens through the dock`, async ({ page }) => {
    await page.setViewportSize({ width: 1120, height: 720 });
    const deck = await openDeck(page, panel);
    const first = (await deck.locator("[data-card]").first().boundingBox())!;
    const card = deck.locator("[data-card]").last();
    expect((await card.boundingBox())!.y).toBeGreaterThan(first.y + first.height);
    const href = (await card.getAttribute("data-href"))!;
    const { source } = await pickup(page, card);
    const preview = page.locator("[data-drag-preview]");
    const box = (await preview.boundingBox())!;
    expect(Math.abs(box.width - source.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(box.height - source.height)).toBeLessThanOrEqual(1);
    await expect(preview).toHaveAttribute("inert", "");
    await expect(preview).toHaveAttribute("aria-hidden", "true");
    expect(await preview.evaluate((element) => element.parentElement === document.body)).toBe(true);
    await expect(preview.locator("[id], [data-card], [data-card-open], [data-card-flip]")).toHaveCount(0);
    expect(await card.evaluate((element) => (element as HTMLElement).style.translate)).toBe("");
    const retained = (await card.boundingBox())!;
    expect(Math.abs(retained.x - source.x) + Math.abs(retained.y - source.y)).toBeLessThanOrEqual(1);
    const reader = deck.locator("[data-card-reader]");
    await expect(reader).toHaveAttribute("data-state", "carrying");
    await expect(page.locator("[data-drag-feedback]")).toBeVisible();
    const target = (await reader.locator(".card-reader__slot").boundingBox())!;
    await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 8 });
    await expect(reader).toHaveAttribute("data-state", "armed");
    await expect(reader).toHaveClass(/is-armed/);
    await page.mouse.up();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator("[data-drag-preview], [data-drag-feedback]")).toHaveCount(0);
  });
}

test("scrolling during a pickup keeps the preview under the pointer and the dock reachable", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const deck = await openDeck(page);
  const card = deck.locator("[data-card]").first();
  const { pointer } = await pickup(page, card);
  const preview = page.locator("[data-drag-preview]");
  const before = (await preview.boundingBox())!;
  const panel = page.locator("#software-work");
  const originalScroll = await panel.evaluate((element) => element.scrollTop);
  await panel.evaluate((element) => { element.scrollTop += 150; });
  await expect.poll(() => panel.evaluate((element) => element.scrollTop)).toBeGreaterThan(originalScroll);
  const stationary = (await preview.boundingBox())!;
  expect(Math.abs(stationary.x - before.x) + Math.abs(stationary.y - before.y)).toBeLessThanOrEqual(1);
  await page.mouse.move(pointer.x + 19, pointer.y + 13);
  const moved = (await preview.boundingBox())!;
  expect(Math.abs(moved.x - before.x - 19) + Math.abs(moved.y - before.y - 13)).toBeLessThanOrEqual(2);
  const target = (await deck.locator(".card-reader__slot").boundingBox())!;
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2);
  await expect(deck.locator("[data-card-reader]")).toHaveAttribute("data-state", "armed");
  await page.keyboard.press("Escape");
  await page.mouse.up();
  await assertIdle(page, deck);
});

test("interrupted gestures clean up without flipping or navigating", async ({ page }) => {
  const reasons = ["escape", "blur", "pointercancel", "lostcapture", "resize", "breakpoint", "list", "panel"] as const;
  for (const reason of reasons) {
    await page.setViewportSize({ width: 1280, height: 720 });
    const deck = await openDeck(page);
    const card = deck.locator("[data-card]").first();
    await pickup(page, card);
    if (reason === "escape") {
      await page.keyboard.press("Escape");
      // A held pointer can be released well after cancellation; its click must
      // still be suppressed instead of flipping the source card.
      await page.waitForTimeout(450);
    }
    else if (reason === "blur") await page.evaluate(() => window.dispatchEvent(new Event("blur")));
    else if (reason === "pointercancel") await card.dispatchEvent("pointercancel", { pointerId: 1, pointerType: "mouse", bubbles: true });
    else if (reason === "lostcapture") await card.evaluate((element) => element.releasePointerCapture(1));
    else if (reason === "resize") await page.setViewportSize({ width: 1300, height: 740 });
    else if (reason === "breakpoint") await page.setViewportSize({ width: 390, height: 844 });
    else if (reason === "list") await deck.locator('[data-deck-view="list"]').evaluate((element) => (element as HTMLButtonElement).click());
    else await page.locator('[data-terminal-tab][href="#game-dev"]').evaluate((element) => (element as HTMLAnchorElement).click());
    await page.mouse.up();
    await assertIdle(page, deck);
    await expect(card.locator("[data-card-flip]")).toHaveAttribute("aria-pressed", "false");
    await expect(page).toHaveURL(/\/en\/(#(?:software-work|game-dev))?$/);
  }
});

test("an outside release returns the card and a cancelled seating cannot navigate later", async ({ page }) => {
  const deck = await openDeck(page);
  const card = deck.locator("[data-card]").first();
  await pickup(page, card);
  await page.mouse.up();
  await assertIdle(page, deck);
  await expect(card.locator("[data-card-flip]")).toHaveAttribute("aria-pressed", "false");
  await pickup(page, card);
  const reader = deck.locator("[data-card-reader]");
  const target = (await reader.locator(".card-reader__slot").boundingBox())!;
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2);
  await expect(reader).toHaveAttribute("data-state", "armed");
  // Cancel in the same task as release so this tests the navigation promise,
  // independent of CI scheduling relative to the short seating animation.
  await card.evaluate((element, point) => {
    element.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1, pointerType: "mouse", clientX: point.x, clientY: point.y }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  }, { x: target.x + target.width / 2, y: target.y + target.height / 2 });
  await page.mouse.up();
  await assertIdle(page, deck);
  await page.waitForTimeout(250);
  await expect(page).toHaveURL(/\/en\/(#software-work)?$/);
});

test("reduced motion preserves optional dragging with immediate return and project access", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const deck = await openDeck(page, "tooling", "ge");
  const card = deck.locator("[data-card]").first();
  const href = (await card.getAttribute("data-href"))!;
  await pickup(page, card);
  expect(await page.locator("[data-drag-preview]").evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  await page.mouse.up();
  await assertIdle(page, deck);
  await pickup(page, card);
  const target = (await deck.locator(".card-reader__slot").boundingBox())!;
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2);
  await page.mouse.up();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
});

test("touch swipes across each collection preserve horizontal and vertical scrolling", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  for (const panel of panels) {
    await page.goto(`http://127.0.0.1:4322/en/${panel === "tooling" ? "tooling/" : ""}`);
    const deck = page.locator(`#${panel} [data-deck]`);
    const hand = deck.locator("[data-card-hand]");
    await expect(deck).toHaveClass(/is-enhanced/);
    await page.evaluate(() => document.fonts.ready);
    await hand.evaluate((element) => element.scrollIntoView({ block: "start", behavior: "instant" }));
    const box = (await hand.boundingBox())!;
    const y = Math.min(450, Math.max(180, box.y + 160));
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 285, y }] });
    for (let x = 260; x >= 65; x -= 25) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => hand.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    const before = await page.evaluate(() => scrollY);
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 160, y: 220 }] });
    for (let next = 245; next <= 470; next += 25) await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 160, y: next }] });
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(before);
    await expect(deck.locator('[data-card-flip][aria-pressed="true"]')).toHaveCount(0);
    await expect(deck.locator("[data-card-reader]")).toBeHidden();
    await expect(page.locator("[data-drag-preview]")).toHaveCount(0);
  }
  await context.close();
});


test("Georgian reader instructions use the intended font at the narrow fitted breakpoint", async ({ page, context }) => {
  await page.setViewportSize({ width: 1120, height: 720 });
  await openDeck(page, "tooling", "ge");
  const session = await context.newCDPSession(page);
  await session.send("DOM.enable");
  await session.send("CSS.enable");
  const { root } = await session.send("DOM.getDocument");
  for (const selector of [".card-reader__label", "[data-reader-status]", ".card-reader__hint"]) {
    const { nodeId } = await session.send("DOM.querySelector", { nodeId: root.nodeId, selector });
    const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
    expect(fonts.some((font) => font.isCustomFont && font.familyName.startsWith("Noto Sans Georgian") && font.glyphCount > 0), selector).toBe(true);
    await expect(page.locator(selector)).toHaveCSS("text-transform", "none");
  }
});
