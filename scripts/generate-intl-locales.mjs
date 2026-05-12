/**
 * One-off generator: fills layout/page/blog/faq for batch locales (cloned from it with paths fixed).
 * Run: node scripts/generate-intl-locales.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import EXTRA from "./locale-packs-extra.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(__dirname, "../src/app");

/** Emit safe JSX text expression */
function jsxText(s) {
  return `{${JSON.stringify(s)}}`;
}

const LOCALES = {
  ...EXTRA,
  da: {
    title: "Download APK fra Google Play | gptoapk.com",
    desc: "Gratis onlineværktøj til at hente APK-filer fra Google Play-links. Indsæt URL eller app-ID og generer downloadlink.",
    hero: "Download APK direkte fra Google Play Store. Indsæt Play-linket eller app-ID nedenfor og opret downloadlinket med det samme.",
    f1t: "Hurtig download",
    f1d: "Opret downloadlinks på få sekunder — indsæt et Play Store-link eller pakkenavn.",
    f2t: "100 % sikkert",
    f2d: "Filer hentes direkte fra Googles CDN — ingen mellemled og ingen ændringer.",
    f3t: "Ingen registrering",
    f3d: "Gratis, ingen konto og ingen captcha. Virker i browseren på computer og mobil.",
    how: "Sådan virker det",
    s1t: "Kopiér Google Play-link",
    s1d: "Find appen i Play Store og kopiér URL'en fra adresselinjen, eller brug pakkenavnet (f.eks. com.example.app).",
    s2t: "Indsæt og generér",
    s2d: "Indsæt link eller pakkenavn i feltet ovenfor og klik for at generere. APK hentes fra Googles servere i realtid.",
    s3t: "Download og installer",
    s3d: "Downloadlinket er klar — gem APK-filen på din Android-enhed og installer appen.",
    blogTitle: "Blog APK Downloader",
    blogDesc:
      "Vi forbereder artikler på dansk. Du kan allerede læse den engelske blog med fulde guides.",
    blogBtn: "Åbn blog (engelsk)",
    homeBtn: "Til forsiden",
    ctaTitle: "Mer om APK",
    ctaBlogBtn: "Til bloggen",
    blogMeta:
      "Guides om APK-download fra Google Play. Dansk indhold er på vej; læs den engelske blog indtil da.",
    faqTitle: "Ofte stillede spørgsmål",
    faqIntro: "Alt om brug af gptoapk.com og APK-download fra Google Play.",
    faqFooterQ: "Flere spørgsmål?",
    faqFooterTry: "Prøv",
    faqFooterOr: "eller se",
    faqFooterBlog: "bloggen",
    faqs: [
      ["Hvad er gptoapk.com?", "gptoapk.com er et gratis onlineværktøj til at oprette APK-downloadlinks direkte fra Google Play Store. Indsæt en Google Play-URL eller et pakkenavn og få et direkte link med det samme."],
      ["Er det gratis?", "Ja, helt gratis. Ingen registrering, ingen skjulte gebyrer og ingen premiumplaner."],
      ["Hvordan virker det?", "Når du indsætter et Google Play-link, henter vores server APK-filen fra Googles CDN og giver dig et downloadlink. Vi ændrer eller gemmer ikke filerne."],
      ["Er det sikkert at downloade fra gptoapk.com?", "Ja. Filer kommer direkte fra Googles servere; vi rører dem ikke, så du får originale APK-filer."],
      ["Kan jeg bruge det på mobilen?", "Ja. Åbn gptoapk.com i mobilbrowseren og indsæt linket — virker på både telefon og computer."],
      ["Virker det til betalingsapper?", "Ja, men du skal have købt appen på din Google-konto, for at linket er gyldigt."],
      ["Skal jeg installere software eller udvidelser?", "Nej. Alt foregår i browseren — ingen ekstra downloads, udvidelser eller plugins."],
      ["Kan jeg bruge det fra ethvert land?", "Ja, gptoapk.com virker over hele verden. Nogle apps kan dog være regionsbegrænsede i Play Store."],
      ["Hvad er forskellen på APK og AAB?", "APK er installationsformatet til Android. AAB er publiceringsformat til Google Play. Vi leverer en kompatibel APK, også når appen publiceres som AAB."],
      ["Hvorfor får jeg nogle gange 404?", "Appen kan være regionslåst, fjernet fra Play eller kræve bestemt enhed. Ved regionsbegrænsning kan VPN hjælpe."],
      ["Er det lovligt at downloade APK fra Play?", "Til personlig brug, test og backup som regel ja. Videresalg af betalingsapps eller ophavsretsbeskyttet materiale uden tilladelse er ulovligt."],
      ["Er gptoapk.com tilknyttet Google?", "Nej. Det er et uafhængigt værktøj og ikke tilknyttet Google eller Google Play."],
    ],
  },
  fi: {
    title: "Lataa APK Google Playsta | gptoapk.com",
    desc: "Ilmainen verkkotyökalu APK-tiedostojen hakemiseen Google Play -linkeistä. Liitä URL tai sovellustunnus ja luo latauslinkki.",
    hero: "Lataa APK suoraan Google Play Kaupasta. Liitä Play-linkki tai sovellustunnus alle ja luo latauslinkki heti.",
    f1t: "Nopea lataus",
    f1d: "Luo latauslinkkejä sekunneissa — liitä Play Kaupan linkki tai paketin nimi.",
    f2t: "Turvallinen",
    f2d: "Tiedostot haetaan suoraan Googlen CDN:stä — ei välikäsiä eikä muutoksia.",
    f3t: "Ei rekisteröitymistä",
    f3d: "Ilmainen, ei tiliä eikä captchaa. Toimii selaimessa työpöydällä ja mobiilissa.",
    how: "Näin se toimii",
    s1t: "Kopioi Google Play -linkki",
    s1d: "Etsi sovellus Play Kaupasta ja kopioi URL osoitepalkista tai käytä paketin nimeä (esim. com.example.app).",
    s2t: "Liitä ja luo",
    s2d: "Liitä linkki tai paketti yllä olevaan kenttään ja napsauta luodaksesi linkin. APK haetaan Googlen palvelimilta reaaliajassa.",
    s3t: "Lataa ja asenna",
    s3d: "Latauslinkki on valmis — tallenna APK Android-laitteellesi ja asenna sovellus.",
    blogTitle: "Blogi APK Downloader",
    blogDesc: "Valmistelemme suomenkielisiä artikkeleita. Voit jo lukea englanninkielistä blogia täydellisillä oppaille.",
    blogBtn: "Avaa blogi (englanti)",
    homeBtn: "Etusivulle",
    ctaTitle: "Lisää APK-aiheista",
    ctaBlogBtn: "Blogiin",
    blogMeta:
      "Oppaita APK-latauksesta Google Playsta. Suomenkielinen sisältö tulossa; lue toistaiseksi englanninkielinen blogi.",
    faqTitle: "Usein kysytyt kysymykset",
    faqIntro: "Kaikki tarpeellinen gptoapk.comista ja APK-latauksista Google Playsta.",
    faqFooterQ: "Lisää kysyttävää?",
    faqFooterTry: "Kokeile",
    faqFooterOr: "tai katso",
    faqFooterBlog: "blogi",
    faqs: [
      ["Mikä on gptoapk.com?", "gptoapk.com on ilmainen verkkotyökalu APK-latauslinkkien luomiseen suoraan Google Play Kaupasta. Liitä Google Play -URL tai paketin nimi ja saat suoran linkin heti."],
      ["Onko se ilmainen?", "Kyllä, täysin ilmainen. Ei rekisteröitymistä, piilokuluja tai premium-tilauksia."],
      ["Miten se toimii?", "Kun liität Google Play -linkin, palvelimemme hakee APK-tiedoston Googlen CDN:stä ja antaa latauslinkin. Emme muuta tai tallenna tiedostoja."],
      ["Onko gptoapk.comista lataaminen turvallista?", "Kyllä. Tiedostot tulevat suoraan Googlen palvelimilta; emme muuta niitä, joten saat alkuperäiset APK:t."],
      ["Voinko käyttää puhelimella?", "Kyllä. Avaa gptoapk.com mobiiliselaimessa ja liitä linkki — toimii puhelimella ja tietokoneella."],
      ["Toimiiko maksullisille sovelluksille?", "Kyllä, mutta sinun on ostettava sovellus Google-tililläsi, jotta linkki on kelvollinen."],
      ["Tarvitsenko ohjelmia tai laajennuksia?", "Ei. Kaikki tapahtuu selaimessa — ei lisälatauksia, laajennuksia tai plugineja."],
      ["Toimiiko kaikista maista?", "Kyllä, gptoapk.com toimii maailmanlaajuisesti. Jotkin sovellukset voivat olla aluerajoitettuja Playssa."],
      ["Mitä eroa on APK:lla ja AAB:lla?", "APK on Androidin asennusformaatti. AAB on Google Playn julkaisumuoto. Tarjoamme yhteensopivan APK:n myös kun sovellus julkaistaan AAB:na."],
      ["Miksi joskus saan 404?", "Sovellus voi olla aluelukittu, poistettu Playsta tai vaatia tietyn laitteen. Aluerajoituksessa VPN voi auttaa."],
      ["Onko APK:n lataaminen Playsta laillista?", "Henkilökohtaiseen käyttöön, testaukseen ja varmuuskopioihin yleensä kyllä. Maksullisten sovellusten tai tekijänoikeudellisen materiaalin levittäminen ilman lupaa on laitonta."],
      ["Onko gptoapk.com sidoksissa Googleen?", "Ei. Se on itsenäinen työkalu eikä ole sidoksissa Googleen tai Google Playhin."],
    ],
  },
};

