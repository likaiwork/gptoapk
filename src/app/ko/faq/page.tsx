import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "자주 묻는 질문 - APK 다운로더 | gptoapk.com",
  description:
    "gptoapk.com을 사용해 Google Play 스토어에서 APK를 다운로드하는 방법에 대한 자주 묻는 질문. 작동 방식, 보안, 문제 해결 팁.",
};

export default function KoFAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          자주 묻는 질문
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          gptoapk.com을 사용해 Google Play 스토어에서 APK 파일을 다운로드하는 방법에 대해 알아야 할 모든 것.
        </p>
      </div>

      <div className="space-y-6">
        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">gptoapk.com이란 무엇인가요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            gptoapk.com은 Google Play 스토어에서 직접 APK 다운로드 링크를 생성할 수 있는 무료 온라인 도구입니다. Google Play URL이나 패키지 이름을 붙여넣기만 하면 즉시 직접 다운로드 링크를 받을 수 있습니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">사용이 무료인가요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            네, 완전히 무료입니다. 가입 없음, 숨겨진 비용 없음, 프리미엄 플랜 없음.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">어떻게 작동하나요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Google Play 링크를 붙여넣으면 저희 서버가 Google CDN에서 APK 파일을 직접 가져와 다운로드 링크를 제공합니다. 파일을 수정하거나 저장하지 않습니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">gptoapk.com에서 APK를 다운로드하는 것이 안전한가요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            물론입니다. 파일은 Google 서버에서 직접 가져옵니다. 파일을 만지거나 수정하지 않으므로 100% 원본의 서명 검증된 APK를 받을 수 있습니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">휴대폰에서도 APK를 다운로드할 수 있나요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            네! 모바일 브라우저에서 gptoapk.com을 열고 링크를 붙여넣기만 하면 됩니다. 휴대폰과 컴퓨터 모두에서 작동합니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">유료 앱에서도 작동하나요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            네, 다만 유효한 다운로드 링크를 생성하려면 자신의 Google 계정으로 앱을 구매해야 합니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">소프트웨어나 브라우저 확장 프로그램을 설치해야 하나요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            아니요. gptoapk.com은 브라우저 안에서 완전히 작동합니다. 다운로드, 확장 프로그램, 플러그인이 필요 없습니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">어느 국가에서나 APK 파일을 다운로드할 수 있나요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            네, gptoapk.com은 전 세계에서 작동합니다. 다만 일부 앱은 Google Play에서 지역 제한이 있을 수 있습니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">APK와 AAB의 차이점은 무엇인가요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            APK는 Android용 설치 가능한 패키지 형식입니다. AAB(Android App Bundle)는 Google Play에서 사용하는 게시 형식입니다. gptoapk.com은 두 가지를 모두 지원합니다 — 앱이 AAB로 게시된 경우에도 호환되는 APK를 제공합니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">일부 앱에서 404 오류가 나는 이유는 무엇인가요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            일부 앱은 지역이 잠겨 있거나 Google Play에서 제거되었거나 특정 기기 호환성을 요구할 수 있습니다. 앱이 지역 제한된 경우 VPN을 사용해 보세요.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">Google Play에서 APK를 다운로드하는 것이 합법인가요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            개인 사용, 앱 테스트, 백업 목적이라면 전혀 문제없습니다. 허가 없이 유료 앱이나 저작권으로 보호된 자료를 재배포하는 것은 불법입니다.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">gptoapk.com은 Google과 제휴되어 있나요?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            아니요. gptoapk.com은 독립적인 도구이며 Google이나 Google Play와 어떠한 제휴 관계도 없습니다.
          </div>
        </details>
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">아직 질문이 있나요?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          저희 <Link href="/ko" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK 다운로더</Link>를 직접 사용해 보시거나, 자세한 가이드는 <Link href="/ko/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">블로그</Link>를 확인하세요.
        </p>
      </div>
    </div>
  );
}
