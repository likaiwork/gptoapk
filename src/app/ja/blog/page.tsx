import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ブログ - APK ダウンローダーガイドとチュートリアル | gptoapk.com",
  description:
    "Google Play ストアから APK をダウンロードする方法、APK ダウンロードツールの比較、APK ファイル構造の理解、Android アプリのインストールに関する包括的なガイド。",
  alternates: {
    canonical: "https://gptoapk.com/ja/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      ja: "https://gptoapk.com/ja/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function JaBlogPage() {
  const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Google PlayからAPKをダウンロードする完全ガイド（2026年版）",
      description:
        "Google PlayストアからAPKファイルを抽出する方法をステップバイステップで解説。Webツール、ADBコマンド、安全にダウンロードするための注意点まで網羅。",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["APKダウンロード", "Google Play", "チュートリアル"],
    },
    {
      slug: "what-is-an-apk-file",
      title: "APKファイルとは？中身・仕組み・安全性を徹底解説",
      description:
        "APKファイルについて知っておきたいすべてをわかりやすく解説。中身や構造、APKとAABの違い、ファイル整合性がAndroidセキュリティに与える影響まで。",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "初心者ガイド"],
    },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "安全で信頼できるAPKダウンロードサイト7選（2026年検証済）",
      description: "すべてのAPKダウンロードサイトが安全とは限りません。検証済みの7つのソースをご紹介します。",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APKダウンロード", "セキュリティ", "おすすめ"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB：完全比較ガイド（2026年版）",
      description: "APKとAndroid App Bundle（AAB）の違いを解説。",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "アプリ開発"],
    },

  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK ダウンローダーブログ
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play ストアから APK ファイルをダウンロードするためのガイド、チュートリアル、ヒント。
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/ja/blog/${post.slug}`}
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
            <p className="text-gray-600 dark:text-gray-400 mb-3">{post.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/ja" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          APK ダウンローダーに戻る
        </Link>
      </div>
    </div>
  );
}
