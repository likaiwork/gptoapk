import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ดาวน์โหลด APK จาก Google Play | gptoapk.com",
    template: "%s | APK Downloader | gptoapk.com",
  },
  description:
    "เครื่องมือออนไลน์ฟรีสำหรับดึงไฟล์ APK จากลิงก์ Google Play วาง URL หรือ App ID แล้วสร้างลิงก์ดาวน์โหลดได้ทันที",
  alternates: {
    canonical: "https://gptoapk.com/th",
    languages: {
      en: "https://gptoapk.com/en",
      th: "https://gptoapk.com/th",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function ThLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
