import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "Soalan lazim tentang memuat turun APK daripada Google Play menggunakan gptoapk.com.",
};

export default function MsFAQPage() {
  const faqs = [
    {
      q: "Apakah gptoapk.com?",
      a: "gptoapk.com ialah alat dalam talian percuma untuk menjana pautan muat turun APK terus daripada Google Play Store. Tampal URL Google Play atau nama pakej dan dapatkan pautan serta-merta.",
    },
    {
      q: "Adakah ia percuma?",
      a: "Ya, sepenuhnya percuma. Tiada pendaftaran, yuran tersembunyi atau pelan premium.",
    },
    {
      q: "Bagaimana ia berfungsi?",
      a: "Apabila anda menampal pautan Google Play, pelayan kami mengambil fail APK terus daripada CDN Google dan memberikan pautan muat turun. Kami tidak mengubah suai atau menyimpan fail.",
    },
    {
      q: "Adakah selamat memuat turun daripada gptoapk.com?",
      a: "Ya. Fail diperoleh terus daripada pelayan Google; kami tidak mengubahnya, jadi anda mendapat APK asli.",
    },
    {
      q: "Bolehkah saya guna di telefon?",
      a: "Ya. Buka gptoapk.com dalam pelayar mudah alih dan tampal pautan — berfungsi pada telefon dan komputer.",
    },
    {
      q: "Adakah ia berfungsi untuk apl berbayar?",
      a: "Ya, tetapi anda mesti telah membeli apl tersebut pada akaun Google anda untuk mendapat pautan yang sah.",
    },
    {
      q: "Perlukah memasang perisian atau sambungan pelayar?",
      a: "Tidak. Semuanya berfungsi dalam pelayar — tiada muat turun tambahan, sambungan atau pemalam.",
    },
    {
      q: "Bolehkah digunakan dari mana-mana negara?",
      a: "Ya, gptoapk.com boleh digunakan di seluruh dunia. Sesetengah apl mungkin mempunyai sekatan wilayah di Play Store.",
    },
    {
      q: "Apakah perbezaan antara APK dan AAB?",
      a: "APK ialah format pemasangan pada Android. AAB ialah format penerbitan Google Play. Kami menyediakan APK yang serasi walaupun apl diterbitkan sebagai AAB.",
    },
    {
      q: "Mengapa sesetengah apl menunjukkan ralat 404?",
      a: "Apl mungkin dikunci mengikut wilayah, dialih keluar daripada Play atau tidak serasi dengan peranti anda. Cuba VPN jika ia disebabkan sekatan wilayah.",
    },
    {
      q: "Adakah memuat turun APK daripada Play sah di sisi undang-undang?",
      a: "Untuk kegunaan peribadi, ujian dan sandaran biasanya ya. Menjual semula apl berbayar atau bahan berhak cipta tanpa kebenaran adalah salah.",
    },
    {
      q: "Adakah gptoapk.com berkaitan dengan Google?",
      a: "Tidak. Ia ialah alat bebas dan tidak berafiliasi dengan Google atau Google Play.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Soalan lazim</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Semua yang anda perlu tahu tentang menggunakan gptoapk.com dan memuat turun APK daripada Google Play.
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
        <h2 className="text-2xl font-bold mb-3">Masih ada soalan?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Cuba{" "}
          <Link href="/ms" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          atau layari{" "}
          <Link href="/ms/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
