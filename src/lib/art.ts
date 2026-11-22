// PixelLab artwork (November 2026): one 128x64 card illustration per case
// record, a 32x32 UI icon kit and two VFX sprite strips, all drawn on the
// MS-86 palette (black, phosphor green, amber). Files live in src/assets/art/
// and ship as hashed PNGs; they are never inlined (astro.config.mjs) and are
// always shown with image-rendering: pixelated at whole or 1.5x scales.
// Kept apart from content.ts so Node tests can import content without Vite.

const cardFiles = import.meta.glob<string>("../assets/art/cards/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const iconFiles = import.meta.glob<string>("../assets/art/icons/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const byName = (files: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(files).map(([path, url]) => [path.split("/").pop()!.replace(/\.png$/, ""), url]),
  ) as Record<string, string>;

const cards = byName(cardFiles);
const icons = byName(iconFiles);

export const CARD_ART = { width: 128, height: 64 } as const;
export const ICON = { width: 32, height: 32 } as const;

/** The card illustration for a case record, if one was drawn. */
export function cardArt(slug: string): string | undefined {
  return cards[slug];
}

export type IconName =
  | "overview"
  | "work"
  | "games"
  | "experience"
  | "tooling"
  | "notes"
  | "contact"
  | "cv"
  | "live"
  | "pin"
  | "clock"
  | "download"
  | "lock";

export function icon(name: IconName): string {
  return icons[name];
}

export { default as leverSparks } from "../assets/art/vfx/lever-sparks.png?url";
export { default as cardGlint } from "../assets/art/vfx/card-glint.png?url";
/** The terminal overview scene: the operator room (192x96). */
export { default as operatorRoom } from "../assets/art/operator-room.png?url";
export const SCENE = { width: 192, height: 96 } as const;

/** Frame geometry of the VFX strips (one row, left to right). */
export const VFX = {
  leverSparks: { frames: 5, width: 64, height: 64, fps: 16 },
  cardGlint: { frames: 11, width: 27, height: 34, fps: 12 },
} as const;
