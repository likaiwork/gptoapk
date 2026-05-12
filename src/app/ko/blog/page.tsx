import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./[slug]/page";

export const metadata: Metadata = {
  title: "블로그 - APK 다운로더 가이드 및 튜토리얼 | gptoapk.com",
  description:
    "Google Play 스토어에서 APK를 다운로드하는 방법, APK 다운로드 도구 비교, APK 파일 구조 이해, Android 앱 설치 마스터를 위한 종합 가이드를 확인하세요.",
  alternates: {
    canonical: "https://gptoapk.com/ko/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      ko: "https://gptoapk.com/ko/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

export default function KoBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          APK 다운로더 블로그
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play 스토어에서 APK 파일을 다운로드하기 위한 가이드, 튜토리얼, 팁.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/ko/blog/${post.slug}`}
            className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.date}>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/ko" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          APK 다운로더로 돌아가기
        </Link>
      </div>
    </div>
  );
}
