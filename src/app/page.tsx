import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Download APK directly from Google Play Store. Just paste the Google Play link or App ID below and generate your download link instantly.
        </p>
        {/* Search Box Component */}
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
          <h3 className="text-xl font-bold mb-3">Fast Download</h3>
          <p className="text-slate-600 dark:text-slate-400">Generate direct download links instantly without waiting or captchas.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
          <p className="text-slate-600 dark:text-slate-400">Files are fetched directly from Google&apos;s servers. No modifications, 100% original APKs.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">No Registration</h3>
          <p className="text-slate-600 dark:text-slate-400">Completely free to use without creating an account or downloading any extensions.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">How to Download APK from Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Copy the Google Play link</h3>
              <p className="text-slate-600 dark:text-slate-400">Find any app on the Google Play Store and copy its URL from the address bar.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Paste and generate</h3>
              <p className="text-slate-600 dark:text-slate-400">Paste the link into the input box above and click the Generate Link button.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Download your APK</h3>
              <p className="text-slate-600 dark:text-slate-400">Click the download link and save the APK file. Install it on your Android device.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool Section */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">Why Use gptoapk.com?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Direct from Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Files come straight from Google&apos;s servers</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">No Uploads</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Files pass through our servers, never stored</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% Free</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">No hidden charges, no premium plans</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">No Registration</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Start downloading immediately</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview Section */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">APK Download Guides & Tips</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Learn more about APK files, installation, and the best tools for Google Play APK extraction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">How to Download APK from Google Play Store</h3>
            <p className="text-sm text-slate-500 mt-2">Complete guide covering web tools, ADB, and best practices.</p>
          </Link>
          <Link href="/blog/apk-downloader-tool-comparison" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Best APK Downloader Tools Compared</h3>
            <p className="text-sm text-slate-500 mt-2">We tested 5 popular tools — see which one wins.</p>
          </Link>
          <Link href="/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">What Is an APK File?</h3>
            <p className="text-sm text-slate-500 mt-2">Understand Android package files inside and out.</p>
          </Link>
          <Link href="/blog/how-to-install-apk-on-android" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">How to Install APK on Android</h3>
            <p className="text-sm text-slate-500 mt-2">Step-by-step guide with troubleshooting tips.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            View all articles →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">How do I download APK from Google Play?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Just paste the Google Play link on this page and click Generate Link. Your APK download will be ready in seconds.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Is it safe to download APK files?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Yes, our tool fetches files directly from Google&apos;s servers. The APKs are 100% original and unmodified.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Do I need to install anything?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">No. gptoapk.com works entirely in your browser. No extensions, no software needed.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            View all FAQs →
          </Link>
        </div>
      </div>
    </div>
  );
}
