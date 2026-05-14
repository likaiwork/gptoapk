import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function ThHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"ค้นหาด้วยชื่อแอป วางลิงก์ Google Play หรือป้อนชื่อแพ็กเกจ เพื่อค้นหาแอปและสร้างลิงก์ดาวน์โหลด APK"}
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">ดาวน์โหลดเร็ว</h3>
          <p className="text-slate-600 dark:text-slate-400">
            สร้างลิงก์ได้ภายในไม่กี่วินาที — วางลิงก์ Play Store หรือชื่อแพ็กเกจ
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">ปลอดภัย</h3>
          <p className="text-slate-600 dark:text-slate-400">
            ดึงไฟล์จากเซิร์ฟเวอร์ Google โดยตรง — ไม่มีคนกลาง ไม่ดัดแปลงไฟล์
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">ไม่ต้องสมัคร</h3>
          <p className="text-slate-600 dark:text-slate-400">
            ใช้ฟรี ไม่ต้องมีบัญชี ไม่มีแคปชา ใช้บนเบราว์เซอร์มือถือและคอมพิวเตอร์
          </p>
        </div>
      </div>

      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-center mb-12">วิธีใช้</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">คัดลอกลิงก์ Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">
                หาแอปใน Play Store แล้วคัดลอก URL จากแถบที่อยู่ หรือใช้ชื่อแพ็กเกจ เช่น{" "}
                <code className="text-sm bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">com.example.app</code>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">วางแล้วสร้างลิงก์</h3>
              <p className="text-slate-600 dark:text-slate-400">
                วางลิงก์หรือชื่อแพ็กเกจในช่องด้านบน แล้วคลิกสร้างลิงก์ เครื่องมือจะดึง APK จาก Google แบบเรียลไทม์
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">ดาวน์โหลดและติดตั้ง</h3>
              <p className="text-slate-600 dark:text-slate-400">
                เมื่อได้ลิงก์แล้ว ดาวน์โหลดไฟล์ APK ไปยังอุปกรณ์ Android แล้วติดตั้งได้เลย
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">เรียนรู้เพิ่มเติมเกี่ยวกับ APK</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          บทความภาษาไทยกำลังจัดเตรียม — ขณะนี้อ่านคู่มือภาษาอังกฤษในบล็อกได้
        </p>
        <Link
          href="/th/blog"
          className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium px-6 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
        >
          ไปที่บล็อก
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
