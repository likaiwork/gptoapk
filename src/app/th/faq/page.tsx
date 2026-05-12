import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description:
    "คำถามที่พบบ่อยเกี่ยวกับการดาวน์โหลด APK จาก Google Play ผ่าน gptoapk.com",
};

export default function ThFAQPage() {
  const faqs = [
    {
      q: "gptoapk.com คืออะไร?",
      a: "gptoapk.com เป็นเครื่องมือออนไลน์ฟรีสำหรับสร้างลิงก์ดาวน์โหลด APK จาก Google Play Store วาง URL Google Play หรือชื่อแพ็กเกจ แล้วรับลิงก์ได้ทันที",
    },
    {
      q: "ใช้ฟรีจริงไหม?",
      a: "ใช่ ฟรีทั้งหมด ไม่ต้องสมัคร ไม่มีค่าธรรมเนียมแอบแฝงหรือแพ็กเกจพรีเมียม",
    },
    {
      q: "ทำงานอย่างไร?",
      a: "เมื่อวางลิงก์ Google Play เซิร์ฟเวอร์ของเราจะดึงไฟล์ APK จาก CDN ของ Google แล้วให้ลิงก์ดาวน์โหลด เราไม่แก้ไขหรือเก็บไฟล์ไว้",
    },
    {
      q: "ดาวน์โหลดจาก gptoapk.com ปลอดภัยไหม?",
      a: "ปลอดภัย ไฟล์มาจากเซิร์ฟเวอร์ Google โดยตรง เราไม่แก้ไขไฟล์ จึงได้ APK ต้นฉบับ",
    },
    {
      q: "ใช้บนมือถือได้ไหม?",
      a: "ได้ เปิด gptoapk.com ในเบราว์เซอร์มือถือแล้ววางลิงก์ ใช้ได้ทั้งโทรศัพท์และคอมพิวเตอร์",
    },
    {
      q: "แอปที่ต้องซื้อใช้ได้ไหม?",
      a: "ได้ แต่คุณต้องซื้อแอปด้วยบัญชี Google ของคุณแล้วลิงก์ที่ได้จึงจะใช้ได้",
    },
    {
      q: "ต้องติดตั้งซอฟต์แวร์หรือส่วนขยายไหม?",
      a: "ไม่ต้อง ใช้งานในเบราว์เซอร์อย่างเดียว ไม่ต้องโหลดโปรแกรมหรือปลั๊กอิน",
    },
    {
      q: "ใช้ได้จากทุกประเทศไหม?",
      a: "ได้ gptoapk.com ใช้ได้ทั่วโลก แต่บางแอปอาจถูกจำกัดพื้นที่ใน Play Store",
    },
    {
      q: "APK กับ AAB ต่างกันอย่างไร?",
      a: "APK เป็นไฟล์ติดตั้งบน Android ส่วน AAB เป็นรูปแบบที่ใช้เผยแพร่บน Google Play เรายังให้ APK ที่เข้ากันได้แม้แอปจะถูกเผยแพร่เป็น AAB",
    },
    {
      q: "ทำไมบางแอปถึงขึ้น 404?",
      a: "แอปอาจถูกล็อกตามภูมิภาค ถูกลบจาก Play หรือไม่รองรับเครื่องของคุณ หากจำกัดพื้นที่ลองใช้ VPN",
    },
    {
      q: "ดาวน์โหลด APK จาก Play ผิดกฎหมายไหม?",
      a: "การใช้ส่วนตัว ทดสอบ และสำรองข้อมูลมักไม่เป็นปัญหา การแจกจ่ายแอปเสียเงินหรือเนื้อหาที่มีลิขสิทธิ์โดยไม่ได้รับอนุญาตผิดกฎหมาย",
    },
    {
      q: "gptoapk.com เกี่ยวข้องกับ Google ไหม?",
      a: "ไม่เกี่ยวข้อง เป็นเครื่องมืออิสระและไม่มีส่วนเกี่ยวข้องกับ Google หรือ Google Play",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">คำถามที่พบบ่อย</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          ข้อมูลเกี่ยวกับการใช้ gptoapk.com และการดาวน์โหลด APK จาก Google Play
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg
                className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">ยังมีคำถาม?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          ลองใช้{" "}
          <Link href="/th" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            APK Downloader
          </Link>{" "}
          หรือดูที่{" "}
          <Link href="/th/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            บล็อก
          </Link>
        </p>
      </div>
    </div>
  );
}
