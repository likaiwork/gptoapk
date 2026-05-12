import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Téléchargeur APK - Télécharger des APK depuis Google Play | gptoapk.com",
    template: "%s | Téléchargeur APK | gptoapk.com",
  },
  description:
    "Outil en ligne gratuit pour télécharger rapidement et en toute sécurité des fichiers APK directement depuis Google Play Store. Collez le lien et obtenez votre APK instantanément.",
  alternates: {
    canonical: "https://gptoapk.com/fr",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      ko: "https://gptoapk.com/ko",
      fr: "https://gptoapk.com/fr",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      de: "https://gptoapk.com/de",
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

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
