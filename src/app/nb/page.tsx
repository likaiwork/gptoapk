import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"Søk etter appnavn, lim inn en Google Play-lenke eller skriv inn pakkenavnet for å finne appen og lage en APK-nedlastingslenke."}
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
          <h3 className="text-xl font-bold mb-3">{"Rask nedlasting"}</h3>
          <p className="text-slate-600 dark:text-slate-400">{"Generer lenker på sekunder — lim inn Play Store-lenke eller pakkenavn."}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{"Trygt"}</h3>
          <p className="text-slate-600 dark:text-slate-400">{"Filer hentes direkte fra Google — ingen mellomledd eller endringer."}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">{"Uten registrering"}</h3>
          <p className="text-slate-600 dark:text-slate-400">{"Gratis, uten konto og uten captcha. Fungerer i nettleser på PC og mobil."}</p>
        </div>
      </div>

      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">{"Slik fungerer det"}</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{"Kopier Google Play-lenke"}</h3>
              <p className="text-slate-600 dark:text-slate-400">{"Finn appen i Play Store og kopier URL fra adresselinjen, eller bruk pakkenavnet (f.eks. com.example.app)."}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{"Lim inn og generer"}</h3>
              <p className="text-slate-600 dark:text-slate-400">{"Lim inn lenke eller pakke i feltet over og klikk for å generere. APK hentes fra Google i sanntid."}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{"Last ned og installer"}</h3>
              <p className="text-slate-600 dark:text-slate-400">{"Nedlastingslenken er klar — lagre APK på Android-enheten og installer."}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">{"Mer om APK"}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{"Vi forbereder artikler på norsk bokmål. Du kan allerede lese den engelske bloggen med fullstendige guider."}</p>
        <Link href="/nb/blog" className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors">
          {"Til bloggen"}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
