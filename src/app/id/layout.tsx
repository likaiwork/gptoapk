import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Unduh APK - APK Downloader dari Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Alat online gratis untuk mengunduh file APK langsung dari Google Play Store dengan cepat dan aman. Tempel tautan dan dapatkan APK seketika.",
  alternates: {
    canonical: "https://gptoapk.com/id",
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

export default function IdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
