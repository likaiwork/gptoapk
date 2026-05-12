import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "Domande frequenti sul download di APK da Google Play con gptoapk.com: sicurezza, funzionamento e risoluzione problemi.",
};

export default function ItFAQPage() {
  const faqs = [
    {
      q: "Cos'è gptoapk.com?",
      a: "gptoapk.com è uno strumento online gratuito per generare link di download APK direttamente dal Google Play Store. Incolla un URL Google Play o un nome pacchetto e ottieni subito un link diretto.",
    },
    {
      q: "È davvero gratuito?",
      a: "Sì, completamente gratuito. Nessuna registrazione, costi nascosti o piani premium.",
    },
    {
      q: "Come funziona?",
      a: "Quando incolli un link Google Play, il nostro server recupera il file APK dalla CDN di Google e ti fornisce il link di download. Non modifichiamo né archiviamo i file.",
    },
    {
      q: "È sicuro scaricare APK da gptoapk.com?",
      a: "Sì. I file provengono direttamente dai server Google; non li alteriamo, quindi ottieni APK originali e verificati.",
    },
    {
      q: "Posso usarlo sul telefono?",
      a: "Certo. Apri gptoapk.com nel browser mobile, incolla il link e procedi. Funziona su smartphone e computer.",
    },
    {
      q: "Funziona con le app a pagamento?",
      a: "Sì, ma devi aver già acquistato l’app con il tuo account Google perché il link generato sia valido.",
    },
    {
      q: "Devo installare software o estensioni?",
      a: "No. Tutto avviene nel browser: nessun download obbligatorio, estensioni o plugin.",
    },
    {
      q: "Posso usarlo da qualsiasi paese?",
      a: "Sì, gptoapk.com è utilizzabile in tutto il mondo. Alcune app possono però essere limitate per regione sul Play Store.",
    },
    {
      q: "Qual è la differenza tra APK e AAB?",
      a: "L’APK è il formato installabile su Android. L’AAB (Android App Bundle) è il formato di pubblicazione su Google Play. Il nostro servizio fornisce comunque un APK compatibile quando l’app è pubblicata come AAB.",
    },
    {
      q: "Perché alcune app danno errore 404?",
      a: "L’app può essere region-locked, rimossa dal Play Store o richiedere dispositivi specifici. Se è un limite di regione, prova una VPN.",
    },
    {
      q: "Scaricare APK dal Play Store è legale?",
      a: "Per uso personale, test e backup di solito sì. Rivendere o ridistribuire app a pagamento o materiale protetto senza permesso è illegale.",
    },
    {
      q: "gptoapk.com è affiliato a Google?",
      a: "No. È uno strumento indipendente e non è affiliato a Google o Google Play.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Domande frequenti</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Tutto ciò che serve sapere per usare gptoapk.com e scaricare APK dal Google Play Store.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">Hai altre domande?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Prova l&apos;
          <Link href="/it" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          o consulta il{" "}
          <Link href="/it/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
