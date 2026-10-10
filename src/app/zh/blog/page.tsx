import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getZhBlogBySlug, getZhBlogIndex, ZH_BLOG_TOPIC_CLUSTERS } from "@/lib/blog/zh-blog-index";

export const metadata: Metadata = {
  title: "博客 - APK 下载指南 | gptoapk.com",
  description: "学习如何从 Google Play 下载 APK，对比 APK 下载工具，了解 APK 文件结构，掌握 Android 应用安装技巧。",
  alternates: {
    canonical: "https://www.gptoapk.com/zh/blog",
    languages: {
      en: "https://www.gptoapk.com/en/blog",
      "x-default": "https://www.gptoapk.com/en/blog",
    },
  },
};

export default function BlogPageZh() {
  const posts = getZhBlogIndex();
  return (


    <div
className="max-w-5xl mx-auto px-4 py-16">


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "APK 下载博客 | gptoapk.com",
            "description": "APK 下载、安装故障排查、GEO 速查与海外应用侧载指南",
            "url": "https://www.gptoapk.com/zh/blog",
            "inLanguage": "zh-Hans",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://www.gptoapk.com"
            },
            "hasPart": ZH_BLOG_TOPIC_CLUSTERS.map((cluster) => ({
              "@type": "ItemList",
              name: cluster.title,
              description: cluster.description,
              url: cluster.hubHref
                ? `https://www.gptoapk.com${cluster.hubHref}`
                : "https://www.gptoapk.com/zh/blog",
            })),
          }),
        }}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK 下载博客
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          关于从 Google Play 下载 APK 文件的指南、教程和技巧。
        </p>
      </div>

      <section className="mb-12" aria-labelledby="topic-clusters-heading">
        <h2 id="topic-clusters-heading" className="text-2xl font-bold mb-2">
          按主题浏览（SEO / GEO）
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
          每个主题含<strong>长文教程</strong>与<strong>GEO 速查页</strong>，便于搜索引擎与 AI 摘要引用。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZH_BLOG_TOPIC_CLUSTERS.map((cluster) => (
            <div
              key={cluster.id}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-5"
            >
              <h3 className="font-semibold text-lg mb-1">{cluster.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{cluster.description}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {cluster.hubHref ? (
                  <Link
                    href={cluster.hubHref}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    专题 hub →
                  </Link>
                ) : null}
                {cluster.slugs.slice(0, 2).map((slug) => {
                  const meta = getZhBlogBySlug(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/zh/blog/${slug}`}
                      className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                    >
                      {meta?.title ?? slug}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

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
