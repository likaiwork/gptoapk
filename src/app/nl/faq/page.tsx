import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "Veelgestelde vragen over het downloaden van APK-bestanden van Google Play met gptoapk.com.",
};

export default function NlFAQPage() {
  const faqs = [
    {
      q: "Wat is gptoapk.com?",
      a: "gptoapk.com is een gratis online tool om APK-downloadlinks direct vanuit de Google Play Store te genereren. Plak een Google Play-URL of pakketnaam en ontvang direct een link.",
    },
    {
      q: "Is het gratis?",
      a: "Ja, volledig gratis. Geen registratie, geen verborgen kosten, geen premiumplannen.",
    },
    {
      q: "Hoe werkt het?",
      a: "Als je een Google Play-link plakt, haalt onze server het APK-bestand direct van Googles CDN op en geeft een downloadlink. We wijzigen of bewaren bestanden niet.",
    },
    {
      q: "Is het veilig om APK van gptoapk.com te downloaden?",
      a: "Ja. Bestanden komen rechtstreeks van Google; we raken ze niet aan, dus je krijgt originele, geverifieerde APK’s.",
    },
    {
      q: "Kan ik het op mijn telefoon gebruiken?",
      a: "Ja. Open gptoapk.com in je mobiele browser en plak de link — werkt op telefoons en computers.",
    },
    {
      q: "Werkt het voor betaalde apps?",
      a: "Ja, maar je moet de app met je Google-account hebben gekocht om een geldige link te krijgen.",
    },
    {
      q: "Moet ik software of extensies installeren?",
      a: "Nee. Alles werkt in de browser — geen downloads, extensies of plugins nodig.",
    },
    {
      q: "Kan ik van elk land downloaden?",
      a: "Ja, wereldwijd. Sommige apps kunnen op Play wel regiobeperkt zijn.",
    },
    {
      q: "Wat is het verschil tussen APK en AAB?",
      a: "APK is het installatieformaat voor Android. AAB is het publicatieformaat van Google Play. We leveren een compatibele APK, ook als de app als AAB wordt gepubliceerd.",
    },
    {
      q: "Waarom krijg ik soms een 404?",
      a: "De app kan regionaal geblokkeerd zijn, verwijderd van Play of niet compatibel met je apparaat. Bij regionale blokkade kun je een VPN proberen.",
    },
    {
      q: "Is APK-downloaden van Google Play legaal?",
      a: "Voor persoonlijk gebruik, testen en back-ups meestal wel. Betaalde apps of auteursrechtelijk materiaal zonder toestemming doorverkopen is niet toegestaan.",
    },
    {
      q: "Is gptoapk.com verbonden met Google?",
      a: "Nee. Het is een onafhankelijke tool en niet gelieerd aan Google of Google Play.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Veelgestelde vragen</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Wat je moet weten over gptoapk.com en APK-downloads van Google Play.
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
        <h2 className="text-2xl font-bold mb-3">Nog vragen?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Probeer de{" "}
          <Link href="/nl" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          of bekijk het{" "}
          <Link href="/nl/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
