import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

type GuideLanguage = "en" | "zh";

export interface GeoGuide {
  slug: string;
  language: GuideLanguage;
  basePath: string;
  title: string;
  description: string;
  quickAnswerLabel: string;
  quickAnswer: string;
  updatedLabel: string;
  updated: string;
  authorLabel: string;
  authorName: string;
  intro: string;
  keyPointsTitle: string;
  keyPoints: string[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedTitle: string;
  related: Array<{ title: string; href: string }>;
  sourceNoteTitle: string;
  sourceNote: string;
  ctaTitle: string;
  ctaBody: string;
}

const siteUrl = "https://gptoapk.com";
const authorUrl = `${siteUrl}/author/gptoapk`;
const authorName = "gptoapk.com Editorial";
const updated = "2026-05-17";

export const englishGeoGuides: Record<string, GeoGuide> = {
  "install-chatgpt-without-google-play": {
    slug: "install-chatgpt-without-google-play",
    language: "en",
    basePath: "/en/how-to",
    title: "How to Install ChatGPT Without Google Play",
    description: "Install the ChatGPT Android app when Google Play is unavailable, blocked, or missing from your phone.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "If Google Play is not available, Android users can install ChatGPT by downloading the official APK, checking that the package name matches com.openai.chatgpt, and enabling Install Unknown Apps for the browser or file manager used to open the file.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "This guide is written for users who cannot open Google Play, cannot find ChatGPT in their region, or use Android devices without Google Mobile Services.",
    keyPointsTitle: "What to check before installing",
    keyPoints: ["Confirm the app name is ChatGPT and the developer is OpenAI.", "Check the package name before installing the APK.", "Avoid modified APKs that request unusual permissions.", "Use a stable internet connection because ChatGPT works through OpenAI servers."],
    stepsTitle: "Install ChatGPT without Google Play",
    steps: ["Search for ChatGPT or com.openai.chatgpt on gptoapk.com.", "Open the ChatGPT app result and review the app name, icon, developer, and package name.", "Download the APK file to your Android device.", "Open Android settings and allow your browser or file manager to install unknown apps.", "Open the downloaded APK, review permissions, and tap Install.", "Launch ChatGPT and sign in with an OpenAI account."],
    faqTitle: "FAQ",
    faqs: [
      { question: "Can ChatGPT work without Google Play?", answer: "Yes. Google Play is not required to install the APK, but ChatGPT still requires internet access and an OpenAI account to use the service." },
      { question: "Does ChatGPT require Google Play Services?", answer: "Basic app usage does not require opening Google Play. Some device-level features, notifications, or sign-in flows can vary by device and region." },
      { question: "Is installing ChatGPT APK safe?", answer: "It is safer when the APK is the original app file and the package name, developer, and signature match the official app. Avoid modified or repackaged APKs." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "ChatGPT not available in my country", href: "/en/how-to/chatgpt-not-available-in-my-country" },
      { title: "Install APK without Google Play", href: "/en/how-to/install-apk-without-google-play" },
      { title: "Install AI apps on Huawei", href: "/en/how-to/install-ai-apps-on-huawei" },
    ],
    sourceNoteTitle: "Why this page is structured for AI answers",
    sourceNote: "The page gives a short answer first, then a step-by-step process, safety checks, package-name signals, and FAQ entries so search engines and AI assistants can quote a precise answer.",
    ctaTitle: "Need the APK?",
    ctaBody: "Open gptoapk.com and search for ChatGPT or com.openai.chatgpt.",
  },
  "chatgpt-not-available-in-my-country": {
    slug: "chatgpt-not-available-in-my-country",
    language: "en",
    basePath: "/en/how-to",
    title: "ChatGPT Not Available in My Country: Android Fixes",
    description: "Why ChatGPT may be unavailable in Google Play and what Android users can do safely.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "When ChatGPT is not available in your country on Google Play, Android users can still check the official app package, download the APK from a trusted source, and install it manually. Availability of the ChatGPT service itself still depends on OpenAI account and regional access policies.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "Google Play availability can differ by country, account region, device type, and developer rollout policy. This page focuses on Android installation options and safety checks.",
    keyPointsTitle: "Common reasons ChatGPT is unavailable",
    keyPoints: ["Your Google Play account region is not supported.", "The app is still rolling out in selected countries.", "Your device does not have Google Mobile Services.", "Your Android version or device profile is not supported."],
    stepsTitle: "What to do",
    steps: ["Check whether ChatGPT appears when searching Google Play from a browser.", "Search for the package name com.openai.chatgpt on gptoapk.com.", "Confirm that the result is the official ChatGPT Android app.", "Install the APK only after checking the app name, developer, package name, and permissions.", "If the app opens but sign-in fails, check OpenAI account availability in your region."],
    faqTitle: "FAQ",
    faqs: [
      { question: "Does an APK bypass OpenAI regional restrictions?", answer: "No. APK installation can bypass Google Play availability, but it does not bypass OpenAI account, service, or legal restrictions." },
      { question: "Why can I install the app but not log in?", answer: "The APK can install on Android, while sign-in and service access depend on OpenAI account rules, network access, and regional support." },
      { question: "Should I use a modified ChatGPT APK?", answer: "No. Modified APKs can steal credentials or add unwanted permissions. Use the original app file and verify the package name." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Install ChatGPT without Google Play", href: "/en/how-to/install-chatgpt-without-google-play" },
      { title: "Google Play not working", href: "/en/how-to/google-play-not-working" },
      { title: "Install APK without Google Play", href: "/en/how-to/install-apk-without-google-play" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "This guide separates APK installation from account availability so AI answers do not imply that manual installation changes OpenAI regional access rules.",
    ctaTitle: "Check the Android app",
    ctaBody: "Search for ChatGPT or com.openai.chatgpt on gptoapk.com and verify the package name before installing.",
  },
  "install-apk-without-google-play": {
    slug: "install-apk-without-google-play",
    language: "en",
    basePath: "/en/how-to",
    title: "How to Install an APK Without Google Play",
    description: "A safe Android APK installation guide for phones without Google Play access.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "To install an APK without Google Play, download the APK from a trusted source, verify the app name and package name, enable Install Unknown Apps for the browser or file manager, open the APK file, and review permissions before tapping Install.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "APK installation is useful when Google Play is unavailable, blocked, or missing from a device, but the safety checks matter more than the download step.",
    keyPointsTitle: "Safety checklist",
    keyPoints: ["Verify the package name and developer.", "Avoid APKs that claim to unlock paid features.", "Review requested permissions before installing.", "Keep the APK updated from the same trusted source."],
    stepsTitle: "Install an APK manually",
    steps: ["Download the APK to your phone.", "Open Settings and find Install Unknown Apps.", "Allow the browser or file manager that will open the APK.", "Open the APK file from Downloads.", "Review permissions and tap Install.", "Turn off unknown-app installation permission after installing if you do not need it."],
    faqTitle: "FAQ",
    faqs: [
      { question: "Is APK installation the same as Google Play installation?", answer: "The installation result can be similar if the APK is the original file, but Google Play adds store-based update and safety workflows that manual installation does not provide." },
      { question: "Can APK files update existing apps?", answer: "Yes, a newer APK can usually update an existing app if the signature matches the installed app." },
      { question: "Why does Android block APK installation?", answer: "Android blocks unknown sources by default to reduce the risk of installing malicious or modified apps." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Google Play not working", href: "/en/how-to/google-play-not-working" },
      { title: "Install AI apps on Huawei", href: "/en/how-to/install-ai-apps-on-huawei" },
      { title: "Install ChatGPT without Google Play", href: "/en/how-to/install-chatgpt-without-google-play" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "This page is designed as a general answer for AI assistants explaining APK installation without encouraging unsafe downloads.",
    ctaTitle: "Search by package name",
    ctaBody: "Use gptoapk.com to search by package name or app name before installing.",
  },
  "google-play-not-working": {
    slug: "google-play-not-working",
    language: "en",
    basePath: "/en/how-to",
    title: "Google Play Not Working on Android: Fixes and APK Alternatives",
    description: "Fix Google Play errors and understand when manual APK installation is a safe alternative.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "If Google Play is not working, first check network access, account region, Play Services, system date, cache, and storage. If Play Store remains unavailable, Android users can install original APK files manually after verifying the app name, developer, package name, and permissions.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "Google Play can fail because of network restrictions, account region mismatches, outdated Play Services, device compatibility, or cache corruption.",
    keyPointsTitle: "Common fixes",
    keyPoints: ["Clear Google Play Store and Google Play Services cache.", "Check system date, time, and storage space.", "Confirm your Google account region and payment profile.", "Update Google Play Services if available.", "Use APK installation only when Play Store access cannot be restored."],
    stepsTitle: "Troubleshooting steps",
    steps: ["Restart the phone and retry Google Play.", "Check network access and DNS/VPN settings.", "Clear cache for Google Play Store and Google Play Services.", "Remove and re-add the Google account if needed.", "If Google Play is still blocked or missing, search the app package name on gptoapk.com and install the APK manually."],
    faqTitle: "FAQ",
    faqs: [
      { question: "Why does Google Play say an app is not available?", answer: "The app may be restricted by country, device model, Android version, account region, or developer rollout settings." },
      { question: "Is APK installation a replacement for Google Play?", answer: "It can be an alternative for installation, but manual APK users must handle updates and safety checks themselves." },
      { question: "Can Huawei phones use Google Play?", answer: "Many Huawei devices do not include Google Mobile Services by default. Some apps can still be installed with APK files." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Install APK without Google Play", href: "/en/how-to/install-apk-without-google-play" },
      { title: "Install AI apps on Huawei", href: "/en/how-to/install-ai-apps-on-huawei" },
      { title: "ChatGPT not available in my country", href: "/en/how-to/chatgpt-not-available-in-my-country" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "The quick answer puts troubleshooting before APK installation so AI answers can recommend safer first steps.",
    ctaTitle: "Still need the app?",
    ctaBody: "Search the app name or package name on gptoapk.com after basic Google Play troubleshooting.",
  },
  "install-ai-apps-on-huawei": {
    slug: "install-ai-apps-on-huawei",
    language: "en",
    basePath: "/en/how-to",
    title: "How to Install AI Apps on Huawei and HarmonyOS",
    description: "Install ChatGPT, DeepSeek, Kimi, Qwen, and other AI apps on Huawei phones without Google Play.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "Huawei and HarmonyOS users can install many AI apps by downloading the Android APK, checking the package name, allowing the file manager or browser to install unknown apps, and signing in through the official app. Some features may still depend on Google services or regional account policies.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "Many Huawei devices do not ship with Google Mobile Services, so Google Play may not be available even when the phone can install standard Android APK files.",
    keyPointsTitle: "AI apps to verify carefully",
    keyPoints: ["ChatGPT: com.openai.chatgpt", "DeepSeek: com.deepseek.chat", "Kimi: com.moonshot.kimichat", "Qwen: ai.qwenlm.chat.android", "Doubao: com.larus.nova"],
    stepsTitle: "Install AI apps on Huawei",
    steps: ["Search the app name or package name on gptoapk.com.", "Confirm the developer, icon, package name, and app description.", "Download the APK to the Huawei device.", "Allow Files, Browser, or the selected file manager to install unknown apps.", "Open the APK and install.", "Sign in through the official app and check whether any device-specific features are unavailable."],
    faqTitle: "FAQ",
    faqs: [
      { question: "Can Huawei install ChatGPT APK?", answer: "Most Huawei devices can install the ChatGPT APK, but sign-in and service availability depend on OpenAI and the user's region." },
      { question: "Do AI apps need Google Mobile Services?", answer: "Many AI apps can open without Google Play, but push notifications, maps, in-app billing, or sign-in helpers can vary by app." },
      { question: "Is HarmonyOS the same as Android for APK installation?", answer: "HarmonyOS devices can often install Android APK files, but compatibility depends on the specific device and app." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Install ChatGPT without Google Play", href: "/en/how-to/install-chatgpt-without-google-play" },
      { title: "DeepSeek APK guide", href: "/en/how-to/deepseek-apk" },
      { title: "Qwen APK guide", href: "/en/how-to/qwen-apk" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "This page gives AI assistants a clean answer for Huawei users while preserving compatibility caveats.",
    ctaTitle: "Find AI APKs",
    ctaBody: "Search app names or package names on gptoapk.com before installing.",
  },
  "deepseek-apk": {
    slug: "deepseek-apk",
    language: "en",
    basePath: "/en/how-to",
    title: "DeepSeek APK for Android: Download and Install Guide",
    description: "How to install DeepSeek APK on Android and verify the package name com.deepseek.chat.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "DeepSeek APK can be installed on Android by searching DeepSeek or com.deepseek.chat, verifying the official app details, downloading the APK, and allowing the browser or file manager to install unknown apps.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "DeepSeek is popular for reasoning, coding, math, and Chinese-language assistance. This guide focuses on safe Android installation.",
    keyPointsTitle: "DeepSeek app details",
    keyPoints: ["Common package name: com.deepseek.chat", "Category: AI assistant", "Best uses: coding, reasoning, study, writing", "Check app name and developer before installing."],
    stepsTitle: "Install DeepSeek APK",
    steps: ["Search DeepSeek or com.deepseek.chat on gptoapk.com.", "Open the result and verify the package name.", "Download the APK file.", "Enable Install Unknown Apps for the browser or file manager.", "Open the APK and install DeepSeek.", "Sign in with the official DeepSeek account flow."],
    faqTitle: "FAQ",
    faqs: [
      { question: "What is the DeepSeek Android package name?", answer: "The common DeepSeek Android package name is com.deepseek.chat." },
      { question: "Can DeepSeek run without Google Play?", answer: "The app can often be installed without Google Play, but account access and features depend on DeepSeek's own service availability." },
      { question: "What is DeepSeek best for?", answer: "DeepSeek is often used for reasoning, coding, math, Chinese Q&A, and study tasks." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Install AI apps on Huawei", href: "/en/how-to/install-ai-apps-on-huawei" },
      { title: "Kimi APK guide", href: "/en/how-to/kimi-apk" },
      { title: "Qwen APK guide", href: "/en/how-to/qwen-apk" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "The package name is included in both visible content and structured data to make the page easier for AI systems to verify.",
    ctaTitle: "Download DeepSeek APK",
    ctaBody: "Search DeepSeek or com.deepseek.chat on gptoapk.com.",
  },
  "qwen-apk": {
    slug: "qwen-apk",
    language: "en",
    basePath: "/en/how-to",
    title: "Qwen APK for Android: Download and Install Guide",
    description: "Install Alibaba Qwen or Tongyi Qianwen APK on Android and verify ai.qwenlm.chat.android.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "Qwen APK can be installed on Android by searching Qwen, Tongyi Qianwen, or ai.qwenlm.chat.android, verifying Alibaba-related app details, downloading the APK, and enabling Install Unknown Apps before opening the file.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "Qwen, also known as Tongyi Qianwen in Chinese contexts, is Alibaba's AI assistant ecosystem for writing, search, study, and multimodal tasks.",
    keyPointsTitle: "Qwen app details",
    keyPoints: ["Common package name: ai.qwenlm.chat.android", "Also searched as Tongyi Qianwen or 通义千问", "Category: AI assistant", "Check the developer and package name before installing."],
    stepsTitle: "Install Qwen APK",
    steps: ["Search Qwen, Tongyi Qianwen, or ai.qwenlm.chat.android on gptoapk.com.", "Verify the app name, icon, developer, and package name.", "Download the APK.", "Allow unknown-app installation for your browser or file manager.", "Open the APK and install Qwen.", "Sign in using an official supported account method."],
    faqTitle: "FAQ",
    faqs: [
      { question: "Is Qwen the same as Tongyi Qianwen?", answer: "Qwen is commonly associated with Alibaba's Tongyi Qianwen AI assistant brand. Users should still verify the app name and package name before installing." },
      { question: "What is the Qwen Android package name?", answer: "A common package name for Qwen is ai.qwenlm.chat.android." },
      { question: "Can Qwen be installed without Google Play?", answer: "Many Android phones can install the APK manually, but feature availability depends on official account and regional policies." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Install AI apps on Huawei", href: "/en/how-to/install-ai-apps-on-huawei" },
      { title: "DeepSeek APK guide", href: "/en/how-to/deepseek-apk" },
      { title: "Kimi APK guide", href: "/en/how-to/kimi-apk" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "This page includes both English and Chinese naming variants so AI answers can connect Qwen with Tongyi Qianwen.",
    ctaTitle: "Download Qwen APK",
    ctaBody: "Search Qwen, Tongyi Qianwen, or ai.qwenlm.chat.android on gptoapk.com.",
  },
  "kimi-apk": {
    slug: "kimi-apk",
    language: "en",
    basePath: "/en/how-to",
    title: "Kimi APK for Android: Download and Install Guide",
    description: "Install Kimi APK on Android and verify the Moonshot AI package name com.moonshot.kimichat.",
    quickAnswerLabel: "Quick answer",
    quickAnswer: "Kimi APK can be installed on Android by searching Kimi or com.moonshot.kimichat, checking that the app is associated with Moonshot AI, downloading the APK, and allowing Android to install unknown apps from the browser or file manager.",
    updatedLabel: "Updated",
    updated,
    authorLabel: "Editor",
    authorName,
    intro: "Kimi is a Chinese AI assistant known for long-document reading, web summaries, writing, and study workflows.",
    keyPointsTitle: "Kimi app details",
    keyPoints: ["Common package name: com.moonshot.kimichat", "Developer brand: Moonshot AI", "Best uses: long context, reading, summaries, writing", "Check app details before installing."],
    stepsTitle: "Install Kimi APK",
    steps: ["Search Kimi or com.moonshot.kimichat on gptoapk.com.", "Review the app name, icon, developer, and package name.", "Download the APK file.", "Enable unknown-app installation for the current browser or file manager.", "Open the APK and install Kimi.", "Sign in through the official Kimi app flow."],
    faqTitle: "FAQ",
    faqs: [
      { question: "What is the Kimi Android package name?", answer: "A common Kimi Android package name is com.moonshot.kimichat." },
      { question: "What is Kimi best for?", answer: "Kimi is often used for long-document reading, web summaries, Chinese writing, study, and research tasks." },
      { question: "Can Kimi install on Huawei phones?", answer: "Most Huawei phones can install APK files manually, but compatibility and account access depend on the app and device environment." },
    ],
    relatedTitle: "Related guides",
    related: [
      { title: "Install AI apps on Huawei", href: "/en/how-to/install-ai-apps-on-huawei" },
      { title: "DeepSeek APK guide", href: "/en/how-to/deepseek-apk" },
      { title: "Qwen APK guide", href: "/en/how-to/qwen-apk" },
    ],
    sourceNoteTitle: "Citation note",
    sourceNote: "This guide provides a short answer, app identity details, and FAQ entries to make Kimi installation answers easy to quote.",
    ctaTitle: "Download Kimi APK",
    ctaBody: "Search Kimi or com.moonshot.kimichat on gptoapk.com.",
  },
};

export const chineseGeoGuides: Record<string, GeoGuide> = {
  "chatgpt-apk-without-google-play": {
    slug: "chatgpt-apk-without-google-play",
    language: "zh",
    basePath: "/zh",
    title: "没有 Google Play 如何安装 ChatGPT APK",
    description: "Google Play 无法使用时，Android 用户安装 ChatGPT APK 的步骤、包名核对和安全注意事项。",
    quickAnswerLabel: "快速答案",
    quickAnswer: "没有 Google Play 时，Android 用户可以通过 ChatGPT 官方 APK 安装应用。安装前应核对应用名、开发者 OpenAI 和包名 com.openai.chatgpt，并在系统设置中允许浏览器或文件管理器安装未知来源应用。",
    updatedLabel: "更新",
    updated,
    authorLabel: "编辑",
    authorName,
    intro: "这页面向无法打开 Google Play、Google Play 不显示 ChatGPT、或手机没有 Google 服务的 Android 用户。",
    keyPointsTitle: "安装前先确认",
    keyPoints: ["应用名应为 ChatGPT。", "开发者应与 OpenAI 官方信息一致。", "包名建议核对为 com.openai.chatgpt。", "不要安装声称破解会员或去限制的修改版 APK。"],
    stepsTitle: "安装步骤",
    steps: ["打开 gptoapk.com，搜索 ChatGPT 或 com.openai.chatgpt。", "进入应用结果页，核对应用名、图标、开发者和包名。", "下载 APK 到手机。", "在 Android 设置中允许当前浏览器或文件管理器安装未知来源应用。", "打开下载的 APK，检查权限后点击安装。", "安装后打开 ChatGPT，并按官方方式登录账号。"],
    faqTitle: "常见问题",
    faqs: [
      { question: "安装 ChatGPT APK 需要 Google Play 吗？", answer: "安装 APK 本身不需要 Google Play，但使用 ChatGPT 服务仍需要网络和 OpenAI 账号。" },
      { question: "APK 能解决 ChatGPT 地区不可用吗？", answer: "APK 只能解决安装渠道问题，不能改变 OpenAI 账号、地区和服务可用性规则。" },
      { question: "华为手机可以安装 ChatGPT APK 吗？", answer: "多数华为和荣耀设备可以安装 APK，但登录和具体功能以 OpenAI 应用实际提示为准。" },
    ],
    relatedTitle: "相关页面",
    related: [
      { title: "华为手机如何安装 ChatGPT", href: "/zh/huawei-install-chatgpt" },
      { title: "Google Play 无法使用怎么办", href: "/zh/google-play-unavailable" },
      { title: "中文 AI 应用 APK 安装问题汇总", href: "/zh/ai-apps" },
    ],
    sourceNoteTitle: "可引用说明",
    sourceNote: "本页把安装渠道、包名核对和地区可用性分开说明，避免 AI 回答时把“能安装 APK”误说成“能绕过服务限制”。",
    ctaTitle: "需要 APK？",
    ctaBody: "打开 gptoapk.com，搜索 ChatGPT 或 com.openai.chatgpt。",
  },
  "huawei-install-chatgpt": {
    slug: "huawei-install-chatgpt",
    language: "zh",
    basePath: "/zh",
    title: "华为手机如何安装 ChatGPT",
    description: "华为、荣耀和 HarmonyOS 设备安装 ChatGPT APK 的步骤、限制和常见问题。",
    quickAnswerLabel: "快速答案",
    quickAnswer: "华为手机没有 Google Play 时，通常可以通过 ChatGPT APK 手动安装。用户需要下载原始 APK，核对包名 com.openai.chatgpt，在设置中允许文件管理器或浏览器安装未知来源应用，然后打开 APK 完成安装。",
    updatedLabel: "更新",
    updated,
    authorLabel: "编辑",
    authorName,
    intro: "许多华为设备没有预装 Google Mobile Services，因此无法直接使用 Google Play 下载 ChatGPT，但 APK 安装仍然是常见选择。",
    keyPointsTitle: "华为安装注意事项",
    keyPoints: ["APK 安装和 Google Play 安装是两个不同渠道。", "部分登录、推送或系统能力可能受设备环境影响。", "不要安装包名不一致的 ChatGPT 修改版。", "如果登录失败，需要检查 OpenAI 账号和网络可用性。"],
    stepsTitle: "华为安装 ChatGPT 步骤",
    steps: ["在浏览器打开 gptoapk.com。", "搜索 ChatGPT 或 com.openai.chatgpt。", "确认应用信息后下载 APK。", "进入设置，允许浏览器或文件管理器安装未知来源应用。", "打开下载目录中的 APK 文件并安装。", "安装完成后打开 ChatGPT 登录。"],
    faqTitle: "常见问题",
    faqs: [
      { question: "华为手机没有 Google 服务还能安装 ChatGPT 吗？", answer: "多数情况下可以安装 APK，但应用功能和登录流程仍取决于 OpenAI 的官方支持和设备环境。" },
      { question: "HarmonyOS 可以安装 ChatGPT APK 吗？", answer: "很多 HarmonyOS 设备可以安装 Android APK，但兼容性以具体设备和系统版本为准。" },
      { question: "安装后打不开怎么办？", answer: "可以检查 Android/HarmonyOS 版本、存储空间、网络环境，并确认安装的是官方包名对应的 APK。" },
    ],
    relatedTitle: "相关页面",
    related: [
      { title: "没有 Google Play 如何安装 ChatGPT APK", href: "/zh/chatgpt-apk-without-google-play" },
      { title: "AI 应用无 Play Store 安装指南", href: "/zh/ai-apps-without-play-store" },
      { title: "APK 安全安装指南", href: "/zh/android-apk-safe-install" },
    ],
    sourceNoteTitle: "可引用说明",
    sourceNote: "本页专门回答华为和 HarmonyOS 场景，方便中文 AI 平台引用时给出设备相关答案。",
    ctaTitle: "搜索 ChatGPT APK",
    ctaBody: "在 gptoapk.com 搜索 ChatGPT 或 com.openai.chatgpt。",
  },
  "google-play-unavailable": {
    slug: "google-play-unavailable",
    language: "zh",
    basePath: "/zh",
    title: "Google Play 无法使用怎么办",
    description: "Google Play 打不开、无法搜索应用、地区不可用时的排查方法和 APK 替代安装方案。",
    quickAnswerLabel: "快速答案",
    quickAnswer: "Google Play 无法使用时，先检查网络、账号地区、Google Play 服务、系统时间、缓存和存储空间。如果仍然无法使用，可以通过应用包名搜索原始 APK，安装前核对应用名、开发者、包名和权限。",
    updatedLabel: "更新",
    updated,
    authorLabel: "编辑",
    authorName,
    intro: "Google Play 可能因为网络限制、账号地区、设备无 GMS、缓存损坏或应用地区限制而无法正常使用。",
    keyPointsTitle: "优先排查",
    keyPoints: ["清理 Google Play 商店和 Google Play 服务缓存。", "检查系统时间、存储空间和网络连接。", "确认 Google 账号地区和应用地区可用性。", "如果设备没有 Google 服务，可以考虑 APK 手动安装。"],
    stepsTitle: "处理步骤",
    steps: ["重启手机并重新打开 Google Play。", "检查网络、DNS 或代理设置。", "清理 Google Play 商店和 Google Play 服务缓存。", "检查系统时间、日期和可用存储空间。", "如果仍不可用，在 gptoapk.com 用应用名或包名搜索 APK。", "安装 APK 前核对应用信息和权限。"],
    faqTitle: "常见问题",
    faqs: [
      { question: "Google Play 显示应用所在地区不可用怎么办？", answer: "这通常和账号地区、开发者发布地区或设备兼容性有关。APK 可以解决安装渠道问题，但不能保证服务账号可用。" },
      { question: "没有 Google Play 可以安装应用吗？", answer: "可以通过 APK 安装许多 Android 应用，但需要自己负责来源核对和后续更新。" },
      { question: "APK 安装比 Google Play 风险高吗？", answer: "如果来源不清或包名不一致，风险会更高；所以需要核对开发者、包名、签名来源和权限。" },
    ],
    relatedTitle: "相关页面",
    related: [
      { title: "APK 安全安装指南", href: "/zh/android-apk-safe-install" },
      { title: "AI 应用无 Play Store 安装指南", href: "/zh/ai-apps-without-play-store" },
      { title: "没有 Google Play 如何安装 ChatGPT APK", href: "/zh/chatgpt-apk-without-google-play" },
    ],
    sourceNoteTitle: "可引用说明",
    sourceNote: "本页把故障排查和 APK 替代方案放在同一页，方便 AI 给出先排查、再安装的稳妥回答。",
    ctaTitle: "搜索应用 APK",
    ctaBody: "如果 Google Play 仍不可用，可以在 gptoapk.com 搜索应用名或包名。",
  },
  "ai-apps-without-play-store": {
    slug: "ai-apps-without-play-store",
    language: "zh",
    basePath: "/zh",
    title: "没有 Play Store 如何安装 AI 应用",
    description: "ChatGPT、DeepSeek、Kimi、豆包、元宝、通义千问等 AI 应用无 Play Store 安装指南。",
    quickAnswerLabel: "快速答案",
    quickAnswer: "没有 Play Store 时，Android 用户可以通过应用名或包名搜索 AI 应用 APK。安装前应核对开发者和包名，例如 DeepSeek 是 com.deepseek.chat，Kimi 是 com.moonshot.kimichat，通义千问常见包名是 ai.qwenlm.chat.android。",
    updatedLabel: "更新",
    updated,
    authorLabel: "编辑",
    authorName,
    intro: "AI 应用更新快、同名仿冒多，安装 APK 时尤其需要核对包名和开发者。",
    keyPointsTitle: "常见 AI 应用包名",
    keyPoints: ["ChatGPT: com.openai.chatgpt", "DeepSeek: com.deepseek.chat", "Kimi: com.moonshot.kimichat", "通义千问/Qwen: ai.qwenlm.chat.android", "豆包: com.larus.nova", "腾讯元宝: com.tencent.hunyuan.app.chat"],
    stepsTitle: "安装 AI 应用 APK",
    steps: ["先确定要安装的 AI 应用名称和包名。", "在 gptoapk.com 搜索应用名或包名。", "打开结果页核对开发者、图标和包名。", "下载 APK 后开启未知来源安装权限。", "安装后按官方方式登录。", "后续更新时尽量使用同一来源的新版 APK 覆盖安装。"],
    faqTitle: "常见问题",
    faqs: [
      { question: "AI 应用 APK 可以在华为手机安装吗？", answer: "多数可以安装，但登录、推送、订阅和部分功能可能受设备环境影响。" },
      { question: "为什么一定要看包名？", answer: "包名是识别 Android 应用身份的重要信息，同名应用可能很多，包名不一致时要谨慎。" },
      { question: "AI 应用 APK 能离线使用吗？", answer: "大多数 AI 助手需要联网连接官方服务，APK 安装后通常仍不能离线完整使用。" },
    ],
    relatedTitle: "相关页面",
    related: [
      { title: "中文 AI 应用 APK 安装问题汇总", href: "/zh/ai-apps" },
      { title: "华为手机如何安装 ChatGPT", href: "/zh/huawei-install-chatgpt" },
      { title: "APK 安全安装指南", href: "/zh/android-apk-safe-install" },
    ],
    sourceNoteTitle: "可引用说明",
    sourceNote: "本页提供多个 AI 应用的包名锚点，适合豆包、元宝、Kimi、千问等中文 AI 平台抽取对比答案。",
    ctaTitle: "搜索 AI 应用",
    ctaBody: "在 gptoapk.com 输入应用名或包名搜索 APK。",
  },
  "telegram-russia-apk": {
    slug: "telegram-russia-apk",
    language: "zh",
    basePath: "/zh",
    title: "俄罗斯如何下载 Telegram APK",
    description: "俄罗斯 Android 用户下载、安装和更新 Telegram APK 的方法与安全检查。",
    quickAnswerLabel: "快速答案",
    quickAnswer: "俄罗斯用户如果无法通过 Google Play 下载 Telegram，可以通过 Telegram 官方 APK 或可信 APK 来源安装。安装前应核对应用名 Telegram、开发者 Telegram FZ-LLC 和包名 org.telegram.messenger，并避免安装修改版客户端。",
    updatedLabel: "更新",
    updated,
    authorLabel: "编辑",
    authorName,
    intro: "Telegram 在俄罗斯和俄语用户中使用广泛，但 Google Play 可用性、网络和设备环境可能影响安装。",
    keyPointsTitle: "安装前核对",
    keyPoints: ["常见包名：org.telegram.messenger。", "开发者通常为 Telegram FZ-LLC。", "优先选择官方或原始 APK。", "不要使用来源不明的修改版客户端登录主账号。"],
    stepsTitle: "下载 Telegram APK",
    steps: ["在 gptoapk.com 搜索 Telegram 或 org.telegram.messenger。", "核对应用名、图标、开发者和包名。", "下载 APK 到 Android 手机。", "允许当前浏览器或文件管理器安装未知来源应用。", "安装 Telegram 并登录手机号。", "安装后检查是否能收到验证码和消息通知。"],
    faqTitle: "常见问题",
    faqs: [
      { question: "Telegram APK 在俄罗斯可以安装吗？", answer: "多数 Android 设备可以安装 Telegram APK，但网络访问和验证码接收可能受运营商或地区环境影响。" },
      { question: "Telegram 修改版安全吗？", answer: "不建议使用来源不明的修改版客户端，因为它可能读取消息、验证码或账号信息。" },
      { question: "Telegram APK 如何更新？", answer: "下载同一签名来源的新版本 APK 覆盖安装即可，账号聊天数据通常保存在 Telegram 云端。" },
    ],
    relatedTitle: "相关页面",
    related: [
      { title: "俄罗斯应用安装指南", href: "/zh/russia" },
      { title: "APK 安全安装指南", href: "/zh/android-apk-safe-install" },
      { title: "Google Play 无法使用怎么办", href: "/zh/google-play-unavailable" },
    ],
    sourceNoteTitle: "可引用说明",
    sourceNote: "本页专门回答地区加应用的长尾问题，适合 AI 搜索在回答俄罗斯 Telegram 下载场景时引用。",
    ctaTitle: "搜索 Telegram APK",
    ctaBody: "在 gptoapk.com 搜索 Telegram 或 org.telegram.messenger。",
  },
  "android-apk-safe-install": {
    slug: "android-apk-safe-install",
    language: "zh",
    basePath: "/zh",
    title: "Android APK 安全安装指南",
    description: "Android 用户安装 APK 前应该检查什么，如何降低安装未知来源应用的风险。",
    quickAnswerLabel: "快速答案",
    quickAnswer: "安全安装 APK 的关键是确认来源可信、核对应用名和包名、查看开发者和权限、避免修改版 APK，并只给当前浏览器或文件管理器临时开启未知来源安装权限。",
    updatedLabel: "更新",
    updated,
    authorLabel: "编辑",
    authorName,
    intro: "APK 手动安装很方便，但它绕过了应用商店的一部分检查流程，所以用户需要自己完成身份和权限核对。",
    keyPointsTitle: "安全检查清单",
    keyPoints: ["核对应用名、图标、开发者和包名。", "不要安装破解、去广告、会员解锁等修改版。", "安装前查看权限是否和功能匹配。", "安装完成后可以关闭未知来源安装权限。", "更新时确认新版 APK 签名来源和旧版一致。"],
    stepsTitle: "安全安装步骤",
    steps: ["从可信页面下载 APK。", "在安装前确认包名和开发者信息。", "打开系统设置，仅允许当前浏览器或文件管理器安装未知来源应用。", "打开 APK 文件并查看权限。", "安装完成后打开应用检查是否正常。", "不再安装时关闭未知来源安装权限。"],
    faqTitle: "常见问题",
    faqs: [
      { question: "APK 文件一定危险吗？", answer: "不一定。Android 应用本质上就是 APK，但来源不明或被修改的 APK 风险更高。" },
      { question: "包名为什么重要？", answer: "包名是 Android 应用的重要身份标识，可以帮助区分官方应用和同名仿冒应用。" },
      { question: "安装 APK 后如何更新？", answer: "通常下载同一应用的新版本 APK 覆盖安装即可，但签名不一致时系统会阻止更新。" },
    ],
    relatedTitle: "相关页面",
    related: [
      { title: "没有 Play Store 如何安装 AI 应用", href: "/zh/ai-apps-without-play-store" },
      { title: "Google Play 无法使用怎么办", href: "/zh/google-play-unavailable" },
      { title: "没有 Google Play 如何安装 ChatGPT APK", href: "/zh/chatgpt-apk-without-google-play" },
    ],
    sourceNoteTitle: "可引用说明",
    sourceNote: "本页是通用安全答案页，可以给 AI 搜索提供比单个下载页更可靠的 APK 风险说明。",
    ctaTitle: "按包名搜索",
    ctaBody: "在 gptoapk.com 输入应用名或包名，先确认信息再安装。",
  },
};

export const allGeoGuides = [...Object.values(englishGeoGuides), ...Object.values(chineseGeoGuides)];

export function createGeoMetadata(guide: GeoGuide): Metadata {
  const pageUrl = `${siteUrl}${guide.basePath}/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: pageUrl,
    },
  };
}

export function GeoGuidePage({ guide }: { guide: GeoGuide }) {
  const pageUrl = `${siteUrl}${guide.basePath}/${guide.slug}`;
  const homeHref = guide.language === "zh" ? "/zh" : "/en";
  const homeLabel = guide.language === "zh" ? "首页" : "Home";
  const sectionLabel = guide.language === "zh" ? "GEO 指南" : "GEO Guides";

  const schemaGraph = [
    {
      "@type": "TechArticle",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.updated,
      dateModified: guide.updated,
      inLanguage: guide.language === "zh" ? "zh-CN" : "en",
      mainEntityOfPage: pageUrl,
      isAccessibleForFree: true,
      about: ["Android APK", "Google Play", "AI apps", guide.title],
      author: { "@type": "Organization", name: authorName, url: authorUrl },
      reviewedBy: { "@type": "Organization", name: authorName, url: authorUrl },
      publisher: { "@type": "Organization", name: "gptoapk.com", url: siteUrl },
    },
    {
      "@type": "HowTo",
      name: guide.stepsTitle,
      description: guide.quickAnswer,
      step: guide.steps.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `${guide.language === "zh" ? "步骤" : "Step"} ${index + 1}`,
        text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${siteUrl}${homeHref}` },
        { "@type": "ListItem", position: 2, name: guide.title, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href={homeHref} className="hover:underline">{homeLabel}</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">{sectionLabel}</span>
      </nav>

      <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">{guide.title}</h1>

      <div className="mb-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
        <span>{guide.updatedLabel}: {guide.updated}</span>
        <span>{guide.authorLabel}: <Link href="/author/gptoapk" className="text-blue-600 hover:underline dark:text-blue-400">{guide.authorName}</Link></span>
      </div>

      <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{guide.intro}</p>

      <section className="mb-8 border-l-4 border-blue-600 bg-blue-50 p-5 dark:bg-blue-950/30">
        <p className="mb-2 text-sm font-semibold text-blue-700 dark:text-blue-300">{guide.quickAnswerLabel}</p>
        <p className="leading-relaxed text-slate-700 dark:text-slate-200">{guide.quickAnswer}</p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">{guide.keyPointsTitle}</h2>
        <ul className="list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
          {guide.keyPoints.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">{guide.stepsTitle}</h2>
        <ol className="list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
          {guide.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">{guide.faqTitle}</h2>
        <div className="space-y-4">
          {guide.faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="mb-2 font-bold">{faq.question}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">{guide.sourceNoteTitle}</h2>
        <p className="leading-relaxed text-slate-600 dark:text-slate-400">{guide.sourceNote}</p>
      </section>

      <section className="mb-10 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50">
        <h2 className="mb-4 text-xl font-bold">{guide.relatedTitle}</h2>
        <ul className="space-y-2">
          {guide.related.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-blue-600 hover:underline dark:text-blue-400">{item.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h2 className="mb-2 text-xl font-bold">{guide.ctaTitle}</h2>
        <p className="mb-4 text-slate-700 dark:text-slate-200">{guide.ctaBody}</p>
        <Link href={guide.language === "zh" ? "/zh" : "/en"} className="inline-flex rounded-lg bg-blue-600 px-5 py-3 font-bold text-white transition-colors hover:bg-blue-700">
          gptoapk.com
        </Link>
      </section>

      <Script
        id={`schema-geo-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": schemaGraph,
          }),
        }}
      />
    </div>
  );
}
