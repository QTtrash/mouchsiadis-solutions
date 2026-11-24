# Visual Design System

## Direction

Mouchsiadis Solutions has two views of the same content records (`src/lib/content.ts`):

- The **Simple view** is the default: a black "datasheet + pixels" page for recruiters that reads like an engineering
  spec sheet. Each project's pixel illustration is its only picture on the landing page.
- The **terminal view** is opt-in: a field terminal with a code-drawn MS-86 console, a rounded CRT glass, P1-green
  phosphor and one amber action. Terminal character belongs to the chrome, the hero name, navigation, cards and motion.
  Reading surfaces (body copy, case files, articles) stay calm and never glow.

The site exists to turn visitors into contact requests, prospective clients first and hiring managers second. Within
the first screen a visitor can tell who Suren is, see live proof and reach Contact in the header. Optional play (cards,
the reader, Backlog Breaker) never gates content.

Two audiences share the same records:

1. Clients and hiring visitors read the positioning, open live case files, and contact Suren or open the CV without
   learning an interaction.
2. Technical visitors explore case files, public source, card backs, the card reader, and Backlog Breaker.

Standing owner decisions that constrain this document are in [AGENTS.md](../AGENTS.md#owner-rules).

## Hero

- The hero is the name alone: the name is the page's only `h1`, followed by the location and the owner-confirmed
  availability (both from `profile` in `src/lib/content.ts`).
- There is no headline, no general line, no hero buttons, no track record list and no direct email line, in either
  view or any locale. Contact lives in the header and the Contact section; the CV lives in the Contact section.
- Simple view: a sheet bar (`MS-86 / PORTFOLIO DATASHEET · REV … · 48.14°N 11.58°E`), the name very large in two lines
  (first name white, family name grey) with a green block cursor, the pixel portrait (pressing it shows the photo), and a
  spec list: Base, Status (with a pinging lamp), Live (the count of live systems). A static engineering-paper grid fades
  out behind the block.
- Terminal view: the name in large display type, the location, the live proof list (Work records with `live: true`,
  linked to their case files, with the count derived from the content model; only the count carries LIVE), the
  PixelLab operator-room scene with three looping monitor glints, and the status line.

## View switch

- `html[data-view]` is `simple` or `terminal`. The server renders `simple`. The pre-paint script in `BaseHead.astro`
  applies the first of: `?view=terminal|simple` (stored), `localStorage.interfaceView`, then `simple`. First visits,
  no-JS visitors and shared links without `?view=` get the Simple view.
- `present.css` hides `[data-terminal-only]` blocks in the Simple view and `[data-simple-only]` blocks in the terminal.
- The fitted console is scoped to `[data-view="terminal"]`, and `terminal.ts` only fits panels in the terminal view. The
  header switch fires `interface-view-change`, which re-lays the console and plays the power-on (forced, even if this
  session already saw it). With sound on, the boot sound plays too.

**The rusty switch** (`ViewSwitch.astro`, `switch.css`). It is meant to look rusty, cartoonish and out of place, so
people get curious and pull it.

- Art: a 64×56 inline SVG breaker lever with a rust gradient, `feTurbulence` grit, steel rivets, a hazard-stripe band, a
  red ball knob and a lamp.
- Labels: a stencilled "TERMINAL" plate and a paper "do not pull" tag. The tag is translated; the word TERMINAL stays in
  English. Both are hidden below 480px.
- Placement: before the brand, bolted on crooked (−5°). Its plate and tag hide below 1280px.
- Motion: an idle wobble every 7s, a nudge on hover, and a clunk plus spark on pull. All of it stops under reduced
  motion or Effects: Reduced.
- Semantics: `role="switch"` with a stable name ("Terminal mode") and `aria-checked`. State shows in the lever angle and
  the lamp, not in colour alone. The target is at least 44px, it is never a primary action, and the Options drawer
  mirrors it as a pressed toggle.

**Header.** With JavaScript the inline nav steps aside below 1200px (all locales) and below 1600px in Georgian, where its
labels would collide with the brand; the Options drawer carries the same links. The controls stay pinned to the end of
the header.

## Simple view: datasheet + pixels

`simple.css`, all rules scoped to `:root[data-view="simple"]`, written as flat selectors without nesting so older browsers
still get it.

- **Palette.** Pure black, `#e5e5e5` text and `#1c1c1c` hairlines. One signal colour, phosphor green `#8dff7a`
  (`--sheet-signal`): LIVE lamps, section indices, the active nav underline, focus rings and the one filled primary
  (case-file "Email me about…"). Amber belongs only to the lever.
- **Type.** IBM Plex Sans for names and titles; Plex Mono, uppercase and tracked, for every label: nav, buttons, sheet
  bar, spec terms, the eyebrow and the stack. The Plex superfamily is the brand link between the views. Montserrat never
  loads in this view.
- **Landing order.** One column of about 54rem: hero, Selected work, open source, Games, Experience, Notes, Contact. The
  hero proof, card hand, reader and Backlog Breaker are hidden.
- **Sections.** Each starts with its pixel icon, a green `01…` index and a hairline rule, then the title.
- **Work index.** A table head (No. / System / Status), then numbered rows: running number, the 2:1 card art, title, mono
  eyebrow, summary and stack, a LIVE status column, and an arrow. On hover the row tints green, the art plays its glint
  and the arrow moves. Screenshots live only in the case files.
- **Controls.** Square-cornered (2–3px), mono, uppercase. No pills.
- **Case files.** The pixel card art is always a small plate above the title. The hero screenshot follows when one exists.
  Below it: an "At a glance" row, then overview, problem and constraints, what was built, an architecture flow, the mods,
  the gallery with a `<dialog>` lightbox, and the full stack. The contextual call to action is the only filled primary.
- **Long locales.** Russian, German and Georgian headings are set smaller.

## Pixel art (PixelLab)

Project illustrations, UI icons and VFX are made with **PixelLab** (MCP server `pixellab`; tool usage is in
[AGENTS.md](../AGENTS.md#commands)) in one palette for both views. No text, logos or third-party marks.

**Palette.** 13 colours: `#000000 #0b0f0b #16201a #24382a #3d5e40 #5f9a5a #8dff7a #dfffd4` (black to phosphor),
`#3a2600 #8a5a00 #ffb000 #ffcf66` (amber) and `#c2361f` (rust red, used sparingly). Every image is generated with this
exact `palette`, so every pixel is one of these colours.

**Artwork** (`src/assets/art/`, mapped by `src/lib/art.ts`).

- `cards/<slug>.png`: one 128×64 scene per case record, made with `create_image_pro` from the YPay scene as the style
  anchor (`style_copy`: outline, detail, shading), best of 4 candidates picked by eye.
- `icons/*.png`: a 32×32 UI kit (overview, work, games, experience, tooling, notes, contact, CV, live LED, pin, clock,
  download, lock).
- `operator-room.png`: a 192×96 scene for the terminal overview panel.
- `experience/<slug>.png`: one 128×64 scene per experience role, same pipeline as the cards. Subjects describe the work,
  never the employer's brand (for example an unbranded test car on a dyno). `ArchiveEntry` shows them as 2:1 plates at
  1× (`artKind="experience"`) with the hover glint, including on phones.
- `vfx/lever-sparks.png` (5 frames, 64×64) and `vfx/card-glint.png` (11 frames, 27×34): made in `vfx_workbench` and
  repacked as one-row strips with blank frames dropped.
- Shown with `image-rendering: pixelated` at 1×, 1.5× or 2×. The PNGs ship as hashed files and are never inlined
  (`astro.config.mjs`, `assetsInlineLimit`), lazy-loaded below the fold.
- `CardArt.astro` renders a record's art and falls back to the build-time SVG vignette (`CoverArt`) when a record has
  none. A new record needs no code change: `cardArt()` finds `cards/<slug>.png` by name.

In the terminal view card art replaces the SVG vignettes on the cards, in the live list and in the showcase, and the
side nav uses the pixel icons.

**VFX** (`src/assets/styles/art.css`).

- **Lever sparks.** An amber burst plays once when the switch is pulled, in both views.
- **Card glint.** A four-point glint plays once on hover over cards, rows, the showcase and the case-file plate.
- **Monitor glints.** Three glints loop over the operator room.
- **LIVE pings.** A ring pings outward from each LIVE lamp in the Simple view.
- Each effect is a sprite strip inside a one-frame window. `steps()` walks it with `transform`, and the windows are
  small, so nothing repaints the glass. Reduced motion and Effects: Reduced show still frames.

## Terminal foundations

- **Display:** Montserrat 800 for the hero name in the terminal view, terminal section titles, card titles, proof names and case-file titles. Self-hosted woff2 covers Latin (19.0 KB) and Cyrillic (11.2 KB). Georgian glyphs fall back to Noto Sans Georgian in every display stack.
- **Chrome:** IBM Plex Mono 400/600 for kickers, the status line, navigation keys, actions, labels and metadata. Uppercase with tracking in Latin and Cyrillic; Georgian keeps authored Mkhedruli, normal tracking and comfortable line height.
- **Body:** IBM Plex Sans 400/600. Articles use Merriweather, with Noto Serif Georgian for Georgian glyphs.
- **Palette:** P1 phosphor `#8dff7a`, headline `#dfffd4`, body text `#d6f5cd` and `#a9cba0`, subtle text `#8fae88`, glass `#031005`, chassis `#1a2216`. P3 amber `#ffb000` marks only the one primary action per view, the lit key and the lever. Copper `#e8935c` marks tools and amber marks games, and suit shapes repeat the colour distinction.
- **Glow:** phosphor text-shadow only on the hero name, terminal section titles, card titles, kickers, the lit key and status lamps. Body copy, case files and articles never glow.
- **Shape:** the CRT glass is rounded (18px desktop, 14px phone) and recessed into a pixel-bevelled chassis. Cards use 10–12px corners, controls 4–5px, and the chassis stays square.
- **Spacing:** the 4, 8, 12, 16, 24, 32, 48, 64, 96px scale. The shell is capped at 1280px and rises to 1360px at 1600px. Long-form prose stays near 65–72ch.
- **Sizes:** no readable text below 11px. Controls are at least 44px tall; inline links in sentences and archive title links meet the 24px WCAG 2.2 AA minimum.

## Terminal realism

`crt.css`, terminal view only. All layers sit in the glass background or beneath the content, and all motion stops under
reduced motion or Effects: Reduced. No WebGL.

1. **Curved glass.** A specular reflection at the upper left, edge falloff and a deeper inset vignette.
2. **Convergence fringe.** A ±0.6px red/cyan fringe added to `--glow-display`, so it appears only on the hero name and
   section titles.
3. **Shell semantics.** Every panel and case file opens with a real prompt (`suren@ms-86:~$ ls ~/work --live`,
   `cat ypay/README.md`) and a blinking block cursor; the prompts are `aria-hidden`. The status line is a tmux bar:
   session, window list following the active panel, LIVE count, and a Munich clock. Every tab, including Tooling
   (`#tooling`, tmux `4:tooling`), is an in-console panel that switches in place; `/<locale>/tooling/` serves the Simple
   view and sends terminal visitors to the tab before first paint.
4. **Background texture.** Film grain (an SVG turbulence data URI) and a faint aperture-grille stripe.
5. **Boot.** The power-on opens as a dot, then a line, then a bloom (760ms), and the status bar shows a three-part POST
   line for about 1.4s.

**Performance.** Decorative motion animates only `transform` or `opacity` on small elements (see the performance rule in
[AGENTS.md](../AGENTS.md#performance-rule)). The tab-switch "phosphor wake" fades opacity, never `filter`. In the fitted
console the panel area has its own compositor layer. `tests/performance.spec.ts` traces an idle terminal and fails if
it repaints.

## Conversion and navigation

- **One primary per view.** At most one filled primary is on screen; the landing hero has none. The contact panel's
  primary is "Email me" and a case file's primary is "Email me about {project}". The header "Contact" key and Backlog
  Breaker's "Start" stay secondary. External product links are never primary.
- **Contact panel.** An "Email me" action with a subject, the visible address with a copy button, a short "useful to
  include" list, then LinkedIn, GitHub and the CV. Every email action uses one address and a subject that names its
  origin; the address is always visible as text, because `mailto:` can do nothing without a mail client.
- **Case files.** The header shows evidence: cover, number, suit, LIVE, outcome, role and stack. Product and source links
  are secondary, plus a link down to the call to action. Previous/next navigation follows the body. The file always ends
  with "Building something similar?" and the contextual call to action.
- **Open-source showcase.** One "Open case file" button per project; product and source links are quiet inline links.
- **Dead ends.** The 404 page answers in the requested locale (English without JavaScript) and offers contact. Articles
  end with a quiet contact line; post bodies are unchanged.
- **Facts.** No testimonials, client logos, response times or booking links. The 10,000+ driver figure stays in
  Experience.
- **Measurement.** The site has no analytics and no tracking. Conversion choices are heuristic.
- **Navigation.** Every page has immediate Contact and CV access. Header links: Work, Games, Tooling, Experience, Notes.
  Languages and interface options stay reachable through the drawer at compact widths. The fitted console's side
  navigation is a column of bordered mono keys with pixel icons; the active key is lit amber with a pixel chevron. Only an
  enhanced fitted console suppresses the duplicate header navigation. The footer is the terminal status bar, with email,
  GitHub, LinkedIn and CV links.
- Not yet verified in production: a German Impressum; legal identity and address must come from the owner.

## Card System and Open-Source Showcase

Cards are a view of records in `src/lib/content.ts`, derived by `src/lib/cards.ts`. Cards, List, Tooling, the hero proof, the showcase and case files share records, links, status and artwork. Cards and proof use the authored compact `cardSummary`; List uses the full `summary`. A case file states role and outcome once in its header; its body adds narrative, contribution, constraints, details and the full stack.

- **Faces.** The front presents suit pips (top label and a turned bottom pip), LIVE foil, art in a scanlined window, a Montserrat title, a mono eyebrow, the complete summary and keywords. The back presents role/constraints or details and stack.
- **Controls.** Flip and Open case file form a tab joined to the top of the card. Tall cards can be flipped before reading, and the controls never move when a card flips.
- **Fitted grid.** The fitted desktop hand fills the space up to a reserved 13rem reader lane: three columns at 1440 and two at 1120–1280, never narrower than 232px. Tablets use a stretching grid without edge gaps. Phones use a horizontal scroll-snap row with visible controls.
- **Fan.** With motion allowed, the fitted hand rests in a slight alternating fan that never overlaps and never moves under the pointer. A dragged preview keeps the card's size and angle.
- **Reader.** It is a recessed slot with a sensor line, and its status text sits below the slot, never across it. Keyboard users reach Flip and Open case file directly, and every record is readable without dragging or flipping.
- **Semantics.** Each card is `li > article` with a real heading. Flip is a toggle with `aria-pressed`, and the inactive face is `inert`.
- **LIVE.** It means the system actually runs in production (`live: true`). Public code, a website or a prerelease alone does not earn it.

The hand cannot return to a four-up tilted row without breaking the 13rem reader lane and the 230px minimum card width.

## Responsive composition

- **Below 768px:** compact header, full-screen navigation drawer, continuous flow. Phone-native card scrolling and large
  touch targets.
- **768–1119px:** compact header and drawer, a single-column hero, and a stretching card grid.
- **At least 1120 wide and 720 tall:** JavaScript enhances the landing page into the fitted console. The glass holds the
  status line, the key navigation and one active panel; long panels scroll internally.
- **Below 720px tall:** continuous flow even at laptop widths. Below 500px tall the header scrolls away.
- **1600px and above:** a wider shell with bounded text measure.
- **Without JavaScript:** all content remains in document flow, direct links work, and copy buttons stay hidden while the
  address stays readable.

Verification matrix (`tests/`): 320×568, 360×740, 375×667, 390×844, 414×896, 844×390, 768×1024, 820×1180, 1024×768,
1180×820, 1280×720, 1440×900 and 1920×1080, plus 1120×720 (the smallest fitted console), 1280×650 and 1366×650.

## Motion, Input, and Progressive Enhancement

- Sound defaults off. Effects follow the OS unless explicitly reduced; both preferences persist when storage is available.
- **Power-on:** a decorative beam opens across the glass once per session over already-rendered content (the full dot, line and bloom sequence in `crt.css`, 760ms; a 420ms beam in `global.css` where the realism layer doesn't apply). It is skipped under reduced motion, Effects: Reduced, or blocked storage.
- **Panels:** switching panels uses an opacity fade within 110ms plus a brief phosphor wake (opacity only).
- **Small motion:** the kicker and case-file cursors blink, and the header, status and chassis LEDs pulse. The LIVE foil sheens, the card fan rests at an angle, and fine pointers tilt cards.
- **Reduced motion:** reduced motion or Effects: Reduced stops all of this immediately, including when changed while the page is open. Flips become immediate.
- Focus is clearly visible, and active state never relies on colour alone. Hover never selects an item or exposes the only available action.
- **Accessible names:** the prompt glyph on actions and the lit-key chevron are CSS masks, never text, so they never join an accessible name.
- Avoid blend-mode layers over moving cards. Pointer movement is processed once per animation frame and updates transforms, not layout.

## Code-drawn artwork, WebGL, and Backlog Breaker

One code-drawn pixel/SVG vocabulary is shared by cards, proof tiles, case-file covers, navigation, the avatar and the showcase. `src/lib/pixel.ts`, `src/lib/sprites.ts` and `PixelArt.astro` render it at build time with no runtime drawing dependency.

- Project art uses a 40×20 grid, navigation 9×9, suits 7×7 and the avatar 32×32. Palette keys derive from context-specific accent tokens.
- Every sprite describes its project. Bayer dithering and `shape-rendering: crispEdges` preserve the pixel language. Decorative artwork has empty alternatives or is hidden from accessibility APIs.
- The portrait button beside the hero kicker flips from pixel avatar to the real photo.
- Do not use official Fallout assets, logos, or implied affiliation.
- Backlog Breaker is optional and closes the Games panel; the open-source showcase closes the Work panel, so the Overview panel holds only the hero. Its build-time poster shares geometry with its lazy canvas engine, which loads only on Start. It supports mouse, touch, arrows, a visible Pause button and keyboard launch, and it pauses when hidden.

**WebGL rule.** The current design ships no WebGL. A WebGL layer may be added only under all of these conditions:

1. It renders decoration only; all text, links and controls stay in the DOM.
2. It loads with `import()` after first paint (after `load` and idle) and never delays the hero or the actions.
3. It has a finished CSS/SVG fallback for no JavaScript, reduced motion, Effects: Reduced, missing WebGL, software rendering (`failIfMajorPerformanceCaveat`), phones and low-power devices (`hardwareConcurrency < 4` or Save-Data).
4. It pauses offscreen and in hidden tabs, caps device pixel ratio at 1.5, handles context loss, and never adds blend layers over moving cards.
5. It lives in a module named `src/scripts/webgl-*.ts`, so its chunk is checked by `npm run budget` against its own 6 KB gzipped budget. The check fails if the chunk becomes reachable through static imports.
6. It uses the lightest tool: raw WebGL first. OGL (about 8 KB core) or three.js (about 149 KB) need a written justification and their gzipped size.

## Research and adapted principles

These references are principles only. No layouts, assets or code were copied. The site uses no Fallout assets or logos
and implies no affiliation.

CRT, phosphor and terminal interfaces:

- [Cathode Ray Tube Phosphors (labguysworld)](http://www.labguysworld.com/crt_phosphor_research.pdf): P1 is a green phosphor around 525 nm with roughly 20 ms persistence; P3 is amber around 602 nm. The palette takes its roles from them: P1 green for the system, P3 amber only for the one primary action and the lit key. Persistence becomes a short phosphor fade between panels, never a trail.
- [cool-retro-term](https://github.com/Swordfish90/cool-retro-term): bloom, scanlines, curvature and flicker work as adjustable layers. The site keeps them as restrained, optional decoration behind Effects: Reduced and the OS motion setting.
- [GM Shaders Mini: CRT](https://mini.gmshaders.com/p/gm-shaders-mini-crt) and [Building a multi-pass phosphor pipeline in WebGL](https://dev.to/the_l_man/building-a-multi-pass-phosphor-rendering-pipeline-in-webgl-113o): scanlines, vignette and glow are cheap; masks, barrel distortion and multi-pass persistence are not worth their cost at interface scale. Scanlines therefore sit in the glass background and art windows, never over text.
- [Lip Gloss (Charm)](https://github.com/charmbracelet/lipgloss): TUI composition through bordered panes, padding and colour roles. Borders mark meaningful groups (keys, proof, case files), not every block.
- [Ghostty](https://ghostty.org/): a terminal brand can animate its art while every word stays plain text. Decoration is separate from content.

Retro-futurist interfaces:

- [Typeset in the Future: Alien](https://typesetinthefuture.com/2014/12/01/alien/): a consistent labelling system (Ron Cobb's Semiotic Standard) makes a machine believable. The site uses one mono label system: kickers, status line, key legends, case-file numbers and `TX // NEXT STEP`.
- [Apollo DSKY, Smithsonian National Air and Space Museum](https://airandspace.si.edu/collection-objects/display-keyboard-apollo-guidance-computer/nasm_A19760811000): labelled keys and readouts report state. Navigation is a column of bordered keys with a lit amber key; the console status line and LIVE lamps report state.
- [Teletext art](https://teletext.wiki.zxnet.co.uk/wiki/Teletext_art): strict grids and colour coding. Suit colours (green platform, copper tool, amber game) and a pixel grid stay consistent across cards, proof tiles and covers.

Engineer and consultancy pages that convert:

- [Evil Martians, NATS case study](https://evilmartians.com/clients/nats): a case study states its outcome and ends with a contextual offer ("Hire us to handle your performance challenge"). Every case file ends with "Building something similar?" and "Email me about {project}".
- [Evil Martians, "We studied 100 dev tool landing pages"](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025): a specific primary action with a visually distinct secondary, evidence directly after the hero, and a final call to action.
- [Nielsen Norman Group, "Get Started" Stops Users](https://www.nngroup.com/articles/get-started/): labels should say what happens. Actions read "Email me", "Email me about YPay" and "CV (PDF)".
- [Nielsen Norman Group, Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/): visible contact information, correct and current content, and connections to the rest of the web. The address is visible beside every email action, project links stay one click away, and German project copy no longer uses ASCII transliterations.
- [Nielsen Norman Group, 5-Second Usability Test](https://www.nngroup.com/videos/5-second-usability-test/): the first screen must say who, for whom, prove it, and offer the next step.
- [Lynn Fisher (lynnandtonic.com)](https://lynnandtonic.com/): a strong, idiosyncratic identity is memorable when the hire path stays plain. The identity lives in the chrome; contact is direct text and one button.

Accessibility, motion and WebGL:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): 2.4.11 Focus Not Obscured and 2.5.8 Target Size. Controls stay at least 44px, sticky surfaces never cover focus, and inline links keep 24px targets.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion): every animation, the card fan and pointer tilt stop under reduced motion or Effects: Reduced.
- [MDN: WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices), [OGL](https://github.com/oframe/ogl) and [three.js at near-perfect gzip](https://minime.stephan-brumme.com/threejs/128/): cap device pixel ratio, handle context loss, refuse software rendering, and use the lightest tool. OGL's core is about 8 KB and three.js about 149 KB gzipped; a raw shader prototype measured 1.48 KB.

Also used: [Practical Typography: line length](https://practicaltypography.com/line-length.html) for article measure, [Noto Georgian](https://notofonts.github.io/georgian/) and the [W3C Georgian Script Resources](https://www.w3.org/TR/geor-lreq/) draft for Georgian rendering, and [W3C language-sensitive CSS guidance](https://www.w3.org/International/questions/qa-css-lang) for language metadata.

Terminal realism and scanning:

- [cool-retro-term's default profile](https://github.com/Swordfish90/cool-retro-term): bloom 0.6, burn-in 0.3, curvature
  0.2, flicker 0.1, noise 0.1.
- [Alec Lownes, CRT display in CSS](http://aleclownes.com/2017/02/01/crt-display.html): scanlines, an RGB stripe and
  colour fringing.
- [ekeijl, retro CRT terminal](https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh): the rolling scan bar;
  flicker is not used because it strains the eyes.
- [Charm](https://charm.land): real prompts and output instead of faked chrome.
- [The Ladders eye-tracking study](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/):
  about 7.4s per scan, with simple layouts and clear headings doing best.
- [NN/g on the F-shaped pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
- [Brittany Chiang](https://brittanychiang.com): name and role first, experience with chips, a résumé link, and projects
  with thumbnails.
- [Josh Comeau on a flash-free mode switch](https://www.joshwcomeau.com/react/dark-mode/): set the attribute before
  paint, with precedence. [WAI-ARIA switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).
- No open-source monospace covers Georgian, and IBM Plex Sans Georgian does not exist (see the
  [IBM Plex packages](https://github.com/IBM/plex)), so the Plex + Noto Sans Georgian stack stays.

## Native review

New or changed copy ships in all four locales. Add new ru/de/ge copy here. Not yet verified in production: native-speaker
review of:

- **Georgian (`ge`):** contact audience line, proof title, status label; contact panel copy and the "useful to include"
  list; email subjects; case-file call-to-action copy and the 404/article contact line.
- **Russian and German:** the meta descriptions, the contact and case-file call-to-action copy, and the aligned YPay
  summary.
- **All three:** the datasheet labels in `sheetCopy` (sheet title, No., System, Status, Base, systems live); the switch
  tag and hint; the case-file headings; the six newer records (YLead · YDesk Phone, Neo Taxi & Neo Delivery, Space,
  NeoUniverse Platform, Last Standard, SurikMods); the Last Standard alt text and the architecture captions.

Historical project and experience records keep their documented English fallback where translations do not exist. Blog
bodies are unchanged.

## Performance and validation

`npm run validate` runs Astro/TypeScript checks, the static build, budget checks and Playwright coverage. Browser
verification waits for fonts and inspects actual rendered font families where possible. `npm run budget` prints the
current gzipped sizes.

Budgets (gzipped):

- Initial landing JavaScript: at most 15 KB.
- Landing CSS: at most 32 KB.
- Decorative WebGL: at most 6 KB, lazy only (none shipped).
- Inline pixel art: at most 20 KB per page.
- The drawer and game engine remain lazy. Cards add no runtime dependency.

Review screenshots never go into `public/` or the repository. Start a built local preview, then run
`node scripts/capture-design-audit.mjs <outDir>` and `node scripts/capture-card-reader-audit.mjs <outDir>` with an
untracked output directory (the scratchpad or `~/state/mouchsiadis-solutions/`). Set `AUDIT_BASE_URL` for another local
port. Both scripts write a JSON manifest beside their screenshots.

Known flaky test: a card flip at 768×1024 can fail once on timing and passes on repeat.

Review boundaries: automated and visual checks use Chromium. Not yet verified in production: Safari and Firefox
rendering, social-card previews (`og:image`) on real platforms, and physical-device parity.
