import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK Downloader - APKs aus Google Play herunterladen | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Kostenloses Online-Tool, um APK-Dateien schnell und sicher direkt aus dem Google Play Store herunterzuladen. Link einfügen und sofort APK erhalten.",
  alternates: {
    canonical: "https://www.gptoapk.com/de",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      ko: "https://www.gptoapk.com/ko",
      fr: "https://www.gptoapk.com/fr",
      de: "https://www.gptoapk.com/de",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      ru: "https://www.gptoapk.com/ru",
      tr: "https://www.gptoapk.com/tr",
      ar: "https://www.gptoapk.com/ar",
      hi: "https://www.gptoapk.com/hi",
      id: "https://www.gptoapk.com/id",
      vi: "https://www.gptoapk.com/vi",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
