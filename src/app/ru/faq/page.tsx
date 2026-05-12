import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Часто задаваемые вопросы - APK Downloader | gptoapk.com",
  description:
    "Часто задаваемые вопросы о загрузке APK из Google Play с помощью gptoapk.com. Как это работает, безопасность и решение проблем.",
};

export default function RuFAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Часто задаваемые вопросы
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Всё, что нужно знать об использовании gptoapk.com для загрузки APK-файлов из Google Play.
        </p>
      </div>

      <div className="space-y-6">
        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Что такое gptoapk.com?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            gptoapk.com — это бесплатный онлайн-инструмент, позволяющий генерировать прямые ссылки на загрузку APK из Google Play. Просто вставьте URL Google Play или имя пакета, и вы сразу получите прямую ссылку на загрузку.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Это бесплатно?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Да, полностью бесплатно. Без регистрации, без скрытых платежей и премиум-планов.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Как это работает?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Когда вы вставляете ссылку Google Play, наш сервер получает APK-файл напрямую с CDN Google и предоставляет вам ссылку на загрузку. Мы никогда не модифицируем и не храним файлы.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Безопасно ли скачивать APK с gptoapk.com?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Абсолютно. Файлы загружаются прямо с серверов Google. Мы их не трогаем и не изменяем, поэтому вы получаете 100 % оригинальные APK с проверенной подписью.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Можно ли скачивать APK на телефоне?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Да! Просто откройте gptoapk.com в мобильном браузере и вставьте ссылку. Работает и на телефонах, и на компьютерах.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Работает ли это с платными приложениями?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Да, но для генерации действительной ссылки приложение должно быть приобретено в вашем аккаунте Google.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Нужно ли устанавливать программы или расширения?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Нет. gptoapk.com работает полностью в браузере. Никаких загрузок, расширений или плагинов не требуется.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Можно ли скачивать APK из любой страны?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Да, gptoapk.com работает по всему миру. Однако некоторые приложения могут иметь региональные ограничения в Google Play.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">В чём разница между APK и AAB?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            APK — это формат пакета для установки на Android. AAB (Android App Bundle) — формат публикации в Google Play. gptoapk.com работает с обоими: даже если приложение опубликовано в виде AAB, мы предоставим совместимый APK.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Почему я получаю ошибку 404 для некоторых приложений?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Некоторые приложения могут быть заблокированы по региону, удалены из Google Play или требовать определённой совместимости устройства. Если приложение ограничено по региону, попробуйте VPN.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Законно ли скачивать APK из Google Play?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Для личного использования, тестирования и резервного копирования — да. Распространение платных приложений или защищённого авторским правом контента без разрешения незаконно.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Связан ли gptoapk.com с Google?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Нет. gptoapk.com — независимый инструмент, не связанный с Google или Google Play.
          </div>
        </details>
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">Остались вопросы?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Попробуйте наш <Link href="/ru" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link> в действии или загляните в <Link href="/ru/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">блог</Link> за подробными руководствами.
        </p>
      </div>
    </div>
  );
}
