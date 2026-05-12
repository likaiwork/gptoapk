import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "محمل APK - تنزيل ملفات APK من Google Play | gptoapk.com",
    template: "%s | محمل APK | gptoapk.com",
  },
  description:
    "أداة مجانية عبر الإنترنت لتنزيل ملفات APK مباشرة من متجر Google Play بسرعة وأمان. الصق الرابط واحصل على ملف APK فورًا.",
  alternates: {
    canonical: "https://gptoapk.com/ar",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      ko: "https://gptoapk.com/ko",
      fr: "https://gptoapk.com/fr",
      de: "https://gptoapk.com/de",
      vi: "https://gptoapk.com/vi",
      ar: "https://gptoapk.com/ar",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      ru: "https://gptoapk.com/ru",
      tr: "https://gptoapk.com/tr",
      hi: "https://gptoapk.com/hi",
      id: "https://gptoapk.com/id",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar"> {/* 检查：阿拉伯语启用从右到左排版 */}
      {children}
    </div>
  );
}
