import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tải WhatsApp APK cho Android tại Việt Nam",
  description:
    "Tải WhatsApp APK phiên bản mới nhất cho Android. Hướng dẫn cài đặt.",
};

export default function WhatsAppApkPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/vi" className="hover:underline">Trang chủ</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">WhatsApp APK</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Tải WhatsApp APK cho Android tại Việt Nam
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        WhatsApp là ứng dụng nhắn tin phổ biến nhất tại Việt Nam. Đôi khi Google Play gặp vấn đề về
        tương thích thiết bị hoặc hạn chế khu vực, khiến bạn không thể cập nhật hoặc cài đặt WhatsApp.
        Hướng dẫn này sẽ giúp bạn tải phiên bản WhatsApp APK mới nhất và cài đặt dễ dàng.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">WhatsApp APK — Phiên bản mới nhất</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Thông số</th>
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Phiên bản mới nhất</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">2.24.12.76</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Ngày cập nhật</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Tháng 5, 2026</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Dung lượng APK</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">~50 MB</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Yêu cầu Android</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Android 5.0+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Cách tải WhatsApp APK</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Truy cập gptoapk.com</strong> — tải WhatsApp APK nhanh chóng và an toàn.</li>
        <li><strong>Gõ &quot;WhatsApp&quot; vào ô tìm kiếm</strong> — ứng dụng sẽ hiện ra ngay.</li>
        <li><strong>Nhấn &quot;Tải APK&quot;</strong> — chọn phiên bản mới nhất hoặc phiên bản cũ.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Cách cài đặt WhatsApp APK (không cần Google Play)</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Cho phép cài đặt từ nguồn không xác định</strong> — Cài đặt → Bảo mật → Nguồn không xác định (Android 8+: Cài đặt → Ứng dụng → Truy cập đặc biệt).</li>
        <li><strong>Mở tệp WhatsApp APK đã tải xuống</strong> — tìm trong thư mục &quot;Tải xuống&quot;.</li>
        <li><strong>Nhấn &quot;Cài đặt&quot;</strong> — đợi quá trình cài đặt hoàn tất.</li>
        <li><strong>Mở WhatsApp</strong> — xác minh số điện thoại và khôi phục chat từ bản sao lưu.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">WhatsApp APK có an toàn không?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Có. gptoapk.com tải tệp APK trực tiếp từ máy chủ Google Play. WhatsApp APK là ứng dụng Meta
        chính hãng, không có bất kỳ sửa đổi nào. Mã hóa đầu cuối và các tính năng bảo mật khác hoạt
        động đầy đủ.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Câu hỏi thường gặp (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">WhatsApp có hoạt động tại Việt Nam không?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Có, WhatsApp hoạt động đầy đủ tại Việt Nam. Nhắn tin, gọi điện và gọi video đều hoạt động bình thường.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Làm thế nào để cập nhật WhatsApp APK?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Tải phiên bản mới từ gptoapk.com và cài đặt lên phiên bản hiện tại. Tin nhắn và tệp media của bạn sẽ được giữ nguyên.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">WhatsApp APK có sẵn phiên bản cũ không?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Có, trên gptoapk.com bạn có thể tìm thấy các phiên bản cũ của WhatsApp APK để tải xuống.</p>
        </div>
      </div>


      {/* Related Guides */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Hướng dẫn Liên quan</h2>
        <ul className="space-y-2">
        <li><a href="/vi/chatgpt-apk" className="text-blue-600 dark:text-blue-400 hover:underline">Tải ChatGPT APK</a></li>
        <li><a href="/vi/google-play-not-working" className="text-blue-600 dark:text-blue-400 hover:underline">Google Play không hoạt động</a></li>
        <li><a href="/vi/whatsapp-apk" className="text-blue-600 dark:text-blue-400 hover:underline">Tải WhatsApp APK</a></li>
        </ul>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">Cần phiên bản APK mới nhất?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — cách nhanh chóng và an toàn để tải bất kỳ APK nào. Chỉ cần nhập tên ứng dụng vào ô tìm kiếm.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Tìm kiếm ngay →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    {/* Schema.org JSON-LD */}
      <Script
        id="schema-tech-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Tải WhatsApp APK cho Android tại Việt Nam",
            "description": "Tải WhatsApp APK phiên bản mới nhất cho Android. Hướng dẫn cài đặt.",
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
              "@id": "https://gptoapk.com/vi/whatsapp-apk"
            },
            "inLanguage": "vi"
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
                "item": "https://gptoapk.com/vi"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "WhatsApp APK",
                "item": "https://gptoapk.com/vi/whatsapp-apk"
              }
            ]
          })
        }}
      />

    
    </div>
  );
}
