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
  Source for the terminal landing page inside the CRT glass. The hero names Suren and his location, states the positioning and offers one primary action (Contact), CV and Explore. Then come live proof (the `live: true` Work records), a direct email line and the owner-confirmed availability, followed by the open-source showcase and Backlog Breaker. The page also holds the Work and Games card decks, experience, notes, and contact. Contact has an email action with a subject, the visible address and a copy button, a "useful to include" list, and the CV. Desktop panels: Overview, Work, Games, Experience, Notes, Contact. `#cv` is an alias for Contact.
- `src/pages/[locale]/work/[slug].astro`
  Case file per record. The header shows the numbered kicker, outcome, role and stack; its product and source links are secondary. Then come the evidence, what was built, stack and previous/next case. It always ends with a contextual call to action (`Email me about {project}` with a subject, CV, visible address).
- `src/components/CardDeck.astro`, `src/components/CaseCard.astro`
  Wrapping card rows and a List view of the same records. Cards/List and the optional card reader (a recessed slot with its status below) share a compact toolbar. Each card joins its Flip and Open case file tab to the top of the faces, so long cards can be flipped before reading, and repeats its suit as a turned corner pip. Server-rendered HTML; `src/scripts/deck.ts` adds behaviour.
- `src/lib/cards.ts`
  Derives cards from `content.ts`: suit per collection, case-file paths, outcome text, and shared view-transition names. `cardSummary` selects authored concise copy for cards, the hero proof, and the showcase; List uses the full summary and case-file evidence stays complete. `openSourceRecords` selects Tool records with a public source link; `liveWorkRecords` selects the Work records that run in production for the hero proof and its count.
- `src/lib/contact.ts`
  The single contact address and `mailto()` with an optional subject, shared by the hero, contact panel, case files, the 404 page and articles.
- `src/lib/pixel.ts`, `src/lib/sprites.ts`, `src/components/PixelArt.astro`
  Pixel art: a small raster canvas (rect, line, disc, ring, dither, glyph), the sprite library (project art by slug, category covers, suits, nav icons, monogram), and build-time SVG rendering with one path per palette key. `CoverArt.astro` picks record art, then the category cover.
- `src/components/OpenSourceShowcase.astro`
  Shared record-driven showcase with project artwork and release status. Each project has one Open case file button; product and source are quiet inline links.
- `src/components/BacklogBreaker.astro`, `src/scripts/breaker.ts`, `src/lib/breaker-layout.ts`
  The optional mini-game below the overview's showcase: build-time pixel poster and a secondary Start button, a lazy canvas engine loaded on Start, and the geometry both share.
- `src/lib/avatar.ts`
  Generated 32x32 avatar sprite; regenerate with `node scripts/pixelate-avatar.mjs` after changing `public/images/profile-pic.webp`.
- `src/scripts/deck.ts`
  Cards/List switch (persisted as `deckView` in localStorage), flip, drag-to-reader on fine pointers (the preview keeps the card's layout size and resting fan angle), and back/forward-cache reset.
- `src/scripts/terminal.ts`
  Fitted-console panels, hash/back navigation and focus handling, plus one decorative CRT power-on per session (skipped under reduced motion, Effects: Reduced, or blocked storage).
- `src/scripts/copy-email.ts`
  Reveals a copy button beside each visible address and copies it (falling back to selecting the text).
- `src/pages/[locale]/blog/index.astro`
  Source for the localized blog listing page.
- `src/pages/[locale]/blog/[...slug].astro`
  Source for blog-post pages under each post’s original language, read from frontmatter.
- `src/pages/[locale]/tooling/index.astro`
  The Tool collection as a field-terminal panel: wrapping Tool cards, optional reader/drag, flip, and List view, with navigation back into the landing panels. Counts include production tools and prereleases; they are not a count of LIVE systems.
- `src/layouts/BaseLayout.astro`
  Global shell, metadata, header/footer, decorative terminal layer, and shared stylesheet/font imports. Georgian font imports are script subsets; language codes map the `/ge/` route to `ka-GE`.
- `src/layouts/PostLayout.astro`
  Blog-post layout with metadata, original-language label, adjacent navigation, and a quiet contact line after the article.
- `src/pages/404.astro`
  One static 404 for every locale: English renders by default, an inline script shows the copy for the requested path's locale, and each version offers a way home and an email line.
- `src/components/ArchiveEntry.astro`
  Expandable archive record used across work and experience, including optional product evidence.
- `src/components/Header.astro`
  Five-link mono navigation (Work, Games, Tooling, Experience, Notes), the secondary amber-outlined Contact key, locale keys (in the drawer below 1120px), and a wrapped Web Awesome drawer for navigation, CV, and preferences.

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

- the field terminal: a pixel-bevelled MS-86 chassis around a rounded CRT glass with background scanlines, P1-green phosphor and one amber action per view
- Montserrat 800 display headlines with phosphor glow in the chrome only; IBM Plex Mono for keys, labels and actions; IBM Plex Sans body; explicit Noto Georgian glyph coverage in every stack
- calm reading surfaces: case files and articles never glow
- continuous document flow by default; JavaScript enhances viewports at least 1120×720 into a fitted console
- non-overlapping playing cards with visible direct actions, full summary text and an optional resting fan
- a Web Awesome navigation drawer; no WebGL shipped, and any future decorative WebGL follows the conditional rule and budget in [visual-design.md](./visual-design.md)

## Validation

- `npm run check` performs Astro/TypeScript diagnostics.
- `npm run build` verifies all static locale routes.
- `npm run test:e2e` runs responsive browser checks at phone, tablet, and desktop sizes.
- `npm run budget` checks the landing page's gzipped JS and CSS, a separate lazy-only budget for decorative WebGL chunks (`webgl-*`), and inline SVG on every generated HTML page.
- `npm run test:a11y` runs axe WCAG A/AA checks on the primary surfaces, including case files.
- `tests/deck.spec.ts` covers the fast path, case files, the Cards/List switch, flipping, drag-to-reader, touch layout, and reduced motion.
- `tests/conversion.spec.ts` covers one primary action per view, first-viewport proof, case-file endings, the showcase hierarchy, the contact panel and copy button, calm reading surfaces, rendered display fonts, the localized 404, the article contact line, and the non-overlapping fan.

See [visual-design.md](./visual-design.md) for design intent, reference principles, and component rules.
