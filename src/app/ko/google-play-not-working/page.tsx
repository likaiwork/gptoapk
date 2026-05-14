import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Play가 작동하지 않나요? APK 다운로드하는 5가지 방법",
  description:
    "Google Play가 작동하지 않나요? Google Play 없이 APK를 다운로드하고 설치하는 완벽한 가이드.",
};

export default function GooglePlayNotWorkingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/ko" className="hover:underline">홈</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Google Play가 작동하지 않음</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Google Play가 작동하지 않나요? APK 다운로드하는 5가지 방법
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Google Play는 다양한 이유로 작동하지 않을 수 있습니다: 동기화 오류, 캐시 손상,
        저장 공간 부족, 지역 제한 등. 다행히 Google Play에 의존하지 않고 Android 앱을
        다운로드하고 설치하는 여러 가지 방법이 있습니다.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Google Play가 작동하지 않는 이유</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>캐시 손상</strong> — 누적된 데이터가 오류를 일으킬 수 있습니다.</li>
        <li><strong>계정 동기화 오류</strong> — Google 계정 문제.</li>
        <li><strong>저장 공간 부족</strong> — 다운로드할 공간이 충분하지 않습니다.</li>
        <li><strong>지역 제한</strong> — 일부 앱을 사용할 수 없습니다.</li>
        <li><strong>Google Play 버전이 오래됨</strong> — 업데이트가 필요합니다.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Google Play 없이 APK 다운로드하는 5가지 방법</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">1. gptoapk.com 사용 (권장)</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        gptoapk.com은 APK를 다운로드하는 가장 빠르고 안전한 방법입니다. 앱 이름을 검색하고
        다운로드를 클릭하기만 하면 됩니다. 파일은 Google Play 서버에서 직접 가져옵니다.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-6">
        <li>gptoapk.com에 접속합니다.</li>
        <li>검색창에 앱 이름을 입력합니다.</li>
        <li>"APK 다운로드"를 클릭합니다.</li>
        <li>APK를 수동으로 설치합니다.</li>
      </ol>

      <h3 className="text-xl font-bold mt-6 mb-3">2. Google Play 캐시 지우기</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        설정 → 앱 → Google Play 스토어 → 저장공간 → 캐시 지우기. 이 방법으로 많은 문제가 해결됩니다.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">3. 대체 앱 스토어 사용</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        APKMirror, APKPure 등 신뢰할 수 있는 대체 스토어가 있습니다. 파일의 신뢰성을 항상 확인하세요.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">4. ADB를 통한 설치</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        USB 디버깅을 활성화하고 컴퓨터에서 <code className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-sm">adb install 파일명.apk</code> 명령어를 실행합니다.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-3">5. 다른 기기에서 APK 추출</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
        앱이 이미 설치된 기기에서 APK 추출 앱을 사용하여 파일을 전송합니다.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">자주 묻는 질문 (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Google Play 외부에서 APK를 다운로드해도 안전한가요?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">네, gptoapk.com과 같은 신뢰할 수 있는 소스를 사용하면 안전합니다. 항상 파일의 출처를 확인하세요.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Google Play를 계속 사용할 수 있나요?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">네, APK 수동 설치는 Google Play 작동에 영향을 주지 않습니다. 둘 다 함께 사용할 수 있습니다.</p>
        </div>
      </div>


      {/* Related Guides */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">관련 가이드</h2>
        <ul className="space-y-2">
        <li><a href="/ko/chatgpt-apk" className="text-blue-600 dark:text-blue-400 hover:underline">ChatGPT APK 다운로드</a></li>
        <li><a href="/ko/telegram-apk" className="text-blue-600 dark:text-blue-400 hover:underline">Telegram APK 다운로드</a></li>
        <li><a href="/ko/tiktok-apk" className="text-blue-600 dark:text-blue-400 hover:underline">TikTok APK 다운로드</a></li>
        </ul>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">최신 버전의 APK가 필요하신가요?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — 모든 APK를 빠르고 안전하게 다운로드하는 방법입니다. 검색창에 앱 이름을 입력하기만 하면 됩니다.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">지금 검색 →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    {/* Schema.org JSON-LD */}
      <Script
        id="schema-tech-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Google Play가 작동하지 않나요? APK 다운로드하는 5가지 방법",
            "description": "Google Play가 작동하지 않나요? Google Play 없이 APK를 다운로드하고 설치하는 완벽한 가이드.",
            "datePublished": "2026-05-14",
            "author": {
              "@type": "Organization",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "gptoapk.com",
              "url": "https://gptoapk.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://gptoapk.com/ko/google-play-not-working"
            },
            "inLanguage": "ko"
          })
        }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "gptoapk.com",
                "item": "https://gptoapk.com/ko"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Google Play Not Working",
                "item": "https://gptoapk.com/ko/google-play-not-working"
              }
            ]
          })
        }}
      />

    
    </div>
  );
}
