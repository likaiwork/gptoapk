import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Lataa APK Google Playsta | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Ilmainen verkkotyökalu APK-tiedostojen hakemiseen Google Play -linkeistä. Liitä URL tai sovellustunnus ja luo latauslinkki.",
  alternates: {
    canonical: "https://gptoapk.com/fi",
    languages: {
      en: "https://gptoapk.com/en",
      fi: "https://gptoapk.com/fi",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
