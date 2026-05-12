import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function DeHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Lade APKs direkt aus dem Google Play Store herunter. Füge unten einen Google-Play-Link oder eine App-ID ein und generiere deinen Download-Link sofort.
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
          <h3 className="text-xl font-bold mb-3">Schneller Download</h3>
          <p className="text-slate-600 dark:text-slate-400">Kein Warten, kein Captcha. Direkte Download-Links in Sekunden.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Sicher und vertrauenswürdig</h3>
          <p className="text-slate-600 dark:text-slate-400">Dateien werden direkt von Googles Servern geholt. Keine Änderungen, 100 % originale APKs.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Keine Registrierung</h3>
          <p className="text-slate-600 dark:text-slate-400">Komplett kostenlos. Kein Konto, keine Erweiterungen erforderlich.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">So lädst du APKs aus Google Play herunter</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Google-Play-Link kopieren</h3>
              <p className="text-slate-600 dark:text-slate-400">Suche eine App im Google Play Store und kopiere die URL aus der Adresszeile.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Einfügen und generieren</h3>
              <p className="text-slate-600 dark:text-slate-400">Füge den Link in das Eingabefeld oben ein und klicke auf „Link generieren&quot;.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">APK herunterladen</h3>
              <p className="text-slate-600 dark:text-slate-400">Klicke auf den Download-Link, um die APK-Datei zu speichern, und installiere sie auf deinem Android-Gerät.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">Warum gptoapk.com wählen?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Direkt von Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dateien stammen direkt aus Googles Servern</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Kein Hochladen</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dateien laufen durch unsere Server, werden aber nie gespeichert</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100 % kostenlos</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Keine versteckten Gebühren, keine Premium-Pläne</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Keine Anmeldung</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sofort mit dem Herunterladen beginnen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">APK-Download-Anleitungen und Tipps</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Erfahre mehr über APK-Dateien, deren Installation und die besten Tools, um APKs aus Google Play zu extrahieren.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/de/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">APK aus Google Play herunterladen: vollständige Anleitung</h3>
            <p className="text-sm text-slate-500 mt-2">Umfassender Leitfaden zu Web-Tools, ADB und Best Practices.</p>
          </Link>
          <Link href="/de/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Was ist eine APK-Datei?</h3>
            <p className="text-sm text-slate-500 mt-2">Alles, was du über Android-Installationspakete wissen musst.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/de/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Alle Artikel ansehen →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Häufig gestellte Fragen</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Wie lade ich APKs aus Google Play herunter?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Füge einfach den Google-Play-Link auf dieser Seite ein und klicke auf „Link generieren&quot;. Dein APK-Download ist in wenigen Sekunden bereit.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Ist das Herunterladen von APK-Dateien sicher?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Ja. Unser Tool holt die Dateien direkt von Googles Servern. APKs sind 100 % original und unverändert.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Muss ich etwas installieren?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Nein. gptoapk.com läuft komplett im Browser, ohne Erweiterungen oder zusätzliche Software.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/de/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Alle FAQs ansehen →
          </Link>
        </div>
      </div>
    </div>
  );
}
