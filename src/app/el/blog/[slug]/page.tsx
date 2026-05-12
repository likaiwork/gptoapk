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
    title: "Πώς να Κατεβάσετε APK από το Google Play Store: Πλήρης Οδηγός (2026)",
    description:
      "Βήμα-βήμα οδηγός για την εξαγωγή APK αρχείων από το Google Play Store. Μάθετε να χρησιμοποιείτε το gptoapk.com, εντολές ADB για προχωρημένους και συμβουλές ασφαλείας για λήψη APK. Χωρίς root.",
    date: "2026-05-11",
    readTime: "6 min",
    tags: ["Λήψη APK", "Google Play", "Οδηγός"],
    content: (
      <>
        <p>
          Η λήψη ενός APK αρχείου από το Google Play Store μπορεί να είναι χρήσιμη για πολλούς λόγους:
          θέλετε να αποθηκεύσετε μια συγκεκριμένη έκδοση μιας εφαρμογής, να την εγκαταστήσετε σε μια
          συσκευή χωρίς Google Play, ή απλά να έχετε ένα αντίγραφο ασφαλείας. Σε αυτόν τον οδηγό σας
          δείχνουμε τους πιο αποτελεσματικούς τρόπους εξαγωγής APK από το Google Play.
        </p>

        <h2>Μέθοδος 1: Χρήση gptoapk.com (Το πιο απλό)</h2>
        <p>
          Η ταχύτερη μέθοδος δεν απαιτεί εγκατάσταση. Απλά επισκεφθείτε το{" "}
          <a href="https://gptoapk.com">gptoapk.com</a> και επικολλήστε τον σύνδεσμο της επιθυμητής
          εφαρμογής από το Google Play.
        </p>
        <ol>
          <li>
            Ανοίξτε το Google Play Store στο τηλέφωνο ή το πρόγραμμα περιήγησής σας, βρείτε την
            εφαρμογή και αντιγράψτε τη διεύθυνση URL (π.χ.{" "}
            <code>https://play.google.com/store/apps/details?id=com.example.app</code>).
          </li>
          <li>
            Μεταβείτε στο <a href="https://gptoapk.com">gptoapk.com</a> και επικολλήστε τον σύνδεσμο
            στο πεδίο αναζήτησης.
          </li>
          <li>Κάντε κλικ στο κουμπί λήψης και περιμένετε μερικά δευτερόλεπτα.</li>
          <li>Κατεβάστε το APK αρχείο απευθείας στη συσκευή σας.</li>
        </ol>
        <p>
          Αυτή η μέθοδος λειτουργεί με οποιαδήποτε δημόσια εφαρμογή από το Google Play Store και είναι
          εντελώς δωρεάν. Δεν απαιτείται εγγραφή ή εγκατάσταση πρόσθετου λογισμικού.
        </p>

        <h2>Μέθοδος 2: Χρήση ADB (Για προγραμματιστές)</h2>
        <p>
          Εάν είστε προγραμματιστής ή προχωρημένος χρήστης, μπορείτε να εξαγάγετε APK χρησιμοποιώντας
          το Android Debug Bridge (ADB). Αυτή η μέθοδος απαιτεί υπολογιστή και ενεργοποίηση του
          USB debugging στο τηλέφωνο.
        </p>
        <pre><code>{`// 1. Επιβεβαιώστε ότι η συσκευή είναι συνδεδεμένη
adb devices

// 2. Εμφανίστε όλες τις εγκατεστημένες εφαρμογές (βρείτε το επιθυμητό πακέτο)
adb shell pm list packages | grep ονομαεφαρμογης

// 3. Λάβετε τη διαδρομή του APK
adb shell pm path com.example.app

// 4. Κατεβάστε το APK στον υπολογιστή
adb pull /data/app/com.example.app-xxx/base.apk`}</code></pre>
        <p>
          Μόλις εξαχθεί, μπορείτε να μοιραστείτε το APK, να το εγκαταστήσετε σε άλλες συσκευές ή να το
          αποθηκεύσετε ως αντίγραφο ασφαλείας. Αυτή η μέθοδος λειτουργεί χωρίς root και σας δίνει
          πλήρη έλεγχο του αρχείου.
        </p>

        <h2>Μέθοδος 3: Εφαρμογές τρίτων (APK Extractor)</h2>
        <p>
          Εάν προτιμάτε μια λύση απευθείας από το τηλέφωνο χωρίς υπολογιστή, μπορείτε να
          χρησιμοποιήσετε εφαρμογές όπως το APK Extractor ή το ML Manager που είναι διαθέσιμες στο
          Play Store. Αυτές οι εφαρμογές αναγνωρίζουν αυτόματα όλες τις εγκατεστημένες εφαρμογές και
          σας επιτρέπουν να εξάγετε APK με ένα πάτημα.
        </p>
        <ul>
          <li>
            <strong>APK Extractor:</strong> Απλό και ελαφρύ. Επιλέξτε την εφαρμογή και πατήστε
            &quot;Εξαγωγή&quot;.
          </li>
          <li>
            <strong>ML Manager:</strong> Προσφέρει επίσης διαχείριση αντιγράφων ασφαλείας και κοινή
            χρήση μέσω Wi-Fi Direct.
          </li>
        </ul>

        <h2>Συμβουλές ασφαλείας</h2>
        <p>
          Να είστε πάντα προσεκτικοί όταν κατεβάζετε APK από μη επίσημες πηγές. Συνιστούμε:
        </p>
        <ul>
          <li>Κατεβάζετε μόνο από αξιόπιστες πηγές όπως το <a href="https://gptoapk.com">gptoapk.com</a>.</li>
          <li>Ελέγχετε πάντα την ψηφιακή υπογραφή του APK πριν από την εγκατάσταση.</li>
          <li>Συγκρίνετε το SHA-256 hash με την επίσημη τιμή, εάν είναι διαθέσιμη.</li>
          <li>Μην ενεργοποιείτε εγκατάσταση από άγνωστες πηγές για εφαρμογές που δεν εμπιστεύεστε.</li>
        </ul>

        <h2>Συχνές ερωτήσεις (FAQ)</h2>
        <p><strong>Είναι νόμιμο να κατεβάζω APK από το Google Play;</strong><br/>
        Ναι, η λήψη APK δωρεάν εφαρμογών για προσωπική χρήση είναι νόμιμη. Για εφαρμογές επί πληρωμή, πρέπει να τις έχετε αγοράσει. Η εξαγωγή APK για προσωπικό αντίγραφο ασφαλείας επιτρέπεται βάσει των όρων της Google.</p>
        <p><strong>Χρειάζομαι root;</strong><br/>
        Όχι. Όλες οι μέθοδοι που περιγράφονται εδώ λειτουργούν χωρίς root. Η εξαγωγή APK δεν απαιτεί δικαιώματα διαχειριστή στη συσκευή.</p>
        <p><strong>Γιατί δεν εγκαθίστανται μερικά APK;</strong><br/>
        Ίσως χρειαστεί να ενεργοποιήσετε την εγκατάσταση από άγνωστες πηγές στις ρυθμίσεις της συσκευής σας. Μεταβείτε στις Ρυθμίσεις &gt; Ασφάλεια &gt; Εγκατάσταση από άγνωστες πηγές και ενεργοποιήστε την. Στο Android 8+ αυτή η επιλογείναι ανά εφαρμογή.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Δοκιμάστε το gptoapk.com 🚀</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Το ταχύτερο εργαλείο για λήψη APK από το Google Play. Επικολλήστε τον σύνδεσμο, κατεβάστε
            το APK με ένα κλικ. Δωρεάν, χωρίς εγγραφή, χωρίς εγκατάσταση.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Λήψη APK τώρα →
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
    title: "Τι είναι ένα APK Αρχείο; Πλήρης Οδηγός για Πακέτα Android",
    description:
      "Όλα όσα πρέπει να γνωρίζετε για τα APK αρχεία: τι περιέχουν, πώς λειτουργούν, διαφορά μεταξύ APK και AAB, πώς να επαληθεύσετε την ακεραιότητα και γιατί η ασφάλεια είναι σημαντική. Οδηγός για αρχάριους και προχωρημένους.",
    date: "2026-05-11",
    readTime: "7 min",
    tags: ["APK", "Android", "Οδηγός Αρχαρίων"],
    content: (
      <>
        <p>
          APK σημαίνει <strong>Android Package Kit</strong>. Είναι η μορφή αρχείου που χρησιμοποιεί το
          Android για τη διανομή και εγκατάσταση εφαρμογών. Κάθε εφαρμογή που εγκαθιστάτε στο τηλέφωνό
          σας Android είναι συσκευασμένη σε ένα APK αρχείο (ή στο νεότερο AAB). Σε αυτόν τον οδηγό
          εξερευνούμε σε βάθος τη δομή, τη λειτουργία και τη σημασία των APK αρχείων.
        </p>

        <h2>Τι περιέχει ένα APK αρχείο;</h2>
        <p>
          Ένα APK αρχείο είναι ουσιαστικά ένα αρχείο ZIP με καλά καθορισμένη δομή. Μέσα του θα βρείτε:
        </p>
        <ul>
          <li>
            <strong>AndroidManifest.xml:</strong> Η καρδιά της εφαρμογής. Περιέχει το όνομα πακέτου,
            τα απαιτούμενα δικαιώματα, τις δραστηριότητες, τις υπηρεσίες και τους broadcast receivers.
          </li>
          <li>
            <strong>classes.dex:</strong> Ο εκτελέσιμος κώδικας της εφαρμογής μεταγλωττισμένος σε
            μορφή Dalvik Executable (DEX). Εδώ βρίσκεται όλη η λογική της εφαρμογής.
          </li>
          <li>
            <strong>res/:</strong> Οι πόροι της εφαρμογής: διατάξεις XML, εικόνες, εικονίδια,
            μεταφρασμένες συμβολοσειρές, θέματα και πολλά άλλα.
          </li>
          <li>
            <strong>lib/:</strong> Εγγενείς βιβλιοθήκες γραμμένες σε C/C++ για συγκεκριμένες
            αρχιτεκτονικές (armeabi-v7a, arm64-v8a, x86, x86_64).
          </li>
          <li>
            <strong>META-INF/:</strong> Αρχεία ψηφιακής υπογραφής που εγγυώνται την ακεραιότητα και
            την αυθεντικότητα του APK. Περιέχει MANIFEST.MF, CERT.SF και CERT.RSA.
          </li>
          <li>
            <strong>assets/:</strong> Πρόσθετοι πόροι προσβάσιμοι μέσω του API AssetManager.
          </li>
        </ul>

        <h2>APK vs AAB: Ποια είναι η διαφορά;</h2>
        <p>
          Από το 2021 η Google απαιτεί τη μορφή <strong>Android App Bundle (AAB)</strong> για δημοσίευση
          στο Play Store. Το AAB δεν είναι άμεσα εγκαταστάσιμο: το Google Play το επεξεργάζεται και
          παράγει βελτιστοποιημένα APK για κάθε συσκευή (split APK). Τα πλεονεκτήματα του AAB
          περιλαμβάνουν:
        </p>
        <ul>
          <li>Ελαφρύτερες εφαρμογές: ο χρήστης κατεβάζει μόνο τους πόρους που χρειάζονται για τη συσκευή του.</li>
          <li>Δυναμική υποστήριξη λειτουργικών μονάδων (asset packs, feature on-demand).</li>
          <li>Αποδοτικότερες ενημερώσεις με Delta patches.</li>
        </ul>
        <p>
          Ωστόσο, το APK παραμένει η καθολική μορφή για άμεση εγκατάσταση (sideloading). Μπορείτε να
          μετατρέψετε ένα AAB σε APK χρησιμοποιώντας εργαλεία όπως το <code>bundletool</code> της Google.
        </p>

        <h2>Πώς να επαληθεύσετε την ακεραιότητα ενός APK</h2>
        <p>
          Η λήψη APK από μη επίσημες πηγές μπορεί να είναι επικίνδυνη. Δείτε πώς να ελέγξετε αν ένα
          APK είναι αυθεντικό:
        </p>
        <pre><code>{`// Επαλήθευση ψηφιακής υπογραφής
keytool -printcert -jarfile app.apk

// Έλεγχος SHA-256 hash
sha256sum app.apk

# Σύγκριση με το επίσημο hash (εάν διαθέσιμο)`}</code></pre>
        <p>
          Ένα APK υπογεγραμμένο με έγκυρο και επαληθευμένο πιστοποιητικό είναι σχεδόν σίγουρα
          αυθεντικό. Να είστε προσεκτικοί με APK που έχουν άγνωστες υπογραφές ή hash που διαφέρουν
          από τα επίσημα.
        </p>

        <h2>Συχνές ερωτήσεις (FAQ)</h2>
        <p><strong>Μπορώ να ανοίξω ένα APK για να δω τι περιέχει;</strong><br/>
        Ναι. Μετονομάστε το αρχείο από <code>.apk</code> σε <code>.zip</code> και ανοίξτε το με οποιοδήποτε πρόγραμμα αποσυμπίεσης. Μπορείτε να εξερευνήσετε τους πόρους, αλλά ο κώδικας DEX απαιτεί εργαλεία όπως JADX ή APKTool για να διαβαστεί.</p>
        <p><strong>Τι σημαίνει APK;</strong><br/>
        APK σημαίνει <strong>Android Package Kit</strong> (ή Android Package file). Είναι η τυπική μορφή διανομής εφαρμογών στο Android.</p>
        <p><strong>Είναι ασφαλή τα APK αρχεία;</strong><br/>
        Εξαρτάται από την πηγή. Τα APK που κατεβάζετε από αξιόπιστες πηγές όπως το Google Play ή το gptoapk.com είναι ασφαλή. Αποφύγετε ύποπτους ιστότοπους και ελέγχετε πάντα την ψηφιακή υπογραφή πριν την εγκατάσταση.</p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
          <p className="font-semibold text-lg mb-2">Κατεβάστε APK με ασφάλεια 🛡️</p>
          <p className="mb-3">
            <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              gptoapk.com
            </a>{" "}
            — Εξάγετε APK από το Google Play Store με ασφάλεια και ταχύτητα. Απευθείας σύνδεσμος, χωρίς
            ενοχλητικές διαφημίσεις, χωρίς κινδύνους για το απόρρητο. Δοκιμάστε το τώρα.
          </p>
          <a
            href="https://gptoapk.com"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Μετάβαση στο gptoapk.com →
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
      canonical: `https://gptoapk.com/el/blog/${slug}`,
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
    url: `https://gptoapk.com/el/blog/${slug}`,
    inLanguage: "el",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://gptoapk.com/el/blog/${slug}`,
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
          href="/el/blog"
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
          ← Επιστροφή στο ιστολόγιο
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
            href="/el/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Επιστροφή στο ιστολόγιο
          </Link>
        </div>
      </article>
    </>
  );
}
