import type { Metadata } from "next";
import Link from "next/link";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Google Play'den APK İndirme: Kapsamlı Rehber (2026)",
      description: "Google Play Store'dan APK dosyalarını çıkarmak için adım adım kılavuz. Web araçları, ADB komutları ve güvenli indirme ipuçları.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["APK İndirme", "Google Play", "Rehber"],
    },
    {
      slug: "what-is-an-apk-file",
      title: "APK Dosyası Nedir? Kapsamlı Rehber",
      description: "APK dosyaları hakkında bilmeniz gereken her şey – yapısı, güvenliği, AAB'den farkı ve Android güvenliğine etkisi.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "Başlangıç Rehberi"],
    },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Güvenli ve Güvenilir APK İndirme Sitesi (2026)",
      description: "Tüm APK indirme siteleri güvenli değildir. İşte Android APK dosyalarını indirmek için 7 doğrulanmış kaynak.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK İndirme", "Güvenlik", "Android İpuçları"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Kapsamlı Karşılaştırma Rehberi (2026)",
      description: "APK vs Android App Bundle — fark nedir ve neden önemlidir? Kullanıcılar ve geliştiriciler için kapsamlı rehber.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Uygulama Geliştirme"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "APK İzin Kontrolü Kılavuzu: Kötü Amaçlı Uygulamaları Tespit Etmek İçin 3 Adım (2026)",
      description: "Bir APK dosyasının kurulumdan önce güvenli olup olmadığı nasıl kontrol edilir.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK Güvenliği", "İzinler", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK Yükleme Başarısız mı? 12 Yaygın Neden ve Çözüm (2026)",
      description: "Yaygın APK yükleme hataları için eksiksiz kılavuz.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK Yükleme", "Sorun Giderme", "Android"],
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
            href={`/tr/blog/${post.slug}`}
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
        <Link href="/tr" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          APK Downloader'a Geri Dön
        </Link>
      </div>
    </div>
  );
}
