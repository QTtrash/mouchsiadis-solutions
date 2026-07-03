# Visual Design

## Goal

The site should feel like a professional software portfolio viewed through a Pip-Boy-inspired terminal, not a direct Fallout replica. The interface should stay readable, credible, and useful for portfolio scanning while using hardware-frame, CRT, and control-panel cues.

## Reference Principles

- Pip-Boy references inform the structure: physical frame, constrained screen, compact mode buttons, monochrome display, scanlines, and utilitarian labels.
- The Wand Company manual reinforces that navigation should feel like hardware controls: mode buttons, selectors, scroll areas, and feedback states.
- The Pip-Boy design notes reinforce practical retro-future realism: industrial hardware should look usable, not decorative only.
- NASRAL is a useful reference for dense game-interface rhythm: square controls, strong borders, CRT color discipline, and fitted viewport composition.

## Component Rules

- Keep the landing page as a fixed console with internal panels.
- Use the side navigation as the primary mode selector; labels should stay short and control-like.
- Keep archive cards dense: compact covers, clear titles, metadata chips, and expandable detail rows.
- Prefer flat borders, subtle inset shadows, scanlines, and modest glow over large decorative gradients.
- Keep buttons, chips, status labels, and metadata in monospace uppercase to separate controls from body text.
- Terminal body text is monospace (IBM Plex Mono) — the screen reads as one machine. Long-form blog articles are the exception and keep the Merriweather serif for reading comfort.
- Dual-phosphor palette: green is the system color; amber (`--amber: #ffb000`) is a scarce accent reserved for active states, kickers, cursors, status highlights, and the game lab's cover art. Never let amber dominate a panel.
- Every project card carries unique code-drawn SVG cover art (`CoverArt.astro`) in phosphor line-art; unknown slugs fall back to a generic record-chip schematic.
- Cinematic CRT behaviors (all gated by `prefers-reduced-motion` and implemented in `src/scripts/`): a skippable POST-style boot sequence once per session, scramble-decode on panel headings, a typed hero title after boot, blinking block cursors, and hover flicker. There is deliberately NO literal command line — fiction you feel, never fight.
- Sound is synthesized in code (`src/scripts/sound.ts`), strictly opt-in behind the SND toggle, default off.
- Blog and article pages share the same phosphor visual system but prioritize comfortable reading width.

## Spacing And Responsive Rules

- Desktop content should appear fitted inside the screen frame with tight but consistent gaps.
- Mobile keeps the frame metaphor, but navigation becomes horizontal and panel content scrolls internally.
- Text must not overlap controls or frame edges; long localized strings should wrap inside their own panels.
- Avoid introducing new palette modes unless the UI to select them is implemented and documented.

## Asset And IP Rules

- Do not copy official Fallout logos, exact screen labels, or protected art assets.
- The existing terminal frame image may be used as a generic hardware texture only.
- New visual changes should remain portfolio-first and avoid in-universe claims.
