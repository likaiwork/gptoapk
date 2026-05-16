import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description: "Mga kumpletong gabay at artikulo tungkol sa pag-download ng APK mula sa Google Play, pag-install ng APK, seguridad, at tips sa Android.",
  alternates: {
    canonical: "https://gptoapk.com/tl/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      tl: "https://gptoapk.com/tl/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const blogPosts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Paano Mag-download ng APK mula sa Google Play: Kumpletong Gabay (2026)",
    description: "Hakbang-hakbang na gabay sa pag-extract ng APK mula sa Google Play Store gamit ang iba't ibang paraan.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Download", "Google Play", "Tutorial"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Ano ang APK File? Kumpletong Gabay sa Android Package Files",
    description: "Lahat ng kailangan mong malaman—istraktura, seguridad, at pagkakaiba ng APK at AAB.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Beginner Guide"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Ligtas at Maaasahang APK Download Sites (2026)",
      description: "Hindi lahat ng APK download site ay ligtas. Narito ang 7 napatunayang mapagkukunan.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Download", "Kaligtasan", "Android Tips"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Kumpletong Paghahambing (2026)",
      description: "APK vs Android App Bundle — ano ang pagkakaiba at bakit ito mahalaga?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Pag-develop ng App"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Gabay sa Pagsusuri ng Pahintulot ng APK: 3 Hakbang para Matukoy ang Malisyosong App (2026)",
      description: "Paano suriin kung ang isang APK file ay ligtas bago i-install.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Seguridad ng APK", "Pahintulot", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Nabigo ang Pag-install ng APK? 12 Karaniwang Dahilan at Solusyon (2026)",
      description: "Kumpletong gabay sa karaniwang mga error sa pag-install ng APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Pag-install APK", "Pag-troubleshoot", "Android"],
    },
    {
      slug: "verify-apk-signature-security-guide",
      title: "Pag-verify ng Lagda ng APK: Kumpletong Gabay sa Seguridad (2026)",
      description: "Alamin kung bakit mahalaga ang pag-verify ng APK signature, paano ito gawin gamit ang phone tools, apksigner command line, at online tools.",
      date: "2026-05-16",
      readTime: "7 min",
      tags: ["Seguridad ng APK", "Lagda", "Gabay"],
    },
    {
      slug: "apk-download-slow-speed-tips",
      title: "Masyadong Mabagal ang Pag-download ng APK? 10 Subok na Tip (2026)",
      description: "10 napatunayang paraan para pabilisin ang pag-download ng APK files. Mula sa pagpapalit ng server hanggang sa paggamit ng download manager.",
      date: "2026-05-16",
      readTime: "6 min",
      tags: ["APK Download", "Bilis", "Tips"],
    },
    {
      slug: "download-region-locked-apk-apps",
      title: "Mga APK App na Naka-lock ayon sa Rehiyon: 3 Paraan ng Pag-download (2026)",
      description: "Tatlong epektibong paraan para mag-download ng mga APK app na naka-lock ayon sa rehiyon nang walang VPN.",
      date: "2026-05-16",
      readTime: "7 min",
      tags: ["APK Download", "Rehiyon", "Android"],
    },
];

export default function BlogIndexPage() {
  return (


    <div
className="max-w-5xl mx-auto px-4 py-16">


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://gptoapk.com/tl/blog",
            "inLanguage": "tl",
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
          Mga kumpletong gabay sa pag-download ng APK mula sa Google Play, pag-install, at tips sa seguridad
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {[...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
          <Link
            key={post.slug}
            href={`/tl/blog/${post.slug}`}
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
