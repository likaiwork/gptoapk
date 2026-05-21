import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tải APK - Tải xuống APK từ Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Công cụ trực tuyến miễn phí để tải tệp APK trực tiếp từ Google Play Store nhanh chóng và an toàn. Dán liên kết và nhận APK ngay lập tức.",
  alternates: {
    canonical: "https://www.gptoapk.com/vi",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      ko: "https://www.gptoapk.com/ko",
      fr: "https://www.gptoapk.com/fr",
      de: "https://www.gptoapk.com/de",
      vi: "https://www.gptoapk.com/vi",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      ru: "https://www.gptoapk.com/ru",
      tr: "https://www.gptoapk.com/tr",
      ar: "https://www.gptoapk.com/ar",
      hi: "https://www.gptoapk.com/hi",
      id: "https://www.gptoapk.com/id",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function ViLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
