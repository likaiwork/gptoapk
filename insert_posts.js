#!/usr/bin/env node
/**
 * Insert 2 new blog posts into each language's page.tsx file.
 * Uses sed to insert new post objects before the closing "];" of the array.
 */
const fs = require('fs');
const path = require('path');

const BASE = '/Users/likai/Documents/XCodePorject/gptoapk/src/app';
const LANGS = ['ru', 'tr', 'vi', 'fa', 'fi', 'he', 'hu', 'it', 'ms', 'nb', 'nl', 'tl', 'uk', 'ur'];

// ===== POST CONTENT =====
// Each language has post1 (safe-reliable-apk-download-sites) and post2 (apk-vs-aab-complete-comparison)

const posts = {};

// We load post content from individual files
// Let's write the content directly in the script

// ===== LOAD AND INSERT =====
function loadContent(filepath) {
  return fs.readFileSync(filepath, 'utf-8');
}

function saveContent(filepath, content) {
  fs.writeFileSync(filepath, content, 'utf-8');
}

function insertPosts(original, post1Content, post2Content) {
  // Find the last post's closing "]," before the closing "];"
  // We look for the pattern: last "  }," followed by "];"
  // Replace "  },\n];" with "  },\n" + post1 + ",\n" + post2 + "\n];"
  
  const lastPostClose = '  },\n];';
  const idx = original.lastIndexOf(lastPostClose);
  if (idx === -1) {
    console.error('ERROR: Could not find insertion point');
    return null;
  }
  
  const before = original.substring(0, idx);
  const after = original.substring(idx + lastPostClose.length);
  
  // Insert post1 and post2 with proper commas
  const insertion = `  },\n${post1Content},\n${post2Content}\n];`;
  
  return before + insertion + after;
}

// ===== POST 1: safe-reliable-apk-download-sites =====
// This will be a large block for each language

