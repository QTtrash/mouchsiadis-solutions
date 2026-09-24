# Visual Design System

## Direction

The product uses **instrument-grade retro-futurist editorial UI**: a diegetic field-terminal frame combined with the clarity and evidence hierarchy of professional software tooling. It is intentionally not a Fallout replica, glassmorphism, neo-brutalism, or a generic SaaS dashboard. The machine metaphor gives the portfolio identity; readable typography, plain information architecture, and progressive disclosure make it useful.

The balance is **60% content clarity and 40% play** across the site, and **80/20 in the first viewport**. The first screen is the hiring pitch: who, what, proof, and the contact/CV actions. Play lives one layer down, in the card deck and (later) minigames, and is always optional. Scanlines, noise, copper/amber signals, monospace readouts, and code-drawn schematics remain supporting cues. None of it may delay access, reduce contrast, or become required interaction knowledge.

## Two Audiences, One Site

1. People hiring: within 30 seconds, and without playing anything, they see the role, three evidenced proof points, and the Contact and CV actions.
2. Curious and technical visitors: they get a card game that runs inside the terminal, where each card is a real project record.

## Fast Path

- Header: an amber **Hire me** button on every page (it links to Contact) next to plain navigation: Work, Games, Tooling, Experience, Notes.
- Hero: headline, one paragraph, then **Contact me** (primary, amber), **CV (PDF)**, and **Play the card deck**, all in the first viewport at phone, tablet, and desktop sizes.
- Hero right column: the pixel avatar (press it for the real photo, `/images/suren-portrait.webp`, in natural colour) and **Backlog Breaker**, a brick-breaker mini-game. Evidence lives in the Raid Signal milestone below the hero, every case file, and the experience record.
- Every deck has a **Cards | List** switch. List is the plain archive. The choice persists per visitor and applies to every deck.
- Every card has a visible **Open case file** link; the case file ends with Hire me and CV actions.

## Card System

Cards are a view over content records (`src/lib/cards.ts`); they carry no copy of their own.

- Anatomy (5:7 proportion): suit mark and name, LIVE foil when the system runs in production, art window, title, eyebrow, one plain **outcome sentence** (the evidenced outcome, or the summary when there is no evidence block), and keywords.
- Back: evidence (role and constraints) or the first details, plus the stack.
- Suits extend the palette: Platform = phosphor green, Tool = copper, Game = amber. Suit shape (diamond, square, circle) repeats the colour so suit is never colour-only.
- The LIVE foil is earned, not decorative: it marks `live: true` records only.
- Semantics: each card is `li > article` with a real heading. Flip is a toggle button (`aria-pressed`); the hidden face is `inert`. Card links name the project for screen readers.

### Interactions by input

- Fine pointer on the fitted desktop console: a fanned hand under a **card reader**. Drag a card into the reader to open its case file. Clicking a card flips it. Actions surface when a card is hovered or holds keyboard focus.
- Keyboard: Tab to Flip and Open case file on every card; nothing requires dragging.
- Touch (phone): a horizontal scroll-snap row; tap flips; Open case file is always visible. No drag, no hover dependence.
- Tablet: a grid of cards with visible actions.
- Reduced motion (OS setting or the in-product Reduced option): the hand stays flat, flips are instant, the foil sheen and page morph are off. Drag still works but never animates.
- The card art and the case-file cover share a `view-transition-name`, so supporting browsers morph one into the other in 240ms. Others navigate normally.


## Product Principles

1. Evidence before spectacle. Selected work explains role, contribution, constraints, and outcome before listing technology.
2. Fast wake. Content is available immediately; there is no blocking boot sequence.
3. One system, two compositions. Desktop may behave like a fitted instrument console. Mobile is a continuous archive with phone-native navigation and disclosure.
4. Fiction you feel, never fight. Labels can sound operational, but navigation, links, and controls use familiar semantics.
5. Progressive disclosure. Summaries remain scannable; implementation detail expands in place.
6. Dark-only, accessible by design. Contrast, focus, reduced effects, and 44px touch targets are baseline requirements.

## Foundations

