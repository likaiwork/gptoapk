import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Как установить APK без Google Play на Android в России",
  description:
    "Пошаговая инструкция по установке APK без Google Play. Подходит для Huawei, Xiaomi и других устройств без GMS.",
};

export default function InstallApkWithoutGooglePlayPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/ru" className="hover:underline">Главная</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Установка APK без Google Play</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Как установить APK без Google Play на Android в России
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Google Play недоступен для пользователей в России. Но это не значит, что вы не можете
        устанавливать приложения. APK-файлы позволяют вручную устанавливать любые приложения
        на Android. В этом подробном руководстве мы покажем все способы установки APK без Google Play.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Что такое APK-файл?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        APK (Android Package Kit) — это формат установочных пакетов для Android. Это аналог .exe для
        Windows или .dmg для macOS. Каждое приложение в Google Play упаковано в APK. Установка APK
        вручную — это прямой способ получить приложение без посредничества магазина.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Пошаговая инструкция по установке APK</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">Шаг 1: Разрешите установку из неизвестных источников</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Перед установкой APK необходимо разрешить установку из сторонних источников:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-6">
        <li><strong>Android 4.0–7.x:</strong> Настройки → Безопасность → Включить &quot;Неизвестные источники&quot;.</li>
        <li><strong>Android 8.0+ (Oreo и выше):</strong> Настройки → Приложения и уведомления → Специальный доступ → Установка неизвестных приложений. Выберите приложение, из которого будете устанавливать (например, &quot;Проводник&quot; или &quot;Загрузки&quot;), и разрешите установку.</li>
        <li><strong>Xiaomi (MIUI):</strong> Настройки → Дополнительные настройки → Конфиденциальность → Установка из неизвестных источников.</li>
        <li><strong>Huawei (HarmonyOS/EMUI):</strong> Настройки → Безопасность и конфиденциальность → Установка сторонних приложений.</li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Шаг 2: Скачайте APK-файл</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Используйте проверенные источники для скачивания APK:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-6">
        <li><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline">gptoapk.com</a> — скачивание напрямую с серверов Google Play.</li>
        <li>Официальные сайты разработчиков (Telegram, Signal, ProtonVPN).</li>
        <li>RuStore — российский магазин приложений от VK.</li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Шаг 3: Установите APK</h3>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li>Откройте &quot;Проводник&quot; или &quot;Мои файлы&quot; на телефоне.</li>
        <li>Перейдите в папку &quot;Загрузки&quot; (Downloads).</li>
        <li>Нажмите на APK-файл.</li>
        <li>Нажмите &quot;Установить&quot; и дождитесь завершения.</li>
        <li>Нажмите &quot;Готово&quot; или &quot;Открыть&quot;.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Установка APK на устройства без Google Mobile Services (GMS)</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">Huawei (HarmonyOS / EMUI без GMS)</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        Устройства Huawei, выпущенные после 2019 года, не имеют сервисов Google. Установка APK —
        основной способ получить приложения:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-6">
        <li>Скачайте APK через браузер на телефоне Huawei.</li>
        <li>В настройках разрешите установку из &quot;Проводника&quot;.</li>
        <li>Откройте APK и установите. Большинство приложений работает без GMS.</li>
      </ol>

      <h3 className="text-xl font-bold mt-6 mb-3">Xiaomi (MIUI)</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        На Xiaomi установка APK проста:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-6">
        <li>Включите установку из неизвестных источников в MIUI (Настройки → Дополнительные настройки → Конфиденциальность).</li>
        <li>Скачайте APK и установите через &quot;Проводник&quot;.</li>
      </ol>

      <h3 className="text-xl font-bold mt-6 mb-3">Samsung (One UI)</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        На Samsung включите &quot;Установка неизвестных приложений&quot; в настройках &quot;Мои файлы&quot;. После этого
        APK устанавливаются через встроенный файловый менеджер.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Решение проблем при установке APK</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>&quot;Приложение не установлено&quot;:</strong> Возможно, версия Android устарела или APK повреждён. Скачайте версию для вашей ОС.</li>
        <li><strong>&quot;Пакет конфликтует с существующим&quot;:</strong> APK имеет другую цифровую подпись. Удалите старую версию и установите заново.</li>
        <li><strong>&quot;Недостаточно места&quot;:</strong> Освободите память на устройстве.</li>
        <li><strong>&quot;Приложение несовместимо&quot;:</strong> Устройство не поддерживает приложение. Попробуйте более старую версию APK.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Часто задаваемые вопросы (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Безопасно ли устанавливать APK-файлы?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Да, если вы скачиваете APK с проверенных источников, таких как gptoapk.com. Всегда проверяйте источник и избегайте сомнительных сайтов.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Будут ли автоматические обновления?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Нет, при установке APK вручную автоматические обновления не работают. Вам нужно скачивать новые версии с gptoapk.com самостоятельно.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Можно ли устанавливать APK на iPhone?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Нет, APK — это формат для Android. На iPhone используется формат IPA. Используйте App Store или сторонние методы для iOS.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Что делать, если APK не устанавливается?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Проверьте совместимость версии Android, освободите память, отключите антивирус временно и попробуйте перезагрузить устройство.</p>
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
