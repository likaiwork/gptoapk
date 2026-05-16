import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Cara Download APK dari Google Play: Panduan Lengkap (2026)",
      description: "Panduan langkah demi langkah untuk mengekstrak file APK dari Google Play Store.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["Download APK", "Google Play", "Panduan"],
    }, 
    {
      slug: "what-is-an-apk-file",
      title: "Apa Itu File APK? Panduan Lengkap",
      description: "Semua yang perlu Anda ketahui tentang file APK – struktur, keamanan, perbedaan dengan AAB.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "Panduan Pemula"],
    }, 
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Situs Download APK yang Aman dan Terpercaya (2026)",
      description: "Tidak semua situs download APK aman. Berikut 7 sumber terverifikasi untuk mengunduh file APK Android.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Download APK", "Keamanan", "Tips Android"],
    }, 
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Panduan Perbandingan Lengkap (2026)",
      description: "APK vs Android App Bundle — apa bedanya dan mengapa itu penting? Panduan lengkap untuk pengguna dan pengembang.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Pengembangan Aplikasi"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "Panduan Pemeriksaan Izin APK: 3 Langkah Mendeteksi Aplikasi Berbahaya (2026)",
      description: "Cara memeriksa apakah file APK aman sebelum diinstal.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Keamanan APK", "Izin", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Gagal Instal APK? 12 Penyebab Umum dan Solusi (2026)",
      description: "Panduan lengkap kesalahan instalasi APK umum.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Instalasi APK", "Pemecahan masalah", "Android"],
    },
    {
      slug: "verify-apk-signature-security-guide",
      title: "Verifikasi Tanda Tangan APK: Panduan Keamanan Lengkap (2026)",
      description: "Panduan lengkap cara verifikasi tanda tangan APK untuk memastikan file asli, aman dari malware, dan bukan hasil modifikasi.",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["Verifikasi APK", "Tanda Tangan", "Keamanan"],
    },
    {
      slug: "apk-download-slow-speed-tips",
      title: "Download APK Terlalu Lambat? 10 Tips Terbukti (2026)",
      description: "10 tips terbukti untuk mempercepat download APK di perangkat Android. Atasi masalah koneksi, server, dan cache.",
      date: "2026-05-16",
      readTime: "6 min read",
      tags: ["Download APK", "Tips Kecepatan", "Koneksi"],
    },
    {
      slug: "download-region-locked-apk-apps",
      title: "Aplikasi APK Terbatas Wilayah: 3 Cara Mendownload (2026)",
      description: "Cara download aplikasi APK yang dibatasi wilayah. Tiga metode ampuh bypass pembatasan regional tanpa root.",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["Aplikasi Regional", "Bypass", "Download APK"],
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
            "url": "https://gptoapk.com/id/blog",
            "inLanguage": "id",
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
            href={`/id/blog/${post.slug}`}
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
        <Link href="/id" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
