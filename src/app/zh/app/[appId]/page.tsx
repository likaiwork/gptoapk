import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import DownloadButton from "@/components/DownloadButton";
import { fetchAppDetailForPage } from "@/lib/app-detail-fetch";

export default async function AppDownloadPage(props: {
  params: Promise<{ appId: string }>;
  searchParams?: Promise<{ hl?: string; gl?: string }>;
}) {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  const appId = params.appId;
  const lang = searchParams.hl || "zh";
  const country = searchParams.gl || "cn";

  const appInfo = await fetchAppDetailForPage(appId, lang, country);

  const iconUrl = appInfo.icon;
  const canonicalUrl = `https://www.gptoapk.com/zh/app/${appId}`;
  const enUrl = `https://www.gptoapk.com/app/${appId}`;
  const updatedDate = appInfo.updated ? new Date(appInfo.updated).toISOString() : undefined;
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: appInfo.title,
    description: appInfo.summary || appInfo.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    applicationCategory: appInfo.genre || "AndroidApplication",
    operatingSystem: "Android",
    softwareVersion: appInfo.version || undefined,
    dateModified: updatedDate,
    identifier: appId,
    isAccessibleForFree: appInfo.free === true,
    image: appInfo.icon || undefined,
    author: {
      "@type": "Organization",
      name: appInfo.developer,
      url: appInfo.developerWebsite || undefined,
    },
    publisher: {
      "@type": "Organization",
      name: appInfo.developer,
      url: appInfo.developerWebsite || undefined,
    },
    ...(appInfo.free === true
      ? {
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: appInfo.currency || "CNY",
            availability: appInfo.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: "https://www.gptoapk.com/zh" },
      { "@type": "ListItem", position: 2, name: appInfo.title, item: canonicalUrl },
    ],
  };

  return (
    <div className="flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Script
        id="app-software-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <Script
        id="app-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="mb-6 w-full text-sm text-slate-500">
        <Link href="/zh" className="hover:text-blue-600 hover:underline">
          首页
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">{appInfo.title}</span>
      </nav>

      <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 w-full flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="shrink-0">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={`${appInfo.title} icon`}
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-3xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              {appInfo.title}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-lg mt-1">
              {appInfo.developer}
            </p>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">包名:</span>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-700">{appId}</code>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">版本:</span>
              {appInfo.version || "因设备而异"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">大小:</span>
              {appInfo.size || "因设备而异"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">更新:</span>
              {appInfo.updated ? new Date(appInfo.updated).toLocaleDateString("zh-CN") : "未知"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">价格:</span>
              {appInfo.free ? "免费" : appInfo.priceText || "付费"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">系统:</span>
              Android {appInfo.androidVersionText || appInfo.androidVersion || ""}
            </div>
          </div>

          <div className="pt-6">
            <DownloadButton appId={appId} appName={appInfo.title} />
          </div>
        </div>
      </div>

      {(appInfo.descriptionHTML || appInfo.description) && (
        <div className="mt-12 w-full">
          <h2 className="text-2xl font-bold mb-4">{appInfo.title} 简介</h2>
          {appInfo.descriptionHTML ? (
            <div
              className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 line-clamp-[10] overflow-hidden hover:line-clamp-none transition-all duration-500"
              dangerouslySetInnerHTML={{ __html: appInfo.descriptionHTML }}
            />
          ) : (
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <p>{appInfo.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ appId: string }>;
  searchParams?: Promise<{ hl?: string; gl?: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  const appId = params.appId;
  const lang = searchParams.hl || "zh";
  const country = searchParams.gl || "cn";

  const appInfo = await fetchAppDetailForPage(appId, lang, country);
  const canonicalUrl = `https://www.gptoapk.com/zh/app/${appId}`;
  const enUrl = `https://www.gptoapk.com/app/${appId}`;
  const description = `下载 ${appInfo.title} Android APK。包名：${appId}。开发者：${appInfo.developer}。${appInfo.summary || ""}`.trim();

  return {
    title: `${appInfo.title} APK 下载 - Android`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        zh: canonicalUrl,
        en: enUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: `${appInfo.title} APK 下载 - Android`,
      description,
      url: canonicalUrl,
      type: "website",
      images: appInfo.icon ? [{ url: appInfo.icon, alt: `${appInfo.title} icon` }] : undefined,
    },
    twitter: {
      card: "summary",
      title: `${appInfo.title} APK 下载 - Android`,
      description,
      images: appInfo.icon ? [appInfo.icon] : undefined,
    },
  };
}
