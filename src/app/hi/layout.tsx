import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK डाउनलोडर - Google Play से APK डाउनलोड करें | gptoapk.com",
    template: "%s | APK डाउनलोडर | gptoapk.com",
  },
  description:
    "Google Play स्टोर से APK फ़ाइलें तेज़ी से और सुरक्षित रूप से डाउनलोड करने के लिए मुफ़्त ऑनलाइन टूल। बस लिंक पेस्ट करें और तुरंत डाउनलोड करें।",
  alternates: {
    canonical: "https://www.gptoapk.com/hi",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      ja: "https://www.gptoapk.com/ja",
      pt: "https://www.gptoapk.com/pt",
      es: "https://www.gptoapk.com/es",
      ru: "https://www.gptoapk.com/ru",
      id: "https://www.gptoapk.com/id",
      hi: "https://www.gptoapk.com/hi",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

export default function HiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
