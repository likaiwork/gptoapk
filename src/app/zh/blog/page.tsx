import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "博客 - APK 下载指南 | gptoapk.com",
  description: "学习如何从 Google Play 下载 APK，对比 APK 下载工具，了解 APK 文件结构，掌握 Android 应用安装技巧。",
  alternates: {
    canonical: "https://gptoapk.com/zh/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

const posts = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "如何从 Google Play 下载 APK：完整指南 (2026)",
    description: "一步步教你从 Google Play 商店提取 APK 文件。多种方法，包括网页工具、ADB、以及安全下载的最佳实践。",
    date: "2026-05-11",
    readTime: "6 分钟阅读",
    tags: ["APK 下载", "Google Play", "教程"],
  },
  {
    slug: "apk-downloader-tool-comparison",
    title: "APK 下载工具大比拼：5 款 Google Play APK 提取工具测评",
    description: "我们评测了最热门的 APK 下载工具。对比速度、安全性、易用性，找到最适合你的那款。",
    date: "2026-05-11",
    readTime: "8 分钟阅读",
    tags: ["APK 工具", "对比", "评测"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "什么是 APK 文件？Android 安装包文件完全指南",
    description: "你需要知道的关于 APK 文件的一切——里面有什么、如何工作、APK 与 AAB 的区别、为什么文件完整性关乎安全。",
    date: "2026-05-11",
    readTime: "7 分钟阅读",
    tags: ["APK", "Android", "新手指南"],
  },
  {
    slug: "how-to-install-apk-on-android",
    title: "如何在 Android 手机安装 APK 文件：完整分步指南",
    description: "第一次侧载 APK？本指南涵盖从启用未知来源到解决常见安装错误的所有内容。",
    date: "2026-05-11",
    readTime: "7 分钟阅读",
    tags: ["APK 安装", "Android", "教程"],
  },
  {
    slug: "google-play-link-to-apk-troubleshooting",
    title: "Google Play 链接转 APK 失败？常见问题及解决方法",
    description: "Google Play 链接转 APK 失败的完整排障指南。解决无效链接、下载缓慢、安装错误等问题。",
    date: "2026-05-11",
    readTime: "7 分钟阅读",
    tags: ["APK 下载", "故障排除", "Google Play"],
  },
  {
    slug: "google-play-link-to-apk-tips",
    title: "无需 VPN！在线 Google Play 链接转 APK 的 3 个专业技巧",
    description: "掌握 Google Play 链接转 APK 的 3 个专家技巧。使用包名、从手机下载、即时生成分享链接。",
    date: "2026-05-11",
    readTime: "6 分钟阅读",
    tags: ["APK 技巧", "Google Play", "效率"],
  },
  {
    slug: "google-play-link-to-apk-step-by-step",
    title: "Google Play 链接转 APK：新手完整分步指南",
    description: "从零开始学习如何将 Google Play 链接转换为 APK 文件。涵盖为什么、怎么做以及相关一切。",
    date: "2026-05-11",
    readTime: "8 分钟阅读",
    tags: ["APK 下载", "教程", "新手指南"],
  },
  {
    slug: "safe-reliable-apk-download-sites",
    title: "安全下载 APK 的 7 个可靠网站推荐（2026 实测）",
    description: "从第三方下载 APK 安全吗？实测推荐 7 个经过验证的 APK 下载站，帮你避开恶意软件和钓鱼陷阱。",
    date: "2026-05-12",
    readTime: "10 分钟阅读",
    tags: ["APK 下载", "安全", "推荐"],
  },
  {
    slug: "apk-vs-aab-complete-comparison",
    title: "APK vs AAB：Android 应用格式全面对比（2026 最新）",
    description: "Google Play 已强制要求新应用使用 AAB 格式发布。APK 和 AAB 有什么区别？开发者需要知道什么？普通用户受影响吗？",
    date: "2026-05-12",
    readTime: "8 分钟阅读",
    tags: ["APK", "AAB", "对比"],
  },
  {
    slug: "apk-permission-check-malware-detection",
    title: "Android APK 权限检查指南：3 步识别恶意应用（2026 最新）",
    description: "下载 APK 后如何判断是否安全？通过权限检查、签名验证和恶意软件扫描，3 步识别恶意 Android 应用。",
    date: "2026-05-13",
    readTime: "10 分钟阅读",
    tags: ["APK 安全", "权限检查", "恶意软件"],
  },
  {
    slug: "apk-install-failed-troubleshooting",
    title: "APK 安装失败？12 种常见原因及解决方法（2026 完全指南）",
    description: '下载了 APK 却安装不上？"应用未安装"、"解析包时出现问题"——12 种常见原因及对应解决方法。',
    date: "2026-05-13",
    readTime: "12 分钟阅读",
    tags: ["APK 安装", "故障排查", "教程"],
  },
];

export default function BlogPageZh() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK 下载博客
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          关于从 Google Play 下载 APK 文件的指南、教程和技巧。
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/zh/blog/${post.slug}`}
            className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/zh" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回 APK 下载器
        </Link>
      </div>
    </div>
  );
}
