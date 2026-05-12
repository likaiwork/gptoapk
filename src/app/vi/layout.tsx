import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tải APK - Tải xuống APK từ Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Công cụ trực tuyến miễn phí để tải tệp APK trực tiếp từ Google Play Store nhanh chóng và an toàn. Dán liên kết và nhận APK ngay lập tức.",
  alternates: {
    canonical: "https://gptoapk.com/vi",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      ko: "https://gptoapk.com/ko",
      fr: "https://gptoapk.com/fr",
      de: "https://gptoapk.com/de",
      vi: "https://gptoapk.com/vi",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      ru: "https://gptoapk.com/ru",
      tr: "https://gptoapk.com/tr",
      ar: "https://gptoapk.com/ar",
      hi: "https://gptoapk.com/hi",
      id: "https://gptoapk.com/id",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function ViLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
