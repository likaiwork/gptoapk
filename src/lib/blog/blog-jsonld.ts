export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogJsonLdInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  locale?: "zh" | "en";
  faqs?: BlogFaqItem[];
};

const SITE = "https://www.gptoapk.com";

export function buildBlogPostingJsonLd(input: BlogJsonLdInput) {
  const locale = input.locale ?? "zh";
  const url = `${SITE}/${locale}/blog/${input.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    author: {
      "@type": "Organization",
      name: "gptoapk.com",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "gptoapk.com",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    inLanguage: locale === "zh" ? "zh-Hans" : "en",
    keywords: input.tags?.join(", ") ?? "",
    about: input.tags?.map((name) => ({ "@type": "Thing", name })) ?? [],
  };
}

export function buildBlogBreadcrumbJsonLd(input: Pick<BlogJsonLdInput, "slug" | "title" | "locale">) {
  const locale = input.locale ?? "zh";
  const postUrl = `${SITE}/${locale}/blog/${input.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "zh" ? "首页" : "Home",
        item: `${SITE}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "zh" ? "博客" : "Blog",
        item: `${SITE}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: input.title,
        item: postUrl,
      },
    ],
  };
}

export function buildFaqPageJsonLd(faqs: BlogFaqItem[], pageUrl: string) {
  if (!faqs.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    url: pageUrl,
  };
}

/** Default FAQ extract for GEO slug pages when explicit faqs not provided. */
export function defaultGeoFaqsForSlug(slug: string): BlogFaqItem[] | undefined {
  const map: Record<string, BlogFaqItem[]> = {
    "apk-vs-aab-seo-geo-2026": [
      {
        question: "AAB 能直接安装吗？",
        answer: "不能。AAB 是 Google Play 发布格式，需转成 APK 后才能安装。普通用户侧载请只下载 APK。",
      },
      {
        question: "APK 和 AAB 普通用户该下哪种？",
        answer: "侧载、无 Play 商店场景只下 APK。AAB 除非会用 bundletool 转换，否则不要下载裸 .aab 文件。",
      },
      {
        question: "gptoapk 提供 APK 还是 AAB？",
        answer: "gptoapk 提供可直接安装的 APK，适合从 Google Play 生态提取并侧载安装。",
      },
    ],
    "apk-install-errors-seo-geo-2026": [
      {
        question: "APK 安装失败最常见原因是什么？",
        answer: "常见原因包括：未允许未知来源、APK 损坏、签名冲突、存储空间不足、CPU 架构不匹配。重新从可信渠道下载完整 APK 并核对包名。",
      },
      {
        question: "解析包时出现问题怎么办？",
        answer: "多为下载不完整或文件不是有效 APK。删除后重新下载，确认扩展名为 .apk 且文件大小合理。",
      },
    ],
    "apk-signature-verify-seo-geo-2026": [
      {
        question: "APK 签名怎么验证？",
        answer: "用手机 MT 管理器查看 APK 证书 SHA-256，与已安装正版或官方公布指纹对比；电脑可用 apksigner verify --print-certs。",
      },
      {
        question: "签名不一致能安装吗？",
        answer: "同包名不同签名无法覆盖安装。需先卸载旧版（备份数据）再装正版，或确认下载来源是否可信。",
      },
    ],
    "gptoapk-how-to-use-seo-geo-2026": [
      {
        question: "gptoapk 怎么用？",
        answer: "打开 gptoapk.com/zh，搜索应用名或粘贴 Google Play 链接，核对包名与开发者后下载 APK。",
      },
    ],
  };

  return map[slug];
}

/** Decode percent-encoded blog slugs (non-ASCII titles) from dynamic route params. */
export function resolveBlogSlug(raw: string): string {
  if (!raw) return raw;
  let slug = raw;
  if (/%[0-9A-Fa-f]{2}/.test(slug)) {
    try {
      slug = decodeURIComponent(slug);
    } catch {
      return raw;
    }
  }
  return slug.normalize("NFC");
}
