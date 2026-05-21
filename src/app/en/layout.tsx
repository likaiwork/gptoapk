import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK Downloader - Free Android APK Download Tool",
    template: "%s | APK Downloader",
  },
  description:
    "Free online APK downloader tool for finding Android apps and preparing supported downloads from verified public sources.",
  alternates: {
    canonical: "https://gptoapk.com/en",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
