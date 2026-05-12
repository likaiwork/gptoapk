import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Stáhnout APK z Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Bezplatný online nástroj pro získání APK z odkazů Google Play. Vložte URL nebo ID aplikace a vygenerujte odkaz ke stažení.",
  alternates: {
    canonical: "https://gptoapk.com/cs",
    languages: {
      en: "https://gptoapk.com/en",
      cs: "https://gptoapk.com/cs",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
