import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Play не работает в России? Как скачать APK без Google Play",
  description:
    "Google Play не работает в России? Полное руководство по скачиванию APK без Google Play. Альтернативные способы установки приложений.",
};

export default function GooglePlayNotWorkingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/ru" className="hover:underline">Главная</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Google Play не работает</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Google Play не работает в России? Как скачать APK без Google Play
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        С 2022 года пользователи Android в России столкнулись с серьёзными ограничениями в работе
        Google Play. Покупки, обновления и даже загрузка приложений из магазина стали невозможны
        или крайне затруднены. В этом полном руководстве мы расскажем, почему Google Play не
        работает в России и как устанавливать приложения через APK-файлы.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Почему Google Play не работает в России?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Основные причины проблем с Google Play в России:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Санкционные ограничения:</strong> Google приостановил платёжные операции и коммерческую деятельность в России.</li>
        <li><strong>Блокировка платных приложений:</strong> Купить или оплатить приложения в Google Play через российские карты невозможно.</li>
        <li><strong>Ограничение обновлений:</strong> Некоторые приложения не обновляются автоматически через Play Market.</li>
        <li><strong>Блокировка по региону:</strong> Ряд приложений недоступен для загрузки с российских IP-адресов.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Как скачать APK без Google Play</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Есть несколько способов установки приложений без Google Play. Самый простой и безопасный — использовать gptoapk.com.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">Способ 1: Использовать gptoapk.com (рекомендуется)</h3>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-6">
        <li><strong>Откройте gptoapk.com</strong> — введите URL в браузере.</li>
        <li><strong>Найдите приложение</strong> — введите название в строку поиска.</li>
        <li><strong>Скачайте APK</strong> — нажмите &quot;Скачать APK&quot; рядом с нужным приложением.</li>
        <li><strong>Установите</strong> — разрешите установку из неизвестных источников и установите APK.</li>
      </ol>

      <h3 className="text-xl font-bold mt-6 mb-3">Способ 2: Сторонние магазины приложений</h3>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-6">
        <li><strong>RuStore</strong> — официальный российский магазин приложений от VK.</li>
        <li><strong>NashStore</strong> — ещё один российский аналог Google Play.</li>
        <li><strong>APKPure</strong> — зарубежный агрегатор APK-файлов (осторожно с безопасностью).</li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Способ 3: Установка через ADB</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Для продвинутых пользователей — установка через Android Debug Bridge (ADB) с компьютера:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li>Включите &quot;Отладку по USB&quot; в Настройках → Для разработчиков.</li>
        <li>Подключите телефон к компьютеру.</li>
        <li>Выполните команду: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-sm">adb install имя_файла.apk</code></li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Как настроить Android без Google Play</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Чтобы полноценно пользоваться Android без Google Play:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li>Установите <strong>RuStore</strong> для доступа к российским приложениям.</li>
        <li>Используйте <strong>gptoapk.com</strong> для загрузки международных приложений.</li>
        <li>Для уведомлений от Google-приложений установите <strong>MicroG</strong> (на Huawei).</li>
        <li>Для платежей используйте карты &quot;Мир&quot; или альтернативные платёжные системы.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Безопасность при установке APK</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        При установке APK из сторонних источников всегда соблюдайте меры предосторожности:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li>Скачивайте APK только с проверенных сайтов (gptoapk.com, официальные сайты разработчиков).</li>
        <li>Проверяйте цифровую подпись приложения в настройках перед установкой.</li>
        <li>Не устанавливайте APK из непроверенных источников — они могут содержать вирусы.</li>
        <li>Используйте антивирус для Android для дополнительной защиты.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Часто задаваемые вопросы (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Можно ли пользоваться Google Play с VPN?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Частично. VPN может помочь открыть магазин, но для оплаты потребуется иностранная карта. Бесплатные приложения и обновления могут работать через VPN.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Как обновлять приложения без Google Play?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Скачивайте новые версии APK с gptoapk.com и устанавливайте поверх старых. Либо используйте RuStore для автоматических обновлений.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Безопасно ли использовать RuStore?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Да, RuStore — официальный российский магазин, проходящий модерацию приложений. Он считается безопасным для пользователей из РФ.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Нужно ли удалять Google Play?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Нет, Google Play можно оставить на устройстве. Установка APK вручную — это дополнительный способ, не требующий удаления магазина.</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">Нужна последняя версия APK?</p>
        <p className="mb-3">
          <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — быстрый и безопасный способ скачать любые APK файлы. Просто введите название приложения в строку поиска.
        </p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
          Перейти к поиску →
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
