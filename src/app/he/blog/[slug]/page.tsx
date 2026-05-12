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

const hePosts: BlogPost[] = [
  {
    slug: "how-to-download-apk-from-google-play",
    title: "כיצד להוריד APK מ־Google Play: מדריך מלא (2026)",
    description:
      "שיטה שלב אחר שלב לחילוץ קובץ APK מחנות Google Play. מספר דרכים — כלי אינטרנט, ADB, ושיטות עבודה מומלצות להורדה בטוחה.",
    date: "2026-05-11",
    readTime: "6 דקות קריאה",
    tags: ["הורדת APK", "Google Play", "מדריך"],
    content: (
      <>
        <p>
          רוצה להוריד קובץ APK מחנות Google Play אבל לא יודע מאיפה להתחיל? בין אם אתה מפתח Android שבודק build, רוצה לשמר גרסה ישנה של אפליקציה, או סתם צריך APK להתקנה ללא אינטרנט — הגעת למקום הנכון.
        </p>

        <h2>מהו קובץ APK?</h2>
        <p>
          APK (Android Package Kit) הוא פורמט הקבצים הסטנדרטי שמערכת Android משתמשת בו להפצה והתקנה של יישומים. כשאתה מוריד אפליקציה מחנות Google Play, המערכת מורידה ומתקינה את ה־APK באופן אוטומטי. אבל לפעמים אנחנו צריכים את קובץ ה־APK המקורי — וזה הרגע שבו כלי הורדת APK מ־Google Play נכנס לתמונה.
        </p>

        <h2>למה להוריד APK מ־Google Play?</h2>
        <ul>
          <li><strong>בדיקת אפליקציות וניפוי שגיאות</strong> — מפתחים צריכים לבדוק APK במכשירים שונים</li>
          <li><strong>התקנה לא מקוונת</strong> — שתף והתקן אפליקציות ללא חיבור לאינטרנט</li>
          <li><strong>חזרה לגרסה קודמת</strong> — שמור גרסה ישנה למקרה שהחדשה לא טובה</li>
          <li><strong>Side loading</strong> — התקנת אפליקציות במכשירים ללא שירותי Google Play</li>
          <li><strong>בדיקת אבטחה</strong> — חוקרי אבטחה מנתחים מבנה APK</li>
        </ul>

        <h2>שיטה 1: השתמש ב־gptoapk.com (הפשוטה ביותר)</h2>
        <p>
          הדרך המהירה ביותר היא להשתמש בכלי חילוץ APK מקוון כמו <a href="https://gptoapk.com">gptoapk.com</a>. השלבים:
        </p>
        <ol>
          <li>פתח את חנות Google Play ומצא את האפליקציה הרצויה</li>
          <li>העתק את הקישור לדף הפרטים של האפליקציה (לדוגמה <code>https://play.google.com/store/apps/details?id=com.example.app</code>)</li>
          <li>או העתק ישירות את שם החבילה (לדוגמה <code>com.example.app</code>)</li>
          <li>הדבק את הקישור בתיבת הקלט של <a href="https://gptoapk.com">gptoapk.com</a></li>
          <li>לחץ על הכפתור "צור קישור"</li>
          <li>קישור ההורדה נוצר מיידית — לחץ והורד</li>
        </ol>
        <p><strong>ללא הרשמה, ללא קפטצ'ה, לגמרי בחינם.</strong></p>

        <h2>שיטה 2: השתמש ב־ADB (למפתחים)</h2>
        <p>אם יש לך מכשיר מושרש (Rooted) או אמולטור, תוכל לחלץ APK באמצעות ADB:</p>
        <pre><code>{`// 1. בדוק מכשירים מחוברים
adb devices

// 2. מצא שם חבילה של אפליקציה ספציפית
adb shell pm list packages | grep [שם אפליקציה]

// 3. מצא נתיב APK
adb shell pm path [שם חבילה]

// 4. משוך את קובץ ה־APK
adb pull [הנתיב שהתקבל למעלה]`}</code></pre>

        <h2>שיטה 3: אתרי מראה APK של צד שלישי</h2>
        <p>
          אתרים כמו APKMirror ו־APKPure מציעים הורדות APK, אבל הם מסתמכים על קבצים שהועלו על ידי משתמשים. <a href="https://gptoapk.com">gptoapk.com</a> מביא קבצים ישירות משרתי Google, כך שאתה תמיד מקבל את הגרסה המקורית.
        </p>

        <h2>האם הורדת APK באינטרנט בטוחה?</h2>
        <p><strong>השימוש ב־gptoapk.com בטוח לחלוטין.</strong> הסיבות:</p>
        <ul>
          <li>הקבצים מגיעים <strong>ישירות מ־CDN של Google</strong> — ללא גורם מתווך</li>
          <li>100% קבצים מקוריים עם חתימה מאומתת</li>
          <li>אף קובץ לא נשמר על השרתים שלנו</li>
          <li>בלתי אפשרי להחדיר קוד זדוני — אנחנו לעולם לא נוגעים בקובץ</li>
        </ul>

        <h2>טיפים להתקנת APK בטוחה</h2>
        <ol>
          <li>הפעל "אפשר התקנה ממקורות לא ידועים" בהגדרות המכשיר</li>
          <li>בדוק את ההרשאות שהאפליקציה מבקשת — האם הן הגיוניות?</li>
          <li>במידת האפשר, השווה חתימת SHA-256 לאימות שלמות הקובץ</li>
          <li>השתמש רק בכלי הורדת APK מהימנים, הימנע מאתרים לא מוכרים</li>
        </ol>

        <h2>שאלות נפוצות</h2>
        <p><strong>האם הורדת APK בחינם?</strong><br/>כן, <a href="https://gptoapk.com">gptoapk.com</a> לגמרי בחינם.</p>
        <p><strong>אפשר להוריד גם אפליקציות בתשלום?</strong><br/>כן, אבל האפליקציה חייבת להיות כבר נרכשה בחשבון Google שלך.</p>
        <p><strong>האם זה עובד בטלפון?</strong><br/>בהחלט. פתח את <a href="https://gptoapk.com">gptoapk.com</a> בדפדפן הטלפון, הדבק קישור והורד.</p>
        <p><strong>האם הורדת APK מ־Google Play חוקית?</strong><br/>שימוש אישי ופיתוח אפליקציות הוא חוקי לחלוטין. אבל הפצה מחדש של אפליקציות בתשלום אינה חוקית.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">הורד APK עכשיו</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — הדבק קישור מ־Google Play וקבל APK תוך שניות.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            מעבר להורדת APK
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
    title: "מהו קובץ APK? מדריך מלא על קבצי חבילת Android",
    description:
      "כל מה שצריך לדעת על קבצי APK — מה יש בפנים, איך הם עובדים, APK לעומת AAB, ולמה שלמות הקובץ חשובה לאבטחה.",
    date: "2026-05-11",
    readTime: "7 דקות קריאה",
    tags: ["APK", "Android", "מדריך למתחילים"],
    content: (
      <>
        <p>
          האם אי פעם תהית מה באמת יש בתוך קובץ APK? בואו נגלה יחד את סודות חבילת ההתקנה של Android.
        </p>

        <h2>דוגמה פשוטה</h2>
        <p>
          חשבו על אפליקציית Android כספר. חנות Google Play היא הספרייה, קובץ ה־APK הוא העותק הדיגיטלי המלא, וההתקנה בטלפון היא כמו שמירת הספר במכשיר שלכם. בקובץ APK ארוז כל מה שצריך כדי להפעיל את האפליקציה.
        </p>

        <h2>מה יש בתוך קובץ APK?</h2>
        <p>אם תשנו את סיומת ה־APK ל־<code>.zip</code> ותפתחו אותו, תראו את הקבצים הבאים:</p>
        <pre><code>{`app.apk/
├── AndroidManifest.xml    # זהות האפליקציה (הרשאות, רכיבים)
├── classes.dex            # קוד Java/Kotlin מהודר
├── res/                   # משאבים (תמונות, פריסות, מחרוזות)
├── assets/                # משאבים גולמיים (גופנים, צלילים, מסדי נתונים)
├── lib/                   # ספריות מקוריות (קוד C/C++)
│   ├── arm64-v8a/
│   ├── armeabi-v7a/
│   └── x86_64/
├── META-INF/              # חתימה דיגיטלית (אימות שלמות)
└── resources.arsc         # אינדקס משאבים מהודר`}</code></pre>

        <h2>מה ההבדל בין APK ל־AAB?</h2>
        <p>
          משנת 2021, Google Play Store מחייב אפליקציות חדשות להשתמש בפורמט AAB (Android App Bundle) לפרסום. AAB הוא פורמט פרסום — Google Play יוצר APK מותאם לפי המכשיר שלך. כאשר אתה משתמש בכלי כמו <a href="https://gptoapk.com">gptoapk.com</a>, Google Play יוצר APK תואם מ־AAB באופן מיידי.
        </p>

        <h2>למה שלמות APK חשובה</h2>
        <p>
          לכל קובץ APK יש חתימה מוצפנת בתיקיית <code>META-INF</code>. החתימה מוכיחה שהקובץ לא שונה. זו הסיבה שחשוב להשתמש בכלי שמקבל קבצים ישירות מ־Google, כמו <a href="https://gptoapk.com">gptoapk.com</a> — שרשרת החתימה נשמרת שלמה.
        </p>

        <h2>שימושים חוקיים בקבצי APK</h2>
        <ul>
          <li>גיבוי אפליקציות שאתה אוהב</li>
          <li>בדיקת גרסאות שונות במהלך הפיתוח</li>
          <li>התקנת אפליקציות במכשירים ללא Google Play</li>
          <li>שיתוף אפליקציות עם חברים שאין להם גישה ל־Play Store</li>
        </ul>

        <h2>האם כל קבצי APK בטוחים?</h2>
        <p>
          לא. APK שהורדו מאתרי צד שלישי עלולים להכיל תוכנות זדוניות או עוקבים. השתמש תמיד במקורות שמביאים APK מקורי וחתום ישירות מ־CDN של Google. <a href="https://gptoapk.com">gptoapk.com</a> מבטיח שאתה מקבל בדיוק את מה ש־Google Play היה מתקין — ללא שינויים.
        </p>

        <h2>שאלות נפוצות על קבצי APK</h2>
        <p><strong>האם אפשר להמיר APK ל־.zip?</strong><br/>כן, פשוט שנה את הסיומת — אבל זה לא יהפוך אותו לניתן להתקנה. השתמש בשיטה זו רק לצפייה בתוכן.</p>
        <p><strong>האם כל APK עובד בכל מכשירי Android?</strong><br/>לא בהכרח. ה־APK חייב להיות תואם לארכיטקטורת המכשיר (ARM, x86) ולגרסת Android.</p>
        <p><strong>מה ההבדל בין APK ל־XAPK?</strong><br/>XAPK הוא פורמט מורחב שכולל נתוני OBB נוספים (בדרך כלל למשחקים). <a href="https://gptoapk.com">gptoapk.com</a> מספק APK סטנדרטי שניתן להתקנה ישירה.</p>
        <p><strong>האם אפשר לראות קוד מקור מתוך APK?</strong><br/>אפשר לבצע דקומפליציה של <code>classes.dex</code>, אבל זה לא יהיה כמו קוד המקור — רוב הקוד מוסתר (Obfuscated).</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">הורד APK עכשיו</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — הדבק קישור מ־Google Play וקבל APK תוך שניות.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            מעבר להורדת APK
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
    title: "אתרים להורדת APK בטוחה: המקורות האמינים ביותר (2026)",
    description:
      "מדריך לאתרים המומלצים ביותר להורדת APK בטוחה. gptoapk.com, APKMirror, APKPure, F-Droid, GitHub Releases — כולל טיפים לאימות קבצים.",
    date: "2026-05-11",
    readTime: "8 דקות קריאה",
    tags: ["APK בטוח", "הורדת APK", "אבטחה"],
    content: (
      <>
        <p>
          הורדת קבצי APK ממקורות לא רשמיים עלולה להיות מסוכנת — תוכנות זדוניות, עוקבים ושינויים זדוניים בקוד הם רק חלק מהסכנות.
          במדריך זה נסקור את המקורות הבטוחים ביותר להורדת APK, עם דגש על אימות קבצים ואבטחת מידע.
        </p>

        <h2>למה צריך מקורות אמינים?</h2>
        <p>
          Google Play היא החנות הרשמית של Android, אך לעיתים היא לא האפשרות היחידה או הטובה ביותר:
        </p>
        <ul>
          <li><strong>Google Play לא זמין</strong> — במכשירים סיניים או ללא שירותי Google</li>
          <li><strong>חזרה לגרסה קודמת</strong> — גרסה חדשה עלולה להכיל באגים או שינויים לא רצויים</li>
          <li><strong>אי־תאימות מכשיר</strong> — Google Play עשוי לחסום התקנה למרות שהאפליקציה עובדת</li>
          <li><strong>שמירת APK לגיבוי</strong> — גיבוי מקומי של אפליקציות שאתם אוהבים</li>
        </ul>

        <h2>1. gptoapk.com — המומלץ ביותר (בטוח לחלוטין)</h2>
        <p>
          <a href="https://gptoapk.com">gptoapk.com</a> הוא השירות הבטוח ביותר להורדת APK. הסיבה פשוטה: הוא מושך קבצי APK ישירות מ־CDN של Google Play Store, מבלי לשנות אותם בשום צורה. כל קובץ מגיע עם החתימה הדיגיטלית המקורית של המפתח, מה שמבטיח שאתם מתקינים בדיוק את מה ש־Google Play היה מתקין.
        </p>
        <p>
          היתרונות: ללא הרשמה, ללא קפטצ'ה, תומך בכל האפליקציות הציבוריות, והכי חשוב — 100% קבצים מקוריים.
        </p>

        <h2>2. APKMirror</h2>
        <p>
          APKMirror הוא אחד האתרים הוותיקים והאמינים להורדת APK. הוא שייך לחברת UpToDown, ובודק כל קובץ באמצעות חתימה דיגיטלית — רק קבצים עם חתימה תואמת מתפרסמים. האתר מציע גרסאות רבות של אותה אפליקציה, וכולל מידע מפורט על גרסה וגודל קובץ.
        </p>

        <h2>3. APKPure</h2>
        <p>
          APKPure הוא חנות APK של צד שלישי ותיקה. האתר מציע מגוון רחב של אפליקציות ומשחקים, כולל גרסאות ישנות. עם זאת, חשוב לדעת ש־APKPure אינו מביא קבצים ישירות מ־Google — הוא מאחסן אותם בשרתיו, ולכן רמת האמון נמוכה יותר מ־gptoapk.com.
        </p>

        <h2>4. F-Droid</h2>
        <p>
          F-Droid הוא מאגר אפליקציות קוד פתוח. כל האפליקציות ב־F-Droid הן חינמיות וקוד המקור שלהן זמין לציבור. זהו מקור מצוין לאפליקציות ששמות דגש על פרטיות, אבל לא תמצאו שם אפליקציות מסחריות כמו וואטסאפ או טיקטוק.
        </p>

        <h2>5. GitHub Releases</h2>
        <p>
          מפתחים רבים מפרסמים את קבצי ה־APK שלהם ישירות ב־GitHub Releases. זהו המקור הבטוח ביותר מכיוון שהקובץ מגיע ישירות מהמפתח. חפשו פרויקטים של אפליקציות קוד פתוח כמו NewPipe, Signal, או Nextcloud.
        </p>

        <h2>איך לבדוק ש־APK בטוח?</h2>
        <p>גם ממקור אמין, כדאי לבדוק את הקובץ לפני ההתקנה:</p>
        <ol>
          <li><strong>בדיקת חתימה דיגיטלית</strong> — השתמשו בפקודה:
            <pre><code>{`// בדיקת חתימת APK
keytool -printcert -jarfile app.apk`}</code></pre>
          </li>
          <li><strong>סריקה ב־VirusTotal</strong> — העלו את הקובץ ל־<a href="https://virustotal.com">VirusTotal.com</a> לבדיקה מול עשרות מנועי אנטי־וירוס</li>
          <li><strong>בדיקת הרשאות</strong> — לפני ההתקנה, סקרו את ההרשאות שהאפליקציה מבקשת. האם מחשבון פנס מבקש גישה לאנשי קשר? זה דגל אדום</li>
          <li><strong>השוואת SHA</strong> — אם למפתח יש hash מאומת, השוו עם ה־hash של הקובץ</li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">הורדת APK בטוחה</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — הדרך הבטוחה ביותר להוריד APK ישירות מ־Google Play.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            קישור להורדת APK
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
    title: "APK לעומת AAB: השוואה מלאה (2026)",
    description:
      "מה ההבדל בין APK ל־AAB? מדריך מקיף שמסביר את המבנה, היתרונות והחסרונות של כל פורמט — וכיצד זה משפיע על המשתמשים.",
    date: "2026-05-11",
    readTime: "8 דקות קריאה",
    tags: ["APK", "AAB", "השוואה"],
    content: (
      <>
        <p>
          מאז 2021, Google Play Store מחייב מפתחים לפרסם אפליקציות בפורמט AAB (Android App Bundle).
          אבל מה זה אומר עבור המשתמש הממוצע? בואו נבין את ההבדלים בין APK ל־AAB.
        </p>

        <h2>מהו קובץ APK?</h2>
        <p>
          APK (Android Package Kit) הוא פורמט ההפצה המסורתי של Android. הוא מכיל את כל מה שהאפליקציה צריכה כדי לפעול במכשיר. מבנה קובץ APK טיפוסי:
        </p>
        <pre><code>{`app.apk/
├── AndroidManifest.xml    // זהות האפליקציה (שם חבילה, הרשאות, רכיבים)
├── classes.dex            // קוד Java/Kotlin מהודר
├── res/                   // משאבים (תמונות, פריסות, מחרוזות תרגום)
├── lib/                   // ספריות מקוריות (C/C++ מותאם לארכיטקטורה)
│   ├── arm64-v8a/
│   ├── armeabi-v7a/
│   └── x86_64/
├── META-INF/              // מידע על חתימה דיגיטלית
└── resources.arsc         // אינדקס משאבים מהודר`}</code></pre>

        <h2>מהו קובץ AAB?</h2>
        <p>
          AAB (Android App Bundle) הוא פורמט פרסום שהוצג על ידי Google. הוא אינו ניתן להתקנה ישירה — במקום זאת, Google Play משתמש בו כדי ליצור APK מותאם אישית לכל מכשיר. ה־AAB מכיל את כל המשאבים של האפליקציה, ו־Google Play בוחר רק את מה שהמכשיר הספציפי צריך.
        </p>

        <h2>השוואה: APK לעומת AAB</h2>
        <ul>
          <li><strong>התקנה ישירה</strong> — APK ניתן להתקנה ישירה; AAB חייב לעבור דרך Google Play</li>
          <li><strong>גודל קובץ</strong> — APK מכיל משאבים לכל המכשירים (גדול יותר); AAB יוצר APK ממוקד (קטן יותר)</li>
          <li><strong>שיתוף</strong> — APK קל לשיתוף; AAB לא ניתן לשיתוף ישיר עם משתמשים אחרים</li>
          <li><strong>תאימות צד שלישי</strong> — APK עובד בכל מקום; AAB תלוי ב־Google Play</li>
        </ul>

        <h2>איך זה משפיע עליכם?</h2>
        <p>
          עבור המשתמש הממוצע, ההבדל העיקרי הוא גודל הקובץ. AAB יוצר APK קטן יותר כי הוא כולל רק את מה שהמכשיר שלכם צריך. אבל אם אתם מורידים ממקורות צד שלישי, אתם עדיין צריכים APK — ו־AAB לא יעבוד.
        </p>
        <p>
          שירותים כמו <a href="https://gptoapk.com">gptoapk.com</a> ממירים AAB ל־APK תואם בשבילכם, כך שאתם תמיד מקבלים קובץ שמיש.
        </p>

        <h2>המרת AAB ל־APK עם bundletool</h2>
        <p>
          למפתחים, ניתן להמיר AAB ל־APK באמצעות הכלי הרשמי bundletool:
        </p>
        <pre><code>{`// המרת AAB ל־APK
java -jar bundletool.jar build-apks --bundle=/path/app.aab --output=/path/app.apks

// חילוץ APK מתוך הארכיון
unzip /path/app.apks -d /path/apk_output/`}</code></pre>

        <h2>שאלות נפוצות</h2>
        <p><strong>האם אפשר להתקין AAB ישירות בטלפון?</strong><br/>לא. AAB הוא פורמט פרסום, לא פורמט התקנה. צריך להמיר אותו ל־APK קודם.</p>
        <p><strong>האם APK הולך להיעלם?</strong><br/>לא לגמרי. Google Play עדיין מייצר APK מותאם מ־AAB. APK יישאר הפורמט להתקנה מקומית ושיתוף.</p>
        <p><strong>האם אפשר להמיר APK ל־AAB?</strong><br/>לא בקלות. AAB דורש קוד מקור ו־Android Studio. מומלץ לשמור גם AAB וגם APK.</p>
        <p><strong>מה עם אבטחה?</strong><br/>גם APK וגם AAB משתמשים באותה מערכת חתימה דיגיטלית. שניהם מאובטחים כל עוד מגיעים ממקור מהימן.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">הורדת APK מ־gptoapk.com</p>
          <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — הדביקו קישור מ־Google Play וקבלו APK תוך שניות.</p>
          <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            להורדת APK
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
  return hePosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = hePosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | gptoapk.com`,
    description: post.description,
    alternates: {
      canonical: `https://gptoapk.com/he/blog/${slug}`,
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
  const post = hePosts.find((p) => p.slug === slug);

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
    url: `https://gptoapk.com/he/blog/${slug}`,
    inLanguage: "he",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/he/blog/${slug}`,
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
          href="/he/blog"
          className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          חזרה לרשימת הבלוג
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
            href="/he/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← חזרה לרשימת הבלוג
          </Link>
        </div>
      </article>
    </>
  );
}
