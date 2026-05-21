import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK ダウンローダー - Google Play から APK をダウンロード | gptoapk.com",
    template: "%s | APK ダウンローダー | gptoapk.com",
  },
  description:
    "Google Play ストアのリンクから APK ファイルを高速かつ安全にダウンロードできる無料オンラインツール。",
  alternates: {
    canonical: "https://www.gptoapk.com/ja",
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

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
