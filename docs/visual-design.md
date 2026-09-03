# Visual Design System

## Direction

The product uses **instrument-grade retro-futurist editorial UI**: a diegetic field-terminal frame combined with the clarity and evidence hierarchy of professional software tooling. It is intentionally not a Fallout replica, glassmorphism, neo-brutalism, or a generic SaaS dashboard. The machine metaphor gives the portfolio identity; readable typography, plain information architecture, and progressive disclosure make it useful.

The balance is roughly 70% content clarity and 30% atmospheric treatment. Scanlines, noise, copper/amber signals, monospace readouts, and code-drawn schematics are supporting cues. They must never delay access, reduce contrast, or become required interaction knowledge.

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

## Responsive Composition

- Phone, below 768px: compact header and full-screen navigation drawer; single-column archive; large touch targets; inline Tooling accordions; no WebGL or hover assumptions.
- Small tablet, 768–1119px: continuous archive, one or two columns as content permits, normal document scrolling.
- Desktop, 1120px and at least 720px tall: fitted console with side mode navigation and one active panel.
- Short laptop: continuous archive avoids nested-scroll and clipped-panel failures.
- Large desktop, 1600px+: content width grows modestly; typography and line length do not scale without limit.

## Component Ownership

- Custom design-system primitives: typography, tokens, buttons, badges, status markers, section headings, archive cards, panels, and code-drawn cover art.
- Custom application components: project evidence records, career timeline, contact panel, notes archive, and Tooling instrument cards.
- Wrapped third-party primitive: Web Awesome drawer supplies focus management, dismissal, Escape behavior, and dialog accessibility while this project owns its visual layer.
- Specialized runtime: Three.js powers the eligible desktop Tooling terrain only. Mobile uses the authored SVG fallback.
- Native HTML first: `details`/`summary` handles archive disclosure and mobile Tooling records.

## Interaction States

Controls require default, hover where relevant, visible keyboard focus, pressed/selected, disabled when introduced, and loading when introduced states. Hover never changes selection. Sound defaults off and lives in Interface options. Visual effects follow the OS by default and may be explicitly reduced. Both preferences persist locally.

Motion is brief and functional: terminal panels use a 110ms opacity-only fade, while ordinary control states stay in the 160–240ms range. Cross-page navigation never waits for a cinematic transition. `prefers-reduced-motion` and the in-product Reduced setting disable decorative animation and WebGL.

## Asset And IP Rules

- Do not use official Fallout logos, labels, protected artwork, or claims of affiliation.
- Treat the frame as generic industrial hardware texture.
- Raster assets ship in compressed WebP variants. Decorative artwork has empty alt text; meaningful images require useful alternatives and dimensions.
