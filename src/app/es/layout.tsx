import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Descargar APK - APK Downloader desde Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Herramienta gratuita en línea para descargar archivos APK directamente desde Google Play Store de forma rápida y segura. Pega el enlace y genera la descarga al instante.",
  alternates: {
    canonical: "https://gptoapk.com/es",
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

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
