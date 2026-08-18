# Architecture

## Overview

`mouchsiadis-solutions` is a multilingual static site that ships behind the shared VPS proxy pattern used by sibling projects.

The site has three public concerns:

- multilingual portfolio landing experience
- integrated blog using imported AF Blog MDX content
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
- `src/layouts/BaseLayout.astro`
  Global shell, metadata, header/footer, CRT noise layer, and shared stylesheet import.
- `src/layouts/PostLayout.astro`
  Blog-post layout with metadata, original-language label, and adjacent navigation.
- `src/components/ArchiveEntry.astro`
  Expandable archive card used across software work, experience, and game-dev sections.

## Build Path

- `astro.config.mjs`
  Defines the canonical site URL and Astro integrations for MDX, React islands, and sitemap generation.
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

- a fixed hardware-console landing experience inspired by Pip-Boy controls
- phosphor-green CRT color tokens, scanline/noise treatment, and screen vignette
- compact side navigation with internal panel switching
- archive cards tuned for dense portfolio scanning
- responsive fallbacks that preserve the console frame while keeping content scrollable

See [visual-design.md](./visual-design.md) for design intent, reference principles, and component rules.
