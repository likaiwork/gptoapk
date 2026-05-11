/**
 * i18n utility for gptoapk.com
 * Simple JSON-based translation system for Next.js App Router
 */

export type Locale = "en" | "zh";

export const locales: Locale[] = ["en", "zh"];
export const defaultLocale: Locale = "en";

// Messages type
let messagesCache: Record<string, any> = {};

export function loadMessages(locale: Locale): Record<string, any> {
  if (messagesCache[locale]) return messagesCache[locale];
  
  try {
    messagesCache[locale] = require(`../../messages/${locale}.json`);
    return messagesCache[locale];
  } catch {
    // Fallback to English
    messagesCache["en"] = require(`../../messages/en.json`);
    return messagesCache["en"];
  }
}

/**
 * Get a translation value by dot-separated key path.
 * Supports simple interpolation: {key}
 */
export function t(locale: Locale, key: string, params?: Record<string, string | number>): string {
  const messages = loadMessages(locale);
  
  const keys = key.split(".");
  let value: any = messages;
  
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // fallback to key name
    }
  }
  
  if (typeof value !== "string") return key;
  
  // Interpolation
  if (params) {
    let result = value;
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(`{${k}}`, String(v));
    }
    return result;
  }
  
  return value;
}

/**
 * Get a dictionary (object) from messages by key path
 */
export function dict(locale: Locale, key: string): any {
  const messages = loadMessages(locale);
  const keys = key.split(".");
  let value: any = messages;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return {};
    }
  }
  return value;
}

/**
 * Detect locale from Accept-Language header
 */
export function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale;
  
  // Check if Chinese is preferred
  if (acceptLanguage.startsWith("zh")) return "zh";
  
  return defaultLocale;
}

/**
 * Get alternate hreflang URLs for SEO
 */
export function getAlternates(locale: Locale, path: string = "") {
  const baseUrl = "https://gptoapk.com";
  const alternates: Record<string, string> = {};
  
  for (const loc of locales) {
    const href = loc === defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${loc}${path}`;
    alternates[loc] = href;
  }
  
  // x-default points to English (default)
  alternates["x-default"] = `${baseUrl}${path}`;
  
  return alternates;
}
