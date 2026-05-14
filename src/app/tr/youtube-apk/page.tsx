import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "YouTube APK İndir Android için (Türkiye)",
  description:
    "YouTube APK'nın en son sürümünü indirin. Huawei, Xiaomi ve Samsung'da kurulum rehberi.",
};

export default function YouTubeApkPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/tr" className="hover:underline">Ana Sayfa</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">YouTube APK</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        YouTube APK İndir Android için (Türkiye)
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        YouTube, dünyanın en büyük video paylaşım platformudur. Türkiye'de her gün milyonlarca
        kişi tarafından kullanılan YouTube, video izleme, müzik dinleme ve içerik üretme imkanı sunar.
        Huawei, Xiaomi ve Samsung gibi cihazlarda YouTube APK'yı nasıl kuracağınızı anlatıyoruz.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">YouTube APK — En Son Sürüm</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Parametre</th>
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Değer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">En Son Sürüm</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">19.28.36</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Güncelleme Tarihi</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Mayıs 2026</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">APK Boyutu</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">~70 MB</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Android Gereksinimi</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Android 6.0+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">YouTube APK Nasıl İndirilir</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>gptoapk.com adresine gidin</strong>.</li>
        <li><strong>&quot;YouTube&quot; araması yapın</strong>.</li>
        <li><strong>En son sürümü seçip indirin</strong>.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Huawei, Xiaomi ve Samsung'da Kurulum</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Huawei Cihazlar</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Huawei cihazlarda Google Play bulunmadığı için APK yükleme en pratik yöntemdir. Ayarlar → Güvenlik → Bilinmeyen kaynaklar yolunu izleyin ve APK'yı yükleyin.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Xiaomi Cihazlar</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Xiaomi'de Güvenlik uygulamasından &quot;Bilinmeyen kaynaklar&quot; iznini etkinleştirin. MIUI sürümüne bağlı olarak ekstra izin gerekebilir.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Samsung Cihazlar</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Samsung One UI'da Ayarlar → Biyometri ve güvenlik → Bilinmeyen uygulamaları yükle yolunu izleyin.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">YouTube'un Özellikleri</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li>Sınırsız video izleme</li>
        <li>YouTube Music entegrasyonu</li>
        <li>Canlı yayın desteği</li>
        <li>Altyazı ve çeviri seçenekleri</li>
        <li>4K video oynatma</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Sıkça Sorulan Sorular (SSS)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">YouTube APK Huawei'de çalışır mı?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Evet, YouTube APK Huawei cihazlarda sorunsuz çalışır. Google Mobil Hizmetleri (GMS) olmadan da kullanılabilir.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">YouTube APK reklamsız mı?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Hayır, standart YouTube APK'sı reklam içerir. Reklamsız deneyim için YouTube Premium aboneliği gereklidir.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">YouTube APK güncellemelerini nasıl alırım?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">En son YouTube APK sürümü için gptoapk.com'u düzenli olarak ziyaret edebilirsiniz.</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">APK'nın en son sürümüne mi ihtiyacınız var?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — herhangi bir APK'yı indirmenin hızlı ve güvenli yolu. Arama çubuğuna uygulama adını girin.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Şimdi Ara →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    {/* Schema.org JSON-LD */}
      <Script
        id="schema-tech-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "YouTube APK İndir Android için (Türkiye)",
            "description": "YouTube APK&#039;nın en son sürümünü indirin. Huawei, Xiaomi ve Samsung&#039;da kurulum rehberi.",
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
              "@id": "https://gptoapk.com/tr/youtube-apk"
            },
            "inLanguage": "tr"
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
                "item": "https://gptoapk.com/tr"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "YouTube APK",
                "item": "https://gptoapk.com/tr/youtube-apk"
              }
            ]
          })
        }}
      />

    
    </div>
  );
}