const postContents = {
  ru: {
    post1: `  {
    slug: "safe-reliable-apk-download-sites",
    title: "10 надёжных сайтов для скачивания APK: безопасный гид (2026)",
    description: "Полный обзор безопасных сайтов для скачивания APK-файлов. Почему gptoapk.com, APKMirror, APKPure, F-Droid и GitHub Releases — лучшие источники. Чек-лист безопасности для проверки APK.",
    date: "2026-05-11",
    readTime: "8 min read",
    tags: ["Безопасность APK", "Скачать APK", "Сторонние магазины"],
    content: (
      <>
        <p>Google Play Маркет — главный источник Android-приложений, но он доступен не всегда. Возможно, ваше устройство не поддерживает новейшие версии, нужна старая версия приложения, или вы находитесь в регионе, где определённое приложение недоступно. В таких случаях на помощь приходят надёжные APK-сайты.</p>
        <h2>Почему не все APK-сайты одинаково безопасны?</h2>
        <p>Скачивание APK из непроверенных источников — одна из главных угроз для Android. Злоумышленники могут модифицировать APK, внедряя вредоносный код, рекламное ПО или программы-шпионы. Вот почему так важно выбирать проверенные сайты для скачивания APK.</p>
        <h2>1. gptoapk.com — самый безопасный вариант</h2>
        <p><a href="https://gptoapk.com">gptoapk.com</a> — это веб-инструмент, который загружает APK-файлы напрямую из CDN Google Play. Файлы не проходят через сторонние серверы — они поступают к вам прямиком от Google. Это исключает возможность подмены файла. Просто вставьте ссылку на приложение из Google Play — и получите оригинальный APK.</p>
        <h2>2. APKMirror</h2>
        <p>APKMirror — один из самых авторитетных сайтов для скачивания APK. Каждый файл проходит проверку подписи: сайт автоматически сверяет подпись APK с оригинальной подписью разработчика. Если подпись не совпадает — файл не публикуется. Это золотой стандарт среди сторонних APK-зеркал.</p>
        <h2>3. APKPure</h2>
        <p>APKPure — популярная альтернатива Google Play, особенно в регионах, где сервисы Google недоступны (например, в Китае). У APKPure есть собственное приложение-магазин. Однако будьте внимательны: APKPure не всегда проверяет подписи так же строго, как APKMirror, поэтому скачивайте только проверенные приложения.</p>
        <h2>4. F-Droid</h2>
        <p>F-Droid — это репозиторий исключительно свободных приложений с открытым исходным кодом. Все приложения собираются из исходного кода самим F-Droid, что гарантирует отсутствие вредоносного кода. Идеальный выбор для сторонников open-source и конфиденциальности.</p>
        <h2>5. GitHub Releases</h2>
        <p>Многие разработчики публикуют APK напрямую на страницах своих проектов на GitHub. Это самый прямой способ получить приложение от автора: никаких посредников, только оригинальный файл. Ищите раздел "Releases" в репозитории проекта.</p>
        <h2>Чек-лист безопасности при скачивании APK</h2>
        <p>Прежде чем установить APK из любого источника, выполните эти шаги:</p>
        <ol>
          <li><strong>Проверьте подпись через keytool:</strong> <code>keytool -printcert -jarfile app.apk</code> — сравните сертификат с официальным.</li>
          <li><strong>Просканируйте на VirusTotal:</strong> загрузите файл на virustotal.com — если хотя бы один антивирус обнаружит угрозу, не устанавливайте.</li>
          <li><strong>Проверьте разрешения:</strong> если простой калькулятор запрашивает доступ к контактам и SMS — это тревожный сигнал.</li>
          <li><strong>Скачивайте только из надёжных источников:</strong> используйте gptoapk.com, APKMirror, F-Droid или GitHub Releases.</li>
        </ol>
        <h2>Заключение</h2>
        <p>Безопасное скачивание APK начинается с правильного выбора источника. <a href="https://gptoapk.com">gptoapk.com</a> — самый безопасный вариант, поскольку файлы загружаются напрямую от Google. APKMirror, APKPure, F-Droid и GitHub Releases — отличные альтернативы для разных сценариев. Всегда проверяйте подпись и сканируйте файлы перед установкой.</p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Скачивайте APK безопасно</p>
          <p className="mb-3">Попробуйте <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — загружайте APK напрямую с серверов Google Play. Никаких посредников, 100% оригинальные файлы.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Перейти к APK-загрузчику<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
        </div>
      </>
    ),
  }`,
    post2: `  {
    slug: "apk-vs-aab-complete-comparison",
    title: "APK против AAB: полное сравнение форматов Android (2026)",
    description: "Полное руководство по форматам APK и AAB. Что внутри APK, чем AAB отличается, как AAB влияет на размер загрузки и как конвертировать с помощью bundletool.",
    date: "2026-05-11",
    readTime: "8 min read",
    tags: ["APK", "AAB", "Android", "Сравнение"],
    content: (
      <>
        <p>Если вы когда-нибудь задумывались, в чём разница между APK и AAB (Android App Bundle) — вы не одиноки. С 2021 года Google требует формат AAB для новых приложений в Play Store, но APK остаётся стандартом для прямой установки. Давайте разберёмся.</p>
        <h2>Что такое APK?</h2>
        <p>APK (Android Package Kit) — это формат установочного пакета Android. Это архив, который содержит всё необходимое для работы приложения:</p>
        <ul>
          <li><strong>AndroidManifest.xml</strong> — идентификатор приложения, разрешения, компоненты</li>
          <li><strong>classes.dex</strong> — скомпилированный код Java/Kotlin, который исполняет Android Runtime</li>
          <li><strong>res/</strong> — ресурсы: изображения, макеты, строки перевода</li>
          <li><strong>lib/</strong> — нативные библиотеки под разные архитектуры (arm64-v8a, armeabi-v7a, x86_64)</li>
          <li><strong>META-INF/</strong> — цифровые подписи для проверки целостности файла</li>
          <li><strong>resources.arsc</strong> — индекс скомпилированных ресурсов для быстрого поиска</li>
        </ul>
        <h2>Что такое AAB?</h2>
        <p>AAB (Android App Bundle) — это издательский формат, предназначенный только для загрузки в Google Play. Он содержит все ресурсы приложения, но не является установочным файлом. Google Play использует AAB для генерации оптимизированного APK под каждое конкретное устройство — с учётом его плотности экрана, архитектуры процессора и языка.</p>
        <h2>APK vs AAB: ключевые отличия</h2>
        <table className="min-w-full border-collapse border border-slate-300 dark:border-slate-600 my-4 text-sm">
          <thead><tr className="bg-slate-100 dark:bg-slate-700"><th className="border border-slate-300 dark:border-slate-600 p-2">Характеристика</th><th className="border border-slate-300 dark:border-slate-600 p-2">APK</th><th className="border border-slate-300 dark:border-slate-600 p-2">AAB</th></tr></thead>
          <tbody>
            <tr><td className="border border-slate-300 dark:border-slate-600 p-2"><strong>Установка</strong></td><td className="border border-slate-300 dark:border-slate-600 p-2">Прямая установка</td><td className="border border-slate-300 dark:border-slate-600 p-2">Требуется конвертация через Google Play</td></tr>
            <tr><td className="border border-slate-300 dark:border-slate-600 p-2"><strong>Ресурсы</strong></td><td className="border border-slate-300 dark:border-slate-600 p-2">Все ресурсы для всех устройств</td><td className="border border-slate-300 dark:border-slate-600 p-2">Только ресурсы для конкретного устройства</td></tr>
            <tr><td className="border border-slate-300 dark:border-slate-600 p-2"><strong>Подписи</strong></td><td className="border border-slate-300 dark:border-slate-600 p-2">v1, v2, v3</td><td className="border border-slate-300 dark:border-slate-600 p-2">v2, v3 (без v1)</td></tr>
          </tbody>
        </table>
        <h2>Что это значит для пользователя?</h2>
        <p>Для обычных пользователей разница прозрачна: когда вы скачиваете приложение из Google Play, магазин автоматически генерирует и оптимизирует APK из AAB под ваше устройство. Загрузка становится меньше, установка — быстрее. Однако при скачивании APK из сторонних источников и зеркал вы получаете универсальный APK со всеми ресурсами.</p>
        <h2>Как конвертировать AAB в APK?</h2>
        <p>Если у вас есть AAB-файл и вы хотите установить его напрямую, используйте bundletool от Google:</p>
        <pre><code>{`java -jar bundletool.jar build-apks --bundle=/path/app.aab --output=/path/app.apks`}</code></pre>
        <p>После этого распакуйте полученный <code>.apks</code> файл — внутри вы найдёте APK для вашего устройства. Затем установите стандартной командой <code>adb install</code>.</p>
        <h2>FAQ</h2>
        <p><strong>Можно ли установить AAB напрямую на телефон?</strong><br/>Нет, AAB — это издательский формат. Его нужно сначала преобразовать в APK через bundletool или Google Play.</p>
        <p><strong>Какой формат скачивается через gptoapk.com?</strong><br/><a href="https://gptoapk.com">gptoapk.com</a> загружает APK, сгенерированный Google Play из AAB-файла. Вы получаете готовый к установке оптимизированный APK.</p>
        <p><strong>Какой формат мне выбрать как пользователю?</strong><br/>Для установки — APK. Для загрузки в магазин — AAB. Для резервного копирования — APK (он самодостаточен).</p>
        <p><strong>Влияет ли AAB на модификации и патчи?</strong><br/>Да. Работа с AAB сложнее, так как перед модификацией его нужно собрать в целостный APK. Большинство инструментов для патчинга и моддинга всё ещё работают с APK.</p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Скачивайте APK без лишних сложностей</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — получайте готовый APK прямо из Google Play. Не нужно разбираться с AAB и bundletool. Просто вставьте ссылку.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Попробовать APK-загрузчик<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
        </div>
      </>
    ),
  }`
  },
  tr: {
    post1: ``,
    post2: ``
  },
  vi: { post1: ``, post2: `` },
  fa: { post1: ``, post2: `` },
  fi: { post1: ``, post2: `` },
  he: { post1: ``, post2: `` },
  hu: { post1: ``, post2: `` },
  it: { post1: ``, post2: `` },
  ms: { post1: ``, post2: `` },
  nb: { post1: ``, post2: `` },
  nl: { post1: ``, post2: `` },
  tl: { post1: ``, post2: `` },
  uk: { post1: ``, post2: `` },
  ur: { post1: ``, post2: `` }
};

console.log('Script skeleton ready - needs full post content for all languages');
console.log('Total languages:', LANGS.length);
