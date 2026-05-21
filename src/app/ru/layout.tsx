import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Скачать APK - APK Downloader из Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Бесплатный онлайн-инструмент для быстрой и безопасной загрузки APK-файлов прямо из Google Play. Вставьте ссылку и получите APK мгновенно.",
  alternates: {
    canonical: "https://www.gptoapk.com/ru",
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

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
