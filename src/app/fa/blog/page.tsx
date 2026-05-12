import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "وبلاگ - APK Downloader | gptoapk.com",
  description: "راهنماها و مقالات کامل درباره دانلود APK از گوگل پلی، نصب APK، امنیت و نکات کاربردی اندروید.",
  alternates: {
    canonical: "https://gptoapk.com/fa/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      fa: "https://gptoapk.com/fa/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const blogPosts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "نحوه دانلود APK از گوگل پلی: راهنمای کامل (۲۰۲۶)",
    description: "آموزش گام به گام استخراج فایل APK از فروشگاه گوگل پلی با روش‌های مختلف.",
    date: "2026-05-11",
    readTime: "۶ دقیقه",
    tags: ["دانلود APK", "گوگل پلی", "آموزش"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "فایل APK چیست؟ راهنمای کامل فایل‌های بسته اندروید",
    description: "هر آنچه باید درباره فایل‌های APK بدانید—ساختار، امنیت و تفاوت با AAB.",
    date: "2026-05-11",
    readTime: "۷ دقیقه",
    tags: ["APK", "اندروید", "راهنمای مبتدیان"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "۷ سایت امن و قابل اعتماد دانلود APK (۲۰۲۶)",
      description: "همه سایت‌های دانلود APK امن نیستند. در اینجا ۷ منبع تأیید شده.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["دانلود APK", "امنیت", "نکات اندروید"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK در مقابل AAB: راهنمای مقایسه کامل (۲۰۲۶)",
      description: "APK در مقابل Android App Bundle — تفاوت چیست و چرا مهم است؟",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "اندروید", "توسعه اپلیکیشن"],
    },

];

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">وبلاگ APK Downloader</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          راهنماهای کامل دانلود APK از گوگل پلی، نصب و نکات امنیتی
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/fa/blog/${post.slug}`}
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
