import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Play ไม่ทำงาน? วิธีดาวน์โหลด APK โดยไม่ต้องใช้ Google Play",
  description:
    "Google Play ไม่ทำงานในประเทศไทย? คำแนะนำฉบับสมบูรณ์ในการดาวน์โหลด APK โดยไม่ต้องใช้ Google Play",
};

export default function GooglePlayNotWorkingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/th" className="hover:underline">หน้าแรก</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Google Play ไม่ทำงาน</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Google Play ไม่ทำงาน? วิธีดาวน์โหลด APK โดยไม่ต้องใช้ Google Play
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        ในประเทศไทย Google Play อาจไม่ทำงานเป็นบางครั้ง — ไม่ว่าจะเป็นปัญหาบัญชี ข้อจำกัด
        ภูมิภาค หรือความเข้ากันได้ของอุปกรณ์ โชคดีที่มีหลายวิธีในการดาวน์โหลด APK โดยไม่ต้อง
        ใช้ Google Play ต่อไปนี้คือ 5 วิธีที่มีประสิทธิภาพที่สุด:
      </p>

      <div className="space-y-8 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">1. ใช้ gptoapk.com</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            gptoapk.com เป็นวิธีที่รวดเร็วที่สุดในการค้นหา APK ของแอปใดๆ เพียงพิมพ์ชื่อแอป
            ในแถบค้นหา — ไม่ต้องลงทะเบียน ฟรี และปลอดภัย ไฟล์ APK ทุกไฟล์ผ่านการตรวจสอบไวรัส
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">2. ดาวน์โหลดจากเว็บไซต์ทางการ</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            แอปยอดนิยมอย่าง WhatsApp และ Telegram มีลิงก์ดาวน์โหลด APK โดยตรงบนเว็บไซต์
            ของตัวเอง เยี่ยมชมเว็บไซต์ทางการเพื่อรับเวอร์ชันล่าสุด
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">3. ใช้เว็บไซต์คลัง APK</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            เว็บไซต์อย่าง APKMirror และ APKPure มี APK ทั้งเวอร์ชันเก่าและใหม่ เข้าถึงได้จาก
            ประเทศไทยและมีแอปให้เลือกมากมาย ควรเลือกแหล่งที่เชื่อถือได้เสมอ
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">4. ส่ง APK จากอุปกรณ์อื่น</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            ถ้ามีเพื่อนที่ติดตั้งแอปไว้แล้ว ให้ใช้แอปสกัด APK เพื่อดึงไฟล์ APK แล้วส่งผ่าน
            Bluetooth หรือแชร์ไฟล์มาที่อุปกรณ์ของคุณ
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">5. ลองใช้ร้านค้าอื่น</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Huawei AppGallery, Samsung Galaxy Store หรือ Xiaomi GetApps เป็นทางเลือกที่ดี
            แทน Google Play โดยเฉพาะบนอุปกรณ์ Huawei ที่ไม่มี Google Play
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">ทำไม Google Play ถึงไม่ทำงาน?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
        สาเหตุทั่วไปในประเทศไทย: ปัญหาบัญชี Google, ข้อจำกัดภูมิภาค, ปัญหาความเข้ากันได้ของอุปกรณ์,
        แคชเสียหาย หรือ Google Play Services ไม่ได้อัปเดต การติดตั้ง APK เป็นทางออกที่ใช้ได้
        ในทุกสถานการณ์
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">คำถามที่พบบ่อย (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Google Play ขึ้น error ต้องทำอย่างไร?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">ลองล้างแคช: การตั้งค่า → แอป → Google Play → ล้างแคช ถ้ายังไม่หาย ให้ใช้วิธีติดตั้ง APK แทน</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">การติดตั้ง APK ปลอดภัยหรือไม่?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">ปลอดภัยหากดาวน์โหลดจากแหล่งที่เชื่อถือได้ เช่น gptoapk.com หลีกเลี่ยงแหล่งที่ไม่รู้จัก</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Google Play ทำไมถึงไม่แสดงบางแอปในไทย?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Google อาจจำกัดแอปบางประเภทตามข้อตกลงสิทธิ์การใช้งานหรือกฎหมายท้องถิ่น การดาวน์โหลด APK เป็นวิธีแก้ปัญหาที่ดีที่สุด</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">ต้องการ APK เวอร์ชันล่าสุด?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — วิธีดาวน์โหลด APK ที่รวดเร็วและปลอดภัย เพียงป้อนชื่อแอปในแถบค้นหา</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">ค้นหาเลย →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    </div>
  );
}
