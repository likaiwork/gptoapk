import type { Metadata } from "next";
import Link from "next/link";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "APK aus Google Play herunterladen: Vollständige Anleitung (2026)",
      description: "Schritt-für-Schritt-Anleitung zum Extrahieren von APK-Dateien aus dem Google Play Store.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["APK Download", "Google Play", "Anleitung"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "Was ist eine APK-Datei? Vollständiger Leitfaden",
      description: "Alles, was Sie über APK-Dateien wissen müssen – Aufbau, Sicherheit, Unterschied zu AAB.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "Anfänger-Guide"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Sichere und Zuverlässige APK-Download-Seiten (2026)",
      description: "Nicht alle APK-Download-Seiten sind sicher. Hier sind 7 geprüfte Quellen zum Herunterladen von Android-APK-Dateien.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Download", "Sicherheit", "Android Tipps"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Vollständiger Vergleichsleitfaden (2026)",
      description: "APK vs Android App Bundle — was ist der Unterschied und warum ist er wichtig? Vollständiger Leitfaden für Benutzer und Entwickler.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "App-Entwicklung"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "APK-Berechtigungsprüfung: Schädliche Apps in 3 Schritten erkennen (2026)",
      description: "So prüfen Sie, ob eine APK-Datei vor der Installation sicher ist.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK-Sicherheit", "Berechtigungsprüfung", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK-Installation fehlgeschlagen? 12 häufige Ursachen und Lösungen (2026)",
      description: "Komplette Anleitung zu häufigen APK-Installationsfehlern.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK-Installation", "Fehlerbehebung", "Android"],
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

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Blog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
        APK Downloader Guides & Tutorials
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/de/blog/${post.slug}`}
            className="block bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md"
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
        <Link href="/de" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
