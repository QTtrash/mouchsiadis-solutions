# Visual Design System

## Direction

Mouchsiadis Solutions is a retro-futurist field terminal with an editorial reading surface. Code-drawn hardware and pixel art establish its identity; clear language, visible actions, and readable evidence make it useful. The first viewport prioritizes the hiring visitor. Optional play belongs below the pitch and never gates content.

Two audiences share the same records:

1. Hiring visitors can identify the role, open the CV, contact Suren, and inspect evidence without learning an interaction.
2. Technical visitors can explore case files, public source, card backs, the card reader, and Backlog Breaker.

## Research and Adapted Principles

The October 2026 audit used these references as principles, without reproducing their layouts or assets:

- [Linear](https://linear.app/): restrained surfaces, consistent alignment, and a clear hierarchy between heading, explanation, and action. Use quiet reading surfaces inside the terminal rather than applying glow and borders to every layer.
- [Resend](https://resend.com/): concise positioning and distinct primary and secondary actions. Contact and CV come before the longer portfolio explanation.
- [Rauno](https://rauno.me/): personality carried by authored artwork and deliberate interactions. Keep the pixel art and optional play; make the project links immediately usable.
- [Practical Typography: line length](https://practicaltypography.com/line-length.html): constrain reading measure and establish paragraph rhythm. Articles remain an editorial column rather than filling the console width.
- [Noto Georgian](https://notofonts.github.io/georgian/): inspect actual Georgian glyphs and weights alongside Latin text. Explicit font coverage matters more than the family name reported in computed CSS.

[W3C Georgian Script Resources](https://www.w3.org/TR/geor-lreq/) describes modern Mkhedruli usage and optional Mtavruli emphasis; it is a draft resource. [W3C language-sensitive CSS guidance](https://www.w3.org/International/questions/qa-css-lang) informs language metadata and inherited typography.

## Foundations

- Heading and body: IBM Plex Sans, regular 400 and semibold 600. A single sans family gives headings and paragraphs a coherent rhythm.
- Primary actions and card controls use Plex Sans for readable translated labels. Instrument readouts and compact metadata use IBM Plex Mono, 400 and 600.
- Georgian: explicit Noto Sans Georgian fallback in heading, body, and control stacks; self-host only the Georgian subsets at 400/600/700. Latin product and technology names retain Plex.
- Articles: Merriweather; Noto Serif Georgian supplies Georgian glyphs at 400/700. Article typography follows the original content language.
- Georgian interface labels retain their authored Mkhedruli case, normal letter spacing, comfortable line height, and word-boundary wrapping. Do not fix long copy by shrinking it or applying arbitrary word breaks.
- Spacing follows the 4, 8, 12, 16, 24, 32, 48, 64, 96px scale. Content padding and control sizes must leave room for translations.
- Surfaces use near-black and olive graphite, with borders reserved for meaningful groups. Primary text is neutral and secondary text remains readable.
- Green identifies system/platform content, copper identifies tools, and amber identifies the primary hiring action and games. Suit shapes repeat the color distinction.
- Radius remains restrained, 2–8px. Hardware corners stay close to square.
- The shell is capped at 1280px, rising modestly at large desktop sizes. Long-form prose stays near 65–72ch.
- No readable text below 11px. Essential summaries use a larger body scale. Controls provide at least 44px height; archive title links meet the 24px WCAG 2.2 AA target minimum.

## Fast Path and Navigation

- Every page has immediate Contact/Hire and CV access. The homepage offers Contact, CV (PDF), and Explore projects before supporting detail.
- The heading is complete when rendered and remains stable; decoration does not change its accessible name or move the hiring actions.
- Header links use familiar labels: Work, Games, Tooling, Experience, Notes. Languages and interface options remain accessible through the drawer at compact widths.
- Only an enhanced fitted console suppresses duplicate header navigation. Continuous and JavaScript-disabled pages keep ordinary page navigation.
- The footer has email, GitHub, LinkedIn, and CV links as real actions. It follows content rather than occupying an artificial viewport position.
- A German Impressum remains an owner-content follow-up; legal identity and address must come from the owner.

## Card System and Open-Source Showcase

Cards are a view of records in `src/lib/content.ts`, derived by `src/lib/cards.ts`. Cards, Lists, Tooling, showcase entries, and case files share records, links, status, and artwork. Cards, homepage proof links, and the showcase use authored compact `cardSummary`; List uses full `summary`, while case files retain full evidence.

- The front presents suit, project title, artwork, a complete outcome or summary, and keywords. The back presents role/constraints or project details and stack.
- Desktop/tablet cards wrap into non-overlapping rows. Cards grow to fit translated copy; summary text is not line-clamped. Flip and Open case file sit above the card faces and stay visible, allowing a tall card to be flipped before reading from its top.
- Phone cards use a horizontal scroll-snap row with visible controls. Touch scrolling never requires dragging to a reader.
- Cards/List and the optional reader share a compact toolbar. The view preference persists and is shared by decks. List provides a plain, expandable archive.
- Fine pointers may tilt cards and drag them into the reader on a fitted desktop. Keyboard users can reach Flip and Open case file directly. Every record is readable without dragging or flipping.
- Each card is `li > article` with a real heading. Flip is a toggle with `aria-pressed`; the inactive face is `inert`. Link names identify the project.
- LIVE means the system actually runs in production (`live: true`). Public code, a website, or a prerelease alone does not earn it.
- The open-source showcase includes Raid Signal and Regrind, derived from their content records. Regrind is an MIT-licensed Windows application for solo CS2 practice with a separate local dedicated server; it is presented as a prerelease and does not carry LIVE.

## Responsive Composition

- Below 768px: compact header, full-screen navigation drawer, continuous document flow, phone-native card scrolling, and large touch targets.
- 768–1119px: continuous archive with columns only where text permits.
- At least 1120px wide **and** 720px tall: JavaScript may enhance the landing and Tooling pages into a fitted console with side navigation and one active panel. Long panels scroll internally.
- Below 720px tall: continuous document flow even at laptop widths. Below 500px tall the header scrolls away, keeping landscape content accessible.
- 1600px and above: wider shell, bounded text measure; type does not grow without limit.
- Without JavaScript: all content remains in document flow and direct links work.

Verification matrix: 320×568, 360×740, 375×667, 390×844, 414×896, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1280×720, 1440×900, and 1920×1080. Also check a wide viewport below the 720px fitted threshold. Cover all four locales on landing, Tooling, and case files, plus localized blog indices and original-language articles. Georgian receives detailed 320px and desktop font, wrapping, and control inspection.

## Motion, Input, and Progressive Enhancement

- Sound defaults off. Effects follow the OS unless explicitly reduced; both preferences persist when storage is available.
- Reduced motion disables tilt, foil sheen, page morphs, and decorative animation. Flips become immediate. Changing the preference while on the page takes effect immediately.
- Essential content, focus, and direct navigation remain available if storage, lazy loading, or enhancement fails.
- Focus is clearly visible; active/pressed state does not rely on color alone. Hover never selects an item or exposes the only available action.
- Avoid blend-mode layers over moving cards. Pointer movement is processed once per animation frame and updates transforms, not layout.
- Card flips and cross-page transitions remain brief; optional motion never delays access to a case file.

## Artwork and Backlog Breaker

One code-drawn pixel/SVG vocabulary is shared by cards, case-file covers, navigation, avatar, and showcase. `src/lib/pixel.ts`, `src/lib/sprites.ts`, and `PixelArt.astro` render it at build time with no runtime drawing dependency.

- Project art uses a 40×20 grid, navigation 9×9, suits 7×7, and avatar 32×32. Palette keys derive from context-specific accent tokens.
- Every sprite describes the project: ledger flows for YPay, tenant lanes for YDesk, replay analysis for Grindlike, a sealed squad relay for Raid Signal, and a practice target/local server for Regrind.
- Bayer dithering and `shape-rendering: crispEdges` preserve the authored pixel language. Decorative artwork has empty alternatives or is hidden from accessibility APIs.
- The portrait button flips from pixel avatar to the real photo. The code-drawn terminal chassis remains decorative and never narrows the reading surface excessively.
- Do not use official Fallout assets, logos, or implied affiliation. Do not add WebGL or a 3D runtime.
- Backlog Breaker is optional. Its build-time poster shares geometry with its lazy canvas engine, loaded only on Start. Mouse, touch, arrows, a visible Pause button, and keyboard launch controls are supported. It pauses when hidden and never prevents page scrolling before play starts.

## Audit Findings and Review Boundaries

Baseline inspection found system FreeSans rendering Georgian headings and controls despite Noto imports; only Georgian body text selected Noto. At 320×568 the Georgian Contact and CV actions ended at approximately 731px and 786px. Overlapping desktop cards and line-clamped outcomes concealed evidence, while accumulated CSS overrides obscured the intended responsive threshold.

The corrections use explicit font coverage, concise translated copy, visible project actions, complete card summaries, shared tokens, and a single fitted-console condition. The blog bodies and original-language routes are preserved. Interface terminology was reviewed for consistency. Native-speaker review of Georgian phrasing remains outstanding.

The browser audit at 320×568, 360×740, and 1440×900 verified actual rendered fonts with Chromium’s `CSS.getPlatformFontsForNode`, after font readiness: Georgian paragraphs select Noto Sans Georgian 400, headings and controls select Noto Sans Georgian 600, and Latin text retains IBM Plex. Noto Sans 700 and Noto Serif 400/700 also load successfully. Existing Russian/German articles render in Merriweather; a temporary browser-only Georgian prose sample selected Noto Serif Georgian for Georgian glyphs and Merriweather for Latin. No article body was modified for this check.

At 320×568, the updated Georgian Contact/CV controls ended at approximately 509px and Explore projects at 561px. Font-request blocking still left the text readable, all three actions accessible, and no horizontal overflow. Detailed Georgian checks covered the landing page, card and List modes, Tooling, the Regrind case file, and blog index; English, Russian, and German hero actions also fit the narrow viewport.

## Performance and Validation

`npm run validate` runs Astro/TypeScript checks, the static build, budget checks, and Playwright coverage. Browser verification must wait for fonts and inspect actual rendered font families where possible; computed font-family alone does not prove coverage.

Preserved budgets:

- Initial landing JavaScript: at most 15KB gzipped.
- Landing CSS: at most 32KB gzipped.
- Inline pixel art: at most 20KB gzipped per page.
- The drawer and game engine remain lazy. Cards add no runtime dependency.

Keep review screenshots outside `public/` so they do not add shipping assets.

### Verified results — 4 October 2026

`npm run validate` passed: zero Astro/TypeScript errors, 66 generated pages, passing performance budgets, and 202 passing browser tests. The 221 skips are intentional project exclusions: explicit viewport matrices and transition scenarios run once rather than repeating under the phone/tablet project presets, and pointer-specific tests skip incompatible presets. Seven existing Astro `z` deprecation hints remain.

| Gzipped asset | Before | After | Budget |
| --- | ---: | ---: | ---: |
| Initial landing JavaScript | 6.6KB | 6.8KB | 15KB |
| Landing CSS | 30.0KB | 17.1KB | 32KB |
| Inline SVG | 5.3KB (landing) | 5.6KB (maximum across 66 pages) | 20KB/page |

Browser coverage includes all four locales at the 13 matrix sizes above plus 1280×650 and 1366×650, original Russian/German articles, Cards/List, card fronts/backs, native disclosure controls, keyboard focus/history, touch swiping, reactive reduced motion, resizing, blocked storage, and JavaScript-disabled navigation. Targeted axe checks cover the Georgian primary surfaces and narrow case/blog/article layouts. The optional reader stays sticky inside the fitted panel so lower-row cards can reach it.

The reproducible screenshot audit captured 172 views with zero horizontal overflows and zero failed flows. Sixty are landing views across all locales and 15 sizes; the remainder inspect the showcase, Work, Games, List, Tooling, Regrind case file, experience, contact, blog index, and original-language articles at 320×568 and 1440×900. Screenshots use reduced motion for stable captures; separate interaction tests exercise normal motion and live preference changes.

Start a built local preview, then run `node scripts/capture-design-audit.mjs`. Set `AUDIT_BASE_URL` for another local port and pass an output directory as the first argument. The default output is `/tmp/mouchsiadis-design-audit`, including a JSON manifest. Selected review evidence is stored beside this document:

| View | Baseline | Updated |
| --- | --- | --- |
| English desktop, 1440×900 | [Before](./design-audit/en-desktop-before.png) | [After](./design-audit/en-desktop-after.png) |
| Georgian phone, 320×568 | [Before](./design-audit/ge-phone-before.png) | [After](./design-audit/ge-phone-after.png) |
| Short laptop, 1366×650 | [Before](./design-audit/short-laptop-before.png) | [After](./design-audit/short-laptop-after.png) |
| Work deck, 1440×900 | [Before](./design-audit/en-work-before.png) | [After](./design-audit/en-work-after.png) |

Additional evidence: [open-source showcase](./design-audit/open-source-showcase.png), [Tooling](./design-audit/tooling-after.png), [Georgian desktop](./design-audit/ge-desktop-after.png), and [Georgian Regrind case file](./design-audit/regrind-ge-phone.png).

Regrind research checked the sibling repository's `AGENTS.md`, README, MIT license, implementation, and supporting documentation against the [public repository](https://github.com/QTtrash/regrind), [product page](https://grindlike.pro/regrind), and [v0.2.0 prerelease](https://github.com/QTtrash/regrind/releases/tag/v0.2.0). The sibling checkout identifies itself as 0.1.1 while the public prerelease is newer, so site copy remains versionless. Windows x64 support, local server setup/update, official/Workshop map handling, practice controls, Steam joining, and diagnostics are implemented; the site makes no cross-platform or multiplayer promise. The Work count is five, Tooling count three, and the nine project records generate 36 localized case files. Regrind is fully localized and carries prerelease status without LIVE.

Review boundaries: Georgian wording has received a consistency pass, but native-speaker editorial review remains outstanding. Historical project/experience records retain their documented English fallback where translations do not exist. Existing blog bodies remain unchanged. Automated and visual checks use Chromium; this audit does not establish parity with physical devices or every browser engine.
