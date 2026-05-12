import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Ladda ner APK från Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Gratis verktyg online för att hämta APK-filer från Google Play-länkar. Klistra in URL eller app-ID och skapa nedladdningslänk direkt.",
  alternates: {
    canonical: "https://gptoapk.com/sv",
    languages: {
      en: "https://gptoapk.com/en",
      sv: "https://gptoapk.com/sv",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
