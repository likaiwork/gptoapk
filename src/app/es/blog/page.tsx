import type { Metadata } from "next";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Cómo descargar APK desde Google Play: Guía completa (2026)",
    description:
      "Guía paso a paso para extraer archivos APK de Google Play Store. Aprende múltiples métodos, incluyendo herramientas web, ADB y mejores prácticas para descargas seguras.",
    date: "2026-05-11",
    readTime: "6 min de lectura",
    tags: ["Descargar APK", "Google Play", "Tutorial"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "¿Qué es un archivo APK? Guía completa del formato de Android",
    description:
      "Descubre todo sobre los archivos APK de Android: qué contienen, cómo funcionan, diferencias con AAB, y por qué son esenciales para instalar aplicaciones fuera de Google Play.",
    date: "2026-05-11",
    readTime: "7 min de lectura",
    tags: ["APK", "Android", "Guía para principiantes"],
  },
];

export const metadata: Metadata = {
  title: "Blog - Guías y tutoriales de APK Downloader | gptoapk.com",
  description:
    "Aprende a descargar APK desde Google Play Store, comparar herramientas, entender la estructura de los archivos APK y dominar la instalación de aplicaciones Android.",
  alternates: {
    canonical: "https://gptoapk.com/es/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      es: "https://gptoapk.com/es/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function EsBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog de APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guías, tutoriales y consejos para descargar archivos APK desde Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/es/blog/${post.slug}`}
            className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
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
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/es" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al APK Downloader
        </Link>
      </div>
    </div>
  );
}
