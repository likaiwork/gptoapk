import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Libreng online tool para kunin ang APK mula sa Google Play links. I-paste ang URL o App ID at gumawa ng download link.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Ano ang gptoapk.com?",
      a: "Ang gptoapk.com ay libreng online tool na gumagawa ng APK download links direkta mula sa Google Play Store. Mag-paste ng Google Play URL o package name at makakuha ng direct link agad.",
    },
    {
      q: "Libre ba?",
      a: "Oo, ganap na libre. Walang rehistro, nakatagong bayad, o premium plans.",
    },
    {
      q: "Paano ito gumagana?",
      a: "Kapag nag-paste ka ng Google Play link, kinukuha ng server ang APK mula sa CDN ng Google at nagbibigay ng download link. Hindi namin binabago o sine-save ang mga file.",
    },
    {
      q: "Ligtas bang mag-download mula sa gptoapk.com?",
      a: "Oo. Ang mga file ay direkta mula sa mga server ng Google; hindi namin hinahawakan, kaya makakakuha ka ng orihinal na APK.",
    },
    {
      q: "Pwede sa mobile?",
      a: "Oo. Buksan ang gptoapk.com sa mobile browser at i-paste ang link — gumagana sa phone at computer.",
    },
    {
      q: "Gumagana ba sa paid apps?",
      a: "Oo, pero dapat nabili mo na ang app sa Google account mo para valid ang link.",
    },
    {
      q: "Kailangan ba ng software o extension?",
      a: "Hindi. Lahat sa browser — walang extra downloads, extensions, o plugins.",
    },
    {
      q: "Pwede sa kahit anong bansa?",
      a: "Oo, gumagana ang gptoapk.com sa buong mundo. May mga app na regional restricted sa Play Store.",
    },
    {
      q: "Ano ang pagkakaiba ng APK at AAB?",
      a: "Ang APK ay install format ng Android. Ang AAB ay publishing format ng Google Play. Nagbibigay kami ng compatible APK kahit AAB ang publish format.",
    },
    {
      q: "Bakit minsan may 404?",
      a: "Maaaring region-locked ang app, tinanggal sa Play, o hindi compatible sa device. Subukan ang VPN kung region issue.",
    },
    {
      q: "Legal bang mag-download ng APK mula sa Play?",
      a: "Karaniwan oo para sa personal use, testing, at backup. Ilegal ang pagbebenta muli ng paid apps o copyrighted material nang walang pahintulot.",
    },
    {
      q: "Affiliated ba ang gptoapk.com sa Google?",
      a: "Hindi. Ito ay independent tool at hindi affiliated sa Google o Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Mga madalas itanong</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Lahat ng kailangan mong malaman tungkol sa gptoapk.com at APK download mula sa Google Play.</p>
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
        <h2 className="text-2xl font-bold mb-3">May tanong pa?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Subukan ang{" "}
          <Link href="/tl" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          o tingnan ang{" "}
          <Link href="/tl/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blog</Link>.
        </p>
      </div>
    </div>
  );
}
