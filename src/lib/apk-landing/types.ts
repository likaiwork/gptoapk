export type ApkLandingLocale = "en" | "hi" | "id" | "zh";

export type ApkLandingFaq = {
  question: string;
  answer: string;
};

export type ApkLandingPlayApp = {
  appId: string;
  title: string;
  developer: string;
  icon: string | null;
  scoreText: string | null;
  version: string | null;
  size: string | null;
  updated: string | null;
  screenshots: string[];
  available: boolean;
  free: boolean;
};

export type ApkLandingConfig = {
  locale: ApkLandingLocale;
  slug: string;
  appName: string;
  /** Display variant e.g. "Patch", "Beta" — optional */
  variantLabel?: string;
  developer: string;
  category: string;
  packageName: string;
  version: string;
  updated: string;
  apkSize: string;
  minAndroid: string;
  searchQuery: string;
  /** GEO / AI summary block (2–3 sentences) */
  aiSummary: string;
  intro: string;
  quickAnswer: string;
  aboutApp: string;
  installSteps: string[];
  downloadSteps: string[];
  safetyNote: string;
  faqs: ApkLandingFaq[];
  relatedLinks: Array<{ href: string; label: string }>;
  keywords: string[];
  /** Override default Appteka-style title */
  title?: string;
  description?: string;
  datePublished?: string;
  /** Play delisted / unavailable — show DelistedAppBanner */
  delisted?: boolean;
  delistedNote?: string;
};
