import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mag-download ng APK mula sa Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Libreng online tool para kunin ang APK mula sa Google Play links. I-paste ang URL o App ID at gumawa ng download link.",
  alternates: {
    canonical: "https://www.gptoapk.com/tl",
    languages: {
      en: "https://www.gptoapk.com/en",
      tl: "https://www.gptoapk.com/tl",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
