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

const ARTICLE1 = (
  <>
    <p>
      A 120MB APK that shows 380MB in Settings is not a bug and it is not malware. It is how Android installs apps: DEX
      bytecode gets optimized, resources get decompressed, and native libraries expand per architecture.
    </p>
    <p>
      The actual problem is almost never the app itself. In practice,{" "}
      <strong>
        70% of &quot;storage is full&quot; cases come from caches and forgotten APK files, 20% from universal packages
        carrying three architectures you cannot use, and only 10% from the app being genuinely large.
      </strong>{" "}
      Handle them in that order and you recover 30-50% of the space with essentially no risk.
    </p>

    <h2>First: four numbers that all get called &quot;storage&quot;</h2>
    <p>Before deleting anything, separate these. Confusing them is how people wipe chat history while trying to free a gigabyte.</p>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Where to look</th>
          <th>Typical size</th>
          <th>What happens when deleted</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Downloaded APK</td>
          <td>File manager → Download</td>
          <td>1×</td>
          <td>Nothing. Re-download anytime.</td>
        </tr>
        <tr>
          <td>Installed app body (dex, lib, resources)</td>
          <td>Settings → Apps → App info</td>
          <td>1.5-2.5× APK</td>
          <td>App is gone</td>
        </tr>
        <tr>
          <td>App cache</td>
          <td>Same screen → Storage → Clear cache</td>
          <td>Wildly variable</td>
          <td>Slower once, login intact</td>
        </tr>
        <tr>
          <td>App data</td>
          <td>Same screen → Clear data</td>
          <td>Wildly variable</td>
          <td>Login, history, everything lost</td>
        </tr>
      </tbody>
    </table>
    <p>
      The two buttons in the bottom half of that table sit next to each other and look nearly identical.{" "}
      <strong>That adjacency is the single most common cause of accidental data loss on Android.</strong>
    </p>

    <h2>Second: measure, don&apos;t guess</h2>
    <p>Open Settings → Storage → Apps, sort by size, note the top three. Then scan the invisible part — what Settings never shows:</p>
    <pre>
      <code>{`# Requires USB debugging
adb shell du -h -d 2 /sdcard/Download | sort -h | tail -20

# Every APK on the device (people accumulate dozens without noticing)
adb shell find /sdcard -name "*.apk" -exec ls -lh {} \\;

# Real size breakdown of one app (needs root)
adb shell du -h -d 1 /data/data/com.example.app`}</code>
    </pre>
    <p>
      In practice, <code>/sdcard/Download</code> and the various <code>Android/data/*/cache</code> directories routinely hold
      5-15GB on a &quot;full&quot; phone. Video apps, social apps, and cloud-drive clients are the usual suspects.
    </p>

    <h2>Third: clear caches, ordered by how little it hurts</h2>
    <p>Not all caches are equal:</p>
    <ul>
      <li>
        <strong>Video apps</strong> (YouTube, TikTok, bilibili): pure temporary files. Clearing costs nothing, saves hundreds
        of MB to several GB.
      </li>
      <li>
        <strong>Social apps</strong> (WeChat, WhatsApp): caches mix in chat images and videos. Clearing means re-downloading,
        but history survives. Hundreds of MB to a few GB.
      </li>
      <li>
        <strong>Maps</strong>: offline maps live in <em>data</em>, not cache. Clearing cache is safe; never clear data.
      </li>
      <li>
        <strong>Games</strong>: cache is usually the unpacked resource bundle. Clearing means a slow next launch while it
        re-extracts.
      </li>
    </ul>
    <p>For batch clearing, use the system API rather than tapping through each app:</p>
    <pre>
      <code>{`adb shell pm trim-caches 8G`}</code>
    </pre>
    <p>
      This asks the system to reclaim cache until total cache is under the target. It is safer than manual clearing because it
      will not touch user data.
    </p>

    <h2>Fourth: the universal APK problem</h2>
    <p>
      APKs from third-party sites are often <strong>universal packages</strong> containing native libraries for{" "}
      <code>arm64-v8a</code>, <code>armeabi-v7a</code>, <code>x86</code>, and <code>x86_64</code> simultaneously. Your phone
      uses exactly one.
    </p>
    <pre>
      <code>{`unzip -l app.apk | grep "lib/"`}</code>
    </pre>
    <p>If that output lists multiple <code>&lt;abi&gt;</code> directories, more than half the download is for devices that are not yours.</p>
    <p>Three legitimate fixes:</p>
    <ol>
      <li>
        <strong>Download a single-ABI build.</strong> APKMirror and similar sites let you filter by device or architecture.
        Choosing <code>arm64-v8a</code> for a 2020+ phone cuts 30-60%.
      </li>
      <li>
        <strong>Use split APKs.</strong> AAB-derived <code>.apks</code>/<code>.xapk</code> bundles are already
        architecture-specific. Install with <code>adb install-multiple</code>.
      </li>
      <li>
        <strong>Do not repack.</strong> Tutorials that tell you to unzip, delete extra <code>lib/</code> folders, and re-zip
        produce an unsigned or self-signed APK. It will not update over the original, and security software will flag it.
      </li>
    </ol>

    <h2>Fifth: genuine data growth</h2>
    <p>Some apps are legitimately huge, and they grow:</p>
    <ul>
      <li>
        <strong>WeChat</strong>: tens of GB is normal. Use its built-in storage manager (Me → Settings → General → Storage →
        Manage) to clear by conversation and date, far more precise than &quot;clear data.&quot;
      </li>
      <li>
        <strong>Browsers</strong>: cache plus offline content. Periodic cache clear is enough.
      </li>
      <li>
        <strong>Cloud drives</strong>: locally synced files. Do not mistake &quot;downloaded&quot; for &quot;cache&quot; and
        delete something you need offline.
      </li>
      <li>
        <strong>Games</strong>: <code>Android/obb/</code> resource packs. Uninstalling the game does not remove them; they
        must be deleted manually.
      </li>
    </ul>
    <p>Uninstall leftovers are the easiest free space on the device:</p>
    <pre>
      <code>{`adb shell du -h -d 1 /sdcard/Android/data | sort -h | tail -15`}</code>
    </pre>
    <p>
      Any directory in that list whose package is no longer installed is an orphan. Delete it. Several GB is common, especially
      for apps originally side-loaded from outside the store.
    </p>

    <h2>A cleanup order that cannot go wrong</h2>
    <ol>
      <li>
        Delete every <code>.apk</code> in <code>/sdcard/Download</code> — zero risk.
      </li>
      <li>
        Clear <strong>cache</strong> for video and social apps — zero risk.
      </li>
      <li>
        Remove orphaned <code>Android/data</code> directories for uninstalled apps — low risk, confirm uninstalled first.
      </li>
      <li>Swap universal APKs for single-ABI builds — moderate risk, back up data first.</li>
      <li>Use in-app storage managers for history and media — irreversible, confirm item by item.</li>
    </ol>
    <p>Steps 1 and 2 alone solve most cases.</p>

    <h2>Four things that are not worth doing</h2>
    <p>
      <strong>&quot;A cleaner app will handle it.&quot;</strong> Cleaner apps mostly clear cache, which the system already does.
      Some push &quot;deep clean&quot; that removes system caches and makes the phone slower.
    </p>
    <p>
      <strong>&quot;Deleting the APK breaks the app.&quot;</strong> It does not. The APK is install media; the system already
      extracted it into <code>/data/app</code>.
    </p>
    <p>
      <strong>&quot;An app three times bigger than its APK means malware.&quot;</strong> Usually not. DEX optimization, resource
      expansion, and per-architecture native libraries account for 2× legitimately. The real red flags are cache that keeps
      growing on its own and abnormal idle battery drain.
    </p>
    <p>
      <strong>&quot;Just install an older, smaller version.&quot;</strong> You lose features and security patches, and you may
      hit a <code>minSdkVersion</code> wall. Changing versions solves the architecture problem; it does not solve bloat.
    </p>

    <h2>The one-line version</h2>
    <p>
      <strong>Measure, clear caches, switch to single-ABI packages, and only then touch app data.</strong> Most &quot;not
      enough space&quot; complaints die at the first two steps — people skip to the last one and lose data for nothing.
    </p>
    <p>
      When you need to re-download an official build, grab the architecture-matched package from <Link href="/">gptoapk.com</Link>{" "}
      instead of downloading another universal APK.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Why does a 120MB APK take up 380MB after installation?",
    answer:
      "Installation optimizes DEX bytecode, decompresses resources, and expands native libraries for your device's architecture, so an installed app is typically 1.5-2.5× its APK size. That is normal. If the ratio exceeds 3×, the excess is almost always cache or app data rather than the app body.",
  },
  {
    question: "What is the difference between clearing cache and clearing data?",
    answer:
      "Clearing cache removes temporary files only, keeping your login state and history — it is the safest operation on Android. Clearing data deletes all user data including credentials, chat history, and local databases, permanently. The two buttons sit next to each other and look similar, so check before tapping.",
  },
  {
    question: "Why do universal APKs take up more space?",
    answer:
      "A universal APK bundles native libraries for arm64-v8a, armeabi-v7a, x86, and x86_64 at once, while your device uses only one. Downloading a single-ABI build typically saves 30-60% with no functional loss.",
  },
  {
    question: "Can I repack an APK to strip the extra architecture folders?",
    answer:
      "Not recommended. Repacking breaks the original signing certificate, so the app cannot be updated over the existing install, integrity checks fail, and some apps refuse to launch. Download an official single-ABI build or split bundle instead.",
  },
];

const ARTICLE2 = (
  <>
    <p>
      When you move to a new phone, photos transfer fine. What breaks is the data inside apps that are not in the store —
      side-loaded builds, beta versions, internal tools, delisted apps.
    </p>
    <p>
      The app itself is trivial to move: copy the APK, install it. The data is the whole problem. And unlike Play Store apps,
      these usually have no cloud sync to fall back on.
    </p>

    <h2>Where app data actually lives</h2>
    <p>Migration feasibility depends entirely on location:</p>
    <table>
      <thead>
        <tr>
          <th>Path</th>
          <th>Contents</th>
          <th>Accessible without root</th>
          <th>Examples</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>/data/data/&lt;pkg&gt;/</code>
          </td>
          <td>Login state, SQLite DBs, prefs</td>
          <td>No</td>
          <td>Nearly everything</td>
        </tr>
        <tr>
          <td>
            <code>/data/data/&lt;pkg&gt;/shared_prefs/</code>
          </td>
          <td>Settings, tokens</td>
          <td>No</td>
          <td>Same</td>
        </tr>
        <tr>
          <td>
            <code>/sdcard/Android/data/&lt;pkg&gt;/</code>
          </td>
          <td>Downloaded assets, large files</td>
          <td>Partial (Android 11+ scoped)</td>
          <td>Games, music, cloud drives</td>
        </tr>
        <tr>
          <td>
            <code>/sdcard/Android/obb/&lt;pkg&gt;/</code>
          </td>
          <td>Game expansion packs</td>
          <td>Yes</td>
          <td>Large games</td>
        </tr>
        <tr>
          <td>App&apos;s own export function</td>
          <td>Whatever the app exports</td>
          <td>Yes</td>
          <td>Some utilities</td>
        </tr>
      </tbody>
    </table>
    <p>
      The core conflict: the data that matters most — login state — sits in <code>/data/data</code>, the one directory non-root
      access cannot touch. Every workable strategy either replaces the need for it or works around the restriction.
    </p>

    <h2>Path 1: adb backup (easiest, medium success rate)</h2>
    <p>Android has built-in backup, gated by two constraints:</p>
    <ol>
      <li>
        The app must set <code>allowBackup=&quot;true&quot;</code> in its manifest — many apps deliberately disable it.
      </li>
      <li>Support has been degraded since Android 12; some vendors disable it entirely.</li>
    </ol>
    <pre>
      <code>{`# Back up one app (device prompts for confirmation + password)
adb backup -apk -shared -f backup_myapp.ab com.example.app

# Restore
adb restore backup_myapp.ab`}</code>
    </pre>
    <p>
      The <code>.ab</code> format is a compressed tar. You can decode it and inspect what you actually got:
    </p>
    <pre>
      <code>{`python3 -c "
import zlib
data = open('backup_myapp.ab','rb').read()
raw = zlib.decompress(data[24:])   # 24-byte header, then zlib stream
open('backup.tar','wb').write(raw)
"
tar -tf backup.tar | head`}</code>
    </pre>
    <p>
      In practice this works for older apps and utilities. It fails for anything security-sensitive — banking apps, WeChat, most
      games — because those disable backup on purpose.
    </p>

    <h2>Path 2: the app&apos;s own migration flow (most reliable when it exists)</h2>
    <p>Many apps built their own transfer, far more dependable than system backup, but the entry point is buried:</p>
    <ul>
      <li>
        <strong>WeChat</strong>: Me → Settings → General → Chat History Migration &amp; Backup → Migrate to another device.
        Transfers directly over Wi-Fi, much faster than cloud backup.
      </li>
      <li>
        <strong>Games</strong>: most rely on account binding (Google Play Games, official accounts, third-party login). Sign in
        and progress returns. No file copying needed.
      </li>
      <li>
        <strong>Cloud storage / notes</strong>: sync by design. Log in and done.
      </li>
    </ul>
    <p>
      <strong>Decision rule:</strong> if the app requires an account, first confirm whether logging in restores your data. For
      roughly 90% of apps the answer is yes, and you need none of the steps below.
    </p>

    <h2>Path 3: file-level copy (most general)</h2>
    <p>For apps with local-only login state — utilities, offline games, beta builds.</p>
    <p>
      <strong>Step 1: export the data</strong>
    </p>
    <pre>
      <code>{`# With root
adb shell su -c "tar -czf /sdcard/myapp_data.tar.gz /data/data/com.example.app"
adb pull /sdcard/myapp_data.tar.gz`}</code>
    </pre>
    <p>
      Without root, <code>run-as</code> works only for debuggable builds (your own internal test packages usually qualify):
    </p>
    <pre>
      <code>{`adb shell run-as com.example.app tar -czf /sdcard/myapp_data.tar.gz .
adb pull /sdcard/myapp_data.tar.gz`}</code>
    </pre>
    <p>
      <strong>Step 2: install on the new phone, then do not open it</strong>
    </p>
    <p>
      This matters. Once the app launches it initializes its database and writes its own state. Overwriting that afterward
      invites conflicts.
    </p>
    <pre>
      <code>{`adb install myapp-2.3.1.apk
# Do not tap the icon.

adb push myapp_data.tar.gz /sdcard/
adb shell su -c "tar -xzf /sdcard/myapp_data.tar.gz -C /data/data/com.example.app"

# Fix ownership (wrong uid/gid = instant crash)
adb shell su -c "chown -R $(adb shell stat -c '%u:%g' /data/data/com.example.app) /data/data/com.example.app"

# Fix SELinux labels — the step everyone forgets
adb shell su -c "restorecon -R /data/data/com.example.app"`}</code>
    </pre>
    <p>
      <strong>
        <code>restorecon</code> is non-negotiable.
      </strong>{" "}
      SELinux labels every app directory. Files extracted by hand carry the wrong label, the app cannot read its own data, and
      the symptom is a crash on launch with a cryptic <code>avc: denied</code> in logcat. Skipping this one command is the most
      common reason this method &quot;does not work.&quot;
    </p>
    <p>
      <strong>Step 3: verify</strong>
    </p>
    <pre>
      <code>{`adb shell run-as com.example.app ls -l databases/
adb logcat -d | grep -i "com.example.app" | tail -50`}</code>
    </pre>

    <h2>Path 4: move the parts that move (best fallback)</h2>
    <p>If none of the above is possible, grabbing these four things saves about 80% of the rebuild effort:</p>
    <ol>
      <li>
        <strong>
          <code>Android/obb/</code> game resource packs
        </strong>{" "}
        — copy directly, avoids a multi-GB re-download.
      </li>
      <li>
        <strong>In-app exports</strong> — note apps and password managers usually export JSON/CSV; import on the new phone.
      </li>
      <li>
        <strong>Credentials</strong> — use a password manager (Bitwarden, KeePass), not memory.
      </li>
      <li>
        <strong>Config files</strong> — many utilities leave config under <code>/sdcard/&lt;appname&gt;/</code>. Copy the
        directory.
      </li>
    </ol>
    <pre>
      <code>{`adb pull /sdcard/Android/obb ./obb_backup
adb pull /sdcard/Android/data ./data_backup`}</code>
    </pre>

    <h2>Three things to do before you start</h2>
    <ol>
      <li>
        <strong>Confirm the target OS version is at least the source version.</strong> Migrating a database from a newer to an
        older Android release can break schema handling and crash the app.
      </li>
      <li>
        <strong>Record package names and versions.</strong> <code>adb shell pm list packages -3</code> plus{" "}
        <code>dumpsys package &lt;pkg&gt; | grep versionName</code>. You will want this when something goes wrong.
      </li>
      <li>
        <strong>Keep the original APK.</strong> Migration often needs a reinstall, and the same version can be hard to find
        again.
      </li>
    </ol>

    <h2>Failure modes and what they actually mean</h2>
    <p>
      <strong>&quot;I fixed permissions but it still crashes.&quot;</strong> SELinux labels, not Unix permissions. Run{" "}
      <code>restorecon -R</code>.
    </p>
    <p>
      <strong>&quot;Restored, but login is gone.&quot;</strong> Some apps bind tokens to the device Android ID or keystore. A
      new device requires a fresh login. This is a deliberate security design, not a bug you can route around.
    </p>
    <p>
      <strong>&quot;OBB copied but the game still wants to download.&quot;</strong> The directory name must match the package
      exactly, and large games use <code>main.&lt;version&gt;.&lt;pkg&gt;.obb</code> naming where a single wrong character
      breaks it.
    </p>
    <p>
      <strong>&quot;I will just use a one-tap migration tool.&quot;</strong> Such tools do the same things listed above, but
      demand sweeping permissions. The trust cost exceeds the convenience — your data is better moved by you.
    </p>

    <h2>Summary</h2>
    <p>
      <strong>
        Try in order: check for account-based sync → use the app&apos;s own migration → try <code>adb backup</code> → root-level
        file copy → fall back to OBB and exports.
      </strong>{" "}
      Each step up lowers the success rate and raises the cost, but widens coverage. Once migrated, grab the matching build from{" "}
      <Link href="/">gptoapk.com</Link> when you need to reinstall.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Can I migrate app login state without root?",
    answer:
      "Login state lives in /data/data, which non-root access cannot read, so the only paths are indirect: check whether signing into the same account restores data (true for most apps); use the app's own migration feature for chat or user data; or try adb backup if the app allows it. As a last resort, use the app's export function, then log in fresh and import.",
  },
  {
    question: "Why does an app crash immediately after I copy its data into /data/data?",
    answer:
      "Almost always missing SELinux labels. Files extracted manually into /data/data carry the wrong security context, so the app cannot read its own data and you get avc: denied in logcat. Run restorecon -R /data/data/<package> to relabel, and make sure chown fixed ownership as well.",
  },
  {
    question: "Why does adb backup fail for so many apps?",
    answer:
      "adb backup requires the app to declare allowBackup=\"true\". Security-sensitive apps — banking, WeChat, most games — deliberately disable it, so the backup comes out empty. Android 12 also weakened system support, and some vendor ROMs disable it outright.",
  },
  {
    question: "How do I migrate game OBB resource packs?",
    answer:
      "Copy the entire /sdcard/Android/obb/<package>/ directory to the same path on the new phone. The folder name must match the package exactly, and large games follow a main.<version>.<package>.obb naming rule. Install the same APK version afterward and the game will not re-download assets.",
  },
];

export const enPosts20261112 = [
  {
    slug: "apk-storage-bloat-reclaim-space",
    title: "APK Storage Bloat Explained: Why a 120MB APK Becomes 380MB Installed — and How to Reclaim It",
    description:
      "A 120MB APK showing 380MB after install is normal. The real problem is what accumulates around it. How to measure storage properly, what is safe to clear, why universal APKs waste half your space, and a five-step cleanup order that recovers 30-50% with zero risk.",
    date: "2026-11-12",
    readTime: "10 min read",
    tags: ["android", "apk", "tips"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-app-data-migration-sideloaded",
    title: "Android App Data Migration for Sideloaded Apps: Moving Login State, Game Saves, and Databases",
    description:
      "App bodies are easy to move — reinstall and done. Data is the hard part, and the critical login state lives in /data/data, unreachable without root. Four migration paths ranked by success rate, including the SELinux step everyone forgets that causes instant crashes.",
    date: "2026-11-12",
    readTime: "11 min read",
    tags: ["android", "apk", "backup"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261112List = toList(enPosts20261112);
