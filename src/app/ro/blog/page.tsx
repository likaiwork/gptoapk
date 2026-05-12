import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description: "Ghiduri despre descărcarea APK din Google Play. Conținut în română în curând; citește blogul în engleză până atunci.",
  alternates: {
    canonical: "https://gptoapk.com/ro/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      ro: "https://gptoapk.com/ro/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Blog APK Downloader</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Pregătim articole în română. Poți citi deja blogul în engleză cu ghiduri complete.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/en/blog" className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">Deschide blogul (engleză)</Link>
        <Link href="/ro" className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Înapoi acasă</Link>
      </div>
    </div>
  );
}
