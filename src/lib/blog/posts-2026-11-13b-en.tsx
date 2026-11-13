import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: React.ReactNode;
  faqs?: BlogFaqItem[];
};

const toList = (posts: BlogPostEntry[]) =>
  posts.map(({ slug, title, description, date, readTime, tags }) => ({
    slug,
    title,
    description,
    date,
    readTime,
    tags,
  }));

const ARTICLE = (
  <>
      <p>A newer version removed a feature, made the interface worse, or doubled battery drain. The old APK is easy to find. Getting it installed without losing your chat history, game save, or login state is the actual problem.</p>
      <p>The answer is not &quot;it depends&quot;. It is determined by a single fact, and you can establish it in about two minutes: <strong>do the old and new packages share a signing certificate?</strong></p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Same certificate → data fully preserved, in-place downgrade works</li>
        <li>Different certificate → uninstall is mandatory, data is gone</li>
      </ul>
      <p>Everything else follows from that.</p>
      <h2>Step one: compare signatures before touching anything</h2>
      <h3>On the phone</h3>
      <p>Install a package inspector (ApkInfo, LibChecker, or similar) and compare the <strong>SHA-256 signing certificate fingerprint</strong> of both APKs.</p>
      <h3>On a computer (more reliable)</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# Package name and version\naapt2 dump badging old.apk | head -2\naapt2 dump badging new.apk | head -2\n\n# Signing certificate fingerprint\nkeytool -printcert -jarfile old.apk | grep -A2 SHA256\nkeytool -printcert -jarfile new.apk | grep -A2 \"SHA256\""}</code></pre>
      <p>Identical fingerprints are the precondition for an in-place downgrade. Nothing else substitutes.</p>
      <h3>Why the signature is decisive</h3>
      <p>Android uses the signing certificate as <strong>app identity</strong>. Two APKs with the same package name but different certificates are, to the system, different applications, and they cannot share <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/&lt;package&gt;/</code>. This is not an inconvenient restriction — it is what prevents anyone from shipping a modified build that overwrites your banking app.</p>
      <p>The practical consequence: <strong>any repackaged, ad-stripped, or modded build from a third-party site has a different signature by definition.</strong> Installing one always requires uninstalling the original, which means abandoning its data. In the downgrade scenario specifically, this is the number one cause of people losing everything.</p>
      <h2>Path A: same signature, in-place downgrade</h2>
      <p>Precondition: matching certificates.</p>
      <h3>The system will not do this through the UI</h3>
      <p>Since Android 9, the on-device installer refuses downgrades outright. Tapping an older APK in a file manager produces &quot;App not installed&quot; with no further explanation. adb is required:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb devices                    # confirm the device is authorized\nadb install -d -r old.apk"}</code></pre>
      <p>Both flags are mandatory:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code> reinstalls over the existing package</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> permits a lower <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">versionCode</code></li>
      </ul>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Error</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Cause</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Fix</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_VERSION_DOWNGRADE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Missing <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Add <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Certificate mismatch</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No fix — Path B</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_ALREADY_EXISTS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Missing <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Add <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-r</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_TEST_ONLY</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Package carries testOnly</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Add <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-t</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_USER_RESTRICTED</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">On-device confirmation pending</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Tap &quot;Allow&quot; on the phone</td></tr></tbody>
      </table></div>
      <h3>The risk that survives a successful downgrade</h3>
      <p>The install succeeded and the data is intact — but the newer version may have already <strong>migrated the database schema</strong>. The old build then reads a structure it does not understand, with three possible outcomes:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>It reads fine (schema was backward compatible — best case)</li>
        <li>It crashes at launch</li>
        <li>It reads garbage and displays corrupted state</li>
      </ol>
      <p>Cases 2 and 3 mean the downgrade is not viable, and the only remaining option wipes data:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm clear com.example.app"}</code></pre>
      <p>The app stays installed; all local data is gone. <strong>Confirm nothing important is unexported before running this.</strong></p>
      <h3>Immediately after: kill auto-update</h3>
      <p>Without this, the store pushes you back to the current version within a day and the whole exercise was wasted.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Google Play</strong>: app page → three-dot menu → uncheck &quot;Enable auto-update&quot;</li>
        <li><strong>OEM stores</strong> (Huawei, Xiaomi, OPPO, vivo): disable auto-update in store settings; some devices additionally pin versions in the app manager</li>
      </ul>
      <p>Note that disabling auto-update does not suppress *manual* update prompts, and some stores nag periodically regardless.</p>
      <h2>Path B: different signatures, uninstall first</h2>
      <p>No shortcut exists. What you can do is reduce the loss.</p>
      <h3>What can be saved before uninstalling</h3>
      <p><strong>1. The app's own export (most reliable).</strong> Look for &quot;export&quot;, &quot;backup&quot;, &quot;transfer&quot;, or &quot;sync to cloud&quot; in settings. Highest success rate by a wide margin, especially for messaging, notes, and finance apps.</p>
      <p><strong>2. Files in shared storage.</strong></p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb pull /sdcard/Android/data/com.example.app/files ./backup-files\nadb pull /sdcard/Android/media/com.example.app ./backup-media"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Android/media/</code> generally survives uninstall. <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Android/data/</code> is cleaned on modern Android and should be pulled first.</p>
      <p><strong>3. `adb backup` — do not rely on this.</strong></p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb backup -apk -all -f backup.ab"}</code></pre>
      <p>Since Android 12, the overwhelming majority of apps opt out and produce empty archives. Treat this as unusable. Guides that still recommend it as your primary backup are out of date.</p>
      <p><strong>4. Cloud account sync.</strong> If the app has an account system, confirm the data is synced server-side before uninstalling. This is the only genuinely painless path.</p>
      <h3>Execute</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb uninstall com.example.app\nadb install old.apk"}</code></pre>
      <p>Backup, uninstall, install — in that order, nothing in between.</p>
      <h3>The second failure nobody warns you about</h3>
      <p>The old build installs cleanly, you sign in, and the server responds with &quot;please update to continue&quot;. That is a server-side version gate, and no client-side technique bypasses it.</p>
      <p>Banking, payment, social, and many utility apps do this deliberately for security and compliance reasons. When it happens, rollback is over.</p>
      <h2>Which app categories are worth trying</h2>
      <h3>Messaging and social</h3>
      <p>Data lives on the server; the client is a shell. Lowest risk, but also the most likely to hit a version gate. <strong>Prefer the app's built-in chat migration over any local file copying.</strong></p>
      <h3>Games</h3>
      <p>Saves are either server-side (unaffected) or local (lost on uninstall). For local saves, the directory lives under <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/&lt;package&gt;/</code>, which is readable only via:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell run-as com.example.game ls /data/data/com.example.game/files"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">run-as</code> requires a debuggable build — retail versions will reject it. In practice, check for a &quot;back up to cloud&quot; option in the game first; that is the only route that works on a release build.</p>
      <h3>Banking and payments</h3>
      <p>Do not. Old builds usually have their API endpoints retired server-side, so they install and then refuse to function. They also lack current security patches, which is a self-inflicted risk with no upside.</p>
      <h3>Preinstalled system apps</h3>
      <p>System app downgrades need <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--user 0</code> or privileged permissions; plain adb fails with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INVALID_APK</code> or a permission error. The blast radius of getting it wrong is an unstable system. Not worth it.</p>
      <h2>Common questions</h2>
      <p><strong>Why does the file manager refuse the old APK but adb accepts it?</strong></p>
      <p>The on-device installer declines downgrades by policy. <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-d</code> is an explicit declaration that you know a downgrade is happening.</p>
      <p><strong>Can I keep data while changing signatures?</strong></p>
      <p>No. A different signature is a different app identity, which forces an uninstall. The only theoretical exception is re-signing with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> on a rooted device with signature verification patched out (Xposed/LSPosed modules). Complexity and risk are both high; it is not a consumer path.</p>
      <p><strong>The downgrade installed but the app crashes. Anything besides clearing data?</strong></p>
      <p>If the app implements database downgrade logic, it may recover on its own. Otherwise clearing data is the only option, and if it still crashes the old build is incompatible with your current Android version.</p>
      <p><strong>How far back can `-d` go?</strong></p>
      <p>As far as <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">minSdkVersion</code> allows. An old package that requires a newer Android than yours fails with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code>. Crossing multiple major versions also makes schema and cache incompatibility very likely.</p>
      <h2>One line</h2>
      <p><strong>Matching signature → `adb install -d -r`, data intact. Mismatched signature → back up, uninstall, accept the loss.</strong> Check the fingerprint before you start and you skip half the trial and error.</p>
      <p>When you need a clean original build to downgrade to, <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk.com</a> lists package names and version numbers for each download, which makes certificate comparison straightforward — and a mismatched certificate is the reason most rollbacks go wrong in the first place.</p>
  </>
);

export const enPosts20261113B = [
  {
    slug: "apk-rollback-without-losing-data",
    title: "Package name and version",
    description: "You want the previous version back. 'Uninstall and reinstall' deletes everything, and most guides stop there. Whether your data survives comes down to one check you can run in two minutes: do the two APKs share a signing certificate? Here is the full decision tree for both paths, plus which app categories make rollback hopeless regardless.",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["android","apk","troubleshooting","mobile"],
    content: ARTICLE,
  },
];

export const enPosts20261113BList = toList(enPosts20261113B);
