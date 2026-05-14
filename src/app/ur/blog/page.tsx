import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

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
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 محفوظ اور قابل بھروسہ APK ڈاؤن لوڈ سائٹس (2026)",
      description: "تمام APK ڈاؤن لوڈ سائٹس محفوظ نہیں ہیں۔ یہاں Android APK فائلیں ڈاؤن لوڈ کرنے کے 7 تصدیق شدہ ذرائع ہیں۔",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK ڈاؤن لوڈ", "سیکیورٹی", "Android ٹپس"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK بمقابلہ AAB: مکمل موازنہ (2026)",
      description: "APK vs Android App Bundle — کیا فرق ہے اور یہ کیوں اہم ہے؟ صارفین اور ڈویلپرز کے لیے مکمل رہنما۔",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "ایپ ڈویلپمنٹ"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "APK اجازت چیک گائیڈ: 3 مراحل میں نقصان دہ ایپ کی شناخت (2026)",
      description: "APK فائل انسٹال کرنے سے پہلے اس کی حفاظت کیسے چیک کریں۔",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK سیکیورٹی", "اجازتیں", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK انسٹال ناکام؟ 12 عام وجوہات اور حل (2026)",
      description: "عام APK انسٹالیشن غلطیوں کی مکمل گائیڈ۔",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK انسٹال", "ٹربل شوٹنگ", "Android"],
    },
];

export default function BlogIndexPage() {
  return (


    <div
className="max-w-5xl mx-auto px-4 py-16" dir="rtl">


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://gptoapk.com/ur/blog",
            "inLanguage": "ur",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            }
          }),
        }}
      />
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
