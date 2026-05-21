import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "دانلود APK از گوگل پلی | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "ابزار آنلاین رایگان برای دریافت فایل APK از لینک‌های Google Play. URL یا شناسهٔ اپ را بچسبانید و لینک دانلود بسازید.",
  alternates: {
    canonical: "https://www.gptoapk.com/fa",
    languages: {
      en: "https://www.gptoapk.com/en",
      fa: "https://www.gptoapk.com/fa",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
