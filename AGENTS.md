# Agent guide: mouchsiadis-solutions

Suren Mouchsiadis's multilingual portfolio, blog and CV site (`mouchsiadis-solutions.com`). It is a static Astro 7 build served by nginx in Docker behind the shared `vps-proxy`. Read this file first. Then read the doc for the area you change:

| Area | Read |
| --- | --- |
| Pages, components, scripts, styles | [docs/architecture.md](docs/architecture.md) |
| Content records, screenshots, locales | [docs/content-model.md](docs/content-model.md) |
| Look, views, motion, budgets, references | [docs/visual-design.md](docs/visual-design.md) |
| Releases and the VPS | [docs/deployment.md](docs/deployment.md), [docs/proxy-integration.md](docs/proxy-integration.md), and the host guide `~/VPS_README.md` with `~/AGENTS.md` |

## Owner rules

These are standing owner decisions. Do not reverse them without asking.

**Views**
- First visits, no-JS and plain links get the **Simple view**. The terminal is opt-in through the rusty header lever (`ViewSwitch.astro`) or `?view=terminal`.
- The lever should keep looking cartoonish, rusty and out of place.
- The Simple view is a **datasheet + pixels** design: black, square-cornered, mono labels, one green signal colour (`--sheet-signal`), numbered work rows with each record's pixel card art. Do not drift back to a generic pill-button dark theme.

**Copy**
- Job titles stay in **English in every locale**, for example "Senior platform engineer".
- The hero is **the name alone**: name (the page's only `h1`), location, availability, and in the Simple view the datasheet spec list. There is **no headline, no general line, no hero buttons, no track record list and no "write directly" email line** (owner decisions). Do not bring any of them back in either view or any locale. Contact lives in the header and the Contact section; the CV lives in Contact.
- Every claim must be backed by the product, its source, the project's own docs or owner-provided facts. No testimonials, client logos, response times or new availability wording without the owner.

**LIVE**
- `live: true` means the system runs in production. YLead is LIVE by owner decision.

**SurikMods**
- Never mention AI assistance, and show no download counts. One entry covers the three mods.

**Art**
- Project illustrations, UI icons and VFX come from **PixelLab** (MCP server `pixellab`) in the fixed 13-colour MS-86 palette (`docs/visual-design.md`, "Pixel art (PixelLab)"). Keep new art in that palette and style.
- Art is shown pixelated at 1×, 1.5× or 2×, ships as hashed PNG files and is never inlined.
- No text, logos or third-party marks in generated art. Experience art (`src/assets/art/experience/`) shows the work, never the employer's brand.

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
- At most one filled primary (`.button--primary`) is on screen. The landing hero has none. Case files end with "Email me about {project}". External product links are never primary.

**Protected content**
- Never edit blog post bodies.
- `cv/*.tex` is the source of truth for Experience. Rebuild the PDF as described in `cv/`.
- No Fallout assets, logos or implied affiliation.

## Code map (short)

- **Content:** `src/lib/content.ts` holds the records. `src/lib/gallery.ts` maps slugs to screenshots and `src/lib/art.ts` maps slugs to PixelLab art; both stay separate so Node tests can import `content.ts`. `src/lib/diagrams.ts` holds the architecture flows. `src/lib/i18n.ts` holds all interface copy.
- **Pages:** `src/pages/[locale]/index.astro` is the landing page, one DOM for both views. `src/pages/[locale]/work/[slug].astro` is the case file. In the terminal view, Tooling is a tab of the landing console (`#tooling`); `src/pages/[locale]/tooling/` serves the Simple view and redirects terminal visitors to the tab. Every terminal tab must behave the same: no tab may load a separate page.
- **View switch:**
  - The pre-paint script in `src/components/BaseHead.astro` sets `html[data-view]`.
  - `Header.astro` wires the lever and the drawer toggle.
  - `src/scripts/terminal.ts` fits the console only in the terminal view.
- **Styles:**
  - `global.css` and `deck.css` hold the terminal skin and shared layout.
  - `simple.css` is the Simple view, scoped to `:root[data-view="simple"]`. Keep it as flat selectors with no CSS nesting, because Vite ships nesting as written.
  - `present.css` holds the case-file pieces shared by both views.
  - `switch.css` styles the lever. `crt.css` holds the terminal realism layers.
  - `art.css` holds the pixel art and sprite VFX for both views (`CardArt.astro` renders a record's art).

## Performance rule

Decorative motion may animate only `transform` or `opacity`, on small elements. Sprite VFX walk a strip with `transform` and `steps()` inside a small window (`art.css`). Never animate `background-position`, `filter`, gradients or other paint properties over the CRT glass or the panels. A moving refresh band once did that and dropped the terminal to about 14 fps. In the fitted console, `.terminal-console__content` keeps its own compositor layer (`crt.css`), so panel switches and scrolling never repaint the glass. `tests/performance.spec.ts` traces an idle terminal and fails if it repaints. When you add motion, check it with a Chrome trace.

## Commands

```bash
npm run dev        # local dev server
npm run validate   # astro check + build + budgets + full Playwright suite (~9 min)
npm run budget     # gzipped budgets after a build: JS 15 KB, CSS 32 KB, inline art 20 KB, WebGL 6 KB
node scripts/capture-project-shots.mjs <outDir> [slug…]   # public screenshots for case files
```

**PixelLab (art, icons, VFX)**

- The MCP server `pixellab` (`https://api.pixellab.ai/mcp`, HTTP, bearer key) is registered at local scope for this project in `~/.claude.json`; never commit the key. The owner's plan has 2000 generations a month (`get_balance`).
- Card art: `create_image_pro`, 128×64, `no_background: false`, the 13-colour `palette` from `docs/visual-design.md`, `style_image_url` = `src/assets/art/cards/ypay.png` as a data URL with `style_copy` outline/detail/shading. One call costs 10 generations and returns 4 candidates. At most 8 jobs run at once; use `wait_for_jobs` instead of polling.
- Icons: `create_1_direction_object` at size 32 with `item_descriptions` (64 candidates for 10 generations).
- VFX: `vfx_workbench` (free). Export, then repack the sheet into a one-row strip without blank frames and add its geometry to `VFX` in `src/lib/art.ts`.
- Review every candidate by eye: no text, logos or third-party marks. Copy the chosen PNG into `src/assets/art/`.

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
6. Release evidence goes to `~/state/mouchsiadis-solutions/releases/` and the commit message. `~/VPS_README.md` is not updated per release.

Do not change `../vps-proxy` without reading its own AGENTS.md. Keep review screenshots out of `public/` and out of the repository; write them to the scratchpad or `~/state/mouchsiadis-solutions/`.

## Documentation

Follow [the host documentation rules](../../AGENTS.md#documentation-rules). Docs describe current state: update the owning section in place, never append dated release sections. Release evidence goes to `~/state/mouchsiadis-solutions/releases/` and the commit message. Unverified production behaviour is an undated "Not yet verified in production" line in the owning doc. Owner rules above are the accepted decisions; change them only with the owner.
