import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
}

const posts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "APK Downloaden van Google Play Store: Volledige Gids (2026)",
    description:
      "Stap-voor-stap handleiding voor het downloaden van APK-bestanden uit de Google Play Store. Leer eenvoudige methoden met gptoapk.com, geavanceerde ADB-opdrachten en veiligheidstips. Geen root vereist.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Downloaden", "Google Play", "Handleiding"],
    content: (
      <>
        <p>
          Een APK-bestand downloaden van Google Play kan om verschillende redenen handig zijn: je wilt een
          specifieke versie van een app bewaren, deze op een toestel zonder Google Play installeren, of
          gewoon een back-up maken. In deze gids laten we de beste methoden zien om APK-bestanden te
          downloaden.
        </p>

        <h2>Methode 1: Gebruik gptoapk.com (De eenvoudigste)</h2>
        <p>
          De snelste methode vereist geen installaties. Bezoek gewoon{" "}
          <a href="https://gptoapk.com">gptoapk.com</a> en plak de Google Play-link van de gewenste app.
        </p>
        <ol>
          <li>
            Open Google Play Store op je telefoon of browser, zoek de app en kopieer de URL (bijv.
            <code>https://play.google.com/store/apps/details?id=com.example.app</code>).
          </li>
          <li>
            Ga naar <a href="https://gptoapk.com">gptoapk.com</a> en plak de link in het zoekveld.
          </li>
          <li>Klik op de downloadknop en wacht enkele seconden.</li>
          <li>Download het APK-bestand direct naar je apparaat.</li>
        </ol>
        <p>
          Deze methode werkt voor elke openbare app in de Google Play Store en is volledig gratis. Geen
          registratie of extra software nodig.
        </p>

        <h2>Methode 2: Gebruik ADB (Voor ontwikkelaars)</h2>
        <p>
          Als je een ontwikkelaar of gevorderde gebruiker bent, kun je APK-bestanden extraheren met Android
          Debug Bridge (ADB). Hiervoor heb je een computer nodig en moet USB-foutopsporing zijn ingeschakeld.
        </p>
        <pre><code>{`// 1. Controleer of het apparaat is verbonden
adb devices

// 2. Toon alle geïnstalleerde apps (zoek het gewenste pakket)
adb shell pm list packages | grep appnaam

// 3. Vraag het APK-pad op
adb shell pm path com.voorbeeld.app

// 4. Download het APK naar de computer
adb pull /data/app/com.voorbeeld.app-xxx/base.apk`}</code></pre>
        <p>
          Eenmaal gedownload kun je het APK delen, op andere apparaten installeren of als back-up bewaren.
          Deze methode werkt zonder root en geeft je volledige controle.
        </p>

        <h2>Methode 3: APK Extractor apps</h2>
        <p>
          Als je liever een oplossing op je telefoon gebruikt zonder computer, kun je apps zoals APK
          Extractor of ML Manager uit de Play Store gebruiken. Deze apps vinden automatisch alle
          geïnstalleerde apps en exporteren de APK met één tik.
        </p>
        <ul>
          <li>
            <strong>APK Extractor:</strong> Eenvoudig en lichtgewicht. Selecteer de app en druk op
            &quot;Extract&quot;.
          </li>
          <li>
            <strong>ML Manager:</strong> Biedt ook back-upbeheer en delen via Wi-Fi Direct.
          </li>
        </ul>

        <h2>Veelgestelde vragen</h2>
        <h3>Is het legaal om APK's van Google Play te downloaden?</h3>
        <p>
          Ja, het downloaden van APK's van gratis apps voor persoonlijk gebruik is legaal. Voor betaalde
          apps moet je deze wel regulier hebben aangeschaft. Het extraheren van APK's voor back-updoeleinden
          is toegestaan volgens de voorwaarden van Google.
        </p>
        <h3>Heb ik root nodig?</h3>
        <p>
          Nee. Alle hier beschreven methoden werken zonder root. Voor het downloaden van APK's zijn geen
          beheerdersrechten op het apparaat nodig.
        </p>
        <h3>Waarom installeren sommige APK's niet?</h3>
        <p>
          Mogelijk moet je installatie uit onbekende bronnen inschakelen. Ga naar Instellingen &gt;
          Beveiliging &gt; Onbekende bronnen en schakel dit in. Op Android 8+ is deze optie per app
          ingesteld.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Probeer gptoapk.com nu 🚀</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — De snelste manier om APK's van Google Play te downloaden. Plak de link, download het APK in
            één klik. Gratis, geen registratie, geen installatie.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            APK downloaden →
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "what-is-an-apk-file",
    title: "Wat is een APK-bestand? Complete Gids voor Android-pakketten",
    description:
      "Alles wat je moet weten over APK-bestanden: wat ze bevatten, hoe ze werken, het verschil tussen APK en AAB, hoe je de integriteit controleert en waarom veiligheid belangrijk is. Voor beginners en gevorderden.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Beginnersgids"],
    content: (
      <>
        <p>
          APK staat voor <strong>Android Package Kit</strong>. Het is het bestandsformaat dat Android
          gebruikt om apps te distribueren en installeren. Elke app die je op je Android-telefoon installeert,
          zit verpakt in een APK-bestand (of het nieuwere AAB-formaat). In deze gids duiken we diep in de
          structuur, werking en het belang van APK-bestanden.
        </p>

        <h2>Wat zit er in een APK-bestand?</h2>
        <p>
          Een APK-bestand is in feite een ZIP-archief met een specifieke structuur. Binnenin vind je:
        </p>
        <ul>
          <li>
            <strong>AndroidManifest.xml:</strong> Het hart van de app. Bevat de pakketnaam, machtigingen,
            activities, services en broadcast receivers.
          </li>
          <li>
            <strong>classes.dex:</strong> De uitvoerbare code van de app in Dalvik Executable (DEX)-formaat.
            Hier zit de logica van de applicatie.
          </li>
          <li>
            <strong>res/:</strong> De resources van de app: XML-lay-outs, afbeeldingen, pictogrammen,
            vertaalde tekststrings, thema&apos;s en meer.
          </li>
          <li>
            <strong>lib/:</strong> Native bibliotheken geschreven in C/C++ voor specifieke architecturen
            (armeabi-v7a, arm64-v8a, x86, x86_64).
          </li>
          <li>
            <strong>META-INF/:</strong> De digitale handtekeningbestanden die de integriteit en
            authenticiteit van het APK waarborgen. Bevat MANIFEST.MF, CERT.SF en CERT.RSA.
          </li>
          <li>
            <strong>assets/:</strong> Extra resources die via de AssetManager-API toegankelijk zijn.
          </li>
        </ul>

        <h2>APK vs AAB: Wat is het verschil?</h2>
        <p>
          Sinds 2021 vereist Google het <strong>Android App Bundle (AAB)</strong>-formaat voor publicatie in
          de Play Store. Een AAB is niet direct installeerbaar: Google Play verwerkt het en genereert
          geoptimaliseerde APK&apos;s voor elk apparaat (split APK&apos;s). De voordelen van AAB zijn:
        </p>
        <ul>
          <li>Kleinere apps: gebruikers downloaden alleen de resources die hun apparaat nodig heeft.</li>
          <li>Dynamische module-ondersteuning (asset packs, feature on-demand).</li>
          <li>Efficiëntere updates met Delta-patches.</li>
        </ul>
        <p>
          Toch blijft het APK-formaat universeel voor directe installatie (sideloading). Je kunt een AAB
          naar APK converteren met tools zoals <code>bundletool</code> van Google.
        </p>

        <h2>APK-integriteit controleren</h2>
        <p>
          Het downloaden van APK&apos;s van niet-officiële bronnen kan risico&apos;s met zich meebrengen. Zo
          controleer je of een APK authentiek is:
        </p>
        <pre><code>{`// Controleer de digitale handtekening
keytool -printcert -jarfile app.apk

// Controleer de SHA-256 hash
sha256sum app.apk

# Vergelijk met de officiële hash (indien beschikbaar)`}</code></pre>
        <p>
          Een APK ondertekend met een geldig certificaat is vrijwel zeker authentiek. Wees voorzichtig met
          APK&apos;s van onbekende bronnen of met afwijkende hashes.
        </p>

        <h2>Veelgestelde vragen</h2>
        <h3>Kan ik een APK openen om te zien wat erin zit?</h3>
        <p>
          Ja. Hernoem het bestand van <code>.apk</code> naar <code>.zip</code> en open het met een
          archiefprogramma. Je kunt de resources bekijken, maar de DEX-code vereist decompilatie-tools
          zoals JADX of APKTool om leesbaar te maken.
        </p>
        <h3>Waar staat APK voor?</h3>
        <p>
          APK staat voor <strong>Android Package Kit</strong> (of Android Package-bestand). Het is het
          standaardformaat voor app-distributie op Android.
        </p>
        <h3>Zijn APK-bestanden veilig?</h3>
        <p>
          Dat hangt af van de bron. APK&apos;s van betrouwbare bronnen zoals Google Play of gptoapk.com
          zijn veilig. Vermijd verdachte sites en controleer altijd de digitale handtekening.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Download APK veilig 🛡️</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Download APK-bestanden van Google Play snel en veilig. Directe link, geen opdringerige
            advertenties, geen privacyrisico&apos;s. Probeer het nu.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Ga naar gptoapk.com →
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | gptoapk.com`,
    description: post.description,
    alternates: {
      canonical: `https://gptoapk.com/nl/blog/${slug}`,
      languages: {
        en: `https://gptoapk.com/en/blog/${slug}`,
        "x-default": `https://gptoapk.com/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "gptoapk.com" },
    url: `https://gptoapk.com/nl/blog/${slug}`,
    inLanguage: "nl",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/nl/blog/${slug}`,
    },
  };

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/nl/blog"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
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
          ← Terug naar blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
          {post.content}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/nl/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Terug naar blog
          </Link>
        </div>
      </article>
    </>
  );
}
