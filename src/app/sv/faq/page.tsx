import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "Vanliga frågor om att ladda ner APK från Google Play med gptoapk.com.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Vad är gptoapk.com?",
      a: "gptoapk.com är ett gratis verktyg online för att skapa nedladdningslänkar för APK direkt från Google Play Store. Klistra in en Google Play-URL eller ett paketnamn och få en direktlänk direkt.",
    },
    {
      q: "Är det gratis?",
      a: "Ja, helt gratis. Ingen registrering, inga dolda avgifter och inga premiumplaner.",
    },
    {
      q: "Hur fungerar det?",
      a: "När du klistrar in en Google Play-länk hämtar vår server APK-filen från Googles CDN och ger dig en nedladdningslänk. Vi ändrar eller lagrar inte filerna.",
    },
    {
      q: "Är det säkert att ladda ner från gptoapk.com?",
      a: "Ja. Filer kommer direkt från Googles servrar; vi rör dem inte, så du får original-APK.",
    },
    {
      q: "Kan jag använda det på mobilen?",
      a: "Ja. Öppna gptoapk.com i mobilwebbläsaren och klistra in länken — fungerar på både telefon och dator.",
    },
    {
      q: "Fungerar det för betalappar?",
      a: "Ja, men du måste ha köpt appen med ditt Google-konto för att länken ska vara giltig.",
    },
    {
      q: "Behöver jag installera program eller tillägg?",
      a: "Nej. Allt sker i webbläsaren — inga extra nedladdningar, tillägg eller plugin behövs.",
    },
    {
      q: "Kan jag använda det från vilket land som helst?",
      a: "Ja, gptoapk.com fungerar över hela världen. Vissa appar kan dock vara regionsbegränsade i Play Store.",
    },
    {
      q: "Vad är skillnaden mellan APK och AAB?",
      a: "APK är installationsformatet för Android. AAB är publiceringsformat för Google Play. Vi levererar en kompatibel APK även om appen publiceras som AAB.",
    },
    {
      q: "Varför får jag ibland 404?",
      a: "Appen kan vara regionslåst, borttagen från Play eller kräva en viss enhet. Vid regionsblockering kan VPN hjälpa.",
    },
    {
      q: "Är det lagligt att ladda ner APK från Play?",
      a: "För personligt bruk, test och säkerhetskopior oftast ja. Återförsäljning av betalappar eller upphovsrättsskyddat material utan tillstånd är olagligt.",
    },
    {
      q: "Är gptoapk.com anslutet till Google?",
      a: "Nej. Det är ett oberoende verktyg och inte anslutet till Google eller Google Play.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Vanliga frågor</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Allt du behöver veta om gptoapk.com och APK-nedladdning från Google Play.
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
        <h2 className="text-2xl font-bold mb-3">Fler frågor?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Prova{" "}
          <Link href="/sv" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          eller läs{" "}
          <Link href="/sv/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            bloggen
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
