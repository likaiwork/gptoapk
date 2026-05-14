import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "คู่มือดาวน์โหลด APK จาก Google Play ฉบับสมบูรณ์ (2026)",
      description: "คำแนะนำทีละขั้นตอนในการแยกไฟล์ APK จาก Google Play Store",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["ดาวน์โหลด APK", "Google Play", "คู่มือ"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "ไฟล์ APK คืออะไร? คู่มือฉบับสมบูรณ์",
      description: "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับไฟล์ APK – โครงสร้าง ความปลอดภัย ความแตกต่างจาก AAB",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "คู่มือมือใหม่"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 เว็บไซต์ดาวน์โหลด APK ที่ปลอดภัยและน่าเชื่อถือ (2026)",
      description: "ไม่ใช่ทุกเว็บไซต์ดาวน์โหลด APK ที่ปลอดภัย นี่คือ 7 แหล่งที่ตรวจสอบแล้วสำหรับดาวน์โหลดไฟล์ APK Android",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["ดาวน์โหลด APK", "ความปลอดภัย", "เคล็ดลับ Android"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: คู่มือเปรียบเทียบฉบับสมบูรณ์ (2026)",
      description: "APK vs Android App Bundle — แตกต่างกันอย่างไรและทำไมถึงสำคัญ? คู่มือฉบับสมบูรณ์สำหรับผู้ใช้และนักพัฒนา",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "การพัฒนาแอป"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "คู่มือตรวจสอบสิทธิ์ APK: 3 ขั้นตอนตรวจจับแอปอันตราย (2026)",
      description: "วิธีตรวจสอบไฟล์ APK ว่าปลอดภัยก่อนติดตั้ง",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["ความปลอดภัย APK", "สิทธิ์", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "ติดตั้ง APK ล้มเหลว? 12 สาเหตุทั่วไปและวิธีแก้ไข (2026)",
      description: "คู่มือฉบับสมบูรณ์สำหรับข้อผิดพลาดการติดตั้ง APK ทั่วไป",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["ติดตั้ง APK", "แก้ไข", "Android"],
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
            "url": "https://gptoapk.com/th/blog",
            "inLanguage": "th",
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
            href={`/th/blog/${post.slug}`}
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
        <Link href="/th" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
