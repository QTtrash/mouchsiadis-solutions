# Content Model

## Locales

Supported locales:

- `en`
- `ru`
- `de`
- `ge`

The visible language switcher uses `EN / RU / DE / GE`. The Georgian route remains `/ge/`, while HTML language metadata uses `ka-GE` through `localeIntlCodes`.

## Portfolio Content

Landing-page content is stored in `src/lib/content.ts`.

The content model only stores portfolio data. Visual palette choices live in `src/assets/styles/global.css`, not in TypeScript content records.

### Profile Facts

`profile` holds owner-confirmed facts shown in the hero: `location` and `availability`, localized for all four locales. Interface copy in `src/lib/i18n.ts` may label them (for example "status"), but claims about Suren live here. Do not add testimonials, client logos, response times or availability wording without the owner's confirmation.

### Track Record

`impact` holds the short results list shown in the hero. Each entry has an optional localized `figure`, localized `text`, and `sources`: the `experiences` slugs whose summary or details state the fact. Add a line only when its source entry already states it; `tests/conversion.spec.ts` checks every figure against its sources.

### Hero Proof

The hero's proof list is derived, not authored: `liveWorkRecords` in `src/lib/cards.ts` selects Work records with `live: true` and links each to its case file. The displayed count comes from that list. Prereleases such as Regrind appear in Work, Tooling and the showcase, not in the live proof.

### Software Work Entries

Each project entry includes:

- `slug`
- `title`
- localized `eyebrow`
- localized `summary`
- optional localized `cardSummary` — concise, authored copy shared by cards, homepage proof links, and the open-source showcase
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

Tools are stored separately as `toolProjects` and rendered as Tool cards on the landing Work deck and the Tooling page. This collection includes production systems and prereleases; membership does not imply LIVE status. The Tooling count is the record count. Game entries are stored as `gameProjects` and render as the Games deck.

- `FlyGod Studios`
- `Alice Plays`
- `Rifle Revolver`
- `Incendiary Revolver`

### Cards and Case Files

Every entry in `projects`, `toolProjects`, and `gameProjects` becomes a card and a case file at `/<locale>/work/<slug>/`; `src/lib/cards.ts` does the mapping. Suits follow the collection: `projects` are Platform, `toolProjects` are Tool, `gameProjects` are Game. Cards, homepage proof links, and the showcase use `cardSummary` when supplied, falling back to `evidence.outcomes` and then `summary`. Concise copy is authored rather than visually truncated. List view uses the full localized `summary` and exposes narrative, details, and evidence through its disclosure. Case files retain the full outcome, summary, and evidence.

Project technology lists support scanning, but evidence fields carry the hiring/client story. Only add claims that can be supported by the public product, source, or owner-provided facts.

German copy uses proper umlauts and ß (the October 2026 pass replaced ASCII transliterations such as "fuer" and "oeffnen"). The product formerly called Neopay is YPay in every locale; its Russian and German summaries follow the English meaning.

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
- each post declares `language` in frontmatter, validated against the supported locale keys by `src/content.config.ts`
- each article has one original-language URL, `/<post.language>/blog/<slug>/`; localized indices link to that URL
- title, excerpt, and body language metadata uses `localeIntlCodes`; localized dates and interface labels retain the shell language
- switching an article’s interface language leads to that locale’s blog index

New English or Georgian posts need the corresponding frontmatter value; no filename inference or translation pass is required.

Navigation, preferences, hero positioning, evidence labels, and all card, reader, and case-file copy (`deckCopy`, `evidenceLabels` in `src/lib/i18n.ts`) are complete in all four locales. Localized records use English as an explicit final fallback where a historical entry has not yet received a translation. New featured work should supply all four locale values before release.

## Open-Source Showcase

The landing showcase derives `openSourceRecords` from Tool records that have a `sourceLink`. Keep project descriptions, links, source links, status, stack, and cover selection there; `i18n.ts` supplies only generic showcase/interface labels. Raid Signal and Regrind appear in the same collection without duplicating their project copy in the page template.

Regrind is an MIT-licensed Windows desktop application for solo Counter-Strike 2 practice, managing a separate local dedicated server. Its current prerelease is distinct from a deployed production service: it does not set `live: true`. Describe implemented capabilities separately from planned features, and link release evidence through the public project/source links. Recheck release status when revising the record.

New featured work must supply all four locale values. Georgian interface terms use “ინსტრუმენტები” for tools and “პროექტის ნახვა” for the direct project action. Technical names remain unchanged where translation would obscure the product or technology. A native Georgian editorial review remains useful for nuance; do not rewrite historical blog bodies as part of that review.
