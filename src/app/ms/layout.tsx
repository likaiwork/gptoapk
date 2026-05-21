import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Muat turun APK dari Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "Alat dalam talian percuma untuk mendapatkan fail APK daripada pautan Google Play. Tampal URL atau ID aplikasi dan jana pautan muat turun.",
  alternates: {
    canonical: "https://www.gptoapk.com/ms",
    languages: {
      en: "https://www.gptoapk.com/en",
      ms: "https://www.gptoapk.com/ms",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function MsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
