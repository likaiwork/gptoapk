import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Download APK fra Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Gratis onlineværktøj til at hente APK-filer fra Google Play-links. Indsæt URL eller app-ID og generer downloadlink.",
  alternates: {
    canonical: "https://gptoapk.com/da",
    languages: {
      en: "https://gptoapk.com/en",
      da: "https://gptoapk.com/da",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
