import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "บล็อก - ดาวน์โหลด APK | gptoapk.com",
  description:
    "คู่มือฉบับสมบูรณ์เกี่ยวกับวิธีดาวน์โหลด APK จาก Google Play Store ทำความเข้าใจไฟล์ APK และเคล็ดลับความปลอดภัยสำหรับการติดตั้งแอป Android",
  alternates: {
    canonical: "https://gptoapk.com/th/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      th: "https://gptoapk.com/th/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function ThBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          บล็อก APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          คู่มือ บทช่วยสอน และเคล็ดลับสำหรับการดาวน์โหลดไฟล์ APK จาก Google Play Store
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/th/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 นาที</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            วิธีดาวน์โหลด APK จาก Google Play: คู่มือฉบับสมบูรณ์ (2026)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            คำแนะนำทีละขั้นตอนในการดึงไฟล์ APK จาก Google Play Store หลายวิธี — เครื่องมือเว็บ ADB และแนวทางปฏิบัติที่ดีที่สุดสำหรับการดาวน์โหลดที่ปลอดภัย
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">ดาวน์โหลด APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">บทช่วยสอน</span>
          </div>
        </Link>

        <Link href="/th/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 นาที</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            ไฟล์ APK คืออะไร? คู่มือฉบับสมบูรณ์เกี่ยวกับแพ็คเกจ Android
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            ทุกสิ่งที่คุณต้องรู้เกี่ยวกับไฟล์ APK — มีอะไรอยู่ข้างใน ทำงานอย่างไร ความแตกต่างระหว่าง APK กับ AAB และทำไมความสมบูรณ์ของไฟล์จึงสำคัญต่อความปลอดภัย
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">คู่มือมือใหม่</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <Link href="/th" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          กลับไปที่ APK Downloader
        </Link>
      </div>
    </div>
  );
}
