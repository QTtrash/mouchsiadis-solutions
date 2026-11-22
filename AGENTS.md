# Agent guide: mouchsiadis-solutions

Suren Mouchsiadis's multilingual portfolio, blog and CV site (`mouchsiadis-solutions.com`). It is a static Astro 7 build served by nginx in Docker behind the shared `vps-proxy`. Read this file first. Then read the doc for the area you change:

| Area | Read |
| --- | --- |
| Pages, components, scripts, styles | [docs/architecture.md](docs/architecture.md) |
| Content records, screenshots, locales | [docs/content-model.md](docs/content-model.md) |
| Look, views, motion, budgets, references | [docs/visual-design.md](docs/visual-design.md) (the "November 2026" section supersedes older direction) |
| Releases and the VPS | [docs/deployment.md](docs/deployment.md), [docs/proxy-integration.md](docs/proxy-integration.md), and the host guide `~/VPS_README.md` with `~/AGENTS.md` |

## Owner rules

These are standing owner decisions. Do not reverse them without asking.

**Views**
- First visits, no-JS and plain links get the **Simple view**. The terminal is opt-in through the rusty header lever (`ViewSwitch.astro`) or `?view=terminal`.
- The lever should keep looking cartoonish, rusty and out of place.

**Copy**
- Job titles stay in **English in every locale**, for example "Senior platform engineer".
- The hero stays general: one line about what Suren builds, plus the track record from `impact`. Project depth belongs in case files.
- Every claim must be backed by the product, its source, the project's own docs or owner-provided facts. No testimonials, client logos, response times or new availability wording without the owner.
- `impact` lines cite experience slugs, and a test checks every figure.

**LIVE**
- `live: true` means the system runs in production. YLead is LIVE by owner decision.

**SurikMods**
- Never mention AI assistance, and show no download counts. One entry covers the three mods.

**Screenshots**
- Use **public, signed-out pages only**. Never capture admin or internal screens.
- Review every capture for personal data before committing it.
- Never hotlink third-party image hosts; store our own copies under `src/assets/projects/`.

**Locales**
- New copy ships in **en, ru, de and ge**.
- German uses real umlauts and ß.
- Georgian uses the fixed terms "ინსტრუმენტები" (tools) and "პროექტის ნახვა" (view project).
- Add new ru/de/ge copy to the native-review list in `docs/visual-design.md`.

**Conversion**
- Each view has exactly one filled primary (`.button--primary`). Case files end with "Email me about {project}". External product links are never primary.

**Protected content**
- Never edit blog post bodies.
- `cv/*.tex` is the source of truth for Experience. Rebuild the PDF as described in `cv/`.
- No Fallout assets, logos or implied affiliation.

## Code map (short)

- **Content:** `src/lib/content.ts` holds the records. `src/lib/gallery.ts` maps slugs to screenshots and stays separate so Node tests can import `content.ts`. `src/lib/diagrams.ts` holds the architecture flows. `src/lib/i18n.ts` holds all interface copy.
- **Pages:** `src/pages/[locale]/index.astro` is the landing page, one DOM for both views. `src/pages/[locale]/work/[slug].astro` is the case file.
- **View switch:**
  - The pre-paint script in `src/components/BaseHead.astro` sets `html[data-view]`.
  - `Header.astro` wires the lever and the drawer toggle.
  - `src/scripts/terminal.ts` fits the console only in the terminal view.
- **Styles:**
  - `global.css` and `deck.css` hold the terminal skin and shared layout.
  - `simple.css` is the Simple view, scoped to `:root[data-view="simple"]`. Keep it as flat selectors with no CSS nesting, because Vite ships nesting as written.
  - `present.css` holds the case-file pieces shared by both views.
  - `switch.css` styles the lever. `crt.css` holds the terminal realism layers.

## Commands

```bash
npm run dev        # local dev server
npm run validate   # astro check + build + budgets + full Playwright suite (~9 min)
npm run budget     # gzipped budgets after a build: JS 15 KB, CSS 32 KB, inline art 20 KB, WebGL 6 KB
node scripts/capture-project-shots.mjs <outDir> [slug…]   # public screenshots for case files
```

**Testing notes**

- Playwright starts its own `vite preview` on **127.0.0.1:4322**, so free that port first. A long-running preview on 4321 is normal on the VPS.
- The suite runs in the terminal view through `tests/terminal-view.json` (storage state). `tests/simple-view.spec.ts` clears it to test the default view.
- The card-reader "interrupted gestures" test is marked slow; it takes about 40 s alone.
- Do not `pkill -f "vite preview…"` from the same shell command line, because it matches and kills that shell. Find the PID with `ss -ltnp | grep 4322`.

## Release

Commit and push only when the owner asks. When they do:

1. Run `npm run validate`, which must pass.
2. Commit on a branch, push it, fast-forward `main` and push `main`.
3. Tag the running image as a rollback: `docker tag mouchsiadis-solutions-web:latest mouchsiadis-solutions-web:rollback-<old-sha>`. Rollback tags are manual retention, not cleanup authority.
4. Deploy with `./ops/deploy`. It builds the image and recreates only `mouchsiadis-solutions-web-1`.
5. Verify the live site: `/en/` and a case file return 200, both views render, and there are no console errors.
6. Record the release in `~/VPS_README.md` as a new dated section, and update the pointer list in `~/AGENTS.md`.

Do not change `../vps-proxy` without reading its own AGENTS.md. Keep review screenshots out of `public/`; use `docs/design-audit/` or the scratchpad.
