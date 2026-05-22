import type { Metadata } from "next";
import gplay, { type IAppItemFullDetail } from "google-play-scraper";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import DownloadButton from "@/components/DownloadButton";
import { gplayRequestOptions as requestOptions } from "@/lib/proxy";
import { proxyImageUrl } from "@/lib/image-proxy";

// Next.js page component for dynamic route /app/[appId]
export default async function AppDownloadPage(props: { params: Promise<{ appId: string }>, searchParams?: Promise<{ hl?: string, gl?: string }> }) {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  const appId = params.appId;
  const lang = searchParams.hl || 'en';
  const country = searchParams.gl || 'us';

  let appInfo: IAppItemFullDetail;
  console.log(`\n======================================`);
  console.log(`[Page AppDownloadPage] Rendering page for appId: "${appId}", lang: "${lang}", country: "${country}"`);
  console.log(`======================================`);
  
  try {
    console.log(`[Page AppDownloadPage] Fetching info from Google Play (timeout: 8s)...`);
    const fetchPromise = gplay.app({ appId, lang, country, requestOptions } as Parameters<typeof gplay.app>[0]).then(res => {
      console.log(`[Page AppDownloadPage] Fetch SUCCESS for ${appId}`);
      return res;
    });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Network timeout')), 8000)
    );
    appInfo = await Promise.race([fetchPromise, timeoutPromise]) as IAppItemFullDetail;
  } catch (error: unknown) {
    console.error(
      `[Page AppDownloadPage] ERROR: Failed to fetch app details -`,
      error instanceof Error ? error.message : error
    );
    notFound();
  }

  const iconUrl = proxyImageUrl(appInfo.icon);
  const canonicalUrl = `https://www.gptoapk.com/app/${appId}`;
  const zhUrl = `https://www.gptoapk.com/zh/app/${appId}`;
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
            priceCurrency: appInfo.currency || "USD",
            availability: appInfo.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.gptoapk.com/en" },
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
        <Link href="/en" className="hover:text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">{appInfo.title}</span>
      </nav>
      
      {/* App Details Card */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 w-full flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        
        {/* App Icon */}
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

        {/* App Info */}
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
              <span className="font-semibold text-slate-800 dark:text-slate-200">Package:</span>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-700">{appId}</code>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Version:</span> 
              {appInfo.version || "Varies with device"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Size:</span> 
              {appInfo.size || "Varies with device"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Updated:</span> 
              {appInfo.updated ? new Date(appInfo.updated).toLocaleDateString() : "Unknown"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Price:</span>
              {appInfo.free ? "Free" : appInfo.priceText || "Paid"}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-slate-800 dark:text-slate-200">OS:</span>
              Android {appInfo.androidVersionText || appInfo.androidVersion || ""}
            </div>
          </div>

          <div className="pt-6">
            <DownloadButton appId={appId} appName={appInfo.title} />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 w-full">
        <h2 className="text-2xl font-bold mb-4">About {appInfo.title}</h2>
        <div 
          className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 line-clamp-[10] overflow-hidden hover:line-clamp-none transition-all duration-500"
          dangerouslySetInnerHTML={{ __html: appInfo.descriptionHTML || appInfo.description }}
        />
      </div>

    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata(props: { params: Promise<{ appId: string }>, searchParams?: Promise<{ hl?: string, gl?: string }> }) {
  const params = await props.params;
  const searchParams = props.searchParams ? await props.searchParams : {};
  const appId = params.appId;
  const lang = searchParams.hl || 'en';
  const country = searchParams.gl || 'us';
  
  console.log(`[Page generateMetadata] Fetching metadata for appId: "${appId}"...`);
  
  try {
    const fetchPromise = gplay.app({ appId, lang, country, requestOptions } as Parameters<typeof gplay.app>[0]).then(res => {
      console.log(`[Page generateMetadata] Fetch SUCCESS for ${appId}`);
      return res;
    });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Network timeout')), 8000)
    );
    const appInfo = await Promise.race([fetchPromise, timeoutPromise]) as IAppItemFullDetail;
    const canonicalUrl = `https://www.gptoapk.com/app/${appId}`;
    const zhUrl = `https://www.gptoapk.com/zh/app/${appId}`;
    const description = `Download ${appInfo.title} APK for Android. Package name: ${appId}. Developer: ${appInfo.developer}. ${appInfo.summary || ""}`.trim();
    return {
      title: `Download ${appInfo.title} APK for Android`,
      description,
      alternates: {
        canonical: canonicalUrl,
        languages: {
          en: canonicalUrl,
          zh: zhUrl,
          "x-default": canonicalUrl,
        },
      },
      openGraph: {
        title: `Download ${appInfo.title} APK for Android`,
        description,
        url: canonicalUrl,
        type: "website",
        images: appInfo.icon ? [{ url: appInfo.icon, alt: `${appInfo.title} icon` }] : undefined,
      },
      twitter: {
        card: "summary",
        title: `Download ${appInfo.title} APK for Android`,
        description,
        images: appInfo.icon ? [appInfo.icon] : undefined,
      },
    } satisfies Metadata;
  } catch (e: unknown) {
    console.error(`[Page generateMetadata] ERROR: ${e instanceof Error ? e.message : e}`);
    return {
      title: "App Not Found - APK Downloader",
    };
  }
}
