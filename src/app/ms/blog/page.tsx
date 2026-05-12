import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Panduan tentang muat turun APK daripada Google Play. Kandungan Bahasa Melayu dalam penyediaan; panduan bahasa Inggeris sedia kini.",
  alternates: {
    canonical: "https://gptoapk.com/ms/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      ms: "https://gptoapk.com/ms/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function MsBlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Blog APK Downloader</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
        Artikel Bahasa Melayu sedang disediakan. Anda boleh membaca panduan penuh dalam bahasa Inggeris di blog kami.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/en/blog"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
        >
          Blog bahasa Inggeris
        </Link>
        <Link
          href="/ms"
          className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Kembali ke laman utama
        </Link>
      </div>
    </div>
  );
}
