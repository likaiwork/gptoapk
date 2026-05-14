#!/usr/bin/env node
/**
 * Generate all localized blog content and inject into 30-language blog pages.
 * Run: node scripts/go.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE = '/Users/likai/Documents/XCodePorject/gptoapk/src/app';
const LOCALES = ['ar','bn','cs','da','de','el','es','fa','fi','fr','he','hi','hu','id','it','ko','ms','nb','nl','pl','pt','ro','ru','sv','th','tl','tr','uk','ur','vi'];

const esc = s => s.replace(/'/g, "\\'");
const j = a => JSON.stringify(a);

const RT = { ar:'١٠ دقائق قراءة',bn:'১০ মিনিট পড়া',cs:'10 minut čtení',da:'10 minutters læsning',de:'10 Minuten Lesezeit',
  el:'10 λεπτά ανάγνωσης',es:'10 minutos de lectura',fa:'۱۰ دقیقه مطالعه',fi:'10 minuuttia lukuaikaa',
  fr:'10 minutes de lecture',he:'10 דקות קריאה',hi:'10 मिनट पढ़ना',hu:'10 perc olvasás',
  id:'10 menit baca',it:'10 minuti di lettura',ko:'10분 읽기',ms:'10 minit bacaan',
  nb:'10 minutters lesing',nl:'10 minuten leestijd',pl:'10 minut czytania',
  pt:'10 minutos de leitura',ro:'10 minute de citit',ru:'10 минут чтения',sv:'10 minuters läsning',
  th:'10 นาทีในการอ่าน',tl:'10 minutong pagbabasa',tr:'10 dakika okuma',uk:'10 хвилин читання',ur:'10 منٹ پڑھنا',vi:'10 phút đọc'};

const LV = arr => Object.fromEntries(LOCALES.map((l,i)=>[l,arr[i]]));

// ARTICLE 1 DATA
const T1 = LV(["دليل التحقق من توافق APK: 5 خطوات لمعرفة ما إذا كان التطبيق متوافقًا مع هاتفك",
"APK সামঞ্জস্যতা পরীক্ষা গাইড: ৫টি ধাপে আপনার ফোনের সাথে অ্যাপ সামঞ্জস্যপূর্ণ কিনা জানুন",
"Průvodce kompatibilitou APK: 5 kroků ke kontrole, zda aplikace poběží na vašem telefonu",
"Guide til APK-kompatibilitet: 5 trin til at tjekke om en app virker på din telefon",
"APK-Kompatibilitätsprüfung: 5 Schritte zur Überprüfung der App-Kompatibilität mit Ihrem Handy",
"Οδηγός συμβατότητας APK: 5 βήματα για να ελέγξετε αν μια εφαρμογή λειτουργεί στο κινητό σας",
"Guía de compatibilidad de APK: 5 pasos para comprobar si una app funciona en tu móvil",
"راهنمای بررسی سازگاری APK: ۵ مرحله برای تشخیص سازگاری برنامه با گوشی شما",
"APK-yhteensopivuustarkistus: 5 vaihetta sovelluksen yhteensopivuuden tarkistamiseen",
"Guide de compatibilité APK : 5 étapes pour vérifier si une application fonctionne sur votre téléphone",
"מדריך תאימות APK: 5 צעדים לבדיקה האם אפליקציה תואמת לטלפון שלך",
"APK संगतता जांच गाइड: 5 कदमों में जानें कि ऐप आपके फोन पर चलेगा या नहीं",
"APK-kompatibilitási útmutató: 5 lépés az alkalmazás-kompatibilitás ellenőrzéséhez",
"Panduan Kompatibilitas APK: 5 Langkah Memeriksa Apakah Aplikasi Cocok dengan Ponsel Anda",
"Guida alla compatibilità APK: 5 passi per verificare se un'app funziona sul tuo telefono",
"APK 호환성 확인 가이드: 5단계로 앱이 휴대폰과 호환되는지 확인하는 방법",
"Panduan Keserasian APK: 5 Langkah untuk Memeriksa Sama Ada Aplikasi Berfungsi pada Telefon Anda",
"APK-kompatibilitetsguide: 5 trinn for å sjekke om en app fungerer på telefonen din",
"APK-compatibiliteitsgids: 5 stappen om te controleren of een app op uw telefoon werkt",
"Przewodnik zgodności APK: 5 kroków do sprawdzenia, czy aplikacja działa na Twoim telefonie",
"Guia de compatibilidade de APK: 5 passos para verificar se um aplicativo funciona no seu celular",
"Ghid de compatibilitate APK: 5 pași pentru a verifica dacă o aplicație funcționează pe telefonul tău",
"Руководство по проверке совместимости APK: 5 шагов для определения совместимости приложения с телефоном",
"APK-kompatibilitetsguide: 5 steg för att kontrollera om en app fungerar på din telefon",
"คู่มือตรวจสอบความเข้ากันได้ของ APK: 5 ขั้นตอนตรวจสอบว่าแอปทำงานบนมือถือคุณได้หรือไม่",
"Gabay sa Pagkakatugma ng APK: 5 Hakbang para Malaman Kung Gumagana ang App sa Iyong Telepono",
"APK Uyumluluk Kontrol Rehberi: 5 Adımda Uygulamanın Telefonunuzla Uyumlu Olup Olmadığını Öğrenin",
"Посібник із сумісності APK: 5 кроків для перевірки, чи працюватиме додаток на вашому телефоні",
"APK مطابقت چیک گائیڈ: 5 مراحل میں جانیں کہ ایپ آپ کے فون پر چلے گی یا نہیں",
"Hướng dẫn kiểm tra tương thích APK: 5 bước để biết ứng dụng có chạy trên điện thoại của bạn không"]);

const D1 = LV(["APK لا يعمل؟ دليلك للتحقق من توافق CPU ومستوى API وكثافة الشاشة في 5 خطوات بسيطة.",
"APK ইন্সটল হচ্ছে না? CPU আর্কিটেকচার, API লেভেল, স্ক্রিন ডেনসিটি চেক করার ৫টি পদ্ধতি।",
"APK se neinstaluje? Naučte se 5 způsobů kontroly kompatibility – CPU architektura, API úroveň, hustota obrazovky.",
"APK vil ikke installere? Lær 5 måder at tjekke kompatibilitet – CPU-arkitektur, API-niveau, skærmtæthed.",
"APK lässt sich nicht installieren? 5 Methoden zur Prüfung von CPU-Architektur, API-Level und Bildschirmdichte.",
"Το APK δεν εγκαθίσταται; Μάθετε 5 τρόπους ελέγχου συμβατότητας – CPU, API, πυκνότητα οθόνης.",
"¿El APK no se instala? Aprende 5 formas de verificar la compatibilidad: arquitectura CPU, nivel de API, densidad de pantalla.",
"APK نصب نمی‌شود؟ ۵ روش برای بررسی سازگاری معماری CPU، سطح API و تراکم صفحه را بیاموزید.",
"APK ei asennu? Opi 5 tapaa tarkistaa yhteensopivuus – CPU-arkkitehtuuri, API-taso, näytön tiheys.",
"L'APK ne s'installe pas ? Découvrez 5 méthodes pour vérifier la compatibilité : architecture CPU, niveau API, densité d'écran.",
"APK לא מותקן? למד 5 דרכים לבדוק תאימות – ארכיטקטורת CPU, רמת API, צפיפות מסך.",
"APK इंस्टॉल नहीं हो रहा? CPU आर्किटेक्चर, API लेवल, स्क्रीन डेंसिटी चेक करने के 5 तरीके।",
"Nem települ az APK? Tanuljon meg 5 módszert a CPU-architektúra, API-szint és képernyősűrűség ellenőrzésére.",
"APK tidak bisa diinstal? Pelajari 5 cara memeriksa kompatibilitas – arsitektur CPU, level API, densitas layar.",
"L'APK non si installa? Scopri 5 metodi per verificare la compatibilità: architettura CPU, livello API, densità schermo.",
"APK가 설치되지 않나요? CPU 아키텍처, API 레벨, 화면 밀도를 확인하는 5가지 방법을 알아보세요.",
"APK tidak boleh dipasang? Pelajari 5 cara untuk memeriksa keserasian – seni bina CPU, tahap API, ketumpatan skrin.",
"APK vil ikke installeres? Lær 5 måter å sjekke kompatibilitet – CPU-arkitektur, API-nivå, skjermtetthet.",
"APK installeert niet? Leer 5 manieren om compatibiliteit te controleren – CPU-architectuur, API-niveau, schermdichtheid.",
"APK nie instaluje się? Poznaj 5 sposobów sprawdzania zgodności – architektura CPU, poziom API, gęstość ekranu.",
"O APK não instala? Aprenda 5 maneiras de verificar a compatibilidade – arquitetura da CPU, nível da API, densidade da tela.",
"APK-ul nu se instalează? Învață 5 metode de a verifica compatibilitatea – arhitectură CPU, nivel API, densitate ecran.",
"APK не устанавливается? Узнайте 5 способов проверки совместимости: архитектура CPU, уровень API, плотность экрана.",
"APK installeras inte? Lär dig 5 sätt att kontrollera kompatibilitet – CPU-arkitektur, API-nivå, skärmtäthet.",
"APK ติดตั้งไม่ได้? เรียนรู้ 5 วิธีตรวจสอบความเข้ากันได้ – สถาปัตยกรรม CPU, ระดับ API, ความหนาแน่นหน้าจอ",
"Hindi mai-install ang APK? Alamin ang 5 paraan upang suriin ang pagkakatugma – arkitektura ng CPU, antas ng API, density ng screen.",
"APK yüklenmiyor mu? CPU mimarisi, API seviyesi, ekran yoğunluğu kontrolü için 5 yöntem.",
"APK не встановлюється? Дізнайтеся 5 способів перевірки сумісності – архітектура CPU, рівень API, щільність екрану.",
"APK انسٹال نہیں ہو رہا؟ CPU آرکیٹیکچر، API لیول، اسکرین ڈینسٹی چیک کرنے کے 5 طریقے۔",
"APK không cài được? Tìm hiểu 5 cách kiểm tra tương thích – kiến trúc CPU, cấp độ API, mật độ màn hình."]);

const TG1 = LV([['توافق APK','CPU','دليل الفحص'],['APK সামঞ্জস্য','CPU আর্কিটেকচার','পরীক্ষা গাইড'],
['Kompatibilita APK','CPU architektura','Průvodce'],['APK-kompatibilitet','CPU-arkitektur','Guide'],
['APK-Kompatibilität','CPU-Architektur','Prüfleitfaden'],['Συμβατότητα APK','CPU','Οδηγός ελέγχου'],
['Compatibilidad APK','Arquitectura CPU','Guía'],['سازگاری APK','CPU','راهنما'],
['APK-yhteensopivuus','CPU-arkkitehtuuri','Tarkistusopas'],['Compatibilité APK','Architecture CPU','Guide'],
['תאימות APK','ארכיטקטורת CPU','מדריך'],['APK संगतता','CPU आर्किटेक्चर','जांच गाइड'],
['APK-kompatibilitás','CPU-architektúra','Útmutató'],['Kompatibilitas APK','Arsitektur CPU','Panduan'],
['Compatibilità APK','Architettura CPU','Guida'],['APK 호환성','CPU 아키텍처','확인 가이드'],
['Keserasian APK','Seni Bina CPU','Panduan'],['APK-kompatibilitet','CPU-arkitektur','Guide'],
['APK-compatibiliteit','CPU-architectuur','Gids'],['Zgodność APK','Architektura CPU','Przewodnik'],
['Compatibilidade APK','Arquitetura CPU','Guia'],['Compatibilitate APK','Arhitectură CPU','Ghid'],
['Совместимость APK','Архитектура CPU','Руководство'],['APK-kompatibilitet','CPU-arkitektur','Guide'],
['ความเข้ากันได้ APK','CPU','คู่มือ'],['Pagkakatugma APK','Arkitektura CPU','Gabay'],
['APK Uyumluluk','CPU Mimarisi','Kontrol Rehberi'],['Сумісність APK','Архітектура CPU','Посібник'],
['APK مطابقت','CPU آرکیٹیکچر','چیک گائیڈ'],['Tương thích APK','Kiến trúc CPU','Hướng dẫn']]);

// ARTICLE 2 DATA
const T2 = LV(["حجم ملف APK كبير؟ 5 طرق لتقليل حجم التحميل وتوفير مساحة الهاتف",
"APK ফাইল সাইজ খুব বড়? ডাউনলোড হালকা করার এবং ফোনের স্পেস খালি করার ৫টি পদ্ধতি",
"Velikost souboru APK: 5 způsobů, jak zmenšit stahování a uvolnit místo v telefonu",
"APK-filstørrelse: 5 måder at gøre downloads lettere og frigøre plads på telefonen",
"APK-Dateigröße: 5 Methoden zum Verkleinern von Downloads und Freigeben von Telefonspeicher",
"Μέγεθος αρχείου APK: 5 τρόποι για να μειώσετε τις λήψεις και να ελευθερώσετε χώρο στο τηλέφωνο",
"Tamaño del archivo APK: 5 formas de reducir las descargas y liberar espacio en el teléfono",
"حجم فایل APK زیاد است؟ ۵ روش برای کاهش حجم دانلود و آزادسازی فضای گوشی",
"APK-tiedoston koko: 5 tapaa keventää latauksia ja vapauttaa puhelimen tilaa",
"Taille du fichier APK : 5 façons d'alléger les téléchargements et de libérer de l'espace sur le téléphone",
"גודל קובץ APK: 5 דרכים לצמצם הורדות ולפנות מקום בטלפון",
"APK फ़ाइल का आकार बहुत बड़ा? 5 तरीके डाउनलोड हल्का करने और फोन की जगह खाली करने के",
"APK-fájlméret: 5 módszer a letöltések könnyítésére és telefonhely felszabadítására",
"Ukuran File APK Besar? 5 Cara Mengecilkan Unduhan dan Membebaskan Ruang Ponsel",
"Dimensione del file APK: 5 modi per ridurre i download e liberare spazio sul telefono",
"APK 파일 크기 최적화: 다운로드를 가볍게 하고 휴대폰 저장 공간을 확보하는 5가지 방법",
"Saiz Fail APK Besar? 5 Cara untuk Mengurangkan Muat Turun dan Membebaskan Ruang Telefon",
"APK-filstørrelse: 5 måter å gjøre nedlastinger lettere og frigjøre plass på telefonen",
"APK-bestandsgrootte: 5 manieren om downloads lichter te maken en telefoonruimte vrij te maken",
"Rozmiar pliku APK: 5 sposobów na zmniejszenie pobierania i zwolnienie miejsca w telefonie",
"Tamanho do arquivo APK: 5 maneiras de reduzir downloads e liberar espaço no celular",
"Dimensiunea fișierului APK: 5 moduri de a reduce descărcările și a elibera spațiu pe telefon",
"Размер APK-файла: 5 способов уменьшить загрузки и освободить место на телефоне",
"APK-filstorlek: 5 sätt att göra nedladdningar lättare och frigöra utrymme på telefonen",
"ขนาดไฟล์ APK ใหญ่เกินไป? 5 วิธีลดขนาดดาวน์โหลดและเพิ่มพื้นที่ว่างในโทรศัพท์",
"Malaki ang Laki ng File ng APK? 5 Paraan para Bawasan ang Dami ng Download at Magkaroon ng Espasyo sa Telepono",
"APK Dosya Boyutu Büyük mü? İndirmeleri Hafifletmenin ve Telefon Alanı Açmanın 5 Yolu",
"Розмір файлу APK: 5 способів зменшити завантаження та звільнити місце на телефоні",
"APK فائل کا سائز بہت بڑا؟ 5 طریقے ڈاؤن لوڈ ہلکا کرنے اور فون کی جگہ خالی کرنے کے",
"Kích thước tệp APK quá lớn? 5 cách giảm tải xuống và giải phóng dung lượng điện thoại"]);

const D2 = LV(["مساحة التخزين تنفد؟ دليلك لبنية APK وكيفية تقليل حجمه وتوفير المساحة على هاتف Android.",
"ফোনের স্টোরেজ কম? APK এর গঠন বুঝে ফাইল সাইজ কমান এবং জায়গা খালি করার ৫টি কার্যকরী উপায়।",
"Málo místa? Pochopte strukturu APK a naučte se 5 praktických způsobů, jak zmenšit velikost a uvolnit úložiště.",
"Lagerpladsen er ved at være slut? Lær APK's opbygning og 5 praktiske måder at reducere filstørrelse og frigøre plads.",
"Der Speicherplatz wird knapp? Lernen Sie die APK-Struktur und 5 praktische Methoden zur Größenreduzierung und Speicherfreigabe.",
"Ο αποθηκευτικός χώρος τελειώνει; Μάθετε τη δομή APK και 5 πρακτικούς τρόπους μείωσης μεγέθους και απελευθέρωσης χώρου.",
"¿Se acaba el almacenamiento? Conoce la estructura del APK y 5 formas prácticas de reducir su tamaño y liberar espacio.",
"فضای ذخیره‌سازی در حال اتمام؟ ساختار APK را بشناسید و ۵ روش عملی برای کاهش حجم و آزادسازی فضا بیاموزید.",
"Tallennustila loppuu? Opi APK:n rakenne ja 5 käytännöllistä tapaa pienentää tiedostokokoa ja vapauttaa tilaa.",
"Le stockage s'épuise ? Découvrez la structure d'un APK et 5 méthodes pratiques pour réduire sa taille et libérer de l'espace.",
"האחסון אוזל? למדו על מבנה APK ו-5 דרכים מעשיות להקטנת גודל הקובץ ולפינוי מקום.",
"फोन की स्टोरेज खत्म हो रही है? APK की संरचना समझें और फ़ाइल का आकार घटाने व जगह खाली करने के 5 व्यावहारिक तरीके।",
"Fogy a tárhely? Ismerje meg az APK szerkezetét és 5 gyakorlati módszert a fájlméret csökkentésére és hely felszabadítására.",
"Penyimpanan hampir penuh? Pelajari struktur APK dan 5 cara praktis untuk mengurangi ukuran file dan membebaskan ruang.",
"Lo spazio di archiviazione scarseggia? Scopri la struttura degli APK e 5 metodi pratici per ridurne le dimensioni e liberare spazio.",
"휴대폰 저장 공간이 부족하신가요? APK 구조를 이해하고 파일 크기를 줄이며 공간을 확보하는 5가지 실용적인 방법을 알아보세요.",
"Storan hampir penuh? Pelajari struktur APK dan 5 cara praktikal untuk mengurangkan saiz fail dan membebaskan ruang.",
"Lagringsplassen går tom? Lær APK-strukturen og 5 praktiske måter å redusere filstørrelsen og frigjøre plass.",
"De opslag raakt vol? Leer de APK-structuur en 5 praktische manieren om de bestandsgrootte te verkleinen en ruimte vrij te maken.",
"Kończy się miejsce? Poznaj strukturę APK i 5 praktycznych sposobów na zmniejszenie rozmiaru pliku i zwolnienie przestrzeni.",
"O armazenamento está acabando? Conheça a estrutura do APK e 5 maneiras práticas de reduzir o tamanho do arquivo e liberar espaço.",
"Stocarea se apropie de limită? Aflați structura APK și 5 metode practice pentru reducerea dimensiunii și eliberarea spațiului.",
"Заканчивается место? Узнайте структуру APK и 5 практических способов уменьшения размера файла и освобождения пространства.",
"Lagringsutrymmet börjar ta slut? Lär dig APK-strukturen och 5 praktiska sätt att minska filstorleken och frigöra utrymme.",
"พื้นที่จัดเก็บใกล้เต็มแล้ว? เรียนรู้โครงสร้าง APK และ 5 วิธีปฏิบัติในการลดขนาดไฟล์และเพิ่มพื้นที่ว่าง",
"Nauubos na ang storage? Alamin ang istruktura ng APK at 5 praktikal na paraan upang bawasan ang laki ng file at magkaroon ng espasyo.",
"Depolama alanı mı bitiyor? APK yapısını öğrenin ve dosya boyutunu küçültüp alan açmak için 5 pratik yöntem.",
"Місце закінчується? Дізнайтеся структуру APK та 5 практичних способів зменшення розміру файлу та звільнення простору.",
"فون کی سٹوریج ختم ہو رہی ہے؟ APK کی ساخت سمجھیں اور فائل کا سائز کم کرنے اور جگہ خالی کرنے کے 5 عملی طریقے۔",
"Bộ nhớ sắp đầy? Tìm hiểu cấu trúc APK và 5 cách thực tế để giảm kích thước tệp và giải phóng không gian."]);

const TG2 = LV([['حجم APK','توفير المساحة','تحسين'],['APK সাইজ','স্টোরেজ অপ্টিমাইজ','স্পেস ক্লিনিং'],
['Velikost APK','Optimalizace úložiště','Čištění'],['APK-størrelse','Opbevaringsoptimering','Oprydning'],
['APK-Größe','Speicheroptimierung','Bereinigung'],['Μέγεθος APK','Βελτιστοποίηση αποθήκευσης','Καθαρισμός'],
['Tamaño APK','Optimización de almacenamiento','Limpieza'],['حجم APK','بهینه‌سازی ذخیره‌سازی','تمیزکاری'],
['APK-koko','Tallennusoptimointi','Siivous'],['Taille APK','Optimisation du stockage','Nettoyage'],
['גודל APK','אופטימיזציית אחסון','ניקוי'],['APK आकार','स्टोरेज ऑप्टिमाइज़ेशन','सफाई'],
['APK-méret','Tárhely optimalizálás','Tisztítás'],['Ukuran APK','Optimasi Penyimpanan','Pembersihan'],
['Dimensione APK','Ottimizzazione archiviazione','Pulizia'],['APK 크기','저장 공간 최적화','정리'],
['Saiz APK','Pengoptimuman Storan','Pembersihan'],['APK-størrelse','Lagringsoptimalisering','Rydding'],
['APK-grootte','Opslagoptimalisatie','Opschonen'],['Rozmiar APK','Optymalizacja przechowywania','Czyszczenie'],
['Tamanho APK','Otimização de armazenamento','Limpeza'],['Dimensiune APK','Optimizare stocare','Curățare'],
['Размер APK','Оптимизация хранилища','Очистка'],['APK-storlek','Lagringsoptimering','Rengöring'],
['ขนาด APK','การเพิ่มพื้นที่จัดเก็บ','การทำความสะอาด'],['Laki ng APK','Pag-optimize ng Storage','Paglilinis'],
['APK Boyutu','Depolama Optimizasyonu','Temizlik'],['Розмір APK','Оптимізація сховища','Очищення'],
['APK سائز','سٹوریج آپٹیمائزیشن','صفائی'],['Kích thước APK','Tối ưu hóa bộ nhớ','Dọn dẹp']]);

// ========== INJECT ==========
function inject(fp, text) {
  let c = readFileSync(fp, 'utf8');
  const idx = c.search(/^\];/m);
  if (idx < 0) return false;
  writeFileSync(fp, c.slice(0, idx) + '\n  // NEW ARTICLES\n' + text + '\n' + c.slice(idx), 'utf8');
  return true;
}

// ========== CTA ==========
const CTA_H = { ar:'هل تريد تنزيل APK بأمان؟',bn:'নিরাপদে APK ডাউনলোড করতে চান?',cs:'Chcete stáhnout APK bezpečně?',
da:'Vil du downloade APK sikkert?',de:'Möchten Sie APK sicher herunterladen?',el:'Θέλετε να κατεβάσετε APK με ασφάλεια;',
es:'¿Quieres descargar APK de forma segura?',fa:'می‌خواهید APK را با امنیت دانلود کنید؟',fi:'Haluatko ladata APK:n turvallisesti?',
fr:'Vous voulez télécharger un APK en toute sécurité ?',he:'רוצה להוריד APK בבטחה?',
hi:'सुरक्षित रूप से APK डाउनलोड करना चाहते हैं?',hu:'Szeretne APK-t biztonságosan letölteni?',
id:'Ingin mengunduh APK dengan aman?',it:'Vuoi scaricare APK in sicurezza?',ko:'안전하게 APK를 다운로드하시겠습니까?',
ms:'Mahu memuat turun APK dengan selamat?',nb:'Vil du laste ned APK trygt?',nl:'Wilt u veilig APK downloaden?',
pl:'Chcesz bezpiecznie pobrać APK?',pt:'Quer baixar APK com segurança?',ro:'Vrei să descarci APK în siguranță?',
ru:'Хотите безопасно скачать APK?',sv:'Vill du ladda ner APK säkert?',th:'ต้องการดาวน์โหลด APK อย่างปลอดภัย?',
tl:'Gusto mong mag-download ng APK nang ligtas?',tr:"APK'yı güvenle indirmek ister misiniz?",
uk:'Хочете безпечно завантажити APK?',ur:'محفوظ طریقے سے APK ڈاؤن لوڈ کرنا چاہتے ہیں?',vi:'Bạn muốn tải APK an toàn?'};

const CTA_B = { ar:'قم بلصق رابط Google Play واحصل على ملف APK الأصلي في ثوانٍ.',
bn:'Google Play লিংক পেস্ট করুন এবং সেকেন্ডের মধ্যে আসল APK পান।',
cs:'Vložte odkaz z Google Play a získejte originální APK během pár sekund.',
da:'Indsæt et Google Play-link og få den originale APK på få sekunder.',
de:'Fügen Sie einen Google Play-Link ein und erhalten Sie in Sekunden die originale APK.',
el:'Επικολλήστε έναν σύνδεσμο Google Play και λάβετε το αυθεντικό APK σε δευτερόλεπτα.',
es:'Pega un enlace de Google Play y obtén el APK original en segundos.',
fa:'یک لینک Google Play را Paste کنید و APK اصلی را در چند ثانیه دریافت کنید.',
fi:'Liitä Google Play -linkki ja saat alkuperäisen APK:n sekunneissa.',
fr:"Collez un lien Google Play et obtenez l'APK d'origine en quelques secondes.",
he:'הדבק קישור מ-Google Play וקבל את ה-APK המקורי תוך שניות.',
hi:'Google Play लिंक पेस्ट करें और सेकंडों में मूल APK प्राप्त करें।',
hu:'Illesszen be egy Google Play-linket, és kapja meg az eredeti APK-t másodpercek alatt.',
id:'Tempel tautan Google Play dan dapatkan APK asli dalam hitungan detik.',
it:"Incolla un link di Google Play e ottieni l'APK originale in pochi secondi.",
ko:'Google Play 링크를 붙여넣고 몇 초 만에 원본 APK를 받으세요.',
ms:'Tampal pautan Google Play dan dapatkan APK asal dalam beberapa saat.',
nb:'Lim inn en Google Play-lenke og få den originale APK-en på sekunder.',
nl:'Plak een Google Play-link en ontvang de originele APK binnen enkele seconden.',
pl:'Wklej link z Google Play i otrzymaj oryginalny APK w kilka sekund.',
pt:'Cole um link do Google Play e obtenha o APK original em segundos.',
ro:'Lipește un link Google Play și obține APK-ul original în câteva secunde.',
ru:'Вставьте ссылку Google Play и получите оригинальный APK за секунды.',
sv:'Klistra in en Google Play-länk och få den ursprungliga APK-filen på några sekunder.',
th:'วางลิงก์ Google Play และรับ APK ต้นฉบับภายในไม่กี่วินาที',
tl:'I-paste ang isang link ng Google Play at kunin ang orihinal na APK sa ilang segundo.',
tr:"Bir Google Play bağlantısı yapıştırın ve saniyeler içinde orijinal APK'yı alın.",
uk:'Вставте посилання Google Play та отримайте оригінальний APK за лічені секунди.',
ur:'Google Play لنک پیسٹ کریں اور سیکنڈوں میں اصلی APK حاصل کریں۔',
vi:'Dán liên kết Google Play và nhận APK gốc trong vài giây.'};

const CTA_BTN = { ar:'جرب gptoapk.com الآن',bn:'এখন gptoapk.com ব্যবহার করুন',cs:'Vyzkoušejte gptoapk.com nyní',
da:'Prøv gptoapk.com nu',de:'Jetzt gptoapk.com ausprobieren',el:'Δοκιμάστε το gptoapk.com τώρα',
es:'Prueba gptoapk.com ahora',fa:'اکنون gptoapk.com را امتحان کنید',fi:'Kokeile gptoapk.com nyt',
fr:'Essayez gptoapk.com maintenant',he:'נסה את gptoapk.com עכשיו',hi:'अभी gptoapk.com आज़माएं',
hu:'Próbálja ki a gptoapk.com-ot most',id:'Coba gptoapk.com sekarang',it:'Prova gptoapk.com ora',
ko:'지금 gptoapk.com 사용해보기',ms:'Cuba gptoapk.com sekarang',nb:'Prøv gptoapk.com nå',
nl:'Probeer gptoapk.com nu',pl:'Wypróbuj gptoapk.com teraz',pt:'Experimente gptoapk.com agora',
ro:'Încearcă gptoapk.com acum',ru:'Попробуйте gptoapk.com сейчас',sv:'Prova gptoapk.com nu',
th:'ลองใช้ gptoapk.com ตอนนี้',tl:'Subukan ang gptoapk.com ngayon',tr:"Şimdi gptoapk.com'u dene",
uk:'Спробуйте gptoapk.com зараз',ur:'ابھی gptoapk.com آزمائیں',vi:'Dùng thử gptoapk.com ngay'};

function makeCTA(loc) {
  return [
    '<div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">',
    `          <p className="font-semibold text-lg mb-2">${esc(CTA_H[loc])}</p>`,
    `          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — ${esc(CTA_B[loc])}</p>`,
    '          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">',
    `            ${esc(CTA_BTN[loc])}`,
    '            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">',
    '              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />',
    '            </svg>',
    '          </a>',
    '        </div>',
  ].join('\n          ');
}