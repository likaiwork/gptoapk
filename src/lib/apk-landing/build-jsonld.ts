import { buildApkLandingCanonical, buildApkLandingH1 } from "./build-metadata";
import type { ApkLandingConfig } from "./types";

const SITE = "https://www.gptoapk.com";

export function buildApkLandingJsonLd(config: ApkLandingConfig) {
  const pageUrl = buildApkLandingCanonical(config);
  const headline = buildApkLandingH1(config);
  const homeUrl = `${SITE}/${config.locale}`;

  return {
    techArticle: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline,
      description: config.quickAnswer,
      datePublished: config.datePublished ?? "2026-06-11",
      author: { "@type": "Organization", name: "gptoapk.com", url: SITE },
      publisher: { "@type": "Organization", name: "gptoapk.com", url: SITE },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
      inLanguage: config.locale === "zh" ? "zh-CN" : config.locale,
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "gptoapk.com", item: homeUrl },
        { "@type": "ListItem", position: 2, name: `${config.appName} APK`, item: pageUrl },
      ],
    },
    softwareApp: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: config.appName,
      applicationCategory: config.category,
      operatingSystem: "Android",
      softwareVersion: config.version,
      identifier: config.packageName,
      author: { "@type": "Organization", name: config.developer },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `Install ${config.appName} APK on Android`,
      step: config.installSteps.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: `Step ${index + 1}`,
        text,
      })),
    },
    faqPage: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  };
}
