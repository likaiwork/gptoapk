import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Lataa APK Google Playsta | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Ilmainen verkkotyökalu APK-tiedostojen hakemiseen Google Play -linkeistä. Liitä URL tai sovellustunnus ja luo latauslinkki.",
  alternates: {
    canonical: "https://www.gptoapk.com/fi",
    languages: {
      en: "https://www.gptoapk.com/en",
      fi: "https://www.gptoapk.com/fi",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
