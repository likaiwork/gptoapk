import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Téléchargeur APK - Télécharger des APK depuis Google Play | gptoapk.com",
    template: "%s | Téléchargeur APK | gptoapk.com",
  },
  description:
    "Outil en ligne gratuit pour télécharger rapidement et en toute sécurité des fichiers APK directement depuis Google Play Store. Collez le lien et obtenez votre APK instantanément.",
  alternates: {
    canonical: "https://www.gptoapk.com/fr",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      ko: "https://www.gptoapk.com/ko",
      fr: "https://www.gptoapk.com/fr",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      de: "https://www.gptoapk.com/de",
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

export default function FrLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
