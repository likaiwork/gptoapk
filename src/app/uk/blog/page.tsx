import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Блог - APK Downloader | gptoapk.com",
  description: "Повні гіди та статті про завантаження APK з Google Play, встановлення APK, безпеку та поради для Android.",
  alternates: {
    canonical: "https://gptoapk.com/uk/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      uk: "https://gptoapk.com/uk/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const blogPosts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Як завантажити APK з Google Play: Повний гід (2026)",
    description: "Покроковий гід із вилучення APK з Google Play Store за допомогою різних методів.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Завантаження APK", "Google Play", "Посібник"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Що таке APK-файл? Повний гід з Android Package Files",
    description: "Все, що потрібно знати — структура, безпека та різниця між APK та AAB.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Гід для початківців"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Безпечних сайтів для завантаження APK (2026)",
      description: "Не всі сайти для завантаження APK безпечні. Ось 7 перевірених джерел.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Завантаження APK", "Безпека", "Поради Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Повне порівняння (2026)",
      description: "APK vs Android App Bundle — яка різниця і чому це важливо?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Розробка додатків"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Посібник з перевірки дозволів APK: 3 кроки для виявлення шкідливих додатків (2026)",
      description: "Як перевірити, чи безпечний файл APK перед встановленням.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Безпека APK", "Дозволи", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Не вдалося встановити APK? 12 поширених причин та рішень (2026)",
      description: "Повний посібник з поширених помилок встановлення APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Встановлення APK", "Усунення", "Android"],
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
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">APK Downloader Blog</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Повні гіди із завантаження APK з Google Play, встановлення та поради з безпеки
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/uk/blog/${post.slug}`}
            className="group block p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
