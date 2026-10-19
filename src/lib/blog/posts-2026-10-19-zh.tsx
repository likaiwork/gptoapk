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
    <p className="lead">
      Let&rsquo;s be honest: most people only ever <em>install</em> APKs. Nothing is saved, nothing is named, and three
      years later the phone is carrying 20&nbsp;GB of mystery installers, a dozen abandoned duplicates, and no copy of
      the one app you actually need to roll back. The problem isn&rsquo;t the phone &mdash; it&rsquo;s that there&rsquo;s
      no system. This guide gives you one: where to store installers, how to name them, what to back up, how to
      downgrade safely, and what monthly cleanup actually looks like.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> APK management is four habits &mdash; <strong>archive</strong> (keep what you
        install), <strong>back up</strong> (keep the versions that matter), <strong>skip duplicates</strong>, and{" "}
        <strong>purge monthly</strong>. Five minutes each, and you never hunt for an installer again.
      </p>
    </blockquote>

    <h2>1. Build a real folder structure</h2>
    <p>
      The default <code>/Download</code> folder is where order goes to die. Create a dedicated APK archive instead:
    </p>
    <pre>
      <code>{`/SD/APK/
├── 01-active/      ← apps you use daily
├── 02-backup/      ← occasional tools
├── 03-testing/     ← new downloads, not yet verified
└── 99-archive/     ← known-good older versions`}</code>
    </pre>
    <p>
      The <strong>testing</strong> folder is the important one. It&rsquo;s your buffer: new downloads land there, get
      verified, and only then move into <em>active</em> or <em>backup</em>. Without a buffer, unverified files become
      permanent files.
    </p>

    <h2>2. Name files so future-you understands them</h2>
    <p>
      Default names like <code>com.tencent.mm_8.0.40_2400.apk</code>, <code>app-release(1).apk</code>, or{" "}
      <code>download.apk</code> are useless six months later. Adopt one pattern:
    </p>
    <pre>
      <code>{`AppName_Version_Source_Date.apk
WeChat_8.0.49_official_20261019.apk
SplitToolsPro_2.3.1_APKMirror_20261012.apk`}</code>
    </pre>
    <p>Three fields earn their place:</p>
    <ul>
      <li>
        <strong>Version</strong> &mdash; the only reliable anchor when you need to roll back;
      </li>
      <li>
        <strong>Source</strong> &mdash; lets you trace a bad file back to whoever served it;
      </li>
      <li>
        <strong>Date</strong> &mdash; tells you instantly whether that build is now too old to be useful.
      </li>
    </ul>
    <p>
      Don&rsquo;t rename one at a time. Use a file manager with batch rename (MT Manager supports regex), or a one-line
      shell loop on a computer.
    </p>

    <h2>3. Back up selectively, not everything</h2>
    <p>Not every app deserves a saved installer. Use this rule:</p>
    <ul>
      <li>
        <strong>Worth keeping:</strong> niche utilities, apps pulled from the Store, internal enterprise apps, and any
        specific version that still works better than the current one.
      </li>
      <li>
        <strong>Not worth keeping:</strong> mainstream apps you can always re-download. Keeping stale copies of banking
        or messaging apps is a security liability, not a backup.
      </li>
    </ul>
    <p>Three ways to get a copy:</p>
    <ul>
      <li>
        <strong>Keep the original download</strong> before installing &mdash; most reliable, signature untouched.
      </li>
      <li>
        <strong>Extract the installed app</strong> with a tool like SAI or APK Extractor when you never saved it.
      </li>
      <li>
        <strong>ADB (cleanest)</strong> &mdash; <code>adb shell pm path com.example.app</code> then{" "}
        <code>adb pull</code> each path. Remember split apps need <em>all</em> splits pulled, or{" "}
        <code>.apks</code> export via SAI.
      </li>
    </ul>
    <p>
      Finally, sync <code>/SD/APK/01-active/</code> to a computer or cloud drive. A backup that lives only on the phone
      you&rsquo;re about to lose isn&rsquo;t a backup.
    </p>

    <h2>4. Check before you install</h2>
    <p>One minute of pre-install checks saves hours of cleanup later:</p>
    <ul>
      <li>
        <strong>Signature / source</strong> &mdash; download from official channels and compare the SHA-256 against
        the publisher&rsquo;s value.
      </li>
      <li>
        <strong>Permissions</strong> &mdash; a flashlight app asking for contacts is a repackage, not a flashlight.
      </li>
      <li>
        <strong>Compatibility</strong> &mdash; confirm <code>minSdkVersion</code> and CPU ABI match your device. A
        mismatched ABI is the most common silent failure.
      </li>
    </ul>
    <p>
      Signature checking in particular catches re-signed clones. Two files claiming to be the same app with different
      signatures means one is fake &mdash; and the &ldquo;App not installed&rdquo; error is telling you exactly that.
    </p>

    <h2>5. Version management: upgrade <em>and</em> downgrade</h2>
    <p>Downgrades are harder than upgrades, and this is where people get burned:</p>
    <ul>
      <li>Android won&rsquo;t install an older version over a newer one;</li>
      <li>
        You must <strong>uninstall first</strong>, which wipes app data unless you backed it up;
      </li>
      <li>So back up <em>before</em> you upgrade, not after something breaks.</li>
    </ul>
    <p>A safe cycle:</p>
    <ol>
      <li>Keep the current installer and note the version number.</li>
      <li>Upgrade.</li>
      <li>Observe for 3&ndash;7 days &mdash; notification push, background behavior, battery.</li>
      <li>If stable, delete the old installer. If not, uninstall and reinstall the old build.</li>
    </ol>
    <p>
      Don&rsquo;t skip step 3. Many regressions (broken push, aggressive background killing) show up on day three,
      long after you deleted the old APK.
    </p>

    <h2>6. Monthly cleanup in five minutes</h2>
    <ol>
      <li>
        <strong>Testing folder:</strong> anything older than 30 days that worked fine &rarr; archive or delete.
      </li>
      <li>
        <strong>Archive folder:</strong> builds older than a year with no special need &rarr; delete.
      </li>
      <li>
        <strong>Total size:</strong> check <code>/SD/APK</code>; over 5&nbsp;GB means time to trim.
      </li>
      <li>
        <strong>Duplicates:</strong> same app, multiple dates &rarr; keep the newest.
      </li>
    </ol>
    <p>
      <strong>One warning:</strong> don&rsquo;t point &ldquo;one-tap cleaner&rdquo; apps at your APK folder. They
      can&rsquo;t distinguish junk installers from your backups, and the backups usually get deleted first.
    </p>

    <h2>7. Why this pays off when you switch phones</h2>
    <p>With the system above, migration is boring &mdash; which is the goal:</p>
    <ol>
      <li>Copy <code>/SD/APK/01-active/</code> to the new phone.</li>
      <li>Install each (or use <code>adb install-multiple</code> for split bundles).</li>
      <li>Restore data via the system migration tool or each app&rsquo;s own export.</li>
    </ol>
    <p>
      The people who suffer most during a phone switch aren&rsquo;t missing the big apps &mdash; it&rsquo;s the dozen
      small tools they use daily and can no longer name.
    </p>

    <h2>The short version</h2>
    <ul>
      <li>
        <strong>Archive:</strong> dedicated folder, new downloads go to <em>testing</em> first.
      </li>
      <li>
        <strong>Name:</strong> app_version_source_date.
      </li>
      <li>
        <strong>Back up:</strong> selectively, and sync off-device.
      </li>
      <li>
        <strong>Purge:</strong> five minutes a month.
      </li>
    </ul>
    <p>
      None of this is complicated. It just has to be consistent. Do it once properly and APK chaos is over for good.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Where should I store APK files on Android?",
    answer:
      "Use a dedicated folder instead of the default Download directory — for example /SD/APK with subfolders for active apps, backups, untested downloads, and archived versions. Keeping unverified downloads in a separate 'testing' folder prevents junk from becoming permanent clutter.",
  },
  {
    question: "How do I extract an APK from an app I already installed?",
    answer:
      "Either use an extractor app like SAI or APK Extractor, or connect to a computer and run adb shell pm path <package> followed by adb pull for each returned path. For split (App Bundle) apps you must pull base.apk together with every split, or export the full set as an .apks file.",
  },
  {
    question: "Why does Android refuse to install an older version of an app?",
    answer:
      "Android blocks downgrade installs by default for security and data-integrity reasons. You have to uninstall the newer version first — which deletes app data unless you backed it up. That's why you should keep the current installer and a data backup before every upgrade.",
  },
  {
    question: "Is it safe to use a one-tap cleaner to remove old APK files?",
    answer:
      "It's risky. Generic cleaner apps can't distinguish junk installers from your intentional backups, and they often delete the backups first. Manual cleanup by filename and date in a file manager is far safer.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      Installing an APK on a Samsung phone trips people up more than it should. The reason isn&rsquo;t Samsung&rsquo;s
      fault &mdash; One UI implements Android&rsquo;s permission model faithfully. There is{" "}
      <strong>no global &ldquo;allow unknown sources&rdquo; switch.</strong> Permission is granted{" "}
      <strong>per source</strong>, which means authorizing your file manager and then installing from a browser will
      still be blocked. Here&rsquo;s the full flow in eight checkpoints, including the Samsung-specific traps.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> On Samsung, installation permission belongs to the <em>app doing the
        installing</em>, not to the APK file. Once that clicks, every error message becomes diagnosable.
      </p>
    </blockquote>

    <h2>Checkpoint 1: Identify your install source</h2>
    <p>Before anything else, decide where the APK is coming from:</p>
    <ul>
      <li>File manager (My Files / Files by Google)</li>
      <li>Browser (Chrome / Samsung Internet)</li>
      <li>Messaging app (WhatsApp, Telegram, WeChat)</li>
      <li>Cloud client (OneDrive, Google Drive)</li>
    </ul>
    <p>
      <strong>Each one needs its own authorization.</strong> This single fact explains 80% of &ldquo;but I already
      allowed it&rdquo; complaints.
    </p>

    <h2>Checkpoint 2: Grant install permission for that one source</h2>
    <p>On One UI 5 through 7, the path is:</p>
    <pre>
      <code>{`Settings → Apps → ⋮ (top right) → Special access → Install unknown apps`}</code>
    </pre>
    <p>Or on some builds:</p>
    <pre>
      <code>{`Settings → Security and privacy → More security settings → Install unknown apps`}</code>
    </pre>
    <p>
      You&rsquo;ll get a list of apps, each with a toggle. <strong>Enable only the source you need</strong> &mdash; for
      example, My Files. Don&rsquo;t flip every switch: each enabled source is another path a malicious file can use.
      Turning it back off afterwards is a good habit.
    </p>

    <h2>Checkpoint 3: Verify the file is complete</h2>
    <ul>
      <li>
        <strong>Single APK:</strong> tens to hundreds of MB. A file measured in kilobytes is broken or a phishing
        stub.
      </li>
      <li>
        <strong>.apks / .xapk / .apkm:</strong> bundles &mdash; the system installer will reject these. Use SAI.
      </li>
      <li>
        <strong>A pile of <code>split_config.*.apk</code> files:</strong> must be installed together. Tapping base.apk
        alone yields &ldquo;App not installed.&rdquo;
      </li>
    </ul>
    <p>This is the single most common Samsung-side failure: downloading an App Bundle app and trying to tap one file.</p>

    <h2>Checkpoint 4: Account for Secure Folder and Knox</h2>
    <ul>
      <li>
        <strong>Secure Folder</strong> is a separate install environment. You can&rsquo;t reuse the main space&rsquo;s
        authorization &mdash; you must repeat both the permission grant and the install inside it.
      </li>
      <li>
        <strong>Knox / MDM-managed devices:</strong> if the &ldquo;Install unknown apps&rdquo; toggle is greyed out or
        the phone says it&rsquo;s managed by your organization, sideloading is blocked by policy. There is no
        user-side workaround; talk to your IT admin.
      </li>
    </ul>
    <p>Many people burn an hour on this without realizing it was never going to work.</p>

    <h2>Checkpoint 5: Decode the error messages</h2>
    <ul>
      <li>
        <strong>&ldquo;App not installed&rdquo;</strong> &mdash; signature conflict, incomplete splits, or a downgrade
        attempt. Uninstall the existing version or supply all splits.
      </li>
      <li>
        <strong>&ldquo;There was a problem parsing the package&rdquo;</strong> &mdash; corrupt or truncated download.
        Re-download and check the file size.
      </li>
      <li>
        <strong>&ldquo;Your device isn&rsquo;t compatible&rdquo;</strong> &mdash; <code>minSdkVersion</code> too high or
        wrong CPU ABI. Get an arm64-v8a build for modern phones.
      </li>
      <li>
        <strong>&ldquo;Blocked by security policy&rdquo;</strong> &mdash; source not authorized, or Knox restriction.
      </li>
    </ul>
    <p>
      For &ldquo;App not installed,&rdquo; the diagnostic order is: missing splits &rarr; version downgrade &rarr;
      signature conflict with the already-installed app.
    </p>

    <h2>Checkpoint 6: Handle Play Protect correctly</h2>
    <ol>
      <li>Tap <strong>More details</strong> &rarr; <strong>Install anyway</strong> only if you trust the package.</li>
      <li>
        For known false positives (small open-source tools often trip it), you can temporarily disable scanning in Play
        Store &rarr; profile &rarr; Play Protect &rarr; settings, then re-enable it.
      </li>
      <li>
        <strong>Don&rsquo;t make it permanent.</strong> Leaving Play Protect off is like removing the metal detector
        from an airport permanently.
      </li>
    </ol>
    <p>
      If it reports a malware family rather than &ldquo;unknown app,&rdquo; don&rsquo;t override it &mdash; scan the
      file on VirusTotal first.
    </p>

    <h2>Checkpoint 7: Do three things right after installing</h2>
    <ol>
      <li>
        <strong>Restrict background activity.</strong> Settings → Battery and device care → Background usage limits →
        add the app to <em>Deep sleeping apps</em>. Samsung&rsquo;s power management is aggressive; skip this and
        notifications silently stop.
      </li>
      <li>
        <strong>Audit permissions.</strong> Settings → Apps → [app] → Permissions. Turn off location, contacts, and SMS
        unless there&rsquo;s a clear reason.
      </li>
      <li>
        <strong>Revoke the install permission.</strong> Go back to checkpoint 2 and switch off sources you no longer
        need.
      </li>
    </ol>

    <h2>Checkpoint 8: Uninstall cleanly if something feels off</h2>
    <ol>
      <li>Back up app data first (in-app export or system backup).</li>
      <li>Uninstall normally from the home screen.</li>
      <li>
        Check for leftovers: Settings → Apps → Show system apps, look for stray services or plugins.
      </li>
      <li>Reinstall the older build, then restore data.</li>
    </ol>
    <p>
      <strong>One exception:</strong> don&rsquo;t sideload replacements for Samsung system apps like Galaxy Store or
      Samsung Pay. Signature verification is strict there, and forcing it usually breaks related features.
    </p>

    <h2>The short version</h2>
    <p>
      Correct source &rarr; grant permission to <em>that</em> source &rarr; verify completeness &rarr; install &rarr;
      contain it afterwards.
    </p>
    <p>
      The three failure points worth memorizing are <strong>wrong source authorized</strong>,{" "}
      <strong>incomplete split set</strong>, and <strong>no post-install background restrictions</strong>. Fix those
      and sideloading on One UI becomes close to 100% reliable.
    </p>
    <p>
      Keep the safety baseline too: install only from trusted sources, verify signatures, disable source permission when
      done, and leave Play Protect on.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why can't I enable 'Install unknown apps' on my Samsung phone?",
    answer:
      "If the toggle is greyed out or the phone says it's managed by an organization, the device is under Knox or MDM policy that blocks sideloading. There is no user-side workaround — a device administrator has to change the policy. On personal devices the toggle is always available per source.",
  },
  {
    question: "Why does Samsung say 'App not installed' when I tap the APK?",
    answer:
      "The three usual causes are: you downloaded a split bundle and only tried base.apk, you're attempting to install an older version over a newer one, or the APK's signature conflicts with the version already on the phone. Supply all splits at once (SAI), uninstall before downgrading, or use a package with a matching signature.",
  },
  {
    question: "Do I need to grant permission separately for each app on One UI?",
    answer:
      "Yes. Samsung uses Android's per-source installation permission model — there is no global 'unknown sources' switch. Each app that installs packages (file manager, browser, messaging app) needs its own toggle enabled in Settings → Apps → Special access → Install unknown apps.",
  },
  {
    question: "Why do notifications stop working after sideloading on Samsung?",
    answer:
      "Samsung's background usage limits put newly installed apps into adaptive or deep sleep quickly, cutting off background sync. After installing, add the app to the never-sleeping list or turn off battery optimization for it in Settings → Battery and device care → Background usage limits.",
  },
];

export const zhPosts20261019: BlogPostEntry[] = [
  {
    slug: "android-apk-management-tips",
    title: "安卓手机 APK 管理技巧：装得干净、找得到、清得掉",
    description:
      "装完就忘？下载目录堆满几十 GB 安装包、想回退版本却找不到旧包、换机才发现备份是空的。这篇给你一套完整的 APK 管理流程：目录结构、命名规范、选择性备份、安全降级和每月清理。",
    date: "2026-10-19",
    readTime: "8 min read",
    tags: ["android", "apk", "管理", "备份", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "samsung-apk-install-guide-one-ui",
    title: "三星手机 APK 安装完整流程：One UI 授权到收尾的 8 个检查点",
    description:
      "三星没有「允许未知来源」全局开关，而是按来源逐个授权——这是绝大多数安装失败的根源。本文拆解 One UI 装 APK 的 8 个检查点，并逐一解释「应用未安装」等报错的真实原因。",
    date: "2026-10-19",
    readTime: "7 min read",
    tags: ["android", "apk", "三星", "One UI", "教程"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261019List = toList(zhPosts20261019);
