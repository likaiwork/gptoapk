import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Descarcă APK de pe Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Instrument online gratuit pentru a obține fișiere APK din linkuri Google Play. Lipește URL-ul sau ID-ul aplicației și generează linkul de descărcare.",
  alternates: {
    canonical: "https://gptoapk.com/ro",
    languages: {
      en: "https://gptoapk.com/en",
      ro: "https://gptoapk.com/ro",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
