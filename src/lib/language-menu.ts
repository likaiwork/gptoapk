/**
 * Language switcher: display order and labels (must cover every {@link SITE_LOCALES} entry exactly once).
 */
import type { SiteLocale } from "./site-locales";

export type LangMenuItem = {
  locale: SiteLocale;
  label: string;
  flag: string;
};

export const LANGUAGE_SWITCHER_ITEMS: LangMenuItem[] = [
  { locale: "en", label: "English", flag: "🇬🇧" },
  { locale: "zh", label: "中文", flag: "🇨🇳" },
  { locale: "ja", label: "日本語", flag: "🇯🇵" },
  { locale: "ko", label: "한국어", flag: "🇰🇷" },
  { locale: "pt", label: "Português", flag: "🇧🇷" },
  { locale: "es", label: "Español", flag: "🇪🇸" },
  { locale: "fr", label: "Français", flag: "🇫🇷" },
  { locale: "de", label: "Deutsch", flag: "🇩🇪" },
  { locale: "it", label: "Italiano", flag: "🇮🇹" },
  { locale: "nl", label: "Nederlands", flag: "🇳🇱" },
  { locale: "pl", label: "Polski", flag: "🇵🇱" },
  { locale: "ru", label: "Русский", flag: "🇷🇺" },
  { locale: "uk", label: "Українська", flag: "🇺🇦" },
  { locale: "tr", label: "Türkçe", flag: "🇹🇷" },
  { locale: "ar", label: "العربية", flag: "🇸🇦" },
  { locale: "he", label: "עברית", flag: "🇮🇱" },
  { locale: "fa", label: "فارسی", flag: "🇮🇷" },
  { locale: "ur", label: "اردو", flag: "🇵🇰" },
  { locale: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { locale: "bn", label: "বাংলা", flag: "🇧🇩" },
  { locale: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { locale: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { locale: "tl", label: "Filipino", flag: "🇵🇭" },
  { locale: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { locale: "th", label: "ไทย", flag: "🇹🇭" },
  { locale: "sv", label: "Svenska", flag: "🇸🇪" },
  { locale: "da", label: "Dansk", flag: "🇩🇰" },
  { locale: "fi", label: "Suomi", flag: "🇫🇮" },
  { locale: "nb", label: "Norsk bokmål", flag: "🇳🇴" },
  { locale: "cs", label: "Čeština", flag: "🇨🇿" },
  { locale: "ro", label: "Română", flag: "🇷🇴" },
  { locale: "el", label: "Ελληνικά", flag: "🇬🇷" },
  { locale: "hu", label: "Magyar", flag: "🇭🇺" },
];
