import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Ilmainen verkkotyökalu APK-tiedostojen hakemiseen Google Play -linkeistä. Liitä URL tai sovellustunnus ja luo latauslinkki.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Mikä on gptoapk.com?",
      a: "gptoapk.com on ilmainen verkkotyökalu APK-latauslinkkien luomiseen suoraan Google Play Kaupasta. Liitä Google Play -URL tai paketin nimi ja saat suoran linkin heti.",
    },
    {
      q: "Onko se ilmainen?",
      a: "Kyllä, täysin ilmainen. Ei rekisteröitymistä, piilokuluja tai premium-tilauksia.",
    },
    {
      q: "Miten se toimii?",
      a: "Kun liität Google Play -linkin, palvelimemme hakee APK-tiedoston Googlen CDN:stä ja antaa latauslinkin. Emme muuta tai tallenna tiedostoja.",
    },
    {
      q: "Onko gptoapk.comista lataaminen turvallista?",
      a: "Kyllä. Tiedostot tulevat suoraan Googlen palvelimilta; emme muuta niitä, joten saat alkuperäiset APK:t.",
    },
    {
      q: "Voinko käyttää puhelimella?",
      a: "Kyllä. Avaa gptoapk.com mobiiliselaimessa ja liitä linkki — toimii puhelimella ja tietokoneella.",
    },
    {
      q: "Toimiiko maksullisille sovelluksille?",
      a: "Kyllä, mutta sinun on ostettava sovellus Google-tililläsi, jotta linkki on kelvollinen.",
    },
    {
      q: "Tarvitsenko ohjelmia tai laajennuksia?",
      a: "Ei. Kaikki tapahtuu selaimessa — ei lisälatauksia, laajennuksia tai plugineja.",
    },
    {
      q: "Toimiiko kaikista maista?",
      a: "Kyllä, gptoapk.com toimii maailmanlaajuisesti. Jotkin sovellukset voivat olla aluerajoitettuja Playssa.",
    },
    {
      q: "Mitä eroa on APK:lla ja AAB:lla?",
      a: "APK on Androidin asennusformaatti. AAB on Google Playn julkaisumuoto. Tarjoamme yhteensopivan APK:n myös kun sovellus julkaistaan AAB:na.",
    },
    {
      q: "Miksi joskus saan 404?",
      a: "Sovellus voi olla aluelukittu, poistettu Playsta tai vaatia tietyn laitteen. Aluerajoituksessa VPN voi auttaa.",
    },
    {
      q: "Onko APK:n lataaminen Playsta laillista?",
      a: "Henkilökohtaiseen käyttöön, testaukseen ja varmuuskopioihin yleensä kyllä. Maksullisten sovellusten tai tekijänoikeudellisen materiaalin levittäminen ilman lupaa on laitonta.",
    },
    {
      q: "Onko gptoapk.com sidoksissa Googleen?",
      a: "Ei. Se on itsenäinen työkalu eikä ole sidoksissa Googleen tai Google Playhin.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Usein kysytyt kysymykset</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Kaikki tarpeellinen gptoapk.comista ja APK-latauksista Google Playsta.</p>
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
        <h2 className="text-2xl font-bold mb-3">Lisää kysyttävää?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Kokeile{" "}
          <Link href="/fi" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          tai katso{" "}
          <Link href="/fi/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blogi</Link>.
        </p>
      </div>
    </div>
  );
}
