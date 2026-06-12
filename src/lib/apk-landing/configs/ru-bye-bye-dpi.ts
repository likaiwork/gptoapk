import type { ApkLandingConfig } from "../types";

export const ruByeByeDpiApkConfig: ApkLandingConfig = {
  locale: "ru",
  slug: "bye-bye-dpi-apk",
  appName: "ByeByeDPI",
  developer: "romanvht",
  category: "Tools",
  packageName: "io.github.romanvht.byedpi",
  version: "1.7.x",
  updated: "2026",
  apkSize: "~6 MB",
  minAndroid: "Android 5.0+",
  searchQuery: "ByeByeDPI",
  datePublished: "2026-06-12",
  keywords: [
    "bye bye dpi",
    "byebyedpi",
    "bye bye dpi скачать",
    "скачать bye bye dpi",
    "bye bye dpi vpn скачать",
    "io.github.romanvht.byedpi",
  ],
  quickAnswer:
    "ByeByeDPI (io.github.romanvht.byedpi) — локальный DPI bypass для Android. Это не VPN-сервис: трафик не уходит на удалённый сервер. Appteka и 4PDA часто ищут bye bye dpi скачать — gptoapk даёт APK из открытых источников.",
  aiSummary:
    "Appteka получает топ-трафик из РФ по запросам byebyedpi / скачать bye bye dpi. Официальный форк romanvht: пакет io.github.romanvht.byedpi. Приложение использует VPN-режим Android только для перенаправления трафика локально.",
  intro:
    "Если вы искали скачать bye bye dpi или bye bye dpi vpn скачать — ниже пакет, установка и отличие от обычного VPN.",
  aboutApp:
    "ByeByeDPI запускает ByeDPI локально и перенаправляет TCP-трафик для обхода DPI. Форк ByeDPIAndroid с фильтром приложений и автозапуском. Популярен в России при ограничениях доступа.",
  downloadSteps: [
    "Найдите ByeByeDPI или io.github.romanvht.byedpi на gptoapk.",
    "Скачайте APK.",
    "Установите и предоставьте разрешение VPN при первом запуске.",
  ],
  installSteps: [
    "Разрешите установку из неизвестных источников.",
    "Откройте APK и установите.",
    "Запустите приложение и настройте стратегию ByeDPI (см. документацию GitHub).",
    "Включите туннель — это локальный режим, не удалённый VPN.",
  ],
  safetyNote:
    "Скачивайте только проверенные сборки. gptoapk не распространяет моды без указания источника. Это инструмент обхода DPI, а не анонимайзер — IP не скрывается.",
  faqs: [
    {
      question: "Чем ByeByeDPI отличается от VPN?",
      answer:
        "Использует VPN-режим Android локально, но не отправляет трафик на сервер и не шифрует его как коммерческий VPN.",
    },
    {
      question: "Имя пакета?",
      answer: "io.github.romanvht.byedpi — форк romanvht. Оригинал dovecoteescapee: io.github.dovecoteescapee.byedpi.",
    },
    {
      question: "Почему Appteka в топе по этому запросу?",
      answer: "UGC-маркетплейс ловит высокочастотные RU-запросы; gptoapk даёт Play/GitHub-метаданные и APK.",
    },
    {
      question: "Легально ли использовать?",
      answer: "Зависит от законов вашей страны и условий провайдера; это технический инструмент, не юридическая консультация.",
    },
  ],
  relatedLinks: [
    { href: "/ru/vpn-apk", label: "VPN APK для России" },
    { href: "/ru/telegram-apk", label: "Telegram APK" },
    { href: "/ru/install-apk-without-google-play", label: "Установка APK без Play" },
  ],
};
