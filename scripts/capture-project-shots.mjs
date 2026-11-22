// Captures signed-out public pages of the portfolio's live projects for the
// case-file galleries. Usage:
//   node scripts/capture-project-shots.mjs [outDir] [slug...]
// Writes <outDir>/<slug>/<name>.png (raw captures). Review every capture for
// personal data before converting and committing it (docs/content-model.md,
// "Screenshots"). Only public pages: never sign in, never capture admin views.
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "@playwright/test";

const outDir = process.argv[2] ?? "screens-raw";
const only = new Set(process.argv.slice(3));

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
const PHONE = { ...devices["iPhone 13"], deviceScaleFactor: 2 };
const LOCALE_HEADERS = { "Accept-Language": "en-US,en;q=0.9" };

/** slug → captures. `frame` is the gallery treatment; `phone` uses the phone device. */
export const targets = {
  ypay: [
    { name: "home", url: "https://ypay.ge/" },
    { name: "home-phone", url: "https://ypay.ge/", phone: true },
  ],
  ydesk: [
    { name: "home", url: "https://ydesk.org/" },
    { name: "home-phone", url: "https://ydesk.org/", phone: true },
  ],
  neopoints: [
    { name: "home", url: "https://neopoints.ge/", select: { selector: "select", value: "en" } },
    { name: "home-phone", url: "https://neopoints.ge/", phone: true, select: { selector: "select", value: "en" } },
  ],
  "neo-taxi-site": [
    { name: "home", url: "https://yandex-partner.ge/?lang=en" },
    { name: "calculator", url: "https://yandex-partner.ge/calculator?lang=en" },
    { name: "delivery-phone", url: "https://neodelivery.ge/?lang=en", phone: true },
  ],
  space: [
    { name: "home", url: "https://spacepark.ge/en" },
    { name: "home-phone", url: "https://spacepark.ge/en", phone: true },
    { name: "payments-phone", url: "https://payments.spacepark.ge/", phone: true },
  ],
  grindlike: [
    { name: "home", url: "https://grindlike.pro/", dismiss: "Decline analytics" },
    { name: "home-phone", url: "https://grindlike.pro/", phone: true, dismiss: "Decline analytics" },
  ],
  "raid-signal": [
    { name: "home", url: "https://signal.mouchsiadis-solutions.com/" },
    { name: "home-phone", url: "https://signal.mouchsiadis-solutions.com/", phone: true },
  ],
  "flygod-studios": [
    { name: "home", url: "https://flygod.games/" },
    { name: "home-phone", url: "https://flygod.games/", phone: true },
  ],
  "alice-plays": [
    { name: "home", url: "https://www.alice-plays.online/" },
    { name: "home-phone", url: "https://www.alice-plays.online/", phone: true },
  ],
};

const browser = await chromium.launch();
const manifest = [];
try {
  for (const [slug, shots] of Object.entries(targets)) {
    if (only.size && !only.has(slug)) continue;
    await mkdir(path.join(outDir, slug), { recursive: true });
    for (const shot of shots) {
      const context = await browser.newContext({
        ...(shot.phone ? PHONE : DESKTOP),
        reducedMotion: "reduce",
        extraHTTPHeaders: LOCALE_HEADERS,
        locale: "en-US",
      });
      const page = await context.newPage();
      const file = path.join(outDir, slug, `${shot.name}.png`);
      try {
        const response = await page.goto(shot.url, { waitUntil: "networkidle", timeout: 45_000 });
        // Decline optional banners rather than capturing them over the product.
        if (shot.dismiss) await page.getByRole("button", { name: shot.dismiss }).click({ timeout: 5000 }).catch(() => {});
        if (shot.select) {
          await page.locator(shot.select.selector).selectOption(shot.select.value).catch(() => {});
          await page.waitForLoadState("networkidle").catch(() => {});
        }
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1200);
        await page.screenshot({ path: file });
        manifest.push({ slug, name: shot.name, url: page.url(), status: response?.status() ?? 0, file });
        console.log(`${response?.status()} ${slug}/${shot.name} ← ${page.url()}`);
      } catch (error) {
        manifest.push({ slug, name: shot.name, url: shot.url, error: String(error) });
        console.error(`FAIL ${slug}/${shot.name}: ${error}`);
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
console.log(JSON.stringify(manifest, null, 2));
