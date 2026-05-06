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
- [src/pages/[locale]/blog/index.astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/blog/index.astro): localized blog index source
- [src/pages/[locale]/blog/[...slug].astro](/home/truegrind/projects/mouchsiadis-solutions/src/pages/[locale]/blog/[...slug].astro): locale-aware post route source
- [src/lib/content.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/content.ts): portfolio, game-dev, and experience data
- [src/lib/i18n.ts](/home/truegrind/projects/mouchsiadis-solutions/src/lib/i18n.ts): locale copy and SEO strings

## Visual Direction

The landing page is a professional portfolio inside a Pip-Boy-inspired terminal console. It uses a fixed hardware frame, internal section panels, phosphor-green CRT styling, compact controls, and dense archive cards while avoiding direct Fallout asset or logo reuse.

## Command Summary

- `npm ci`: installs project dependencies
- `npm run dev`: starts the Astro dev server
- `npm run build`: generates `dist/`
- `npm run preview`: serves the built site locally
- `./ops/setup`: creates `~/envs/mouchsiadis-solutions.env`
- `./ops/deploy`: builds and deploys the app stack
- `./ops/status`: shows git and compose status

## Production

- App deploy assets live in [`deploy/`](./deploy/README.md).
- This repo owns one runtime service: `web`.
- TLS and host routing live in the sibling `../vps-proxy` repo.
- Canonical domain: `https://mouchsiadis-solutions.com`
