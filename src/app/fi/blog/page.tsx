import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogi - APK Downloader | gptoapk.com",
  description:
    "Oppaita ja artikkeleita APK-latauksesta Google Playsta. Opi purkamaan APK, ymmärtämään tiedostorakennetta ja asentamaan Android-sovelluksia turvallisesti.",
  alternates: {
    canonical: "https://gptoapk.com/fi/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      fi: "https://gptoapk.com/fi/blog",
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
    title: "APK-lataus Google Play Storesta: Täydellinen Opas (2026)",
    description:
      "Vaihe vaiheelta -opas APK-tiedostojen hakemiseen Google Play Storesta. Käytä gptoapk.com-sivustoa, ADB-komentoja ja turvallisuusvinkkejä.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Lataus", "Google Play", "Opas"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "Mikä on APK-tiedosto? Täydellinen Opas Android-paketteihin",
    description:
      "Kaikki APK-tiedostoista: sisäinen rakenne, ero APK:n ja AAB:n välillä, eheyden varmistaminen ja turvallisuussuositukset.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Aloittelijan Opas"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Turvallista ja Luotettavaa APK-lataussivustoa (2026)",
      description: "Kaikki APK-lataussivustot eivät ole turvallisia. Tässä 7 vahvistettua lähdettä.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK Lataus", "Turvallisuus", "Android Vinkit"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: Täydellinen Vertailuopas (2026)",
      description: "APK vs Android App Bundle — mitä eroa on ja miksi se on tärkeää?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Sovelluskehitys"],
    },

];

export default function FiBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blogi APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Oppaita, tutoriaaleja ja vinkkejä APK-tiedostojen lataamiseen Google Play Storesta.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/fi/blog/${post.slug}`}
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
          href="/fi"
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
          Etusivulle
        </Link>
      </div>
    </div>
  );
}
