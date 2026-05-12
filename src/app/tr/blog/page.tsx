import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK İndirici Kılavuzları ve Eğitimleri | gptoapk.com",
  description:
    "Google Play Store&apos;dan APK indirmeyi öğrenin, indirme araçlarını karşılaştırın, APK dosya yapısını anlayın ve Android uygulama yüklemeyi öğrenin.",
  alternates: {
    canonical: "https://gptoapk.com/tr/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      tr: "https://gptoapk.com/tr/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

const turkishPosts: BlogPostSummary[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Google Play&apos;den APK Nasıl İndirilir: 2026 Kapsamlı Rehber",
    description:
      "Google Play Store&apos;dan APK dosyalarını çıkarmak için adım adım kılavuz. Web araçları, ADB ve güvenli indirme için en iyi uygulamalar dahil olmak üzere birden çok yöntemi öğrenin.",
    date: "2026-05-11",
    readTime: "6 dk okuma",
    tags: ["APK İndirme", "Google Play", "Rehber"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "APK Dosyası Nedir? Android Paket Dosyalarına Kapsamlı Rehber",
    description:
      "APK dosyaları hakkında bilmeniz gereken her şey — içlerinde neler var, nasıl çalışır, APK ile AAB karşılaştırması ve dosya bütünlüğünün Android güvenliği için neden önemli olduğu.",
    date: "2026-05-11",
    readTime: "7 dk okuma",
    tags: ["APK", "Android", "Başlangıç Rehberi"],
  },
];

const englishPosts: BlogPostSummary[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "How to Download APK from Google Play Store: The Complete Guide (2026)",
    description:
      "Google Play Store&apos;dan APK dosyalarını çıkarmak için adım adım kılavuz. Web araçları, ADB ve güvenli indirme için en iyi uygulamalar dahil olmak üzere birden çok yöntemi öğrenin.",
    date: "2026-05-11",
    readTime: "6 dk",
    tags: ["APK Download", "Google Play", "Tutorial"],
  },
  {
    slug: "apk-downloader-tool-comparison",
    title: "APK Downloader Comparison: Top 5 Tools for Google Play APK Extraction",
    description:
      "En popüler APK indirici araçlarını yan yana test ettik. Hız, güvenlik ve kullanım kolaylığını karşılaştırarak en iyi aracı bulun.",
    date: "2026-05-11",
    readTime: "8 dk",
    tags: ["APK Tools", "Comparison", "Review"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "What Is an APK File? A Complete Guide to Android Package Files",
    description:
      "APK dosyaları hakkında bilmeniz gereken her şey — içeride neler var, nasıl çalışır, APK ile AAB karşılaştırması ve dosya bütünlüğünün Android güvenliği için neden önemli olduğu.",
    date: "2026-05-11",
    readTime: "7 dk",
    tags: ["APK", "Android", "Beginner Guide"],
  },
  {
    slug: "how-to-install-apk-on-android",
    title: "How to Install APK on Android: Complete Step-by-Step Guide",
    description:
      "APK&apos;leri elle yükleme konusunda yeni misiniz? Bu kılavuz, bilinmeyen kaynakları etkinleştirmekten yaygın yükleme hatalarını çözmeye kadar her şeyi kapsar.",
    date: "2026-05-11",
    readTime: "7 dk",
    tags: ["APK Installation", "Android", "Tutorial"],
  },
  {
    slug: "google-play-link-to-apk-troubleshooting",
    title: "Google Play Link to APK Failed? Common Problems and Fixes",
    description:
      "Başarısız Google Play bağlantısı APK dönüşümleri için tam sorun giderme kılavuzu: geçersiz bağlantılar, yavaş indirmeler, yükleme hataları ve daha fazlası.",
    date: "2026-05-11",
    readTime: "7 dk",
    tags: ["APK Download", "Troubleshooting", "Google Play"],
  },
  {
    slug: "google-play-link-to-apk-tips",
    title: "No VPN Needed! 3 Pro Tips for Online Google Play Link to APK Converter",
    description:
      "Google Play bağlantısını APK&apos;ye dönüştürmeyi 3 profesyonel ipucuyla ustalaşın: paket adlarını kullanma, telefondan indirme, anında paylaşım bağlantıları oluşturma.",
    date: "2026-05-11",
    readTime: "6 dk",
    tags: ["APK Tips", "Google Play", "Productivity"],
  },
];

function BlogCard({ post, href }: { post: BlogPostSummary; href: string }) {
  return (
    <Link
      href={href}
      className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
        <time dateTime={post.date}>{post.date}</time>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
      <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {post.title}
      </h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
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
  );
}

export default function TrBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK İndirici Blogu
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play Store&apos;dan APK dosyaları indirmek için kılavuzlar, eğitimler ve ipuçları.
        </p>
      </div>

      {/* Turkish Articles */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Türkçe Makaleler</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {turkishPosts.map((post) => (
            <BlogCard key={post.slug} post={post} href={`/tr/blog/${post.slug}`} />
          ))}
        </div>
      </section>

      {/* English Articles */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          İngilizce Makaleler{" "}
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
            (daha fazla içerik)
          </span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {englishPosts.map((post) => (
            <BlogCard key={`en-${post.slug}`} post={post} href={`/en/blog/${post.slug}`} />
          ))}
        </div>
      </section>

      <div className="mt-16 text-center">
        <Link
          href="/tr"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          APK İndirici&apos;ye dön
        </Link>
      </div>
    </div>
  );
}
