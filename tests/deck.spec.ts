import { expect, test, type Page } from "@playwright/test";

const isDesktop = (width: number) => width >= 1120;

// Loading a #fragment scrolls the window after load, which would move drag
// targets mid-measurement; open the panel the way a visitor does instead.
async function openWorkPanel(page: Page): Promise<void> {
  await page.goto("/en/");
  await page.locator('[data-terminal-tab][href="#software-work"]').click();
  await expect(page.locator("#software-work")).not.toHaveAttribute("inert", "");
}

test("fast path to contact and CV is in the first viewport without interaction", async ({ page }) => {
  await page.goto("/en/");
  const viewport = page.viewportSize()!;
  const hire = page.locator(".site-header__hire");
  await expect(hire).toBeVisible();
  await expect(hire).toHaveAttribute("href", "/en/#contact");

  for (const name of ["Contact me", "CV (PDF)"]) {
    const box = await page.locator("[data-fast-path]").getByRole("link", { name }).boundingBox();
    expect(box, name).not.toBeNull();
    expect(box!.y + box!.height, `${name} bottom edge`).toBeLessThanOrEqual(viewport.height);
  }
});

test("every card opens a localized case file", async ({ page, request }) => {
  await page.goto("/en/");
  const links = page.locator("[data-card-open]");
  const hrefs = await links.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")!));
  expect(hrefs.length).toBe(8);
  for (const href of hrefs) {
    expect(href).toMatch(/^\/en\/work\/[a-z-]+\/$/);
    for (const locale of ["en", "ru", "de", "ge"]) {
      const response = await request.get(href.replace("/en/", `/${locale}/`));
      expect(response.status(), href).toBe(200);
    }
  }

  await page.goto(hrefs[0]!);
  await expect(page.locator("h1")).toHaveText("YPay");
  await expect(page.getByRole("link", { name: "Hire me" }).last()).toBeVisible();
});

test("Cards and List views switch and the choice persists", async ({ page }) => {
  await page.goto("/en/#software-work");
  const deck = page.locator("#software-work [data-deck]");
  await expect(deck.locator("[data-deck-cards]")).toBeVisible();
  await expect(deck.locator("[data-deck-list]")).toBeHidden();

  await deck.getByRole("button", { name: "List" }).click();
  await expect(deck.getByRole("button", { name: "List" })).toHaveAttribute("aria-pressed", "true");
  await expect(deck.locator("[data-deck-list]")).toBeVisible();
  await expect(deck.locator("[data-deck-cards]")).toBeHidden();
  // One preference drives every deck on the page.
  await expect(page.locator("#game-dev [data-deck-list]")).not.toHaveAttribute("hidden", "");

  await page.reload();
  await expect(page.locator("#software-work [data-deck-list]")).not.toHaveAttribute("hidden", "");
  await page.locator("#software-work").getByRole("button", { name: "Cards" }).click();
  await expect(page.locator("#software-work [data-deck-cards]")).not.toHaveAttribute("hidden", "");
});

test("flipping a card swaps which face is exposed", async ({ page }) => {
  await page.goto("/en/#software-work");
  const card = page.locator("#software-work [data-card]").first();
  const flip = card.locator("[data-card-flip]");
  await card.hover();
  await expect(flip).toHaveAttribute("aria-pressed", "false");
  await flip.click();
  await expect(flip).toHaveAttribute("aria-pressed", "true");
  await expect(card.locator('[data-card-face="back"]')).not.toHaveAttribute("inert", "");
  await expect(card.locator('[data-card-face="front"]')).toHaveAttribute("inert", "");
  await flip.click();
  await expect(card.locator('[data-card-face="back"]')).toHaveAttribute("inert", "");
});

test("desktop: dragging a card into the reader opens its case file", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "fine-pointer drag");
  await openWorkPanel(page);
  const deck = page.locator("#software-work [data-deck]");
  await expect(deck).toHaveClass(/is-draggable/);
  await expect(deck).toHaveClass(/is-fanned/);

  const art = deck.locator('[data-card][data-title="YDesk"] .deck-card__art');
  const from = (await art.boundingBox())!;
  const to = (await deck.locator(".card-reader__slot").boundingBox())!;
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 10 });
  await expect(deck.locator("[data-card-reader]")).toHaveClass(/is-armed/);
  await page.mouse.up();
  await expect(page).toHaveURL(/\/en\/work\/ydesk\/$/);
  await expect(page.locator("h1")).toHaveText("YDesk");
});

test("desktop: a drag released outside the reader returns the card", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "fine-pointer drag");
  await openWorkPanel(page);
  const card = page.locator('#software-work [data-card][data-title="YPay"]');
  const box = (await card.locator(".deck-card__art").boundingBox())!;
  await page.mouse.move(box.x + 20, box.y + 20);
  await page.mouse.down();
  await page.mouse.move(box.x + 140, box.y + 160, { steps: 6 });
  await page.mouse.up();
  await expect(page).toHaveURL(/\/en\/(#software-work)?$/);
  await expect(card).not.toHaveClass(/is-dragging/);
  await expect.poll(() => card.evaluate((node) => (node as HTMLElement).style.translate)).toBe("");
});

