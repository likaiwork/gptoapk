import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Bezplatný online nástroj pro získání APK z odkazů Google Play. Vložte URL nebo ID aplikace a vygenerujte odkaz ke stažení.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Co je gptoapk.com?",
      a: "gptoapk.com je bezplatný online nástroj pro generování odkazů ke stažení APK přímo z Google Play Store. Vložte URL Google Play nebo název balíčku a okamžitě získejte přímý odkaz.",
    },
    {
      q: "Je to zdarma?",
      a: "Ano, zcela zdarma. Bez registrace, skrytých poplatků a prémiových plánů.",
    },
    {
      q: "Jak to funguje?",
      a: "Po vložení odkazu Google Play náš server stáhne soubor APK z CDN Google a poskytne odkaz ke stažení. Soubory neměníme ani neukládáme.",
    },
    {
      q: "Je bezpečné stahovat z gptoapk.com?",
      a: "Ano. Soubory pocházejí přímo ze serverů Google; nedotýkáme se jich, takže dostanete originální APK.",
    },
    {
      q: "Mohu to použít na telefonu?",
      a: "Ano. Otevřete gptoapk.com v mobilním prohlížeči a vložte odkaz — funguje na telefonech i počítačích.",
    },
    {
      q: "Funguje to u placených aplikací?",
      a: "Ano, ale aplikaci musíte mít zakoupenou na svém účtu Google, aby byl odkaz platný.",
    },
    {
      q: "Musím instalovat software nebo rozšíření?",
      a: "Ne. Vše probíhá v prohlížeči — žádné další programy ani pluginy.",
    },
    {
      q: "Lze použít z jakékoli země?",
      a: "Ano, gptoapk.com funguje celosvětově. Některé aplikace mohou být v Obchodě Play regionálně omezené.",
    },
    {
      q: "Jaký je rozdíl mezi APK a AAB?",
      a: "APK je instalační formát pro Android. AAB je publikační formát Google Play. Poskytujeme kompatibilní APK i když je aplikace publikována jako AAB.",
    },
    {
      q: "Proč někdy dostanu 404?",
      a: "Aplikace může být regionálně uzamčena, odstraněna z Play nebo nekompatibilní s vaším zařízením. U regionálního omezení zkuste VPN.",
    },
    {
      q: "Je legální stahovat APK z Play?",
      a: "Pro osobní použití, testování a zálohy obvykle ano. Další prodej placených aplikací nebo materiálu chráněného autorským právem bez svolení je nelegální.",
    },
    {
      q: "Je gptoapk.com spojený s Google?",
      a: "Ne. Jedná se o nezávislý nástroj a není spojený s Google ani Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Často kladené otázky</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Vše o používání gptoapk.com a stahování APK z Google Play.</p>
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
        <h2 className="text-2xl font-bold mb-3">Máte další otázky?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Vyzkoušejte{" "}
          <Link href="/cs" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          nebo navštivte{" "}
          <Link href="/cs/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blog</Link>.
        </p>
      </div>
    </div>
  );
}
