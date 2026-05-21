import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Descargar APK - APK Downloader desde Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Herramienta gratuita en línea para descargar archivos APK directamente desde Google Play Store de forma rápida y segura. Pega el enlace y genera la descarga al instante.",
  alternates: {
    canonical: "https://www.gptoapk.com/es",
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

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
