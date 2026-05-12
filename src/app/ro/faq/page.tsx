import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Instrument online gratuit pentru a obține fișiere APK din linkuri Google Play. Lipește URL-ul sau ID-ul aplicației și generează linkul de descărcare.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Ce este gptoapk.com?",
      a: "gptoapk.com este un instrument online gratuit care generează linkuri de descărcare APK direct din Google Play Store. Lipește un URL Google Play sau un nume de pachet și primește un link direct.",
    },
    {
      q: "Este gratuit?",
      a: "Da, complet gratuit. Fără înregistrare, fără taxe ascunse sau planuri premium.",
    },
    {
      q: "Cum funcționează?",
      a: "Când lipești un link Google Play, serverul nostru preia fișierul APK din CDN-ul Google și îți oferă linkul de descărcare. Nu modificăm și nu stocăm fișierele.",
    },
    {
      q: "Este sigur să descarci de pe gptoapk.com?",
      a: "Da. Fișierele provin direct de la serverele Google; nu le atingem, deci primești APK-uri originale.",
    },
    {
      q: "Pot folosi pe telefon?",
      a: "Da. Deschide gptoapk.com în browserul mobil și lipește linkul — funcționează pe telefon și computer.",
    },
    {
      q: "Funcționează pentru aplicații plătite?",
      a: "Da, dar trebuie să fi cumpărat aplicația pe contul tău Google pentru ca linkul să fie valid.",
    },
    {
      q: "Trebuie să instalăm software sau extensii?",
      a: "Nu. Totul rulează în browser — fără descărcări suplimentare, extensii sau pluginuri.",
    },
    {
      q: "Pot folosi din orice țară?",
      a: "Da, gptoapk.com funcționează la nivel mondial. Unele aplicații pot fi restricționate regional în Play Store.",
    },
    {
      q: "Care este diferența dintre APK și AAB?",
      a: "APK este formatul de instalare pentru Android. AAB este formatul de publicare pentru Google Play. Oferim un APK compatibil chiar dacă aplicația este publicată ca AAB.",
    },
    {
      q: "De ce uneori primesc 404?",
      a: "Aplicația poate fi blocată regional, eliminată din Play sau incompatibilă cu dispozitivul tău. Pentru restricții regionale poți încerca un VPN.",
    },
    {
      q: "Este legal să descarci APK din Play?",
      a: "Pentru uz personal, testare și backup de obicei da. Revânzarea aplicațiilor plătite sau a materialelor protejate fără permisiune este ilegală.",
    },
    {
      q: "Este gptoapk.com afiliat cu Google?",
      a: "Nu. Este un instrument independent și nu este afiliat cu Google sau Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Întrebări frecvente</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Tot ce trebuie să știi despre gptoapk.com și descărcarea APK din Google Play.</p>
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
        <h2 className="text-2xl font-bold mb-3">Ai alte întrebări?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Încearcă{" "}
          <Link href="/ro" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          sau vezi{" "}
          <Link href="/ro/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blogul</Link>.
        </p>
      </div>
    </div>
  );
}
