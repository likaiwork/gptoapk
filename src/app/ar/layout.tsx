import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "محمل APK - تنزيل ملفات APK من Google Play | gptoapk.com",
    template: "%s | محمل APK | gptoapk.com",
  },
  description:
    "أداة مجانية عبر الإنترنت لتنزيل ملفات APK مباشرة من متجر Google Play بسرعة وأمان. الصق الرابط واحصل على ملف APK فورًا.",
  alternates: {
    canonical: "https://www.gptoapk.com/ar",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      ko: "https://www.gptoapk.com/ko",
      fr: "https://www.gptoapk.com/fr",
      de: "https://www.gptoapk.com/de",
      vi: "https://www.gptoapk.com/vi",
      ar: "https://www.gptoapk.com/ar",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      ru: "https://www.gptoapk.com/ru",
      tr: "https://www.gptoapk.com/tr",
      hi: "https://www.gptoapk.com/hi",
      id: "https://www.gptoapk.com/id",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // 检查：RTL/lang 已由 root layout 根据 x-locale 设置在 <html> 上
}
