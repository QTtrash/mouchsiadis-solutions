// Start a local preview, then run this against the before and after builds:
// AUDIT_BASE_URL=http://127.0.0.1:4321 node scripts/capture-card-reader-audit.mjs [outputDirectory]
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve(process.argv[2] ?? "/tmp/card-reader-audit-after");
const base = new URL(process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:4321");
if (!["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)) {
  throw new Error("AUDIT_BASE_URL must point to a local preview.");
}

const locales = ["en", "ru", "de", "ge"];
const matrix = [[1440, 900], [1280, 720], [1280, 650], [820, 1180], [320, 568]];
const surfaces = [
  { name: "work", id: "software-work" },
  { name: "games", id: "game-dev" },
  { name: "tooling", id: "tooling" },
];
const entries = [];
const failures = [];
await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => {
    const terminal = document.querySelector("[data-terminal-console]");
    return (!terminal || terminal.classList.contains("terminal-console--ready")) &&
      [...document.querySelectorAll("[data-deck]")].every((deck) => deck.classList.contains("is-enhanced"));
  });
  await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
}

async function align(page, locator, fitted) {
  await locator.evaluate((element) => element.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" }));
  await page.evaluate((isFitted) => {
    if (isFitted) window.scrollTo({ top: 0, behavior: "instant" });
  }, fitted);
  if (!fitted) {
    await locator.evaluate((element) => {
      const header = document.querySelector(".site-header");
      const headerBottom = header && ["sticky", "fixed"].includes(getComputedStyle(header).position)
        ? header.getBoundingClientRect().bottom : 0;
      window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - headerBottom - 16, behavior: "instant" });
    });
  }
  await settle(page);
}

async function capture(page, deck, locale, viewport, surface, state) {
  await settle(page);
  const path = resolve(outputDirectory, `${locale}-${viewport.width}x${viewport.height}-${surface}${state === "initial" ? "" : `-${state}`}.png`);
  const metrics = await deck.evaluate((element) => {
    const box = (node) => {
      if (!node) return null;
      const { x, y, width, height } = node.getBoundingClientRect();
      return { x, y, width, height };
    };
    const visible = (node) => node && getComputedStyle(node).display !== "none";
    const reader = element.querySelector("[data-card-reader]");
    const first = element.querySelector("[data-card]");
    const controls = [...element.querySelectorAll("[data-deck-view], [data-card-flip], [data-card-open]")];
    const active = document.activeElement;
    const activeBox = active && element.contains(active) ? active.getBoundingClientRect() : null;
    const atFocus = activeBox && document.elementFromPoint(activeBox.x + activeBox.width / 2, activeBox.y + activeBox.height / 2);
    const preview = document.querySelector("[data-drag-preview]");
    const status = reader?.querySelector("[data-reader-status]");
    return {
      documentOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      clippedControls: controls.filter((node) => node.clientWidth && (node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1)).map((node) => node.textContent.trim()),
      reader: visible(reader) ? box(reader) : null,
      readerState: reader?.getAttribute("data-state") ?? null,
      readerStatus: status?.textContent.trim() ?? null,
      readerStatusFont: status ? getComputedStyle(status).fontFamily : null,
      readerStatusOverflow: status?.clientWidth ? Math.max(0, status.scrollWidth - status.clientWidth) : 0,
      firstCard: box(first),
      firstActions: box(first?.querySelector(".deck-card__actions")),
      focusedAction: activeBox ? active.textContent.trim() : null,
      focusedActionOccluded: activeBox ? !(atFocus === active || active.contains(atFocus)) : null,
      preview: box(preview),
      feedback: document.querySelector("[data-drag-feedback]")?.textContent.trim() ?? null,
    };
  });
  await page.screenshot({ path, fullPage: false, animations: "disabled" });
  entries.push({ locale, viewport, surface, state, path, url: page.url(), ...metrics });
}

async function inspect(page, locale, viewport, surface) {
  const fitted = viewport.width >= 1120 && viewport.height >= 720;
  const response = await page.goto(new URL(surface.name === "tooling" ? `/${locale}/tooling/` : `/${locale}/`, base).href);
  if (response && !response.ok()) throw new Error(`HTTP ${response.status()}: ${page.url()}`);
  await settle(page);
  if (fitted && surface.name !== "tooling") {
    await page.locator(`[data-terminal-tab][href="#${surface.id}"]`).click();
  }
  const deck = page.locator(`#${surface.id} [data-deck]`);
  if (!fitted) await align(page, deck.locator(".card-deck__toolbar"), false);
  const shot = (state) => capture(page, deck, locale, viewport, surface.name, state);
  await shot("initial");
  if (!fitted) return;

  // Reproduce browser focus scrolling from a later row back to the first
  // action, where the former sticky toolbar could cover the focused control.
  const last = deck.locator("[data-card]").last();
  await align(page, last.locator(".deck-card__actions"), true);
  await page.keyboard.press("Tab");
  await deck.locator("[data-card-flip]").first().focus();
  await shot("focus-first");
  await page.evaluate(() => document.activeElement?.blur());
  await align(page, last.locator(".deck-card__actions"), true);
  await shot("lower-row");
  if (!["en", "ge"].includes(locale)) return;

  const art = await last.locator(".deck-card__art").boundingBox();
  const reader = deck.locator("[data-card-reader]");
  const target = await reader.boundingBox();
  if (!art || !target) throw new Error("Missing visible drag source or reader.");
  const start = { x: art.x + art.width / 2, y: art.y + art.height / 2 };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  try {
    await page.mouse.move(start.x + 22, start.y + 16, { steps: 4 });
    await shot("pickup");
    await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 10 });
    await shot("armed");
    await page.keyboard.press("Escape");
    // Older builds have no Escape cancellation: release outside the reader
    // so the same script can collect useful baseline images without navigation.
    if (await page.locator("[data-drag-preview], .deck-card.is-dragging").count()) {
      await page.mouse.move(start.x + 22, start.y + 16, { steps: 4 });
    }
  } finally {
    await page.mouse.up();
  }
  await shot("cancelled");
}

try {
  for (const locale of locales) {
    for (const [width, height] of matrix) {
      const viewport = { width, height };
      const context = await browser.newContext({ viewport, reducedMotion: "reduce", hasTouch: width < 1120, serviceWorkers: "block" });
      await context.route("**/*", (route) => new URL(route.request().url()).origin === base.origin ? route.continue() : route.abort());
      const page = await context.newPage();
      for (const surface of surfaces) {
        try {
          await inspect(page, locale, viewport, surface);
        } catch (error) {
          failures.push({ locale, viewport, surface: surface.name, url: page.url(), error: String(error) });
        }
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(resolve(outputDirectory, "manifest.json"), `${JSON.stringify({ baseURL: base.href, entries, failures }, null, 2)}\n`);
}

const overflows = entries.filter((entry) => entry.documentOverflow > 1 || entry.readerStatusOverflow > 1 || entry.clippedControls.length);
const occlusions = entries.filter((entry) => entry.state === "focus-first" && entry.focusedActionOccluded);
console.log(`${entries.length} screenshots; ${overflows.length} overflow/clipping findings; ${occlusions.length} obscured focused controls; ${failures.length} failed flows. ${outputDirectory}`);
if (overflows.length || occlusions.length || failures.length) process.exitCode = 1;
