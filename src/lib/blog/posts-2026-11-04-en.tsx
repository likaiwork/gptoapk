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

const FAQS1: BlogFaqItem[] = [
  {
    question: "Does installing an APK require a network connection?",
    answer:
      "No. An APK contains everything Android needs to unpack and install the app. What needs the network is first-run activation — login, license checks, remote config — and post-install asset downloads for large games.",
  },
  {
    question: "How do I pull an APK off a device that already has it installed?",
    answer:
      "Run adb shell pm path <package> to get the path, then adb pull it. If the output contains multiple lines (base.apk plus split_config files), it is a split APK and you must pull every part, or the app will fail to install or crash.",
  },
  {
    question: "Why keep an older APK version in the archive?",
    answer:
      "Rollback. When a new release breaks something you depend on, having the previous APK on hand means a two-minute fix instead of waiting for a patch. One previous version is enough; more becomes clutter.",
  },
  {
    question: "Why does reinstalling from a different source fail?",
    answer:
      "Signing key mismatch. APKs of the same app from different sources carry different certificates, so installing over an existing copy fails with INSTALL_FAILED_UPDATE_INCOMPATIBLE. Resolving it requires uninstalling first, which wipes app data.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "The notification toggle is greyed out and won't respond. Why?",
    answer:
      "The restriction comes from outside the app: family-guardian mode, an enterprise MDM policy, or a vendor app-freezer feature. It cannot be changed from the app's own settings — find the controlling management entry point.",
  },
  {
    question: "The master toggle is on but chat messages stay silent. Where do I look?",
    answer:
      "Notification channels. Since Android 8.0 each notification type has its own channel, and the master toggle only controls whether the app may notify at all. Expand the channel list and check whether the messaging channel is muted.",
  },
  {
    question: "I exempted the app from battery optimization, but notifications stopped after a reboot.",
    answer:
      "Autostart permission is missing. Battery exemption keeps the process alive while it is running, but autostart is what allows the system to restart it after a reboot. Battery exemption, autostart, and background activity restriction all need to be set.",
  },
  {
    question: "All settings are correct but it is still silent. What is left?",
    answer:
      "Push transport. App-market ROMs often lack working FCM, so an app built only against Google push will never receive anything there. Test the same APK on a device with Google services — if it works there, that is the cause.",
  },
];

