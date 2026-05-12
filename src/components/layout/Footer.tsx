"use client";

import { usePathname } from "next/navigation";

const enLinks = [
  { label: "Home", href: "/en" },
  { label: "Blog", href: "/en/blog" },
  { label: "FAQ", href: "/en/faq" },
  { label: "中文", href: "/" },
];

const zhLinks = [
  { label: "首页", href: "/" },
  { label: "博客", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "English", href: "/en" },
];

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const links = isEn ? enLinks : zhLinks;

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
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
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
