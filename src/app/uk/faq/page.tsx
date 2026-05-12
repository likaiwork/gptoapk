import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "Часті запитання про завантаження APK з Google Play за допомогою gptoapk.com.",
};

export default function UkFAQPage() {
  const faqs = [
    {
      q: "Що таке gptoapk.com?",
      a: "gptoapk.com — безкоштовний онлайн-інструмент для створення посилань на завантаження APK безпосередньо з Google Play. Вставте URL або ім’я пакета й отримайте посилання.",
    },
    {
      q: "Це безкоштовно?",
      a: "Так, повністю безкоштовно. Без реєстрації, прихованих платежів і преміум-планів.",
    },
    {
      q: "Як це працює?",
      a: "Коли ви вставляєте посилання Google Play, наш сервер отримує APK з CDN Google і дає посилання для завантаження. Ми не змінюємо й не зберігаємо файли.",
    },
    {
      q: "Чи безпечно завантажувати з gptoapk.com?",
      a: "Так. Файли надходять безпосередньо з серверів Google; ми їх не змінюємо, тож ви отримуєте оригінальні APK.",
    },
    {
      q: "Чи можна з телефону?",
      a: "Так. Відкрийте gptoapk.com у мобільному браузері й вставте посилання — працює на телефонах і комп’ютерах.",
    },
    {
      q: "Чи працює для платних застосунків?",
      a: "Так, але застосунок має бути придбаний у вашому обліковому записі Google, щоб посилання було дійсним.",
    },
    {
      q: "Чи потрібно встановлювати програми чи розширення?",
      a: "Ні. Усе працює в браузері — без додаткового софта й плагінів.",
    },
    {
      q: "Чи можна з будь-якої країни?",
      a: "Так, сервіс доступний світово. Окремі застосунки можуть бути обмежені за регіоном у Google Play.",
    },
    {
      q: "У чому різниця між APK і AAB?",
      a: "APK — формат установки на Android. AAB — формат публікації в Google Play. Ми надаємо сумісний APK, навіть якщо застосунок опубліковано як AAB.",
    },
    {
      q: "Чому іноді помилка 404?",
      a: "Застосунок може бути регіонально заблокований, видалений з Play або несумісний з пристроєм. Для регіональних обмежень спробуйте VPN.",
    },
    {
      q: "Чи легально завантажувати APK з Play?",
      a: "Для особистого використання, тестування й резервних копій зазвичай так. Перепродаж платних застосунків без дозволу — незаконно.",
    },
    {
      q: "Чи пов’язаний gptoapk.com з Google?",
      a: "Ні. Це незалежний інструмент і не пов’язаний з Google чи Google Play.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Часті запитання</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Все про використання gptoapk.com і завантаження APK з Google Play.
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
        <h2 className="text-2xl font-bold mb-3">Залишились запитання?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Спробуйте{" "}
          <Link href="/uk" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          або перегляньте{" "}
          <Link href="/uk/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            блог
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
