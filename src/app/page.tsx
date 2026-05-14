import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function HomeZh() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK 下载器
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"输入应用名称、Google Play 链接或包名，快速找到应用并生成 APK 下载链接。"}
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
          <h3 className="text-xl font-bold mb-3">快速下载</h3>
          <p className="text-slate-600 dark:text-slate-400">无需等待，无需验证码，立即生成直接下载链接。</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">安全可靠</h3>
          <p className="text-slate-600 dark:text-slate-400">文件直接从 Google 服务器获取。无修改，100% 原始 APK。</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">无需注册</h3>
          <p className="text-slate-600 dark:text-slate-400">完全免费使用，无需创建账号或下载任何扩展程序。</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">如何从 Google Play 下载 APK</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">复制 Google Play 链接</h3>
              <p className="text-slate-600 dark:text-slate-400">在 Google Play 商店中找到应用，从地址栏复制其 URL。</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">粘贴并生成</h3>
              <p className="text-slate-600 dark:text-slate-400">将链接粘贴到上方输入框，点击生成下载链接按钮。</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">下载你的 APK</h3>
              <p className="text-slate-600 dark:text-slate-400">点击下载链接保存 APK 文件，然后在 Android 设备上安装。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">为什么选择 gptoapk.com？</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">源自 Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">文件直接从 Google 服务器获取</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">不上传</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">文件经过服务器但不存储</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% 免费</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">无隐藏费用，无高级套餐</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">无需注册</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">立即开始下载</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">APK 下载指南与技巧</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          了解更多关于 APK 文件、安装方法和最佳 APK 提取工具的信息。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/zh/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">如何从 Google Play 下载 APK：完整指南</h3>
            <p className="text-sm text-slate-500 mt-2">涵盖网页工具、ADB 和最佳实践的完整指南。</p>
          </Link>
          <Link href="/zh/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">什么是 APK 文件？</h3>
            <p className="text-sm text-slate-500 mt-2">深入了解 Android 安装包文件的方方面面。</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/zh/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            查看全部文章 →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">常见问题</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">如何从 Google Play 下载 APK？</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">只需将 Google Play 链接粘贴到本页面，点击生成链接即可，几秒钟就准备好 APK 下载。</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">下载 APK 文件安全吗？</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">安全。我们的工具直接从 Google 服务器获取文件，APK 100% 原始且未修改。</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">需要安装任何东西吗？</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">不需要。gptoapk.com 完全在浏览器中运行，无需扩展程序或软件。</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/zh/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            查看全部常见问题 →
          </Link>
        </div>
      </div>
    </div>
  );
}
