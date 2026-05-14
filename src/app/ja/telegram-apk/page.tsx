import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Telegram APK ダウンロード Android用（日本）",
  description:
    "Telegram APKの最新バージョンをダウンロード。インストールガイド。",
};

export default function TelegramApkPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/ja" className="hover:underline">ホーム</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Telegram APK</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Telegram APK ダウンロード Android用（日本）
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Telegramは世界で最も高速で安全なメッセージングアプリの一つです。チャンネル、グループ、
        ボット、2GBまでのファイル共有など、豊富な機能を提供します。このガイドでは、Telegram APKを
        ダウンロードしてGoogle Playなしでインストールする方法をご紹介します。
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Telegram APK — 最新バージョン</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">項目</th>
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">値</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">バージョン</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">11.7.1</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">更新日</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">2026年5月</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">APKサイズ</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">約55 MB</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">必要Android</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Android 5.0+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Telegram APKをダウンロードする方法</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>gptoapk.comにアクセス</strong> — APKダウンロードの最速ツールです。</li>
        <li><strong>検索バーに「Telegram」と入力</strong> します。</li>
        <li><strong>「APKをダウンロード」をクリック</strong> して最新版を入手します。</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Telegram APKのインストール手順</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>設定で不明なソースを許可</strong> します。</li>
        <li><strong>ダウンロードしたAPKファイルを開きます</strong>。</li>
        <li><strong>「インストール」をタップ</strong> します。</li>
        <li><strong>Telegramを開いて電話番号でログイン</strong> します。</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Telegramの機能</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li>シークレットチャットのエンドツーエンド暗号化</li>
        <li>最大200,000人のグループ</li>
        <li>無制限の購読者を持つチャンネル</li>
        <li>最大2GBのファイル送信</li>
        <li>全デバイス間のクラウド同期</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">よくある質問（FAQ）</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Telegramは安全ですか？</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">はい。公式のTelegram APKはgptoapk.comから安全にダウンロードでき、ウイルスやマルウェアは含まれていません。</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Telegramは日本で利用できますか？</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">はい、Telegramは日本でも問題なく利用できます。APKダウンロードはGoogle Playの代替手段として提供されています。</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">最新バージョンのAPKが必要ですか？</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — どんなAPKも高速かつ安全にダウンロード。検索バーにアプリ名を入力するだけ。</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">検索する →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    </div>
  );
}
