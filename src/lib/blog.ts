import type { CollectionEntry } from "astro:content";
import { LOCALES, type Locale, localeIntlCodes } from "./i18n.ts";

export function getPostLanguage(post: CollectionEntry<"blog">): Locale {
  return post.data.language;
}

export function getPostSlug(post: CollectionEntry<"blog">): string {
  return post.id;
}

export function getPostLanguageLabel(postLocale: Locale, shellLocale: Locale) {
  const labels: Record<Locale, Record<Locale, string>> = {
    en: {
      en: "English",
      ru: "Russian",
      de: "German",
      ge: "Georgian",
    },
    ru: {
      en: "Английский",
      ru: "Русский",
      de: "Немецкий",
      ge: "Грузинский",
    },
    de: {
      en: "Englisch",
      ru: "Russisch",
      de: "Deutsch",
      ge: "Georgisch",
    },
    ge: {
      en: "ინგლისური",
      ru: "რუსული",
      de: "გერმანული",
      ge: "ქართული",
    },
  };

  return labels[shellLocale][postLocale];
}

export function formatDate(date: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeIntlCodes[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function buildLocalePath(locale: Locale, suffix = "") {
  const path = `/${locale}${suffix}`;

  if (path.endsWith("/") || path.includes("#")) {
    return path;
  }

  return `${path}/`;
}

export function sortPosts(posts: CollectionEntry<"blog">[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function buildLocaleAlternates(pathSuffix = "") {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, buildLocalePath(locale, pathSuffix)]),
  ) as Record<Locale, string>;
}
