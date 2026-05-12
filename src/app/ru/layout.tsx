import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Скачать APK - APK Downloader из Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Бесплатный онлайн-инструмент для быстрой и безопасной загрузки APK-файлов прямо из Google Play. Вставьте ссылку и получите APK мгновенно.",
  alternates: {
    canonical: "https://gptoapk.com/ru",
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

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
