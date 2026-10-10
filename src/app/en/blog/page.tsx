import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getEnBlogIndex } from "@/lib/blog/en-blog-index";

export const metadata: Metadata = {
  title: "Blog - APK Downloader Guides & Tutorials | gptoapk.com",
  description: "Learn how to download APK from Google Play Store, compare APK download tools, understand APK file structure, and master Android app installation with our comprehensive guides.",
  alternates: {
    canonical: "https://www.gptoapk.com/en/blog",
    languages: {
      zh: "https://www.gptoapk.com/zh/blog",
      "x-default": "https://www.gptoapk.com/en/blog",
    },
  },
};

export default function EnBlogPage() {
  const posts = getEnBlogIndex();
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
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://www.gptoapk.com/blog",
            "inLanguage": "en",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://www.gptoapk.com"
            }
          }),
        }}
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK Downloader Blog
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Guides, tutorials, and tips for downloading APK files from Google Play Store.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/en/blog/${post.slug}`}
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
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/en"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to APK Downloader
        </Link>
      </div>
    </div>
  );
}
