# Mouchsiadis Solutions

Multilingual portfolio, blog, and CV site for `mouchsiadis-solutions.com`.

## Start Here

- Architecture: [docs/architecture.md](/home/truegrind/projects/mouchsiadis-solutions/docs/architecture.md)
- Content model: [docs/content-model.md](/home/truegrind/projects/mouchsiadis-solutions/docs/content-model.md)
- Visual design: [docs/visual-design.md](/home/truegrind/projects/mouchsiadis-solutions/docs/visual-design.md)
- Deployment/VPS flow: [docs/deployment.md](/home/truegrind/projects/mouchsiadis-solutions/docs/deployment.md)
- Proxy integration: [docs/proxy-integration.md](/home/truegrind/projects/mouchsiadis-solutions/docs/proxy-integration.md)

## Site Structure

- [src/pages/[locale]/index.astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/index.astro): landing archive source
- [src/pages/[locale]/work/[slug].astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/work/[slug].astro): case file per project, tool, and game
- [src/lib/cards.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/cards.ts): card deck derived from content
- [src/pages/[locale]/blog/index.astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/blog/index.astro): localized blog index source
- [src/pages/[locale]/blog/[...slug].astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/blog/[...slug].astro): locale-aware post route source
- [src/lib/content.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/content.ts): portfolio, game-dev, and experience data
- [src/lib/i18n.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/i18n.ts): locale copy and SEO strings

## Visual Direction

The landing page is a portfolio inside a retro field-terminal console: a pixel-bevelled MS-86 chassis around a rounded CRT glass, P1-green phosphor and one amber action per view. The first screen names Suren, states the positioning, offers Contact (primary), CV and Explore, and shows live proof drawn from the content records. Prospective clients come first and hiring managers second. Every case file ends with a contextual email call to action, and contact always shows the address beside a copy button. Technical visitors can explore complete card summaries, List views, shareable case files, and optional card/game interactions. Cards wrap without overlapping, rest in a slight fan when motion is allowed, and keep their direct actions visible. All project art is code-drawn pixel SVG, including a pixel avatar generated from the profile photo. Montserrat display headlines, IBM Plex Mono chrome and IBM Plex Sans body copy carry Latin and Cyrillic; Georgian has explicit Noto glyph coverage. Reading surfaces never glow. The design avoids direct Fallout asset or logo reuse.

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
- `node scripts/capture-card-reader-audit.mjs`: captures the card decks and reader states from a running local preview
- `./ops/setup`: creates `~/envs/mouchsiadis-solutions.env`
- `./ops/deploy`: builds and deploys the app stack
- `./ops/status`: shows git and compose status

## Production

- App deploy assets live in [`deploy/`](./deploy/README.md).
- This repo owns one runtime service: `web`.
- TLS and host routing live in the sibling `../vps-proxy` repo.
- Canonical domain: `https://mouchsiadis-solutions.com`
