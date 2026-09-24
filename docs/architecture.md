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
- `/<locale>/work/<slug>/` renders a case file for every project, tool, and game record (shareable URLs behind each card)
- `/en/blog`, `/ru/blog`, `/de/blog`, `/ge/blog` render localized blog index shells
- `/en/blog/<slug>`, `/ru/blog/<slug>`, `/de/blog/<slug>`, `/ge/blog/<slug>` render original-language posts inside a localized shell

## Source Files

- `src/pages/[locale]/index.astro`
  Source for the terminal landing page: hero with the recruiter fast path and proof points, Work and Games card decks, experience, notes, and contact (which includes the CV). Desktop panels: Overview, Work, Games, Experience, Notes, Contact. `#cv` is an alias for Contact.
- `src/pages/[locale]/work/[slug].astro`
  Case file per record: outcome, evidence, what was built, stack, external links, hire actions, previous/next case.
- `src/components/CardDeck.astro`, `src/components/CaseCard.astro`
  The card hand, card reader, and the List view of the same records. Server-rendered HTML; `src/scripts/deck.ts` adds behaviour.
- `src/lib/cards.ts`
  Derives cards from `content.ts`: suit per collection, case-file paths, outcome text, and shared view-transition names.
- `src/scripts/deck.ts`
  Cards/List switch (persisted as `deckView` in localStorage), flip, drag-to-reader on fine pointers, and back/forward-cache reset.
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
  Plain five-link navigation (Work, Games, Tooling, Experience, Notes), the amber Hire me action, locale navigation (in the drawer below 1120px), and a wrapped Web Awesome drawer for navigation, CV, and preferences.

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
- `npm run budget` checks the landing page's gzipped JS and CSS against the performance budget.
- `npm run test:a11y` runs axe WCAG A/AA checks on the primary surfaces, including case files.
- `tests/deck.spec.ts` covers the fast path, case files, the Cards/List switch, flipping, drag-to-reader, touch layout, and reduced motion.

See [visual-design.md](./visual-design.md) for design intent, reference principles, and component rules.
