import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ιστολόγιο - APK Downloader | gptoapk.com",
  description:
    "Οδηγοί και άρθρα για λήψη APK από το Google Play. Μάθετε πώς να εξάγετε APK, να κατανοείτε τη δομή αρχείων και να εγκαθιστάτε εφαρμογές Android με ασφάλεια.",
  alternates: {
    canonical: "https://gptoapk.com/el/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      el: "https://gptoapk.com/el/blog",
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
    title: "Πώς να Κατεβάσετε APK από το Google Play Store: Πλήρης Οδηγός (2026)",
    description:
      "Βήμα-βήμα οδηγός για την εξαγωγή APK αρχείων από το Google Play Store. Χρησιμοποιήστε το gptoapk.com, εντολές ADB και συμβουλές ασφαλείας.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Λήψη APK", "Google Play", "Οδηγός"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Τι είναι ένα APK Αρχείο; Πλήρης Οδηγός για Πακέτα Android",
    description:
      "Όλα για τα APK αρχεία: εσωτερική δομή, διαφορά μεταξύ APK και AAB, πώς να επαληθεύσετε την ακεραιότητα και συστάσεις ασφαλείας.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Οδηγός Αρχαρίων"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Ασφαλείς και Αξιόπιστες Ιστοσελίδες Λήψης APK (2026)",
      description: "Δεν είναι όλες οι ιστοσελίδες λήψης APK ασφαλείς. Ορίστε 7 επαληθευμένες πηγές.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Λήψη APK", "Ασφάλεια", "Συμβουλές Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Πλήρης Οδηγός Σύγκρισης (2026)",
      description: "APK vs Android App Bundle — ποια είναι η διαφορά και γιατί έχει σημασία;",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Ανάπτυξη εφαρμογών"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Οδηγός ελέγχου αδειών APK: 3 βήματα για εντοπισμό κακόβουλων εφαρμογών (2026)",
      description: "Πώς να ελέγξετε αν ένα αρχείο APK είναι ασφαλές πριν από την εγκατάσταση.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Ασφάλεια APK", "Έλεγχος αδειών", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Απέτυχε η εγκατάσταση APK; 12 συνήθεις αιτίες και λύσεις (2026)",
      description: "Πλήρης οδηγός για κοινά σφάλματα εγκατάστασης APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Εγκατάσταση APK", "Αντιμετώπιση", "Android"],
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

export default function ElBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Ιστολόγιο APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Οδηγοί, tutorials και συμβουλές για λήψη APK αρχείων από το Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/el/blog/${post.slug}`}
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
          href="/el"
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
          Αρχική σελίδα
        </Link>
      </div>
    </div>
  );
}
