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
    title: "Jak Stáhnout APK z Google Play Store: Kompletní Průvodce (2026)",
    description:
      "Podrobný návod, jak získat APK soubory z Google Play Store. Naučte se používat gptoapk.com, ADB příkazy pro pokročilé uživatele a bezpečnostní tipy pro stahování APK. Bez root přístupu.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Stažení APK", "Google Play", "Návod"],
    content: (
      <>
        <p>
          Stahování APK souborů z Google Play Store může být užitečné z mnoha důvodů: chcete si uložit
          konkrétní verzi aplikace, nainstalovat ji na zařízení bez Google Play, nebo si prostě vytvořit
          zálohu. V této příručce vám ukážeme nejefektivnější způsoby, jak extrahovat APK z Google Play.
        </p>

        <h2>Metoda 1: Použít gptoapk.com (Nejjednodušší)</h2>
        <p>
          Nejrychlejší metoda nevyžaduje žádnou instalaci. Stačí navštívit{" "}
          <a href="https://gptoapk.com">gptoapk.com</a> a vložit odkaz na Google Play požadované aplikace.
        </p>
        <ol>
          <li>
            Otevřete Google Play Store v telefonu nebo prohlížeči, najděte aplikaci a zkopírujte její URL
            (např. <code>https://play.google.com/store/apps/details?id=com.example.app</code>).
          </li>
          <li>
            Přejděte na <a href="https://gptoapk.com">gptoapk.com</a> a vložte odkaz do vyhledávacího pole.
          </li>
          <li>Klikněte na tlačítko stahování a počkejte pár sekund.</li>
          <li>Stáhněte APK soubor přímo do svého zařízení.</li>
        </ol>
        <p>
          Tato metoda funguje s jakoukoli veřejnou aplikací z Google Play Store a je zcela zdarma. Není
          nutná žádná registrace ani instalace dalšího softwaru.
        </p>

        <h2>Metoda 2: Použít ADB (Pro vývojáře)</h2>
        <p>
          Pokud jste vývojář nebo pokročilý uživatel, můžete extrahovat APK pomocí Android Debug Bridge (ADB).
          Tato metoda vyžaduje počítač a povolení ladění USB v telefonu.
        </p>
        <pre><code>{`// 1. Ověřte, že je zařízení připojeno
adb devices

// 2. Zobrazte seznam všech nainstalovaných aplikací (hledejte požadovaný balíček)
adb shell pm list packages | grep nazevapp

// 3. Získejte cestu k APK
adb shell pm path com.example.app

// 4. Stáhněte APK do počítače
adb pull /data/app/com.example.app-xxx/base.apk`}</code></pre>
        <p>
          Po extrahování můžete APK sdílet, nainstalovat na jiná zařízení nebo si jej uložit jako zálohu.
          Tato metoda funguje bez root přístupu a dává vám plnou kontrolu nad souborem.
        </p>

        <h2>Metoda 3: Aplikace třetích stran (APK Extractor)</h2>
        <p>
          Pokud dáváte přednost řešení přímo z telefonu bez počítače, můžete použít aplikace jako
          APK Extractor nebo ML Manager dostupné v Obchodě Play. Tyto aplikace automaticky rozpoznají
          všechny nainstalované aplikace a umožní exportovat APK jediným klepnutím.
        </p>
        <ul>
          <li>
            <strong>APK Extractor:</strong> Jednoduchý a lehký. Vyberte aplikaci a stiskněte &quot;Extrahovat&quot;.
          </li>
          <li>
            <strong>ML Manager:</strong> Nabízí také správu záloh a sdílení přes Wi-Fi Direct.
          </li>
        </ul>

        <h2>Bezpečnostní tipy</h2>
        <p>
          Při stahování APK z neoficiálních zdrojů buďte vždy opatrní. Doporučujeme:
        </p>
        <ul>
          <li>Stahujte pouze z důvěryhodných zdrojů, jako je <a href="https://gptoapk.com">gptoapk.com</a>.</li>
          <li>Před instalací vždy zkontrolujte digitální podpis APK.</li>
          <li>Porovnejte hash SHA-256 s oficiálním údajem, pokud je k dispozici.</li>
          <li>Nepovolujte instalaci z neznámých zdrojů u aplikací, kterým nedůvěřujete.</li>
        </ul>

        <h2>Časté dotazy (FAQ)</h2>
        <p><strong>Je legální stahovat APK z Google Play?</strong><br/>
        Ano, stahování APK bezplatných aplikací pro osobní použití je legální. U placených aplikací musíte mít řádné zakoupení. Extrakce APK pro osobní zálohu je v souladu s podmínkami Google.</p>
        <p><strong>Potřebuji root?</strong><br/>
        Ne. Všechny zde popsané metody fungují bez root přístupu. Extrakce APK nevyžaduje administrátorská oprávnění na zařízení.</p>
        <p><strong>Proč se některé APK nenainstalují?</strong><br/>
        Možná budete muset povolit instalaci z neznámých zdrojů v nastavení zařízení. Přejděte do Nastavení &gt; Zabezpečení &gt; Instalovat z neznámých zdrojů a aktivujte ji. V systému Android 8+ je tato možnost nastavena pro každou aplikaci zvlášť.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Vyzkoušejte gptoapk.com 🚀</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Nejrychlejší nástroj pro stahování APK z Google Play. Vložte odkaz a stáhněte APK jediným kliknutím. Zdarma, bez registrace, bez instalace.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Stáhnout APK nyní →
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
    title: "Co je to APK Soubor? Kompletní Průvodce Android Balíčky",
    description:
      "Vše, co potřebujete vědět o APK souborech: co obsahují, jak fungují, rozdíl mezi APK a AAB, jak ověřit integritu a proč je bezpečnost důležitá. Průvodce pro začátečníky i pokročilé uživatele.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Průvodce"],
    content: (
      <>
        <p>
          APK je zkratka pro <strong>Android Package Kit</strong>. Jedná se o formát souborů, který
          Android používá k distribuci a instalaci aplikací. Každá aplikace, kterou nainstalujete do
          svého telefonu s Androidem, je zabalena do APK souboru (nebo novějšího AAB). V tomto průvodci
          se podíváme do hloubky na strukturu, fungování a důležitost APK souborů.
        </p>

        <h2>Co obsahuje APK soubor?</h2>
        <p>
          APK soubor je v podstatě ZIP archiv s přesně definovanou strukturou. Uvnitř najdete:
        </p>
        <ul>
          <li>
            <strong>AndroidManifest.xml:</strong> Srdce aplikace. Obsahuje název balíčku, požadovaná
            oprávnění, aktivity, služby a broadcast receivery.
          </li>
          <li>
            <strong>classes.dex:</strong> Spustitelný kód aplikace zkompilovaný do formátu Dalvik
            Executable (DEX). Zde leží veškerá logika aplikace.
          </li>
          <li>
            <strong>res/:</strong> Zdroje aplikace: XML rozvržení, obrázky, ikony, lokalizované
            řetězce, motivy a mnoho dalšího.
          </li>
          <li>
            <strong>lib/:</strong> Nativní knihovny napsané v C/C++ pro specifické architektury
            (armeabi-v7a, arm64-v8a, x86, x86_64).
          </li>
          <li>
            <strong>META-INF/:</strong> Soubory digitálního podpisu, které zaručují integritu a
            autentičnost APK. Obsahuje MANIFEST.MF, CERT.SF a CERT.RSA.
          </li>
          <li>
            <strong>assets/:</strong> Další zdroje přístupné přes API AssetManager.
          </li>
        </ul>

        <h2>APK vs AAB: Jaký je rozdíl?</h2>
        <p>
          Od roku 2021 Google vyžaduje formát <strong>Android App Bundle (AAB)</strong> pro
          publikování na Play Store. AAB není přímo instalovatelný: Google Play jej zpracuje a
          vygeneruje optimalizované APK pro každé zařízení (split APK). Výhody AAB zahrnují:
        </p>
        <ul>
          <li>Lehčí aplikace: uživatel stahuje pouze zdroje potřebné pro jeho zařízení.</li>
          <li>Dynamická podpora modulů (asset pack, feature on-demand).</li>
          <li>Efektivnější aktualizace pomocí Delta patchů.</li>
        </ul>
        <p>
          APK však zůstává univerzálním formátem pro přímou instalaci (sideloading). AAB můžete
          převést na APK pomocí nástrojů jako <code>bundletool</code> od Google.
        </p>

        <h2>Jak ověřit integritu APK</h2>
        <p>
          Stahování APK z neoficiálních zdrojů může být riskantní. Zde je návod, jak zkontrolovat,
          zda je APK autentický:
        </p>
        <pre><code>{`// Ověření digitálního podpisu
keytool -printcert -jarfile app.apk

// Kontrola SHA-256 hash
sha256sum app.apk

# Porovnání s oficiálním hash (je-li k dispozici)`}</code></pre>
        <p>
          APK podepsaný platným a ověřeným certifikátem je téměř jistě autentický. Dejte si pozor na
          APK s neznámými podpisy nebo hash odlišnými od oficiálních údajů.
        </p>

        <h2>Časté dotazy (FAQ)</h2>
        <p><strong>Mohu otevřít APK a podívat se, co obsahuje?</strong><br/>
        Ano. Přejmenujte soubor z <code>.apk</code> na <code>.zip</code> a otevřete jej libovolným extraktorem archivů. Můžete prozkoumat zdroje, ale DEX kód vyžaduje nástroje jako JADX nebo APKTool pro čtení.</p>
        <p><strong>Co znamená APK?</strong><br/>
        APK je zkratka pro <strong>Android Package Kit</strong> (nebo Android Package file). Jedná se o standardní formát pro distribuci aplikací na Androidu.</p>
        <p><strong>Jsou APK soubory bezpečné?</strong><br/>
        Záleží na zdroji. APK stažené z důvěryhodných zdrojů jako Google Play nebo gptoapk.com jsou bezpečné. Vyhněte se podezřelým stránkám a před instalací vždy ověřte digitální podpis.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Stahujte APK bezpečně 🛡️</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Extrahujte APK z Google Play Store bezpečně a rychle. Přímý odkaz, bez rušivé reklamy, bez rizika pro soukromí. Vyzkoušejte nyní.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Přejít na gptoapk.com →
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
    title: "Bezpečné a Spolehlivé Stránky pro Stažení APK: Kompletní Průvodce (2026)",
    description:
      "Seznam nejbezpečnějších APK stránek pro stahování. Srovnání gptoapk.com, APKMirror, APKPure, F-Droid a GitHub Releases. Kontrolní seznam pro ověření bezpečnosti APK souborů.",
    date: "2026-05-11",
    readTime: "8 min read",
    tags: ["Bezpečné APK", "APK Stažení", "Bezpečnostní Průvodce"],
    content: (
      <>
        <p>
          Při stahování APK souborů je největší výzvou bezpečnost. Stažení z nesprávného zdroje může ohrozit vaše zařízení malwarem, spywarem nebo krádeží dat. V tomto průvodci prozkoumáme nejdůvěryhodnější a nejbezpečnější zdroje pro stahování APK v roce 2026.
        </p>

        <h2>Nejlepší bezpečné APK stránky (2026)</h2>

        <h3>1. gptoapk.com — Nejbezpečnější a nejrychlejší</h3>
        <p>
          <a href="https://gptoapk.com">gptoapk.com</a> je nejlepší nástroj pro stahování APK přímo z Google Play Store. Získává soubory přímo ze serverů Google, takže integrita souborů je zaručena. 100% originální APK, beze změn. Zdarma, bez registrace, bez reklam.
        </p>

        <h3>2. APKMirror — Největší APK archiv</h3>
        <p>
          APKMirror je jedním z nejstarších a nejspolehlivějších APK mirror webů. Každý soubor je ručně ověřen týmem APKMirror. Je však závislý na uživatelských nahrávkách, takže nejnovější verze mohou chvíli trvat.
        </p>

        <h3>3. APKPure — Často používaná alternativa</h3>
        <p>
          APKPure je oblíbená platforma pro stahování APK nabízející aplikace z různých regionů. Má vlastní instalační aplikaci. Soubory jsou však nahrávány uživateli, proto vždy zkontrolujte digitální podpis.
        </p>

        <h3>4. F-Droid — Nejlepší pro open source APK</h3>
        <p>
          F-Droid je bezpečné úložiště pouze pro open source Android aplikace. Zdrojový kód i binární soubory každé aplikace jsou ověřeny. Zcela bez reklam s maximálním důrazem na soukromí uživatelů.
        </p>

        <h3>5. GitHub Releases — Přímá distribuce vývojářů</h3>
        <p>
          Mnoho vývojářů nahrává APK přímo na GitHub Releases. Toto je nejspolehlivější zdroj, protože soubory pocházejí přímo od vývojářů. Ne všechny aplikace jsou však na GitHubu k dispozici.
        </p>

        <h2>Kontrolní seznam bezpečnosti APK</h2>
        <p>Před instalací jakéhokoli APK dodržujte tento kontrolní seznam:</p>
        <ol>
          <li><strong>Ověřte digitální podpis</strong> — Zkontrolujte certifikát pomocí keytool:
            <pre><code>{`// zobrazení informací o podepisujícím
keytool -printcert -jarfile app.apk`}</code></pre>
          </li>
          <li><strong>Skenujte na VirusTotal</strong> — Nahrajte APK na <a href="https://www.virustotal.com">VirusTotal.com</a> a nechte jej prohledat 60+ antivirovými enginy</li>
          <li><strong>Zkontrolujte oprávnění</strong> — Jsou požadovaná oprávnění přiměřená funkci aplikace? Kalkulačka nepotřebuje přístup k vašim kontaktům a poloze</li>
          <li><strong>Porovnejte SHA-256 hash</strong> — Ověřte hash staženého souboru proti oficiálnímu hashi od vývojáře</li>
          <li><strong>Zkontrolujte název balíčku</strong> — Ujistěte se, že název balíčku v AndroidManifest.xml odpovídá oficiálnímu názvu</li>
          <li><strong>Stahujte pouze z důvěryhodných zdrojů</strong> — Vyhněte se instalaci APK z neznámých webových stránek</li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Stahujte APK bezpečně</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — Stahujte APK přímo z Google Play. 100% bezpečné, zcela zdarma. Vyzkoušejte ještě dnes!</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Přejít na gptoapk.com
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
    title: "APK vs AAB: Kompletní Srovnávací Průvodce (2026)",
    description:
      "Pochopte rozdíly mezi formáty APK a AAB. Struktura APK, jak AAB funguje, příkazy bundletool a který formát je pro vás ten pravý — s podrobnými FAQ.",
    date: "2026-05-11",
    readTime: "8 min read",
    tags: ["APK", "AAB", "Android Vývoj"],
    content: (
      <>
        <p>
          Ve vývoji Android aplikací existují dva hlavní balicí formáty: APK (Android Package Kit) a AAB (Android App Bundle). Od roku 2021 je AAB povinný pro nové aplikace publikované na Google Play Store. Jaký je ale skutečný rozdíl mezi těmito dvěma formáty? V tomto průvodci provedeme podrobné srovnání.
        </p>

        <h2>Struktura APK souboru</h2>
        <p>Co obsahuje APK soubor uvnitř:</p>
        <pre><code>{`app.apk/
├── AndroidManifest.xml    // metadata a oprávnění aplikace
├── classes.dex            // kompilovaný Java/Kotlin kód
├── res/                   // rozvržení, obrázky, textové řetězce
├── META-INF/              // digitální podpisy a certifikáty
├── lib/                   // nativní knihovny (.so soubory)
├── assets/                // vlastní assety (fonty, videa)
└── resources.arsc         // zkompilovaný index zdrojů`}</code></pre>
        <p>APK je kompletní, samostatný balíček. Lze jej instalovat přímo na jakékoli zařízení s Androidem (sideloading). APK však obsahuje soubory pro všechny architektury a zdroje, což zvětšuje velikost souboru.</p>

        <h2>Jak AAB funguje</h2>
        <p>
          AAB (Android App Bundle) je publikační formát, nikoli instalační. Když nahrajete AAB do Google Play, Google Play vygeneruje optimalizované APK (split APK) obsahující pouze soubory potřebné pro vaše konkrétní zařízení.
        </p>
        <pre><code>
bundletool build-apks --bundle=app.aab --output=app.apks --ks=keystore.jks

// instalace split APK
bundletool install-apks --apks=app.apks</code></pre>

        <h2>APK vs AAB: Klíčové rozdíly</h2>
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 my-4">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Vlastnost</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">APK</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">AAB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Požadavek na publikaci</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Play Store + sideloading</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Pouze Play Store</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Velikost souboru</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Větší (všechny zdroje včetně)</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Menší (pouze potřebné zdroje)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Přímá instalace</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">✅ Ano</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">❌ Ne (vyžaduje bundletool)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Modulární podpora</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">❌ Omezená</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">✅ Dynamické moduly funkcí</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delta aktualizace</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">❌ Plné opětovné stažení</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">✅ Pouze změněné části</td>
            </tr>
          </tbody>
        </table>

        <h2>Kdy který použít?</h2>
        <ul>
          <li><strong>Publikace na Play Store:</strong> AAB (povinný, menší velikost stahování)</li>
          <li><strong>Sideloading a testování:</strong> APK (lze instalovat přímo)</li>
          <li><strong>Beta testování:</strong> APK (snadná distribuce)</li>
          <li><strong>Sdílení na webech třetích stran:</strong> APK (univerzální podpora)</li>
        </ul>

        <h2>Časté dotazy (FAQ)</h2>
        <p><strong>Nahradí AAB zcela APK?</strong><br/>Ne. Ačkoli je AAB povinný pro Play Store, APK zůstane vždy potřebný pro sideloading a distribuci třetími stranami.</p>
        <p><strong>Mohu převést AAB na APK?</strong><br/>Ano. Použijte nástroj bundletool od Google. Viz příkaz výše.</p>
        <p><strong>Který formát je bezpečnější?</strong><br/>Oba jsou digitálně podepsány a stejně bezpečné. AAB má výhodu v tom, že Google Play doručuje komprimované APK, což ztěžuje analýzu.</p>
        <p><strong>Podporuje gptoapk.com AAB?</strong><br/><a href="https://gptoapk.com">gptoapk.com</a> doručuje APK přímo z Google Play. Google Play generuje vhodné APK z AAB pro vaše zařízení, které si můžete stáhnout pomocí našeho nástroje.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">APK vs AAB — Stáhněte si své APK nyní</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — Stahujte APK z Google Play. Rychlé, bezpečné, zcela zdarma.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Začít stahovat nyní
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
      canonical: `https://gptoapk.com/cs/blog/${slug}`,
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
    url: `https://gptoapk.com/cs/blog/${slug}`,
    inLanguage: "cs",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/cs/blog/${slug}`,
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
          href="/cs/blog"
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
          ← Zpět na blog
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
            href="/cs/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Zpět na blog
          </Link>
        </div>
      </article>
    </>
  );
}
