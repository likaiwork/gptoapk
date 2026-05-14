import type { Metadata } from "next";
import Link from "next/link";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "הורדת APK מ-Google Play: מדריך מלא (2026)",
      description: "מדריך שלב-אחר-שלב לחילוץ קבצי APK מחנות Google Play.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["הורדת APK", "Google Play", "מדריך"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "מהו קובץ APK? מדריך מקיף",
      description: "כל מה שצריך לדעת על קבצי APK – מבנה, אבטחה, הבדלים מול AAB.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "אנדרואיד", "מדריך למתחילים"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 אתרי הורדת APK בטוחים ואמינים (2026)",
      description: "לא כל אתרי הורדת ה-APK בטוחים. הנה 7 מקורות מאומתים להורדת קבצי APK של אנדרואיד.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["הורדת APK", "אבטחה", "טיפים לאנדרואיד"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK לעומת AAB: מדריך השוואה מלא (2026)",
      description: "APK לעומת Android App Bundle — מה ההבדל ולמה זה חשוב? מדריך מלא למשתמשים ולמפתחים.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "אנדרואיד", "פיתוח אפליקציות"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "מדריך בדיקת הרשאות APK: 3 שלבים לאיתור אפליקציות זדוניות (2026)",
      description: "כיצד לבדוק אם קובץ APK בטוח לפני ההתקנה.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["אבטחת APK", "הרשאות", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "התקנת APK נכשלה? 12 סיבות נפוצות ופתרונות (2026)",
      description: "מדריך מלא לשגיאות התקנת APK נפוצות.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["התקנת APK", "תקלות", "Android"],
    },
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
            href={`/he/blog/${post.slug}`}
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
        <Link href="/he" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