const ARTICLE1 = (
  <>
    <h1>How to Set Up Offline APK Installation for Android Devices</h1>

    <p>
      Every APK is already an offline installer. The file contains everything Android needs to unpack and install the app;
      no network call is required at install time. So &quot;creating an offline installer&quot; is not a packaging problem at
      all — it is a logistics problem: getting the right APKs onto the device before the network goes away, and being able
      to prove later that they were not tampered with.
    </p>

    <p>
      That distinction matters because most advice on the topic focuses on tools, while the actual failures come from
      version drift, wrong architecture, and unverified downloads.
    </p>

    <h2>What genuinely requires a network</h2>

    <p>Two things do require connectivity after install, and you should plan around them:</p>

    <ol>
      <li>
        <strong>First-run activation.</strong> Login, account binding, license checks, and remote config all need the
        network. A banking app that installs cleanly offline will still demand authentication on first launch.
      </li>
      <li>
        <strong>Post-install resource downloads.</strong> Large games and a few productivity apps ship a small APK and then
        pull asset packs, often hundreds of megabytes.
      </li>
    </ol>

    <p>
      Neither is fixable by packaging differently. What you <em>can</em> do is test the first-run flow while still online,
      so you know the app works before you lose the connection.
    </p>

    <h2>Approach 1: A versioned APK archive</h2>

    <p>Best for: personal backup, reinstalling on your own device, small numbers of phones.</p>

    <p>The whole method is a directory structure plus a checksum file.</p>

    <pre>
      <code>{`apk-archive/
├── social/
│   ├── whatsapp_2.24.10_arm64.apk
│   ├── whatsapp_2.24.09_arm64.apk   ← previous version, kept for rollback
├── tools/
├── games/
└── SHA256SUMS.txt`}</code>
    </pre>

    <p>Three rules make this work:</p>

    <ul>
      <li>
        <strong>Version and architecture go in the filename.</strong> Six months from now,{" "}
        <code>app.apk</code> tells you nothing; <code>whatsapp_2.24.10_arm64.apk</code> tells you whether it will run on a
        64-bit-only device.
      </li>
      <li>
        <strong>Keep exactly one previous version.</strong> Rollback is a realistic need — a new release breaks a feature,
        and you want the old APK immediately. More than one previous version becomes clutter.
      </li>
      <li>
        <strong>Maintain a checksums file.</strong> <code>shasum -a 256 *.apk &gt; SHA256SUMS.txt</code> creates a
        content-bound manifest. Without it you have no way to know whether a file was replaced on disk or over a sync service.
      </li>
    </ul>

    <h2>Extracting APKs from an installed device</h2>

    <p>You often want the exact build that is already on a phone, not whatever is on a download site.</p>

    <pre>
      <code>{`adb shell pm path com.example.app
# package:/data/app/~~abc==/com.example.app-xyz==/base.apk

adb pull /data/app/~~abc==/com.example.app-xyz==/base.apk ./app.apk`}</code>
    </pre>

    <p>
      Note that <code>pm path</code> may print several lines for split APKs (<code>base.apk</code>,{" "}
      <code>split_config.arm64_v8a.apk</code>, <code>split_config.xxhdpi.apk</code>). You need all of them, or the app will
      fail to install or crash on launch. Pull the whole set:
    </p>

    <pre>
      <code>{`adb shell pm path com.example.app | sed 's/^package://' | while read -r p; do
  adb pull "$p" ./split_apks/
done`}</code>
    </pre>

    <h2>Approach 2: Vendor migration tools</h2>

    <p>Best for: moving a whole phone&apos;s app set to a new device.</p>

    <p>
      Mi Mover, Samsung Smart Switch, Huawei Phone Clone and similar tools transfer over a local hotspot or cable. No
      internet is needed on either device.
    </p>

    <ul>
      <li>App data usually transfers; login sessions frequently do not. Financial apps re-authenticate by design.</li>
      <li>Cross-brand migrations lose vendor-specific features such as dual-app clones.</li>
      <li>Some apps are explicitly excluded from transfer for security reasons.</li>
    </ul>

    <p>When you are staying within one brand, this is the least effort by a wide margin.</p>

    <h2>Approach 3: A scripted bundle</h2>

    <p>Best for: deploying the same app set to dozens of devices — QA labs, retail demo units, kiosks.</p>

    <p>Bundle the APKs with an install script and let adb do the loop.</p>

    <pre>
      <code>{`#!/usr/bin/env bash
set -u

for apk in apks/*.apk; do
  pkg=$(basename "$apk" | cut -d_ -f1)
  if adb shell pm list packages | grep -q "package:$pkg$"; then
    echo "skip: $pkg already installed"
    continue
  fi
  adb install -r "$apk" || echo "$apk" >> failed.txt
done

if [ -s failed.txt ]; then
  echo "Failures:"; cat failed.txt
fi`}</code>
    </pre>

    <p>
      <code>adb install -r</code> reinstalls while keeping data. For split APKs, replace it with{" "}
      <code>adb install-multiple split_apks/*.apk</code>.
    </p>

    <p>
      The reason to script it rather than click through installers is consistency: every device gets byte-identical APKs,
      so a bug report like &quot;it crashes on the demo unit&quot; cannot be explained by version drift.
    </p>

    <h2>Choosing between them</h2>

    <ul>
      <li>
        <strong>Personal backup</strong> → archive with checksums.
      </li>
      <li>
        <strong>Moving to a new phone</strong> → vendor migration tool, then archive the APKs afterward as a safety net.
      </li>
      <li>
        <strong>Fleet deployment</strong> → scripted bundle.
      </li>
      <li>
        <strong>A phone for an elderly relative</strong> → migration tool to install in bulk, plus an archive so you can
        reinstall anything they delete by accident.
      </li>
    </ul>

    <h2>The failure modes that actually bite</h2>

    <p>
      <strong>Wrong architecture.</strong> Many recent flagship devices run 64-bit-only kernels. A pure{" "}
      <code>armeabi-v7a</code> APK installs but crashes instantly, or is rejected outright on Android 14+. Always prefer{" "}
      <code>arm64-v8a</code> when archiving.
    </p>

    <p>
      <strong>Split APKs mistaken for full APKs.</strong> Play-delivered apps are usually split. A single{" "}
      <code>base.apk</code> will not install. Look for <code>.apks</code> or <code>.xapk</code> bundles, or pull all splits.
    </p>

    <p>
      <strong>Signature mismatch on reinstall.</strong> APKs of the same app from different sources carry different signing
      keys. Installing over an existing copy fails with <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>. Resolving it
      requires uninstalling first — which wipes app data.
    </p>

    <p>
      <strong>Missing storage permission on first run.</strong> Numerous apps block at the onboarding screen without file
      access. Offline, that looks like a broken install when it is only an unanswered permission prompt.
    </p>

    <h2>A minimal checklist</h2>

    <p>Before you rely on an offline set, confirm:</p>

    <ol>
      <li>Every APK has been hash-verified against a known-good value.</li>
      <li>Filenames carry app, version, and architecture.</li>
      <li>Split APKs are bundled, not extracted individually.</li>
      <li>At least one previous version per app is retained.</li>
      <li>The first-run flow has been tested while online.</li>
    </ol>

    <p>
      The packaging format is the easy part. Verification and version hygiene are what determine whether the offline install
      actually works when you need it. Browse more installation guides on the{" "}
      <Link href="/blog">gptoapk blog</Link>.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>Android Notifications Not Showing After Installing an APK: A Six-Layer Diagnostic</h1>

    <p>
      You sideloaded an app, it launched, you signed in, and then — nothing. No sound, no banner, no badge. Messages only
      appear when you open the app and pull to refresh.
    </p>

    <p>
      In almost every case the app is functioning correctly. Android routes notifications through a chain of gates, and a
      closed gate anywhere in that chain produces the identical outcome: silence with no error. Working through the gates
      from the outside in is faster than guessing.
    </p>

    <h2>Gate 1: The notification permission</h2>

    <p>
      Freshly installed APKs do not automatically receive notification permission. Apps from unofficial sources often never
      trigger the permission dialog at all, so the user never sees a prompt and never grants anything.
    </p>

    <p>
      Check: Settings → Apps → <em>the app</em> → Notifications → &quot;Allow notifications&quot;.
    </p>

    <p>
      If that toggle is <strong>greyed out and unresponsive</strong>, you are not dealing with a user setting. Typical causes:
    </p>

    <ul>
      <li>The device&apos;s child-safety or family-guardian mode has classified the app as restricted.</li>
      <li>An enterprise MDM profile pushed a policy blocking notifications (common with <code>.intune</code> variants).</li>
      <li>A vendor &quot;app freezer&quot; feature has flagged the app for hibernation.</li>
    </ul>

    <p>
      A greyed toggle cannot be fixed from within the app. Find the controlling entry point — device admin, MDM agent, or the
      vendor&apos;s app management panel.
    </p>

    <h2>Gate 2: A notification channel is muted</h2>

    <p>
      Since Android 8.0, notifications are grouped into channels. An app might register five: new messages, group messages,
      foreground service, system alerts, and promotions. If only the messaging channel is muted, every other notification
      works and the user concludes &quot;notifications work, just not for messages&quot;.
    </p>

    <p>
      Check: Settings → Apps → Notifications → expand the channel list. Some vendor skins label this &quot;Notification
      categories&quot;.
    </p>

    <ul>
      <li>
        Deleting a channel and letting the app recreate it does <strong>not</strong> reset user preferences — the muted state
        persists.
      </li>
      <li>Foreground-service channels are often defaulted to minimum importance. That is generally desirable.</li>
      <li>On Xiaomi, OPPO, and Vivo the channel list sits one level deeper under &quot;Notification management&quot;.</li>
    </ul>

    <h2>Gate 3: Background execution killed by power management</h2>

    <p>
      This is the single most common cause on Chinese-manufactured ROMs. Push delivery depends on a resident process to
      receive messages from the vendor push channel or from FCM. If the system kills that process to save power,
      notifications stop — permanently, not intermittently.
    </p>

    <p>Three separate settings must all be addressed:</p>

    <ol>
      <li>
        <strong>Battery optimization exemption.</strong> Settings → Battery → Battery optimization → find the app →
        &quot;Don&apos;t optimize&quot;. Naming varies: Huawei calls it &quot;App launch management&quot;, Xiaomi &quot;Battery
        saver policy&quot;, OPPO &quot;App quick freeze&quot;.
      </li>
      <li>
        <strong>Autostart permission.</strong> Settings → App management → Autostart → enable. Without this the process does
        not come back after a reboot.
      </li>
      <li>
        <strong>Background activity restriction.</strong> Some skins give apps an explicit &quot;restrict background
        activity&quot; toggle. Turn it off.
      </li>
    </ol>

    <p>
      Handling only battery optimization is the most frequent partial fix. It works until the next reboot, then the behavior
      returns.
    </p>

    <h2>Gate 4: No viable push transport</h2>

    <p>
      Android push runs over one of two transports: Google&apos;s FCM, or a device-vendor channel. Most app-market ROMs do not
      ship working FCM, so an app built exclusively against FCM will never receive a push there — regardless of every setting
      above.
    </p>

    <p>How to tell:</p>

    <ul>
      <li>
        Device logs show repeated failures connecting to <code>mtalk.google.com</code>, or an FCM token registration error.
      </li>
      <li>The same APK works correctly on a device with Google services present.</li>
    </ul>

    <p>
      There is no user-level fix. The options are installing a build that integrates the vendor&apos;s push SDK, or enabling
      Google services on the device.
    </p>

    <h2>Gate 5: Display style downgraded</h2>

    <p>
      Permission granted, channel enabled, process alive — but notifications only appear in the shade, never as a banner, and
      the lock screen stays dark.
    </p>

    <ul>
      <li>Lock screen notifications: &quot;Show content&quot;, not &quot;Do not show&quot;.</li>
      <li>Banners / heads-up: enabled.</li>
      <li>Sound and vibration: ringtone is not set to &quot;None&quot;.</li>
      <li>
        <strong>Do Not Disturb:</strong> while active, only allow-listed contacts and apps break through. Settings → Sound →
        Do Not Disturb → allowed exceptions.
      </li>
    </ul>

    <p>
      DND is easy to leave on by accident — a scheduled window that overlaps your working hours will silently swallow every
      banner.
    </p>

    <h2>Gate 6: The app&apos;s own preferences</h2>

    <p>
      Last, the in-app switches. Many apps ask &quot;enable message reminders?&quot; during onboarding, and a dismissive answer
      is never asked again.
    </p>

    <p>
      Open the app → settings → notifications, and review each toggle. Chat apps commonly include &quot;notify only on
      Wi-Fi&quot;, which means silence on mobile data is intended behavior, not a bug.
    </p>

    <h2>Fast verification sequence</h2>

    <p>Work in this order and stop at the first gate that changes behavior:</p>

    <ol>
      <li>Allow notifications in system settings.</li>
      <li>Expand channels, look for a muted messaging channel.</li>
      <li>Battery exemption + autostart.</li>
      <li>Disable DND, enable banners.</li>
      <li>In-app notification switches.</li>
      <li>If all six pass and it is still silent, suspect missing push transport.</li>
    </ol>

    <h2>Common misconceptions</h2>

    <p>
      <strong>&quot;Reinstalling fixes it.&quot;</strong> Reinstalling clears app data but system-level channel configuration
      often persists across the reinstall, carrying the muted state forward. Explicitly deleting the channel configuration is
      more effective than reinstalling.
    </p>

    <p>
      <strong>&quot;Set it to high priority.&quot;</strong> Some ROMs expose a priority option, but high-importance channels are
      rate-limited by the system. Overusing them causes throttling, which makes delivery less reliable, not more.
    </p>

    <h2>Making it stay fixed</h2>

    <p>
      Once delivery works, lock it in: battery optimization exemption, autostart enabled, and — on ROMs that support it — lock
      the app in the recents screen so the vendor&apos;s memory cleaner leaves it alone. Those three steps are what separate a
      fix that survives the week from one that breaks at the next reboot. More troubleshooting guides are on the{" "}
      <Link href="/blog">gptoapk blog</Link>.
    </p>
  </>
);

export const enPosts20261104 = [
  {
    slug: "android-apk-offline-installation-setup",
    title: "How to Set Up Offline APK Installation for Android Devices",
    description:
      "Every APK is already an offline installer — the real work is collecting, verifying, and versioning the files before you lose the network. Compare a versioned archive, vendor migration tools, and scripted adb bundles, plus the failure modes that actually bite.",
    date: "2026-11-04",
    readTime: "9 min read",
    tags: ["android", "apk", "offline"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-notifications-not-showing-fix",
    title: "Android Notifications Not Showing After Installing an APK: A Six-Layer Diagnostic",
    description:
      "An app that installs and opens fine but never notifies is usually not broken. Notification delivery depends on six independent gates — permission, channel, background execution, push transport, display style, and in-app switches. Here is the order to check them.",
    date: "2026-11-04",
    readTime: "8 min read",
    tags: ["android", "notifications", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261104List = toList(enPosts20261104);