function layoutTpl(loc, L) {
  return `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: ${JSON.stringify(L.title)},
    template: "%s | APK Downloader | gptoapk.com",
  },
  description: ${JSON.stringify(L.desc)},
  alternates: {
    canonical: "https://gptoapk.com/${loc}",
    languages: {
      en: "https://gptoapk.com/en",
      ${loc}: "https://gptoapk.com/${loc}",
      "x-default": "https://gptoapk.com/en",
    },
  },
};

export default function RootLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
}

function pageTpl(loc, L) {
  return `import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          ${jsxText(L.hero)}
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">${jsxText(L.f1t)}</h3>
          <p className="text-slate-600 dark:text-slate-400">${jsxText(L.f1d)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">${jsxText(L.f2t)}</h3>
          <p className="text-slate-600 dark:text-slate-400">${jsxText(L.f2d)}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">${jsxText(L.f3t)}</h3>
          <p className="text-slate-600 dark:text-slate-400">${jsxText(L.f3d)}</p>
        </div>
      </div>

      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">${jsxText(L.how)}</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">${jsxText(L.s1t)}</h3>
              <p className="text-slate-600 dark:text-slate-400">${jsxText(L.s1d)}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">${jsxText(L.s2t)}</h3>
              <p className="text-slate-600 dark:text-slate-400">${jsxText(L.s2d)}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">${jsxText(L.s3t)}</h3>
              <p className="text-slate-600 dark:text-slate-400">${jsxText(L.s3d)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">${jsxText(L.ctaTitle)}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">${jsxText(L.blogDesc)}</p>
        <Link href="/${loc}/blog" className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">
          ${jsxText(L.ctaBlogBtn)}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
`;
}

function blogTpl(loc, L) {
  return `import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - APK Downloader | gptoapk.com",
  description: ${JSON.stringify(L.blogMeta)},
  alternates: {
    canonical: "https://gptoapk.com/${loc}/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      ${loc}: "https://gptoapk.com/${loc}/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">${L.blogTitle}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">${L.blogDesc}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/en/blog" className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">${L.blogBtn}</Link>
        <Link href="/${loc}" className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 font-medium px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">${L.homeBtn}</Link>
      </div>
    </div>
  );
}
`;
}

function faqTpl(loc, L) {
  const items = L.faqs
    .map(
      ([q, a]) => `    {
      q: ${JSON.stringify(q)},
      a: ${JSON.stringify(a)},
    }`,
    )
    .join(",\n");
  return `import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: ${JSON.stringify(L.desc)},
};

export default function FAQPage() {
  const faqs = [
${items}
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">${L.faqTitle}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">${L.faqIntro}</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">{faq.a}</div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">${L.faqFooterQ}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          ${L.faqFooterTry}{" "}
          <Link href="/${loc}" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          ${L.faqFooterOr}{" "}
          <Link href="/${loc}/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">${L.faqFooterBlog}</Link>.
        </p>
      </div>
    </div>
  );
}
`;
}

for (const [loc, data] of Object.entries(LOCALES)) {
  const base = path.join(APP, loc);
  fs.mkdirSync(path.join(base, "faq"), { recursive: true });
  fs.mkdirSync(path.join(base, "blog", "[slug]"), { recursive: true });
  fs.writeFileSync(path.join(base, "layout.tsx"), layoutTpl(loc, data));
  fs.writeFileSync(path.join(base, "page.tsx"), pageTpl(loc, data));
  fs.writeFileSync(path.join(base, "blog", "page.tsx"), blogTpl(loc, data));
  fs.writeFileSync(path.join(base, "faq", "page.tsx"), faqTpl(loc, data));
}

console.log("Wrote:", Object.keys(LOCALES).join(", "));
