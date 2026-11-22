# Visual Design System

## Direction

Mouchsiadis Solutions is a field terminal: a code-drawn MS-86 console with a rounded CRT glass, P1-green phosphor and one amber action. Terminal character belongs to the chrome, the hero headline, navigation, cards and motion. Reading surfaces (body copy, case files, articles) stay calm and never glow.

The site exists to turn visitors into contact requests, prospective clients first and hiring managers second. Within the first screen a visitor can tell who Suren is, see live proof and reach Contact in the header (the hero itself has no buttons since 22 November 2026). Optional play (cards, the reader, Backlog Breaker) never gates content.

Two audiences share the same records:

1. Clients and hiring visitors read the positioning, open live case files, and contact Suren or open the CV without learning an interaction.
2. Technical visitors explore case files, public source, card backs, the card reader, and Backlog Breaker.

## November 2026, second pass: "Datasheet + pixels" and PixelLab art

This section supersedes the Simple-view and hero parts of the first November pass where they conflict.

**Owner decisions (22 November 2026).**

- The hero headline ("Senior platform engineer for products that have to work."), the general line ("I build scalable platforms…") and the three hero buttons (Contact me, CV, Explore projects) are removed from **both views and all four locales**. The name is the page's only `h1`. Contact stays in the header and the Contact section; the CV stays in the Contact section.
- The black Simple view was "too generic". The owner chose **Datasheet + pixels**: the page reads like an engineering spec sheet, and each project's pixel illustration is its only picture on the landing page.
- Art, UI icons and VFX are made with **PixelLab** (pixellab.ai, the owner's subscription, MCP server `pixellab`), in one palette for both views.
- Motion level: effects on interaction plus a **small ambient** set (LIVE pings, three monitor glints), all compositor-only.

**Palette (all PixelLab art).** 13 colours: `#000000 #0b0f0b #16201a #24382a #3d5e40 #5f9a5a #8dff7a #dfffd4` (black to phosphor), `#3a2600 #8a5a00 #ffb000 #ffcf66` (amber) and `#c2361f` (rust red, used sparingly). Every image was generated with this exact `palette`, so every pixel is one of these colours.

**Artwork** (`src/assets/art/`, mapped by `src/lib/art.ts`).

- `cards/<slug>.png`: one 128×64 scene per case record (15). Made with `create_image_pro` from the YPay scene as the style anchor (`style_copy`: outline, detail, shading), one call per record, best of 4 candidates picked by eye. No text, no logos, no third-party marks.
- `icons/*.png`: a 32×32 UI kit (overview, work, games, experience, tooling, notes, contact, CV, live LED, pin, clock, download, lock) picked from one 64-candidate `create_1_direction_object` sheet.
- `operator-room.png`: a 192×96 scene for the terminal overview panel.
- `vfx/lever-sparks.png` (5 frames, 64×64) and `vfx/card-glint.png` (11 frames, 27×34): made in PixelLab's `vfx_workbench` (free for subscribers) and repacked as one-row strips with blank frames dropped.
- Shown with `image-rendering: pixelated` at 1×, 1.5× or 2×. The PNGs ship as hashed files and are never inlined (`astro.config.mjs`, `assetsInlineLimit`). The whole set is about 75 KB and lazy-loaded below the fold.
- `CardArt.astro` renders a record's art and falls back to the build-time SVG vignette (`CoverArt`) when a record has none, so experience entries and future records still render.

**Simple view as a datasheet** (`simple.css`).

- *Signal colour.* Phosphor green `#8dff7a` (`--sheet-signal`) replaces amber: LIVE lamps, section indices, the active nav underline, focus rings and the one filled primary (case-file "Email me about…"). Amber now belongs only to the lever.
- *Type.* Plex Sans for names and titles; Plex Mono, uppercase and tracked, for every label: nav, buttons, sheet bar, spec terms, the eyebrow and the stack.
- *Hero, the title block.*
  - A sheet bar: `MS-86 / PORTFOLIO DATASHEET · REV 2026.11 · 48.14°N 11.58°E`.
  - The name set very large in two lines (first name white, family name grey) with a green block cursor.
  - The pixel portrait by default; pressing it shows the photo.
  - A spec list: Base, Status (with a pinging lamp), Live (the count of live systems).
  - A static engineering-paper grid that fades out behind the block.
- *Sections.* Each starts with its pixel icon, a green `01…` index and a hairline rule, then the title.
- *Work index.* A table head (No. / System / Status), then numbered rows: running number, the 2:1 card art, title, mono eyebrow, summary and stack, a LIVE status column, and an arrow. On hover the row tints green, the art plays its glint and the arrow moves. Screenshots now live only in the case files.
- *Controls.* Square-cornered (2–3px), mono, uppercase. No pills.
- *Case files.* The pixel card art is always shown as a small plate above the title, even when a hero screenshot follows.

**Terminal view.**

- Card art replaces the SVG vignettes on the cards, in the live list and in the showcase.
- The side nav uses the pixel icons.
- The overview is the name (large display type), the location, the status line and the operator-room scene with three looping monitor glints.

**VFX** (`src/assets/styles/art.css`).

- **Lever sparks.** An amber burst plays once when the switch is pulled, in both views.
- **Card glint.** A four-point glint plays once on hover over cards, rows, the showcase and the case-file plate.
- **Monitor glints.** Three glints loop over the operator room.
- **LIVE pings.** A ring pings outward from each LIVE lamp in the Simple view.
- Each effect is a sprite strip inside a one-frame window. `steps()` walks it with `transform`, and the windows are small, so nothing repaints the glass. Reduced motion and Effects: Reduced show still frames.

**Regenerating art.** The PixelLab tools are listed in the `pixellab` MCP server. Use the palette above, pass the existing `cards/ypay.png` as the style image, and keep the canvas at 128×64 for cards. Pick candidates by eye, then copy the PNG into `src/assets/art/`. A new record needs no code change: `cardArt()` finds `cards/<slug>.png` by name.

**New native-review copy (ru/de/ge):** the datasheet labels in `sheetCopy` (sheet title, No., System, Status, Base, systems live).

**Verified, 22 November 2026 (second pass).** `npm run validate`: 0 Astro/TypeScript errors; budgets JS 8.9 KB, CSS 26.6 KB, inline art 7.3 KB gzipped; 298 of 298 browser tests passed on the release run. In an earlier run, a card flip at 768×1024 failed once and then passed 20 of 20 on repeat, so it is timing-flaky. Screenshots are in [design-audit/datasheet-pixels](./design-audit/datasheet-pixels/).

## November 2026: Simple view by default, terminal behind a rusty switch

This section supersedes the October direction wherever they conflict. The rest of this document describes the terminal view, which is unchanged unless noted here.

**Owner decisions (22 November 2026).**

- A first visit, no-JS visitors and shared links without `?view=` all get the **Simple view**: black, quiet and scannable for recruiters.
- The terminal is opt-in through a header switch on the left. It is meant to look rusty, cartoonish and out of place, so people get curious and pull it.
- New case files: YLead · YDesk Phone (badged LIVE by the owner), Neo Taxi & Neo Delivery, Space (Movas), NeoUniverse Platform, Last Standard, and a single SurikMods entry. SurikMods never mentions AI assistance.
- Screenshots: public, signed-out pages only.

**The view switch.**

- `html[data-view]` is `simple` or `terminal`.
- The server renders `simple`. The pre-paint script in `BaseHead.astro` applies the first of: `?view=terminal|simple` (stored), `localStorage.interfaceView`, then `simple`.
- `present.css` hides `[data-terminal-only]` blocks in the Simple view and `[data-simple-only]` blocks in the terminal.
- The fitted console is scoped to `[data-view="terminal"]`, and `terminal.ts` only fits panels in the terminal view. The header switch fires `interface-view-change`, which re-lays the console and plays the power-on (forced, even if this session already saw it). With sound on, the boot sound plays too.

**The rusty switch** (`ViewSwitch.astro`, `switch.css`).

- Art: a 64×56 inline SVG breaker lever with a rust gradient, `feTurbulence` grit, steel rivets, a hazard-stripe band, a red ball knob and a lamp.
- Labels: a stencilled "TERMINAL" plate and a paper "do not pull" tag. The tag is translated; the word TERMINAL stays in English. Both are hidden below 480px.
- Placement: bolted on crooked (−5°).
- Motion: an idle wobble every 7s, a nudge on hover, and a clunk plus spark on pull. All of it stops under reduced motion or Effects: Reduced.
- Semantics: `role="switch"` with a stable name ("Terminal mode") and `aria-checked`. State shows in the lever angle and the lamp, not in colour alone. The target is at least 44px, it is never a primary action, and the Options drawer mirrors it as a pressed toggle.

**Simple view** (`simple.css`, all rules scoped to `:root[data-view="simple"]`, written without nesting so older browsers still get it).

- **Palette and type.** Pure black, `#e5e5e5` text and `#1c1c1c` hairlines. Amber appears only on the one primary action per view, and a small P1-green dot marks LIVE. Type is IBM Plex Sans 600 for headings and Plex Mono for labels and indices, so the Plex superfamily is the brand link between the views. Montserrat never loads in this view.
- **Landing order.** One column of about 54rem:
  1. hero: photo avatar, name and location, the English title headline, general line, actions, availability (the track record and direct email line were removed by the owner on 22 November 2026)
  2. Selected work as rows (16:10 screenshot or the record's pixel glyph, title, LIVE, eyebrow, summary, stack)
  3. open source
  4. Games rows
  5. Experience
  6. Notes
  7. Contact

  Sections carry mono indices (01–05) instead of the terminal kickers. The hero proof, card hand, reader and Backlog Breaker are hidden.
- **Case files.** The hero screenshot replaces the CRT cover when one exists. Below it: an "At a glance" row, then overview, problem and constraints, what was built, an architecture flow, the mods, the gallery with a `<dialog>` lightbox, and the full stack. The contextual call to action remains the only filled primary.
- **Long locales.** Russian, German and Georgian headlines are set smaller, so the actions reach the first viewport at every tested size of at least 568px height.

**Header.** The lever sits before the brand. Its plate and tag hide below 1280px. With JavaScript the inline nav steps aside below 1200px (all locales) and below 1600px in Georgian, where its labels would collide with the brand; the Options drawer carries the same links. The controls stay pinned to the end of the header.

**Terminal realism pass** (`crt.css`, terminal view only). The layers are ranked by impact against cost. All of them sit in the glass background or beneath the content, and all motion stops under reduced motion or Effects: Reduced. No WebGL was added.

1. **Curved glass.** A specular reflection at the upper left, edge falloff and a deeper inset vignette.
2. **Convergence fringe.** A ±0.6px red/cyan fringe added to `--glow-display`, so it appears only on the hero headline and section titles.
3. **Shell semantics.**
   - Every panel and case file opens with a real prompt (`suren@ms-86:~$ ls ~/work --live`, `cat ypay/README.md`) and a blinking block cursor. The prompts are `aria-hidden`.
   - The status line is now a tmux bar: session, window list following the active panel, LIVE count, and a Munich clock.
4. **Background texture.** Film grain (an SVG turbulence data URI) and a faint aperture-grille stripe.
5. **Boot.** The power-on opens as a dot, then a line, then a bloom (760ms), and the status bar shows a three-part POST line for about 1.4s.

**Performance fix (22 November 2026).**

- The first release also had a slow refresh band, which animated `background-position` across the glass. In a Chrome trace it re-rasterized the whole screen every frame: the idle terminal ran at 14 fps, and more than 90% of frames dropped during scroll, card hover, drag and tab switches. The band was removed.
- The tab-switch "phosphor wake" now fades opacity instead of animating `filter: brightness`.
- In the fitted console, the panel area has its own compositor layer.
- Measured on a local build at 1440×900:
  - idle at 60 fps;
  - 0 dropped frames during scroll, tab switches and hover;
  - 1 dropped frame during a card drag;
  - raster work about 10× lower.
- `tests/performance.spec.ts` guards against regressions. The rule is that decorative motion animates only `transform` or `opacity` on small elements.

**References for this pass.**

- *Terminal realism.* The CRT references above still apply. Added:
  - [cool-retro-term's default profile](https://github.com/Swordfish90/cool-retro-term): bloom 0.6, burn-in 0.3, curvature 0.2, flicker 0.1, noise 0.1.
  - [Alec Lownes, CRT display in CSS](http://aleclownes.com/2017/02/01/crt-display.html): scanlines, an RGB stripe and colour fringing.
  - [ekeijl, retro CRT terminal](https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh): the rolling scan bar; flicker was dropped because it strains the eyes.
  - [Charm](https://charm.land): real prompts and output instead of faked chrome.
- *Recruiter scanning.*
  - [The Ladders eye-tracking study](https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/): about 7.4s per scan, with simple layouts and clear headings doing best.
  - [NN/g on the F-shaped pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
  - [Brittany Chiang](https://brittanychiang.com): name and role first, experience with chips, a résumé link, and projects with thumbnails.
- *Toggle.*
  - [Josh Comeau on a flash-free mode switch](https://www.joshwcomeau.com/react/dark-mode/): set the attribute before paint, with precedence.
  - [WAI-ARIA switch pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/).
- *Fonts.*
  - No open-source monospace covers Georgian, and IBM Plex Sans Georgian does not exist (see the [IBM Plex packages](https://github.com/IBM/plex)). The existing Plex + Noto Sans Georgian stack therefore stays, with no new font bytes.

**Verified, 22 November 2026.**

- `npm run validate`: 0 Astro/TypeScript errors, 298 browser tests passed, 0 failed (after the performance fix and track-record removal).
- The existing suite runs in the terminal view through `tests/terminal-view.json`. `tests/simple-view.spec.ts` covers the default view, the switch, `?view=`, axe, a 6-viewport × 4-locale fit and primary matrix, the case-file images and the lightbox.
- Budgets: JS 8.9 KB, CSS 25.4 KB and inline art 8.1 KB gzipped.
- Screenshots of both views and the new case files are in [design-audit/simple-view](./design-audit/simple-view/).
- New native-review copy (ru/de/ge): the switch tag and hint, the case-file headings, all six new records, the Last Standard alt text and the architecture captions.

## Research and Adapted Principles

The October 2026 terminal-identity pass used these references as principles only. No layouts, assets or code were copied. The site uses no Fallout assets or logos and implies no affiliation.

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

- [Evil Martians, NATS case study](https://evilmartians.com/clients/nats): a case study states its outcome and ends with a contextual offer ("Hire us to handle your performance challenge"). Every case file now ends with "Building something similar?" and "Email me about {project}".
- [Evil Martians, "We studied 100 dev tool landing pages"](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025): a specific primary action with a visually distinct secondary, evidence directly after the hero, and a final call to action. The hero has one filled primary and an outlined CV, and proof follows the actions.
- [Nielsen Norman Group, "Get Started" Stops Users](https://www.nngroup.com/articles/get-started/): labels should say what happens. Actions read "Contact me", "Email me", "Email me about YPay" and "CV (PDF)", and the hero shows the address itself.
- [Nielsen Norman Group, Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/): visible contact information, correct and current content, and connections to the rest of the web. The address is visible beside every email action, project links stay one click away, and German project copy no longer uses ASCII transliterations.
- [Nielsen Norman Group, 5-Second Usability Test](https://www.nngroup.com/videos/5-second-usability-test/): the first screen must say who, for whom, prove it, and offer the next step. The audit checked each locale against these four questions.
- [Lynn Fisher (lynnandtonic.com)](https://lynnandtonic.com/): a strong, idiosyncratic identity is memorable when the hire path stays plain. The identity lives in the chrome; contact is direct text and one button.

Accessibility, motion and WebGL:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): 2.4.11 Focus Not Obscured and 2.5.8 Target Size. Controls stay at least 44px, sticky surfaces never cover focus, and inline links keep 24px targets.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion): every animation, the card fan and pointer tilt stop under reduced motion or Effects: Reduced.
- [MDN: WebGL best practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices), [OGL](https://github.com/oframe/ogl) and [three.js at near-perfect gzip](https://minime.stephan-brumme.com/threejs/128/): cap device pixel ratio, handle context loss, refuse software rendering, and use the lightest tool. OGL's core is about 8 KB and three.js about 149 KB gzipped; a raw shader prototype measured 1.48 KB.

Earlier references from the October 2026 audit still apply: [Practical Typography: line length](https://practicaltypography.com/line-length.html) for article measure, [Noto Georgian](https://notofonts.github.io/georgian/) and the [W3C Georgian Script Resources](https://www.w3.org/TR/geor-lreq/) draft for Georgian rendering, and [W3C language-sensitive CSS guidance](https://www.w3.org/International/questions/qa-css-lang) for language metadata.

## Decisions (terminal-identity pass, October 2026)

- **Direction.** Three concepts were built as mockups at 1440×900 and 390×844: A "Phosphor Restore", B "Instrument Console" (keycaps, dot-matrix registers, a 1.48 KB WebGL scope) and C "Field Dossier" (greenbar printouts, index cards, manila folders). The owner chose A. B's WebGL scope was not shipped.
- **The hand.** The four-up tilted row cannot return without breaking two real fixes: the 13rem reader lane and the 230px minimum card width. At 1440 the fitted deck shows three cards per row and at 1120–1280 two. The tilt returns as a static alternating fan (±0.8° and a 6px stagger) when motion is allowed. Cards never overlap, never move under the pointer, and lie flat under reduced motion.
- **Headline.** The owner approved "Senior platform engineer for products that have to work." The job title stays in English in every locale (owner decision); only the rest of the sentence is translated, and Georgian uses a colon form.
- **Body and track record.** *(Track record and direct email line removed by the owner on 22 November 2026; the rest stands.)* One general line ("I build scalable platforms and the cloud infrastructure that keeps them running.") replaces a project-specific description; no single project is described in depth in the hero. A short "Track record" list follows the actions. It comes from `impact` in `src/lib/content.ts`, where each line names the experience entries that state its facts, and a test checks every figure against them.
- **Proof.** The first-viewport proof is the Work records with `live: true` (YPay, YDesk, NeoPoints, Grindlike, Raid Signal), linked to their case files, with the count derived from the content model. Only the count carries LIVE; rows do not repeat it. On phones each row shows art and title, so the intro and track record follow within the first scroll. The owner preferred projects to numbers, so the 10,000+ driver figure stays in Experience.
- **Facts.** Location and availability are owner-confirmed and live in `profile` in `src/lib/content.ts`. No testimonials, client logos, response times or booking links are shown; none were provided.
- **Contact.** Every email action uses one address and a subject that names its origin. The address is always visible as text beside a copy button, because `mailto:` can do nothing without a mail client.
- **Georgian display size.** Noto Sans Georgian runs wider and taller than Montserrat, so the Georgian hero headline is set about 10% smaller at every width. Copy is never broken inside a word.
- **Hero order.** The DOM order (headline, actions, proof, explanation) is the small-screen order, so actions and evidence reach the first screen in every locale. The fitted desktop places the explanation between headline and actions and gives proof its own column.

## Foundations

- **Display:** Montserrat 800 for the hero headline, terminal section titles, card titles, proof names and case-file titles. Self-hosted woff2 covers Latin (19.0 KB) and Cyrillic (11.2 KB). Georgian glyphs fall back to Noto Sans Georgian in every display stack.
- **Chrome:** IBM Plex Mono 400/600 for kickers, the status line, navigation keys, actions, labels and metadata. Uppercase with tracking in Latin and Cyrillic; Georgian keeps authored Mkhedruli, normal tracking and comfortable line height.
- **Body:** IBM Plex Sans 400/600. Articles use Merriweather, with Noto Serif Georgian for Georgian glyphs.
- **Palette:** P1 phosphor `#8dff7a`, headline `#dfffd4`, body text `#d6f5cd` and `#a9cba0`, subtle text `#8fae88`, glass `#031005`, chassis `#1a2216`. P3 amber `#ffb000` marks only the one primary action per view and the lit key. Copper `#e8935c` marks tools and amber marks games, and suit shapes repeat the colour distinction.
- **Glow:** phosphor text-shadow only on the hero headline, terminal section titles, card titles, kickers, the lit key and status lamps. Body copy, case files and articles never glow.
- **Shape:** the CRT glass is rounded (18px desktop, 14px phone) and recessed into a pixel-bevelled chassis. Cards use 10–12px corners, controls 4–5px, and the chassis stays square.
- **Spacing:** the 4, 8, 12, 16, 24, 32, 48, 64, 96px scale. The shell is capped at 1280px and rises to 1360px at 1600px. Long-form prose stays near 65–72ch.
- **Sizes:** no readable text below 11px. Controls are at least 44px tall; inline links in sentences and archive title links meet the 24px WCAG 2.2 AA minimum.

## Fast Path and Conversion

- **One primary per view.** The hero has one filled amber action, "Contact me". "CV (PDF)" is outlined and "Explore projects" is a link. The header "Contact" key and Backlog Breaker's "Start" stay secondary. The contact panel's primary is "Email me" and a case file's primary is "Email me about {project}".
- **Hero.** It names Suren and the location (from `profile`), states the approved positioning in one general line, offers the actions and shows live proof. The owner-confirmed availability sits beneath as a status line. (The track record and the direct email line were removed on 22 November 2026; the address stays in Contact and the case-file calls to action.)
- **Contact panel.** An "Email me" action with a subject, the visible address with a copy button, a short "useful to include" list, then LinkedIn, GitHub and the CV.
- **Case files.** The header shows evidence: cover, number, suit, LIVE, outcome, role and stack. Its product and source links are secondary, plus a link down to the call to action. Previous/next navigation follows the body. The file always ends with the contextual call to action.
- **Open-source showcase.** One "Open case file" button per project; the product and source links are quiet inline links.
- **Dead ends.** The 404 page answers in the requested locale (English without JavaScript) and offers contact. Articles end with a quiet contact line; post bodies are unchanged.
- **Measurement.** The site has no analytics, and no tracking was added. Conversion choices are heuristic.

## Navigation

- Every page has immediate Contact and CV access.
- Header links use familiar labels: Work, Games, Tooling, Experience, Notes. Languages and interface options stay reachable through the drawer at compact widths.
- The fitted console's side navigation is a column of bordered mono keys with pixel icons. The active key is lit amber with a pixel chevron.
- Only an enhanced fitted console suppresses the duplicate header navigation. Continuous and JavaScript-disabled pages keep ordinary navigation.
- The footer is the terminal status bar, with email, GitHub, LinkedIn and CV links.
- A German Impressum remains an owner-content follow-up; legal identity and address must come from the owner.

## Card System and Open-Source Showcase

Cards are a view of records in `src/lib/content.ts`, derived by `src/lib/cards.ts`. Cards, List, Tooling, the hero proof, the showcase and case files share records, links, status and artwork. Cards and proof use the authored compact `cardSummary`; List uses the full `summary`. A case file states role and outcome once in its header; its body adds narrative, contribution, constraints, details and the full stack.

- **Faces.** The front presents suit pips (top label and a turned bottom pip), LIVE foil, art in a scanlined window, a Montserrat title, a mono eyebrow, the complete summary and keywords. The back presents role/constraints or details and stack.
- **Controls.** Flip and Open case file form a tab joined to the top of the card. Tall cards can be flipped before reading, and the controls never move when a card flips.
- **Fitted grid.** The fitted desktop hand fills the space up to a reserved 13rem reader lane: three columns at 1440 and two at 1120–1280, never narrower than 232px. Tablets use a stretching grid without edge gaps. Phones use a horizontal scroll-snap row with visible controls.
- **Fan.** With motion allowed, the fitted hand rests in a slight alternating fan that never overlaps and never moves under the pointer. A dragged preview keeps the card's size and angle.
- **Reader.** It is a recessed slot with a sensor line, and its status text sits below the slot, never across it. Keyboard users reach Flip and Open case file directly, and every record is readable without dragging or flipping.
- **Semantics.** Each card is `li > article` with a real heading. Flip is a toggle with `aria-pressed`, and the inactive face is `inert`.
- **LIVE.** It means the system actually runs in production (`live: true`). Public code, a website or a prerelease alone does not earn it.

## Responsive Composition

- **Below 768px:** compact header, full-screen navigation drawer, continuous flow, and the hero order headline → actions → proof → explanation. Phone-native card scrolling and large touch targets.
- **768–1119px:** compact header and drawer, a single-column hero with a two-column proof grid, and a stretching card grid.
- **At least 1120 wide and 720 tall:** JavaScript enhances the landing and Tooling pages into the fitted console. The glass holds the status line, the key navigation and one active panel; long panels scroll internally. The hero shows the explanation before the actions, with proof in a second column.
- **Below 720px tall:** continuous flow even at laptop widths. Below 500px tall the header scrolls away.
- **1600px and above:** a wider shell with bounded text measure.
- **Without JavaScript:** all content remains in document flow, direct links work, and copy buttons stay hidden while the address stays readable.

Verification matrix: 320×568, 360×740, 375×667, 390×844, 414×896, 844×390, 768×1024, 820×1180, 1024×768, 1180×820, 1280×720, 1440×900 and 1920×1080, plus 1120×720 (the smallest fitted console), 1280×650 and 1366×650.

At every size of at least 568px height, in all locales, the three hero actions sit in the first viewport and exactly one filled primary is visible. Proof starts in the first viewport everywhere except the 320×568 phone, where it begins directly below the actions, and the 844×390 landscape, which is a scrolling layout by design.

## Motion, Input, and Progressive Enhancement

- Sound defaults off. Effects follow the OS unless explicitly reduced; both preferences persist when storage is available.
- **Power-on:** a decorative beam opens across the glass once per session (420ms) over already-rendered content. It is skipped under reduced motion, Effects: Reduced, or blocked storage.
- **Panels:** switching panels uses an opacity fade within 110ms plus a brief phosphor brightness wake.
- **Small motion:** the kicker and case-file cursors blink, and the header, status and chassis LEDs pulse. The LIVE foil sheens, the card fan rests at an angle, and fine pointers tilt cards.
- **Reduced motion:** reduced motion or Effects: Reduced stops all of this immediately, including when changed while the page is open. Flips become immediate.
- Focus is clearly visible, and active state never relies on colour alone. Hover never selects an item or exposes the only available action.
- **Accessible names:** the prompt glyph on actions and the lit-key chevron are CSS masks, never text, so they never join an accessible name.
- Avoid blend-mode layers over moving cards. Pointer movement is processed once per animation frame and updates transforms, not layout.

## Artwork, WebGL, and Backlog Breaker

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

## Audit Findings (5 October 2026)

The audit compared baseline `2146c1e` (the b425d54 design) with `ba44a8f` across 7 viewports and 4 locales: 1,536 views, 88 axe scans, contact-friction runs and all case-file endings.

It confirmed that the previous pass fixed real problems but flattened the identity. Kept fixes:

- Short laptops (1366×650) no longer overlap panels.
- Georgian renders in Noto everywhere, where it was FreeSans in headings and controls.
- Georgian 320px actions moved from 731px to 509px.
- Summaries are complete, cards do not overlap, and the reader has its own lane with focus never hidden.
- The Georgian tablet header no longer collides.
- The Russian article no longer overflows on phones.
- The headline is static; the baseline typed it in, changing its accessible name.
- CSS fell from 30.0 to 17.4 KB gzipped.

Lost identity:

- the Montserrat glow headline
- the CRT glass
- mono key navigation and prompt actions
- status chips
- the fanned hand
- seven of the nine animation sets

New conversion gaps:

- Two filled primaries ("Contact me" and the game's "Start") competed in the first viewport.
- The primary button of all 36 case files was the external product link, and every case file ended on prev/next navigation.
- Contact was a bare mailto without a subject.
- The tablet hero and the overview below the fold had voids.
- The dock label crossed the slot on an opaque band.
- The Russian phone showcase failed target spacing.

This pass restores the identity on top of the kept fixes and closes those gaps. Matched screenshots are in [design-audit/terminal-identity](./design-audit/terminal-identity/).

## Native Review

New or changed copy ships in all four locales. Native-speaker review is outstanding for:

- **Georgian (`ge`):**
  - hero headline, body and track-record list
  - contact audience line, proof title, status label
  - contact panel copy and the "useful to include" list
  - email subjects
  - case-file call-to-action copy and the 404/article contact line
- **Russian and German:** the hero headline, body and track-record list, the meta descriptions, the contact and case-file call-to-action copy, and the aligned YPay summary.

Historical project and experience records keep their documented English fallback where translations do not exist. Blog bodies are unchanged.

## Performance and Validation

`npm run validate` runs Astro/TypeScript checks, the static build, budget checks and Playwright coverage. Browser verification waits for fonts and inspects actual rendered font families where possible.

Budgets (gzipped):

- Initial landing JavaScript: at most 15 KB.
- Landing CSS: at most 32 KB.
- Decorative WebGL: at most 6 KB, lazy only (none shipped).
- Inline pixel art: at most 20 KB per page.
- The drawer and game engine remain lazy. Cards add no runtime dependency.

Keep review screenshots outside `public/` so they do not add shipping assets.

Start a built local preview, then run `node scripts/capture-design-audit.mjs` and `node scripts/capture-card-reader-audit.mjs`. Set `AUDIT_BASE_URL` for another local port and pass an output directory as the first argument. Both scripts write a JSON manifest beside their screenshots.

### Verified results — 5 October 2026

`npm run validate` passed with exit code 0:

- zero Astro/TypeScript errors or warnings; the seven existing `z` deprecation hints remain
- 66 generated pages
- passing budgets
- **252 browser tests passed**, with 321 intentional project exclusions and no failures

The 25 new conversion tests run once on the desktop project. Their phone/tablet duplicates are among the exclusions, alongside the existing explicit matrices and pointer-specific tests.

| Gzipped asset | Before (main) | After | Budget |
| --- | ---: | ---: | ---: |
| Initial landing JavaScript | 7.6 KB | 8.3 KB | 15 KB |
| Landing CSS | 17.4 KB | 20.2 KB | 32 KB |
| Decorative WebGL (lazy) | none | none | 6 KB |
| Inline SVG (maximum per page) | 5.6 KB | 5.8 KB | 20 KB |

New fonts: Montserrat 800 woff2, Latin 19.0 KB and Cyrillic 11.2 KB (loaded only for the scripts on the page). They replace six unused Montserrat `.woff` files.

**Capture scripts.** Both scripts ran unchanged against main and the branch.

- **Design matrix:** 172 screenshots per build, zero horizontal overflows, zero failed flows.
- **Card reader:** 144 screenshots per build, zero overflow or clipping findings, zero obscured focused controls, zero failed flows.

**Supplementary audit.** 794 views per build across 7 viewports and 4 locales.

- **Defects:** zero overflows, clipped controls or mid-word breaks.
- **Axe:** zero serious/critical violations in 44 scans (main had one, the Russian phone showcase).
- **Case files:** all 36 end with the call to action; none leads with an external primary.

**Hero measurement.** All 16 sizes and 4 locales: no headline word overflows. At every size of at least 568px height, the three actions sit in the first viewport with exactly one filled primary.

Matched screenshots (main `ba44a8f` before, this branch after), stored as WebP outside `public/`:

| View | Before | After |
| --- | --- | --- |
| English hero, 1440×900 | [Before](./design-audit/terminal-identity/en-1440x900-home-before.webp) | [After](./design-audit/terminal-identity/en-1440x900-home-after.webp) |
| Georgian hero, 1440×900 | [Before](./design-audit/terminal-identity/ge-1440x900-home-before.webp) | [After](./design-audit/terminal-identity/ge-1440x900-home-after.webp) |
| Georgian phone, 320×568 | [Before](./design-audit/terminal-identity/ge-320x568-home-before.webp) | [After](./design-audit/terminal-identity/ge-320x568-home-after.webp) |
| English phone, 390×844 | [Before](./design-audit/terminal-identity/en-390x844-home-before.webp) | [After](./design-audit/terminal-identity/en-390x844-home-after.webp) |
| Short laptop, 1366×650 | [Before](./design-audit/terminal-identity/en-1366x650-home-before.webp) | [After](./design-audit/terminal-identity/en-1366x650-home-after.webp) |
| Tablet, 820×1180 | [Before](./design-audit/terminal-identity/en-820x1180-home-before.webp) | [After](./design-audit/terminal-identity/en-820x1180-home-after.webp) |
| Work deck with motion, 1440×900 | [Before](./design-audit/terminal-identity/en-1440x900-work-motion-before.webp) | [After](./design-audit/terminal-identity/en-1440x900-work-motion-after.webp) |
| Work deck and reader lane, 1440×900 | [Before](./design-audit/terminal-identity/en-1440x900-work-reader-before.webp) | [After](./design-audit/terminal-identity/en-1440x900-work-reader-after.webp) |
| Georgian armed reader, 1280×720 | [Before](./design-audit/terminal-identity/ge-1280x720-work-armed-before.webp) | [After](./design-audit/terminal-identity/ge-1280x720-work-armed-after.webp) |
| Russian Tooling focused control, 1440×900 | [Before](./design-audit/terminal-identity/ru-1440x900-tooling-focus-before.webp) | [After](./design-audit/terminal-identity/ru-1440x900-tooling-focus-after.webp) |
| Open-source showcase, 1440×900 | [Before](./design-audit/terminal-identity/en-1440x900-showcase-before.webp) | [After](./design-audit/terminal-identity/en-1440x900-showcase-after.webp) |
| Contact, 1440×900 | [Before](./design-audit/terminal-identity/en-1440x900-contact-before.webp) | [After](./design-audit/terminal-identity/en-1440x900-contact-after.webp) |
| Case-file ending, 1440×900 | [Before](./design-audit/terminal-identity/en-1440x900-case-end-before.webp) | [After](./design-audit/terminal-identity/en-1440x900-case-end-after.webp) |
| Russian article, 1440×900 | [Before](./design-audit/terminal-identity/ru-1440x900-article-before.webp) | [After](./design-audit/terminal-identity/ru-1440x900-article-after.webp) |

### Earlier passes

- **4 October 2026, readability pass:** replaced clamped, overlapping cards and system-font Georgian with complete summaries, explicit Noto coverage, shared tokens and a single fitted-console condition. 202 browser tests passed.
- **4 October 2026, card-reader follow-up:** gave the reader its own lane, made focus scrolling clear the sticky toolbar, and added localized pickup/armed/cancel states and interruption cleanup. 227 browser tests passed. Evidence is in [design-audit](./design-audit/) and [design-audit/card-reader](./design-audit/card-reader/).

Review boundaries: automated and visual checks use Chromium. They do not establish parity with physical devices or other browser engines, and native Georgian review remains outstanding.
