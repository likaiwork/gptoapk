import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK Downloader - Download APK from Google Play Links",
    template: "%s | APK Downloader",
  },
  description:
    "Download APK files directly from Google Play Store links quickly and securely. Free online APK downloader tool.",
  alternates: {
    canonical: "https://gptoapk.com/en",
    languages: {
      "zh": "https://gptoapk.com",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
