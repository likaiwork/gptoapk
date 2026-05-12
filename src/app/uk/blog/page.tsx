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
