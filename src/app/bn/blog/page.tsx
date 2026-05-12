import type { Metadata } from "next";
import Link from "next/link";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Google Play থেকে APK ডাউনলোড করার সম্পূর্ণ গাইড (২০২৬)",
      description: "Google Play স্টোর থেকে APK ফাইল এক্সট্রাক্ট করার ধাপে ধাপে পদ্ধতি।",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["APK ডাউনলোড", "Google Play", "টিউটোরিয়াল"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "APK ফাইল কী? Android প্যাকেজ ফাইলের সম্পূর্ণ গাইড",
      description: "APK ফাইল সম্পর্কে আপনার যা জানা দরকার — গঠন, নিরাপত্তা, AAB পার্থক্য।",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "শিক্ষানবিস গাইড"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "৭টি নিরাপদ ও নির্ভরযোগ্য APK ডাউনলোড সাইট (২০২৬)",
      description: "সব APK ডাউনলোড সাইট নিরাপদ নয়। এখানে Android APK ফাইল ডাউনলোডের জন্য ৭টি যাচাইকৃত উৎস দেওয়া হল।",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK ডাউনলোড", "নিরাপত্তা", "Android টিপস"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK বনাম AAB: সম্পূর্ণ তুলনা গাইড (২০২৬)",
      description: "APK বনাম Android App Bundle — পার্থক্য কী এবং কেন এটি গুরুত্বপূর্ণ? ব্যবহারকারী এবং ডেভেলপারদের জন্য সম্পূর্ণ গাইড।",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "অ্যাপ ডেভেলপমেন্ট"],
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
            href={`/bn/blog/${post.slug}`}
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
        <Link href="/bn" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
