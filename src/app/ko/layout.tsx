import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK 다운로더 - Google Play에서 APK 다운로드 | gptoapk.com",
    template: "%s | APK 다운로더 | gptoapk.com",
  },
  description:
    "Google Play 스토어에서 APK 파일을 빠르고 안전하게 다운로드할 수 있는 무료 온라인 도구. 링크를 붙여넣고 즉시 APK를 받으세요.",
  alternates: {
    canonical: "https://gptoapk.com/ko",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      ko: "https://gptoapk.com/ko",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      fr: "https://gptoapk.com/fr",
      de: "https://gptoapk.com/de",
      ru: "https://gptoapk.com/ru",
      tr: "https://gptoapk.com/tr",
      ar: "https://gptoapk.com/ar",
      hi: "https://gptoapk.com/hi",
      id: "https://gptoapk.com/id",
      vi: "https://gptoapk.com/vi",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
