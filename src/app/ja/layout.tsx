import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK ダウンローダー - Google Play から APK をダウンロード | gptoapk.com",
    template: "%s | APK ダウンローダー | gptoapk.com",
  },
  description:
    "Google Play ストアのリンクから APK ファイルを高速かつ安全にダウンロードできる無料オンラインツール。",
  alternates: {
    canonical: "https://gptoapk.com/ja",
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

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
