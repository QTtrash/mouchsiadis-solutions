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

### No Track Record

The hero used to show a short results list (`impact`) and a "write directly" email line. The owner removed both on 22 November 2026, and their data and copy were deleted. Do not reintroduce them; results belong in the experience records and case files.

### Hero

Since 22 November 2026 the hero is the name alone: no headline, general line or buttons (owner decision, both views, every locale). `localeSeo` no longer has `heroTitle`, `heroBody` or the hero `cta` labels. The Simple view adds a datasheet spec list built from `profile` and the live count; its labels are in `sheetCopy`.

### Card Art

Each case record can have a PixelLab illustration at `src/assets/art/cards/<slug>.png` (128×64, MS-86 palette), and each experience role one at `src/assets/art/experience/<slug>.png` (`experienceArt()`). `src/lib/art.ts` finds it by slug; `CardArt.astro` falls back to the SVG vignette when there is none. Art is decoration (`alt=""`); the record's title carries the meaning.

### Hero Proof

The hero's proof list is derived, not authored: `liveWorkRecords` in `src/lib/cards.ts` selects Work records with `live: true`, and the displayed count covers all of them (nine in November 2026). The list itself (`heroProofRecords`) shows at most five, ordered by each record's `featured` number; live records without `featured` count but are not listed. Records without `live: true` appear in Work, Tooling and the showcase, not in the live proof. The terminal view shows this list; the Simple view goes straight from the datasheet title block to the numbered Selected work rows.

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
- optional `link` and localized `linkLabel` — omitted when nothing public exists (NeoUniverse); a private app may link the product it serves (YLead links YDesk)
- optional localized `status`
- optional `sourceLink` and localized `sourceLinkLabel` for public-source projects
- optional localized `evidence` with `role`, `contribution`, `constraints`, and `outcomes`
- `cover`
- optional `live` — the system runs in production; it earns the LIVE foil on its card and case file. YLead is LIVE by owner decision (November 2026).
- optional `featured` — position in the hero proof (1 first)
- optional `year` — shown under "At a glance"
- optional `diagram` — key into `src/lib/diagrams.ts`, rendered as an architecture flow
- optional `parts` — the items of a collection entry (the three SurikMods mods), each with title, version, link, icon key and localized summary

Selected professional entries, in card order:

- `YPay`
- `YDesk`
- `YLead · YDesk Phone` (private source)
- `NeoPoints`
- `Neo Taxi & Neo Delivery` (the public site, `neo-taxi-site`)
- `Space (Movas)` (spacepark.ge; bolttaxi.ge redirects there)
- `NeoUniverse Platform` (shared AWS and Fleet infrastructure; no product link)

Tools are stored separately as `toolProjects` and rendered as Tool cards on the landing Work deck and the Tooling page. This collection includes production systems and prereleases; membership does not imply LIVE status. The Tooling count is the record count. Game entries are stored as `gameProjects` and render as the Games deck.

- `Last Standard` (facts only from the itch.io page, as mirrored in `flygod/src/lib/last-standard.ts`)
- `FlyGod Studios`
- `Alice Plays`
- `SurikMods for Valheim` (one entry for the three Thunderstore mods; owner decision: no mention of AI assistance and no download counts)
- `Rifle Revolver`
- `Incendiary Revolver`

### Screenshots

Case-file images live in `src/lib/gallery.ts`, keyed by slug, separate from `content.ts` so Node tests can import the content model. The first image is the case-file hero; the rest form the gallery. Each has a localized `alt` and a `frame` (`browser`, `phone` or `plain`). Sources are WebP masters under `src/assets/projects/<slug>/`; Astro renders AVIF/WebP at several widths.

Owner rule (November 2026): **public, signed-out pages only**, never admin or internal screens. `node scripts/capture-project-shots.mjs <outDir> [slug…]` captures them against the live sites with a built-in banner dismissal and language choice. Review every capture by eye for personal data (names, phone numbers, plates, leaderboard rows) before converting and committing it; crop or skip anything that shows some. Game art comes from the owner's own copies (Last Standard from the flygod repository; mod icons from Thunderstore). Never hotlink third-party image hosts. YLead and NeoUniverse have no public pages, so they show a pixel cover and an architecture diagram instead. The RimWorld Workshop previews were reviewed and left out: their joke captions do not suit the portfolio.

### Cards and Case Files

Every entry in `projects`, `toolProjects`, and `gameProjects` becomes a card and a case file at `/<locale>/work/<slug>/`; `src/lib/cards.ts` does the mapping. Suits follow the collection: `projects` are Platform, `toolProjects` are Tool, `gameProjects` are Game. Cards, homepage proof links, and the showcase use `cardSummary` when supplied, falling back to `evidence.outcomes` and then `summary`. Concise copy is authored rather than visually truncated. List view uses the full localized `summary` and exposes narrative, details, and evidence through its disclosure. Case files show the outcome once in the header, then the hero screenshot, an "At a glance" fact row (role, status, year, stack, links), and a body in a fixed order: overview, problem and constraints, what was built, architecture, mods, gallery and full stack. Prev/next and the contextual call to action close the file.

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
- optional `early` — internships and student roles, folded under the main timeline in a closed disclosure

The CV source, `cv/Suren_Mouchsiadis_CV.tex`, is the source of truth: companies, titles, ranges and locations match it, and freelance work is one entry like on the CV. Job titles stay in English in every locale. Do not mark a role `early` while the hero's `impact` cites it.

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

The landing showcase derives `openSourceRecords` from Tool records that have a `sourceLink`. Keep project descriptions, links, source links, status, stack, and cover selection there; `i18n.ts` supplies only generic showcase/interface labels. Raid Signal currently appears there without its project copy being duplicated in the page template.

New featured work must supply all four locale values. Georgian interface terms use “ინსტრუმენტები” for tools and “პროექტის ნახვა” for the direct project action. Technical names remain unchanged where translation would obscure the product or technology. A native Georgian editorial review remains useful for nuance; do not rewrite historical blog bodies as part of that review.
