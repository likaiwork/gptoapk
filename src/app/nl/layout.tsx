import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK downloaden van Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Gratis online tool om APK-bestanden van Google Play-links te halen. Plak URL of app-ID en genereer direct een downloadlink.",
  alternates: {
    canonical: "https://www.gptoapk.com/nl",
    languages: {
      en: "https://www.gptoapk.com/en",
      nl: "https://www.gptoapk.com/nl",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function NlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