- Body/UI: IBM Plex Sans. It preserves a technical voice without forcing long copy into monospace.
- Controls/readouts: IBM Plex Mono.
- Georgian: Noto Sans Georgian and Noto Serif Georgian provide explicit glyph coverage.
- Long-form articles: Merriweather; Georgian articles use Noto Serif Georgian.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- Radius: restrained 2–8px. Hardware surfaces remain close to square.
- Elevation: borders and inset depth first; soft shadow only for true layer separation.
- Color: near-black chassis, phosphor green system content, amber active states, and copper in Tooling. State is never communicated by color alone.
- Content width: 1280px default and 1360px at large desktop; article prose stays near 72ch.

## Header and Footer

- Header (terminal menu bar): prompt-style brand, plain links (Work, Games, Tooling, Experience, Notes) with a pixel underline for hover and the current page, the amber Hire me, languages, and Options. It is kept because it is the only navigation on case files, notes, and posts, and it carries Hire me everywhere. On console pages at the fitted desktop size (landing, Tooling) its links step aside, because the terminal side nav is the navigation there and two identical primary navs side by side were noise. The bar sits on the chassis' two-step pixel edge. On short landscape phones (height 500px or less) it scrolls away instead of sticking.
- Footer (terminal status bar): an online LED, MS-86, the copyright line, then real actions: email, GitHub, LinkedIn, CV (PDF), each a 44px target. It replaced a plate whose links duplicated the header ("Work" only went home) and whose email was not a link. It is kept as the end-of-page contact and legal location visitors expect.
- Not yet present: a German Impressum. A business site operated from Germany generally needs one (§ 5 DDG); it requires the operator's legal name and postal address, which must come from the owner.

## Responsive Composition

- Phone, below 768px: compact header and full-screen navigation drawer; single-column archive; large touch targets; no hover assumptions.
- Small tablet, 768–1119px: continuous archive, one or two columns as content permits, normal document scrolling.
- Desktop, 1120px and at least 720px tall: fitted console with side mode navigation and one active panel.
- Short laptop: continuous archive avoids nested-scroll and clipped-panel failures.
- Large desktop, 1600px+: content width grows modestly; typography and line length do not scale without limit.
- Checked matrix: 320x568, 360x740, 375x667, 390x844, 414x896, 844x390 (phone landscape), 768x1024, 820x1180, 1024x768, 1180x820, 1280x720, 1440x900, 1920x1080, across the landing page, Georgian landing, Tooling, a case file, the notes index, and a post. No horizontal overflow; interactive controls are at least 44px tall (list headline links at least 24px, per WCAG 2.2 AA); no text below 11px.

## Component Ownership

- Custom design-system primitives: typography, tokens, buttons, badges, status markers, section headings, archive cards, panels, and code-drawn cover art.
- Custom application components: record cards and the card deck, card reader, case files, project evidence records, career timeline, contact panel, notes archive, and Tooling instrument cards.
- Wrapped third-party primitive: Web Awesome drawer supplies focus management, dismissal, Escape behavior, and dialog accessibility while this project owns its visual layer.
- Tooling: the instrument atlas is one more panel of the field terminal, showing the Tool card deck with the same reader, pixel art, and case files. There is no WebGL on the site.
- Native HTML first: `details`/`summary` handles archive disclosure and mobile Tooling records.

## Interaction States

Controls require default, hover where relevant, visible keyboard focus, pressed/selected, disabled when introduced, and loading when introduced states. Hover never changes selection. Sound defaults off and lives in Interface options. Visual effects follow the OS by default and may be explicitly reduced. Both preferences persist locally.

Performance rule for motion: nothing may sit above moving content with a blend mode. The panel's scanline overlay uses normal blending on its own compositor layer (a `mix-blend-mode: screen` overlay halved the frame rate while cards moved). Card tilt tracks the pointer 1:1 once per animation frame (no chasing transition), and the LIVE foil animates `transform`, not `background-position`.

Motion is brief and functional: terminal panels use a 110ms opacity-only fade, while ordinary control states stay in the 160–240ms range. The fanned-hand lift takes 130ms; card flips take 320ms; a card seats in the reader in 180ms before navigation; the card-to-case-file morph is 240ms. Cross-page navigation never waits for anything longer. `prefers-reduced-motion` and the in-product Reduced setting disable decorative animation.

## Asset And IP Rules

