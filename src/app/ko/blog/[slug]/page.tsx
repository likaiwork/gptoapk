import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
}

export const posts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Google Play에서 APK 다운로드하는 방법: 2026 완벽 가이드",
    description:
      "Google Play 스토어에서 APK 파일을 추출하는 단계별 가이드입니다. 웹 도구(gptoapk.com), ADB 명령어, 안전한 다운로드를 위한 꿀팁까지 모두 알려드립니다.",
    date: "2026-05-11",
    readTime: "6 min read",
    tags: ["APK 다운로드", "Google Play", "튜토리얼"],
    content: (
      <>
        <p>
          Google Play 스토어에서 앱을 다운로드할 때 APK 파일을 직접 받고 싶었던 적이 있나요?
          Android 앱 개발자라면 빌드 테스트를 위해, 예전 버전이 더 잘 작동해서 백업용으로,
          아니면 인터넷이 없는 기기에 설치하기 위해 APK 파일이 필요할 때가 있습니다.
        </p>

        <h2>APK 파일이란?</h2>
        <p>
          APK(Android Package Kit)는 Android 운영체제에서 앱을 배포하고 설치하는 데 사용하는
          파일 형식입니다. 보통 Google Play 스토어에서 앱을 다운로드하면 스토어가 자동으로
          APK를 다운로드하여 설치합니다. 하지만 때로는 원본 APK 파일을 직접 손에 넣고 싶은
          상황이 생깁니다. 그럴 때 필요한 것이 바로 Google Play APK 다운로더입니다.
        </p>

        <h2>APK 다운로드가 필요한 이유</h2>
        <p>APK 파일을 직접 다운로드해야 하는 합법적인 이유는 다양합니다:</p>
        <ul>
          <li>
            <strong>앱 테스트 및 디버깅</strong> — 개발자는 여러 기기에서 테스트하기 위해
            APK가 필요합니다
          </li>
          <li>
            <strong>오프라인 설치</strong> — 인터넷 없이도 앱을 공유하고 설치할 수 있습니다
          </li>
          <li>
            <strong>버전 롤백</strong> — 예전 버전이 더 안정적이었다면 APK 파일로 언제든
            되돌릴 수 있습니다
          </li>
          <li>
            <strong>사이드로딩</strong> — Google Play 서비스가 없는 기기에도 앱을 설치할 수
            있습니다
          </li>
          <li>
            <strong>보안 분석</strong> — 보안 연구원이 APK 구조를 분석하여 악성 코드를
            찾아냅니다
          </li>
        </ul>

        <h2>방법 1: gptoapk.com 사용하기 (가장 쉬운 방법)</h2>
        <p>
          웹 기반 APK 추출 도구를 사용하는 것이 가장 간편합니다.
          <a href="https://gptoapk.com">gptoapk.com</a>을 이용하면 몇 초 만에 Google Play에서
          APK를 다운로드할 수 있습니다.
        </p>
        <ol>
          <li>Google Play 스토어에서 원하는 앱을 찾습니다</li>
          <li>
            주소 표시줄에서 앱의 URL을 복사합니다 (예:{" "}
            <code>https://play.google.com/store/apps/details?id=com.example.app</code>)
          </li>
          <li>또는 패키지 이름만 복사해도 됩니다 (예: <code>com.example.app</code>)</li>
          <li>
            <a href="https://gptoapk.com">gptoapk.com</a>에 접속하여 입력창에 붙여넣습니다
          </li>
          <li>&quot;링크 생성&quot; 버튼을 클릭합니다</li>
          <li>APK 다운로드 링크가 즉시 생성됩니다!</li>
        </ol>
        <p>
          <strong>회원가입 불필요, 캡차 없음, 완전 무료입니다.</strong>
        </p>

        <h2>방법 2: ADB 명령어 사용하기 (개발자용)</h2>
        <p>
          ADB(Android Debug Bridge)에 익숙하다면 명령줄에서 직접 APK를 추출할 수도 있습니다.
          루팅된 기기나 에뮬레이터가 필요합니다.
        </p>
        <pre>
          <code>{`# 설치된 앱 패키지 목록에서 찾기
adb shell pm list packages | grep [앱이름]

# 패키지 경로 확인
adb shell pm path [패키지명]

# APK 파일 추출
adb pull [위에서확인한경로]`}</code>
        </pre>
        <p>
          이 방법은 기술적인 지식이 필요하지만, 설치된 APK 파일을 직접 추출할 수 있다는
          장점이 있습니다.
        </p>

        <h2>방법 3: APK 미러 사이트 활용하기</h2>
        <p>
          APKMirror나 APKPure 같은 사이트도 APK 파일을 제공하지만, 사용자 업로드에 의존하기
          때문에 최신 버전이 항상 있는 것은 아닙니다.
          <a href="https://gptoapk.com">gptoapk.com</a>은 Google 서버에서 직접 파일을 가져오기
          때문에 항상 최신 버전을 안전하게 받을 수 있습니다.
        </p>

        <h2>온라인 APK 다운로드, 안전한가요?</h2>
        <p>
          <strong>gptoapk.com을 사용한다면, 안전합니다.</strong> 그 이유는 다음과 같습니다:
        </p>
        <ul>
          <li>
            <strong>Google CDN에서 직접 가져옵니다</strong> — 중간에서 파일이 변조될 일이
            없습니다
          </li>
          <li>100% 원본, 서명이 확인된 APK 파일입니다</li>
          <li>파일을 서버에 저장하거나 보관하지 않습니다</li>
          <li>파일에 직접 접근하지 않으므로 악성 코드 주입이 불가능합니다</li>
        </ul>

        <h2>APK 설치 시 주의사항</h2>
        <p>APK를 사이드로딩할 때는 다음 안전 수칙을 꼭 지켜주세요:</p>
        <ul>
          <li>
            <strong>신뢰할 수 있는 출처에서만 다운로드하세요.</strong> gptoapk.com처럼 원본
            소스에서 직접 가져오는 도구를 사용하세요
          </li>
          <li>설치 전에 VirusTotal 같은 도구로 APK 파일을 검사하세요</li>
          <li>
            앱이 요청하는 권한을 꼭 확인하세요 — 손전등 앱이 연락처 접근을 요구하면 의심해야
            합니다
          </li>
          <li>보안을 위해 설치 후에는 &quot;출처를 알 수 없는 앱 설치&quot; 권한을 다시 꺼두세요</li>
          <li>정기적으로 설치된 앱의 권한을 검토하세요</li>
        </ul>

        <h2>자주 묻는 질문 (FAQ)</h2>

        <h3>Google Play에서 APK를 다운로드해도 합법인가요?</h3>
        <p>
          네, 개인적 용도로 APK를 다운로드하는 것은 합법입니다. 단, 유료 앱을 불법적으로
          공유하거나 배포하는 것은 저작권 위반이 될 수 있습니다.
        </p>

        <h3>APK 파일을 기기로 어떻게 전송하나요?</h3>
        <p>
          USB 케이블로 연결하여 파일을 복사하거나, 클라우드 저장소(Google Drive, Dropbox)를
          통해 전송할 수 있습니다. Bluetooth나 Wi-Fi Direct도 가능합니다.
        </p>

        <h3>다운로드한 APK가 설치되지 않는 이유는?</h3>
        <p>
          일반적인 원인으로는 &quot;출처를 알 수 없는 앱 설치&quot;가 꺼져 있거나, Android 버전이
          앱의 최소 요구 사항을 충족하지 못하는 경우가 있습니다. 기기의 설정 &gt; 보안에서
          해당 옵션을 활성화해보세요.
        </p>

        <h3>gptoapk.com은 무료인가요?</h3>
        <p>
          네, 완전 무료입니다. 숨겨진 요금이나 크레딧 시스템도 없습니다. 원하는 만큼
          자유롭게 사용하세요.
        </p>

        {/* CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mt-8 text-center">
          <p className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
            APK를 바로 다운로드하세요
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <a
              href="https://gptoapk.com"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              gptoapk.com
            </a>{" "}
            — Google Play 링크를 붙여넣고 APK를 즉시 받으세요. 회원가입도, 기다림도
            필요 없습니다.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            APK 다운로더로 이동
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "what-is-an-apk-file",
    title: "APK 파일이란 무엇인가? Android 패키지 파일 완벽 가이드",
    description:
      "APK 파일의 구조와 작동 원리를 완벽하게 이해하세요. APK와 AAB의 차이점, 내부 파일 구성, 앱 설치 과정, 보안 인증서까지 초보자도 쉽게 설명합니다.",
    date: "2026-05-11",
    readTime: "7 min read",
    tags: ["APK", "Android", "초보 가이드"],
    content: (
      <>
        <p>
          Android 스마트폰을 사용하다 보면 &quot;APK 파일&quot;이라는 말을 자주 듣게 됩니다.
          &quot;APK를 다운로드해서 설치하세요&quot;, &quot;APK 파일을 추출하는 방법&quot; — 도대체 APK가
          무엇이길래 이렇게 중요할까요? 이 글에서는 APK 파일의 정의부터 내부 구조, AAB(Android
          App Bundle)와의 차이점까지 모든 것을 알기 쉽게 설명합니다.
        </p>

        <h2>APK 파일이란?</h2>
        <p>
          APK는 <strong>Android Package Kit</strong>의 약자로, Android 운영체제에서 앱을
          배포하고 설치하는 데 사용되는 파일 형식입니다. Windows의 .exe 파일이나 macOS의
          .dmg 파일과 비슷한 개념이라고 생각하면 됩니다. APK 파일 하나에 앱의 모든 요소 —
          코드, 리소스, 이미지, 메타데이터 — 가 압축되어 들어 있습니다.
        </p>

        <h2>APK 파일의 내부 구조</h2>
        <p>
          APK 파일은 기본적으로 ZIP 압축 파일입니다. 확장자를 .zip으로 바꾸면 압축을 풀어서
          내부를 볼 수 있습니다. APK 파일 안에는 다음과 같은 디렉토리와 파일이 들어 있습니다:
        </p>
        <ul>
          <li>
            <strong>AndroidManifest.xml</strong> — 앱의 필수 정보를 담고 있는 파일입니다.
            앱 이름, 버전, 권한 요청 목록, 지원 Android 버전 등이 정의되어 있습니다
          </li>
          <li>
            <strong>classes.dex</strong> — Android 기기에서 실행되는 앱의 실제 코드입니다.
            Java나 Kotlin으로 작성된 코드가 DEX(Dalvik Executable) 형식으로 변환되어
            저장됩니다
          </li>
          <li>
            <strong>resources.arsc</strong> — 문자열, 색상, 스타일 등 모든 리소스를
            인덱싱하는 파일입니다. 다국어 지원도 이 파일에서 관리됩니다
          </li>
          <li>
            <strong>res/</strong> — 이미지, 레이아웃 XML, 아이콘 등 모든 리소스 파일이
            들어있는 디렉토리입니다
          </li>
          <li>
            <strong>lib/</strong> — 네이티브 라이브러리(.so 파일)가 들어 있습니다.
            CPU 아키텍처별로 arm64-v8a, armeabi-v7a 등 하위 디렉토리로 나뉩니다
          </li>
          <li>
            <strong>META-INF/</strong> — 앱의 서명과 인증서 정보가 들어 있는 디렉토리입니다.
            앱의 무결성을 검증하는 데 사용됩니다
          </li>
        </ul>

        <h2>APK와 AAB의 차이점</h2>
        <p>
          2021년부터 Google Play 스토어는 새로운 형식인{' '}
          <strong>AAB(Android App Bundle)</strong>를 기본 포맷으로 채택했습니다. 하지만 많은
          사용자가 여전히 APK와 AAB의 차이를 혼동합니다.
        </p>
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 my-4">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">항목</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">APK</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">AAB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">설명</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">직접 설치 가능한 패키지</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Google Play가 APK로 변환하는 번들</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">설치 방식</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">직접 사이드로딩 가능</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Google Play을 통해서만 설치 가능</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">파일 크기</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">모든 리소스를 포함하여 큼</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">기기별 최적화로 더 작음</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">호환성</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">모든 Android 기기</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Android 5.0+ (API 21+)</td>
            </tr>
          </tbody>
        </table>
        <p>
          AAB는 용량을 최적화하는 데 장점이 있지만, 사이드로딩이 불가능합니다. 따라서 APK
          파일을 직접 다운로드하려면 AAB를 APK로 변환해주는 도구가 필요합니다.
          <a href="https://gptoapk.com">gptoapk.com</a>은 AAB를 APK로 변환하는 과정을
          자동으로 처리해줍니다.
        </p>

        <h2>APK 서명과 보안</h2>
        <p>
          APK 파일의 보안은 <strong>디지털 서명</strong>으로 유지됩니다. 앱 개발자는
          개인 키로 APK에 서명하고, Android 기기는 이 서명을 확인하여 파일이 변조되지
          않았는지 검증합니다. 이것이 바로 신뢰할 수 있는 출처에서 APK를 다운로드해야 하는
          이유입니다.
        </p>
        <p>
          <a href="https://gptoapk.com">gptoapk.com</a>은 Google Play의 원본 서명을 그대로
          유지한 APK를 제공하기 때문에, 파일이 변조될 위험이 전혀 없습니다.
        </p>

        <h2>APK 파일을 추출하는 방법</h2>
        <p>
          기기에 이미 설치된 앱의 APK를 추출하려면 다음과 같은 방법을 사용할 수 있습니다:
        </p>
        <h3>방법 1: 파일 관리자 앱 사용</h3>
        <p>
          Google Play 스토어에서 &quot;APK 추출기&quot; 앱을 다운로드하면 설치된 앱 목록에서
          원하는 앱의 APK 파일을 간편하게 추출할 수 있습니다.
        </p>
        <h3>방법 2: ADB 명령어 사용</h3>
        <pre>
          <code>{`# 패키지 경로 찾기
adb shell pm path com.example.app

# APK 파일 추출
adb pull /data/app/com.example.app-xxx/base.apk`}</code>
        </pre>
        <h3>방법 3: gptoapk.com 사용 (Google Play 앱)</h3>
        <p>
          아직 설치되지 않은 앱의 APK가 필요하다면
          <a href="https://gptoapk.com">gptoapk.com</a>에 Google Play 링크를 붙여넣기만
          하면 됩니다. 가장 간편하고 안전한 방법입니다.
        </p>

        <h2>자주 묻는 질문 (FAQ)</h2>

        <h3>APK 파일을 삭제해도 되나요?</h3>
        <p>
          네, APK 파일은 설치 후에는 필요하지 않습니다. 앱이 이미 설치되어 있다면 APK
          파일은 안전하게 삭제할 수 있습니다. 단, 나중에 다시 설치하려면 APK 파일이
          필요하므로 백업해두는 것도 좋은 방법입니다.
        </p>

        <h3>APK 파일이 열리지 않으면 어떻게 하나요?</h3>
        <p>
          다운로드 중 파일이 손상되었을 수 있습니다. 다시 다운로드하거나
          <a href="https://gptoapk.com">gptoapk.com</a>에서 새로운 링크를 생성해보세요.
        </p>

        <h3>APK를 XAPK나 APKS와 어떻게 다른가요?</h3>
        <p>
          XAPK와 APKS는 대용량 게임 앱에서 사용하는 확장 형식입니다. OBB(확장 데이터)
          파일이 포함되어 있어 일반 APK보다 큽니다.
          <a href="https://gptoapk.com">gptoapk.com</a>은 이러한 형식을 자동으로 감지하여
          올바른 파일을 제공합니다.
        </p>

        <h3>APK 파일의 버전을 어떻게 확인하나요?</h3>
        <p>
          APK 파일을 Android 기기로 전송하지 않고도 버전을 확인할 수 있습니다.
          <a href="https://gptoapk.com">gptoapk.com</a>에서 다운로드 링크를 생성하면 앱
          이름, 패키지 이름, 버전 코드 등 자세한 정보를 함께 확인할 수 있습니다.
        </p>

        {/* CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-6 mt-8 text-center">
          <p className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
            APK 파일을 지금 바로 받아보세요
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            <a
              href="https://gptoapk.com"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              gptoapk.com
            </a>{" "}
            — Google Play 링크만 붙여넣으면 원본 APK를 즉시 다운로드할 수 있습니다. 복잡한
            과정 없이, 안전하게.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            APK 다운로더로 이동
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </>
    ),
  },
];

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | gptoapk.com`,
    description: post.description,
    alternates: {
      canonical: `https://gptoapk.com/ko/blog/${slug}`,
      languages: {
        en: `https://gptoapk.com/en/blog/${slug}`,
        "x-default": `https://gptoapk.com/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "gptoapk.com",
    },
  };

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/ko/blog"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-8"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          블로그 목록으로 돌아가기
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
          {post.content}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/ko/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </article>
    </>
  );
}
