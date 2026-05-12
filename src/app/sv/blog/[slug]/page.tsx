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
    title: "Så Här Laddar du Ner APK från Google Play Store: Fullständig Guide (2026)",
    description:
      "Steg-för-steg-guide för att ladda ner APK-filer från Google Play Store. Lär dig enkla metoder med gptoapk.com, avancerade ADB-kommandon och säkerhetstips. Ingen root krävs.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Nedladdning", "Google Play", "Guide"],
    content: (
      <>
        <p>
          Att ladda ner en APK-fil från Google Play kan vara användbart av många anledningar: du vill spara
          en specifik appversion, installera den på en enhet utan Google Play, eller bara skapa en
          säkerhetskopia. I den här guiden visar vi de bästa metoderna för att ladda ner APK-filer.
        </p>

        <h2>Metod 1: Använd gptoapk.com (Enklast)</h2>
        <p>
          Den snabbaste metoden kräver ingen installation. Besök bara{" "}
          <a href="https://gptoapk.com">gptoapk.com</a> och klistra in Google Play-länken för önskad app.
        </p>
        <ol>
          <li>
            Öppna Google Play Store på din telefon eller webbläsare, sök upp appen och kopiera URL:en
            (t.ex. <code>https://play.google.com/store/apps/details?id=com.example.app</code>).
          </li>
          <li>
            Gå till <a href="https://gptoapk.com">gptoapk.com</a> och klistra in länken i sökfältet.
          </li>
          <li>Klicka på nedladdningsknappen och vänta några sekunder.</li>
          <li>Ladda ner APK-filen direkt till din enhet.</li>
        </ol>
        <p>
          Den här metoden fungerar med alla offentliga appar i Google Play Store och är helt gratis. Ingen
          registrering eller extra programvara krävs.
        </p>

        <h2>Metod 2: Använd ADB (För utvecklare)</h2>
        <p>
          Om du är utvecklare eller avancerad användare kan du extrahera APK-filer med Android Debug Bridge
          (ADB). Detta kräver en dator och att USB-felsökning är aktiverat.
        </p>
        <pre><code>{`// 1. Kontrollera att enheten är ansluten
adb devices

// 2. Lista alla installerade appar (leta efter önskat paket)
adb shell pm list packages | grep appnamn

// 3. Hämta APK-sökvägen
adb shell pm path com.exempel.app

// 4. Ladda ner APK till datorn
adb pull /data/app/com.exempel.app-xxx/base.apk`}</code></pre>
        <p>
          När du har laddat ner kan du dela APK:n, installera den på andra enheter eller spara den som
          säkerhetskopia. Den här metoden fungerar utan root och ger dig full kontroll.
        </p>

        <h2>Metod 3: APK Extractor-appar</h2>
        <p>
          Om du föredrar en lösning direkt på telefonen utan dator kan du använda appar som APK Extractor
          eller ML Manager från Play Store. Dessa appar hittar automatiskt alla installerade appar och
          exporterar APK med ett tryck.
        </p>
        <ul>
          <li>
            <strong>APK Extractor:</strong> Enkel och lättviktig. Välj appen och tryck på &quot;Extract&quot;.
          </li>
          <li>
            <strong>ML Manager:</strong> Erbjuder även backup-hantering och delning via Wi-Fi Direct.
          </li>
        </ul>

        <h2>Vanliga frågor</h2>
        <h3>Är det lagligt att ladda ner APK från Google Play?</h3>
        <p>
          Ja, att ladda ner APK för gratisappar för personligt bruk är lagligt. För betalappar måste du ha
          köpt dem reguljärt. Att extrahera APK för backup-ändamål är tillåtet enligt Googles villkor.
        </p>
        <h3>Behöver jag root?</h3>
        <p>
          Nej. Alla metoder som beskrivs här fungerar utan root. För att ladda ner APK krävs inga
          administratörsrättigheter på enheten.
        </p>
        <h3>Varför installeras vissa APK-filer inte?</h3>
        <p>
          Du måste förmodligen aktivera installation från okända källor. Gå till Inställningar &gt;
          Säkerhet &gt; Okända källor och aktivera det. På Android 8+ är denna inställning per app.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Prova gptoapk.com nu 🚀</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Det snabbaste verktyget för att ladda ner APK från Google Play. Klistra in länken, ladda ner
            APK med ett klick. Gratis, ingen registrering, ingen installation.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Ladda ner APK nu →
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
    title: "Vad är en APK-fil? Komplett Guide till Android-paket",
    description:
      "Allt du behöver veta om APK-filer: vad de innehåller, hur de fungerar, skillnaden mellan APK och AAB, hur du kontrollerar integritet och varför säkerhet är viktigt. För nybörjare och experter.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Nybörjarguide"],
    content: (
      <>
        <p>
          APK står för <strong>Android Package Kit</strong>. Det är filformatet som Android använder för
          att distribuera och installera appar. Varje app du installerar på din Android-telefon är förpackad
          i en APK-fil (eller det nyare AAB-formatet). I den här guiden går vi igenom strukturen,
          funktionen och betydelsen av APK-filer på djupet.
        </p>

        <h2>Vad innehåller en APK-fil?</h2>
        <p>
          En APK-fil är i grunden ett ZIP-arkiv med en specifik struktur. Inuti hittar du:
        </p>
        <ul>
          <li>
            <strong>AndroidManifest.xml:</strong> Appens hjärta. Innehåller paketnamnet, behörigheter,
            activities, services och broadcast receivers.
          </li>
          <li>
            <strong>classes.dex:</strong> Appens körbara kod i Dalvik Executable (DEX)-format. Här finns
            applikationens logik.
          </li>
          <li>
            <strong>res/:</strong> Appens resurser: XML-layouter, bilder, ikoner, lokaliserade textsträngar,
            teman och mycket mer.
          </li>
          <li>
            <strong>lib/:</strong> Native-bibliotek skrivna i C/C++ för specifika arkitekturer
            (armeabi-v7a, arm64-v8a, x86, x86_64).
          </li>
          <li>
            <strong>META-INF/:</strong> De digitala signaturfilerna som garanterar APK:ns integritet och
            autenticitet. Innehåller MANIFEST.MF, CERT.SF och CERT.RSA.
          </li>
          <li>
            <strong>assets/:</strong> Extra resurser tillgängliga via AssetManager-API:et.
          </li>
        </ul>

        <h2>APK vs AAB: Vad är skillnaden?</h2>
        <p>
          Sedan 2021 kräver Google formatet <strong>Android App Bundle (AAB)</strong> för publicering i
          Play Store. En AAB är inte direkt installerbar: Google Play bearbetar den och genererar
          optimerade APK:er för varje enhet (split APK). Fördelarna med AAB är:
        </p>
        <ul>
          <li>Mindre appar: användaren laddar bara ner de resurser som enheten behöver.</li>
          <li>Stöd för dynamiska moduler (asset packs, funktioner på begäran).</li>
          <li>Effektivare uppdateringar med Delta-patcher.</li>
        </ul>
        <p>
          APK förblir dock det universella formatet för direktinstallation (sideloading). Du kan
          konvertera en AAB till APK med verktyg som <code>bundletool</code> från Google.
        </p>

        <h2>Kontrollera APK-integritet</h2>
        <p>
          Att ladda ner APK från inofficiella källor kan vara riskabelt. Så här kontrollerar du om en APK
          är autentisk:
        </p>
        <pre><code>{`// Kontrollera den digitala signaturen
keytool -printcert -jarfile app.apk

// Kontrollera SHA-256-hash
sha256sum app.apk

# Jämför med den officiella hashen (om tillgänglig)`}</code></pre>
        <p>
          En APK signerad med ett giltigt certifikat är nästan säkert autentisk. Var försiktig med APK:er
          från okända källor eller med avvikande hashvärden.
        </p>

        <h2>Vanliga frågor</h2>
        <h3>Kan jag öppna en APK för att se vad den innehåller?</h3>
        <p>
          Ja. Byt filändelsen från <code>.apk</code> till <code>.zip</code> och öppna den med ett
          arkivprogram. Du kan bläddra bland resurserna, men DEX-koden kräver decompileringsverktyg som
          JADX eller APKTool för att bli läsbar.
        </p>
        <h3>Vad står APK för?</h3>
        <p>
          APK står för <strong>Android Package Kit</strong> (eller Android Package-fil). Det är
          standardformatet för appdistribution på Android.
        </p>
        <h3>Är APK-filer säkra?</h3>
        <p>
          Det beror på källan. APK:er från pålitliga källor som Google Play eller gptoapk.com är säkra.
          Undvik misstänkta webbplatser och kontrollera alltid den digitala signaturen.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Ladda ner APK säkert 🛡️</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Ladda ner APK från Google Play snabbt och säkert. Direktlänk, inga påträngande annonser,
            ingen risk för din integritet. Prova nu.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Gå till gptoapk.com →
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "safe-reliable-apk-download-sites",
    title: "7 Säkra och Pålitliga APK-nedladdningssajter (Testade 2026)",
    description:
      "Alla APK-nedladdningssajter är inte säkra. Här är 7 verifierade källor för nedladdning av Android APK-filer, testade och rankade efter säkerhet och tillförlitlighet.",
    date: "2026-05-11",
    readTime: "8 min",
    tags: ["Säkra APK", "APK-sajter", "gptoapk.com", "APKMirror"],
    content: (
      <>
        <p>
          Google Play Store är den säkraste källan för Android-appar. Det finns dock många legitima skäl
          att ladda ner APK-filer från tredjepartskällor — Google Play är inte tillgängligt på vissa
          enheter, behov av att återgå till en äldre version, regionala begränsningar eller testning
          av olika versioner för utvecklare.
        </p>
        <p>
          Problemet är att tredjeparts-APK-sajter är ett minfält. Nedladdning från fel källa kan leda
          till malware, adware eller spyware. Efter noggranna tester har vi sammanställt 7 säkra och
          pålitliga källor för APK-nedladdning.
        </p>

        <h2>1. gptoapk.com — Direkt från Google Play (Bäst Totalt)</h2>
        <p>
          <a href="https://gptoapk.com">gptoapk.com</a> är inte en traditionell APK-spegel — det är ett
          verktyg som hämtar APK-filer direkt från Google Plays officiella servrar.
        </p>
        <ul>
          <li><strong>100% officiell källa:</strong> inga APK-filer lagras, hämtas direkt från Google Plays CDN</li>
          <li><strong>Ingen registrering:</strong> bara klistra in en Google Play-länk</li>
          <li><strong>Snabba nedladdningar:</strong> använder Googles globala CDN-infrastruktur</li>
          <li><strong>Alltid uppdaterad:</strong> hämtar senaste versionen varje gång</li>
        </ul>
        <p><strong>Bäst för:</strong> alla behov av APK-nedladdning från Google Play</p>

        <h2>2. APKMirror — Guldstandarden för Verifierade APK</h2>
        <p>
          APKMirror anses allmänt vara den mest pålitliga APK-spegeln, driven av Android Police-teamet.
          Varje APK genomgår signaturverifiering (överensstämmelse med Google Plays signatur), erbjuder
          versionshistorik och ett rent gränssnitt utan vilseledande knappar.
        </p>

        <h2>3. APKPure — Fullfjädrad Appbutiksalternativ</h2>
        <p>
          APKPure fungerar som en komplett tredjepartsappbutik som erbjuder APK-nedladdningar för globala
          appar. Stöder XAPK-format (APK + OBB-data), flerspråkiga beskrivningar och uppdateringsnotiser.
          Ladda bara ner från den officiella webbplatsen.
        </p>

        <h2>4. F-Droid — Open Source-skatten</h2>
        <p>
          För open source-appar på Android är F-Droid oöverträffad. Varje app har verifierbar källkod,
          APK:er signerade med utvecklarnycklar, inga annonser eller spårning. Inkluderar en inbyggd
          appbutiksklient.
        </p>

        <h2>5. GitHub Releases — Direktdistribution från Utvecklare</h2>
        <p>
          Många open source Android-appar distribuerar APK via GitHub Releases. Nedladdningar kommer
          direkt från utvecklarnas arkiv, och GitHub CDN är säker och pålitlig. Versionsanteckningar
          och ändringsloggar ingår alltid.
        </p>

        <h2>6. Aptoide — Decentraliserad Appbutik</h2>
        <p>
          Aptoide är en decentraliserad Android-appbutik där vem som helst kan skapa sin egen kanal.
          Decentraliserad arkitektur eliminerar enskilda felpunkter. Använd officiella eller högt
          rankade kanaler.
        </p>

        <h2>7. Uptodown — En Beprövad Veteran</h2>
        <p>
          Uptodown har funnits sedan 2002 och erbjuder programvara för Windows, Mac och Android. Erbjuder
          flera versioner av varje app med detaljerade anteckningar och skärmdumpar. Uppger sig skanna
          uppladdade filer för malware.
        </p>

        <h2>Säkerhetschecklista för APK</h2>
        <p><strong>Innan nedladdning:</strong> kontrollera domänen, läs användarkommentarer, jämför filstorlek.</p>
        <p><strong>Efter nedladdning:</strong></p>
        <pre><code>{`// Verifiera den digitala signaturen
keytool -printcert -jarfile app.apk

// Skanna med VirusTotal — ladda upp APK för flermotorskanning

// Granska behörigheter — en ficklampa behöver inte åtkomst till kontakter`}</code></pre>
        <p><strong>Före installation:</strong> aktivera &quot;Okända källor&quot; endast för installation, undvik &quot;moddade&quot; eller &quot;knäckta&quot; APK.</p>

        <h2>Sammanfattning</h2>
        <p>
          För den säkraste APK-nedladdningen: första valet är <a href="https://gptoapk.com">gptoapk.com</a> —
          direkt från Google Play, ingen fillagring, ingen risk för manipulering. Andra valet är APKMirror
          med signaturverifiering. För open source-appar — F-Droid eller GitHub Releases. Undvik slumpmässiga
          forumlänkar och otestade speglar.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Ladda ner APK direkt från Google Play — Ingen Registrering</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — Klistra in en Google Play-länk och få APK direkt. Inga annonser, ingen registrering.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Prova gptoapk.com →
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "apk-vs-aab-complete-comparison",
    title: "APK vs AAB: Fullständig Jämförelse och Guide (2026)",
    description:
      "APK vs Android App Bundle (AAB) — vad är skillnaden och varför spelar det roll? En fullständig jämförelse av båda formaten, hur AAB förändrar appdistribution och vad det innebär för användare och utvecklare.",
    date: "2026-05-11",
    readTime: "8 min",
    tags: ["APK vs AAB", "Android App Bundle", "APK-format", "AAB-format"],
    content: (
      <>
        <p>
          Google Play kräver nu att alla nya appar publiceras som Android App Bundles (AAB). Vad betyder
          detta för utvecklare? Påverkar det vanliga användare? Den här guiden täcker allt du behöver
          veta.
        </p>

        <h2>Vad är APK?</h2>
        <p>
          APK (Android Package Kit) har varit standard installationsformat sedan Android 1.0. En typisk
          APK-fil innehåller:
        </p>
        <pre><code>{`app.apk
├── AndroidManifest.xml      // Appmanifest (behörigheter, komponenter)
├── classes.dex              // DEX-bytecode (kompilerad Java/Kotlin-kod)
├── classes2.dex / classes3.dex
├── res/                     // Resurser (layouter, bilder, strängar)
├── lib/                     // Native-bibliotek (armeabi-v7a, arm64-v8a, x86)
├── assets/                  // Råa tillgångsfiler
├── META-INF/                // Signatur- och certifikatinformation
│   ├── MANIFEST.MF
│   ├── CERT.RSA
│   └── CERT.SF
└── resources.arsc           // Kompilerad resursindexstabell`}</code></pre>
        <p>
          APK är självförsörjande — alla resurser för alla enhetskonfigurationer är paketerade tillsammans.
          Det innebär större filstorlekar men universell kompatibilitet.
        </p>

        <h2>Vad är AAB?</h2>
        <p>
          AAB (Android App Bundle) introducerades av Google 2021 som det nya publiceringsformatet för
          Google Play. Till skillnad från APK är AAB inte ett installationspaket — det är ett
          publiceringspaket som innehåller all kod och alla resurser. Google Play genererar dynamiskt
          optimerade APK under distributionen.
        </p>
        <pre><code>{`app.aab
├── base/
│   ├── manifest/
│   ├── dex/
│   ├── res/
│   ├── assets/
│   └── lib/
├── feature1/                // Moduler som levereras på begäran
├── feature2/
└── BundleConfig.pb          // Konfigurationsfil`}</code></pre>

        <h2>APK vs AAB: Jämförelse</h2>
        <ul>
          <li><strong>Installation:</strong> APK — direkt; AAB — kräver Google Play + bundletool</li>
          <li><strong>Filstorlek:</strong> APK — större (alla resurser); AAB — mindre (okomprimerad källa)</li>
          <li><strong>Nedladdningsstorlek:</strong> APK — fullt paket; AAB — optimerad av Google Play</li>
          <li><strong>Sideloading:</strong> APK — fullt stödd; AAB — kräver konverteringsverktyg</li>
          <li><strong>Google Play-krav:</strong> APK — standard före 2018; AAB — obligatoriskt från augusti 2021</li>
        </ul>

        <h2>Hur Konverterar Man AAB till APK?</h2>
        <p><strong>Metod 1: Använd bundletool</strong></p>
        <pre><code>{`// Installera bundletool (macOS)
brew install bundletool

// Generera universell APK-uppsättning
java -jar bundletool.jar build-apks \\
  --bundle=/sokvag/till/app.aab \\
  --output=/sokvag/till/app.apks \\
  --ks=/sokvag/till/keystore.jks \\
  --ks-pass=pass:ditt_losenord

// Installera på ansluten enhet
java -jar bundletool.jar install-apks \\
  --apks=/sokvag/till/app.apks`}</code></pre>

        <h2>Vanliga Frågor</h2>
        <p><strong>Är AAB framtiden?</strong> Ja. Google främjar AAB som standard publiceringsformat för Google Play, och nya funktioner som Instant Apps och moduler på begäran är beroende av det.</p>
        <p><strong>Behövs APK fortfarande?</strong> Absolut. AAB är begränsat till distribution via Google Play. För sideloading, företagsdistribution och AOSP-enheter förblir APK oumbärligt.</p>
        <p><strong>Kan jag installera AAB manuellt?</strong> Inte direkt. Du behöver bundletool eller liknande verktyg för att först generera ett installationsbart APK.</p>
        <p><strong>Hur får jag äldre APK-versioner?</strong> Använd <a href="https://gptoapk.com">gptoapk.com</a> för senaste versionen direkt från Google Play. För äldre versioner, kolla APKMirror.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Hämta APK-filer Online — Inga Verktyg Behövs</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — Klistra in valfri Google Play-länk för att ladda ner motsvarande APK. Stöder alla appversioner.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Prova gptoapk.com →
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
      canonical: `https://gptoapk.com/sv/blog/${slug}`,
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
    url: `https://gptoapk.com/sv/blog/${slug}`,
    inLanguage: "sv",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/sv/blog/${slug}`,
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
          href="/sv/blog"
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
          ← Tillbaka till bloggen
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
            href="/sv/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Tillbaka till bloggen
          </Link>
        </div>
      </article>
    </>
  );
}