- Do not use official Fallout logos, labels, protected artwork, or claims of affiliation.
- The terminal chassis is code-drawn pixel hardware (`TerminalChassis.astro` + `chassisSprites`): a dithered olive-graphite casing with a hard two-step pixel bevel, corner screws, vents, an MS-86 name plate with a power LED, and two knobs. It replaced a stretched photographic frame. The header brand reads as a prompt (`suren@ms-86:~$`) and the page behind the monitor is a dim phosphor dot grid.
- Raster assets ship in compressed WebP variants. Decorative artwork has empty alt text; meaningful images require useful alternatives and dimensions.

## Art Direction: Code-Drawn Pixel Sprites

One art style everywhere it adds meaning: pixel sprites drawn in code and rendered to inline SVG at build time (no runtime JS, no raster files).

- Grids: 40x20 for card art and covers (fits the 2:1 card window and letterboxes into other frames), 9x9 nav icons, 7x7 suit marks, 15x7 card-back monogram, 32x32 avatar.
- Palette keys, not colours: `k` ink, `c`/`b`/`a`/`h` a four-step ramp of the current accent, `w` white phosphor, `y` amber, `o` copper. Each key is a `.px-*` class whose fill derives from `--px-accent`, so one sprite takes the suit colour of its card (Platform green, Tool copper, Game amber), the cover accent in the archive, or `currentColor` in the nav.
- Every drawing says what the record does: payouts reconciling into a ledger (YPay), tickets riding tenant lanes to a desk with a notification bell (YDesk), a replay heat-map and match timeline (Grindlike), squad members linked through a sealed relay (Raid Signal), and so on. Experience records use category covers (cloud, analytics, medical, fleet, precision, chip).
- Shading uses 4x4 ordered (Bayer) dithering; no anti-aliasing (`shape-rendering: crispEdges`).
- Sizes stay at whole multiples where it matters (the 32px avatar renders at 96px, 3x).
- The avatar is generated from the profile photo by `scripts/pixelate-avatar.mjs`: head-and-shoulders crop, backdrop flood-fill, gamma, the five-step ramp with a soft dither, and a rim light so dark hair keeps its silhouette. Output is committed as `src/lib/avatar.ts`. In the hero it is itself a card: pressing it flips to the photo.
- The LIVE foil sheen glides across production cards. Hovered cards in the desktop hand lean up to 6 degrees toward the pointer (off with reduced motion).
- No pixel font: it would break Cyrillic and Georgian coverage. Text stays in Plex Sans and Plex Mono.
- No 3D or WebGL anywhere: the Tooling atlas moved from a Three.js terrain to the card deck so the whole site shares one art style.

## Backlog Breaker

A brick-breaker in the hero, themed as clearing a wall of backlog tickets.

- Chosen over Tetris and a Tamagotchi: it fits the hero's small, near-square slot; it plays with one control on every input (mouse, finger drag, arrow keys) where Tetris needs a tall well and several buttons; and it reads instantly in the pixel style.
- 96x64 logical canvas scaled with `image-rendering: pixelated`; geometry is shared by the build-time poster and the engine (`src/lib/breaker-layout.ts`), so the board looks identical before and after Start.
- The engine (`src/scripts/breaker.ts`, about 2 KB gzipped) downloads only when Start is pressed.
- Controls: drag or move the pointer, or ← →; click, tap, Space, or Enter launches; P or Escape pauses; a visible Pause button covers the rest. Touch-drags steer the paddle only while a game is running, so the page still scrolls otherwise.
- It pauses itself when the tab is hidden or another terminal panel is shown, never plays sound unless interface sound is on, and only moves after the visitor presses Start. Results are announced politely.

## Performance Budget

Enforced by `npm run budget` (part of `npm run validate`) against the built `/en/` page:

- Landing JS loaded before any interaction: at most 15 KB gzipped (5.7 KB at Phase 1).
- Landing CSS: at most 32 KB gzipped (28.1 KB at Phase 1).
- Inline pixel art: at most 20 KB gzipped per page. At Phase 2 the whole `/en/` HTML, art included, is about 19 KB gzipped.
- Lazy only: the Web Awesome drawer (on first open) and the Backlog Breaker engine (on Start).
- No new runtime dependencies for cards: Pointer Events, CSS transforms, the Web Animations API, and cross-document View Transitions do the work.
