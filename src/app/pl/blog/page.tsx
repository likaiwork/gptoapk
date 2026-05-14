import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description:
    "Poradniki i artykuły o pobieraniu APK z Google Play. Dowiedz się, jak pobierać pliki APK, rozumieć ich strukturę i bezpiecznie instalować aplikacje.",
  alternates: {
    canonical: "https://gptoapk.com/pl/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      pl: "https://gptoapk.com/pl/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

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
    title: "Jak Pobrać APK z Google Play Store: Kompletny Poradnik (2026)",
    description:
      "Szczegółowa instrukcja pobierania plików APK z Google Play Store. Poznaj proste metody z gptoapk.com, polecenia ADB i wskazówki bezpieczeństwa.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Pobieranie APK", "Google Play", "Poradnik"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Co to jest Plik APK? Kompletny Przewodnik po Paczkach Android",
    description:
      "Wszystko, co musisz wiedzieć o plikach APK: struktura wewnętrzna, różnica między APK a AAB, sprawdzanie integralności i porady bezpieczeństwa.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Przewodnik"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Bezpiecznych i Niezawodnych Stron do Pobierania APK (2026)",
      description: "Nie wszystkie strony do pobierania APK są bezpieczne. Oto 7 zweryfikowanych źródeł.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Pobieranie APK", "Bezpieczeństwo", "Porady Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Kompletny Przewodnik Porównawczy (2026)",
      description: "APK vs Android App Bundle — jaka jest różnica i dlaczego ma znaczenie?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Tworzenie aplikacji"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Przewodnik sprawdzania uprawnień APK: 3 kroki do wykrycia złośliwych aplikacji (2026)",
      description: "Jak sprawdzić czy plik APK jest bezpieczny przed instalacją.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Bezpieczeństwo APK", "Uprawnienia", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Instalacja APK nie powiodła się? 12 typowych przyczyn i rozwiązań (2026)",
      description: "Kompletny przewodnik po typowych błędach instalacji APK.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Instalacja APK", "Rozwiązywanie", "Android"],
    },
];

export default function PlBlogPage() {
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
            "url": "https://gptoapk.com/pl/blog",
            "inLanguage": "pl",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            }
          }),
        }}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Poradniki, tutoriale i wskazówki dotyczące pobierania plików APK z Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/pl/blog/${post.slug}`}
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
        <Link
          href="/pl"
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
          Strona główna
        </Link>
      </div>
    </div>
  );
}
