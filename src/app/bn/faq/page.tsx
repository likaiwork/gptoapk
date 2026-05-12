import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Google Play লিংক থেকে APK ফাইল পেতে বিনামূল্যের অনলাইন টুল। URL বা অ্যাপ আইডি লিখে ডাউনলোড লিঙ্ক তৈরি করুন।",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "gptoapk.com কী?",
      a: "gptoapk.com একটি বিনামূল্যের অনলাইন টুল যা সরাসরি Google Play স্টোর থেকে APK ডাউনলোড লিঙ্ক তৈরি করে। Google Play URL বা প্যাকেজ নাম লিখুন এবং সাথে সাথে লিঙ্ক পান।",
    },
    {
      q: "এটি কি বিনামূল্যে?",
      a: "হ্যাঁ, সম্পূর্ণ বিনামূল্যে। কোনো নিবন্ধন, লুকানো ফি বা প্রিমিয়াম প্ল্যান নেই।",
    },
    {
      q: "এটি কীভাবে কাজ করে?",
      a: "আপনি Google Play লিঙ্ক পেস্ট করলে আমাদের সার্ভার Google CDN থেকে APK নিয়ে ডাউনলোড লিঙ্ক দেয়। আমরা ফাইল পরিবর্তন বা সংরক্ষণ করি না।",
    },
    {
      q: "gptoapk.com থেকে ডাউনলোড নিরাপদ?",
      a: "হ্যাঁ। ফাইল সরাসরি Google সার্ভার থেকে আসে; আমরা এগুলো স্পর্শ করি না, তাই আপনি আসল APK পান।",
    },
    {
      q: "মোবাইলে ব্যবহার করা যাবে?",
      a: "হ্যাঁ। মোবাইল ব্রাউজারে gptoapk.com খুলে লিঙ্ক পেস্ট করুন — ফোন ও কম্পিউটার উভয়েই চলে।",
    },
    {
      q: "পেইড অ্যাপের জন্য কাজ করে?",
      a: "হ্যাঁ, তবে আপনার Google অ্যাকাউন্টে অ্যাপটি কেনা থাকতে হবে যাতে লিঙ্ক বৈধ হয়।",
    },
    {
      q: "সফটওয়্যার বা এক্সটেনশন লাগে?",
      a: "না। সবকিছু ব্রাউজারেই — অতিরিক্ত ডাউনলোড বা প্লাগইন লাগে না।",
    },
    {
      q: "যেকোনো দেশ থেকে ব্যবহার করা যাবে?",
      a: "হ্যাঁ, বিশ্বজুড়ে কাজ করে। তবে কিছু অ্যাপ Play স্টোরে অঞ্চল সীমাবদ্ধ হতে পারে।",
    },
    {
      q: "APK ও AAB এর পার্থক্য কী?",
      a: "APK হলো Android ইনস্টল ফরম্যাট। AAB হলো Google Play প্রকাশ ফরম্যাট। অ্যাপ AAB হিসেবে থাকলেও আমরা উপযুক্ত APK দিই।",
    },
    {
      q: "কখনও কখনও 404 কেন?",
      a: "অ্যাপ অঞ্চল-লকড হতে পারে, Play থেকে সরানো হতে পারে বা ডিভাইসের সাথে মেলে না। অঞ্চল সীমায় VPN চেষ্টা করুন।",
    },
    {
      q: "Play থেকে APK ডাউনলোড কি আইনি?",
      a: "ব্যক্তিগত ব্যবহার, টেস্ট ও ব্যাকআপের জন্য সাধারণত হ্যাঁ। অনুমতি ছাড়া পেইড অ্যাপ বা কপিরাইটযুক্ত বিষয়বস্তু বিক্রি করা অবৈধ।",
    },
    {
      q: "gptoapk.com কি Google এর সাথে যুক্ত?",
      a: "না। এটি স্বাধীন টুল এবং Google বা Google Play এর সাথে সম্পর্কিত নয়।",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">প্রায়শই জিজ্ঞাস্য প্রশ্ন</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">gptoapk.com এবং Google Play থেকে APK ডাউনলোড সম্পর্কে জানতে হবে এমন সবকিছু।</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">{faq.a}</div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">আরও প্রশ্ন?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          চেষ্টা করুন{" "}
          <Link href="/bn" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          অথবা দেখুন{" "}
          <Link href="/bn/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">ব্লগ</Link>.
        </p>
      </div>
    </div>
  );
}
