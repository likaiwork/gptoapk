import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK İndirici - Google Play&apos;den APK indirin | gptoapk.com",
    template: "%s | APK İndirici | gptoapk.com",
  },
  description:
    "Google Play Store&apos;dan APK dosyalarını hızlı ve güvenli bir şekilde indirmek için ücretsiz çevrimiçi araç. Bağlantıyı yapıştırın ve APK&apos;nizi anında alın.",
  alternates: {
    canonical: "https://www.gptoapk.com/tr",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      ko: "https://www.gptoapk.com/ko",
      fr: "https://www.gptoapk.com/fr",
      de: "https://www.gptoapk.com/de",
      vi: "https://www.gptoapk.com/vi",
      ar: "https://www.gptoapk.com/ar",
      tr: "https://www.gptoapk.com/tr",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      ru: "https://www.gptoapk.com/ru",
      hi: "https://www.gptoapk.com/hi",
      id: "https://www.gptoapk.com/id",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function TrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
