import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function EnHome() {
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
          <p className="text-slate-600 dark:text-slate-400">
            Generate APK download links in seconds — just paste a Play Store link or package name.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">100% Safe &amp; Secure</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Files fetched directly from Google&apos;s CDN — no middlemen, no modifications, no tracking.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">No Registration</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Free to use, no account needed, no captchas. Works on desktop and mobile browsers.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">
          How It Works
        </h2>
        <div className="space-y-8">
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Copy a Google Play Link</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Find the app you want on Google Play Store and copy its URL from your browser&apos;s address bar. Or just note the package name (e.g., <code className="text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">com.example.app</code>).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Paste &amp; Generate</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Paste the link or package name into the input box above and click &quot;Generate Link&quot;. Our tool fetches the APK from Google&apos;s servers in real-time.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Download &amp; Install</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your APK download link is ready. Click to download the file, then transfer it to your Android device and install. That&apos;s it!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Learn More About APK Downloads</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Check out our blog for guides, tips, and troubleshooting.
        </p>
        <Link
          href="/en/blog"
          className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
        >
          Visit Blog
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
