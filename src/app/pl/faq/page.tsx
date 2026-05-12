import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "Często zadawane pytania o pobieranie APK z Google Play za pomocą gptoapk.com.",
};

export default function PlFAQPage() {
  const faqs = [
    {
      q: "Czym jest gptoapk.com?",
      a: "gptoapk.com to darmowe narzędzie online do generowania linków pobierania APK bezpośrednio ze sklepu Google Play. Wklej adres URL lub nazwę pakietu i otrzymaj link.",
    },
    {
      q: "Czy to jest darmowe?",
      a: "Tak, w pełni za darmo. Bez rejestracji, ukrytych opłat i planów premium.",
    },
    {
      q: "Jak to działa?",
      a: "Po wklejeniu linku Google Play nasz serwer pobiera plik APK z CDN Google i udostępnia link do pobrania. Nie modyfikujemy ani nie przechowujemy plików.",
    },
    {
      q: "Czy pobieranie z gptoapk.com jest bezpieczne?",
      a: "Tak. Pliki pochodzą bezpośrednio z serwerów Google; nie zmieniamy ich, więc otrzymujesz oryginalne, zweryfikowane APK.",
    },
    {
      q: "Czy mogę z telefonu?",
      a: "Tak. Otwórz gptoapk.com w przeglądarce mobilnej i wklej link — działa na telefonach i komputerach.",
    },
    {
      q: "Czy działa dla płatnych aplikacji?",
      a: "Tak, ale musisz mieć zakupioną aplikację na swoim koncie Google, aby link był ważny.",
    },
    {
      q: "Czy muszę coś instalować?",
      a: "Nie. Wszystko działa w przeglądarce — bez dodatkowego oprogramowania i rozszerzeń.",
    },
    {
      q: "Czy działa z każdego kraju?",
      a: "Tak, na całym świecie. Niektóre aplikacje mogą być jednak ograniczone regionalnie w Sklepie Play.",
    },
    {
      q: "Różnica między APK a AAB?",
      a: "APK to format instalacyjny Androida. AAB to format publikacji w Google Play. Dostarczamy kompatybilne APK także wtedy, gdy aplikacja jest publikowana jako AAB.",
    },
    {
      q: "Dlaczego czasem jest błąd 404?",
      a: "Aplikacja może być zablokowana regionalnie, usunięta ze sklepu lub niedostępna dla Twojego urządzenia. Przy blokadzie regionalnej możesz spróbować VPN.",
    },
    {
      q: "Czy pobieranie APK z Play jest legalne?",
      a: "Do użytku osobistego, testów i kopii zapasowych zwykle tak. Odsprzedaż płatnych aplikacji lub materiałów chronionych prawem autorskim bez zgody jest nielegalna.",
    },
    {
      q: "Czy gptoapk.com jest powiązane z Google?",
      a: "Nie. To niezależne narzędzie i nie jest powiązane z Google ani Google Play.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Często zadawane pytania</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Informacje o korzystaniu z gptoapk.com i pobieraniu APK z Google Play.
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
        <h2 className="text-2xl font-bold mb-3">Masz więcej pytań?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Wypróbuj{" "}
          <Link href="/pl" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          lub zajrzyj na{" "}
          <Link href="/pl/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            blog
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
