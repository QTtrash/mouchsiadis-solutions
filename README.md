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

The landing page is a playable portfolio inside a retro field-terminal console. Visitors who are hiring get a fast path (Hire me, CV, three evidenced proof points) on the first screen. Everyone else can play the work: projects and games are record cards you flip and drag into the terminal's card reader to open a shareable case file. All art is code-drawn pixel sprites rendered to SVG at build time, including a pixel avatar generated from the profile photo. Every card interaction has a plain equivalent (a List view and an Open case file link). The design avoids direct Fallout asset or logo reuse.

## Command Summary

- `npm ci`: installs project dependencies
- `npm run dev`: starts the Astro dev server
- `npm run build`: generates `dist/`
- `npm run check`: runs Astro and TypeScript diagnostics
- `npm run budget`: checks landing-page JS/CSS against the performance budget (run after `build`)
- `npm run test:e2e`: checks responsive behavior, card interactions, and accessibility in real browsers
- `npm run validate`: check, build, budget, and the full e2e suite
- `node scripts/pixelate-avatar.mjs`: regenerates the pixel avatar from `public/images/profile-pic.webp`
- `npm run preview`: serves the built site locally
- `./ops/setup`: creates `~/envs/mouchsiadis-solutions.env`
- `./ops/deploy`: builds and deploys the app stack
- `./ops/status`: shows git and compose status

## Production

- App deploy assets live in [`deploy/`](./deploy/README.md).
- This repo owns one runtime service: `web`.
- TLS and host routing live in the sibling `../vps-proxy` repo.
- Canonical domain: `https://mouchsiadis-solutions.com`
