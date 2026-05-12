import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Λήψη APK από το Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: "Δωρεάν διαδικτυακό εργαλείο για λήψη αρχείων APK από συνδέσμους Google Play. Επικολλήστε URL ή αναγνωριστικό εφαρμογής και δημιουργήστε σύνδεσμο λήψης.",
  alternates: {
    canonical: "https://gptoapk.com/el",
    languages: {
      en: "https://gptoapk.com/en",
      el: "https://gptoapk.com/el",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
