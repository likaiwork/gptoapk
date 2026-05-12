import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
}

const msPosts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "Cara Muat Turun APK dari Google Play: Panduan Lengkap (2026)",
    description:
      "Panduan langkah demi langkah mengekstrak fail APK dari Google Play Store. Pelbagai kaedah — alat web, ADB, dan amalan terbaik muat turun selamat.",
    date: "2026-05-11",
    readTime: "6 minit bacaan",
    tags: ["Muat Turun APK", "Google Play", "Tutorial"],
    content: (
      <>
        <p>
          Ingin memuat turun fail APK dari Google Play Store tetapi tidak tahu di mana hendak bermula? Sama ada anda pembangun Android yang perlu menguji binaan, ingin menyimpan versi lama apl, atau hanya perlu APK untuk pemasangan luar talian — anda berada di tempat yang betul.
        </p>

        <h2>Apakah Fail APK?</h2>
        <p>
          APK (Android Package Kit) ialah format fail standard yang digunakan oleh sistem Android untuk mengedarkan dan memasang apl. Apabila anda memuat turun apl dari Google Play Store, sistem secara automatik memuat turun dan memasang APK. Tetapi kadang-kadang kita perlu mendapatkan fail APK asal secara terus — di sinilah alat muat turun APK Google Play diperlukan.
        </p>

        <h2>Kenapa Muat Turun APK dari Google Play?</h2>
        <ul>
          <li><strong>Ujian dan Nyahpepijat Apl</strong> — Pembangun perlu menguji APK pada pelbagai peranti</li>
          <li><strong>Pemasangan Luar Talian</strong> — Kongsi dan pasang apl tanpa sambungan internet</li>
          <li><strong>Kembali ke Versi Lama</strong> — Simpan versi lama sekiranya versi baru bermasalah</li>
          <li><strong>Sideloading</strong> — Pasang apl pada peranti tanpa perkhidmatan Google Play</li>
          <li><strong>Pemeriksaan Keselamatan</strong> — Penyelidik keselamatan menganalisis struktur APK</li>
        </ul>

        <h2>Kaedah 1: Gunakan gptoapk.com (Paling Mudah)</h2>
        <p>
          Cara terpantas adalah menggunakan alat pengekstrak APK dalam talian seperti <a href="https://gptoapk.com">gptoapk.com</a>. Langkah-langkahnya:
        </p>
        <ol>
          <li>Buka Google Play Store dan cari apl yang anda mahu</li>
          <li>Salin pautan ke halaman butiran apl (contohnya <code>https://play.google.com/store/apps/details?id=com.example.app</code>)</li>
          <li>Atau salin terus nama pakej (contohnya <code>com.example.app</code>)</li>
          <li>Tampal pautan ke dalam kotak input di <a href="https://gptoapk.com">gptoapk.com</a></li>
          <li>Klik butang "Hasilkan Pautan"</li>
          <li>Pautan muat turun APK dihasilkan serta-merta — klik dan muat turun</li>
        </ol>
        <p><strong>Tiada pendaftaran, tiada captcha, percuma sepenuhnya.</strong></p>

        <h2>Kaedah 2: Gunakan ADB (Untuk Pembangun)</h2>
        <p>Jika anda mempunyai peranti yang di-root atau emulator, anda boleh mengekstrak APK melalui ADB:</p>
        <pre><code>{`// 1. Periksa peranti yang disambungkan
adb devices

// 2. Cari nama pakej apl tertentu
adb shell pm list packages | grep [nama apl]

// 3. Cari laluan APK
adb shell pm path [nama pakej]

// 4. Tarik fail APK
adb pull [laluan yang diperolehi di atas]`}</code></pre>

        <h2>Kaedah 3: Tapak Cermin APK Pihak Ketiga</h2>
        <p>
          Tapak seperti APKMirror dan APKPure menawarkan muat turun APK, tetapi ia bergantung pada fail yang dimuat naik pengguna. <a href="https://gptoapk.com">gptoapk.com</a> mendapatkan fail terus dari pelayan Google, memastikan anda sentiasa mendapat versi asal.
        </p>

        <h2>Adakah Muat Turun APK Dalam Talian Selamat?</h2>
        <p><strong>Menggunakan gptoapk.com adalah selamat sepenuhnya.</strong> Sebabnya:</p>
        <ul>
          <li>Fail datang <strong>terus dari CDN Google</strong> — tiada perantara</li>
          <li>100% fail asal dengan tandatangan yang disahkan</li>
          <li>Tiada fail disimpan pada pelayan kami</li>
          <li>Mustahil untuk menyuntik kod berbahaya — kami tidak pernah menyentuh fail</li>
        </ul>

        <h2>Tip Pemasangan APK Selamat</h2>
        <ol>
          <li>Dayakan "Benarkan pemasangan dari sumber tidak dikenali" dalam tetapan</li>
          <li>Periksa kebenaran yang diminta apl sebelum memasang — adakah munasabah?</li>
          <li>Jika boleh, bandingkan hash SHA-256 untuk mengesahkan integriti fail</li>
          <li>Gunakan hanya alat muat turun APK yang dipercayai, elakkan tapak yang tidak diketahui</li>
        </ol>

        <h2>Soalan Lazim</h2>
        <p><strong>Adakah muat turun APK percuma?</strong><br/>Ya, <a href="https://gptoapk.com">gptoapk.com</a> percuma sepenuhnya.</p>
        <p><strong>Bolehkah apl berbayar juga dimuat turun?</strong><br/>Ya, tetapi apl tersebut mesti sudah dibeli dalam akaun Google anda.</p>
        <p><strong>Adakah ia berfungsi di telefon bimbit?</strong><br/>Semestinya. Buka <a href="https://gptoapk.com">gptoapk.com</a> dalam pelayar telefon, tampal pautan dan muat turun.</p>
        <p><strong>Adakah muat turun APK dari Google Play sah?</strong><br/>Penggunaan peribadi dan pembangunan apl adalah sah sepenuhnya. Tetapi mengedarkan semula apl berbayar adalah tidak sah.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Muat Turun APK Sekarang</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — Tampal pautan Google Play, dapatkan APK dalam beberapa saat.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Pergi ke Muat Turun APK
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "what-is-an-apk-file",
    title: "Apakah Fail APK? Panduan Lengkap Fail Pakej Android",
    description:
      "Semua yang anda perlu tahu tentang fail APK — apa yang ada di dalamnya, bagaimana ia berfungsi, perbezaan APK vs AAB, dan mengapa integriti fail penting untuk keselamatan.",
    date: "2026-05-11",
    readTime: "7 minit bacaan",
    tags: ["APK", "Android", "Panduan Pemula"],
    content: (
      <>
        <p>
          Pernahkah anda terfikir apa yang sebenarnya ada di dalam fail APK? Mari kita bongkar rahsia pakej pemasangan Android bersama-sama.
        </p>

        <h2>Satu Analogi Mudah</h2>
        <p>
          Bayangkan apl Android sebagai sebuah buku. Google Play Store ialah perpustakaan, fail APK ialah salinan digital penuh buku itu, dan memasangnya pada telefon anda seperti menyimpan buku dalam peranti anda. Segala yang diperlukan untuk menjalankan apl dibungkus dalam satu fail APK.
        </p>

        <h2>Apa yang Ada di Dalam Fail APK?</h2>
        <p>Jika anda menukar nama APK kepada <code>.zip</code> dan nyahzip, anda akan melihat fail-fail berikut:</p>
        <pre><code>{`app.apk/
├── AndroidManifest.xml    # Identiti apl (kebenaran, komponen)
├── classes.dex            # Kod Java/Kotlin yang dikompil
├── res/                   # Sumber (imej, susun atur, rentetan)
├── assets/                # Sumber mentah (fon, bunyi, pangkalan data)
├── lib/                   # Pustaka natif (kod C/C++)
│   ├── arm64-v8a/
│   ├── armeabi-v7a/
│   └── x86_64/
├── META-INF/              # Tandatangan digital (pengesahan integriti)
└── resources.arsc         # Indeks sumber yang dikompil`}</code></pre>

        <h2>Perbezaan APK vs AAB</h2>
        <p>
          Sejak 2021, Google Play Store mewajibkan apl baharu menggunakan format AAB (Android App Bundle) untuk penerbitan. AAB ialah format penerbitan — Google Play menjana APK yang dioptimumkan mengikut peranti anda. Apabila anda menggunakan alat seperti <a href="https://gptoapk.com">gptoapk.com</a>, Google Play mencipta APK yang serasi daripada AAB secara serta-merta.
        </p>

        <h2>Kenapa Integriti APK Penting</h2>
        <p>
          Setiap fail APK mempunyai tandatangan yang disulitkan dalam folder <code>META-INF</code>. Tandatangan ini membuktikan fail tidak diusik. Inilah sebabnya penting untuk menggunakan alat yang mendapatkan fail terus dari Google, seperti <a href="https://gptoapk.com">gptoapk.com</a> — rantaian tandatangan kekal utuh.
        </p>

        <h2>Kegunaan Sah Fail APK</h2>
        <ul>
          <li>Membuat sandaran apl kegemaran anda</li>
          <li>Menguji versi berbeza semasa pembangunan</li>
          <li>Memasang apl pada peranti tanpa Google Play</li>
          <li>Berkongsi apl dengan rakan yang tiada akses ke Play Store</li>
        </ul>

        <h2>Adakah Semua Fail APK Selamat?</h2>
        <p>
          Tidak. APK yang dimuat turun dari tapak pihak ketiga mungkin mengandungi perisian hasad atau penjejak. Sentiasa gunakan sumber yang mendapatkan APK asli dan ditandatangan terus dari CDN Google. <a href="https://gptoapk.com">gptoapk.com</a> memastikan anda mendapat apa yang Google Play akan pasang — tanpa sebarang perubahan.
        </p>

        <h2>Soalan Lazim Mengenai Fail APK</h2>
        <p><strong>Bolehkah saya menukar APK kepada .zip?</strong><br/>Ya, hanya tukar sambungan — tetapi ia tidak akan boleh dipasang. Gunakan kaedah ini hanya untuk melihat kandungan.</p>
        <p><strong>Adakah semua APK berfungsi pada semua peranti Android?</strong><br/>Tidak semestinya. APK mesti serasi dengan seni bina peranti (ARM, x86) dan versi Android.</p>
        <p><strong>Apa perbezaan APK dan XAPK?</strong><br/>XAPK ialah format lanjutan yang merangkumi data OBB tambahan (biasanya untuk permainan). <a href="https://gptoapk.com">gptoapk.com</a> menyediakan APK standard yang boleh dipasang terus.</p>
        <p><strong>Bolehkah saya melihat kod sumber apl daripada APK?</strong><br/>Anda boleh menyahkompil <code>classes.dex</code>, tetapi ia tidak akan sama dengan kod sumber asal — kebanyakan kod diobfuskat.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Muat Turun APK Sekarang</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — Tampal pautan Google Play, dapatkan APK dalam beberapa saat.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Pergi ke Muat Turun APK
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "safe-reliable-apk-download-sites",
    title: "Tapak Muat Turun APK Selamat: Sumber Paling Boleh Dipercayai (2026)",
    description:
      "Panduan ke laman web muat turun APK terbaik. gptoapk.com, APKMirror, APKPure, F-Droid, GitHub Releases — termasuk petua pengesahan fail.",
    date: "2026-05-11",
    readTime: "8 minit bacaan",
    tags: ["APK Selamat", "Muat Turun APK", "Keselamatan"],
    content: (
      <>
        <p>
          Memuat turun fail APK dari sumber tidak rasmi boleh berbahaya — perisian hasad, penjejak,
          dan pengubahsuaian kod berniat jahat hanyalah sebahagian daripada risikonya. Dalam panduan ini
          kami kaji sumber paling selamat untuk memuat turun APK.
        </p>

        <h2>Kenapa Perlukan Sumber Boleh Dipercayai?</h2>
        <p>
          Google Play adalah kedai rasmi Android, tetapi kadang-kadang ia bukan pilihan terbaik:
        </p>
        <ul>
          <li><strong>Google Play tidak tersedia</strong> — pada peranti China atau tanpa perkhidmatan Google</li>
          <li><strong>Kembali ke versi lama</strong> — versi baru mungkin ada pepijat atau perubahan tidak diingini</li>
          <li><strong>Ketidakserasian peranti</strong> — Google Play mungkin menyekat pemasangan walaupun apl berfungsi</li>
          <li><strong>Sandaran APK</strong> — menyimpan apl kegemaran secara setempat</li>
        </ul>

        <h2>1. gptoapk.com — Pilihan Paling Selamat</h2>
        <p>
          <a href="https://gptoapk.com">gptoapk.com</a> adalah perkhidmatan muat turun APK paling selamat.
          Sebabnya mudah: ia menarik fail APK terus dari CDN Google Play Store, tanpa mengubahnya dalam
          apa cara sekalipun. Setiap fail datang dengan tandatangan digital asal pembangun, menjamin
          anda memasang tepat apa yang akan dipasang oleh Google Play.
        </p>
        <p>
          Kelebihan: tanpa pendaftaran, tanpa CAPTCHA, menyokong semua apl awam, dan yang paling
          penting — fail 100% asli.
        </p>

        <h2>2. APKMirror</h2>
        <p>
          APKMirror adalah antara laman web muat turun APK tertua dan paling dipercayai. Milik
          UpToDown, ia memeriksa setiap fail melalui tandatangan digital — hanya fail dengan
          tandatangan sepadan diterbitkan. Laman ini menawarkan pelbagai versi apl yang sama.
        </p>

        <h2>3. APKPure</h2>
        <p>
          APKPure adalah kedai APK pihak ketiga yang terkenal. Ia menawarkan pelbagai apl dan
          permainan, termasuk versi lama. Perlu diketahui bahawa APKPure tidak mengambil fail
          terus dari Google — ia menyimpannya di pelayannya sendiri, jadi tahap kepercayaan lebih
          rendah berbanding gptoapk.com.
        </p>

        <h2>4. F-Droid</h2>
        <p>
          F-Droid adalah repositori apl sumber terbuka. Semua apl di sini percuma dan kod sumber
          tersedia untuk umum. Sumber yang bagus untuk apl yang mementingkan privasi, tetapi anda
          tidak akan menemui apl komersial seperti WhatsApp atau TikTok.
        </p>

        <h2>5. GitHub Releases</h2>
        <p>
          Ramai pembangun menerbitkan fail APK mereka terus di GitHub Releases. Ini adalah sumber
          paling selamat kerana fail datang terus dari pembangun. Cari projek sumber terbuka seperti
          NewPipe, Signal atau Nextcloud.
        </p>

        <h2>Cara Memastikan APK Selamat?</h2>
        <p>Walaupun dari sumber dipercayai, elok periksa fail sebelum pemasangan:</p>
        <ol>
          <li><strong>Pengesahan tandatangan digital</strong> — Gunakan arahan ini:
            <pre><code>
keytool -printcert -jarfile app.apk</code></pre>
          </li>
          <li><strong>Imbasan VirusTotal</strong> — Muat naik fail ke <a href="https://virustotal.com">VirusTotal.com</a> untuk diperiksa oleh puluhan enjin antivirus</li>
          <li><strong>Semak kebenaran</strong> — Sebelum pemasangan, periksa kebenaran yang diminta. Lampu suluh tidak perlukan akses kepada kenalan</li>
          <li><strong>Perbandingan SHA</strong> — Jika pembangun menerbitkan hash pengesahan, bandingkan dengan hash fail</li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Muat Turun APK Selamat</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — cara paling selamat muat turun APK terus dari Google Play.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Muat Turun APK
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
  {
    slug: "apk-vs-aab-complete-comparison",
    title: "APK vs AAB: Perbandingan Lengkap (2026)",
    description:
      "Apa bezanya APK dan AAB? Panduan komprehensif yang menerangkan struktur, kelebihan dan kekurangan setiap format — dan kesannya kepada pengguna.",
    date: "2026-05-11",
    readTime: "8 minit bacaan",
    tags: ["APK", "AAB", "Perbandingan"],
    content: (
      <>
        <p>
          Sejak 2021, Google Play Store mewajibkan pembangun untuk menerbitkan apl dalam format AAB
          (Android App Bundle). Tapi apa maksudnya untuk pengguna biasa? Mari lihat perbezaan antara
          APK dan AAB.
        </p>

        <h2>Apa Itu Fail APK?</h2>
        <p>
          APK (Android Package Kit) adalah format pengedaran tradisional Android. Ia mengandungi
          segala yang diperlukan apl untuk berfungsi. Struktur fail APK tipikal:
        </p>
        <pre><code>{`app.apk/
├── AndroidManifest.xml    // Identiti apl (nama pakej, kebenaran, komponen)
├── classes.dex            // Kod Java/Kotlin yang dikompil
├── res/                   // Sumber (imej, susun atur, terjemahan)
├── lib/                   // Pustaka natif (C/C++ dioptimumkan untuk seni bina)
│   ├── arm64-v8a/
│   ├── armeabi-v7a/
│   └── x86_64/
├── META-INF/              // Maklumat tandatangan digital
└── resources.arsc         // Indeks sumber dikompil`}</code></pre>

        <h2>Apa Itu Fail AAB?</h2>
        <p>
          AAB (Android App Bundle) adalah format penerbitan yang diperkenalkan oleh Google. Ia tidak
          boleh dipasang terus — sebaliknya, Google Play menggunakannya untuk mencipta APK
          tersuai untuk setiap peranti. AAB mengandungi semua sumber apl, dan Google Play memilih
          hanya apa yang diperlukan oleh peranti tertentu.
        </p>

        <h2>Perbandingan APK vs AAB</h2>
        <ul>
          <li><strong>Pemasangan terus</strong> — APK boleh dipasang terus; AAB mesti melalui Google Play</li>
          <li><strong>Saiz fail</strong> — APK mengandungi sumber untuk semua peranti (lebih besar); AAB cipta APK fokus (lebih kecil)</li>
          <li><strong>Perkongsian</strong> — APK mudah dikongsi; AAB tidak boleh dikongsi terus dengan pengguna lain</li>
          <li><strong>Keserasian pihak ketiga</strong> — APK berfungsi di mana-mana; AAB bergantung pada Google Play</li>
        </ul>

        <h2>Bagaimana Ia Mempengaruhi Anda?</h2>
        <p>
          Bagi pengguna biasa, perbezaan utama adalah saiz fail. AAB menghasilkan APK lebih kecil
          kerana ia hanya memasukkan apa yang diperlukan peranti anda. Tapi jika anda memuat turun
          dari sumber pihak ketiga, anda masih perlukan APK — AAB tidak akan berfungsi.
        </p>
        <p>
          Perkhidmatan seperti <a href="https://gptoapk.com">gptoapk.com</a> menukarkan AAB
          kepada APK yang serasi untuk anda, supaya anda sentiasa dapat fail yang boleh digunakan.
        </p>

        <h2>Tukar AAB ke APK dengan bundletool</h2>
        <p>
          Untuk pembangun, AAB boleh ditukar ke APK menggunakan alat rasmi bundletool:
        </p>
        <pre><code>
java -jar bundletool.jar build-apks --bundle=/path/app.aab --output=/path/app.apks

// Ekstrak APK dari arkib
unzip /path/app.apks -d /path/apk_output/</code></pre>

        <h2>Soalan Lazim</h2>
        <p><strong>Boleh AAB dipasang terus di telefon?</strong><br/>Tidak. AAB adalah format penerbitan, bukan format pemasangan. Ia mesti ditukar ke APK terlebih dahulu.</p>
        <p><strong>Adakah APK akan hilang?</strong><br/>Tidak sepenuhnya. Google Play masih menjana APK tersuai dari AAB. APK akan kekal sebagai format untuk pemasangan tempatan dan perkongsian.</p>
        <p><strong>Boleh APK ditukar ke AAB?</strong><br/>Tidak mudah. AAB memerlukan kod sumber dan Android Studio. Disyorkan untuk menyimpan kedua-dua AAB dan APK.</p>
        <p><strong>Bagaimana dengan keselamatan?</strong><br/>Kedua-dua APK dan AAB menggunakan sistem tandatangan digital yang sama. Kedua-duanya selamat jika datang dari sumber dipercayai.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Muat Turun APK dari gptoapk.com</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — tampal pautan Google Play dan terima APK dalam beberapa saat.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Muat Turun APK
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </>
    ),
  },
];

export async function generateStaticParams() {
  return msPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = msPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | gptoapk.com`,
    description: post.description,
    alternates: {
      canonical: `https://gptoapk.com/ms/blog/${slug}`,
      languages: {
        en: `https://gptoapk.com/en/blog/${slug}`,
        "x-default": `https://gptoapk.com/en/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = msPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "gptoapk.com",
    },
    url: `https://gptoapk.com/ms/blog/${slug}`,
    inLanguage: "ms",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/ms/blog/${slug}`,
    },
  };

  return (
    <>
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/ms/blog"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Senarai Blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none blog-content">
          {post.content}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/ms/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Kembali ke Senarai Blog
          </Link>
        </div>
      </article>
    </>
  );
}
