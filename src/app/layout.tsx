import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsRouteEvents from "@/components/AnalyticsRouteEvents";
import CookieConsent from "@/components/CookieConsent";
import AdSenseLoader from "@/components/AdSenseLoader";
import MonetagLoader from "@/components/MonetagLoader";
import "./globals.css";
import { SITE_LOCALES, isRtlLocale } from "@/lib/site-locales";

const supportedHtmlLocales = new Set<string>([...SITE_LOCALES]);

const BING_VERIFICATION = "F9DDBF5E7468903E9C589BC6B8E3D6CB";
const CLARITY_PROJECT_ID = "wlqyr64bhf";
const GTM_ID = "GTM-MXXWHJTP";
const GA_MEASUREMENT_ID = "G-DB1E6ERNFQ";
const BAIDU_TONGJI_ID = "bc8078f71b3d5cefd8c7bf3e9ca7d80c";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "APK 下载器 - 免费应用 APK 下载工具 | gptoapk.com",
    template: "%s | APK 下载器 | gptoapk.com",
  },
  description: "免费在线 APK 下载工具，可搜索安卓应用，并在存在免费应用或可信公开来源时生成支持的下载链接。",
  keywords: ["APK下载", "Google Play APK", "下载APK", "APK提取工具", "安卓APK", "Play商店提取APK"],
  openGraph: {
    title: "APK 下载器 - 免费应用 APK 下载工具",
    description: "免费在线 APK 下载工具，可搜索安卓应用，并在存在免费应用或可信公开来源时生成支持的下载链接。",
    url: "https://www.gptoapk.com/en",
    siteName: "APK 下载器",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APK 下载器 - 免费应用 APK 下载工具",
    description: "免费在线 APK 下载工具，支持免费应用和可信公开来源，不提供付费或破解版下载。",
  },
  verification: {
    google: undefined,
    yandex: undefined,
    other: {
      "google-adsense-account": "ca-pub-7016978419299209",
      msvalidate: BING_VERIFICATION,
      sogou_site_verification: "GyoMVFI8X3",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.gptoapk.com/en",
    languages: {
      en: "https://www.gptoapk.com/en",
      zh: "https://www.gptoapk.com/zh",
      "x-default": "https://www.gptoapk.com/en",
    },
  },
};

// All 33 supported locales for hreflang
const HREFLANG_LOCALES = [
  { code: "en", hrefLang: "en", path: "/en" },
  { code: "zh", hrefLang: "zh-Hans", path: "/zh" },
  { code: "ja", hrefLang: "ja", path: "/ja" },
  { code: "ko", hrefLang: "ko", path: "/ko" },
  { code: "ar", hrefLang: "ar", path: "/ar" },
  { code: "bn", hrefLang: "bn", path: "/bn" },
  { code: "cs", hrefLang: "cs", path: "/cs" },
  { code: "da", hrefLang: "da", path: "/da" },
  { code: "de", hrefLang: "de", path: "/de" },
  { code: "el", hrefLang: "el", path: "/el" },
  { code: "es", hrefLang: "es", path: "/es" },
  { code: "fa", hrefLang: "fa", path: "/fa" },
  { code: "fi", hrefLang: "fi", path: "/fi" },
  { code: "fr", hrefLang: "fr", path: "/fr" },
  { code: "he", hrefLang: "he", path: "/he" },
  { code: "hi", hrefLang: "hi", path: "/hi" },
  { code: "hu", hrefLang: "hu", path: "/hu" },
  { code: "id", hrefLang: "id", path: "/id" },
  { code: "it", hrefLang: "it", path: "/it" },
  { code: "ms", hrefLang: "ms", path: "/ms" },
  { code: "nb", hrefLang: "nb", path: "/nb" },
  { code: "nl", hrefLang: "nl", path: "/nl" },
  { code: "pl", hrefLang: "pl", path: "/pl" },
  { code: "pt", hrefLang: "pt", path: "/pt" },
  { code: "ro", hrefLang: "ro", path: "/ro" },
  { code: "ru", hrefLang: "ru", path: "/ru" },
  { code: "sv", hrefLang: "sv", path: "/sv" },
  { code: "th", hrefLang: "th", path: "/th" },
  { code: "tl", hrefLang: "tl", path: "/tl" },
  { code: "tr", hrefLang: "tr", path: "/tr" },
  { code: "uk", hrefLang: "uk", path: "/uk" },
  { code: "ur", hrefLang: "ur", path: "/ur" },
  { code: "vi", hrefLang: "vi", path: "/vi" },
] as const;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const localeHeader = requestHeaders.get("x-locale");
  const htmlLang = localeHeader && supportedHtmlLocales.has(localeHeader) ? localeHeader : "en"; // 检查：proxy 没识别到时回落英文，避免错误的 lang 属性
  const htmlDir = isRtlLocale(htmlLang) ? "rtl" : "ltr";

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": "https://www.gptoapk.com/#web-application",
    "name": "APK Downloader - Google Play APK Extractor",
    "url": "https://www.gptoapk.com/en",
    "description": "Free online APK download tool for finding Android apps and preparing supported downloads from verified public sources.",
    "applicationCategory": "Utilities",
    "operatingSystem": "Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.gptoapk.com/#website",
    "name": "gptoapk.com",
    "url": "https://www.gptoapk.com",
    "description": "APK download tool for Android - search apps and prepare supported downloads from verified public sources",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.gptoapk.com/en?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.gptoapk.com/#organization",
    "name": "gptoapk.com",
    "url": "https://www.gptoapk.com",
    "sameAs": [
      "https://gptoapk.hashnode.dev",
    ],
  };

  return (
    <html lang={htmlLang} dir={htmlDir} className="h-full antialiased">
      <head>
        <meta name="sogou_site_verification" content="GyoMVFI8X3" />

        {/* Google Consent Mode v2 — set defaults before any tags fire */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500,
});`,
          }}
        />

        {/* Hreflang tags for all 33 languages */}
        {HREFLANG_LOCALES.map((locale) => (
          <link
            key={locale.hrefLang}
            rel="alternate"
            href={`https://www.gptoapk.com${locale.path}`}
            hrefLang={locale.hrefLang}
          />
        ))}
        <link rel="alternate" href="https://www.gptoapk.com/en" hrefLang="x-default" />

        {/* OpenSearch & RSS Feed for search engine / AI crawler discovery */}
        <link rel="search" type="application/opensearchdescription+xml" title="gptoapk.com APK 搜索" href="/opensearch.xml" />
        <link rel="alternate" type="application/rss+xml" title="gptoapk.com 中文更新 RSS" href="/feed-zh.xml" />

        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          id="schema-web-application"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <Script
          id="schema-web-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsRouteEvents />
        <CookieConsent />
        <AdSenseLoader />
        <MonetagLoader />

        <Script
          id="ga4-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>

        <Script id="baidu-tongji" strategy="afterInteractive">
          {`window._hmt = window._hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`}
        </Script>
      </body>
    </html>
  );
}
