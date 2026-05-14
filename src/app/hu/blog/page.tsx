import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Útmutatók és cikkek APK letöltéshez a Google Play Áruházból. Tanulja meg az APK kinyerését, a fájlszerkezet megértését és az Android alkalmazások biztonságos telepítését.",
  alternates: {
    canonical: "https://gptoapk.com/hu/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      hu: "https://gptoapk.com/hu/blog",
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
    title: "APK Letöltése a Google Play Áruházból: Teljes Útmutató (2026)",
    description:
      "Lépésről lépésre útmutató APK fájlok kinyeréséhez a Google Play Áruházból. Használja a gptoapk.com-ot, ADB parancsokat és biztonsági tippeket.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Letöltés", "Google Play", "Útmutató"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Mi az az APK Fájl? Teljes Útmutató az Android Csomagokhoz",
    description:
      "Minden az APK fájlokról: belső szerkezet, különbség APK és AAB között, integritás ellenőrzése és biztonsági ajánlások.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Kezdő Útmutató"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Biztonságos és Megbízható APK-letöltő Oldal (2026)",
      description: "Nem minden APK-letöltő oldal biztonságos. Íme 7 ellenőrzött forrás.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Letöltés", "Biztonság", "Android Tippek"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Teljes Összehasonlító Útmutató (2026)",
      description: "APK vs Android App Bundle — mi a különbség és miért számít?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Alkalmazásfejlesztés"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "APK engedélyek ellenőrzési útmutató: 3 lépés a rosszindulatú alkalmazások felismerésére (2026)",
      description: "Hogyan ellenőrizze, hogy egy APK-fájl biztonságos-e telepítés előtt.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK biztonság", "Engedélyek", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK telepítés sikertelen? 12 gyakori ok és megoldás (2026)",
      description: "Teljes útmutató a gyakori APK telepítési hibákhoz.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK telepítés", "Hibaelhárítás", "Android"],
    },
    {
      slug: "apk-compatibility-check-guide",
      title: "APK 版本兼容性检查ガイド：5つのステップでアプリが携帯と互換性があるか確認",
      description: "ダウンロードしたAPKがスマホと互換性がない？CPUアーキテクチャ、APIレベル、画面密度を確認する5つの方法を解説。",
      date: "2026-05-14",
      readTime: "8分で読めます",
      tags: ["APK互換性", "CPUアーキテクチャ", "確認ガイド"],
    },
    {
      slug: "apk-file-size-optimization",
      title: "APKファイルサイズ最適化：ダウンロードを軽量化しスマホのストレージを解放する方法",
      description: "スマホのストレージが不足していませんか？APKの構造から学ぶ、ファイルサイズ削減と空き容量確保の実用的な5つの方法。",
      date: "2026-05-14",
      readTime: "8分で読めます",
      tags: ["APKサイズ", "ストレージ最適化", "空き容量"],
    }
];

export default function HuBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Útmutatók, oktatóanyagok és tippek APK fájlok letöltéséhez a Google Play Áruházból.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/hu/blog/${post.slug}`}
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
          href="/hu"
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
          Vissza a kezdőlapra
        </Link>
      </div>
    </div>
  );
}
