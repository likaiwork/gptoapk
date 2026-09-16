import type { ReactNode } from "react";
import Link from "next/link";
import type { BlogFaqItem } from "@/lib/blog/blog-jsonld";

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ReactNode;
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
      You downloaded an APK, tapped to install, and Android slammed the door: <strong>&quot;Install blocked,&quot;</strong>{" "}
      <strong>&quot;For your safety, your phone isn&apos;t allowed to install this app,&quot;</strong> or{" "}
      <strong>&quot;This app may be harmful.&quot;</strong> The file is right there, but it won&apos;t install.
    </p>
    <p>
      Here&apos;s the key idea up front: <strong>most blocks are policy gates, not malware detections.</strong> Android has
      tightened sideloading over the years, and every OEM (Samsung, Xiaomi, OPPO, vivo, Huawei) stacks its own security
      layer on top. Figure out <em>which</em> layer is blocking you, and you can allow accordingly.
    </p>

    <blockquote>
      <p>
        <strong>The core rule:</strong> <strong>distinguish &quot;policy block&quot; from &quot;malware block&quot; first.</strong>{" "}
        Never override a malware warning just to get a file installed.
      </p>
    </blockquote>

    <h2>1. Decide: policy block or real threat?</h2>
    <p>Not every block should be lifted. Read the prompt before acting.</p>
    <ul>
      <li>
        <strong>&quot;Unknown source&quot; / &quot;For your safety&quot;</strong> → a policy gate. Safe to allow when you trust
        the source.
      </li>
      <li>
        <strong>&quot;Malware/virus/Trojan detected&quot;</strong> → a scan result.{" "}
        <strong>Do not override unless you&apos;re 100% sure of the file&apos;s origin.</strong>
      </li>
      <li>
        <strong>&quot;Unverified / not from a store&quot;</strong> → OEM risk control. Usually fine to allow.
      </li>
      <li>
        <strong>&quot;Blocked by Google Play Protect&quot;</strong> → the scanning engine flagged it. You can pause scanning,
        but think about where the file came from.
      </li>
    </ul>
    <p>
      One rule of thumb: <strong>if you can&apos;t name the official source of this APK, the block is doing its job. Leave it
      alone.</strong>
    </p>

    <h2>2. Layer 1: Android&apos;s own &quot;unknown sources&quot; permission</h2>
    <p>
      This is the most common cause and the most misunderstood. Since Android 8, Google changed the setting from one global
      toggle to a <strong>per-app grant</strong> — you allow <em>a specific app</em> to install <em>other apps</em>.
    </p>
    <p>
      <strong>Steps (general):</strong>
    </p>
    <ol>
      <li>
        Open <strong>Settings → Apps (or App management)</strong>.
      </li>
      <li>
        Find the app you&apos;re using to open the APK — usually:
        <ul>
          <li>
            <strong>Files / File Manager</strong>
          </li>
          <li>
            <strong>Browser</strong> (if you tap install straight from the browser)
          </li>
          <li>
            <strong>Messaging app</strong> (e.g., WhatsApp/Telegram) if you opened it from a chat
          </li>
        </ul>
      </li>
      <li>
        Open that app&apos;s details and find <strong>&quot;Install unknown apps&quot;</strong> (or &quot;Allow app
        installs&quot;).
      </li>
      <li>Turn it on.</li>
    </ol>
    <p>
      <strong>The catch:</strong> you grant permission to <em>the app that installs</em>, not a global switch. Authorizing
      app A does nothing if app B is doing the install.
    </p>
    <blockquote>
      <p>
        Tip: if you&apos;re unsure which app is installing, enable <strong>both Files and your browser</strong> — that covers
        ~90% of cases.
      </p>
    </blockquote>

    <h2>3. Layer 2: OEM security centers (Samsung, Xiaomi, OPPO, vivo, Huawei)</h2>
    <p>
      Beyond the Android toggle, most manufacturers add a &quot;security center.&quot; This is the #1 reason people say{" "}
      <em>&quot;I turned on unknown sources and it still won&apos;t install.&quot;</em>
    </p>
    <h3>Samsung (One UI)</h3>
    <ul>
      <li>
        Path: <strong>Settings → Apps → [the app] → Install unknown apps</strong>.
      </li>
      <li>
        Samsung&apos;s <strong>Auto Blocker</strong> (One UI 6+) blocks sideloading entirely. Go to{" "}
        <strong>Settings → Security and privacy → Auto Blocker</strong> and turn it off (or allow the specific source).
      </li>
    </ul>
    <h3>Xiaomi / Redmi (MIUI / HyperOS)</h3>
    <ul>
      <li>
        Xiaomi warns &quot;This app hasn&apos;t passed security checks&quot; with a <strong>&quot;Continue install&quot;</strong>{" "}
        button, sometimes behind a countdown or a collapsed menu.
      </li>
      <li>
        If blocked in Safe Mode, check <strong>Settings → Apps → Manage apps → Permissions</strong>.
      </li>
      <li>
        The pre-install security scan can be skipped with <strong>&quot;Install anyway&quot;</strong> — but only for trusted
        sources.
      </li>
    </ul>
    <h3>OPPO / OnePlus / realme (ColorOS)</h3>
    <ul>
      <li>
        Path: <strong>Settings → App management → Special app access → Install unknown apps</strong>.
      </li>
      <li>
        Also check <strong>Settings → Security → Install external source apps</strong>.
      </li>
      <li>
        OPPO shows &quot;Not verified by OPPO&quot; — tap <strong>&quot;Install anyway.&quot;</strong>
      </li>
    </ul>
    <h3>vivo / iQOO (OriginOS)</h3>
    <ul>
      <li>
        Path: <strong>Settings → More settings → Permission management → Install unknown apps</strong>.
      </li>
      <li>
        vivo has an &quot;App installation verification&quot; you can adjust in <strong>iManager → Security scan</strong>.
      </li>
    </ul>
    <h3>Huawei / Honor (HarmonyOS)</h3>
    <ul>
      <li>
        Path: <strong>Settings → Security → More security settings → Install apps from external sources</strong>.
      </li>
      <li>
        HarmonyOS adds <strong>Pure Mode</strong>, which blocks non-store installs. Turn it off:{" "}
        <strong>Settings → System &amp; updates → Pure Mode → Exit</strong>.
      </li>
      <li>
        AppGallery&apos;s security scan level can be adjusted in <strong>AppGallery → Me → Settings</strong>.
      </li>
    </ul>
    <blockquote>
      <p>
        Common thread: <strong>every OEM has a &quot;Continue anyway / Install anyway&quot; button — it may be collapsed, on a
        countdown, or below the fold. Scroll down.</strong>
      </p>
    </blockquote>

    <h2>4. Layer 3: Google Play Protect scanning</h2>
    <p>If the device has Google services, Play Protect scans the APK before install.</p>
    <p>
      <strong>Temporarily disable (re-enable after):</strong>
    </p>
    <ol>
      <li>
        Open the <strong>Google Play Store</strong>.
      </li>
      <li>
        Tap your profile picture → <strong>Play Protect</strong> → gear icon.
      </li>
      <li>
        Turn off <strong>&quot;Scan apps with Play Protect.&quot;</strong>
      </li>
    </ol>
    <p>
      <strong>Re-enable it afterward</strong> — it&apos;s a core part of your daily protection. You&apos;re only pausing it for
      this one file.
    </p>

    <h2>5. Layer 4: hard blocks you <em>can&apos;t</em> toggle away</h2>
    <p>Some blocks aren&apos;t switches:</p>
    <ul>
      <li>
        <strong>Low targetSdk</strong>: Android 14/15/16 refuses to install apps targeting very old SDKs (&quot;App
        isn&apos;t compatible with your phone&quot;). <strong>No official toggle exists</strong> — use an older device or an
        emulator.
      </li>
      <li>
        <strong>Signature conflict</strong>: an app with the same package name but a different signature is installed.
        Uninstall the old one first.
      </li>
      <li>
        <strong>ABI mismatch</strong>: you grabbed an x86 build for an arm64 phone. Get the matching architecture.
      </li>
      <li>
        <strong>Split APK not merged</strong>: you downloaded a split bundle (<code>.apks</code>/<code>.xapk</code>). Install
        it with a bundler tool instead.
      </li>
    </ul>
    <p>
      These are <strong>file-level problems, not policy gates.</strong> Toggling settings won&apos;t fix them.
    </p>

    <h2>6. Before you allow: verify the file</h2>
    <p>Lifting a block means you&apos;re making the judgment call. So confirm:</p>
    <ol>
      <li>
        <strong>Trusted source</strong> — official site or a well-known mirror, not a group chat, short link, or random cloud
        drive.
      </li>
      <li>
        <strong>Hash/signature matches</strong> — compare a published hash; check the signing fingerprint against the official
        one.
      </li>
      <li>
        <strong>Sensible permissions</strong> — a flashlight app asking for contacts? Walk away.
      </li>
      <li>
        <strong>Multi-engine scan</strong> — run it through VirusTotal; 3+ detections means stop.
      </li>
    </ol>
    <p>
      <strong>If a security scan says malware, the block is right 99% of the time. Don&apos;t override it.</strong>
    </p>

    <h2>7. Quick troubleshooting checklist</h2>
    <p>Work through these in order:</p>
    <ul>
      <li>✅ Is the file actually there, in an accessible path?</li>
      <li>✅ Does the app doing the install have &quot;Install unknown apps&quot; permission?</li>
      <li>✅ Is the OEM security center / Auto Blocker / Pure Mode off?</li>
      <li>✅ Is Play Protect blocking it? (pause temporarily)</li>
      <li>✅ Is the prompt a malware warning? (if so, don&apos;t install)</li>
      <li>✅ Signature conflict / incompatible version / wrong ABI? (file-level fix)</li>
      <li>✅ Reboot and try again — some ROMs need a restart after permission changes.</li>
    </ul>

    <p>
      <strong>The takeaway:</strong> &quot;APK install blocked&quot; is solved by{" "}
      <strong>walking the three layers — Android → OEM → scanning engine — and figuring out which one is stopping you</strong>
      , then allowing only what deserves it. A block isn&apos;t the enemy. It&apos;s a nudge saying &quot;take one more look
      at this file.&quot; Thirty seconds of verification now beats an hour of malware cleanup later.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I unblock an APK install that Android is blocking?",
    answer:
      "First tell a policy block from a malware block. For a policy block (unknown source / for your safety), open Settings → Apps, select the app you use to open the APK (Files, browser, or messaging app), and enable 'Install unknown apps.' Then check the OEM security center (Samsung Auto Blocker, Xiaomi security scan, HarmonyOS Pure Mode) and tap 'Continue install.' If Play Protect is blocking it, pause its scanning temporarily. Do not override a malware detection.",
  },
  {
    question: "Why won't an APK install even after enabling unknown sources?",
    answer:
      "Because most OEM ROMs add a security layer above the Android toggle — Samsung Auto Blocker, Xiaomi security scan, ColorOS external-source settings, vivo installation verification, HarmonyOS Pure Mode. There are also hard blocks: low targetSdk, signature conflict, ABI mismatch, or an unmerged split APK. The former can be allowed with 'Install anyway'; the latter must be fixed at the file level.",
  },
  {
    question: "How do I install an APK blocked by low targetSdk?",
    answer:
      "There's no official toggle for it. Android 14/15/16 refuses to install apps that target very old SDKs and shows an incompatibility message. Your options are to install on an older device, run it in an emulator that supports low targetSdk, or ask the developer for an updated build.",
  },
  {
    question: "Is it safe to override an APK install block?",
    answer:
      "It depends. If the source is trusted (official site or known mirror), the hash and signature match the official build, the permissions are reasonable, and a multi-engine scan is clean, overriding is safe. But if a security scan detected malware, or you can't name the file's source, the block is protecting you and should not be overridden.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      You just downloaded an APK. The notification still shows &quot;Download complete,&quot; but when you open your file
      manager to find it, <strong>the file is gone.</strong> Or you tapped install and it failed partway with &quot;file has
      been deleted.&quot; It&apos;s maddening — you downloaded it, and it evaporated.
    </p>
    <p>
      Straight answer: <strong>APKs don&apos;t vanish on their own. Something deleted them, or a rule cleaned them up.</strong>{" "}
      Find the culprit and you&apos;ve solved most of the problem. Let&apos;s go from most common to rarest.
    </p>

    <blockquote>
      <p>
        <strong>The core idea:</strong> <strong>there is no &quot;ghost deletion&quot; on Android — only cleanup rules,
        security policies, and path mix-ups you haven&apos;t spotted yet.</strong>
      </p>
    </blockquote>

    <h2>1. First rule out the simplest case: you may just be looking in the wrong place</h2>
    <p>Before blaming deletion, confirm whether the file exists.</p>
    <ol>
      <li>
        <strong>Search the whole device</strong> — in your file manager, search <code>.apk</code> instead of digging through
        one folder.
      </li>
      <li>
        <strong>Check download history</strong> — open <strong>Files → Downloads</strong> (or &quot;Recent&quot;) and look at
        past downloads.
      </li>
      <li>
        <strong>Browser downloads</strong> — if you downloaded via a browser, open <strong>Downloads</strong> in that browser
        and use &quot;Show in folder.&quot;
      </li>
      <li>
        <strong>Check storage location</strong> — the file may be on <strong>internal shared storage / Download</strong>,
        while you&apos;re browsing the <strong>SD card</strong> (or vice versa).
      </li>
    </ol>
    <p>
      <strong>A lot of &quot;deleted&quot; files are simply sitting somewhere else, or were renamed.</strong> Search first,
      conclude later.
    </p>

    <h2>2. Cause 1: browser &quot;delete after download&quot; cleanup</h2>
    <p>Some browsers (private modes, or third-party browsers/download managers) delete files after downloading.</p>
    <ul>
      <li>
        <strong>Chrome</strong>: normally doesn&apos;t auto-delete, but files downloaded in <strong>Incognito</strong> can get
        cleaned up.
      </li>
      <li>
        <strong>Third-party browsers/downloaders</strong>: often have a &quot;delete after download&quot; or &quot;clear temp
        files&quot; option that may be on by default.
      </li>
      <li>
        <strong>Downloader apps</strong>: some &quot;turbo downloaders&quot; remove temp files, keeping only the install.
      </li>
    </ul>
    <p>
      <strong>Fix</strong>: In browser settings → Downloads, turn off auto-cleanup, or switch to the system downloader.
    </p>

    <h2>3. Cause 2: security software / OEM security center auto-cleanup</h2>
    <p>
      This is one of the most common causes. Security and cleaner apps treat <strong>uninstalled installers as junk</strong> to
      be cleared.
    </p>
    <ul>
      <li>
        <strong>Built-in security center / phone manager</strong>: has &quot;junk cleanup&quot; and &quot;installer
        cleanup&quot; that can delete APKs during a scan.
      </li>
      <li>
        <strong>Third-party cleaner apps</strong>: more aggressive, sometimes cleaning in the background.
      </li>
      <li>
        <strong>Xiaomi/Huawei/etc.</strong>: security centers run scheduled &quot;clean installers&quot; tasks.
      </li>
    </ul>
    <p>
      <strong>Fix</strong>:
    </p>
    <ol>
      <li>
        Open <strong>Security Center / Phone Manager → Cleanup → Installers</strong> and see if it&apos;s listed for cleaning.
      </li>
      <li>
        Turn off <strong>&quot;Auto-clean installers&quot;</strong> in cleanup settings.
      </li>
      <li>
        After downloading, <strong>put the APK in a dedicated folder</strong> (e.g., <code>Download/apk</code>) and add that
        folder to the cleanup exclusion list.
      </li>
    </ol>

    <h2>4. Cause 3: the system deletes the source file after install (by design)</h2>
    <p>
      Sometimes <strong>the system deletes the installer after a successful install</strong> — this is normal, you just
      didn&apos;t know.
    </p>
    <ul>
      <li>
        Some ROMs do this when <strong>&quot;Delete installer after install&quot;</strong> is enabled.
      </li>
      <li>Xiaomi/Huawei installers may &quot;auto-clean after install.&quot;</li>
    </ul>
    <p>
      <strong>Fix</strong>: If the install succeeded, the file being gone is fine. But if you want to <strong>keep it</strong>{" "}
      (to install on another phone, or as a backup), <strong>copy the APK to your PC or another folder before installing.</strong>
    </p>

    <h2>5. Cause 4: low storage triggering auto-cleanup</h2>
    <p>When storage runs low, the system or cleaners delete &quot;large files / installers&quot; first to free space.</p>
    <ul>
      <li>
        <strong>Symptom</strong>: the download works, then it&apos;s gone a little later.
      </li>
      <li>
        <strong>Logic</strong>: the system treats &quot;uninstalled APK = cleanable temp file.&quot;
      </li>
    </ul>
    <p>
      <strong>Fix</strong>: Free up enough space before downloading, or <strong>install immediately</strong> after downloading
      instead of letting it sit.
    </p>

    <h2>6. Cause 5: quarantined or deleted as malware</h2>
    <p>If a security scan flags the APK as risky, it may <strong>silently delete or quarantine</strong> it.</p>
    <ul>
      <li>
        Often happens with non-official sources, suspicious filenames, or false positives.
      </li>
      <li>
        <strong>Symptom</strong>: a fleeting &quot;removed risky file&quot; notification.
      </li>
    </ul>
    <p>
      <strong>Fix</strong>:
    </p>
    <ol>
      <li>
        Check <strong>Security Center → Virus scan → Quarantine / Action history</strong> to see if you can restore it.
      </li>
      <li>If you&apos;ve confirmed it&apos;s a false positive from a trustworthy source, you may relax the scan.</li>
      <li>
        <strong>But if it genuinely detected malware, don&apos;t restore it.</strong> Re-download from a clean source.
      </li>
    </ol>

    <h2>7. Cause 6: interrupted download / temporary directory</h2>
    <ul>
      <li>
        The download never truly completed; the file was only a &quot;temp file,&quot; and temp dirs get cleared on reboot.
      </li>
      <li>
        Some apps download to <code>/cache</code> first and move the file only on completion — fail midway and it&apos;s gone.
      </li>
    </ul>
    <p>
      <strong>Fix</strong>: Confirm the download reaches 100%; switch networks and retry; use the system browser.
    </p>

    <h2>8. The permanent fix</h2>
    <p>To stop this for good, build three habits:</p>
    <ol>
      <li>
        <strong>Fixed folder</strong> — create an <code>apk</code> subfolder under <code>Download</code> and put every
        installer there.
      </li>
      <li>
        <strong>Exclude from cleanup</strong> — in your cleaner/security center settings, whitelist that folder.
      </li>
      <li>
        <strong>Back up before installing</strong> — for important APKs, copy to PC or cloud before installing.
      </li>
    </ol>

    <h2>9. Quick diagnostic flow</h2>
    <p>Run through this in order — it usually pinpoints the cause:</p>
    <ol>
      <li>
        ➡️ <strong>Search <code>.apk</code></strong> to confirm it&apos;s really missing and not misplaced.
      </li>
      <li>
        ➡️ Check <strong>browser download settings</strong> for auto-cleanup.
      </li>
      <li>
        ➡️ Check <strong>security center cleanup history / quarantine</strong>.
      </li>
      <li>
        ➡️ Check the <strong>&quot;delete installer after install&quot;</strong> setting.
      </li>
      <li>
        ➡️ Confirm <strong>storage space</strong> is sufficient.
      </li>
      <li>
        ➡️ Verify the <strong>download actually completed</strong>.
      </li>
      <li>
        ➡️ Set a fixed folder + whitelist to prevent recurrence.
      </li>
    </ol>

    <p>
      <strong>The takeaway:</strong> &quot;APK disappears after download&quot; almost always comes down to three things:{" "}
      <strong>a cleaner treated it as junk, a security policy removed it, or you&apos;re looking in the wrong place.</strong>{" "}
      Check them in order, then lock it down with <strong>fixed folder + whitelist + back up first</strong> and it won&apos;t
      bother you again. Key takeaway: <strong>when it matters, copy the APK somewhere safe before you install.</strong>
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why did my downloaded APK file disappear?",
    answer:
      "Six common causes: the browser deleted it after download, a security app or OEM security center cleaned the installer as junk, the system deleted the source file after install, low storage triggered an auto-cleanup, a security scan quarantined or deleted it, or the download never completed and only a temp file existed. Most cases are cleanup rules or security policies, not the file vanishing for no reason.",
  },
  {
    question: "How do I stop my phone from deleting downloaded APK files?",
    answer:
      "Create a dedicated apk subfolder under Download and save every installer there, then whitelist that folder in your security center / phone manager cleanup settings and turn off 'auto-clean installers.' For important files, also copy them to a PC or cloud drive. That way cleanup scans skip your installers.",
  },
  {
    question: "Is it normal for the APK file to be deleted after installing?",
    answer:
      "Yes. Some ROMs and OEM installers enable 'delete installer after install' by default and clean up the source file once installation succeeds. That's by design, not a fault. If you want to keep the installer for reuse, copy the APK to your PC or another folder before running the install.",
  },
  {
    question: "Where do downloaded APKs go on Android?",
    answer:
      "By default they usually land in internal shared storage under the Download folder, accessible from Files → Downloads. If a browser or download manager is used, check that app's own download list and 'Show in folder.' Files may also be on an SD card if that's the chosen storage location — a common reason people think a file is missing.",
  },
];

