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
      Most APK install failures are not mysterious. Android tells you exactly what went wrong — it just puts the answer in a
      code like <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> that nobody reads.
    </p>
    <p>
      The fastest fix is to stop tapping &quot;retry&quot; and start reading the error. This guide covers the error codes you will
      actually hit, what each one means, and the one-line check that confirms the diagnosis.
    </p>

    <h2>First: get the real error, not the generic toast</h2>
    <p>
      The on-screen message (&quot;App not installed&quot;) is useless. The actual reason is in the system log or in{" "}
      <code>pm install</code> output. Two ways to get it:
    </p>
    <pre>
      <code>{`# Method 1: install via adb and read the raw result
adb install app.apk
# Failure [INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package com.example.app ...]

# Method 2: install normally, then capture the log
adb logcat -c && adb logcat | grep -i "PackageManager"`}</code>
    </pre>
    <p>
      Method 1 is better because the failure is returned as a single readable string. If you do not have a PC, a log viewer app
      reading <code>logcat</code> with root/Shizuku also works.
    </p>

    <h2>The error code table</h2>
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Actual cause</th>
          <th>Fix difficulty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INSTALL_FAILED_UPDATE_INCOMPATIBLE</td>
          <td>Signing key differs from installed version</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_ALREADY_EXISTS</td>
          <td>Package already installed, no -r flag</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_VERSION_DOWNGRADE</td>
          <td>New APK has lower versionCode</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>INSTALL_PARSE_FAILED_NO_CERTIFICATES</td>
          <td>APK unsigned or signature stripped</td>
          <td>Medium</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_INSUFFICIENT_STORAGE</td>
          <td>Not enough space, or data partition full</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_INVALID_APK</td>
          <td>Truncated/corrupted file, often bad download</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_NO_MATCHING_ABIS</td>
          <td>APK has no native libs for your CPU</td>
          <td>Medium</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_OLDER_SDK</td>
          <td>App requires newer Android than you have</td>
          <td>Hard</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_USER_RESTRICTED</td>
          <td>ROM blocks sideloading (common on MIUI)</td>
          <td>Easy</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_TEST_ONLY</td>
          <td>APK built as a test/debug artifact</td>
          <td>Easy</td>
        </tr>
      </tbody>
    </table>

    <h2>The three that cause 80% of failures</h2>
    <h3>1. INSTALL_FAILED_UPDATE_INCOMPATIBLE</h3>
    <p>
      You have the app installed already, and the new APK was <strong>signed with a different key</strong> than the installed
      one. Android refuses to upgrade because the keys do not match. Verify the difference:
    </p>
    <pre>
      <code>{`# Signature of the installed app
adb shell pm path com.example.app
adb pull /data/app/.../base.apk installed.apk
apksigner verify --print-certs installed.apk

# Signature of the new APK
apksigner verify --print-certs new.apk`}</code>
    </pre>
    <p>If the SHA-256 digests differ, the upgrade is impossible without uninstalling.</p>
    <p>
      <strong>The catch:</strong> uninstalling wipes app data. Back it up first:
    </p>
    <pre>
      <code>{`adb backup -f app.ab -apk com.example.app
# or, if the app allows it, use its own export feature`}</code>
    </pre>
    <p>
      This code shows up constantly in cases like: you installed the Play Store version and now want a mirror build; you
      installed a modded version and want the official one; the app changed signing keys between major versions. None of these
      can be fixed without a data backup + reinstall.
    </p>

    <h3>2. INSTALL_FAILED_NO_MATCHING_ABIS</h3>
    <p>
      The APK ships native libraries (<code>.so</code> files) but not for your device&apos;s CPU architecture. Almost always it
      means the APK is 32-bit only (<code>armeabi-v7a</code>) on a 64-bit-only device, or vice versa. Confirm in two lines:
    </p>
    <pre>
      <code>{`adb shell getprop ro.product.cpu.abi
# arm64-v8a

unzip -l app.apk | grep "lib/"
# lib/armeabi-v7a/libnative.so   <- 32-bit only, fails on a 64-bit-only device`}</code>
    </pre>
    <p>
      <strong>Fix:</strong> download the APK variant that matches your ABI. Most large apps publish per-ABI builds; split
      bundles (<code>.apks</code> / <code>.xapk</code>) let you pick the right config split. Do not try to &quot;force
      install&quot; — even if you bypass the check, the app will crash at the first native call.
    </p>

    <h3>3. INSTALL_FAILED_USER_RESTRICTED</h3>
    <p>The ROM is blocking sideloading. On MIUI/HyperOS and some realme/OPPO builds, this requires extra toggles:</p>
    <ul>
      <li>
        <strong>MIUI / HyperOS:</strong> Settings → Privacy protection → Special permissions → Install unknown apps → enable for
        your file manager, and turn off &quot;MIUI optimization&quot; in Developer options for stubborn cases
      </li>
      <li>
        <strong>Also required:</strong> an active internet connection during install, because MIUI verifies the APK online
      </li>
    </ul>
    <p>
      If the toggle is on and it still fails, check that you enabled it for the <em>specific app doing the install</em> (the
      browser, the file manager, or the installer app) — this is the most common miss.
    </p>

    <h2>Fixing corrupted downloads (INSTALL_FAILED_INVALID_APK)</h2>
    <p>If the file was truncated during download, the install fails at the parse stage. Verify before retrying:</p>
    <pre>
      <code>{`# Compare against the published checksum if available
shasum -a 256 app.apk

# Or at minimum, confirm the ZIP structure is intact
unzip -t app.apk | tail -3
# "No errors detected" means the archive is fine`}</code>
    </pre>
    <p>
      A partially downloaded APK is a ZIP with a missing central directory and <code>unzip -t</code> will report an unexpected
      end of the file. Delete and redownload from a different mirror.
    </p>

    <h2>INSTALL_FAILED_VERSION_DOWNGRADE</h2>
    <p>You are trying to install an older version over a newer one. Two options:</p>
    <pre>
      <code>{`# Option 1: allow downgrade (keeps data, may break app state)
adb install -r -d old-version.apk

# Option 2: uninstall first (loses data)
adb uninstall com.example.app && adb install old-version.apk`}</code>
    </pre>
    <p>
      Downgrading with <code>-d</code> often works but can leave the app in an inconsistent state if the newer version migrated
      its database. For apps with important local data, back up first.
    </p>

    <h2>A quick decision flow</h2>
    <ol>
      <li>Get the exact error code via <code>adb install</code></li>
      <li>Look it up in the table above</li>
      <li>If the code mentions signature/compatible → compare signatures</li>
      <li>If the code mentions ABIS → check <code>ro.product.cpu.abi</code> vs <code>lib/</code> contents</li>
      <li>If the code mentions RESTRICTED → check the ROM&apos;s unknown-sources toggle for the right app</li>
      <li>If the code mentions PARSE/INVALID → verify file integrity, redownload</li>
    </ol>
    <p>
      That flow resolves well over 90% of sideloading failures, and it takes less time than reinstalling the app three times
      hoping it works.
    </p>

    <h2>The one habit that prevents most of this</h2>
    <p>
      Keep the <strong>official APK</strong> of any app you rely on, from the same source every time. The majority of{" "}
      <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> errors come from mixing builds — official one day, a mirrored or modded
      one the next. Consistency of source is what makes upgrades painless.
    </p>
    <p>
      You can grab clean, officially signed builds and older versions at <Link href="/">gptoapk.com</Link>.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Why does an APK say \"App not installed\" with no reason?",
    answer:
      "The UI toast hides the real cause. Android returns a specific code such as INSTALL_FAILED_UPDATE_INCOMPATIBLE or INSTALL_FAILED_NO_MATCHING_ABIS. Run adb install app.apk from a computer and the failure reason is printed as a readable string. Without a PC, a logcat viewer with Shizuku or root also shows it.",
  },
  {
    question: "Can I install an APK signed with a different key over the existing app?",
    answer:
      "No. Android refuses to upgrade when the signing certificate differs from the installed version, returning INSTALL_FAILED_UPDATE_INCOMPATIBLE. The only path is to back up the app data, uninstall, then install the new APK. This happens whenever you mix Play Store builds with mirror or modded builds.",
  },
  {
    question: "What does INSTALL_FAILED_NO_MATCHING_ABIS mean?",
    answer:
      "The APK contains native libraries, but none compiled for your device's CPU architecture — usually a 32-bit only build being installed on a 64-bit-only phone. Check your ABI with adb shell getprop ro.product.cpu.abi and compare with the lib/ folders inside the APK. Download the matching variant instead of forcing the install.",
  },
  {
    question: "How do I fix INSTALL_FAILED_USER_RESTRICTED on Xiaomi or OPPO?",
    answer:
      "Grant install-unknown-apps permission to the exact app performing the install (normally your file manager or browser), keep the phone connected to the internet during install for MIUI's online verification, and on MIUI/HyperOS also try disabling MIUI optimization in Developer options.",
  },
  {
    question: "Is it safe to force-install an APK that reports a compatibility error?",
    answer:
      "Usually not. Bypassing the ABI check does not add the missing native libraries, so the app crashes at the first native call. Bypassing a downgrade check can also corrupt the database if the newer version migrated it. Back up data first and install the correct variant.",
  },
];

