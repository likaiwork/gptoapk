import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "بلاگ - APK Downloader | gptoapk.com",
  description: "Google Play سے APK ڈاؤن لوڈ کرنے، APK انسٹال کرنے، سیکیورٹی، اور Android ٹپس کے بارے میں مکمل گائیڈز اور مضامین۔",
  alternates: {
    canonical: "https://gptoapk.com/ur/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      ur: "https://gptoapk.com/ur/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const blogPosts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Google Play سے APK ڈاؤن لوڈ کرنے کا مکمل گائیڈ (2026)",
    description: "Google Play Store سے APK نکالنے کے لیے مختلف طریقوں کے ساتھ مرحلہ وار گائیڈ۔",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK ڈاؤن لوڈ", "Google Play", "سبق"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "APK فائل کیا ہے؟ Android پیکیج فائلوں کا مکمل گائیڈ",
    description: "وہ سب کچھ جو آپ کو جاننا چاہیے—ساخت، سیکیورٹی، اور APK اور AAB کے درمیان فرق۔",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "ابتدائی گائیڈ"],
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">APK Downloader Blog</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play سے APK ڈاؤن لوڈ کرنے، انسٹالیشن اور سیکیورٹی ٹپس کے بارے میں مکمل گائیڈز
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/ur/blog/${post.slug}`}
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
