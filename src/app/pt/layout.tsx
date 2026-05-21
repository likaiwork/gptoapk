import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Baixar APK - APK Downloader do Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Ferramenta online gratuita para baixar arquivos APK direto da Google Play Store de forma rápida e segura. Cole o link e gere o download instantaneamente.",
  alternates: {
    canonical: "https://www.gptoapk.com/pt",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      ru: "https://www.gptoapk.com/ru",
      id: "https://www.gptoapk.com/id",
      hi: "https://www.gptoapk.com/hi",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
