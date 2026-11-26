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
      <p># Sideloaded APK Crashes After an Update: A Rollback and Damage-Control Playbook</p>
      <p>The frustrating failure for a self-maintained sideload is not &quot;it won't install.&quot; It is &quot;it worked fine for six weeks, I installed the update, and now it force-closes, stutters, or eats my battery.&quot; You are stuck between two bad options: the system refuses to let you downgrade, and uninstalling to reinstall the old build means losing everything.</p>
      <p>This playbook gives you a way out. First, decide whether the <strong>new build is broken</strong> or the <strong>upgrade itself went wrong</strong>. Second, read the crash log to identify which one. Third, roll back using whichever of four methods preserves your data. Finally, decide whether the new version is worth another try.</p>
      <p>&gt; For why updates destroy data in the first place — package names, signing keys, uninstall-reinstall traps — read <Link href="/en/blog/apk-update-wiped-data-how-to-keep-app-data-on-overwrite-install" className="text-blue-600 dark:text-blue-400 hover:underline">APK update wiped your data</Link>. This article assumes you already installed the new version and are now dealing with the fallout.</p>
      <p>---</p>
      <h2>1. Classify the symptom before touching anything</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Symptom</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Likely root cause</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Direction</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Force-closes immediately, never reaches the UI</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">ABI mismatch, minSdk gap, missing system component</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Rollback (section 3)</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Runs, but specific screens crash</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Bug in the new build, or failed DB migration</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Export data, then rollback</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No crashes, but slow, hot, battery-hungry</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">New background policy, heavier ad/analytics SDK</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Diagnose power first, rollback only if needed</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Crash log shows <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SQLiteException"}</code> or &quot;migration&quot;</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Database schema was upgraded</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>Back up the DB file first</strong> — otherwise the old build crashes too</td></tr></tbody>
      </table></div>
      <p>That last row matters more than it looks. If the new version already migrated the database schema, the old build may not be able to read it. Rolling back into an unreadable database just swaps one crash for another. For any app with a database — notes, chat, finance trackers — <strong>export first, always</strong>.</p>
      <p>---</p>
      <h2>2. Read the crash log without root</h2>
      <p>You do not need root; logcat has everything.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb logcat -c                      # clear\n# ...reproduce the crash on the phone...\nadb logcat -d -v time > crash.txt"}</code></pre>
      <p>Then search for the decisive lines:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"grep -nE \"FATAL EXCEPTION|AndroidRuntime|Caused by|SQLiteException|UnsatisfiedLinkError|NoClassDefFoundError|SecurityException\" crash.txt"}</code></pre>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Log signature</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Meaning</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Action</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"UnsatisfiedLinkError: dlopen failed ... arm64"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Missing native library for this CPU</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Get a universal or arm64 build</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"ClassNotFoundException"}</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"NoClassDefFoundError"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Split APK / App Bundle parts missing</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Get a complete APK</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SQLiteException: no such column"}</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"can't downgrade database"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Schema already upgraded</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Export data, then roll back</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"SecurityException"}</code> + a permission name</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">New runtime permission not granted</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Grant it manually</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"OutOfMemoryError"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">New build has higher memory pressure</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Clear cache or use a lighter build</td></tr></tbody>
      </table></div>
      <p>Without adb, use Developer options → Bug report, or your OEM's built-in log capture.</p>
      <p>---</p>
      <h2>3. Four rollback methods, ranked by data safety</h2>
      <p>Android blocks downgrades by default (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"INSTALL_FAILED_VERSION_DOWNGRADE"}</code>), so a rollback takes a trick or two.</p>
      <h3>Method A — Overwrite with a same-versionCode build</h3>
      <p>If the old build shares the new build's versionCode, plain overwrite works and no downgrade check fires. Some channels publish &quot;same version, rebuilt&quot; fix packages; this is the cleanest possible rollback.</p>
      <h3>Method B — adb with downgrade allowed (recommended)</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install -r -d -g old_version.apk"}</code></pre>
      <ul className="list-disc pl-6 space-y-1"><li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"-r"}</code> overwrite, preserving data</li><li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"-d"}</code> allow a lower versionCode</li><li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"-g"}</code> grant all runtime permissions, so the app does not break on a missing grant after rollback</li></ul>
      <p>Requires matching signatures. If they differ you get <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"INSTALL_FAILED_UPDATE_INCOMPATIBLE"}</code>, and Method C or D is the only route.</p>
      <h3>Method C — Export, uninstall, install old version</h3>
      <p>For signature conflicts or an already-migrated database.</p>
      <ol className="list-decimal pl-6 space-y-1"><li>Use the app's own export (chat history, save file, config).</li><li>If there is none, browse <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"Android/data/<package>/"}</code> and copy the database and config files to a PC.</li><li>Uninstall, install the old build.</li><li>Try copying the files back into the same directory; some apps will pick them up at startup.</li></ol>
      <h3>Method D — Accept the local loss, rely on the cloud</h3>
      <p>If the app has accounts, uninstall, reinstall the old build, and sign in to pull data back from the server. Least effort and most reliable when it is available.</p>
      <p>---</p>
      <h2>4. Three things to do immediately after a successful rollback</h2>
      <ol className="list-decimal pl-6 space-y-1"><li><strong>Kill auto-update.</strong> If the channel pushes updates or prompts aggressively, disable it now, or you will be back here tomorrow. See <Link href="/en/blog/disable-apk-auto-update" className="text-blue-600 dark:text-blue-400 hover:underline">how to disable APK auto-update</Link>.</li><li><strong>Archive the working build.</strong> Rename the APK with its versionCode and keep it. Most people only go looking for the old version after it is too late.</li><li><strong>Observe for 48 hours.</strong> Confirm notifications, background work, and battery behavior are back to normal. The <Link href="/en/blog/how-to-safely-download-apk-files-android-48-hour-post-install-audit" className="text-blue-600 dark:text-blue-400 hover:underline">48-hour post-install audit</Link> is a good checklist.</li></ol>
      <p>---</p>
      <h2>5. Should you stay on the new version?</h2>
      <p>Three questions decide it:</p>
      <ul className="list-disc pl-6 space-y-1"><li><strong>Is core function broken?</strong> Broken core → roll back. Broken edge feature → you can probably wait.</li><li><strong>Is there a known fix and a date?</strong> Check whether the channel or community has acknowledged the bug and committed to a release.</li><li><strong>Does the new version contain security fixes?</strong> If it patches something serious, staying on the old build has a cost. Weigh it explicitly rather than reflexively.</li></ul>
      <p>A practical stance: <strong>keep both.</strong> Archive the working old build and the new APK. When the next version lands, trial it in a spare device or a cloned space for a day before it touches your primary phone.</p>
      <p>---</p>
      <h2>6. Habits that prevent a repeat</h2>
      <ul className="list-disc pl-6 space-y-1"><li>Note the current versionCode and archive the APK before every update.</li><li>Confirm cloud sync is on and you are signed in before installing.</li><li>Prefer universal builds — ABI mismatch is the top cause of post-update crashes.</li><li>Never let a third-party installer do the update; it may uninstall silently.</li><li>Trial major version bumps on a non-primary device.</li></ul>
      <p>---</p>
      <h2>7. FAQ</h2>
      <p><strong>Does `adb install -r -d` corrupt data?</strong></p>
      <p>No — it preserves it. But if the new build migrated the database, the old build may still be unable to read it. Export first for any app with a database.</p>
      <p><strong>Rolled back and now it says the data is from a newer version.</strong></p>
      <p>The database version exceeds what the old build understands. Your only options are clearing app data (losing local data) or restoring a backup you exported earlier.</p>
      <p><strong>Why does uninstalling and reinstalling sometimes keep data?</strong></p>
      <p>Because the app has a cloud account. The local data was genuinely deleted; the app re-downloaded it from the server.</p>
      <p><strong>The new version kills background tasks harder — is that a bug?</strong></p>
      <p>Not necessarily. It may be adapting to new system background limits. Set the app to &quot;unrestricted&quot; battery usage and re-test before blaming the build.</p>
      <p><strong>Can I keep some of the new version's features while running the old version?</strong></p>
      <p>No. Versions switch as a whole; there is no mixed install.</p>
      <p><strong>I cannot find the old APK.</strong></p>
      <p>Check the official historical-versions page first, then reputable APK archives — and verify signature and versionCode before installing anything you find there. See the <Link href="/en/blog/apk-download-safety-source-trust-tiers" className="text-blue-600 dark:text-blue-400 hover:underline">APK source trust-tier guide</Link> for how to judge an archive.</p>
  </>
);

export const enPosts20261126B = [
  {
    slug: "sideloaded-apk-crashes-after-update-rollback-playbook",
    title: "Sideloaded APK Crashes After an Update: A Rollback and Damage-Control Playbook",
    description: "The app worked fine for weeks. You installed the new version and now it force-closes, stalls, or drains the battery. You cannot simply downgrade — Android blocks it — and uninstalling costs you your data. This playbook separates 'the build is broken' from 'the upgrade went wrong', shows how to read the crash log without root, and walks through four rollback methods ranked by how much data they preserve, plus what to check once you are back on the old version.",
    date: "2026-11-26",
    readTime: "9 min read",
    tags: ["APK update","rollback","Android crash","logcat","sideloading","troubleshooting"],
    content: ARTICLE,
  },
];

export const enPosts20261126BList = toList(enPosts20261126B);
