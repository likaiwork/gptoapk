import type { Metadata } from "next";
import Link from "next/link";

const posts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Så Här Laddar du Ner APK från Google Play Store: Fullständig Guide (2026)",
    description:
      "Steg-för-steg-guide för att ladda ner APK-filer från Google Play Store. Lär dig enkla metoder med gptoapk.com, avancerade ADB-kommandon och säkerhetstips.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Nedladdning", "Google Play", "Guide"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Vad är en APK-fil? Komplett Guide till Android-paket",
    description:
      "Allt du behöver veta om APK-filer: vad de innehåller, hur de fungerar, skillnaden mellan APK och AAB, hur du kontrollerar integritet och varför säkerhet är viktigt.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Nybörjarguide"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Säkra och Pålitliga APK-nedladdningssidor (2026)",
      description: "Alla APK-nedladdningssidor är inte säkra. Här är 7 verifierade källor.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Nedladdning", "Säkerhet", "Android Tips"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Fullständig Jämförelseguide (2026)",
      description: "APK vs Android App Bundle — vad är skillnaden och varför är den viktig?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Apputveckling"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "APK-behörighetskontroll: 3 steg för att upptäcka skadliga appar (2026)",
      description: "Hur du kontrollerar om en APK-fil är säker innan installation.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK-säkerhet", "Behörigheter", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK-installation misslyckades? 12 vanliga orsaker och lösningar (2026)",
      description: "Fullständig guide till vanliga APK-installationsfel.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK-installation", "Felsökning", "Android"],
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
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Svenska guider om APK-nedladdning från Google Play. Praktiska tips, säkerhetsråd och steg-för-steg-instruktioner för Android-användare.",
  alternates: {
    canonical: "https://gptoapk.com/sv/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      sv: "https://gptoapk.com/sv/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Blog - APK Downloader | gptoapk.com",
    description: metadata.description,
    url: "https://gptoapk.com/sv/blog",
    inLanguage: "sv",
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
          Guider, tips och djupdykningar om APK-nedladdning, Android-paket och allt du behöver veta.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/sv/blog/${post.slug}`}
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
