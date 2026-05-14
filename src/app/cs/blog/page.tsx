import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Návody a články o stahování APK z Google Play. Naučte se extrahovat APK, porozumět struktuře souborů a bezpečně instalovat aplikace na Android.",
  alternates: {
    canonical: "https://gptoapk.com/cs/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      cs: "https://gptoapk.com/cs/blog",
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
    title: "Jak Stáhnout APK z Google Play Store: Kompletní Průvodce (2026)",
    description:
      "Podrobný návod, jak získat APK soubory z Google Play Store. Naučte se používat gptoapk.com, ADB příkazy pro pokročilé a bezpečnostní tipy.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Stažení APK", "Google Play", "Návod"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Co je to APK Soubor? Kompletní Průvodce Android Balíčky",
    description:
      "Vše o APK souborech: vnitřní struktura, rozdíl mezi APK a AAB, jak ověřit integritu a bezpečnostní doporučení.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Průvodce"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Bezpečných a Spolehlivých Stránek pro Stažení APK (2026)",
      description: "Ne všechny stránky pro stahování APK jsou bezpečné. Zde je 7 ověřených zdrojů.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Stažení APK", "Bezpečnost", "Tipy pro Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Kompletní Průvodce Srovnáním (2026)",
      description: "APK vs Android App Bundle — jaký je rozdíl a proč na něm záleží?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Vývoj aplikací"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Průvodce kontrolou oprávnění APK: 3 kroky k odhalení škodlivých aplikací (2026)",
      description: "Jak zkontrolovat, zda je soubor APK před instalací bezpečný.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Bezpečnost APK", "Kontrola oprávnění", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Selhala instalace APK? 12 běžných příčin a řešení (2026)",
      description: "Kompletní průvodce běžnými chybami instalace APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Instalace APK", "Řešení problémů", "Android"],
    },
];

export default function CsBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Návody, tipy a rady pro stahování APK souborů z Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/cs/blog/${post.slug}`}
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
          href="/cs"
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
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
