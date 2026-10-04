# Architecture

## Overview

`mouchsiadis-solutions` is a multilingual static site that ships behind the shared VPS proxy pattern used by sibling projects.

The site has four public concerns:

- multilingual portfolio landing experience
- integrated blog using imported AF Blog MDX content
- independent Tooling collection for production and prerelease tools
- static production runtime behind the shared `vps-proxy` repo

## Routing

- `/` redirects to `/en`
- `/en`, `/ru`, `/de`, `/ge` render the main archive landing page
- `/<locale>/work/<slug>/` renders a case file for every project, tool, and game record (shareable URLs behind each card)
- `/en/blog`, `/ru/blog`, `/de/blog`, `/ge/blog` render localized blog index shells
- `/<original-locale>/blog/<slug>/` renders each post only under its frontmatter `language` value; article links preserve that original-language route. Language switches from an article lead to the selected locale’s blog index.

## Source Files

- `src/pages/[locale]/index.astro`
  Source for the terminal landing page: hero with the recruiter fast path and proof points, Work and Games card decks, experience, notes, and contact (which includes the CV). Desktop panels: Overview, Work, Games, Experience, Notes, Contact. `#cv` is an alias for Contact.
- `src/pages/[locale]/work/[slug].astro`
  Case file per record: outcome, evidence, what was built, stack, external links, hire actions, previous/next case.
- `src/components/CardDeck.astro`, `src/components/CaseCard.astro`
  Wrapping card rows and a List view of the same records. Cards/List and the optional card reader share a compact toolbar. Each card places its visible Flip and Open case file controls above the faces, so long cards can be flipped before reading. Server-rendered HTML; `src/scripts/deck.ts` adds behaviour.
- `src/lib/cards.ts`
  Derives cards from `content.ts`: suit per collection, case-file paths, outcome text, and shared view-transition names. `cardSummary` selects authored concise copy for cards, homepage proof links, and the showcase; List uses the full summary and case-file evidence stays complete. `openSourceRecords` selects Tool records with a public source link.
- `src/lib/pixel.ts`, `src/lib/sprites.ts`, `src/components/PixelArt.astro`
  Pixel art: a small raster canvas (rect, line, disc, ring, dither, glyph), the sprite library (project art by slug, category covers, suits, nav icons, monogram), and build-time SVG rendering with one path per palette key. `CoverArt.astro` picks record art, then the category cover.
- `src/components/OpenSourceShowcase.astro`
  Shared record-driven showcase with project artwork, release status, case-file, product, and source links.
- `src/components/BacklogBreaker.astro`, `src/scripts/breaker.ts`, `src/lib/breaker-layout.ts`
  The hero mini-game: build-time pixel poster and Start button, a lazy canvas engine loaded on Start, and the geometry both share.
- `src/lib/avatar.ts`
  Generated 32x32 avatar sprite; regenerate with `node scripts/pixelate-avatar.mjs` after changing `public/images/profile-pic.webp`.
- `src/scripts/deck.ts`
  Cards/List switch (persisted as `deckView` in localStorage), flip, drag-to-reader on fine pointers, and back/forward-cache reset.
- `src/pages/[locale]/blog/index.astro`
  Source for the localized blog listing page.
- `src/pages/[locale]/blog/[...slug].astro`
  Source for blog-post pages under each post’s original language, read from frontmatter.
- `src/pages/[locale]/tooling/index.astro`
  The Tool collection as a field-terminal panel: wrapping Tool cards, optional reader/drag, flip, and List view, with navigation back into the landing panels. Counts include production tools and prereleases; they are not a count of LIVE systems.
- `src/layouts/BaseLayout.astro`
  Global shell, metadata, header/footer, decorative terminal layer, and shared stylesheet/font imports. Georgian font imports are script subsets; language codes map the `/ge/` route to `ka-GE`.
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
- quiet near-black and olive surfaces, green/copper/amber accent roles, and a code-drawn pixel chassis
- continuous document flow by default; JavaScript enhances viewports at least 1120×720 into a fitted console
- shared IBM Plex heading/body/control typography with explicit Noto Georgian glyph coverage
- non-overlapping cards with visible direct actions and full summary text
- archive cards tuned for dense portfolio scanning
- a Web Awesome navigation drawer; no WebGL or 3D runtime

## Validation

- `npm run check` performs Astro/TypeScript diagnostics.
- `npm run build` verifies all static locale routes.
- `npm run test:e2e` runs responsive browser checks at phone, tablet, and desktop sizes.
- `npm run budget` checks the landing page's gzipped JS and CSS, plus inline SVG on every generated HTML page, against the performance budget.
- `npm run test:a11y` runs axe WCAG A/AA checks on the primary surfaces, including case files.
- `tests/deck.spec.ts` covers the fast path, case files, the Cards/List switch, flipping, drag-to-reader, touch layout, and reduced motion.

See [visual-design.md](./visual-design.md) for design intent, reference principles, and component rules.
