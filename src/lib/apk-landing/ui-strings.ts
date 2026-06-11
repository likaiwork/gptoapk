import type { ApkLandingLocale } from "./types";

type UiStrings = {
  home: string;
  searchCta: string;
  searchHint: (app: string) => string;
  quickAnswer: string;
  aiSummary: string;
  aboutApp: string;
  versionInfo: string;
  version: string;
  size: string;
  android: string;
  package: string;
  developer: string;
  updated: string;
  downloadCta: string;
  installTitle: string;
  downloadTitle: string;
  safetyTitle: string;
  faqTitle: string;
  relatedTitle: string;
  trustVerified: string;
  trustSources: string;
  downloadApk: string;
  viewAppPage: string;
  aboutVersion: string;
  playStoreInstall: string;
  paidAppNoApk: string;
  paidAppBanner: string;
  delistedBannerTitle: string;
  delistedBannerDefault: string;
  screenshotsTitle: string;
  permissionsTitle: string;
  permissionsHint: string;
  permissionsPlayLink: string;
};

const UI: Record<ApkLandingLocale, UiStrings> = {
  en: {
    home: "Home",
    searchCta: "Search & download APK",
    searchHint: (app) => `Search "${app}" on gptoapk to get the latest APK from Play sources.`,
    quickAnswer: "Quick answer",
    aiSummary: "Summary",
    aboutApp: "About this app",
    versionInfo: "Version & package info",
    version: "Version",
    size: "APK size",
    android: "Android",
    package: "Package name",
    developer: "Developer",
    updated: "Updated",
    downloadCta: "Go to search",
    installTitle: "How to install",
    downloadTitle: "How to download",
    safetyTitle: "Safety & sources",
    faqTitle: "FAQ",
    relatedTitle: "Related guides",
    trustVerified: "Play-sourced metadata",
    trustSources: "APK files are fetched from Google Play–linked sources, not third-party mod sites.",
    downloadApk: "Download APK",
    viewAppPage: "Open full app page",
    aboutVersion: "About this version",
    playStoreInstall: "Install from Google Play",
    paidAppNoApk: "Paid app — no direct APK download; purchase on Google Play",
    paidAppBanner:
      "This is a paid app on Google Play. gptoapk does not host paid or mod APK files — use the button above to install from Play.",
    delistedBannerTitle: "No longer on Google Play",
    delistedBannerDefault:
      "This app was removed from Google Play. Mirror APKs may be outdated or unavailable — use trusted sources only.",
    screenshotsTitle: "Screenshots",
    permissionsTitle: "App permissions",
    permissionsHint:
      "Review what this app can access on your device. We link to Google Play's official data safety page — no fake scan reports.",
    permissionsPlayLink: "View permissions on Google Play",
  },
  hi: {
    home: "होम",
    searchCta: "APK खोजें और डाउनलोड करें",
    searchHint: (app) => `gptoapk पर "${app}" खोजें — Play स्रोतों से नवीनतम APK।`,
    quickAnswer: "त्वरित उत्तर",
    aiSummary: "सारांश",
    aboutApp: "इस ऐप के बारे में",
    versionInfo: "संस्करण और पैकेज जानकारी",
    version: "संस्करण",
    size: "APK आकार",
    android: "Android",
    package: "पैकेज नाम",
    developer: "डेवलपर",
    updated: "अपडेट",
    downloadCta: "खोज पर जाएँ",
    installTitle: "इंस्टॉल कैसे करें",
    downloadTitle: "डाउनलोड कैसे करें",
    safetyTitle: "सुरक्षा और स्रोत",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    relatedTitle: "संबंधित गाइड",
    trustVerified: "Play-स्रोत मेटाडेटा",
    trustSources: "APK Google Play–लिंक्ड स्रोतों से मिलता है, मॉड साइटों से नहीं।",
    downloadApk: "APK डाउनलोड करें",
    viewAppPage: "पूरा ऐप पेज खोलें",
    aboutVersion: "इस संस्करण के बारे में",
    playStoreInstall: "Google Play से इंस्टॉल करें",
    paidAppNoApk: "पेड ऐप — सीधा APK नहीं; Google Play से खरीदें",
    paidAppBanner:
      "यह Google Play पर पेड ऐप है। gptoapk पेड/mod APK होस्ट नहीं करता — ऊपर बटन से Play पर इंस्टॉल करें।",
    delistedBannerTitle: "Google Play पर अब उपलब्ध नहीं",
    delistedBannerDefault:
      "यह ऐप Play Store से हटा दिया गया। मिरर APK पुराने या अनुपलब्ध हो सकते हैं — केवल विश्वसनीय स्रोत उपयोग करें।",
    screenshotsTitle: "स्क्रीनशॉट",
    permissionsTitle: "ऐप अनुमतियाँ",
    permissionsHint:
      "देखें यह ऐप आपके डिवाइस पर क्या एक्सेस कर सकता है। हम Google Play के आधिकारिक डेटा सेफ्टी पेज से लिंक करते हैं।",
    permissionsPlayLink: "Google Play पर अनुमतियाँ देखें",
  },
  id: {
    home: "Beranda",
    searchCta: "Cari & unduh APK",
    searchHint: (app) => `Cari "${app}" di gptoapk untuk APK terbaru dari sumber Play.`,
    quickAnswer: "Jawaban singkat",
    aiSummary: "Ringkasan",
    aboutApp: "Tentang aplikasi",
    versionInfo: "Info versi & paket",
    version: "Versi",
    size: "Ukuran APK",
    android: "Android",
    package: "Nama paket",
    developer: "Pengembang",
    updated: "Diperbarui",
    downloadCta: "Ke pencarian",
    installTitle: "Cara instal",
    downloadTitle: "Cara unduh",
    safetyTitle: "Keamanan & sumber",
    faqTitle: "FAQ",
    relatedTitle: "Panduan terkait",
    trustVerified: "Metadata dari Play",
    trustSources: "APK diambil dari sumber terkait Google Play, bukan situs mod.",
    downloadApk: "Unduh APK",
    viewAppPage: "Buka halaman aplikasi",
    aboutVersion: "Tentang versi ini",
    playStoreInstall: "Instal dari Google Play",
    paidAppNoApk: "Aplikasi berbayar — tidak ada APK langsung; beli di Google Play",
    paidAppBanner:
      "Ini aplikasi berbayar di Google Play. gptoapk tidak menyediakan APK berbayar/mod — gunakan tombol di atas.",
    delistedBannerTitle: "Tidak lagi di Google Play",
    delistedBannerDefault:
      "Aplikasi ini dihapus dari Google Play. APK mirror mungkin usang atau tidak tersedia — gunakan sumber tepercaya.",
    screenshotsTitle: "Tangkapan layar",
    permissionsTitle: "Izin aplikasi",
    permissionsHint:
      "Tinjau apa yang dapat diakses aplikasi di perangkat Anda. Kami menaut ke halaman data safety resmi Google Play.",
    permissionsPlayLink: "Lihat izin di Google Play",
  },
  zh: {
    home: "首页",
    searchCta: "搜索并下载 APK",
    searchHint: (app) => `在 gptoapk 搜索「${app}」获取 Play 来源的最新 APK。`,
    quickAnswer: "快速结论",
    aiSummary: "摘要",
    aboutApp: "应用简介",
    versionInfo: "版本与包信息",
    version: "版本",
    size: "APK 大小",
    android: "Android",
    package: "包名",
    developer: "开发者",
    updated: "更新日期",
    downloadCta: "前往搜索",
    installTitle: "安装步骤",
    downloadTitle: "下载步骤",
    safetyTitle: "安全与来源",
    faqTitle: "常见问题",
    relatedTitle: "相关指南",
    trustVerified: "Play 来源元数据",
    trustSources: "APK 来自 Google Play 关联源，非第三方魔改站。",
    downloadApk: "下载 APK",
    viewAppPage: "打开完整应用页",
    aboutVersion: "版本信息",
    playStoreInstall: "前往 Google Play 安装",
    paidAppNoApk: "付费应用 — 无法直接下载 APK，请通过 Google Play 购买",
    paidAppBanner:
      "该应用在 Google Play 为付费应用。gptoapk 不提供付费/破解 APK，请使用上方按钮前往 Play 安装。",
    delistedBannerTitle: "已从 Google Play 下架",
    delistedBannerDefault:
      "该应用已从 Google Play 移除。镜像 APK 可能过时或无法获取，请仅使用可信来源。",
    screenshotsTitle: "应用截图",
    permissionsTitle: "应用权限",
    permissionsHint:
      "查看该应用可访问的设备权限。我们链接到 Google Play 官方数据安全页，不提供虚假扫描报告。",
    permissionsPlayLink: "在 Google Play 查看权限",
  },
};

export function apkLandingUi(locale: ApkLandingLocale): UiStrings {
  return UI[locale];
}
