import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Hướng dẫn và bài viết về APK Downloader | gptoapk.com",
  description:
    "Tìm hiểu cách tải APK từ Google Play Store, so sánh các công cụ tải APK, hiểu cấu trúc tệp APK và làm chủ việc cài đặt ứng dụng Android.",
  alternates: {
    canonical: "https://gptoapk.com/vi/blog",
    languages: {
      en: "https://gptoapk.com/en/blog",
      zh: "https://gptoapk.com/zh/blog",
      vi: "https://gptoapk.com/vi/blog",
      "x-default": "https://gptoapk.com/en/blog",
    },
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Cách tải APK từ Google Play: Hướng dẫn chi tiết (2026)",
    description: "Hướng dẫn từng bước cách tải tệp APK từ Google Play Store. Tìm hiểu nhiều phương pháp bao gồm công cụ web, ADB và các mẹo tải xuống an toàn.",
    date: "2026-05-11",
    readTime: "6 phút đọc",
    tags: ["Tải APK", "Google Play", "Hướng dẫn"],
  },
  {
    slug: "what-is-an-apk-file",
    title: "File APK là gì? Hướng dẫn toàn diện về tệp tin Android Package",
    description: "Mọi điều bạn cần biết về tệp APK — bên trong có gì, hoạt động ra sao, APK so với AAB và vì sao tính toàn vẹn của tệp lại quan trọng với bảo mật Android.",
    date: "2026-05-11",
    readTime: "7 phút đọc",
    tags: ["APK", "Android", "Hướng dẫn cơ bản"],
  },
    {
      slug: "safe-reliable-apk-download-sites",
      title: "7 Trang Tải APK An Toàn và Đáng Tin Cậy (2026)",
      description: "Không phải tất cả các trang tải APK đều an toàn. Dưới đây là 7 nguồn đã được xác minh.",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["Tải APK", "An toàn", "Mẹo Android"],
    },
    {
      slug: "apk-vs-aab-complete-comparison",
      title: "APK so với AAB: Hướng dẫn So sánh Toàn diện (2026)",
      description: "APK so với Android App Bundle — sự khác biệt là gì và tại sao nó quan trọng?",
      date: "2026-05-11",
      readTime: "8 min read",
      tags: ["APK vs AAB", "Android", "Phát triển ứng dụng"],
    },

    {
      slug: "apk-permission-check-malware-detection",
      title: "Hướng dẫn kiểm tra quyền APK: 3 bước phát hiện ứng dụng độc hại (2026)",
      description: "Cách kiểm tra tệp APK có an toàn trước khi cài đặt.",
      date: "2026-05-13",
      readTime: "10 min read",
      tags: ["Bảo mật APK", "Quyền", "Android"],
    },
    {
      slug: "apk-install-failed-troubleshooting",
      title: "Cài đặt APK thất bại? 12 nguyên nhân phổ biến và cách khắc phục (2026)",
      description: "Hướng dẫn đầy đủ về các lỗi cài đặt APK phổ biến.",
      date: "2026-05-13",
      readTime: "12 min read",
      tags: ["Cài đặt APK", "Khắc phục", "Android"],
    },
];

export default function ViBlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Blog APK Downloader
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Hướng dẫn, bài viết và mẹo để tải tệp APK từ Google Play Store.
        </p>
      </div>

      {/* Vietnamese articles grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Bài viết tiếng Việt</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/vi/blog/${post.slug}`}
              className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="mb-12 border-t border-slate-200 dark:border-slate-700" />

      {/* English articles (existing) */}
      <div className="mb-10 mx-auto max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 rounded-xl px-6 py-4">
        Các bài viết dưới đây hiện chỉ có bằng tiếng Anh. Thêm bài viết tiếng Việt sẽ được cập nhật trong thời gian tới.
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Link href="/en/blog/how-to-download-apk-from-google-play" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 phút</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            How to Download APK from Google Play Store: The Complete Guide (2026)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Hướng dẫn từng bước để trích xuất tệp APK từ Google Play Store. Tìm hiểu nhiều phương pháp: công cụ web, ADB và các phương pháp tốt nhất để tải an toàn.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Download</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/en/blog/apk-downloader-tool-comparison" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>8 phút</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            APK Downloader Comparison: Top 5 Tools for Google Play APK Extraction
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Chúng tôi đã thử nghiệm song song các công cụ tải APK phổ biến nhất. So sánh tốc độ, bảo mật và tính dễ sử dụng để tìm công cụ tốt nhất.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Tools</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Comparison</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Review</span>
          </div>
        </Link>

        <Link href="/en/blog/what-is-an-apk-file" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 phút</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            What Is an APK File? A Complete Guide to Android Package Files
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Mọi điều bạn cần biết về tệp APK — bên trong là gì, hoạt động ra sao, APK so với AAB và vì sao tính toàn vẹn của tệp lại quan trọng đối với bảo mật Android.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Beginner Guide</span>
          </div>
        </Link>

        <Link href="/en/blog/how-to-install-apk-on-android" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 phút</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            How to Install APK on Android: Complete Step-by-Step Guide
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Mới làm quen với cài đặt APK theo cách thủ công? Hướng dẫn này bao quát mọi thứ từ bật nguồn không xác định đến khắc phục các lỗi cài đặt phổ biến.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Installation</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Android</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Tutorial</span>
          </div>
        </Link>

        <Link href="/en/blog/google-play-link-to-apk-troubleshooting" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>7 phút</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Google Play Link to APK Failed? Common Problems and Fixes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Hướng dẫn khắc phục đầy đủ khi chuyển đổi liên kết Google Play sang APK thất bại: liên kết không hợp lệ, tải chậm, lỗi cài đặt và nhiều hơn nữa.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Download</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Troubleshooting</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
          </div>
        </Link>

        <Link href="/en/blog/google-play-link-to-apk-tips" className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <time dateTime="2026-05-11">2026-05-11</time>
            <span>·</span>
            <span>6 phút</span>
          </div>
          <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            No VPN Needed! 3 Pro Tips for Online Google Play Link to APK Converter
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            Làm chủ chuyển đổi liên kết Google Play sang APK với 3 mẹo chuyên gia: dùng tên gói, tải từ điện thoại và tạo liên kết chia sẻ ngay lập tức.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">APK Tips</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Google Play</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Productivity</span>
          </div>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <Link href="/vi" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại APK Downloader
        </Link>
      </div>
    </div>
  );
}
