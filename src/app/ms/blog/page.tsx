import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Panduan Lengkap Muat Turun APK dari Google Play (2026)",
      description: "Panduan langkah demi langkah untuk mengekstrak fail APK dari Google Play Store.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["Muat Turun APK", "Google Play", "Panduan"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "Apa Itu Fail APK? Panduan Lengkap",
      description: "Semua yang perlu anda tahu tentang fail APK – struktur, keselamatan, perbezaan dengan AAB.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "Panduan Pemula"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Tapak Muat Turun APK yang Selamat dan Boleh Dipercayai (2026)",
      description: "Tidak semua tapak muat turun APK selamat. Berikut adalah 7 sumber yang disahkan untuk memuat turun fail APK Android.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Muat Turun APK", "Keselamatan", "Petua Android"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Panduan Perbandingan Lengkap (2026)",
      description: "APK vs Android App Bundle — apa bezanya dan mengapa ia penting? Panduan lengkap untuk pengguna dan pembangun.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Pembangunan Aplikasi"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "Panduan Semakan Kebenaran APK: 3 Langkah Mengesan Aplikasi Berbahaya (2026)",
      description: "Cara menyemak sama ada fail APK selamat sebelum dipasang.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Keselamatan APK", "Kebenaran", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Pemasangan APK Gagal? 12 Punca Biasa dan Penyelesaian (2026)",
      description: "Panduan lengkap ralat pemasangan APK biasa.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Pemasangan APK", "Penyelesaian", "Android"],
    },
    {
      slug: "verify-apk-signature-security-guide",
      title: "Pengesahan Tandatangan APK: Panduan Keselamatan Lengkap (2026)",
      description: "Panduan lengkap mengesahkan tandatangan APK untuk memastikan fail asli, selamat daripada perisian hasad, dan bukan hasil pengubahsuaian.",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["Pengesahan APK", "Tandatangan", "Keselamatan"],
    },
    {
      slug: "apk-download-slow-speed-tips",
      title: "Muat Turun APK Terlalu Perlahan? 10 Tip Terbukti (2026)",
      description: "10 tip terbukti untuk mempercepat muat turun APK pada peranti Android. Atasi masalah sambungan, pelayan, dan cache.",
      date: "2026-05-16",
      readTime: "6 min read",
      tags: ["Muat Turun APK", "Tip Kelajuan", "Sambungan"],
    },
    {
      slug: "download-region-locked-apk-apps",
      title: "Apl APK Terhad Kawasan: 3 Cara Muat Turun (2026)",
      description: "Cara muat turun aplikasi APK yang terhad wilayah. Tiga kaedah berkesan untuk memintas sekatan wilayah tanpa root.",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["Aplikasi Wilayah", "Bypass", "Muat Turun APK"],
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
            "url": "https://gptoapk.com/ms/blog",
            "inLanguage": "ms",
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
            href={`/ms/blog/${post.slug}`}
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
        <Link href="/ms" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
