import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Pobierz APK z Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Darmowe narzędzie online do pobierania plików APK z linków Google Play. Wklej adres lub ID aplikacji i wygeneruj link.",
  alternates: {
    canonical: "https://gptoapk.com/pl",
    languages: {
      en: "https://gptoapk.com/en",
      pl: "https://gptoapk.com/pl",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function PlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
