import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "अक्सर पूछे जाने वाले प्रश्न - APK डाउनलोडर | gptoapk.com",
  description:
    "gptoapk.com का उपयोग करके Google Play स्टोर से APK डाउनलोड करने के बारे में अक्सर पूछे जाने वाले प्रश्न। यह कैसे काम करता है, सुरक्षा और समस्या निवारण।",
};

export default function HiFAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          अक्सर पूछे जाने वाले प्रश्न
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Google Play स्टोर से APK फ़ाइलें डाउनलोड करने के लिए gptoapk.com का उपयोग करने के बारे में सब कुछ जानें।
        </p>
      </div>

      <div className="space-y-6">
        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">gptoapk.com क्या है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            gptoapk.com एक मुफ़्त ऑनलाइन टूल है जो आपको Google Play स्टोर से सीधे APK डाउनलोड लिंक जनरेट करने देता है। बस Google Play URL या पैकेज नाम पेस्ट करें और तुरंत सीधा डाउनलोड लिंक प्राप्त करें।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या यह उपयोग करने के लिए मुफ़्त है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            हाँ, पूरी तरह से मुफ़्त। कोई रजिस्ट्रेशन नहीं, कोई छिपा शुल्क नहीं, कोई प्रीमियम प्लान नहीं।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">यह कैसे काम करता है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            जब आप Google Play लिंक पेस्ट करते हैं, तो हमारा सर्वर Google के CDN से सीधे APK फ़ाइल लाता है और आपको डाउनलोड लिंक देता है। हम फ़ाइलों को कभी संशोधित या संग्रहीत नहीं करते।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या gptoapk.com से APK डाउनलोड करना सुरक्षित है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            बिल्कुल। फ़ाइलें सीधे Google सर्वर से ली जाती हैं। हम कभी फ़ाइलों को छूते या संशोधित नहीं करते, इसलिए आपको 100% असली, सिग्नेचर वेरीफाई किए हुए APK मिलते हैं।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या मैं अपने फ़ोन पर APK डाउनलोड कर सकता हूँ?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            हाँ! बस अपने मोबाइल ब्राउज़र में gptoapk.com खोलें और लिंक पेस्ट करें। यह फ़ोन और कंप्यूटर दोनों पर काम करता है।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या यह पेड ऐप्स के लिए काम करता है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            हाँ, लेकिन वैध डाउनलोड लिंक जनरेट करने के लिए आपके Google खाते पर ऐप पहले से खरीदा हुआ होना चाहिए।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या मुझे कोई सॉफ़्टवेयर या ब्राउज़र एक्सटेंशन इंस्टॉल करना होगा?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            नहीं। gptoapk.com पूरी तरह से ब्राउज़र में चलता है। कोई डाउनलोड, एक्सटेंशन या प्लगइन ज़रूरी नहीं।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या मैं किसी भी देश से APK डाउनलोड कर सकता हूँ?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            हाँ, gptoapk.com दुनिया भर में काम करता है। हालाँकि, कुछ ऐप Google Play पर क्षेत्रीय रूप से प्रतिबंधित हो सकते हैं।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">APK और AAB में क्या अंतर है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            APK, Android के लिए इंस्टॉल करने योग्य पैकेज प्रारूप है। AAB (Android App Bundle) Google Play द्वारा उपयोग किया जाने वाला प्रकाशन प्रारूप है। gptoapk.com दोनों को संभालता है — जब कोई ऐप AAB के रूप में प्रकाशित होता है, तब भी हम संगत APK प्रदान करते हैं।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">कुछ ऐप्स पर मुझे 404 एरर क्यों मिलता है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            कुछ ऐप क्षेत्रीय रूप से लॉक हो सकते हैं, Google Play से हटा दिए गए हो सकते हैं, या विशिष्ट डिवाइस संगतता की आवश्यकता हो सकती है। यदि ऐप क्षेत्र-प्रतिबंधित है, तो VPN आज़माएँ।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या Google Play से APK डाउनलोड करना कानूनी है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            व्यक्तिगत उपयोग, ऐप परीक्षण और बैकअप के उद्देश्यों के लिए — बिल्कुल। बिना अनुमति के पेड ऐप्स या कॉपीराइट सामग्री को पुनर्वितरित करना गैरकानूनी है।
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">क्या gptoapk.com Google से संबद्ध है?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            नहीं। gptoapk.com एक स्वतंत्र टूल है और Google या Google Play से किसी भी रूप में संबद्ध नहीं है।
          </div>
        </details>
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">क्या अभी भी कोई प्रश्न हैं?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          हमारे <Link href="/hi" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK डाउनलोडर</Link> को आज़माएँ या विस्तृत गाइड के लिए हमारा <Link href="/hi/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">ब्लॉग</Link> देखें।
        </p>
      </div>
    </div>
  );
}
