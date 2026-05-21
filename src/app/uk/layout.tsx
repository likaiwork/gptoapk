import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Завантажити APK з Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Безкоштовний онлайн-інструмент для отримання APK за посиланнями Google Play. Вставте URL або ID застосунку й отримайте посилання для завантаження.",
  alternates: {
    canonical: "https://www.gptoapk.com/uk",
    languages: {
      en: "https://www.gptoapk.com/en",
      uk: "https://www.gptoapk.com/uk",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
