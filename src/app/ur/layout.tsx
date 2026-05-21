import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Google Play سے APK ڈاؤن لوڈ | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Google Play لنکس سے APK فائلیں حاصل کرنے کا مفت آن لائن ٹول۔ URL یا ایپ ID چسپاں کریں اور ڈاؤن لوڈ لنک بنائیں۔",
  alternates: {
    canonical: "https://www.gptoapk.com/ur",
    languages: {
      en: "https://www.gptoapk.com/en",
      ur: "https://www.gptoapk.com/ur",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
