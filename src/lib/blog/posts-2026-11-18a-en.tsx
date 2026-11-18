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
      <p>Most people think migrating a phone means putting the apps back. That part is trivial — you can even pull the APK off the old device and install it directly. What actually hurts is everything attached to those apps: login sessions, chat history, offline maps, downloaded playlists, game progress. A sloppy migration costs you a dozen re-logins and a pile of files you will never get back.</p>
      <p>The mental model that fixes this is simple: <strong>the APK is disposable, the data is not</strong>. Installer files can be re-downloaded from anywhere; application data usually exists in exactly one place. So decide how the data travels first, then worry about how the APKs get installed.</p>
      <p>Here are three routes, ordered from broadest coverage to finest control.</p>
      <h2>Route 1: The OEM transfer tool</h2>
      <p>Samsung Smart Switch, Xiaomi's Mi Mover, Huawei Phone Clone, and the OPPO/vivo equivalents all do roughly the same thing: move app packages plus whatever Android allows to be backed up over a Wi-Fi Direct link or cable.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`Old phone: Settings → System → Transfer / Phone Clone
New phone: same screen, choose "I'm the new phone"
Keep them close; over 5 GHz direct Wi-Fi expect 30–80 MB/s`}</code></pre>
      <p>It is the least effort and needs no PC. The limits are real, though:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Cross-brand transfers are unreliable.</strong> Chat history comes across because WeChat, WhatsApp, and Telegram ship their own migration protocols — not because the tool did anything clever.</li>
        <li><strong>Big OS gaps break it.</strong> Android 9 to Android 15 frequently results in apps that simply fail to restore.</li>
        <li><strong>Encrypted data stays put.</strong> Anything with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">allowBackup=false</code> is silently skipped.</li>
      </ul>
      <h2>Route 2: Google cloud backup</h2>
      <p>Since Android 9, Google's backup is end-to-end encrypted and covers installed app lists, Wi-Fi passwords, SMS/call history, and app data for apps that permit it.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Force an immediate backup on the old device
adb shell bmgr backupnow --all`}</code></pre>
      <p>On the new phone, pick &quot;Restore from old device&quot; during setup and sign into the same account. Constraints you should plan around:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Constraint</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">What it means</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">25 MB per app</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Game saves, offline video, and large asset caches exceed this and are dropped</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">allowBackup=false</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Banking, payment, and many IM apps opt out; re-login is the only option</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Cadence</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Typically once a day, on charger and Wi-Fi — your last backup may be days old</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Needs Play services</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Devices without GMS can't use this route at all</td></tr></tbody>
      </table></div>
      <h2>Route 3: adb export</h2>
      <p>When you want to know exactly what moved, use adb. Pull the APK first, then handle data separately.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# 1) List third-party packages
adb shell pm list packages -3

# 2) Export the APK itself (no root needed)
adb shell pm path com.example.app
adb pull /data/app/com.example.app-xxxx/base.apk ./com.example.app.apk

# 3) Export one app's private data (prompts for a password)
adb backup -apk -shared -f backup.ab com.example.app`}</code></pre>
      <p>Restore with:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb restore backup.ab`}</code></pre>
      <p>Caveats that will bite you:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb backup</code> has been progressively restricted; on Android 12 and later many packages yield almost nothing. Treat it as a legacy tool.</li>
        <li>Restore requires the <strong>same package name and same signing key</strong>. This is also why installing an APK someone sent you never inherits your existing data.</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-shared</code> pulls in Photos and Downloads too, so backup files balloon fast.</li>
      </ul>
      <h2>Apps that will refuse every route</h2>
      <p>For these, only the app's own transfer feature works:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>WeChat</strong>: Settings → Chats → Chat History Migration, over the same Wi-Fi. Do not rely on Google backup — it keeps only a short window and not all message types.</li>
        <li><strong>Banking and payment apps</strong>: re-login plus device verification. That is the security model working, not a bug.</li>
        <li><strong>Games</strong>: bind to an account (Play Games, Facebook, publisher ID). Save-file backup is not a strategy.</li>
        <li><strong>Enterprise IM</strong>: the admin console may pin the device; ask IT to unbind.</li>
      </ul>
      <h2>An order of operations that covers the most ground</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>Offload photos and downloads to cloud or PC first — keep them out of the app-data question entirely.</li>
        <li>Record the third-party package list (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages -3</code>) so nothing gets forgotten.</li>
        <li>Run the OEM transfer tool as the broad first pass. It has the highest hit rate for the least effort.</li>
        <li>For each app that opens logged-out or broken, go through its in-app migration feature individually.</li>
        <li>Compare version numbers: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell dumpsys package &lt;pkg&gt; | grep versionName</code>. If the new phone has a newer build than the old one, install the matching APK before restoring data — cross-version restore often fails silently.</li>
        <li>Only after the new phone is fully verified should you wipe or recycle the old one.</li>
      </ol>
      <p>To predict which bucket an app falls into before you start, check its manifest flags: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging app.apk | grep -i backup</code>. A <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">false</code> there tells you immediately to plan for a manual re-login instead of wasting an hour on adb.</p>
  </>
);

export const enPosts20261118A = [
  {
    slug: "android-app-migration-with-data",
    title: "Moving Your Apps to a New Android Phone Without Losing Data",
    description: "Reinstalling apps is the easy part; carrying their data across is where people lose chat history, saves, and offline files. This guide compares OEM transfer tools, Google cloud backup, and adb export, explains exactly which apps will refuse each route, and gives an order of operations that covers the most ground first.",
    date: "2026-11-18",
    readTime: "6 min read",
    tags: ["android","apk","backup","migration","adb","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261118AList = toList(enPosts20261118A);
