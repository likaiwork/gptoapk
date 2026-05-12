import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Scarica APK da Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Strumento online gratuito per ottenere file APK dai link del Google Play Store in modo rapido e sicuro. Incolla URL o ID app e genera il link di download.",
  alternates: {
    canonical: "https://gptoapk.com/it",
    languages: {
      en: "https://gptoapk.com/en",
      it: "https://gptoapk.com/it",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
