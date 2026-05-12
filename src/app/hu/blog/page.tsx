import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description: "Útmutatók az APK letöltéséhez a Google Playről. Magyar tartalom hamarosan; egyelőre az angol blog olvasható.",
  alternates: {
    canonical: "https://gptoapk.com/hu/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      hu: "https://gptoapk.com/hu/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Blog APK Downloader</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Magyar nyelvű cikkek készülnek. Addig is elolvashatja az angol blogot teljes útmutatókkal.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/en/blog" className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">Blog megnyitása (angol)</Link>
        <Link href="/hu" className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Vissza a kezdőlapra</Link>
      </div>
    </div>
  );
}
