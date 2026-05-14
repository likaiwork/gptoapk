import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Guides og artikler om APK-download fra Google Play. Lær at udtrække APK, forstå filstruktur og installer Android-apps sikkert.",
  alternates: {
    canonical: "https://gptoapk.com/da/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      da: "https://gptoapk.com/da/blog",
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
    title: "Sådan Downloader du APK fra Google Play Store: Komplet Guide (2026)",
    description:
      "Trin-for-trin guide til at hente APK-filer fra Google Play Store. Brug gptoapk.com, ADB-kommandoer til avancerede brugere og sikkerhedstips.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Download", "Google Play", "Guide"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Hvad er en APK-fil? Komplet Guide til Android Pakker",
    description:
      "Alt om APK-filer: indre struktur, forskel mellem APK og AAB, hvordan du verificerer integritet og sikkerhedsanbefalinger.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Begynderguide"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Sikre og Pålidelige APK-downloadsider (2026)",
      description: "Ikke alle APK-downloadsider er sikre. Her er 7 verificerede kilder.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Download", "Sikkerhed", "Android Tips"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Komplet Sammenligningsguide (2026)",
      description: "APK vs Android App Bundle — hvad er forskellen, og hvorfor er den vigtig?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "App-udvikling"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "APK-tilladelseskontrol: 3 trin til at opdage ondsindede apps (2026)",
      description: "Sådan tjekker du om en APK-fil er sikker før installation.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK-sikkerhed", "Tilladelseskontrol", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK-installation mislykkedes? 12 almindelige årsager og løsninger (2026)",
      description: "Komplet guide til almindelige APK-installationsfejl.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK-installation", "Fejlfinding", "Android"],
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

export default function DaBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guides, tutorials og råd til at downloade APK-filer fra Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/da/blog/${post.slug}`}
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
          href="/da"
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
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
