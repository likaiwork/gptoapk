import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Gratis onlineværktøj til at hente APK-filer fra Google Play-links. Indsæt URL eller app-ID og generer downloadlink.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Hvad er gptoapk.com?",
      a: "gptoapk.com er et gratis onlineværktøj til at oprette APK-downloadlinks direkte fra Google Play Store. Indsæt en Google Play-URL eller et pakkenavn og få et direkte link med det samme.",
    },
    {
      q: "Er det gratis?",
      a: "Ja, helt gratis. Ingen registrering, ingen skjulte gebyrer og ingen premiumplaner.",
    },
    {
      q: "Hvordan virker det?",
      a: "Når du indsætter et Google Play-link, henter vores server APK-filen fra Googles CDN og giver dig et downloadlink. Vi ændrer eller gemmer ikke filerne.",
    },
    {
      q: "Er det sikkert at downloade fra gptoapk.com?",
      a: "Ja. Filer kommer direkte fra Googles servere; vi rører dem ikke, så du får originale APK-filer.",
    },
    {
      q: "Kan jeg bruge det på mobilen?",
      a: "Ja. Åbn gptoapk.com i mobilbrowseren og indsæt linket — virker på både telefon og computer.",
    },
    {
      q: "Virker det til betalingsapper?",
      a: "Ja, men du skal have købt appen på din Google-konto, for at linket er gyldigt.",
    },
    {
      q: "Skal jeg installere software eller udvidelser?",
      a: "Nej. Alt foregår i browseren — ingen ekstra downloads, udvidelser eller plugins.",
    },
    {
      q: "Kan jeg bruge det fra ethvert land?",
      a: "Ja, gptoapk.com virker over hele verden. Nogle apps kan dog være regionsbegrænsede i Play Store.",
    },
    {
      q: "Hvad er forskellen på APK og AAB?",
      a: "APK er installationsformatet til Android. AAB er publiceringsformat til Google Play. Vi leverer en kompatibel APK, også når appen publiceres som AAB.",
    },
    {
      q: "Hvorfor får jeg nogle gange 404?",
      a: "Appen kan være regionslåst, fjernet fra Play eller kræve bestemt enhed. Ved regionsbegrænsning kan VPN hjælpe.",
    },
    {
      q: "Er det lovligt at downloade APK fra Play?",
      a: "Til personlig brug, test og backup som regel ja. Videresalg af betalingsapps eller ophavsretsbeskyttet materiale uden tilladelse er ulovligt.",
    },
    {
      q: "Er gptoapk.com tilknyttet Google?",
      a: "Nej. Det er et uafhængigt værktøj og ikke tilknyttet Google eller Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Ofte stillede spørgsmål</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Alt om brug af gptoapk.com og APK-download fra Google Play.</p>
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
        <h2 className="text-2xl font-bold mb-3">Flere spørgsmål?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Prøv{" "}
          <Link href="/da" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          eller se{" "}
          <Link href="/da/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">bloggen</Link>.
        </p>
      </div>
    </div>
  );
}