test("touch layouts get a designed card row instead of drag", async ({ page }) => {
  test.skip(isDesktop(page.viewportSize()?.width ?? 1280), "touch composition");
  await page.goto("/en/");
  const deck = page.locator("#software-work [data-deck]");
  await expect(deck).not.toHaveClass(/is-draggable/);
  await expect(deck.locator("[data-card-reader]")).toBeHidden();
  const firstCard = deck.locator("[data-card]").first();
  await firstCard.locator(".deck-card__body").tap();
  await expect(firstCard.locator("[data-card-flip]")).toHaveAttribute("aria-pressed", "true");
  await expect(deck.locator("[data-card-open]").first()).toBeVisible();
});

test("reduced motion keeps the hand flat and still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/#game-dev");
  const deck = page.locator("#game-dev [data-deck]");
  await expect(deck).not.toHaveClass(/is-fanned/);
  const transform = await deck.locator("[data-card]").nth(1).evaluate((node) => getComputedStyle(node).transform);
  expect(transform).toBe("none");
});

test("in-product Reduced effects setting also flattens the hand", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("interfaceEffects", "reduced"));
  await page.goto("/en/#game-dev");
  await expect(page.locator("#game-dev [data-deck]")).not.toHaveClass(/is-fanned/);
});

test("desktop console reaches Games, and old CV links land on Contact", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "fitted console tabs");
  await page.goto("/en/");
  await page.locator('[data-terminal-tab][href="#game-dev"]').click();
  await expect(page.locator("#game-dev")).not.toHaveAttribute("inert", "");
  await page.goto("/en/#cv");
  await expect(page.locator("#contact")).not.toHaveAttribute("inert", "");
  await expect(page.locator("#contact").getByRole("link", { name: "open pdf" })).toBeVisible();
});

test("cards carry suit-tinted pixel art and a pixel suit mark", async ({ page }) => {
  await page.goto("/en/");
  const card = (title: string) => page.locator(`[data-card][data-title="${title}"]`);
  for (const title of ["YPay", "Grindlike", "Alice Plays"]) {
    await expect(card(title).locator(".deck-card__art svg.pixel-art path").first()).toBeAttached();
    await expect(card(title).locator(".deck-card__suit svg.pixel-art")).toBeAttached();
  }
  const accent = (title: string) =>
    card(title).locator(".deck-card__art .px-a").first().evaluate((node) => getComputedStyle(node).fill);
  const [platform, tool, game] = await Promise.all([accent("YPay"), accent("Grindlike"), accent("Alice Plays")]);
  expect(new Set([platform, tool, game]).size).toBe(3);
});

test("the hero avatar flips between the pixel sprite and the photo", async ({ page }) => {
  await page.goto("/en/");
  const avatar = page.locator("[data-avatar-flip]");
  await expect(avatar).toHaveAccessibleName("Show photo");
  await expect(avatar).toHaveAttribute("aria-pressed", "false");
  const photo = avatar.locator(".avatar-card__photo");
  await expect(photo).toHaveAttribute("src", "/images/suren-portrait.webp");
  await expect(photo).toHaveCSS("filter", "none");
  await expect(photo).toHaveCSS("opacity", "0");
  await avatar.click();
  await expect(avatar).toHaveAttribute("aria-pressed", "true");
  await expect(avatar.locator(".avatar-card__photo")).toHaveCSS("opacity", "1");
});

test("nothing above the cards blends with them (keeps the hand at frame rate)", async ({ page }) => {
  await page.goto("/en/");
  const overlay = await page.locator(".terminal-console__content").evaluate((node) => {
    const style = getComputedStyle(node, "::before");
    return { blend: style.mixBlendMode, after: getComputedStyle(node, "::after").content };
  });
  expect(overlay.blend).toBe("normal");
  expect(overlay.after).toBe("none");
});

test("Backlog Breaker loads on Start and plays with the keyboard", async ({ page }) => {
  const engineRequests: string[] = [];
  page.on("request", (request) => {
    if (/\/breaker\.[\w-]+\.js$/.test(request.url())) engineRequests.push(request.url());
  });
  await page.goto("/en/");
  const arcade = page.locator("[data-arcade]");
  await arcade.scrollIntoViewIfNeeded();
  await expect(arcade.locator(".arcade__poster")).toBeVisible();
  expect(engineRequests).toEqual([]);

  await arcade.getByRole("button", { name: "Start" }).click();
  await expect(arcade.locator("canvas")).toBeVisible();
  await expect(arcade.locator("[data-arcade-message]")).toHaveText("Launch the ball");
  expect(engineRequests).toHaveLength(1);

  const stage = arcade.locator("[data-arcade-stage]");
  await expect(stage).toBeFocused();
  await page.keyboard.press("Space");
  await expect(arcade.locator("[data-arcade-overlay]")).toBeHidden();
  const pause = arcade.getByRole("button", { name: "Pause" });
  await expect(pause).toBeVisible();

  await page.keyboard.press("p");
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await expect(arcade.getByRole("button", { name: "Resume" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(arcade.locator("[data-arcade-overlay]")).toBeHidden();
});
