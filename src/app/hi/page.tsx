import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function HiHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK डाउनलोडर
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"ऐप नाम से खोजें, Google Play लिंक पेस्ट करें या पैकेज नाम दर्ज करें, फिर ऐप ढूंढकर APK डाउनलोड लिंक बनाएं।"}
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
          <h3 className="text-xl font-bold mb-3">तेज़ डाउनलोड</h3>
          <p className="text-slate-600 dark:text-slate-400">कोई इंतज़ार नहीं, कोई कैप्चा नहीं — कुछ ही सेकंड में सीधा डाउनलोड लिंक तैयार।</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">सुरक्षित और भरोसेमंद</h3>
          <p className="text-slate-600 dark:text-slate-400">फ़ाइलें सीधे Google सर्वर से ली जाती हैं। कोई बदलाव नहीं — 100% असली APK।</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">रजिस्ट्रेशन की ज़रूरत नहीं</h3>
          <p className="text-slate-600 dark:text-slate-400">पूरी तरह मुफ़्त — खाता बनाने या एक्सटेंशन इंस्टॉल करने की कोई ज़रूरत नहीं।</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Google Play से APK कैसे डाउनलोड करें</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Google Play लिंक कॉपी करें</h3>
              <p className="text-slate-600 dark:text-slate-400">Google Play स्टोर पर ऐप ढूंढें और एड्रेस बार से उसका URL कॉपी करें।</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">पेस्ट करें और जनरेट करें</h3>
              <p className="text-slate-600 dark:text-slate-400">ऊपर इनपुट बॉक्स में लिंक पेस्ट करें और जनरेट लिंक बटन पर क्लिक करें।</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">अपना APK डाउनलोड करें</h3>
              <p className="text-slate-600 dark:text-slate-400">डाउनलोड लिंक पर क्लिक करके APK फ़ाइल सेव करें और अपने Android डिवाइस पर इंस्टॉल करें।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">gptoapk.com को क्यों चुनें?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">सीधे Google से</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">फ़ाइलें सीधे Google सर्वर से आती हैं</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">कोई अपलोड नहीं</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">फ़ाइलें सर्वर से गुजरती हैं लेकिन कभी संग्रहीत नहीं होतीं</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% मुफ़्त</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">कोई छिपा हुआ शुल्क या प्रीमियम प्लान नहीं</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">रजिस्ट्रेशन ज़रूरी नहीं</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">अभी डाउनलोड करना शुरू करें</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">APK डाउनलोड गाइड और टिप्स</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          APK फ़ाइलों, इंस्टॉलेशन और Google Play से APK निकालने के बेहतरीन टूल के बारे में और जानें।
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/hi/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Google Play से APK डाउनलोड कैसे करें: पूरी गाइड</h3>
            <p className="text-sm text-slate-500 mt-2">वेब टूल, ADB और सर्वोत्तम तरीकों को कवर करने वाला पूरा गाइड।</p>
          </Link>
          <Link href="/hi/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">APK फ़ाइल क्या है?</h3>
            <p className="text-sm text-slate-500 mt-2">Android इंस्टॉलेशन पैकेज फ़ाइलों के बारे में सब कुछ जानें।</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/hi/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            सभी लेख देखें →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">अक्सर पूछे जाने वाले प्रश्न</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Google Play से APK कैसे डाउनलोड करें?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">बस इस पृष्ठ पर Google Play लिंक पेस्ट करें और जनरेट लिंक पर क्लिक करें। आपका APK डाउनलोड कुछ ही सेकंड में तैयार हो जाएगा।</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">क्या APK फ़ाइलें डाउनलोड करना सुरक्षित है?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">हाँ। हमारा टूल फ़ाइलें सीधे Google सर्वर से लाता है। APK 100% असली और बिना बदलाव के होते हैं।</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">क्या मुझे कुछ इंस्टॉल करना होगा?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">नहीं। gptoapk.com पूरी तरह से ब्राउज़र में काम करता है, कोई एक्सटेंशन या सॉफ़्टवेयर ज़रूरी नहीं।</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/hi/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            सभी FAQ देखें →
          </Link>
        </div>
      </div>
    </div>
  );
}
