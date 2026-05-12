import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Guias e tutoriais do APK Downloader | gptoapk.com",
  description:
    "Aprenda a baixar APK da Google Play Store, comparar ferramentas de download, entender a estrutura do arquivo APK e dominar a instalação de aplicativos Android.",
  alternates: {
    canonical: "https://gptoapk.com/pt/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      pt: "https://gptoapk.com/pt/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const posts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Como Baixar APK do Google Play: Guia Completo (2026)",
    description:
      "Guia passo a passo para extrair arquivos APK da Google Play Store. Aprenda vários métodos, incluindo ferramentas web, ADB e melhores práticas para downloads seguros.",
    date: "2026-05-11",
    readTime: "6 min de leitura",
    tags: ["Download APK", "Google Play", "Tutorial"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "O que é um Arquivo APK? Guia Completo sobre Pacotes Android",
    description:
      "Tudo o que você precisa saber sobre arquivos APK — o que contêm, como funcionam, APK vs AAB e por que a integridade do arquivo é importante para a segurança do Android.",
    date: "2026-05-11",
    readTime: "7 min de leitura",
    tags: ["APK", "Android", "Guia Iniciante"],
  },
];

export default function PtBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog do APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guias, tutoriais e dicas para baixar arquivos APK da Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/pt/blog/${post.slug}`}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
              {post.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/pt"
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
          Voltar ao APK Downloader
        </Link>
      </div>
    </div>
  );
}
