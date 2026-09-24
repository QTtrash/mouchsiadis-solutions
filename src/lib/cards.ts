// Derives the card deck from portfolio content. Cards are a view over
// src/lib/content.ts records; they never carry copy of their own.

import { buildLocalePath } from "./blog.ts";
import { gameProjects, projects, toolProjects, type ProjectEntry } from "./content.ts";
import type { Locale } from "./i18n.ts";

export type Suit = "platform" | "tool" | "game";

export interface CaseRecord {
  entry: ProjectEntry;
  suit: Suit;
}

/** Every record with a case file, in deck order. */
export const caseRecords: CaseRecord[] = [
  ...projects.map((entry) => ({ entry, suit: "platform" as const })),
  ...toolProjects.map((entry) => ({ entry, suit: "tool" as const })),
  ...gameProjects.map((entry) => ({ entry, suit: "game" as const })),
];

export const workRecords = caseRecords.filter((record) => record.suit !== "game");
export const gameRecords = caseRecords.filter((record) => record.suit === "game");
export const toolRecords = caseRecords.filter((record) => record.suit === "tool");

export function localize<T>(record: { en: T } & Partial<Record<Locale, T>>, locale: Locale): T {
  return record[locale] ?? record.en;
}

export function casePath(locale: Locale, slug: string): string {
  return buildLocalePath(locale, `/work/${slug}`);
}

/** The card's one-line effect text: the evidenced outcome when there is one. */
export function cardOutcome(entry: ProjectEntry, locale: Locale): string {
  return entry.evidence ? localize(entry.evidence.outcomes, locale) : localize(entry.summary, locale);
}

/** Shared by the card art and the case-file cover so navigation can morph between them. */
export function transitionName(slug: string): string {
  return `case-${slug}`;
}
