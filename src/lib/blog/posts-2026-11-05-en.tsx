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
    question: "Is checking the file hash enough to know an APK is safe?",
    answer:
      "No. A hash only proves the file matches what the publisher distributed. If the publisher repackaged the app, the hash still matches. Only signature fingerprint verification tells you the file was signed by the real developer.",
  },
  {
    question: "How do I find the signature fingerprint of an APK?",
    answer:
      "Run apksigner verify --print-certs -v file.apk from your Android build-tools folder and read the Signer #1 certificate SHA-256 digest line. Compare it character for character against the developer's published fingerprint.",
  },
  {
    question: "Play Protect blocked my sideloaded app. Should I disable it?",
    answer:
      "Try More details then Install anyway first — that option exists for deliberate sideloads. If the signature fingerprint matches the official one, the warning is about provenance, not malware. Only disable Play Protect as a last resort, and turn it back on afterwards.",
  },
  {
    question: "Why do APKs from two sources refuse to install over each other?",
    answer:
      "Different signing keys. Play-distributed builds may be signed with Play App Signing while a developer-site build uses the upload key, so installing over an existing copy fails with INSTALL_FAILED_UPDATE_INCOMPATIBLE. You must uninstall first, which deletes app data.",
  },
  {
    question: "Can a modded APK ever be verified as safe?",
    answer:
      "Not by signature. A repackaged build either fails verification or passes with a key that does not belong to the original developer. Signature checking is the wrong tool; treat modded builds as an unverified trust decision rather than a verification problem.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "An APK installs but crashes instantly. What is the most likely cause?",
    answer:
      "Wrong CPU architecture. If the APK has only lib/x86/ or lib/armeabi-v7a/ while the device is arm64-v8a, native code either cannot load or falls back to a translation layer that fails. Check with unzip -l file.apk | grep lib/.",
  },
  {
    question: "What does INSTALL_FAILED_UPDATE_INCOMPATIBLE mean?",
    answer:
      "A version of the same package with a different signing key is already installed. Compare the installed signature fingerprint via dumpsys package with apksigner verify --print-certs on the new file. If they differ, uninstall first — back up data before you do.",
  },
  {
    question: "Why does an .xapk install but launch to a black screen?",
    answer:
      "You installed only the base APK. Split bundles keep native libraries and resources in separate split_config files. Use adb install-multiple with every split, a split-aware installer, or switch to the universal build.",
  },
  {
    question: "The app installs and opens but sign-in and maps fail. Is the APK broken?",
    answer:
      "Probably missing Google Play Services. Check adb shell pm list packages | grep com.google.android.gms. Some apps crash on launch during the GMS availability check; others boot but silently fail on any feature that calls a Google API.",
  },
  {
    question: "How much free storage does an install actually need?",
    answer:
      "Roughly 2.5 times the APK size: the APK itself, extracted native libraries, dex optimization output, and working space during install. A 400 MB APK can fail on a device showing 700 MB free.",
  },
];

