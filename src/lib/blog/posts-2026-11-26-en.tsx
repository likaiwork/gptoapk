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
      <p># APK Update Wiped Your Data? How to Keep Accounts, Chats and Game Saves When You Overwrite-Install</p>
      <p>It is a familiar and uniquely painful sequence. You have a sideloaded app on your phone with months of chat history, a logged-in account, or a save file you are not willing to lose. A newer version appears, you download it, tap install, everything looks normal — and then the app opens to a login screen, an empty message list, or level one of the game. Worse: the old APK is gone, and there is no recycle bin for app data.</p>
      <p>This is almost never bad luck, and it is not &quot;Android being unreliable.&quot; <strong>Overwrite-installing an APK preserves data. Uninstalling and reinstalling does not.</strong> Nearly every &quot;update destroyed my data&quot; story is really the second thing wearing the costume of the first.</p>
      <p>Below: where Android actually stores app data, the five upgrade paths that silently become uninstall-reinstall, a ten-minute pre-update routine that makes this impossible, and what is still recoverable after the damage is done.</p>
      <p>---</p>
      <h2>1. Know where the data lives</h2>
      <p>Android app data sits in four places, and they have very different fates:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Location</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Typical path</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Survives an overwrite install?</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App private data</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/data/data/<package>/"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>Yes</strong> — deleted only on uninstall</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">External private dir</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/sdcard/Android/data/<package>/"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Yes; often cleared on uninstall</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Shared storage</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/sdcard/DCIM"}</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/sdcard/Download"}</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Unaffected either way</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Cloud / server</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Account backend</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Depends on login and sync</td></tr></tbody>
      </table></div>
      <p>The whole rule compresses into one line: <strong>overwrite = keep, uninstall = lose.</strong> Everything below is about accidentally doing the second one.</p>
      <p>---</p>
      <h2>2. Five &quot;fake upgrades&quot; that wipe data</h2>
      <h3>2.1 The package name changed</h3>
      <p>Different distribution channels, forks, or version branches of the same app can ship under different <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"applicationId"}</code> values. To Android they are two unrelated apps: the old one stays, the new one installs alongside. You think you upgraded; you actually added a second copy — and the data you care about is under the first icon.</p>
      <p><strong>Check it:</strong> compare the package name before installing.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging new.apk | grep \"^package\"\naapt dump badging old.apk | grep \"^package\""}</code></pre>
      <p>They must match character for character. On the phone, Settings → Apps → the app → App info shows the package name.</p>
      <h3>2.2 The signing key differs</h3>
      <p>This is the most common trigger. The developer rotated keys, a channel re-signed the build, or you grabbed the official build from one site and a modified build from another. Android responds with:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"INSTALL_FAILED_UPDATE_INCOMPATIBLE"}</code></pre>
      <p>At this point, <strong>no data has been lost</strong> — the install was simply refused. The danger is your next move. Most people read that error and think &quot;fine, I'll uninstall the old one first.&quot; That uninstall is the moment the data dies. The error was never the problem; the workaround is.</p>
      <h3>2.3 versionCode went backwards</h3>
      <p>Installing a build with a lower versionCode is blocked (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"INSTALL_FAILED_VERSION_DOWNGRADE"}</code>), which again tempts you to uninstall first. Some third-party installers and &quot;app managers&quot; handle this by silently running <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"pm uninstall"}</code> before <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"pm install"}</code> rather than reporting the failure.</p>
      <h3>2.4 A third-party installer did the job</h3>
      <p>&quot;Phone cleaner&quot;, &quot;one-tap installer&quot;, &quot;phone migration assistant&quot; tools often guarantee success by uninstalling first. The animation looks identical to a normal install. <strong>This is the single most invisible cause of data loss for ordinary users</strong>, because nothing in the UI tells you an uninstall happened.</p>
      <h3>2.5 Different user space or storage target</h3>
      <p>Apps inside a Work Profile, a secondary user, or a dual-app/clone container belong to a different Android user (user 0, user 10, user 999). Uninstalling in one space and installing in another produces two empty, mismatched installations. Similarly, moving an app from SD card to internal storage can force a reinstall.</p>
      <p>---</p>
      <h2>3. The ten-minute pre-update routine</h2>
      <p>Run these five steps before you touch a new APK. It takes ten minutes and eliminates virtually every failure mode above.</p>
      <h3>Step 1 — Verify package name and versionCode</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging new.apk | grep -E \"^package|versionCode\""}</code></pre>
      <p>Requirements: identical package name; <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"versionCode(new) >= versionCode(old)"}</code>.</p>
      <h3>Step 2 — Compare signing certificates</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# New APK\napksigner verify --print-certs new.apk\n# Installed app (needs adb)\nadb shell dumpsys package <package> | grep -A3 \"signatures\""}</code></pre>
      <p>The SHA-256 digests must match. If they do not, do <strong>not</strong> uninstall. Go back to the source and get a build with the matching signature — same official site, same channel.</p>
      <h3>Step 3 — Back up, in order of reliability</h3>
      <ul className="list-disc pl-6 space-y-1"><li><strong>Built-in export</strong> — &quot;export chat history&quot;, &quot;back up save&quot;, &quot;export settings&quot; in the app itself. This is the best option because the developer guarantees the format.</li><li><strong>System / OEM cloud backup</strong> — Settings → System → Backup. Note it only covers apps that permit backup; many sideloaded apps opt out.</li><li><strong>ADB full backup</strong> (most complete, but limited):</li></ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb backup -apk -shared -all -f backup.ab"}</code></pre>
      <p>On Android 12 and later this fails for any app declaring <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"android:allowBackup=\"false\""}</code>, which is common. Never treat it as your only insurance.</p>
      <h3>Step 4 — Confirm you are logged in and synced</h3>
      <p>If the app has an account system, make sure you are signed in and cloud data is current. For a synced app, local loss is an annoyance, not a catastrophe. This is the cheapest insurance available.</p>
      <h3>Step 5 — Install with the system package installer</h3>
      <p>Tap the APK and let Android's own &quot;Package installer&quot; handle it. <strong>Do not</strong> use a third-party installer, and do not tap &quot;uninstall old version&quot; at any point during or after the install.</p>
      <p>---</p>
      <h2>4. If the data is already gone</h2>
      <p>Try these in order — success rate drops sharply as you go down.</p>
      <ol className="list-decimal pl-6 space-y-1"><li><strong>Sign back in.</strong> A surprising number of &quot;data loss&quot; reports are just a local logout. Log in and wait for sync.</li><li><strong>Look for a duplicate app.</strong> Two identical icons on the home screen, or two entries in Settings → Apps. The old one may still hold everything.</li><li><strong>Check the external private dir.</strong> Browse <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"Android/data/<package>/"}</code> for leftover databases, saves, or config files. Copy them out before anything else.</li><li><strong>Check other user spaces.</strong> Search Settings for &quot;Work profile&quot;, &quot;Dual apps&quot;, &quot;Second space&quot;, and look inside.</li><li><strong>OEM / cloud backup restore.</strong> Settings → Backup &amp; restore — check the timestamp of the last backup.</li><li><strong>Old exports on a PC or cloud drive.</strong> Any earlier <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"backup.ab"}</code> or exported folder.</li><li><strong>Root-only options.</strong> Pre-uninstall <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/data/data"}</code> snapshots or TWRP partition backups. Not worth rooting for, in general.</li></ol>
      <p>Be realistic: <strong>no backup, no cloud sync, already uninstalled</strong> is close to unrecoverable. Which is why section 3 is the part that matters.</p>
      <p>---</p>
      <h2>5. FAQ</h2>
      <p><strong>Does an overwrite install clear the cache?</strong></p>
      <p>Not actively, but the new version may rebuild cache directories. Losing cache normally does not affect accounts or core data.</p>
      <p><strong>Can I move from the Play Store build to a third-party signed build without losing data?</strong></p>
      <p>Usually not. Different signatures block the overwrite, leaving uninstall-reinstall as the only path — unless the app syncs via an account, or you can export and re-import.</p>
      <p><strong>The developer rotated their signing key. Now what?</strong></p>
      <p>Legitimate rotation uses APK Signature Scheme v3 key rotation, which preserves continuity. A hard key swap means uninstall-reinstall; export your data first.</p>
      <p><strong>Install failed with &quot;App not installed&quot; — did I lose anything?</strong></p>
      <p>No. A failed install does not modify the installed app's data. You are only at risk if you uninstall manually afterwards.</p>
      <p><strong>Where do game saves live, and can I get them back after uninstalling?</strong></p>
      <p>Most online games keep saves server-side (bind an account and you are fine). Offline games store in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"/data/data"}</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{"Android/data"}</code>, which are deleted on uninstall. Before upgrading, find and enable any &quot;cloud save&quot; toggle.</p>
      <p><strong>How do I update an app inside Dual Apps / a second space?</strong></p>
      <p>Upgrade it inside the same space — do not push the main-space APK into the clone. Safest path: export data from the clone first.</p>
      <p>---</p>
      <h2>6. The cheat sheet</h2>
      <ul className="list-disc pl-6 space-y-1"><li><strong>Same package, same signature, versionCode not lower</strong> — all three must hold for a safe overwrite install.</li><li><strong>Never uninstall to work around an install error.</strong> Find a matching build, or back up first.</li><li><strong>Backup priority:</strong> in-app export &gt; system/OEM cloud &gt; ADB backup.</li><li><strong>Avoid third-party installers.</strong> They may uninstall without telling you.</li><li><strong>Log in first.</strong> Cloud sync is the cheapest insurance there is.</li></ul>
      <p>If you have not downloaded yet and want to reduce risk at the source, read the <Link href="/en/blog/how-to-safely-download-apk-files-android-full-verification-workflow" className="text-blue-600 dark:text-blue-400 hover:underline">full APK verification workflow</Link> and the <Link href="/en/blog/apk-download-safety-source-trust-tiers" className="text-blue-600 dark:text-blue-400 hover:underline">APK source trust-tier guide</Link>. Once the new build is running, pair this with the <Link href="/en/blog/how-to-safely-download-apk-files-android-48-hour-post-install-audit" className="text-blue-600 dark:text-blue-400 hover:underline">48-hour post-install audit</Link> to confirm its behavior is clean.</p>
  </>
);

export const enPosts20261126 = [
  {
    slug: "apk-update-wiped-data-how-to-keep-app-data-on-overwrite-install",
    title: "APK Update Wiped Your Data? How to Keep Accounts, Chats and Game Saves When You Overwrite-Install",
    description: "You sideloaded an app, been using it for months, then installed a newer APK over it — and your login, chat history and game saves vanished. This is rarely bad luck. It means the 'update' was actually an uninstall-reinstall in disguise. Here is where Android stores app data, the five fake-upgrade patterns that destroy it, a ten-minute backup routine to run before every update, and what you can still recover after the fact.",
    date: "2026-11-26",
    readTime: "11 min read",
    tags: ["APK update","data loss","Android backup","sideloading","troubleshooting"],
    content: ARTICLE,
  },
];

export const enPosts20261126List = toList(enPosts20261126);
