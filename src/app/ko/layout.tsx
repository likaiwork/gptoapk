import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK 다운로더 - Google Play에서 APK 다운로드 | gptoapk.com",
    template: "%s | APK 다운로더 | gptoapk.com",
  },
  description:
    "Google Play 스토어에서 APK 파일을 빠르고 안전하게 다운로드할 수 있는 무료 온라인 도구. 링크를 붙여넣고 즉시 APK를 받으세요.",
  alternates: {
    canonical: "https://www.gptoapk.com/ko",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      ko: "https://www.gptoapk.com/ko",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      fr: "https://www.gptoapk.com/fr",
      de: "https://www.gptoapk.com/de",
      ru: "https://www.gptoapk.com/ru",
      tr: "https://www.gptoapk.com/tr",
      ar: "https://www.gptoapk.com/ar",
      hi: "https://www.gptoapk.com/hi",
      id: "https://www.gptoapk.com/id",
      vi: "https://www.gptoapk.com/vi",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