const ARTICLE2 = (
  <>
    <p>
      Sooner or later you want an APK file on your computer: to keep a copy of a version you like before an update, to install
      the same app on a tablet without re-downloading, or to inspect what an app actually contains.
    </p>
    <p>
      There are three practical methods. They differ in what they require and what they can extract, and picking the wrong one
      is the main reason people give up halfway.
    </p>

    <h2>Method 1: adb pull (the reliable one)</h2>
    <p>This is the method that always works, as long as you can enable USB debugging.</p>
    <pre>
      <code>{`# Enable Developer options: tap Build number 7 times
# Then enable USB debugging, connect the cable, accept the prompt on the phone
adb devices
# List of devices attached
# R58M12345  device

# Find the app's APK path
adb shell pm path com.example.app
# package:/data/app/~~abc==/com.example.app-xyz==/base.apk

# Pull it
adb pull /data/app/~~abc==/com.example.app-xyz==/base.apk ./app.apk`}</code>
    </pre>
    <p>The APK lands in your current directory. That&apos;s it.</p>
    <p>
      <strong>The catch with split APKs.</strong> Modern apps ship as a base APK plus configuration splits (per-ABI,
      per-density, per-language). <code>pm path</code> returns multiple lines in that case:
    </p>
    <pre>
      <code>{`adb shell pm path com.example.app
# package:/data/app/.../base.apk
# package:/data/app/.../split_config.arm64_v8a.apk
# package:/data/app/.../split_config.xxhdpi.apk`}</code>
    </pre>
    <p>
      Pulling only <code>base.apk</code> gives you an APK that <strong>will not install</strong> — it is missing its native
      libraries and resources. You need all of them:
    </p>
    <pre>
      <code>{`mkdir app-splits
adb shell pm path com.example.app | sed 's/^package://' | while read p; do
  adb pull "$p" app-splits/
done`}</code>
    </pre>
    <p>
      Then either sideload the whole folder with a split-aware installer, or merge them into a single APK with APKEditor:
    </p>
    <pre>
      <code>{`java -jar APKEditor.jar m -i app-splits/ -o app-merged.apk`}</code>
    </pre>
    <p>
      <strong>When to use this method:</strong> you want a clean, complete, unmodified copy. This is the only method that
      guarantees the APK is byte-identical to what is installed.
    </p>

    <h2>Method 2: a dedicated extraction app on the phone</h2>
    <p>
      Apps like App Inspector, Split APKs Installer (SAI), or APK Extractor read the installed package and export it to{" "}
      <code>/sdcard/Download/</code>.
    </p>
    <p>
      <strong>How it works:</strong> pick the app from the list, tap export, then connect the phone by USB and copy the file, or
      share it via a cloud service.
    </p>
    <p>
      <strong>Advantages:</strong> no PC-side setup beyond a USB cable; most of these apps handle split APKs and offer to bundle
      them into <code>.apks</code> or <code>.xapk</code>; works when USB debugging is not available (e.g. a locked-down work
      device).
    </p>
    <p>
      <strong>Limitations:</strong> the exported file depends on the app&apos;s own logic — some export only the base APK and
      silently skip splits; some tools add their own metadata files; installing another app is itself a sideload from a
      third-party source.
    </p>
    <p>
      <strong>When to use this method:</strong> one-off extraction, or when you cannot enable USB debugging.
    </p>

    <h2>Method 3: download from a mirror instead of extracting</h2>
    <p>
      Sometimes the answer is not &quot;get it off the phone&quot; at all — you just need the same APK file on both devices.
      Large mirrors host the officially signed builds, and you can download directly from the PC.
    </p>
    <p>
      <strong>Advantages:</strong> no cable, no debugging, and the mirror usually lists per-version ABI, density, and minSdk so
      you can pick the right variant for a second device.
    </p>
    <p>
      <strong>Limitations:</strong> it is the mirror&apos;s copy, not literally your installed file — normally identical, but
      verify the signature if it matters; version availability depends on the archive; some region-locked apps may be missing.
    </p>
    <p>
      <strong>When to use this method:</strong> you need the same app on a second device, or you want an older version that the
      Play Store no longer serves.
    </p>

    <h2>Verifying what you got</h2>
    <p>Whichever method you used, confirm the APK is intact and identify it:</p>
    <pre>
      <code>{`# Archive is not truncated
unzip -t app.apk | tail -2

# Package name, version, minSdk
aapt dump badging app.apk | head -5

# Signing certificate — compare against the official build
apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>
      <code>aapt dump badging</code> gives you the package name, <code>versionCode</code>, <code>versionName</code>, and{" "}
      <code>sdkVersion</code>, which is everything you need to confirm you pulled the right version.
    </p>

    <h2>Which method for which goal</h2>
    <table>
      <thead>
        <tr>
          <th>Your goal</th>
          <th>Best method</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Exact backup of the installed version</td>
          <td>adb pull (all splits)</td>
        </tr>
        <tr>
          <td>Quick one-off export, no cable setup</td>
          <td>Extraction app on phone</td>
        </tr>
        <tr>
          <td>Install the same app on another device</td>
          <td>Download from mirror</td>
        </tr>
        <tr>
          <td>Analyze contents / check signature</td>
          <td>adb pull, then apksigner + unzip</td>
        </tr>
        <tr>
          <td>Device with USB debugging disabled</td>
          <td>Extraction app</td>
        </tr>
      </tbody>
    </table>

    <h2>Two things that trip people up</h2>
    <p>
      <strong>Split APKs.</strong> As covered above — pulling only <code>base.apk</code> from an app that ships as a bundle
      produces a file that will not install anywhere. Check <code>pm path</code> output: more than one line means you need all
      of them.
    </p>
    <p>
      <strong>Data is not included.</strong> An APK contains only the application code and resources. Your logged-in accounts,
      saved files, and settings live in <code>/data/data/&lt;package&gt;/</code> and are not part of the APK. Pulling the APK
      is a backup of the <em>app</em>, not of your <em>data</em>. For that you need <code>adb backup</code> or the app&apos;s
      own export feature.
    </p>
    <p>
      Getting an APK onto your computer is a two-minute job once you know which of the three routes matches your situation. The
      adb route is the most reliable, a phone-side extractor is the most convenient, and the mirror route saves you from
      extracting at all when you just need the same file on another device.
    </p>
    <p>
      For the mirror route, <Link href="/">gptoapk.com</Link> lists per-version builds with ABI and Android version details, so
      you can pick the correct variant for a second device.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Where are APK files stored on an Android phone?",
    answer:
      "System-installed apps live in /data/app/<package>-<random>/base.apk, which is not readable without root. Use adb shell pm path <package> to get the exact path, then adb pull it. APKs you downloaded manually are usually in /sdcard/Download or /sdcard/Android/data/<browser>/files/.",
  },
  {
    question: "Why won't an APK pulled from my phone install on another device?",
    answer:
      "Almost always because it is a split APK and you only pulled base.apk. Run adb shell pm path <package>: if multiple lines are returned, pull every one of them, then install the folder with a split-aware installer or merge them with APKEditor into a single APK.",
  },
  {
    question: "Does copying an APK also copy my app data?",
    answer:
      "No. The APK contains only code and resources. Accounts, settings, and saved files live in /data/data/<package>/ and are not included. To move data you need adb backup, a root-level copy, or the app's own export/restore feature.",
  },
  {
    question: "Can I extract an APK without USB debugging?",
    answer:
      "Yes. Install an on-device extraction app such as App Inspector or SAI, export the package to storage, then copy it over USB or share it through a cloud service. Note that some of these apps export only the base APK and silently skip configuration splits.",
  },
  {
    question: "How do I check that a copied APK is the official signed build?",
    answer:
      "Run apksigner verify --print-certs app.apk and compare the SHA-256 certificate digest with a known official build of the same app. Also run unzip -t app.apk to confirm the archive is not truncated, and aapt dump badging to confirm the package name and versionCode.",
  },
];

export const enPosts20261110 = [
  {
    slug: "apk-install-failed-troubleshooting",
    title: "APK Install Failed? Decode the Error Message Instead of Guessing",
    description:
      "INSTALL_FAILED_UPDATE_INCOMPATIBLE, INSTALL_PARSE_FAILED_NO_CERTIFICATES, INSTALL_FAILED_NO_MATCHING_ABIS — every Android install error has a specific cause. How to read the code, verify it with adb, and fix it in one pass.",
    date: "2026-11-10",
    readTime: "10 min read",
    tags: ["android", "apk", "troubleshooting"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-from-phone-to-pc",
    title: "Moving APKs From Your Phone to a PC: Three Methods Compared",
    description:
      "adb pull, on-device extractor, or mirror download — three ways to get an APK onto your computer, what each can and cannot extract, and how to verify the file is intact and officially signed.",
    date: "2026-11-10",
    readTime: "9 min read",
    tags: ["android", "apk", "howto"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261110List = toList(enPosts20261110);
