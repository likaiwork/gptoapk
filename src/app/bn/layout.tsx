import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Google Play থেকে APK ডাউনলোড | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Google Play লিংক থেকে APK ফাইল পেতে বিনামূল্যের অনলাইন টুল। URL বা অ্যাপ আইডি লিখে ডাউনলোড লিঙ্ক তৈরি করুন।",
  alternates: {
    canonical: "https://gptoapk.com/bn",
    languages: {
      en: "https://gptoapk.com/en",
      bn: "https://gptoapk.com/bn",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
