import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const posts = [
    {
      slug: "how-to-download-apk-from-google-play",
      title: "Google Play에서 APK 다운로드하는 완벽 가이드 (2026)",
      description: "Google Play 스토어에서 APK 파일을 추출하는 단계별 방법. 웹 도구, ADB 명령어, 안전한 다운로드 팁까지.",
      date: "2026-05-11",
      readTime: "6 min read",
      tags: ["APK 다운로드", "Google Play", "가이드"],
    },
    {
      slug: "what-is-an-apk-file",
      title: "APK 파일이란? 완벽 가이드",
      description: "APK 파일에 대해 알아야 할 모든 것 – 구조, 보안, AAB와의 차이점, Android 보안에 미치는 영향.",
      date: "2026-05-11",
      readTime: "7 min read",
      tags: ["APK", "Android", "초보자 가이드"],
    },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "안전하고 신뢰할 수 있는 APK 다운로드 사이트 7선 (2026)",
      description: "모든 APK 다운로드 사이트가 안전한 것은 아닙니다. 검증된 7가지 신뢰할 수 있는 APK 소스를 소개합니다.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK 다운로드", "보안", "안드로이드 팁"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK vs AAB: 완벽 비교 가이드 (2026)",
      description: "APK와 Android App Bundle의 차이점과 그 중요성을 알아보세요. 사용자와 개발자를 위한 완벽 가이드입니다.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "앱 개발"],
    },
    {
      slug: "apk-permission-check-malware-detection",
      title: "APK 권한 확인 가이드: 악성 앱을 감지하는 3단계 (2026)",
      description: "APK 파일을 설치하기 전에 안전한지 확인하는 방법.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["APK 보안", "권한", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "APK 설치 실패? 12가지 일반적인 원인과 해결 방법 (2026)",
      description: "일반적인 APK 설치 오류에 대한 완벽 가이드.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["APK 설치", "문제 해결", "Android"],
    },
    {
      slug: "verify-apk-signature-security-guide",
      title: "APK 서명 검증 보안 가이드: 변조를 방지하는 방법 (2026)",
      description: "APK 서명 검증 방법을 완벽 설명합니다. APK 파일이 변조되지 않았는지 확인하는 3가지 방법과 서명 정보 읽는 법까지 상세히 안내합니다.",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["APK 보안", "서명 확인", "Android", "가이드"],
    },
    {
      slug: "apk-download-slow-speed-tips",
      title: "APK 다운로드 속도가 느리다? 10가지 속도 향상 팁 (2026)",
      description: "APK 파일 다운로드 속도를 획기적으로 개선하는 10가지 실용적인 팁. 네트워크 설정부터 도구 선택까지 폭넓게 다룹니다.",
      date: "2026-05-16",
      readTime: "6 min read",
      tags: ["APK 다운로드", "속도 향상", "Android"],
    },
    {
      slug: "download-region-locked-apk-apps",
      title: "지역 제한된 APK 앱을 다운로드하는 방법 (2026 완벽 가이드)",
      description: "Google Play에서 지역 제한으로 받을 수 없는 앱을 다운로드하는 3가지 방법을 비교합니다. 장단점도 자세히 설명합니다.",
      date: "2026-05-16",
      readTime: "7 min read",
      tags: ["지역 제한", "APK 다운로드", "Google Play"],
    },
  ];

export default function BlogIndexPage() {
  return (


    <div
className="max-w-3xl mx-auto px-4 py-16">


      <Script
        id="schema-collection-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Blog - gptoapk.com",
            "description": "Latest articles about APK downloads, Android apps, and installation guides",
            "url": "https://gptoapk.com/ko/blog",
            "inLanguage": "ko",
            "isPartOf": {
              "@type": "WebSite",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            }
          }),
        }}
      />
      <h1 className="text-4xl font-extrabold tracking-tight mb-2">Blog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
        APK Downloader Guides & Tutorials
      </p>

      <div className="space-y-8">
        {[...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
          <Link
            key={post.slug}
            href={`/ko/blog/${post.slug}`}
            className="block bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:shadow-md"
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
            <p className="text-gray-600 dark:text-gray-400 mb-3">{post.description}</p>
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
          APK Downloader로 돌아가기
        </Link>
      </div>
    </div>
  );
}
