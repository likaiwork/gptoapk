import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "المدونة - أدلة وبرامج تعليمية لتحميل APK | gptoapk.com",
  description:
    "تعلّم كيفية تنزيل ملفات APK من Google Play، وتعرف على بنية ملفات APK، وأتقن تثبيت تطبيقات Android بأمان.",
  alternates: {
    canonical: "https://gptoapk.com/ar/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      ar: "https://gptoapk.com/ar/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const posts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "كيفية تنزيل APK من Google Play: الدليل الكامل (2026)",
    description:
      "دليل خطوة بخطوة لاستخراج ملفات APK من متجر Google Play. تعرّف على طرق متعددة تشمل الأدوات الإلكترونية و ADB وأفضل الممارسات للتنزيل الآمن.",
    date: "2026-05-11",
    readTime: "6 دقائق قراءة",
    tags: ["تنزيل APK", "Google Play", "دليل"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "ما هو ملف APK؟ دليل شامل لملفات حزمة Android",
    description:
      "كل ما تحتاج معرفته عن ملفات APK — ماذا تحتوي بداخلها، وكيف تعمل، والفرق بين APK و AAB، ولماذا سلامة الملفات أمر حاسم لأمان Android.",
    date: "2026-05-11",
    readTime: "7 دقائق قراءة",
    tags: ["APK", "Android", "دليل المبتدئين"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 مواقع آمنة وموثوقة لتحميل APK (2026)",
      description: "ليست كل مواقع تحميل APK آمنة. إليك 7 مصادر موثقة لتحميل ملفات APK لنظام Android.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["تحميل APK", "الأمان", "نصائح Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK مقابل AAB: دليل المقارنة الشامل (2026)",
      description: "APK مقابل Android App Bundle — ما الفرق ولماذا هو مهم؟ دليل شامل للمستخدمين والمطورين.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "تطوير التطبيقات"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "دليل فحص أذونات APK: 3 خطوات للكشف عن التطبيقات الضارة (2026)",
      description: "كيف تتحقق مما إذا كان ملف APK آمنًا قبل التثبيت.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["أمان APK", "فحص الأذونات", "أمان Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "فشل تثبيت APK؟ 12 سببًا شائعًا وطرق الإصلاح (الدليل الكامل 2026)",
      description: "الدليل الكامل لأخطاء تثبيت APK الشائعة وكيفية إصلاحها.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["تثبيت APK", "استكشاف", "Android"],
    },
];

export default function ArBlogPage() {
  return (


    <div
className="max-w-5xl mx-auto px-4 py-16">


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://gptoapk.com/ar/blog",
            "inLanguage": "ar",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            }
          }),
        }}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          مدونة محمل APK
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          أدلة ومقالات ونصائح لتنزيل ملفات APK من متجر Google Play.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/ar/blog/${post.slug}`}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
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

      <div className="mt-16 text-center">
        <Link
          href="/ar"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
          العودة إلى محمل APK
        </Link>
      </div>
    </div>
  );
}
