# Architecture

## Overview

`mouchsiadis-solutions` is a multilingual static site that ships behind the shared VPS proxy pattern used by sibling projects.

The site has four public concerns:

- multilingual portfolio landing experience
- integrated blog using imported AF Blog MDX content
- independent Tooling atlas for live systems
- static production runtime behind the shared `vps-proxy` repo

## Routing

- `/` redirects to `/en`
- `/en`, `/ru`, `/de`, `/ge` render the main archive landing page
- `/en/blog`, `/ru/blog`, `/de/blog`, `/ge/blog` render localized blog index shells
- `/en/blog/<slug>`, `/ru/blog/<slug>`, `/de/blog/<slug>`, `/ge/blog/<slug>` render original-language posts inside a localized shell

## Source Files

- `src/pages/[locale]/index.astro`
  Source for the one-page archive with hero, software work, professional experience, game dev, CV, blog entrypoint, and contact.
- `src/pages/[locale]/blog/index.astro`
  Source for the localized blog listing page.
- `src/pages/[locale]/blog/[...slug].astro`
  Source for all blog-post pages across all locales.
- `src/pages/[locale]/tooling/index.astro`
  Responsive atlas of live tools. Mobile renders native disclosure records; eligible desktops progressively load the Three.js terrain.
- `src/layouts/BaseLayout.astro`
  Global shell, metadata, header/footer, CRT noise layer, and shared stylesheet import.
- `src/layouts/PostLayout.astro`
  Blog-post layout with metadata, original-language label, and adjacent navigation.
- `src/components/ArchiveEntry.astro`
  Expandable archive record used across work and experience, including optional product evidence.
- `src/components/Header.astro`
  Five-group information architecture, locale navigation, and a wrapped Web Awesome drawer for navigation and preferences.

## Build Path

- `astro.config.mjs`
  Defines the canonical site URL and Astro integrations for MDX and sitemap generation. The project ships no React runtime.
- `npm run build`
  Runs `astro build` and produces the production `dist/` output used by Docker/nginx.

## Data Sources

- `src/lib/i18n.ts`
  Locale-level shell copy, labels, SEO metadata, and language constants.
- `src/lib/content.ts`
  Typed portfolio/project/game/experience content used by the landing page.
- `src/content/blog/*.mdx`
  Blog posts migrated from `af-blog-v2`. Post bodies were preserved as-is.

## Visual System

The site uses a shared CSS system in `src/assets/styles/global.css` with:

- an instrument-grade retro-futurist editorial direction
- phosphor-green CRT color tokens, scanline/noise treatment, and screen vignette
- a fitted desktop console and continuous document-flow mobile/tablet composition
- archive cards tuned for dense portfolio scanning
- a Web Awesome navigation drawer and dynamically gated Three.js desktop enhancement

## Validation

- `npm run check` performs Astro/TypeScript diagnostics.
- `npm run build` verifies all static locale routes.
- `npm run test:e2e` runs responsive browser checks at phone, tablet, and desktop sizes.
- `npm run test:a11y` runs axe WCAG A/AA checks on the primary surfaces.

See [visual-design.md](./visual-design.md) for design intent, reference principles, and component rules.
