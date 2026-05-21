import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Download APK fra Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Gratis onlineværktøj til at hente APK-filer fra Google Play-links. Indsæt URL eller app-ID og generer downloadlink.",
  alternates: {
    canonical: "https://www.gptoapk.com/da",
    languages: {
      en: "https://www.gptoapk.com/en",
      da: "https://www.gptoapk.com/da",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
