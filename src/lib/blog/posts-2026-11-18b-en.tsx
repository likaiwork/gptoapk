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
      <p>&quot;Storage space is running out&quot; is one of the least actionable messages Android produces. You uninstall seven apps, gain 1.2 GB, and the system still wants 3 GB more. Uninstalling only reclaims part of what an app occupied: installers, caches, OBB asset packs, logs, and system reservations all sit in different directories, and three of those four are not cleaned up by uninstalling — especially on a device where APKs have been sideloaded from browsers or third-party sites.</p>
      <p>The fix is to sort by size and find the actual offender before deleting anything at random.</p>
      <h2>Find out who ate the space</h2>
      <p>The Settings → Storage panel gives broad categories, but nothing granular. Use <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">du</code> to rank directories by real size:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 1 /sdcard/`}</code></pre>
      <p>That prints the size of every top-level directory in internal storage. The usual suspects:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Directory</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Contents</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Safe to delete</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Download</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Sideloaded APKs, documents, installers</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Yes</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/obb</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Large game asset packs</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Careful — the game re-downloads them</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/data</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App external data, including heavy caches</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Yes, but you lose offline content</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/DCIM</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/Pictures</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Photos and video</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Back up first</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Telegram</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/WeChat</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App-managed media</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Yes, but media in chats disappears</td></tr></tbody>
      </table></div>
      <p>Drill one level deeper to catch whatever suddenly grew:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 2 /sdcard/ | sort -hr | head -20`}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">sort -hr</code> sorts by human-readable size, so the top 20 lines are effectively your entire problem.</p>
      <h2>Category 1: Installer APKs nobody remembers downloading</h2>
      <p>APKs downloaded through a browser, WeChat, or a file manager sit quietly in Download. Each is 80–300 MB, and a year of accumulation easily reaches 10 GB. Android has never changed the behaviour: <strong>installing an APK does not delete the APK</strong>.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Every APK larger than 20 MB
adb shell find /sdcard -name "*.apk" -size +20M -exec ls -lh {} \\;`}</code></pre>
      <p>A practical rule before wiping them: keep only versions you would actually roll back to. The legitimate reason to hold an APK is &quot;the Play Store update broke something and I want the previous build.&quot; Keep that one file, delete the rest. For long-term version management, record the package name and version (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt dump badging x.apk | head -2</code>) and re-download when needed — far cheaper than hoarding binaries.</p>
      <h2>Category 2: Cache is not automatically safe to clear</h2>
      <p>Clearing cache gives immediate wins but costs you: slower next launch, and offline content gone. What is worth clearing:</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Video and music apps</strong> — caches frequently hit tens of GB, and clearing just means re-streaming later. Best value per tap.</li>
        <li><strong>Map apps</strong> — offline maps are filed as cache but are essential. Clearing means re-downloading whole cities.</li>
        <li><strong>Browsers</strong> — you lose session state and open tabs.</li>
        <li><strong>Messaging apps</strong> — clearing cache deletes original images and videos inside chats. Messages survive; the media does not.</li>
      </ul>
      <p>Built-in &quot;storage cleaner&quot; features apply exactly this logic blindly, which is why going app by app into Settings → Apps → Storage and reading the cache line is worth the extra minute.</p>
      <p>There is also cache-like cruft hiding in uninstall residue. After uninstalling, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/data/&lt;package&gt;</code> sometimes remains, particularly if the uninstall was interrupted. Check:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell ls /sdcard/Android/data/`}</code></pre>
      <p>Compare against <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages</code> and delete directories whose package no longer exists. It is safe, and often recovers several GB.</p>
      <h2>Category 3: OBB packs and stale versions</h2>
      <p>Large games (Genshin, PUBG, and friends) keep resources in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/obb/&lt;package&gt;/</code>, each 3–8 GB. <strong>These are not reliably removed on uninstall</strong>, which is the classic &quot;I deleted the game but the space never came back.&quot;</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 1 /sdcard/Android/obb/`}</code></pre>
      <p>If the package is not installed anymore, the whole directory can go. Never delete one while the game is installed — it will fail to launch with missing-asset errors.</p>
      <p>Then there is the less visible layer: leftover system update packages, duplicate installs from banking apps, and debug test APKs living under <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app</code>. A rough check:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell du -h -d 1 /data/app/ | sort -hr | head -10`}</code></pre>
      <h2>Clean in this order</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>Rank directories: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">du -h -d 2 /sdcard/ | sort -hr | head -20</code>.</li>
        <li>Delete large APKs in Download, keeping only the rollback build you care about.</li>
        <li>Remove orphaned folders in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/sdcard/Android/data</code> whose packages no longer exist.</li>
        <li>Remove OBB directories for games that are already uninstalled.</li>
        <li>Go app by app and clear caches, starting with video, music, and browsers.</li>
        <li>Only then move photos and video to a PC or cloud.</li>
        <li>Verify with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell df -h /data</code>.</li>
      </ol>
      <p>If you only sideload occasionally, the durable habit is simpler than any cleanup routine: delete the installer the moment <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm install</code> finishes. If you want rollback insurance, note the version string and a download URL — that costs nothing, while a 200 MB file sitting in Download costs you forever.</p>
  </>
);

export const enPosts20261118B = [
  {
    slug: "android-storage-full-apk-cleanup",
    title: "Storage Full After Uninstalling Apps? Where Android Actually Hides the Space",
    description: "Deleting a dozen apps and gaining 1 GB means you looked in the wrong place. APK installers, app caches, OBB asset packs, and orphaned /data/app leftovers live in different directories, and three of the four survive uninstalling. Here is how to sort by size with du and adb, then clean each category in the right order.",
    date: "2026-11-18",
    readTime: "6 min read",
    tags: ["android","storage","apk","optimization","adb","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261118BList = toList(enPosts20261118B);
