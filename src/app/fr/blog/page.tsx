import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Guides et tutoriels du Téléchargeur APK | gptoapk.com",
  description:
    "Apprenez à télécharger des APK depuis Google Play Store, comparez les outils de téléchargement, comprenez la structure des fichiers APK et maîtrisez l'installation d'applications Android.",
  alternates: {
    canonical: "https://gptoapk.com/fr/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      fr: "https://gptoapk.com/fr/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const posts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Comment télécharger un APK depuis Google Play : Guide complet (2026)",
    description:
      "Apprenez à extraire des fichiers APK depuis Google Play Store étape par étape. Plusieurs méthodes : outils en ligne, ADB et bonnes pratiques pour des téléchargements sécurisés.",
    date: "2026-05-11",
    readTime: "6 min de lecture",
    tags: ["Téléchargement APK", "Google Play", "Tutoriel"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Qu'est-ce qu'un fichier APK ? Guide complet des packages Android",
    description:
      "Tout ce que vous devez savoir sur les fichiers APK : leur contenu, leur fonctionnement, la différence entre APK et AAB, et pourquoi l'intégrité des fichiers est cruciale pour la sécurité.",
    date: "2026-05-11",
    readTime: "7 min de lecture",
    tags: ["APK", "Android", "Guide débutant"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Sites de Téléchargement APK Sûrs et Fiables (2026)",
      description: "Tous les sites de téléchargement d'APK ne sont pas sûrs. Voici 7 sources vérifiées.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Téléchargement APK", "Sécurité", "Conseils Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB : Guide de Comparaison Complet (2026)",
      description: "APK vs Android App Bundle — quelle est la différence et pourquoi c'est important ?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Développement d'applications"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Guide de vérification des autorisations APK : 3 étapes pour détecter les applications malveillantes (2026)",
      description: "Comment vérifier si un fichier APK est sûr avant de l'installer.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Sécurité APK", "Autorisations", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Échec d'installation APK ? 12 causes courantes et solutions (2026)",
      description: "Guide complet des erreurs d'installation APK courantes.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Installation APK", "Dépannage", "Android"],
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

export default function FrBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog du Téléchargeur APK
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guides, tutoriels et astuces pour télécharger des fichiers APK depuis Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/fr/blog/${post.slug}`}
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
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/fr"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour au Téléchargeur APK
        </Link>
      </div>
    </div>
  );
}
