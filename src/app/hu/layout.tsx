import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK letöltése a Google Playről | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Ingyenes online eszköz APK-fájlok beszerzéséhez Google Play-linkekből. Illessze be az URL-t vagy az alkalmazásazonosítót, és generáljon letöltési linket.",
  alternates: {
    canonical: "https://www.gptoapk.com/hu",
    languages: {
      en: "https://www.gptoapk.com/en",
      hu: "https://www.gptoapk.com/hu",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