const ARTICLE1 = (
  <>
    <p>
      &ldquo;Download APK files from trusted sources&rdquo; is the most repeated and least useful advice in Android security
      writing. It assumes you already know which sources are trusted, that trust is binary, and that a trustworthy source
      never serves a bad file. None of those hold.
    </p>

    <p>
      What actually works is a <strong>verification workflow</strong>: a fixed sequence of checks that produces a decision
      for a specific file at a specific moment. Below is the one I use, in the order that catches the most problems for the
      least effort.
    </p>

    <h2>The core mental model</h2>

    <p>An APK install is a decision about <strong>four things</strong>, independently:</p>

    <ol>
      <li>
        <strong>Origin</strong> — where the bytes came from
      </li>
      <li>
        <strong>Integrity</strong> — whether the bytes arrived intact
      </li>
      <li>
        <strong>Authorship</strong> — whether the file was signed by the real developer
      </li>
      <li>
        <strong>Fit</strong> — whether this build is appropriate for this device
      </li>
    </ol>

    <p>
      Most bad outcomes come from skipping #3, because #1 and #2 feel like enough. They are not. A perfectly intact file from
      a legitimate-looking mirror can still be repackaged, and integrity checks will pass happily.
    </p>

    <h2>Step 1: Grade the source before you download</h2>

    <p>Not all sources carry the same risk. Grade them explicitly:</p>

    <ul>
      <li>
        <strong>Tier A — signed distribution channels.</strong> Google Play, F-Droid, Amazon Appstore, and the
        developer&apos;s own site publishing signed releases.
      </li>
      <li>
        <strong>Tier B — mirrors with signature exposure.</strong> Sites that publish the developer&apos;s signing
        certificate fingerprint alongside each file. You cannot trust them on faith, but they give you what you need to check.
      </li>
      <li>
        <strong>Tier C — aggregator sites.</strong> Ranked lists and &ldquo;download any app&rdquo; portals. The file might be
        fine. The site has no mechanism to tell you if it isn&apos;t.
      </li>
      <li>
        <strong>Tier D — social and file-sharing links.</strong> Messaging channels, cloud drive links, &ldquo;modded&rdquo;
        versions. No chain of custody at all.
      </li>
    </ul>

    <p>
      Rules that follow: Tier A or B for anything involving money, identity, or accounts. Tier C only with full verification
      in the later steps. And <strong>Tier D is not a sourcing problem, it is a trust problem</strong> — no amount of
      verification makes a modded APK safe, because whoever repackaged it could change the code.
    </p>

    <h2>Step 2: Check the download itself</h2>

    <p>Cheap and fast, and it catches corrupt files and partial downloads:</p>

    <ul>
      <li>
        <strong>File size</strong> — compare against what the page states. A mismatch of more than a few KB means the
        transfer was interrupted or the file was replaced.
      </li>
      <li>
        <strong>File extension</strong> — installed apps end in <code>.apk</code>, or <code>.apks</code> /{" "}
        <code>.xapk</code> for split bundles. A <code>.zip</code> containing an &ldquo;installer.exe&rdquo; is not an Android
        package.
      </li>
    </ul>

    <p>
      Corruption shows up later as <code>INSTALL_PARSE_FAILED_NOT_APK</code> or &ldquo;Package appears to be invalid&rdquo;. If
      you see those, re-download before troubleshooting your device.
    </p>

    <h2>Step 3: Verify the signature fingerprint</h2>

    <p>
      This is the check that actually distinguishes safe from unsafe, and the one almost nobody does. Every Android app is
      signed with a certificate, and that certificate&apos;s SHA-256 fingerprint is the app&apos;s stable identity across
      versions. Repackage an APK — change a permission, inject a library, swap a payload — and the fingerprint changes.
    </p>

    <p>
      Get the reference fingerprint from the developer, or from a stock build you already have installed from a source you
      consider legitimate. Then get the candidate file&apos;s:
    </p>

    <pre>
      <code>{`apksigner verify --print-certs -v suspicious.apk
# look for: Signer #1 certificate SHA-256 digest:`}</code>
    </pre>

    <p>On a device that already has the app installed:</p>

    <pre>
      <code>{`adb shell pm list packages -f | grep <package-name>
adb shell dumpsys package <package-name> | grep -A2 "signatures"`}</code>
    </pre>

    <p>
      <strong>Compare the two fingerprints character for character.</strong> Not &ldquo;similar&rdquo;, not &ldquo;same
      subject name&rdquo;. A certificate can carry any subject string the signer wants — the fingerprint is the only real
      identifier. A mismatch means repackaging, a genuine (and rare) key rotation, or an intentional fork presented as the
      original. None of those are &ldquo;probably fine&rdquo;.
    </p>

    <h2>Step 4: Verify integrity against a published hash</h2>

    <p>
      If the source publishes a SHA-256 of the file, run <code>shasum -a 256 downloaded.apk</code> on macOS,{" "}
      <code>sha256sum</code> on Linux, or <code>Get-FileHash</code> in PowerShell on Windows, and compare the full string.
    </p>

    <p>
      This confirms the file matches what the publisher intended to distribute. It does <strong>not</strong> confirm the
      publisher is trustworthy — it only closes the gap between &ldquo;what they published&rdquo; and &ldquo;what you
      received&rdquo;. Note the ordering: hash first, then signature. A bad hash after a passing signature just means your
      download broke.
    </p>

    <h2>Step 5: Check that the build fits the device</h2>

    <p>A valid, authentic APK can still be wrong for your phone. Three attributes matter:</p>

    <p>
      <strong>Architecture.</strong> Most modern phones are <code>arm64-v8a</code>. Check the device with{" "}
      <code>adb shell getprop ro.product.cpu.abi</code>, then look inside the file with{" "}
      <code>unzip -l downloaded.apk | grep &quot;lib/&quot;</code>. An arm64 device running an armeabi-v7a-only build works
      via 32-bit compatibility but can be dramatically slower; an x86 build will not run at all.
    </p>

    <p>
      <strong>Minimum SDK.</strong> <code>aapt dump badging downloaded.apk | grep sdkVersion</code> shows it. Above your
      Android version, and the install fails with no useful explanation.
    </p>

    <p>
      <strong>Split requirement.</strong> If the download is <code>.apks</code> or <code>.xapk</code>, installing the base
      APK alone produces a broken app. Check first rather than debugging a black screen later.
    </p>

    <h2>Step 6: Read the permission list before installing</h2>

    <p>
      Not a cryptographic check, but the best available signal for whether an app does what it claims. Run{" "}
      <code>aapt dump permissions downloaded.apk</code>. Pay special attention to:
    </p>

    <ul>
      <li>
        <code>SYSTEM_ALERT_WINDOW</code> — draws over other apps, enabling tapjacking
      </li>
      <li>
        <code>BIND_ACCESSIBILITY_SERVICE</code> — full UI control, the single most abused permission in mobile malware
      </li>
      <li>
        <code>REQUEST_INSTALL_PACKAGES</code> — can install further APKs, i.e. self-propagation
      </li>
      <li>
        <code>RECEIVE_BOOT_COMPLETED</code> + <code>FOREGROUND_SERVICE</code> — persistence through reboots
      </li>
    </ul>

    <p>
      Any one of these is legitimate for some app category. All of them together in a utility app is not.
    </p>

    <h2>Step 7: Play Protect, as a last resort only</h2>

    <p>
      Play Protect will sometimes block a sideloaded app with &ldquo;unsafe app blocked&rdquo;. Understand what it is saying:
      this build is not recognized from Play&apos;s records. For a legitimate app you are installing deliberately, that is
      expected. Tap <em>More details</em> then <em>Install anyway</em> — that option exists precisely for deliberate
      sideloads. Only if that fails should you consider turning Play Protect off, and turn it back on afterwards.
    </p>

    <h2>The compressed checklist</h2>

    <ol>
      <li>Source is Tier A or B. If not, I need a reason.</li>
      <li>File size matches the listing.</li>
      <li>SHA-256 matches the published hash, if one exists.</li>
      <li>Signature fingerprint matches the reference.</li>
      <li>Permission list is proportionate to the app&apos;s function.</li>
    </ol>

    <p>
      If all five pass, install it. If any one fails, stop and find out why — the failure is information, not an obstacle.
    </p>

    <h2>What this workflow does not protect against</h2>

    <p>
      It does not protect against a legitimate app that is malicious by design, a compromised developer account that signed
      a bad update, or exploits in Android itself triggered by a crafted file. What it does protect against is the
      overwhelmingly common case: a repackaged build distributed through an aggregator or a messaging link, carrying injected
      code and wearing the original app&apos;s name. That is the threat that catches people, and the fingerprint check catches
      it every time. More verification guides are on the <Link href="/blog">gptoapk blog</Link>.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p>
      Nothing is more frustrating than a download that completes, installs, and then doesn&apos;t work — with no explanation.
      The mistake people make is treating this as one problem. It&apos;s at least five separate ones, and they fail at
      different moments.
    </p>

    <p>Where the failure happens tells you what to check.</p>

    <h2>The failure-point map</h2>

    <ul>
      <li>
        <strong>Before install starts</strong> — &ldquo;App not installed&rdquo; or &ldquo;Package appears to be
        invalid&rdquo;. Check signature and <code>minSdkVersion</code>.
      </li>
      <li>
        <strong>During install</strong> — an <code>INSTALL_FAILED_*</code> code. Check signature mismatch, storage, downgrade.
      </li>
      <li>
        <strong>At launch</strong> — crash or black screen immediately. Check ABI, split bundle, native libs.
      </li>
      <li>
        <strong>After a few seconds</strong> — frozen, then an ANR dialog. Check ABI fallback, memory, storage.
      </li>
      <li>
        <strong>On specific features</strong> — camera, maps, or payments fail. Check Play Services and target API level.
      </li>
    </ul>

    <p>
      Read the row that matches, then work only that row&apos;s column. Guessing across categories is what produces the
      twenty-step forum advice that never resolves anything.
    </p>

    <h2>Attribute 1: Architecture (ABI)</h2>

    <p>
      The most common cause of &ldquo;installs but crashes immediately&rdquo;. Apps can ship native code compiled per CPU
      architecture: <code>arm64-v8a</code> for every modern phone, <code>armeabi-v7a</code> as a 32-bit fallback, and{" "}
      <code>x86_64</code> / <code>x86</code> for emulators.
    </p>

    <pre>
      <code>{`adb shell getprop ro.product.cpu.abi
unzip -l app.apk | grep "lib/" | awk -F/ '{print $2}' | sort -u`}</code>
    </pre>

    <p>
      If the APK contains only <code>armeabi-v7a</code> and the device is <code>arm64-v8a</code>, it installs and runs via
      32-bit compatibility, but is slower and crashes on devices where the vendor dropped the 32-bit layer — recent flagship
      builds have begun removing it entirely. If the APK contains only x86, it will not run on ARM at all.{" "}
      <code>INSTALL_FAILED_NO_MATCHING_ABIS</code> is the explicit version of this failure. Fix by getting the right build,
      not by fighting the installer.
    </p>

    <h2>Attribute 2: Minimum and target SDK</h2>

    <p>
      <code>minSdkVersion</code> is a hard gate: lower device version, no install. Check it with{" "}
      <code>aapt dump badging app.apk | grep -E &quot;sdkVersion|targetSdkVersion&quot;</code>, and compare against{" "}
      <code>ro.build.version.sdk</code>. Clean failures produce a &ldquo;not compatible with your device&rdquo; message.
    </p>

    <p>
      Insidious failures come from <code>targetSdkVersion</code>. Since Android 14, apps targeting below API 23 are refused
      outright. Below 33, the system shows extra confirmation dialogs and increasingly restricts background behavior. On
      Android 15 and later, very old targets can fail to install with nothing more than a generic error.
    </p>

    <h2>Attribute 3: Split APKs</h2>

    <p>
      A <code>.apks</code>, <code>.xapk</code>, or <code>.apkm</code> file is a bundle, not an app: a base APK plus
      configuration splits per ABI, density, and language. The symptom of getting this wrong is an install that
      &ldquo;succeeds&rdquo; and an app that crashes on launch, because the base is present but the arm64 native libraries
      live in a split that was never installed.
    </p>

    <pre>
      <code>{`unzip -l bundle.apks | head -30
# base.apk + split_config.arm64_v8a.apk + split_config.xxhdpi.apk

adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk`}</code>
    </pre>

    <p>
      The one file you <em>can</em> install directly is a <strong>universal</strong> build, which packages all splits into a
      single APK. Larger, but self-contained — and when a bundle misbehaves and you don&apos;t need the size savings,
      switching to universal is the fastest fix.
    </p>

    <h2>Attribute 4: Signature and upgrade path</h2>

    <p>
      <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> and <code>INSTALL_FAILED_ALREADY_EXISTS</code> usually mean a version
      of this package with a <em>different signing key</em> is already installed. This happens constantly with sideloading,
      because the same app may come from Play (Play App Signing), from the developer&apos;s site (upload key), and from a
      mirror (possibly repackaged).
    </p>

    <pre>
      <code>{`adb shell dumpsys package com.example.app | grep -A3 "signatures"
apksigner verify --print-certs new.apk`}</code>
    </pre>

    <p>
      If they differ there is no upgrade path — you must uninstall first, which deletes app data.{" "}
      <strong>Back up before doing that.</strong> The other one is <code>INSTALL_FAILED_VERSION_DOWNGRADE</code>: the
      installed version is newer, so either uninstall or use <code>adb install -r -d old-version.apk</code>.
    </p>

    <h2>Attribute 5: Play Services and framework dependencies</h2>

    <p>
      An app that installs and opens but fails on sign-in, maps, push, or in-app purchase is usually missing Google Play
      Services, not broken. Check with{" "}
      <code>adb shell pm list packages | grep -E &quot;com.google.android.gms|com.android.vending&quot;</code>. Both listed
      means GMS is present; missing means many apps boot but silently fail on anything touching Google APIs, and some crash on
      launch during the availability check.
    </p>

    <p>
      A subtler variant: GMS is present but <strong>outdated</strong>. The app calls a newer Play Services API that does not
      exist on the installed version and fails on first use. Update GMS before blaming the app.
    </p>

    <h2>Attribute 6: Storage and internal constraints</h2>

    <p>
      <code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code> is honest, but Android needs more room than the APK size: the APK
      itself, extracted native libraries, dex optimization output (often 1.5–2× the APK), and working space during the
      install. <strong>Keep 2.5× the APK size free</strong> — a 400 MB APK can fail on a device showing 700 MB free. Check
      with <code>adb shell df -h /data</code>; if <code>/data</code> is separate from <code>/storage/emulated</code>, the
      number in Settings may not be the relevant one.
    </p>

    <h2>A fast triage sequence</h2>

    <ol>
      <li>
        <code>aapt dump badging app.apk | grep -E &quot;sdkVersion|native-code&quot;</code> — minSdk and supported ABIs in one
        line
      </li>
      <li>Compare against <code>ro.build.version.sdk</code> and <code>ro.product.cpu.abi</code></li>
      <li>
        <code>apksigner verify --print-certs app.apk</code> versus the installed package&apos;s signature
      </li>
      <li>
        <code>adb shell df -h /data</code> — free space at least 2.5× the APK size
      </li>
      <li>Check whether the file is <code>.apks</code> / <code>.xapk</code> and needs a split-aware install</li>
    </ol>

    <p>
      That covers well over 90% of real-world cases. If all five pass and the app still fails, run{" "}
      <code>adb logcat</code> during the install and read the actual error — at that point it is no longer a compatibility
      problem, it is a specific bug with a specific message. More troubleshooting guides are on the{" "}
      <Link href="/blog">gptoapk blog</Link>.
    </p>
  </>
);

export const enPosts20261105 = [
  {
    slug: "how-to-safely-download-apk-files-verification-workflow",
    title: "How to Safely Download APK Files on Android: A Source-Verification Workflow",
    description:
      "Trusted-source advice is not an instruction. This is a concrete, repeatable procedure for deciding whether a specific APK file is safe to install: source grading, hash checks, signature fingerprint verification, build fit, and permission review.",
    date: "2026-11-05",
    readTime: "10 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-compatibility-check-diagnostic-decision-table",
    title: "Android APK Compatibility Check: Diagnosing Builds That Won't Install or Won't Run",
    description:
      "Compatibility is not one property. An APK can fail at install time, at launch, or minutes into use, and each failure maps to a different attribute. A decision table for ABI, SDK level, split APKs, signatures, Play Services, and storage.",
    date: "2026-11-05",
    readTime: "10 min read",
    tags: ["android", "apk", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261105List = toList(enPosts20261105);
