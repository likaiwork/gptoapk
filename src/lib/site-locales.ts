/**
 * Single source of truth for URL locale segments (e.g. /it/..., /nl/faq).
 * Update regex consumers when adding a locale.
 */
export const SITE_LOCALES = [
  "en",
  "zh",
  "ja",
  "pt",
  "es",
  "ru",
  "id",
  "hi",
  "ko",
  "fr",
  "de",
  "vi",
  "ar",
  "tr",
  "it",
  "nl",
  "pl",
  "uk",
  "th",
  "ms",
  "sv",
  "da",
  "fi",
  "nb",
  "cs",
  "ro",
  "el",
  "hu",
  "bn",
  "tl",
  "he",
  "fa",
  "ur",
] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

/** Locales that use right-to-left layout (`dir="rtl"`). */
export const RTL_SITE_LOCALES = new Set<SiteLocale>(["ar", "he", "fa", "ur"]);

export function isRtlLocale(locale: string): boolean {
  return RTL_SITE_LOCALES.has(locale as SiteLocale);
}

export const SITE_LOCALE_PATTERN = SITE_LOCALES.join("|");

export const localePathRegex = new RegExp(`^\\/(${SITE_LOCALE_PATTERN})(\\/.*)?$`);

export const localeAliasRegex = new RegExp(
  `^\\/(${SITE_LOCALE_PATTERN})\\/(${SITE_LOCALE_PATTERN})(\\/.*)?$`,
);
