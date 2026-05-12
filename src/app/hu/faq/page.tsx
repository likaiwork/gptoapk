import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Ingyenes online eszköz APK-fájlok beszerzéséhez Google Play-linkekből. Illessze be az URL-t vagy az alkalmazásazonosítót, és generáljon letöltési linket.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Mi az a gptoapk.com?",
      a: "A gptoapk.com egy ingyenes online eszköz, amellyel közvetlenül a Google Play Áruházból generálhat APK-letöltési linkeket. Illesszen be Google Play URL-t vagy csomagnevet, és kapjon azonnal közvetlen linket.",
    },
    {
      q: "Ingyenes?",
      a: "Igen, teljesen ingyenes. Nincs regisztráció, rejtett díj vagy prémium csomag.",
    },
    {
      q: "Hogyan működik?",
      a: "Amikor beilleszt egy Google Play linket, a szerverünk az APK fájlt a Google CDN-jéről szerzi be, és letöltési linket ad. Nem módosítjuk és nem tároljuk a fájlokat.",
    },
    {
      q: "Biztonságos a letöltés a gptoapk.comról?",
      a: "Igen. A fájlok közvetlenül a Google szervereiről jönnek; nem nyúlunk hozzájuk, így eredeti APK-kat kap.",
    },
    {
      q: "Használhatom mobilon?",
      a: "Igen. Nyissa meg a gptoapk.comot mobilböngészőben, és illessze be a linket — működik telefonon és számítógépen is.",
    },
    {
      q: "Működik fizetős alkalmazásoknál?",
      a: "Igen, de az alkalmazást meg kell vásárolnia a Google-fiókján, hogy a link érvényes legyen.",
    },
    {
      q: "Kell szoftvert vagy bővítményt telepíteni?",
      a: "Nem. Minden a böngészőben történik — nincs extra letöltés, bővítmény vagy plugin.",
    },
    {
      q: "Bármely országból használható?",
      a: "Igen, a gptoapk.com világszerte működik. Egyes alkalmazások azonban régiókorlátozottak lehetnek a Play Áruházban.",
    },
    {
      q: "Mi a különbség az APK és az AAB között?",
      a: "Az APK az Android telepítési formátuma. Az AAB a Google Play kiadási formátuma. Kompatibilis APK-t adunk akkor is, ha az alkalmazás AAB-ként jelenik meg.",
    },
    {
      q: "Miért kapok néha 404-et?",
      a: "Az alkalmazás lehet régiózárolt, eltávolították a Playből, vagy nem kompatibilis az eszközével. Régiókorlátozásnál próbáljon VPN-t.",
    },
    {
      q: "Legális APK-t letölteni a Playről?",
      a: "Személyes használatra, tesztelésre és biztonsági mentésre általában igen. Fizetős alkalmazások vagy szerzői jogi anyag engedély nélküli továbbértékesítése illegális.",
    },
    {
      q: "A gptoapk.com a Google része?",
      a: "Nem. Független eszköz, és nem áll kapcsolatban a Google-lal vagy a Google Play-jel.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Gyakori kérdések</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Minden, amit a gptoapk.comról és a Google Playről történő APK-letöltésről tudni érdemes.</p>
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
        <h2 className="text-2xl font-bold mb-3">További kérdése van?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Próbálja{" "}
          <Link href="/hu" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          vagy nézze meg a{" "}
          <Link href="/hu/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blogot</Link>.
        </p>
      </div>
    </div>
  );
}
