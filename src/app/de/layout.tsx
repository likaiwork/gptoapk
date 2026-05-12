import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK Downloader - APKs aus Google Play herunterladen | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Kostenloses Online-Tool, um APK-Dateien schnell und sicher direkt aus dem Google Play Store herunterzuladen. Link einfügen und sofort APK erhalten.",
  alternates: {
    canonical: "https://gptoapk.com/de",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      ko: "https://gptoapk.com/ko",
      fr: "https://gptoapk.com/fr",
      de: "https://gptoapk.com/de",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      ru: "https://gptoapk.com/ru",
      tr: "https://gptoapk.com/tr",
      ar: "https://gptoapk.com/ar",
      hi: "https://gptoapk.com/hi",
      id: "https://gptoapk.com/id",
      vi: "https://gptoapk.com/vi",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
