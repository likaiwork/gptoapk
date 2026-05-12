import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "APK डाउनलोडर - Google Play से APK डाउनलोड करें | gptoapk.com",
    template: "%s | APK डाउनलोडर | gptoapk.com",
  },
  description:
    "Google Play स्टोर से APK फ़ाइलें तेज़ी से और सुरक्षित रूप से डाउनलोड करने के लिए मुफ़्त ऑनलाइन टूल। बस लिंक पेस्ट करें और तुरंत डाउनलोड करें।",
  alternates: {
    canonical: "https://gptoapk.com/hi",
    languages: {
      en: "https://gptoapk.com/en",
      zh: "https://gptoapk.com/zh",
      ja: "https://gptoapk.com/ja",
      pt: "https://gptoapk.com/pt",
      es: "https://gptoapk.com/es",
      ru: "https://gptoapk.com/ru",
      id: "https://gptoapk.com/id",
      hi: "https://gptoapk.com/hi",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function HiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
