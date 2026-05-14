import type { Metadata } from "next";
import Link from "next/link";

const posts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Slik Laster du Ned APK fra Google Play Store: Komplett Guide (2026)",
    description:
      "Trinn-for-trinn-guide for å laste ned APK-filer fra Google Play Store. Lær enkle metoder med gptoapk.com, avanserte ADB-kommandoer og sikkerhetstips.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Nedlasting", "Google Play", "Guide"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Hva er en APK-fil? Komplett Guide til Android-pakker",
    description:
      "Alt du trenger å vite om APK-filer: hva de inneholder, hvordan de fungerer, forskjellen mellom APK og AAB, hvordan du sjekker integritet og hvorfor sikkerhet er viktig.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Nybegynnerguide"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Trygge og Pålitelige APK-nedlastingssider (2026)",
      description: "Ikke alle APK-nedlastingssider er trygge. Her er 7 bekreftede kilder.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Nedlasting", "Sikkerhet", "Android Tips"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Fullstendig Sammenligningsguide (2026)",
      description: "APK vs Android App Bundle — hva er forskjellen og hvorfor er den viktig?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "App-utvikling"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "APK-tillatelsessjekk: 3 trinn for å oppdage skadelige apper (2026)",
      description: "Slik sjekker du om en APK-fil er trygg før installasjon.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK-sikkerhet", "Tillatelser", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK-installasjon mislyktes? 12 vanlige årsaker og løsninger (2026)",
      description: "Fullstendig guide til vanlige APK-installasjonsfeil.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK-installasjon", "Feilsøking", "Android"],
    },
    {
      slug: "apk-compatibility-check-guide",
      title: "APK 版本兼容性检查ガイド：5つのステップでアプリが携帯と互換性があるか確認",
      description: "ダウンロードしたAPKがスマホと互換性がない？CPUアーキテクチャ、APIレベル、画面密度を確認する5つの方法を解説。",
      date: "2026-05-14",
      readTime: "8分で読めます",
      tags: ["APK互換性", "CPUアーキテクチャ", "確認ガイド"],
    },
    {
      slug: "apk-file-size-optimization",
      title: "APKファイルサイズ最適化：ダウンロードを軽量化しスマホのストレージを解放する方法",
      description: "スマホのストレージが不足していませんか？APKの構造から学ぶ、ファイルサイズ削減と空き容量確保の実用的な5つの方法。",
      date: "2026-05-14",
      readTime: "8分で読めます",
      tags: ["APKサイズ", "ストレージ最適化", "空き容量"],
    }
];

export const metadata: Metadata = {
  title: "Blogg - APK Downloader | gptoapk.com",
  description:
    "Norske guider om APK-nedlasting fra Google Play. Praktiske tips, sikkerhetsråd og trinn-for-trinn-instruksjoner for Android-brukere.",
  alternates: {
    canonical: "https://gptoapk.com/nb/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      nb: "https://gptoapk.com/nb/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Blogg - APK Downloader | gptoapk.com",
    description: metadata.description,
    url: "https://gptoapk.com/nb/blog",
    inLanguage: "nb",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Blogg</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
          Guider, tips og dypdykk om APK-nedlasting, Android-pakker og alt du trenger å vite.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/nb/blog/${post.slug}`}
              className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
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
              <h2 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
