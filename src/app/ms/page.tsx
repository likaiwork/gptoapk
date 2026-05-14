import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function MsHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"Cari mengikut nama aplikasi, tampal pautan Google Play atau masukkan nama pakej untuk mencari aplikasi dan menjana pautan muat turun APK."}
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Muat turun pantas</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Jana pautan dalam beberapa saat — tampal pautan Play Store atau nama pakej.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Selamat</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Fail diambil terus daripada pelayan Google — tiada pengubahan atau orang tengah.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Tanpa pendaftaran</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Percuma, tiada akaun, tiada captcha. Berfungsi dalam pelayar desktop dan mudah alih.
          </p>
        </div>
      </div>

      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">Cara ia berfungsi</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Salin pautan Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Cari aplikasi di Play Store dan salin URL daripada bar alamat, atau gunakan nama pakej (cth.{" "}
                <code className="text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">com.example.app</code>).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Tampal dan jana</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Tampal pautan atau pakej dalam kotak di atas dan klik untuk menjana. APK diambil daripada pelayan Google secara masa nyata.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Muat turun dan pasang</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Pautan anda sudah siap — muat turun fail APK ke peranti Android dan pasang aplikasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Ketahui lebih lanjut tentang APK</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Artikel Bahasa Melayu akan datang; buat masa ini panduan lengkap ada di blog bahasa Inggeris.
        </p>
        <Link
          href="/ms/blog"
          className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
        >
          Ke blog
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
