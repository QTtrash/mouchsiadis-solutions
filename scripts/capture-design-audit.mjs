// Start a built local preview first, then: node scripts/capture-design-audit.mjs [outputDirectory]
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve(
  process.argv[2] ?? "/tmp/mouchsiadis-design-audit",
);
const base = new URL(process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:4321");
if (!["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)) {
  throw new Error("AUDIT_BASE_URL must point to a local preview.");
}
const locales = ["en", "ru", "de", "ge"];
const matrix = [
  [320, 568],
  [360, 740],
  [375, 667],
  [390, 844],
  [414, 896],
  [844, 390],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1180, 820],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
  [1280, 650],
  [1366, 650],
];
const entries = [];
const failures = [];
await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();

async function ready(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => {
    const terminal = document.querySelector("[data-terminal-console]");
    return (
      (!terminal || terminal.classList.contains("terminal-console--ready")) &&
      [...document.querySelectorAll("[data-deck]")].every((deck) =>
        deck.classList.contains("is-enhanced"),
      )
    );
  });
  await page.evaluate(
    () =>
      new Promise((done) =>
        requestAnimationFrame(() => requestAnimationFrame(done)),
      ),
  );
}

async function navigate(page, path) {
  const response = await page.goto(new URL(path, base).href, {
    waitUntil: "load",
  });
  if (response && !response.ok())
    throw new Error(`${response.status()} ${page.url()}`);
  await ready(page);
}

async function alignStart(page, selector) {
  await page
    .locator(selector)
    .first()
    .evaluate((element) => {
      element.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "instant",
      });
      const fitted =
        document.body.classList.contains("has-console") &&
        matchMedia("(min-width:1120px) and (min-height:720px)").matches;
      if (fitted) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      const header = document.querySelector(".site-header");
      if (
        header &&
        ["sticky", "fixed"].includes(getComputedStyle(header).position)
      ) {
        window.scrollBy(
          0,
          element.getBoundingClientRect().top -
            header.getBoundingClientRect().bottom -
            16,
        );
      }
    });
}

async function capture(page, locale, viewport, surface) {
  await ready(page);
  const path = resolve(
    outputDirectory,
    `${locale}-${viewport.width}x${viewport.height}-${surface}.png`,
  );
  const documentOverflow = await page.evaluate(() =>
    Math.max(
      0,
      document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  );
  await page.screenshot({ path, fullPage: false, animations: "disabled" });
  entries.push({
    locale,
    surface,
    path,
    url: page.url(),
    viewport,
    documentOverflow,
  });
}

async function inspectSurfaces(page, locale, viewport) {
  const shot = (surface) => capture(page, locale, viewport, surface);
  await alignStart(page, ".open-source-showcase");
  await shot("showcase");
  for (const [surface, id] of [
    ["work", "software-work"],
    ["games", "game-dev"],
    ["list", "software-work"],
    ["experience", "experience"],
    ["contact", "contact"],
  ]) {
    await navigate(page, `/${locale}/#${id}`);
    if (["work", "games", "list"].includes(surface)) {
      const view = surface === "list" ? "list" : "cards";
      await page.locator(`#${id} [data-deck-view="${view}"]`).click();
    }
    const fitted = viewport.width >= 1120 && viewport.height >= 720;
    if (!fitted) await alignStart(page, `#${id}`);
    if (viewport.width < 768 && ["work", "games"].includes(surface)) {
      await shot(`${surface}-top`);
      await alignStart(page, `#${id} [data-card] .deck-card__actions`);
    }
    await shot(surface);
  }
  await navigate(page, `/${locale}/tooling/`);
  await page.locator('[data-deck-view="cards"]').click();
  await shot("tooling-top");
  if (viewport.width < 768)
    await alignStart(page, "[data-card] .deck-card__actions");
  await shot("tooling");
  await page.locator('[data-deck-view="list"]').click();
  if (viewport.width < 1120) await alignStart(page, "[data-deck-list]");
  await shot("tooling-list");
  await navigate(page, `/${locale}/work/regrind/`);
  await shot("regrind");
  await alignStart(page, ".case-file__body");
  await shot("regrind-details");
  await navigate(page, `/${locale}/blog/`);
  await shot("blog");
  const article =
    locale === "de"
      ? "/de/blog/de-translation-tonight-i-cry/"
      : "/ru/blog/is-time-wasted/";
  await navigate(page, article);
  await shot("article");
}

try {
  for (const locale of locales)
    for (const [width, height] of matrix) {
      const viewport = { width, height };
      const context = await browser.newContext({
        viewport,
        reducedMotion: "reduce",
        hasTouch: width < 1120,
        serviceWorkers: "block",
      });
      await context.route("**/*", (route) =>
        new URL(route.request().url()).origin === base.origin
          ? route.continue()
          : route.abort(),
      );
      const page = await context.newPage();
      try {
        await navigate(page, `/${locale}/`);
        await capture(page, locale, viewport, "home");
        if (
          (width === 320 && height === 568) ||
          (width === 1440 && height === 900)
        ) {
          await inspectSurfaces(page, locale, viewport);
        }
      } catch (error) {
        failures.push({
          locale,
          viewport,
          url: page.url(),
          error: String(error),
        });
      } finally {
        await context.close();
      }
    }
} finally {
  await browser.close();
  await writeFile(
    resolve(outputDirectory, "manifest.json"),
    JSON.stringify({ baseURL: base.href, entries, failures }, null, 2) + "\n",
  );
}
const overflows = entries.filter((entry) => entry.documentOverflow > 0);
console.log(
  `${entries.length} screenshots; ${overflows.length} horizontal overflows; ${failures.length} failed flows. ${outputDirectory}`,
);
if (overflows.length || failures.length) process.exitCode = 1;
