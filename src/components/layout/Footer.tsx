"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");

  return (
    <footer className="border-t bg-white dark:bg-slate-950 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.293 13.293a1 1 0 01-1.414 0L12 13.414l-1.879 1.879a1 1 0 01-1.414-1.414L10.586 12 8.707 10.121a1 1 0 011.414-1.414L12 10.586l1.879-1.879a1 1 0 011.414 1.414L13.414 12l1.879 1.879a1 1 0 010 1.414z" />
            </svg>
            APK Downloader
          </div>
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            {isEn ? (
              <>
                <Link href="/en" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/en/blog" className="hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/en/faq" className="hover:text-blue-600 transition-colors">
                  FAQ
                </Link>
                <Link href="/zh" className="hover:text-blue-600 transition-colors">
                  中文
                </Link>
              </>
            ) : (
              <>
                <Link href="/zh" className="hover:text-blue-600 transition-colors">
                  首页
                </Link>
                <Link href="/zh/blog" className="hover:text-blue-600 transition-colors">
                  博客
                </Link>
                <Link href="/zh/faq" className="hover:text-blue-600 transition-colors">
                  FAQ
                </Link>
                <Link href="/en" className="hover:text-blue-600 transition-colors">
                  English
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="text-center text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-6">
          <p>&copy; {new Date().getFullYear()} APK Downloader. All rights reserved.</p>
          <p className="mt-2 text-xs">This tool is not affiliated with Google or Google Play in any way.</p>
        </div>
      </div>
    </footer>
  );
}
