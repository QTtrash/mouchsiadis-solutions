# Content Model

## Locales

Supported locales:

- `en`
- `ru`
- `de`
- `ge`

The visible language switcher uses `EN / RU / DE / GE`.

## Portfolio Content

Landing-page content is stored in `src/lib/content.ts`.

The content model only stores portfolio data. Visual palette choices live in `src/assets/styles/global.css`, not in TypeScript content records.

### Software Work Entries

Each project entry includes:

- `slug`
- `title`
- localized `eyebrow`
- localized `summary`
- localized `narrative`
- localized `details`
- `stack`
- localized `meta`
- `link`
- localized `linkLabel`
- `cover`

Current software entries:

- `Neopay`
- `True Grind`
- `Medura Solution`
- `Alice Plays`

Excluded by design:

- `bombtown`
- `af-blog`
- `vps-proxy`
- `neo-public`

## Game Development Entries

Game-dev entries use the same project entry shape.

Current entries:

- `Bomb Town`
- `Rifle Revolver`
- `Incendiary Revolver`

Steam Workshop items are intentionally presented as custom showcase cards rather than embedded Steam widgets.

## Professional Experience

Professional timeline entries are stored as `ExperienceEntry` records in `src/lib/content.ts`.

Each entry includes:

- localized role title
- `company`
- `range`
- `location`
- localized `summary`
- localized `details`
- `stack`
- `cover`

The source of truth is the canonical experience text provided by the user in chat, not PDF parsing.

## Blog Content

Blog posts live in `src/content/blog`.

Rules used in this implementation:

- post bodies remain unchanged
- shell/navigation/metadata are localized
- posts are listed across all locale shells
- original post language is labeled on listings and detail pages
- language inference currently uses filename/slug convention:
  - `de-*` => German
  - everything else => Russian

If future English posts are added, extend the inference logic in `src/lib/blog.ts`.

Georgian shell routes are localized. Portfolio records can fall back to English where a per-entry Georgian case-study translation has not been added yet.
