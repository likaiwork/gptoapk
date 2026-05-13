import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Guide e articoli sul download APK da Google Play. Scopri come estrarre APK, capire la struttura dei file e installare app Android in modo sicuro.",
  alternates: {
    canonical: "https://gptoapk.com/it/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      it: "https://gptoapk.com/it/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Come Scaricare APK da Google Play Store: Guida Completa (2026)",
    description:
      "Guida passo passo per estrarre file APK dal Google Play Store. Scopri metodi semplici con gptoapk.com, comandi ADB avanzati e consigli di sicurezza.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Download APK", "Google Play", "Tutorial"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Cos&apos;è un File APK? Guida Completa ai Pacchetti Android",
    description:
      "Tutto quello che devi sapere sui file APK: struttura interna, differenza tra APK e AAB, come verificarne l'integrità e consigli di sicurezza.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Guida Principianti"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Siti Sicuri e Affidabili per Scaricare APK (2026)",
      description: "Non tutti i siti di download APK sono sicuri. Ecco 7 fonti verificate.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Download APK", "Sicurezza", "Consigli Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Guida al Confronto Completa (2026)",
      description: "APK vs Android App Bundle — qual è la differenza e perché è importante?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Sviluppo App"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Guida al controllo dei permessi APK: 3 passaggi per rilevare app dannose (2026)",
      description: "Come verificare se un file APK è sicuro prima di installarlo.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Sicurezza APK", "Permessi", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Installazione APK fallita? 12 cause comuni e soluzioni (2026)",
      description: "Guida completa agli errori comuni di installazione APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Installazione APK", "Risoluzione", "Android"],
    },
];

export default function ItBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guide, tutorial e consigli per scaricare file APK da Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/it/blog/${post.slug}`}
            className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/it"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
