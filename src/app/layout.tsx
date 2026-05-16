import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsRouteEvents from "@/components/AnalyticsRouteEvents";
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
    default: "APK 下载器 - 从 Google Play 下载 APK | gptoapk.com",
    template: "%s | APK 下载器 | gptoapk.com",
  },
  description: "免费在线 APK 下载工具，从 Google Play 链接快速、安全地提取 APK 文件。粘贴链接即可生成下载链接。",
  keywords: ["APK下载", "Google Play APK", "下载APK", "APK提取工具", "安卓APK", "Play商店提取APK"],
  openGraph: {
    title: "APK 下载器 - 从 Google Play 下载 APK",
    description: "免费在线 APK 下载工具，从 Google Play 链接快速、安全地提取 APK 文件。",
    url: "https://gptoapk.com",
    siteName: "APK 下载器",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APK 下载器 - 从 Google Play 下载 APK",
    description: "免费在线 APK 下载工具，快速、安全地提取 APK 文件。",
  },
  verification: {
    google: undefined,
    yandex: undefined,
    other: {
      "google-adsense-account": "ca-pub-2144172051563531",
      msvalidate: BING_VERIFICATION,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://gptoapk.com",
    languages: {
      en: "https://gptoapk.com/en",
      "x-default": "https://gptoapk.com",
    },
  },
};

// All 33 supported locales for hreflang
const HREFLANG_LOCALES = [
  { code: "en", hrefLang: "en", path: "" },
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
    "name": "APK Downloader - Google Play APK Extractor",
    "url": "https://gptoapk.com",
    "description": "Free online APK download tool. Extract APK files from Google Play Store quickly and safely.",
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
    "name": "gptoapk.com",
    "url": "https://gptoapk.com",
    "description": "APK download tool for Android - search and download APK files directly from Google Play",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://gptoapk.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "gptoapk.com",
    "url": "https://gptoapk.com",
    "sameAs": [
      "https://gptoapk.hashnode.dev",
    ],
  };

  return (
    <html lang={htmlLang} dir={htmlDir} className="h-full antialiased">
      <head>
        {/* Hreflang tags for all 33 languages */}
        {HREFLANG_LOCALES.map((locale) => (
          <link
            key={locale.hrefLang}
            rel="alternate"
            href={`https://gptoapk.com${locale.path}`}
            hrefLang={locale.hrefLang}
          />
        ))}
        <link rel="alternate" href="https://gptoapk.com" hrefLang="x-default" />

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

        <Script
          id="adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2144172051563531"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", script, "${CLARITY_PROJECT_ID}");`}
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
