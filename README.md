# Mouchsiadis Solutions

Multilingual portfolio, blog, and CV site for `mouchsiadis-solutions.com`.

## Start Here

- Agent guide and owner rules: [AGENTS.md](./AGENTS.md)
- Architecture: [docs/architecture.md](/home/truegrind/projects/mouchsiadis-solutions/docs/architecture.md)
- Content model: [docs/content-model.md](/home/truegrind/projects/mouchsiadis-solutions/docs/content-model.md)
- Visual design: [docs/visual-design.md](/home/truegrind/projects/mouchsiadis-solutions/docs/visual-design.md)
- Deployment/VPS flow: [docs/deployment.md](/home/truegrind/projects/mouchsiadis-solutions/docs/deployment.md)
- Proxy integration: [docs/proxy-integration.md](/home/truegrind/projects/mouchsiadis-solutions/docs/proxy-integration.md)

## Site Structure

- [src/pages/[locale]/index.astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/index.astro): landing archive source
- [src/pages/[locale]/work/[slug].astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/work/[slug].astro): case file per project, tool, and game
- [src/lib/cards.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/cards.ts): card deck derived from content
- [src/lib/gallery.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/gallery.ts) and [src/lib/diagrams.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/diagrams.ts): case-file screenshots and architecture flows
- [src/lib/art.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/art.ts): PixelLab card art, UI icons, the operator-room scene and VFX strips (`src/assets/art/`)
- [src/components/ViewSwitch.astro](/home/truegrind/projects/mouchsiadis-solutions/src/components/ViewSwitch.astro): the rusty lever between the Simple and terminal views
- [src/pages/[locale]/blog/index.astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/blog/index.astro): localized blog index source
- [src/pages/[locale]/blog/[...slug].astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/blog/[...slug].astro): locale-aware post route source
- [src/lib/content.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/content.ts): portfolio, game-dev, and experience data
- [src/lib/i18n.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/i18n.ts): locale copy and SEO strings

## Visual Direction

Since November 2026 the site has two views of the same records. Visitors land in the **Simple view**: a black "datasheet + pixels" layout for recruiters. It has a spec-sheet title block with the name, a pixel portrait and a Base/Status/Live table, numbered work rows with each project's PixelLab pixel art, mono labels and one green signal colour. Screenshots live in the case files. A deliberately rusty cartoon lever on the left of the header switches to the **terminal view** described below; `?view=terminal` or `?view=simple` links choose a view directly. See "November 2026" in [docs/visual-design.md](./docs/visual-design.md).

The terminal view is a portfolio inside a retro field-terminal console: a pixel-bevelled MS-86 chassis around a rounded CRT glass, P1-green phosphor and one amber action per view. The first screen names Suren (no headline and no hero buttons, by owner decision of 22 November 2026), shows his location and availability, a PixelLab operator-room scene, and live proof drawn from the content records. Contact is in the header. Prospective clients come first and hiring managers second. Every case file ends with a contextual email call to action, and contact always shows the address beside a copy button. Technical visitors can explore complete card summaries, List views, shareable case files, and optional card/game interactions. Cards wrap without overlapping, rest in a slight fan when motion is allowed, and keep their direct actions visible. Project illustrations, icons and sprite VFX are PixelLab pixel art in one 13-colour palette (see "Datasheet + pixels" in docs/visual-design.md); suits, chassis parts and the avatar stay code-drawn pixel SVG. Montserrat display headlines, IBM Plex Mono chrome and IBM Plex Sans body copy carry Latin and Cyrillic; Georgian has explicit Noto glyph coverage. Reading surfaces never glow. The design avoids direct Fallout asset or logo reuse.

The fitted console is a progressive enhancement for viewports at least 1120×720. Phones, tablets, short laptops, and JavaScript-disabled browsers use continuous document flow. Blog bodies and original-language article routes are preserved. Research principles, the responsive matrix, and review boundaries are documented in [docs/visual-design.md](./docs/visual-design.md).

## Command Summary

- `npm ci`: installs project dependencies
- `npm run dev`: starts the Astro dev server
- `npm run build`: generates `dist/`
- `npm run check`: runs Astro and TypeScript diagnostics
- `npm run budget`: checks landing-page JS/CSS and every generated page's inline SVG against the performance budgets (run after `build`)
- `npm run test:e2e`: checks responsive behavior, card interactions, and accessibility in real browsers
- `npm run validate`: check, build, budget, and the full e2e suite
- `node scripts/pixelate-avatar.mjs`: regenerates the pixel avatar from `public/images/profile-pic.webp`
- `npm run preview`: serves the built site locally
- `node scripts/capture-design-audit.mjs`: captures the four-locale visual matrix from a running local preview
- `node scripts/capture-project-shots.mjs <outDir> [slug…]`: captures signed-out public pages of the live projects for case-file galleries; review each capture for personal data before converting it into `src/assets/projects/` (see docs/content-model.md, "Screenshots")
- `node scripts/capture-card-reader-audit.mjs`: captures the card decks and reader states from a running local preview
- `./ops/setup`: creates `~/envs/mouchsiadis-solutions.env`
- `./ops/deploy`: builds and deploys the app stack
- `./ops/status`: shows git and compose status

## Production

- App deploy assets live in [`deploy/`](./deploy/README.md).
- This repo owns one runtime service: `web`.
- TLS and host routing live in the sibling `../vps-proxy` repo.
- Canonical domain: `https://mouchsiadis-solutions.com`
