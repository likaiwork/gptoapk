import type { Metadata } from "next";
import Link from "next/link";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Ghid Complet pentru Descărcarea APK din Google Play (2026)",
      description: "Ghid pas cu pas pentru extragerea fișierelor APK din Google Play Store.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["Descărcare APK", "Google Play", "Ghid"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "Ce Este un Fișier APK? Ghid Complet",
      description: "Tot ce trebuie să știi despre fișierele APK – structură, securitate, diferențe față de AAB.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "Ghid pentru începători"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Site-uri Sigure și de Încredere pentru Descărcare APK (2026)",
      description: "Nu toate site-urile de descărcare APK sunt sigure. Iată 7 surse verificate pentru descărcarea fișierelor APK Android.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Descărcare APK", "Siguranță", "Sfaturi Android"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Ghid Complet de Comparare (2026)",
      description: "APK vs Android App Bundle — care este diferența și de ce contează? Ghid complet pentru utilizatori și dezvoltatori.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Dezvoltare aplicații"],
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
            href={`/ro/blog/${post.slug}`}
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
        <Link href="/ro" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
