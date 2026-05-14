import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Google Play Çalışmıyor mu? APK İndirmenin 5 Yolu",
  description:
    "Google Play çalışmıyor mu? Google Play olmadan APK indirme ve kurma rehberi.",
};

export default function GooglePlayNotWorkingPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/tr" className="hover:underline">Ana Sayfa</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Google Play Çalışmıyor</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Google Play Çalışmıyor mu? APK İndirmenin 5 Yolu
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Türkiye'de Google Play bazen çalışmayabilir — uygulamalar kaldırılmış, bölge kısıtlamaları
        uygulanmış veya hesap sorunları yaşanıyor olabilir. Neyse ki, Google Play olmadan APK
        indirmenin birçok yolu var. İşte en etkili 5 yöntem:
      </p>

      <div className="space-y-8 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">1. gptoapk.com Kullanın</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            gptoapk.com, herhangi bir uygulamanın APK'sını bulmanın en hızlı yoludur. Arama
            çubuğuna uygulama adını yazmanız yeterli — kayıt gerektirmez, ücretsizdir ve
            güvenlidir. Tüm APK dosyaları virüs taramasından geçirilir.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">2. Resmi Web Sitelerinden İndirin</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            WhatsApp ve Telegram gibi birçok popüler uygulama, kendi web sitelerinde doğrudan
            APK indirme bağlantısı sunar. Uygulamanın resmi web sitesini ziyaret ederek en
            güncel sürümü indirebilirsiniz.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">3. APK Arşiv Sitelerini Kullanın</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            APKMirror ve APKPure gibi güvenilir arşiv siteleri, eski ve yeni APK sürümlerini
            barındırır. Türkiye'den erişilebilirler ve çoğu uygulamanın farklı sürümlerini
            sunarlar. Ancak her zaman güvenilir kaynakları tercih edin.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">4. APK'yı Başka Bir Cihazdan Aktarın</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Bir arkadaşınızın cihazında uygulama yüklüyse, bir APK çıkarıcı uygulama kullanarak
            APK dosyasını alabilir ve Bluetooth veya dosya paylaşımı ile kendi cihazınıza
            aktarabilirsiniz.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold mb-3">5. Huawei AppGallery veya Samsung Galaxy Store'u Deneyin</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Huawei kullanıcıları AppGallery'den, Samsung kullanıcıları Galaxy Store'dan
            uygulama indirebilir. Bu alternatif mağazalar, Google Play'de olmayan uygulamaları
            da içerebilir. Özellikle Huawei cihazlarda AppGallery en iyi alternatiftir.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Google Play Neden Çalışmıyor?</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
        Türkiye'de Google Play'in çalışmamasının birkaç yaygın nedeni vardır: Google hesabı
        sorunları, bölgesel kısıtlamalar (örneğin bazı uygulamalar Türkiye'de kullanılamayabilir),
        cihaz uyumluluk sorunları, önbellek sorunları veya Google Play Hizmetleri'nin güncel
        olmaması. APK yükleme tüm bu durumlarda işe yarayan evrensel bir çözümdür.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Sıkça Sorulan Sorular (SSS)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Google Play hata veriyor, ne yapmalıyım?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Önce önbelleği temizleyin: Ayarlar → Uygulamalar → Google Play → Önbelleği temizle. Sorun devam ederse APK yükleme yöntemini kullanın.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">APK yüklemek güvenli mi?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Güvenilir kaynaklardan (gptoapk.com gibi) indirilen APK'lar güvenlidir. Bilinmeyen kaynaklardan kaçının ve dosyaları virüs taramasından geçirin.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Google Play Türkiye'de neden bazı uygulamaları kaldırdı?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Google, bölgesel düzenlemeler ve lisans anlaşmaları nedeniyle bazı uygulamaları Türkiye'de kullanımdan kaldırabilir. APK yükleme bu kısıtlamaları aşmanın en kolay yoludur.</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">APK'nın en son sürümüne mi ihtiyacınız var?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — herhangi bir APK'yı indirmenin hızlı ve güvenli yolu. Arama çubuğuna uygulama adını girin.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Şimdi Ara →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    </div>
  );
}
