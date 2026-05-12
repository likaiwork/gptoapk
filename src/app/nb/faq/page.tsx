import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Gratis nettverktøy for å hente APK-filer fra Google Play-lenker. Lim inn URL eller app-ID og generer nedlastingslenke.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Hva er gptoapk.com?",
      a: "gptoapk.com er et gratis nettverktøy som lager APK-nedlastingslenker direkte fra Google Play Store. Lim inn en Google Play-URL eller et pakkenavn og få en direktelenke.",
    },
    {
      q: "Er det gratis?",
      a: "Ja, helt gratis. Ingen registrering, ingen skjulte gebyrer og ingen premiumplaner.",
    },
    {
      q: "Hvordan fungerer det?",
      a: "Når du limer inn en Google Play-lenke, henter serveren vår APK-filen fra Googles CDN og gir deg nedlastingslenke. Vi endrer eller lagrer ikke filene.",
    },
    {
      q: "Er det trygt å laste ned fra gptoapk.com?",
      a: "Ja. Filene kommer direkte fra Google; vi endrer dem ikke, så du får originale APK-er.",
    },
    {
      q: "Kan jeg bruke det på mobil?",
      a: "Ja. Åpne gptoapk.com i mobilnettleseren og lim inn lenken — fungerer på telefon og datamaskin.",
    },
    {
      q: "Fungerer det for betalingsapper?",
      a: "Ja, men du må ha kjøpt appen på Google-kontoen din for at lenken skal være gyldig.",
    },
    {
      q: "Må jeg installere programvare eller utvidelser?",
      a: "Nei. Alt skjer i nettleseren — ingen ekstra nedlastinger, utvidelser eller plugin.",
    },
    {
      q: "Kan jeg bruke det fra hvilket land som helst?",
      a: "Ja, gptoapk.com fungerer over hele verden. Noen apper kan likevel være regionsbegrenset i Play Store.",
    },
    {
      q: "Hva er forskjellen på APK og AAB?",
      a: "APK er installasjonsformatet for Android. AAB er publiseringsformat for Google Play. Vi leverer en kompatibel APK også når appen publiseres som AAB.",
    },
    {
      q: "Hvorfor får jeg noen ganger 404?",
      a: "Appen kan være regionslåst, fjernet fra Play eller kreve bestemt enhet. Ved regionsbegrensning kan VPN hjelpe.",
    },
    {
      q: "Er det lovlig å laste ned APK fra Play?",
      a: "Til personlig bruk, testing og sikkerhetskopiering vanligvis ja. Videresalg av betalingsapper eller opphavsrettsbeskyttet materiale uten tillatelse er ulovlig.",
    },
    {
      q: "Er gptoapk.com tilknyttet Google?",
      a: "Nei. Det er et uavhengig verktøy og ikke tilknyttet Google eller Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Ofte stilte spørsmål</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Alt du trenger om gptoapk.com og APK-nedlasting fra Google Play.</p>
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
        <h2 className="text-2xl font-bold mb-3">Flere spørsmål?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Prøv{" "}
          <Link href="/nb" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          eller se{" "}
          <Link href="/nb/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">bloggen</Link>.
        </p>
      </div>
    </div>
  );
}
