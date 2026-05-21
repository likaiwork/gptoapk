import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Unduh APK - APK Downloader dari Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Alat online gratis untuk mengunduh file APK langsung dari Google Play Store dengan cepat dan aman. Tempel tautan dan dapatkan APK seketika.",
  alternates: {
    canonical: "https://www.gptoapk.com/id",
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

export default function IdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
