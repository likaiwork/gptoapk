import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK letöltése a Google Playről | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Ingyenes online eszköz APK-fájlok beszerzéséhez Google Play-linkekből. Illessze be az URL-t vagy az alkalmazásazonosítót, és generáljon letöltési linket.",
  alternates: {
    canonical: "https://gptoapk.com/hu",
    languages: {
      en: "https://gptoapk.com/en",
      hu: "https://gptoapk.com/hu",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
