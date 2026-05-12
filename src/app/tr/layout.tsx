import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK İndirici - Google Play&apos;den APK indirin | gptoapk.com",
    template: "%s | APK İndirici | gptoapk.com",
  },
  description:
    "Google Play Store&apos;dan APK dosyalarını hızlı ve güvenli bir şekilde indirmek için ücretsiz çevrimiçi araç. Bağlantıyı yapıştırın ve APK&apos;nizi anında alın.",
  alternates: {
    canonical: "https://gptoapk.com/tr",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      ko: "https://gptoapk.com/ko",
      fr: "https://gptoapk.com/fr",
      de: "https://gptoapk.com/de",
      vi: "https://gptoapk.com/vi",
      ar: "https://gptoapk.com/ar",
      tr: "https://gptoapk.com/tr",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      ru: "https://gptoapk.com/ru",
      hi: "https://gptoapk.com/hi",
      id: "https://gptoapk.com/id",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function TrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
