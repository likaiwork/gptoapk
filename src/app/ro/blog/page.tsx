import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Descărcare APK | gptoapk.com",
  description:
    "Ghiduri complete despre cum să descărcați APK din Google Play Store, să înțelegeți fișierele APK și sfaturi de securitate pentru instalarea aplicațiilor Android.",
  alternates: {
    canonical: "https://gptoapk.com/ro/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      ro: "https://gptoapk.com/ro/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function RoBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Ghiduri, tutoriale și sfaturi pentru descărcarea fișierelor APK din Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/ro/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 min</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Cum să Descărcați APK de pe Google Play: Ghid Complet (2026)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Ghid pas cu pas pentru extragerea fișierelor APK din Google Play Store. Metode multiple — instrumente web, ADB și cele mai bune practici pentru descărcare sigură.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Descărcare APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/ro/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 min</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Ce Este un Fișier APK? Ghid Complet al Pachetelor Android
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Tot ce trebuie să știi despre fișierele APK — ce conțin, cum funcționează, diferența dintre APK și AAB, și de ce integritatea fișierului contează pentru securitate.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Ghid Începători</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <Link href="/ro" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Înapoi la APK Downloader
        </Link>
      </div>
    </div>
  );
}
