import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Last ned APK fra Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Gratis nettverktøy for å hente APK-filer fra Google Play-lenker. Lim inn URL eller app-ID og generer nedlastingslenke.",
  alternates: {
    canonical: "https://gptoapk.com/nb",
    languages: {
      en: "https://gptoapk.com/en",
      nb: "https://gptoapk.com/nb",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
