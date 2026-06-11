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
  },
};

export function apkLandingUi(locale: ApkLandingLocale): UiStrings {
  return UI[locale];
}
