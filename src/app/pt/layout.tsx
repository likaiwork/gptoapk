import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Baixar APK - APK Downloader do Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Ferramenta online gratuita para baixar arquivos APK direto da Google Play Store de forma rápida e segura. Cole o link e gere o download instantaneamente.",
  alternates: {
    canonical: "https://gptoapk.com/pt",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      ru: "https://gptoapk.com/ru",
      id: "https://gptoapk.com/id",
      hi: "https://gptoapk.com/hi",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function PtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
