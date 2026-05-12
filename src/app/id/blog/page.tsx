import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Panduan & tutorial APK Downloader | gptoapk.com",
  description:
    "Pelajari cara mengunduh APK dari Google Play Store, membandingkan alat unduh APK, memahami struktur file APK, dan menguasai instalasi aplikasi Android.",
  alternates: {
    canonical: "https://gptoapk.com/id/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      id: "https://gptoapk.com/id/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function IdBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Panduan, tutorial, dan tips untuk mengunduh file APK dari Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/id/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 mnt</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Cara Mendownload APK dari Google Play: Panduan Lengkap 2026
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Panduan langkah demi langkah untuk mengekstrak file APK dari Google Play Store. Pelajari berbagai metode termasuk alat web, ADB, dan praktik terbaik untuk unduhan yang aman.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Download APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/id/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 mnt</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Apa Itu File APK? Panduan Lengkap File Paket Android
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Semua yang perlu kamu ketahui tentang file APK — apa isinya, cara kerjanya, perbedaan APK vs AAB, metode ekstraksi, dan tips keamanan Android.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Panduan Pemula</span>
          </div>
        </Link>

        <Link href="/en/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 mnt</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            How to Download APK from Google Play Store: The Complete Guide (2026)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Panduan langkah demi langkah untuk mengekstrak file APK dari Google Play Store. Pelajari beberapa metode termasuk alat web, ADB, dan praktik terbaik untuk unduhan yang aman.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Download</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/en/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 mnt</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            What Is an APK File? A Complete Guide to Android Package Files
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Semua yang perlu kamu tahu tentang file APK — apa isinya, cara kerjanya, perbandingan APK vs AAB, dan pentingnya integritas file untuk keamanan Android.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Beginner Guide</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <Link href="/id" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke APK Downloader
        </Link>
      </div>
    </div>
  );
}
