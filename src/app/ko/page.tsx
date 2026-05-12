import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function KoHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK 다운로더
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play 스토어에서 직접 APK를 다운로드하세요. Google Play 링크나 앱 ID를 아래에 붙여넣고 즉시 다운로드 링크를 생성하세요.
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      {/* Features */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">빠른 다운로드</h3>
          <p className="text-slate-600 dark:text-slate-400">대기 시간이나 캡차 없이 직접 다운로드 링크를 단 몇 초 만에 생성합니다.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">안전하고 신뢰할 수 있음</h3>
          <p className="text-slate-600 dark:text-slate-400">파일은 Google 서버에서 직접 가져옵니다. 변경 없이 100% 원본 APK입니다.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">가입 불필요</h3>
          <p className="text-slate-600 dark:text-slate-400">완전 무료 — 계정 생성이나 확장 프로그램 설치가 필요 없습니다.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Google Play에서 APK 다운로드하는 방법</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Google Play 링크 복사</h3>
              <p className="text-slate-600 dark:text-slate-400">Google Play 스토어에서 앱을 찾아 주소 표시줄에서 URL을 복사하세요.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">붙여넣기 및 생성</h3>
              <p className="text-slate-600 dark:text-slate-400">위의 입력란에 링크를 붙여넣고 링크 생성 버튼을 클릭하세요.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">APK 다운로드</h3>
              <p className="text-slate-600 dark:text-slate-400">다운로드 링크를 클릭하여 APK 파일을 저장하고 Android 기기에 설치하세요.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">왜 gptoapk.com을 선택해야 할까요?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Google에서 직접</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">파일은 Google 서버에서 직접 가져옵니다</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">업로드 없음</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">파일은 서버를 통과하지만 저장되지 않습니다</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% 무료</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">숨겨진 비용이나 프리미엄 플랜이 없습니다</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">가입 불필요</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">바로 다운로드를 시작하세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">APK 다운로드 가이드 및 팁</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          APK 파일, 설치 방법, Google Play에서 APK를 추출하는 최고의 도구에 대해 자세히 알아보세요.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/ko/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Google Play에서 APK 다운로드하는 방법: 완벽 가이드</h3>
            <p className="text-sm text-slate-500 mt-2">웹 도구, ADB, 모범 사례를 다루는 종합 가이드.</p>
          </Link>
          <Link href="/ko/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">APK 파일이란 무엇인가?</h3>
            <p className="text-sm text-slate-500 mt-2">Android 설치 패키지 파일에 대해 알아야 할 모든 것.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/ko/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            모든 글 보기 →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">자주 묻는 질문</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Google Play에서 APK를 어떻게 다운로드하나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">이 페이지에 Google Play 링크를 붙여넣고 링크 생성을 클릭하세요. APK 다운로드가 몇 초 안에 준비됩니다.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">APK 파일을 다운로드하는 것은 안전한가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">네. 저희 도구는 파일을 Google 서버에서 직접 가져옵니다. APK는 100% 원본이며 변경되지 않았습니다.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">무엇을 설치해야 하나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">아니요. gptoapk.com은 브라우저에서 완전히 작동합니다 — 확장 프로그램이나 소프트웨어가 필요 없습니다.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/ko/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            모든 FAQ 보기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