export const enPosts20260916: BlogPostEntry[] = [
  {
    slug: "apk-install-blocked-by-android-how-to-allow",
    title: "APK Install Blocked by Android? How to Allow It Safely in 2026",
    description:
      "Downloaded an APK and Android refuses — 'Install blocked,' 'For your safety your phone can't install this app'? Most blocks are policy gates, not malware. This guide walks each layer: Android's per-app 'install unknown apps' permission, OEM security centers (Samsung Auto Blocker, Xiaomi, OPPO, vivo, HarmonyOS Pure Mode), Google Play Protect, and hard blocks like low targetSdk, signature conflicts, ABI mismatch, and unmerged split APKs — plus which blocks you should never override.",
    date: "2026-09-16",
    readTime: "8 min read",
    tags: ["android", "apk", "sideload", "troubleshooting", "security", "install", "samsung", "xiaomi", "huawei"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-downloaded-file-disappears-fix",
    title: "APK Downloaded but the File Disappeared? 2026 Causes and Fixes",
    description:
      "You finished downloading an APK and then it vanished — or the install failed with 'file deleted.' APKs don't evaporate; something removed them or you're looking in the wrong place. This guide covers the real causes in order: cleanup tools treating installers as junk, security software quarantining files, 'delete after install' settings, low storage, and path confusion — plus the fixed-folder + whitelist + back-up-first habits that stop it for good.",
    date: "2026-09-16",
    readTime: "7 min read",
    tags: ["android", "apk", "download", "troubleshooting", "storage", "cleanup"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20260916List = toList(enPosts20260916);
