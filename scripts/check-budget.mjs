// Landing-page weight budget (docs/visual-design.md, "Performance budget").
// Counts the gzipped JS a first visit to /en/ downloads before any interaction
// (entry module scripts plus their static imports) and the page's stylesheets.
// Lazy chunks (the options drawer, future minigames) are excluded.
import { readFileSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET = { js: 15 * 1024, css: 32 * 1024 };
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
if (failed) process.exit(1);
