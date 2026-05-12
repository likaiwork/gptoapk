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

const posts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "APK Letöltése a Google Play Áruházból: Teljes Útmutató (2026)",
    description:
      "Lépésről lépésre útmutató APK fájlok kinyeréséhez a Google Play Áruházból. Tanulja meg a gptoapk.com használatát, ADB parancsokat haladóknak és biztonsági tippeket APK letöltéshez. Root nélkül.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["APK Letöltés", "Google Play", "Útmutató"],
    content: (
      <>
        <p>
          APK fájl letöltése a Google Play Áruházból számos okból lehet hasznos: el szeretné menteni egy
          alkalmazás egy adott verzióját, telepíteni szeretné egy Google Play nélküli eszközre, vagy
          egyszerűen csak biztonsági másolatot szeretne készíteni. Ebben az útmutatóban bemutatjuk a
          leghatékonyabb módszereket az APK kinyerésére a Google Play Áruházból.
        </p>

        <h2>1. módszer: Használja a gptoapk.com-ot (A legegyszerűbb)</h2>
        <p>
          A leggyorsabb módszer nem igényel telepítést. Csak látogasson el a{" "}
          <a href="https://gptoapk.com">gptoapk.com</a> oldalra, és illessze be a kívánt alkalmazás
          Google Play-linkjét.
        </p>
        <ol>
          <li>
            Nyissa meg a Google Play Áruházat a telefonján vagy böngészőjében, keresse meg az
            alkalmazást és másolja ki az URL-t (pl.{" "}
            <code>https://play.google.com/store/apps/details?id=com.example.app</code>).
          </li>
          <li>
            Látogasson el a <a href="https://gptoapk.com">gptoapk.com</a> oldalra, és illessze be a
            linket a keresőmezőbe.
          </li>
          <li>Kattintson a letöltés gombra, és várjon néhány másodpercet.</li>
          <li>Töltse le az APK fájlt közvetlenül az eszközére.</li>
        </ol>
        <p>
          Ez a módszer bármely nyilvános Google Play Áruházbeli alkalmazással működik, és teljesen
          ingyenes. Nincs szükség regisztrációra vagy további szoftver telepítésére.
        </p>

        <h2>2. módszer: Használja az ADB-t (Fejlesztőknek)</h2>
        <p>
          Ha fejlesztő vagy haladó felhasználó, az APK-t az Android Debug Bridge (ADB) segítségével is
          kinyerheti. Ez a módszer számítógépet és az USB hibakeresés (USB debugging) engedélyezését
          igényli a telefonon.
        </p>
        <pre><code>{`// 1. Ellenőrizze, hogy az eszköz csatlakoztatva van-e
adb devices

// 2. Listázza az összes telepített alkalmazást (keresse meg a kívánt csomagot)
adb shell pm list packages | grep alkalmazasnev

// 3. Szerezze meg az APK elérési útját
adb shell pm path com.example.app

// 4. Töltse le az APK-t a számítógépre
adb pull /data/app/com.example.app-xxx/base.apk`}</code></pre>
        <p>
          A kinyerés után megoszthatja az APK-t, telepítheti más eszközökre, vagy elmentheti
          biztonsági másolatként. Ez a módszer root hozzáférés nélkül működik, és teljes
          irányítást ad a fájl felett.
        </p>

        <h2>3. módszer: Harmadik féltől származó alkalmazások (APK Extractor)</h2>
        <p>
          Ha inkább közvetlenül a telefonról szeretne megoldást számítógép nélkül, használhat olyan
          alkalmazásokat, mint az APK Extractor vagy az ML Manager, amelyek elérhetők a Play
          Áruházban. Ezek az alkalmazások automatikusan felismerik az összes telepített alkalmazást,
          és egyetlen érintéssel lehetővé teszik az APK-k exportálását.
        </p>
        <ul>
          <li>
            <strong>APK Extractor:</strong> Egyszerű és könnyű. Válassza ki az alkalmazást, és nyomja
            meg a &quot;Kinyerés&quot; gombot.
          </li>
          <li>
            <strong>ML Manager:</strong> Biztonsági mentés kezelést és Wi-Fi Direct megosztást is kínál.
          </li>
        </ul>

        <h2>Biztonsági tippek</h2>
        <p>
          Mindig legyen óvatos, amikor APK-t tölt le nem hivatalos forrásokból. Javasoljuk:
        </p>
        <ul>
          <li>Csak megbízható forrásokból töltsön le, mint a <a href="https://gptoapk.com">gptoapk.com</a>.</li>
          <li>Mindig ellenőrizze az APK digitális aláírását telepítés előtt.</li>
          <li>Hasonlítsa össze az SHA-256 hash-t a hivatalos értékkel, ha elérhető.</li>
          <li>Ne engedélyezze a telepítést ismeretlen forrásból olyan alkalmazásoknál, amelyekben nem bízik.</li>
        </ul>

        <h2>Gyakran ismételt kérdések (GYIK)</h2>
        <p><strong>Legális APK-t letölteni a Google Play Áruházból?</strong><br/>
        Igen, az ingyenes alkalmazások APK-jának letöltése személyes használatra legális. Fizetős alkalmazások esetén rendelkeznie kell a vásárlással. Az APK kinyerése személyes biztonsági mentéshez megengedett a Google feltételei szerint.</p>
        <p><strong>Szükségem van root hozzáférésre?</strong><br/>
        Nem. Az itt leírt összes módszer root nélkül működik. Az APK kinyerése nem igényel rendszergazdai jogosultságokat az eszközön.</p>
        <p><strong>Miért nem települnek egyes APK-k?</strong><br/>
        Lehet, hogy engedélyeznie kell a telepítést ismeretlen forrásból az eszköz beállításaiban. Lépjen a Beállítások &gt; Biztonság &gt; Telepítés ismeretlen forrásból menüpontba, és kapcsolja be. Android 8+ esetén ez a beállítás alkalmazásonként külön-külön állítható be.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Próbálja ki a gptoapk.com-ot 🚀</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — A leggyorsabb eszköz APK letöltéséhez a Google Play Áruházból. Illessze be a linket,
            töltse le az APK-t egy kattintással. Ingyenes, regisztráció nélkül, telepítés nélkül.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            APK letöltése most →
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
    title: "Mi az az APK Fájl? Teljes Útmutató az Android Csomagokhoz",
    description:
      "Minden, amit az APK fájlokról tudni érdemes: mit tartalmaznak, hogyan működnek, a különbség APK és AAB között, az integritás ellenőrzése és miért fontos a biztonság. Útmutató kezdőknek és haladóknak.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Kezdő Útmutató"],
    content: (
      <>
        <p>
          Az APK az <strong>Android Package Kit</strong> rövidítése. Ez az a fájlformátum, amelyet az
          Android az alkalmazások terjesztésére és telepítésére használ. Minden alkalmazás, amelyet
          Android-telefonjára telepít, egy APK fájlba van csomagolva (vagy az újabb AAB formátumba).
          Ebben az útmutatóban részletesen megvizsgáljuk az APK fájlok szerkezetét, működését és
          fontosságát.
        </p>

        <h2>Mit tartalmaz egy APK fájl?</h2>
        <p>
          Az APK fájl lényegében egy ZIP archívum, pontosan meghatározott szerkezettel. Belül a
          következőket találja:
        </p>
        <ul>
          <li>
            <strong>AndroidManifest.xml:</strong> Az alkalmazás szíve. Tartalmazza a csomag nevét,
            a szükséges engedélyeket, az activity-ket, szolgáltatásokat és broadcast vevőket.
          </li>
          <li>
            <strong>classes.dex:</strong> Az alkalmazás futtatható kódja Dalvik Executable (DEX)
            formátumba fordítva. Itt található az alkalmazás teljes logikája.
          </li>
          <li>
            <strong>res/:</strong> Az alkalmazás erőforrásai: XML elrendezések, képek, ikonok,
            lokalizált szövegek, témák és sok más.
          </li>
          <li>
            <strong>lib/:</strong> Natív könyvtárak C/C++ nyelven írva adott architektúrákhoz
            (armeabi-v7a, arm64-v8a, x86, x86_64).
          </li>
          <li>
            <strong>META-INF/:</strong> Digitális aláírás fájlok, amelyek garantálják az APK
            integritását és hitelességét. Tartalmazza a MANIFEST.MF, CERT.SF és CERT.RSA fájlokat.
          </li>
          <li>
            <strong>assets/:</strong> További erőforrások, amelyek az AssetManager API-n keresztül
            érhetők el.
          </li>
        </ul>

        <h2>APK vs AAB: Mi a különbség?</h2>
        <p>
          2021 óta a Google megköveteli az <strong>Android App Bundle (AAB)</strong> formátumot a Play
          Áruházban történő közzétételhez. Az AAB nem telepíthető közvetlenül: a Google Play feldolgozza
          és optimalizált APK-kat generál minden eszközhöz (split APK). Az AAB előnyei:
        </p>
        <ul>
          <li>Kisebb alkalmazások: a felhasználó csak az eszközéhez szükséges erőforrásokat tölti le.</li>
          <li>Dinamikus modul támogatás (asset packs, feature on-demand).</li>
          <li>Hatékonyabb frissítések Delta javításokkal.</li>
        </ul>
        <p>
          Az APK azonban továbbra is az univerzális formátum a közvetlen telepítéshez (sideloading).
          Az AAB-t APK-vá konvertálhatja olyan eszközökkel, mint a Google <code>bundletool</code>.
        </p>

        <h2>Hogyan ellenőrizze az APK integritását</h2>
        <p>
          Az APK letöltése nem hivatalos forrásokból kockázatos lehet. Így ellenőrizheti, hogy egy
          APK hiteles-e:
        </p>
        <pre><code>{`// Digitális aláírás ellenőrzése
keytool -printcert -jarfile app.apk

// SHA-256 hash ellenőrzése
sha256sum app.apk

# Összehasonlítás a hivatalos hash-szel (ha elérhető)`}</code></pre>
        <p>
          Egy érvényes és ellenőrzött tanúsítvánnyal aláírt APK szinte biztosan hiteles. Óvakodjon az
          ismeretlen aláírásokkal vagy a hivatalostól eltérő hash-szel rendelkező APK-któl.
        </p>

        <h2>Gyakran ismételt kérdések (GYIK)</h2>
        <p><strong>Megnyithatok egy APK-t, hogy lássam mit tartalmaz?</strong><br/>
        Igen. Nevezze át a fájlt <code>.apk</code>-ról <code>.zip</code>-re, és nyissa meg bármilyen archívumkivonóval. Felfedezheti az erőforrásokat, de a DEX kód olvasásához olyan eszközökre van szükség, mint a JADX vagy az APKTool.</p>
        <p><strong>Mit jelent az APK?</strong><br/>
        Az APK az <strong>Android Package Kit</strong> (vagy Android Package file) rövidítése. Ez az Android-alkalmazások terjesztésének szabványos formátuma.</p>
        <p><strong>Biztonságosak az APK fájlok?</strong><br/>
        A forrástól függ. A megbízható forrásokból, mint a Google Play vagy a gptoapk.com, letöltött APK-k biztonságosak. Kerülje a gyanús webhelyeket, és telepítés előtt mindig ellenőrizze a digitális aláírást.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Töltse le az APK-t biztonságosan 🛡️</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Nyerjen ki APK-t a Google Play Áruházból biztonságosan és gyorsan. Közvetlen link,
            tolakodó reklámok nélkül, adatvédelmi kockázatok nélkül. Próbálja ki most.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Ugrás a gptoapk.com oldalra →
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
    title: "Biztonságos APK Letöltő Oldalak: A Legjobb Források (2026)",
    description:
      "Útmutató a legmegbízhatóbb APK letöltő webhelyekhez. gptoapk.com, APKMirror, APKPure, F-Droid, GitHub Releases — tippek a fájlok ellenőrzéséhez.",
    date: "2026-05-11",
    readTime: "8 perc olvasás",
    tags: ["Biztonságos APK", "APK Letöltés", "Biztonság"],
    content: (
      <>
        <p>
          Az APK fájlok nem hivatalos forrásból való letöltése kockázatos lehet — rosszindulatú programok,
          nyomkövetők és káros kódmódosítások csak néhány a veszélyek közül. Ebben az útmutatóban
          bemutatjuk a legbiztonságosabb forrásokat az APK letöltéshez.
        </p>

        <h2>Miért van szükség megbízható forrásokra?</h2>
        <p>
          A Google Play az Android hivatalos áruháza, de néha nem ez az egyetlen vagy legjobb lehetőség:
        </p>
        <ul>
          <li><strong>A Google Play nem elérhető</strong> — kínai eszközökön vagy Google szolgáltatások nélkül</li>
          <li><strong>Visszalépés régebbi verzióra</strong> — az új verzió hibákat vagy nem kívánt változásokat tartalmazhat</li>
          <li><strong>Eszköz inkompatibilitás</strong> — a Google Play blokkolhatja a telepítést, pedig az alkalmazás működik</li>
          <li><strong>APK mentés biztonsági másolatként</strong> — kedvenc alkalmazásai helyi mentése</li>
        </ul>

        <h2>1. gptoapk.com — A legbiztonságosabb választás</h2>
        <p>
          A <a href="https://gptoapk.com">gptoapk.com</a> a legbiztonságosabb APK letöltő szolgáltatás. Az ok
          egyszerű: közvetlenül a Google Play Store CDN-jéből húzza le az APK fájlokat, anélkül hogy
          bármilyen módon módosítaná azokat. Minden fájl az eredeti fejlesztői digitális aláírással érkezik,
          garantálva, hogy pontosan azt telepíti, amit a Google Play telepítene.
        </p>
        <p>
          Előnyök: regisztráció nélkül, CAPTCHA nélkül, minden nyilvános alkalmazást támogat, és ami a
          legfontosabb — 100%-ban eredeti fájlok.
        </p>

        <h2>2. APKMirror</h2>
        <p>
          Az APKMirror az egyik legrégebbi és legmegbízhatóbb APK letöltő webhely. Az UpToDown cég
          tulajdona, és minden fájlt digitális aláírással ellenőriz — csak az egyező aláírású fájlok
          kerülnek közzétételre. Az oldal számos verziót kínál ugyanabból az alkalmazásból.
        </p>

        <h2>3. APKPure</h2>
        <p>
          Az APKPure egy jól ismert harmadik feles APK áruház. Az oldal széles választékot kínál
          alkalmazásokból és játékokból, beleértve a régebbi verziókat is. Fontos tudni, hogy az APKPure
          nem közvetlenül a Google-től hozza a fájlokat — a saját szerverein tárolja őket, így a
          bizalmi szint alacsonyabb, mint a gptoapk.com esetében.
        </p>

        <h2>4. F-Droid</h2>
        <p>
          Az F-Droid egy nyílt forráskódú alkalmazás tároló. Minden itt található alkalmazás ingyenes
          és a forráskódja nyilvánosan elérhető. Kiváló forrás az adatvédelemre összpontosító
          alkalmazásokhoz, de kereskedelmi alkalmazásokat, mint a WhatsApp vagy a TikTok, nem talál itt.
        </p>

        <h2>5. GitHub Releases</h2>
        <p>
          Sok fejlesztő közvetlenül a GitHub Releases oldalon teszi közzé az APK fájljait. Ez a
          legbiztonságosabb forrás, mivel a fájl közvetlenül a fejlesztőtől származik. Keressen
          nyílt forráskódú alkalmazásprojekteket, mint a NewPipe, a Signal vagy a Nextcloud.
        </p>

        <h2>Hogyan ellenőrizze, hogy az APK biztonságos?</h2>
        <p>Még megbízható forrásból is érdemes ellenőrizni a fájlt telepítés előtt:</p>
        <ol>
          <li><strong>Digitális aláírás ellenőrzése</strong> — Használja a következő parancsot:
            <pre><code>{`// APK aláírás ellenőrzése
keytool -printcert -jarfile app.apk`}</code></pre>
          </li>
          <li><strong>VirusTotal vizsgálat</strong> — Töltse fel a fájlt a <a href="https://virustotal.com">VirusTotal.com</a> oldalra, ahol több tucat vírusirtó motor ellenőrzi</li>
          <li><strong>Engedélyek ellenőrzése</strong> — Telepítés előtt nézze át, milyen engedélyeket kér az alkalmazás. Egy zseblámpa alkalmazásnak nincs szüksége névjegyzékhez való hozzáférésre</li>
          <li><strong>SHA összehasonlítás</strong> — Ha a fejlesztő közzétett egy ellenőrző hash-t, hasonlítsa össze a fájl hash-ével</li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Biztonságos APK letöltés</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — a legbiztonságosabb módja az APK letöltésének közvetlenül a Google Play-ről.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            APK letöltés
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
    title: "APK vs AAB: Teljes Összehasonlítás (2026)",
    description:
      "Mi a különbség az APK és az AAB között? Átfogó útmutató a formátumok szerkezetéről, előnyeiről és hátrányairól — és hogy ez hogyan érinti a felhasználókat.",
    date: "2026-05-11",
    readTime: "8 perc olvasás",
    tags: ["APK", "AAB", "Összehasonlítás"],
    content: (
      <>
        <p>
          2021 óta a Google Play Store megköveteli a fejlesztőktől, hogy alkalmazásaikat AAB (Android App Bundle)
          formátumban tegyék közzé. De mit jelent ez az átlagos felhasználó számára? Nézzük meg az APK és az
          AAB közötti különbségeket.
        </p>

        <h2>Mi az APK fájl?</h2>
        <p>
          Az APK (Android Package Kit) az Android hagyományos terjesztési formátuma. Mindent tartalmaz,
          amire az alkalmazásnak szüksége van a működéshez. Egy tipikus APK fájl szerkezete:
        </p>
        <pre><code>{`app.apk/
├── AndroidManifest.xml    // Alkalmazás identitása (csomagnév, engedélyek, összetevők)
├── classes.dex            // Fordított Java/Kotlin kód
├── res/                   // Erőforrások (képek, elrendezések, fordítások)
├── lib/                   // Natív könyvtárak (architektúrához igazított C/C++)
│   ├── arm64-v8a/
│   ├── armeabi-v7a/
│   └── x86_64/
├── META-INF/              // Digitális aláírás információ
└── resources.arsc         // Fordított erőforrás index`}</code></pre>

        <h2>Mi az AAB fájl?</h2>
        <p>
          Az AAB (Android App Bundle) a Google által bevezetett kiadási formátum. Nem telepíthető közvetlenül —
          ehelyett a Google Play segítségével hoz létre testreszabott APK-t minden egyes eszközhöz. Az AAB
          tartalmazza az alkalmazás összes erőforrását, és a Google Play csak azt választja ki, amire az
          adott eszköznek szüksége van.
        </p>

        <h2>APK vs AAB összehasonlítás</h2>
        <ul>
          <li><strong>Közvetlen telepítés</strong> — APK közvetlenül telepíthető; AAB-nak át kell mennie a Google Play-en</li>
          <li><strong>Fájlméret</strong> — APK minden eszközhöz tartalmaz erőforrásokat (nagyobb); AAB célzott APK-t hoz létre (kisebb)</li>
          <li><strong>Megosztás</strong> — APK könnyen megosztható; AAB nem osztható meg közvetlenül más felhasználókkal</li>
          <li><strong>Harmadik fél kompatibilitás</strong> — APK mindenhol működik; AAB a Google Play-től függ</li>
        </ul>

        <h2>Hogyan érinti Önt?</h2>
        <p>
          Az átlagos felhasználó számára a fő különbség a fájlméret. Az AAB kisebb APK-t hoz létre,
          mert csak azt tartalmazza, amire az Ön eszközének szüksége van. De ha harmadik féltől tölt le,
          továbbra is APK-ra van szüksége — az AAB nem fog működni.
        </p>
        <p>
          Az olyan szolgáltatások, mint a <a href="https://gptoapk.com">gptoapk.com</a>, átalakítják
          az AAB-t kompatibilis APK-vá, így mindig használható fájlt kap.
        </p>

        <h2>AAB konvertálása APK-vá a bundletool segítségével</h2>
        <p>
          Fejlesztők számára az AAB APK-vá alakítható a hivatalos bundletool eszközzel:
        </p>
        <pre><code>
java -jar bundletool.jar build-apks --bundle=/path/app.aab --output=/path/app.apks

// APK kinyerése az archívumból
unzip /path/app.apks -d /path/apk_output/</code></pre>

        <h2>Gyakran Ismételt Kérdések</h2>
        <p><strong>Telepíthető az AAB közvetlenül a telefonra?</strong><br/>Nem. Az AAB kiadási formátum, nem telepítési formátum. Először APK-vá kell konvertálni.</p>
        <p><strong>Eltűnik az APK?</strong><br/>Nem teljesen. A Google Play továbbra is testre szabott APK-t hoz létre az AAB-ból. Az APK továbbra is a helyi telepítés és megosztás formátuma marad.</p>
        <p><strong>Átalakítható APK AAB-vá?</strong><br/>Nem könnyen. Az AAB forráskódot és Android Studio-t igényel. Javasolt mind az AAB-t, mind az APK-t megőrizni.</p>
        <p><strong>Mi a helyzet a biztonsággal?</strong><br/>Mind az APK, mind az AAB ugyanazt a digitális aláírási rendszert használja. Mindkettő biztonságos, ha megbízható forrásból származik.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">APK letöltés a gptoapk.com-ról</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — illesszen be egy Google Play linket, és kapjon APK-t másodpercek alatt.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            APK letöltés
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
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | gptoapk.com`,
    description: post.description,
    alternates: {
      canonical: `https://gptoapk.com/hu/blog/${slug}`,
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
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "gptoapk.com" },
    url: `https://gptoapk.com/hu/blog/${slug}`,
    inLanguage: "hu",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/hu/blog/${slug}`,
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
          href="/hu/blog"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ← Vissza a bloghoz
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
          <div className="flex items-center gap-4 text-sm text-gray-500">
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
            href="/hu/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Vissza a bloghoz
          </Link>
        </div>
      </article>
    </>
  );
}
