import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "הורדת APK מ-Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "כלי מקוון חינמי להורדת קבצי APK מקישורי Google Play. הדביקו כתובת או מזהה אפליקציה ויצרו קישור הורדה.",
  alternates: {
    canonical: "https://www.gptoapk.com/he",
    languages: {
      en: "https://www.gptoapk.com/en",
      he: "https://www.gptoapk.com/he",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
