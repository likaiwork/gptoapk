import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Полное руководство по загрузке APK из Google Play (2026)",
      description: "Пошаговая инструкция по извлечению APK-файлов из Google Play Store.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["Загрузка APK", "Google Play", "Руководство"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "Что такое APK-файл? Полное руководство",
      description: "Всё, что нужно знать об APK-файлах – структура, безопасность, отличие от AAB.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "Руководство для начинающих"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 безопасных сайтов для загрузки APK (2026)",
      description: "Не все сайты загрузки APK безопасны. Вот 7 проверенных источников для загрузки файлов APK Android.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Загрузка APK", "Безопасность", "Советы Android"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK против AAB: Полное руководство по сравнению (2026)",
      description: "APK против Android App Bundle — в чем разница и почему это важно? Полное руководство для пользователей и разработчиков.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Разработка приложений"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "Руководство по проверке разрешений APK: 3 шага для выявления вредоносных приложений (2026)",
      description: "Как проверить безопасность APK-файла перед установкой.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Безопасность APK", "Разрешения", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Не удалось установить APK? 12 распространенных причин и решений (2026)",
      description: "Полное руководство по распространенным ошибкам установки APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Установка APK", "Устранение", "Android"],
    },
];

export default function BlogIndexPage() {
  return (


    <div
className="max-w-3xl mx-auto px-4 py-16">


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://gptoapk.com/ru/blog",
            "inLanguage": "ru",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            }
          }),
        }}
      />
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Blog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
        APK Downloader Guides & Tutorials
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/ru/blog/${post.slug}`}
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
        <Link href="/ru" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
