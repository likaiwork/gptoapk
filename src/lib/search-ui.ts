import type { SiteLocale } from "./site-locales";

export type SearchUiStrings = {
  emptyError: string;
  placeholder: string;
  button: string;
  processing: string;
};

/**
 * Localized SearchBox copy (path-based locale). Server errors from the API may still be English.
 */
export const searchUi: Record<SiteLocale, SearchUiStrings> = {
  en: {
    emptyError: "Please enter a valid Google Play link or package name.",
    placeholder: "Paste Google Play URL or App ID (e.g. com.example.app)",
    button: "Generate link",
    processing: "Generating...",
  },
  zh: {
    emptyError: "请输入有效的 Google Play 链接或包名。",
    placeholder: "粘贴 Google Play 链接或 App ID（如 com.example.app）",
    button: "生成下载链接",
    processing: "生成中...",
  },
  ja: {
    emptyError: "有効な Google Play リンクまたはパッケージ名を入力してください。",
    placeholder: "Google Play の URL またはアプリ ID を貼り付け（例: com.example.app）",
    button: "リンクを生成",
    processing: "生成中...",
  },
  pt: {
    emptyError: "Insira um link válido do Google Play ou um nome de pacote.",
    placeholder: "Cole a URL do Google Play ou o ID do app (ex.: com.example.app)",
    button: "Gerar link",
    processing: "Gerando...",
  },
  es: {
    emptyError: "Introduce un enlace válido de Google Play o un nombre de paquete.",
    placeholder: "Pega la URL de Google Play o el ID de la app (p. ej. com.example.app)",
    button: "Generar enlace",
    processing: "Generando...",
  },
  ru: {
    emptyError: "Введите действительную ссылку Google Play или имя пакета.",
    placeholder: "Вставьте URL Google Play или ID приложения (например com.example.app)",
    button: "Создать ссылку",
    processing: "Создание...",
  },
  id: {
    emptyError: "Masukkan tautan Google Play yang valid atau nama paket.",
    placeholder: "Tempel URL Google Play atau ID aplikasi (mis. com.example.app)",
    button: "Buat tautan",
    processing: "Membuat...",
  },
  hi: {
    emptyError: "कृपया मान्य Google Play लिंक या पैकेज नाम दर्ज करें।",
    placeholder: "Google Play URL या ऐप ID चिपकाएँ (जैसे com.example.app)",
    button: "लिंक बनाएँ",
    processing: "बना रहे हैं...",
  },
  ko: {
    emptyError: "유효한 Google Play 링크 또는 패키지 이름을 입력하세요.",
    placeholder: "Google Play URL 또는 앱 ID 붙여넣기 (예: com.example.app)",
    button: "링크 만들기",
    processing: "생성 중...",
  },
  fr: {
    emptyError: "Saisissez un lien Google Play valide ou un nom de package.",
    placeholder: "Collez l’URL Google Play ou l’ID d’app (ex. com.example.app)",
    button: "Générer le lien",
    processing: "Génération...",
  },
  de: {
    emptyError: "Bitte geben Sie einen gültigen Google-Play-Link oder Paketnamen ein.",
    placeholder: "Google-Play-URL oder App-ID einfügen (z. B. com.example.app)",
    button: "Link erzeugen",
    processing: "Wird erstellt...",
  },
  vi: {
    emptyError: "Vui lòng nhập liên kết Google Play hợp lệ hoặc tên gói.",
    placeholder: "Dán URL Google Play hoặc ID ứng dụng (vd: com.example.app)",
    button: "Tạo liên kết",
    processing: "Đang tạo...",
  },
  ar: {
    emptyError: "يرجى إدخال رابط Google Play صالح أو اسم الحزمة.",
    placeholder: "الصق رابط Google Play أو معرف التطبيق (مثل com.example.app)",
    button: "إنشاء الرابط",
    processing: "جارٍ الإنشاء...",
  },
  tr: {
    emptyError: "Lütfen geçerli bir Google Play bağlantısı veya paket adı girin.",
    placeholder: "Google Play URL’sini veya uygulama kimliğini yapıştırın (ör. com.example.app)",
    button: "Bağlantı oluştur",
    processing: "Oluşturuluyor...",
  },
  it: {
    emptyError: "Inserisci un link Google Play valido o un nome pacchetto.",
    placeholder: "Incolla URL Google Play o ID app (es. com.example.app)",
    button: "Genera link",
    processing: "Generazione...",
  },
  nl: {
    emptyError: "Voer een geldige Google Play-link of pakketnaam in.",
    placeholder: "Plak Google Play-URL of app-ID (bijv. com.example.app)",
    button: "Link maken",
    processing: "Bezig met maken...",
  },
  pl: {
    emptyError: "Podaj prawidłowy link Google Play lub nazwę pakietu.",
    placeholder: "Wklej URL Google Play lub ID aplikacji (np. com.example.app)",
    button: "Generuj link",
    processing: "Generowanie...",
  },
  uk: {
    emptyError: "Введіть дійсне посилання Google Play або ім’я пакета.",
    placeholder: "Вставте URL Google Play або ID застосунку (наприклад com.example.app)",
    button: "Створити посилання",
    processing: "Створення...",
  },
  th: {
    emptyError: "โปรดใส่ลิงก์ Google Play ที่ถูกต้องหรือชื่อแพ็กเกจ",
    placeholder: "วาง URL Google Play หรือ App ID (เช่น com.example.app)",
    button: "สร้างลิงก์",
    processing: "กำลังสร้าง...",
  },
  ms: {
    emptyError: "Sila masukkan pautan Google Play yang sah atau nama pakej.",
    placeholder: "Tampal URL Google Play atau ID apl (cth. com.example.app)",
    button: "Jana pautan",
    processing: "Menjana...",
  },
  sv: {
    emptyError: "Ange en giltig Google Play-länk eller paketnamn.",
    placeholder: "Klistra in Google Play-URL eller app-ID (t.ex. com.example.app)",
    button: "Skapa länk",
    processing: "Skapar...",
  },
  da: {
    emptyError: "Indtast et gyldigt Google Play-link eller pakkenavn.",
    placeholder: "Indsæt Google Play-URL eller app-ID (fx com.example.app)",
    button: "Opret link",
    processing: "Opretter...",
  },
  fi: {
    emptyError: "Anna kelvollinen Google Play -linkki tai paketin nimi.",
    placeholder: "Liitä Google Play -URL tai sovellustunnus (esim. com.example.app)",
    button: "Luo linkki",
    processing: "Luodaan...",
  },
  nb: {
    emptyError: "Skriv inn en gyldig Google Play-lenke eller pakkenavn.",
    placeholder: "Lim inn Google Play-URL eller app-ID (f.eks. com.example.app)",
    button: "Generer lenke",
    processing: "Genererer...",
  },
  cs: {
    emptyError: "Zadejte platný odkaz Google Play nebo název balíčku.",
    placeholder: "Vložte URL Google Play nebo ID aplikace (např. com.example.app)",
    button: "Vygenerovat odkaz",
    processing: "Generuji...",
  },
  ro: {
    emptyError: "Introduceți un link Google Play valid sau numele pachetului.",
    placeholder: "Lipiți URL-ul Google Play sau ID-ul aplicației (ex. com.example.app)",
    button: "Generează link",
    processing: "Se generează...",
  },
  el: {
    emptyError: "Εισαγάγετε έγκυρο σύνδεσμο Google Play ή όνομα πακέτου.",
    placeholder: "Επικολλήστε URL Google Play ή ID εφαρμογής (π.χ. com.example.app)",
    button: "Δημιουργία συνδέσμου",
    processing: "Δημιουργία...",
  },
  hu: {
    emptyError: "Adj meg érvényes Google Play-linket vagy csomagnevet.",
    placeholder: "Illesszd be a Google Play URL-t vagy alkalmazásazonosítót (pl. com.example.app)",
    button: "Link létrehozása",
    processing: "Létrehozás...",
  },
  bn: {
    emptyError: "একটি বৈধ Google Play লিংক বা প্যাকেজ নাম লিখুন।",
    placeholder: "Google Play URL বা অ্যাপ আইডি পেস্ট করুন (যেমন com.example.app)",
    button: "লিংক তৈরি করুন",
    processing: "তৈরি হচ্ছে...",
  },
  tl: {
    emptyError: "Maglagay ng wastong Google Play link o package name.",
    placeholder: "I-paste ang Google Play URL o App ID (hal. com.example.app)",
    button: "Gumawa ng link",
    processing: "Gumagawa...",
  },
  he: {
    emptyError: "נא להזין קישור Google Play תקף או שם חבילה.",
    placeholder: "הדבקת כתובת Google Play או מזהה אפליקציה (למשל com.example.app)",
    button: "יצירת קישור",
    processing: "יוצר...",
  },
  fa: {
    emptyError: "لینک معتبر Google Play یا نام بسته را وارد کنید.",
    placeholder: "URL گوگل‌پلی یا شناسهٔ اپ را بچسبانید (مثلاً com.example.app)",
    button: "ایجاد لینک",
    processing: "در حال ایجاد...",
  },
  ur: {
    emptyError: "درست Google Play لنک یا پیکج نام درج کریں۔",
    placeholder: "Google Play URL یا ایپ ID چسپاں کریں (مثلاً com.example.app)",
    button: "لنک بنائیں",
    processing: "بن رہا ہے...",
  },
};
