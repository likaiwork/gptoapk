import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - APK Downloader | gptoapk.com",
  description: "Δωρεάν διαδικτυακό εργαλείο για λήψη αρχείων APK από συνδέσμους Google Play. Επικολλήστε URL ή αναγνωριστικό εφαρμογής και δημιουργήστε σύνδεσμο λήψης.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Τι είναι το gptoapk.com;",
      a: "Το gptoapk.com είναι ένα δωρεάν online εργαλείο που δημιουργεί συνδέσμους λήψης APK απευθείας από το Google Play Store. Επικολλήστε URL Google Play ή όνομα πακέτου και λάβετε άμεσο σύνδεσμο.",
    },
    {
      q: "Είναι δωρεάν;",
      a: "Ναι, εντελώς δωρεάν. Χωρίς εγγραφή, κρυφές χρεώσεις ή premium σχέδια.",
    },
    {
      q: "Πώς λειτουργεί;",
      a: "Όταν επικολλάτε σύνδεσμο Google Play, ο διακομιστής μας λαμβάνει το αρχείο APK από το CDN της Google και σας δίνει σύνδεσμο λήψης. Δεν τροποποιούμε ούτε αποθηκεύουμε αρχεία.",
    },
    {
      q: "Είναι ασφαλής η λήψη από το gptoapk.com;",
      a: "Ναι. Τα αρχεία προέρχονται απευθείας από τους διακομιστές της Google· δεν τα αλλάζουμε, οπότε λαμβάνετε πρωτότυπα APK.",
    },
    {
      q: "Μπορώ να το χρησιμοποιήσω στο κινητό;",
      a: "Ναι. Ανοίξτε το gptoapk.com στον mobile browser και επικολλήστε τον σύνδεσμο — λειτουργεί σε τηλέφωνα και υπολογιστές.",
    },
    {
      q: "Λειτουργεί για επί πληρωμή εφαρμογές;",
      a: "Ναι, αλλά πρέπει να έχετε αγοράσει την εφαρμογή στον λογαριασμό σας Google για να είναι έγκυρος ο σύνδεσμος.",
    },
    {
      q: "Χρειάζεται να εγκαταστήσω λογισμικό ή επεκτάσεις;",
      a: "Όχι. Όλα γίνονται στο πρόγραμμα περιήγησης — χωρίς επιπλέον λήψεις, επεκτάσεις ή πρόσθετα.",
    },
    {
      q: "Μπορώ να το χρησιμοποιήσω από οποιαδήποτε χώρα;",
      a: "Ναι, το gptoapk.com λειτουργεί παγκοσμίως. Ορισμένες εφαρμογές μπορεί να είναι περιορισμένες ανά περιοχή στο Play Store.",
    },
    {
      q: "Ποια είναι η διαφορά APK και AAB;",
      a: "Το APK είναι η μορφή εγκατάστασης για Android. Το AAB είναι η μορφή δημοσίευσης στο Google Play. Παρέχουμε συμβατό APK ακόμη κι όταν η εφαρμογή δημοσιεύεται ως AAB.",
    },
    {
      q: "Γιατί μερικές φορές βλέπω 404;",
      a: "Η εφαρμογή μπορεί να είναι κλειδωμένη ανά περιοχή, να έχει αφαιρεθεί από το Play ή να απαιτεί συγκεκριμένη συσκευή. Για περιορισμούς περιοχής δοκιμάστε VPN.",
    },
    {
      q: "Είναι νόμιμη η λήψη APK από το Play;",
      a: "Για προσωπική χρήση, δοκιμές και αντίγραφα ασφαλείας συνήθως ναι. Η μεταπώληση επί πληρωμή εφαρμογών ή υλικού πνευματικών δικαιωμάτων χωρίς άδεια είναι παράνομη.",
    },
    {
      q: "Συνδέεται το gptoapk.com με την Google;",
      a: "Όχι. Είναι ανεξάρτητο εργαλείο και δεν συνδέεται με την Google ή το Google Play.",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Συχνές ερωτήσεις</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Όσα χρειάζεστε για το gptoapk.com και τη λήψη APK από το Google Play.</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
              <span className="font-semibold text-lg pr-4">{faq.q}</span>
              <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">{faq.a}</div>
          </details>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">Άλλες ερωτήσεις;</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Δοκιμάστε{" "}
          <Link href="/el" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link>{" "}
          ή δείτε το{" "}
          <Link href="/el/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">ιστολόγιο</Link>.
        </p>
      </div>
    </div>
  );
}
