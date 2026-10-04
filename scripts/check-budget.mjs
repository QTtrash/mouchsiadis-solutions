// Landing-page weight budget (docs/visual-design.md, "Performance budget").
// Counts the gzipped JS a first visit to /en/ downloads before any interaction
// (entry module scripts plus their static imports) and the page's stylesheets.
// Lazy chunks (the options drawer, future minigames) are excluded.
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET = { js: 15 * 1024, css: 32 * 1024, art: 20 * 1024 };
const dist = new URL("../dist/", import.meta.url).pathname;
const html = readFileSync(join(dist, "en/index.html"), "utf8");
const gz = (path) => gzipSync(readFileSync(join(dist, path))).length;

const seen = new Set();
const visit = (path) => {
  if (seen.has(path)) return;
  seen.add(path);
  const source = readFileSync(join(dist, path), "utf8");
  // static imports only: `import"./x.js"`, `from"./x.js"`; dynamic import() stays lazy
  for (const [, spec] of source.matchAll(/(?:\bfrom|\bimport)\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) {
    visit(posix.join(dirname(path), spec));
  }
};
for (const [, src] of html.matchAll(/<script[^>]*type="module"[^>]*src="\/([^"]+)"/g)) visit(src);

const js = [...seen].map((path) => [path, gz(path)]);
const css = [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="\/([^"]+)"/g)].map(([, href]) => [href, gz(href)]);
const total = (rows) => rows.reduce((sum, [, size]) => sum + size, 0);
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

let failed = false;
for (const [label, rows, limit] of [["JS", js, BUDGET.js], ["CSS", css, BUDGET.css]]) {
  const sum = total(rows);
  const ok = sum <= limit;
  failed ||= !ok;
  console.log(`${ok ? "ok  " : "FAIL"} ${label} ${kb(sum)} gz / budget ${kb(limit)}`);
  rows.forEach(([path, size]) => console.log(`       ${kb(size).padStart(8)}  ${path}`));
}
// Artwork is build-time inline SVG. Check every generated page, so adding
// records or a showcase cannot silently exceed the documented per-page limit.
const pages = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? pages(path) : entry.name.endsWith(".html") ? [path] : [];
});
const artwork = pages(dist).map((path) => {
  const source = readFileSync(path, "utf8");
  const svg = [...source.matchAll(/<svg\b[\s\S]*?<\/svg>/g)].map(([markup]) => markup).join("");
  return [path.slice(dist.length), svg ? gzipSync(svg).length : 0];
}).sort((a, b) => b[1] - a[1]);
const oversized = artwork.filter(([, size]) => size > BUDGET.art);
failed ||= oversized.length > 0;
console.log(`${oversized.length ? "FAIL" : "ok  "} artwork ${kb(artwork[0]?.[1] ?? 0)} gz maximum / budget ${kb(BUDGET.art)} across ${artwork.length} pages`);
for (const [path, size] of oversized.length ? oversized : artwork.slice(0, 1)) {
  console.log(`       ${kb(size).padStart(8)}  ${path}`);
}
if (failed) process.exit(1);
