import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function RuHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"Ищите по названию приложения, вставьте ссылку Google Play или введите имя пакета, чтобы найти приложение и создать ссылку на загрузку APK."}
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
          <h3 className="text-xl font-bold mb-3">Быстрая загрузка</h3>
          <p className="text-slate-600 dark:text-slate-400">Без ожидания и капчи. Прямые ссылки на загрузку генерируются мгновенно.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Безопасно и надёжно</h3>
          <p className="text-slate-600 dark:text-slate-400">Файлы берутся прямо с серверов Google. Никаких изменений — 100 % оригинальные APK.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Без регистрации</h3>
          <p className="text-slate-600 dark:text-slate-400">Полностью бесплатно. Не нужны аккаунты и расширения.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Как скачать APK из Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Скопируйте ссылку Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">Найдите приложение в Google Play и скопируйте URL из адресной строки.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Вставьте и сгенерируйте</h3>
              <p className="text-slate-600 dark:text-slate-400">Вставьте ссылку в поле выше и нажмите кнопку «Сгенерировать ссылку».</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Скачайте свой APK</h3>
              <p className="text-slate-600 dark:text-slate-400">Нажмите на ссылку для загрузки APK-файла и установите его на Android-устройство.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">Почему стоит выбрать gptoapk.com?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Прямо от Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Файлы загружаются напрямую с серверов Google</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Без хранения</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Файлы проходят через серверы, но никогда не сохраняются</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100 % бесплатно</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Без скрытых платежей и премиум-планов</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Без регистрации</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Начинайте загрузку сразу</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">Руководства и советы по APK</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Узнайте больше об APK-файлах, установке и лучших инструментах для извлечения APK из Google Play.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/ru/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Как скачать APK из Google Play: полное руководство</h3>
            <p className="text-sm text-slate-500 mt-2">Полный гид: веб-инструменты, ADB и лучшие практики.</p>
          </Link>
          <Link href="/ru/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Что такое APK-файл?</h3>
            <p className="text-sm text-slate-500 mt-2">Всё, что нужно знать о пакетах установки Android.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/ru/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Все статьи →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Частые вопросы</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Как скачать APK из Google Play?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Просто вставьте ссылку Google Play на этой странице и нажмите «Сгенерировать ссылку». Загрузка APK будет готова за несколько секунд.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Безопасно ли скачивать APK-файлы?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Да. Наш инструмент получает файлы напрямую с серверов Google. APK на 100 % оригинальны и не изменены.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Нужно ли что-то устанавливать?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Нет. gptoapk.com работает полностью в браузере, без расширений и приложений.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/ru/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Все вопросы →
          </Link>
        </div>
      </div>
    </div>
  );
}
