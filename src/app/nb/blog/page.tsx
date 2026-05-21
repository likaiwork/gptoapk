import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const posts = [
    {
      slug: "safe-apk-download-guide-2026",
      title: "Slik laster du ned APK trygt fra Google Play — Guide 2026",
      description:
        "Komplett guide for sikker nedlasting av originale APK-er. Forklarer Google Play, pålitelige tredjepartskilder og verifiseringsmetoder etter nedlasting.",
      date: "2026-05-21",
      readTime: "8 min read",
      tags: ["APK-nedlasting", "Sikkerhet", "Original programvare"],
    },

    {
      slug: "mobile-app-security-scan-guide-2026",
      title: "Komplett guide for sikkerhetsskanning av mobilapper — 2026",
      description:
        "Lær å sjekke appsikkerhet og identifisere ondsinnede APK-er og trojanere. Dekker VirusTotal-skanning, tillatelsesgjennomgang og atferdsovervåking.",
      date: "2026-05-21",
      readTime: "8 min read",
      tags: ["Mobil sikkerhet", "APK-inspeksjon", "Malware-beskyttelse"],
    },
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
      slug: "verify-apk-signature-security-guide",
      title: "APK-signaturverifisering: Fullstendig sikkerhetsguide (2026)",
      description: "Fullstendig guide for å verifisere APK-signaturer for å sikre at filen er ekte, fri for skadelig programvare og ikke modifisert.",
      date: "2026-05-16",
      readTime: "7 min",
      tags: ["APK-verifisering", "Signatur", "Sikkerhet"],
    },
    {
      slug: "apk-download-slow-speed-tips",
      title: "APK-nedlasting for treg? 10 utprøvde tips (2026)",
      description: "10 utprøvde tips for å øke hastigheten på APK-nedlastinger på Android-enheter. Løsninger for treg tilkobling, overbelastede servere og cache-problemer.",
      date: "2026-05-16",
      readTime: "6 min",
      tags: ["Nedlastingshastighet", "Android-tips", "Tilkobling"],
    },
    {
      slug: "download-region-locked-apk-apps",
      title: "Regionsperrede APK-apper: 3 nedlastingsmetoder (2026)",
      description: "Slik laster du ned regionsperrede APK-apper. Tre effektive metoder for å omgå geografiske restriksjoner uten root.",
      date: "2026-05-16",
      readTime: "7 min",
      tags: ["Regionsperret", "Bypass", "APK-nedlasting"],
    },
  {
    slug: "apk-install-failed-common-errors-solutions",
    title: "APK Install Failed? 8 Common Errors and Complete Solutions (2026)",
    description: "Troubleshoot 8 common Android APK installation errors including Parse Error, App Not Installed, signature conflicts, insufficient storage. Complete solutions for all Android brands.",
    date: "2026-05-17",
    readTime: "8 min read",
    tags: ["APK Install Failed", "Android Installation Errors", "APK Parse Error", "gptoapk"],
  },
  {
    slug: "download-apk-from-google-play-link",
    title: "How to Download APK from Google Play Link: 4 Proven Methods (2026)",
    description: "Step-by-step guide to extract and download APK files from Google Play Store links. 4 methods covering all devices: online extractors, Chrome extensions, ADB extraction, third-party sites.",
    date: "2026-05-17",
    readTime: "8 min read",
    tags: ["Google Play APK Download", "Play Store Link Extraction", "APK Download Tutorial", "gptoapk"],
  },
  {
    slug: "apk-installation-errors-fixes-guide",
    title: "Common APK Installation Errors and Fixes — Complete Troubleshooting Guide",
    description: "Comprehensive guide to fixing APK installation errors on Android. Covers 8 common issues including parse errors, app not installed, signature conflicts, insufficient storage.",
    date: "2026-05-17",
    readTime: "8 min read",
    tags: ["APK Installation Errors", "Android Troubleshooting", "App Not Installed", "gptoapk"],
  },
  {
    slug: "download-apk-from-google-play-link-guide",
    title: "How to Download APK from Google Play Link — Complete Guide: 4 Proven Methods",
    description: "Learn 4 proven methods to download APK files from Google Play Store links. Online extractors, browser extensions, ADB extraction, and direct APK site searches.",
    date: "2026-05-17",
    readTime: "8 min read",
    tags: ["Google Play APK Download", "Play Store Link to APK", "APK Download Guide", "gptoapk"],
  },
];

export const metadata: Metadata = {
  title: "Blogg - APK Downloader | gptoapk.com",
  description:
    "Norske guider om APK-nedlasting fra Google Play. Praktiske tips, sikkerhetsråd og trinn-for-trinn-instruksjoner for Android-brukere.",
  alternates: {
    canonical: "https://www.gptoapk.com/nb/blog",
    languages: {
      en: "https://www.gptoapk.com/en/blog",
      nb: "https://www.gptoapk.com/nb/blog",
      "x-default": "https://www.gptoapk.com/en/blog",
    },
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Blogg - APK Downloader | gptoapk.com",
    description: metadata.description,
    url: "https://www.gptoapk.com/nb/blog",
    inLanguage: "nb",
  };

  return (
    <>


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://www.gptoapk.com/nb/blog",
            "inLanguage": "nb",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://www.gptoapk.com"
            }
          }),
        }}
      />
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
          {[...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
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
