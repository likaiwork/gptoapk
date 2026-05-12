import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function JaHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK ダウンローダー
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play ストアから APK ファイルを直接ダウンロード。Google Play のリンクまたはアプリ ID を貼り付けるだけで、ダウンロードリンクをすぐに生成します。
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
          <h3 className="text-xl font-bold mb-3">高速ダウンロード</h3>
          <p className="text-slate-600 dark:text-slate-400">待ち時間なし、CAPTCHA 不要。直接ダウンロードリンクをすぐに生成します。</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">安全・安心</h3>
          <p className="text-slate-600 dark:text-slate-400">ファイルは Google のサーバーから直接取得。改変なし、100% オリジナルの APK です。</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">登録不要</h3>
          <p className="text-slate-600 dark:text-slate-400">完全無料。アカウント作成や拡張機能のダウンロードは一切不要です。</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Google Play から APK をダウンロードする方法</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Google Play のリンクをコピー</h3>
              <p className="text-slate-600 dark:text-slate-400">Google Play ストアでアプリを見つけ、アドレスバーから URL をコピーします。</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">貼り付けて生成</h3>
              <p className="text-slate-600 dark:text-slate-400">上の入力欄にリンクを貼り付け、生成ボタンをクリックします。</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">APK をダウンロード</h3>
              <p className="text-slate-600 dark:text-slate-400">ダウンロードリンクをクリックして APK ファイルを保存し、Android デバイスにインストールします。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">なぜ gptoapk.com を選ぶのか？</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Google から直接</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">ファイルは Google のサーバーから直接取得</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">アップロードなし</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">サーバーを通過しますが保存されません</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% 無料</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">隠れた料金もプレミアムプランもなし</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">登録不要</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">すぐにダウンロードを開始できます</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">APK ダウンロードガイドとヒント</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          APK ファイル、インストール方法、最適な APK 抽出ツールについて詳しく学びましょう。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/ja/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Google Play から APK をダウンロードする方法</h3>
            <p className="text-sm text-slate-500 mt-2">Web ツール、ADB、ベストプラクティスを網羅した完全ガイド。</p>
          </Link>
          <Link href="/ja/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">APK ファイルとは？</h3>
            <p className="text-sm text-slate-500 mt-2">Android インストールパッケージファイルについて深く理解しましょう。</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/ja/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            すべての記事を見る →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">よくある質問</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Google Play から APK をダウンロードするには？</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Google Play のリンクをこのページに貼り付けて生成ボタンをクリックするだけで、数秒で APK ダウンロードリンクが用意されます。</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">APK ファイルのダウンロードは安全ですか？</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">はい、安全です。当ツールは Google のサーバーから直接ファイルを取得するため、APK は 100% オリジナルで未改変です。</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">何かをインストールする必要がありますか？</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">いいえ。gptoapk.com はブラウザ内で完結し、拡張機能やソフトウェアは不要です。</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/ja/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            すべての FAQ を見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
