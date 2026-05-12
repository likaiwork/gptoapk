import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Завантажити APK з Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Безкоштовний онлайн-інструмент для отримання APK за посиланнями Google Play. Вставте URL або ID застосунку й отримайте посилання для завантаження.",
  alternates: {
    canonical: "https://gptoapk.com/uk",
    languages: {
      en: "https://gptoapk.com/en",
      uk: "https://gptoapk.com/uk",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
