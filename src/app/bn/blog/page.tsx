import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

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
    {
      slug: "apk-permission-check-malware-detection",
      title: "APK অনুমতি পরীক্ষা গাইড: ৩ ধাপে ম্যালিশিয়াস অ্যাপ শনাক্ত (২০২৬)",
      description: "APK ফাইল ইনস্টল করার আগে নিরাপদ কিনা কীভাবে যাচাই করবেন।",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK নিরাপত্তা", "অনুমতি পরীক্ষা", "Android নিরাপত্তা"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK ইনস্টল ব্যর্থ? ১২টি সাধারণ কারণ ও সমাধান (২০২৬ সম্পূর্ণ গাইড)",
      description: "সাধারণ APK ইনস্টলেশন ত্রুটি এবং সমাধানের সম্পূর্ণ গাইড।",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK ইনস্টল", "সমস্যা সমাধান", "Android"],
    },
    {
      slug: "verify-apk-signature-security-guide",
      title: "APK স্বাক্ষর যাচাইকরণ: সম্পূর্ণ নিরাপত্তা গাইড (2026)",
      description: "APK ফাইলের ডিজিটাল স্বাক্ষর যাচাইয়ের সম্পূর্ণ গাইড। মোবাইল অ্যাপ, কমান্ড লাইন এবং অনলাইন টুল দিয়ে স্বাক্ষর পরীক্ষার পদ্ধতি।",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["APK স্বাক্ষর", "নিরাপত্তা", "ডিজিটাল যাচাই"],
    },
    {
      slug: "apk-download-slow-speed-tips",
      title: "APK ডাউনলোড খুব ধীর? ১০টি প্রমাণিত টিপস (2026)",
      description: "APK ফাইল ডাউনলোড করতে অনেক সময় লাগছে? ১০টি কার্যকরী টিপস যা আপনার ডাউনলোড স্পিড বাড়িয়ে দেবে।",
      date: "2026-05-16",
      readTime: "6 min read",
      tags: ["APK ডাউনলোড", "গতি", "টিপস", "Android"],
    },
    {
      slug: "download-region-locked-apk-apps",
      title: "অঞ্চল-সীমাবদ্ধ APK অ্যাপ ডাউনলোড: ৩টি পদ্ধতি (2026)",
      description: "আপনার অঞ্চলে সীমাবদ্ধ অ্যাপ ডাউনলোডের সম্পূর্ণ গাইড। VPN ছাড়াও APK ডাউনলোডের কার্যকরী পদ্ধতি।",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["APK", "অঞ্চল সীমাবদ্ধ", "ডাউনলোড", "Android"],
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
            "url": "https://gptoapk.com/bn/blog",
            "inLanguage": "bn",
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
        {[...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
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
