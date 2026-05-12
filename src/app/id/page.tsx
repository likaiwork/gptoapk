import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function IdHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Unduh APK langsung dari Google Play Store. Cukup tempel tautan Google Play atau ID aplikasi di bawah dan buat tautan unduhanmu seketika.
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      {/* Features */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Unduhan Cepat</h3>
          <p className="text-slate-600 dark:text-slate-400">Tanpa menunggu, tanpa captcha. Hasilkan tautan unduhan langsung dalam hitungan detik.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Aman & Terpercaya</h3>
          <p className="text-slate-600 dark:text-slate-400">File diambil langsung dari server Google. Tanpa modifikasi, APK 100% asli.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Tanpa Daftar</h3>
          <p className="text-slate-600 dark:text-slate-400">Sepenuhnya gratis tanpa membuat akun atau memasang ekstensi.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Cara mengunduh APK dari Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Salin tautan Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">Temukan aplikasi di Google Play Store dan salin URL-nya dari bilah alamat.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Tempel & buat</h3>
              <p className="text-slate-600 dark:text-slate-400">Tempel tautan ke kolom input di atas dan klik tombol Buat Tautan.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Unduh APK-mu</h3>
              <p className="text-slate-600 dark:text-slate-400">Klik tautan unduhan untuk menyimpan file APK, lalu pasang di perangkat Android-mu.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">Mengapa memilih gptoapk.com?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Langsung dari Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">File berasal langsung dari server Google</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Tanpa diunggah</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">File hanya melewati server kami dan tidak disimpan</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% gratis</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tanpa biaya tersembunyi atau paket premium</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Tanpa pendaftaran</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Mulai unduh sekarang juga</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">Panduan & tips unduh APK</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Pelajari lebih banyak tentang file APK, instalasinya, dan alat terbaik untuk mengekstrak APK dari Google Play.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/id/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Cara mengunduh APK dari Google Play: panduan lengkap</h3>
            <p className="text-sm text-slate-500 mt-2">Panduan menyeluruh meliputi alat web, ADB, dan praktik terbaik.</p>
          </Link>
          <Link href="/id/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Apa itu file APK?</h3>
            <p className="text-sm text-slate-500 mt-2">Semua yang perlu kamu tahu tentang paket instalasi Android.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/id/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Lihat semua artikel →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Pertanyaan yang sering diajukan</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Bagaimana cara mengunduh APK dari Google Play?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Cukup tempel tautan Google Play di halaman ini dan klik Buat Tautan. Unduhan APK akan siap dalam beberapa detik.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Apakah aman mengunduh file APK?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Ya. Alat kami mengambil file langsung dari server Google. APK 100% asli dan tidak dimodifikasi.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Apakah perlu memasang sesuatu?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Tidak. gptoapk.com berjalan sepenuhnya di browser tanpa ekstensi atau perangkat lunak tambahan.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/id/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Lihat semua FAQ →
          </Link>
        </div>
      </div>
    </div>
  );
}
