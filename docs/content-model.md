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
- optional localized `status`
- optional `sourceLink` and localized `sourceLinkLabel` for public-source projects
- optional localized `evidence` with `role`, `contribution`, `constraints`, and `outcomes`
- `cover`
- optional `live` — the system runs in production; it earns the LIVE foil on its card and case file

Selected professional entries:

- `YPay`
- `YDesk`

Live tools are stored separately as `toolProjects` and rendered as Tool cards on the landing Work deck and the Tooling page. Game entries are stored as `gameProjects` and render as the Games deck.

- `FlyGod Studios`
- `Alice Plays`
- `Rifle Revolver`
- `Incendiary Revolver`

### Cards and Case Files

Every entry in `projects`, `toolProjects`, and `gameProjects` becomes a card and a case file at `/<locale>/work/<slug>/`; `src/lib/cards.ts` does the mapping. Suits follow the collection: `projects` are Platform, `toolProjects` are Tool, `gameProjects` are Game. A card's outcome sentence is `evidence.outcomes` when present, otherwise `summary`, so the strongest evidenced sentence always leads.

Project technology lists support scanning, but evidence fields carry the hiring/client story. Only add claims that can be supported by the public product, source, or owner-provided facts.

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

Navigation, preferences, hero positioning, evidence labels, and all card, reader, and case-file copy (`deckCopy`, `evidenceLabels` in `src/lib/i18n.ts`) are complete in all four locales. Localized records use English as an explicit final fallback where a historical entry has not yet received a translation. New featured work should supply all four locale values before release.
