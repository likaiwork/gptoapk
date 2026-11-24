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

const code = (t: string) => (
  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{t}</code>
);

const th = (t: string) => (
  <th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">{t}</th>
);
const td = (t: React.ReactNode) => (
  <td className="border border-gray-200 dark:border-gray-700 px-3 py-2">{t}</td>
);

const ARTICLE_469 = (
  <>
    <p>Most guides to &quot;safely downloading APKs&quot; say the same thing: use a trusted site, avoid cracked apps, keep Play Protect on. That is step zero, not a workflow. It tells you what to avoid but not what to <em>do</em> — and it fails completely against a repackaged build hosted on a site that looks trustworthy.</p>
    <p>This guide is the workflow I actually run. It takes about 30 minutes the first time and under 10 once it is habit. Everything here works on a phone or a laptop with no root, no subscription, and no special tooling beyond a free hashing command.</p>

    <h2>The mental model: four properties, not one</h2>
    <p>An APK is safe or unsafe depending on four independent properties. Any checklist that tests only one of them is incomplete.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("Property")}{th("Normal")}{th("Broken means")}</tr></thead>
      <tbody>
        <tr>{td(<strong>Provenance</strong>)}{td("Built by the developer or a real mirror")}{td("Repackaged and rehosted on a low-quality site")}</tr>
        <tr>{td(<strong>Signing identity</strong>)}{td("Same certificate fingerprint as official")}{td("Re-signed with injected code")}</tr>
        <tr>{td(<strong>Integrity</strong>)}{td("Hash matches the published value")}{td("Swapped or tampered in transit or at the mirror")}</tr>
        <tr>{td(<strong>Permissions</strong>)}{td("Match the app's stated function")}{td("Requests SMS, accessibility, or device admin it does not need")}</tr>
      </tbody>
    </table></div>
    <p>Verification is simply confirming all four. If you cannot confirm one, do not install.</p>

    <h2>Stage 1 (0–5 min): Screen the download page</h2>
    <p>Before downloading anything, look at the page. Any single item below is enough to walk away:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Forces a &quot;downloader&quot; install first.</strong> This is the classic bundle vector. No legitimate APK needs a helper app.</li>
      <li><strong>Three or more buttons that all look primary.</strong> A real download page has one main target.</li>
      <li><strong>Marketing filenames.</strong> {code("WhatsApp_Plus_v9.apk")}, {code("WeChat_Latest_Cracked.apk")}. Official builds use package names: {code("com.whatsapp_2.24.10.78.apk")}.</li>
      <li><strong>Suspiciously small files.</strong> Major apps run 80–200MB. A 12MB &quot;lite&quot; build of a 150MB app is a repack.</li>
      <li><strong>Asks you to disable protection.</strong> &quot;Ignore the security warning and continue&quot; is an instruction to lower your defenses, not a troubleshooting tip.</li>
      <li><strong>No version, changelog, or checksum anywhere.</strong></li>
    </ul>
    <p>A site worth using publishes package name, version code, targetSdk, file size, SHA-256, and update date. Their presence tells you the operator knows what these are.</p>

    <h2>Stage 2 (5–15 min): Five checks after download, before install</h2>

    <h3>1. Read the file metadata</h3>
    <p>On Android, a file manager shows the size. In the browser download list you can usually long-press to see the full filename. Confirm the filename matches a real package name and version, not a slogan.</p>

    <h3>2. Compute the SHA-256 and compare (the most important step)</h3>
    <p>On a computer:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# macOS / Linux\nshasum -a 256 com.whatsapp_2.24.10.78.apk\n\n# Windows PowerShell\nGet-FileHash .\\com.whatsapp_2.24.10.78.apk -Algorithm SHA256"}</code></pre>
    <p>Compare against the value published by the developer or a mirror with a version history. If it does not match, <strong>stop here</strong>. Do not continue to check other things and do not &quot;just try it&quot;. A hash mismatch means the file is not the file you think it is, and every check after this point is meaningless.</p>

    <h3>3. Check the signing certificate fingerprint</h3>
    <p>Two options. With Android SDK tools on a computer:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging app.apk | head -5        # package, versionCode, sdkVersion\napksigner verify --print-certs app.apk     # certificate fingerprints"}</code></pre>
    <p>Without a computer, install a lightweight APK info viewer (APK Info and similar). It reads the file without installing it and shows package name, certificate fingerprints, and the full permission list.</p>
    <p>The official build of an app has one stable certificate fingerprint. A different fingerprint means a re-signed package, no matter what the page claims. Note that some apps legitimately ship different fingerprints per distribution channel — compare against the channel you intended to install from.</p>

    <h3>4. Read the permission list against the function</h3>
    <p>This is the highest-signal, lowest-effort check. Line up each permission with what the app actually does.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("Permission")}{th("Justified when")}</tr></thead>
      <tbody>
        <tr>{td("Network, storage")}{td("Almost always — baseline")}</tr>
        <tr>{td("Camera, microphone")}{td("Photo, video, voice, calling apps")}</tr>
        <tr>{td("Read SMS / call log")}{td("Messaging, OTP, dialer apps only")}</tr>
        <tr>{td("Accessibility service")}{td("Input methods, automation, screen readers only")}</tr>
        <tr>{td("Device admin")}{td("Enterprise MDM, anti-theft only")}</tr>
        <tr>{td("Install unknown apps")}{td("App stores and updaters only")}</tr>
      </tbody>
    </table></div>
    <p>A flashlight app requesting SMS access has answered the question for you.</p>

    <h3>5. Scan on VirusTotal</h3>
    <p>Upload to virustotal.com (free, up to 650MB per file). Read two numbers:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Detection count.</strong> 0–2 engines flagging is usually heuristic noise from minor engines. More than 5 is a hard no.</li>
      <li><strong>First submission date.</strong> If the same hash has been submitted for months under many different filenames, it is being widely redistributed and deserves extra suspicion.</li>
    </ul>
    <p>Caveat: VirusTotal uploads your file to the cloud. Do not upload banking, government, or enterprise-internal apps. For those, rely on local hash and signature checks only.</p>

    <h2>Stage 3 (15–20 min): During installation</h2>
    <p>Three things matter:</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>Grant &quot;install unknown apps&quot; only for this one install.</strong> On Android this permission is granted per source app. Revoke it afterward.</li>
      <li><strong>Read the extra warning.</strong> Android 13+ warns that a sideloaded app is not verified by Play. That is normal. A warning that the app <em>contains harmful code</em> is not — do not bypass it.</li>
      <li><strong>Check the Play Protect result line.</strong> &quot;No harmful behavior found&quot; is the expected result. &quot;Unable to scan&quot; means the device could not reach the service; run a manual scan afterward.</li>
    </ol>

    <h2>Stage 4 (20–30 min and the first 24 hours): Post-install audit</h2>
    <p>Installing is the midpoint, not the finish line. Do four things:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Re-check granted permissions</strong> and compare with what you saw pre-install.</li>
      <li><strong>Disable autostart and background activity</strong> for anything that does not need it.</li>
      <li><strong>Watch battery and data for 24 hours.</strong> Unexplained drain or background traffic is the clearest behavioral signal of something unwanted.</li>
      <li><strong>Delay sensitive grants.</strong> Use the app normally for two or three days before granting SMS or accessibility.</li>
    </ul>
    <p>Uninstall immediately and change passwords if you see sudden pop-up or lock-screen ads, apps on the home screen you did not install, login alerts from services you did not touch, or a new accessibility service you did not enable.</p>

    <h2>Common questions</h2>
    <p><strong>Is the built-in phone security scan enough?</strong> It is a reasonable first layer against known samples. It does not verify signatures or compare hashes, so it is blind to a build re-signed with the genuine certificate.</p>
    <p><strong>Can I use &quot;lite&quot; or &quot;ad-free&quot; builds?</strong> No. They are by definition third-party repacks with a non-official signature.</p>
    <p><strong>Sideloaded apps never auto-update. Is that a problem?</strong> It is expected — apps installed outside Play are not in its update scope. Check the same trusted source every one to two months and redo the hash comparison each time.</p>
    <p><strong>Do I need to verify APKs extracted from Google Play links?</strong> Yes, but it can be shorter: confirm the extraction tool did not substitute the file (hash) and that the certificate is the official one.</p>

    <h2>The one-page version</h2>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"Screen the page: one download button / published hashes / no \"disable protection\"\n        ↓\nAfter download: filename → SHA-256 → compare → certificate fingerprint → permissions → VirusTotal\n        ↓\nInstall: grant only for this install → read the warning → check Play Protect result\n        ↓\nAfter install: re-check permissions → disable autostart → watch battery/data → delay sensitive grants"}</code></pre>
    <p>This does not stop everything. It does stop the categories that account for the overwhelming majority of real-world APK sideloading incidents: repackaged builds, poisoned mirrors, and over-broad permission requests. For a normal user, that is the right 90%.</p>
    <p>Related reading:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><Link href="/en/blog/android-apk-compatibility-check-before-download" className="text-blue-600 dark:text-blue-400 hover:underline">Android APK Compatibility Check Before Download</Link></li>
      <li><Link href="/en/blog/scan-apk-for-malware-without-antivirus" className="text-blue-600 dark:text-blue-400 hover:underline">Scan an APK for Malware Without Antivirus</Link></li>
      <li><Link href="/en/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK Signature Verification Failed: How to Fix</Link></li>
    </ul>
  </>
);

const ARTICLE_470 = (
  <>
    <p>&quot;Not compatible with your device&quot; and &quot;App not installed&quot; are two of the most unhelpful messages Android produces. Neither tells you which of five independent properties failed. The result is a loop: try a build, fail, try another build, fail, conclude the app is broken.</p>
    <p>It is usually not broken. Compatibility is decided by a small set of properties, all of which you can read before downloading — or read from the file you already have. This guide covers both.</p>

    <h2>The five properties that decide everything</h2>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("Property")}{th("What it controls")}{th("Fails as")}</tr></thead>
      <tbody>
        <tr>{td(<strong>minSdkVersion</strong>)}{td("Lowest Android version the app runs on")}{td("App not installed / parser refuses the package")}</tr>
        <tr>{td(<strong>targetSdkVersion</strong>)}{td("Which OS behavior model the app opts into")}{td("Installs but misbehaves on newer Android")}</tr>
        <tr>{td(<strong>ABI (CPU architecture)</strong>)}{td("Which machine code is inside")}{td(<>Installs, then crashes with {code("UnsatisfiedLinkError")}</>)}</tr>
        <tr>{td(<strong>Screen density</strong>)}{td("Which asset buckets are packaged")}{td("Installs and runs, but UI is stretched or assets missing")}</tr>
        <tr>{td(<strong>Split APKs / App Bundle</strong>)}{td("Whether one file is enough")}{td("App not installed because required splits are missing")}</tr>
      </tbody>
    </table></div>
    <p>Nothing else matters for the install-and-launch question. Permissions, storage space, and signature issues are separate failure classes with different messages.</p>

    <h2>Reading your device's profile</h2>
    <p>Before checking any file, know what your device is. All five answers come from one set of commands:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell getprop ro.build.version.sdk          # e.g. 34  (Android 14)\nadb shell getprop ro.product.cpu.abilist        # e.g. arm64-v8a,armeabi-v7a,armeabi\nadb shell wm size                               # e.g. 1080x2400\nadb shell wm density                            # e.g. 420\nadb shell getprop ro.product.model              # device name"}</code></pre>
    <p>Without adb, the equivalents are:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Android version:</strong> Settings → About phone → Android version</li>
      <li><strong>CPU architecture:</strong> most phones since 2018 are {code("arm64-v8a")}. This matters most for emulators ({code("x86_64")}), Chromebooks ({code("x86_64")}), and very old devices ({code("armeabi-v7a")} only).</li>
      <li><strong>Density:</strong> Settings → Display → Display size, or any &quot;screen info&quot; app.</li>
    </ul>
    <p>Write these values down once. You will reuse them for every sideload.</p>

    <h2>Reading a build's profile — from the file</h2>
    <p>With Android SDK build tools installed:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging app.apk | head -20"}</code></pre>
    <p>The relevant lines look like this:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"package: name='com.example.app' versionCode='4210' versionName='4.2.1'\nsdkVersion:'24'\ntargetSdkVersion:'34'\nnative-code: 'arm64-v8a' 'armeabi-v7a'\ndensities: '420' '480' '640'"}</code></pre>
    <p>Interpret:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>{code("sdkVersion:'24'")} — needs Android 7.0 or newer. On an Android 6 device this will never install.</li>
      <li>{code("targetSdkVersion:'34'")} — built for Android 14 behavior. An older target on a newer OS usually works but may hit scoped-storage or background restriction surprises.</li>
      <li>{code("native-code")} — if your device ABI is not in this list, the app will install and then crash when it loads its native library. This is the single most common &quot;installs but crashes instantly&quot; cause.</li>
      <li>{code("densities")} — mostly a polish issue, rarely a blocker.</li>
    </ul>
    <p>For App Bundles and splits, {code("aapt")} on a single {code(".apk")} can be misleading because it only sees one split. Use {code("apkanalyzer")} for a fuller picture:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apkanalyzer manifest print app.apk\napkanalyzer apk summary app.apk"}</code></pre>
    <p>For a {code(".apks")} / {code(".xapk")} / {code(".apkm")} container, list its contents:</p>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"unzip -l bundle.apks | head -30"}</code></pre>
    <p>If you see {code("base.apk")}, {code("split_config.arm64_v8a.apk")}, {code("split_config.xxhdpi.apk")}, you are holding a split set. Installing only {code("base.apk")} with a normal file manager will fail with &quot;App not installed&quot; — you need {code("adb install-multiple")} or a split-aware installer.</p>

    <h2>Reading a build's profile — from the download page</h2>
    <p>A trustworthy download page publishes enough to check without downloading:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Requires Android:</strong> the minSdk version, stated as an OS version (&quot;Android 7.0+&quot;)</li>
      <li><strong>Architecture:</strong> arm64-v8a / armeabi-v7a / universal</li>
      <li><strong>Package size per variant:</strong> universal builds are larger; per-ABI builds are smaller</li>
      <li><strong>Version and versionCode:</strong> so you can tell an upgrade from a downgrade</li>
    </ul>
    <p>If a page lists only a name and a download button, you are downloading blind.</p>

    <h2>Decision table for the common failures</h2>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr>{th("Message / behavior")}{th("Most likely cause")}{th("Check")}</tr></thead>
      <tbody>
        <tr>{td("App not installed immediately")}{td("minSdk too high, or signing conflict")}{td("sdkVersion from aapt; certificate fingerprint vs installed version")}</tr>
        <tr>{td("App not installed, no detail")}{td("Split APK installed as a single file")}{td(<>{code("unzip -l")} for {code("split_config_*")}</>)}</tr>
        <tr>{td("Your device is not compatible")}{td("ABI unsupported or allowlist")}{td(<>abilitist vs {code("native-code")}</>)}</tr>
        <tr>{td("Installs, crashes at launch")}{td("ABI mismatch or vendor ROM incompatibility")}{td(<>logcat for {code("UnsatisfiedLinkError")}</>)}</tr>
        <tr>{td("UI tiny, stretched, assets missing")}{td("Density split missing")}{td("densities line; try universal build")}</tr>
        <tr>{td("Newer version required on launch")}{td("Downgrade blocked or server gate")}{td("versionCode comparison")}</tr>
        <tr>{td("Updates fail with INSTALL_FAILED_UPDATE_INCOMPATIBLE")}{td("Signature mismatch with installed copy")}{td("Certificate fingerprints of both")}</tr>
      </tbody>
    </table></div>

    <h2>The universal build: the pragmatic answer</h2>
    <p>When you cannot determine your device's profile, or the app ships many variants, a <strong>universal APK</strong> removes three of the five failure modes at once: it contains all ABIs and all density buckets. The cost is size — often 2–3× the per-ABI build.</p>
    <p>The tradeoff is usually worth it for one-off sideloading and almost never worth it for keeping a large app long-term on a storage-constrained phone. A reasonable rule: use universal for the first install and any troubleshooting, then switch to the per-ABI build once you know which one your device needs.</p>

    <h2>When no build fits</h2>
    <p>Sometimes the honest answer is that the app cannot run on your device. Three cases:</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>minSdk above your Android version.</strong> There is no workaround. Installing a lower minSdk requires re-signing the app, which breaks its signature and integrity checks.</li>
      <li><strong>ABI with no matching native code and no universal build.</strong> On emulators, switching the emulator image to one with the right ABI (e.g. an arm64 image on Apple Silicon) is often the actual fix.</li>
      <li><strong>Hardware or vendor requirements</strong> (specific GPU, OEM framework, Play Services version). Not solvable at the packaging level.</li>
    </ol>
    <p>In each case, the useful next step is to identify which requirement failed so you can decide whether an alternative app, an older version, or a different device is the answer — rather than repeating installs that cannot succeed.</p>

    <h2>A 60-second checklist</h2>
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"1. Device: Android version / ABI / density            (adb getprop, or Settings)\n2. File:   sdkVersion / targetSdk / native-code       (aapt dump badging)\n3. Match:  device SDK >= sdkVersion ? ABI in native-code ?\n4. Split?  unzip -l shows split_config_* → install-multiple or split-aware installer\n5. Still failing? adb logcat | grep -E \"UnsatisfiedLink|INSTALL_FAILED|ClassNotFound\""}</code></pre>
    <p>Sixty seconds of reading beats twenty minutes of failed installs. Compatibility is a set of facts you can know in advance, not a gamble.</p>
    <p>Related reading:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><Link href="/en/blog/how-to-safely-download-apk-files-android-full-verification-workflow" className="text-blue-600 dark:text-blue-400 hover:underline">How to Safely Download APK Files on Android</Link></li>
      <li><Link href="/en/blog/apk-signature-verification-failed-fix" className="text-blue-600 dark:text-blue-400 hover:underline">APK Signature Verification Failed: How to Fix</Link></li>
      <li><Link href="/en/blog/how-to-install-split-apks-on-android" className="text-blue-600 dark:text-blue-400 hover:underline">How to Install Split APKs on Android</Link></li>
    </ul>
  </>
);

export const enPosts20261124 = [
  {
    slug: "how-to-safely-download-apk-files-android-full-verification-workflow",
    title: "How to Safely Download APK Files on Android: A Full Verification Workflow",
    description: "Most 'safe APK download' advice stops at 'use a trusted site'. That is step zero, not the answer. This guide gives a complete workflow you can run in about 30 minutes: what to check on the download page, how to hash and verify the file, how to read the signing certificate and permission list, what to do during install, and what to audit in the first 24 hours after installing. Includes copy-paste commands for macOS, Windows, and Android.",
    date: "2026-11-24",
    readTime: "15 min read",
    tags: ["APK", "Android security", "APK verification", "sideloading"],
    content: ARTICLE_469,
  },
  {
    slug: "android-apk-compatibility-check-before-download",
    title: "Android APK Compatibility Check: How to Know Before You Download Whether It Will Install and Run",
    description: "An APK that installs on one phone but not another is almost never a mystery. Five properties decide it: minSdkVersion, targetSdkVersion, ABI, screen density, and split/App Bundle packaging. This guide shows how to read each one from a download page or a local file using aapt, apkanalyzer, and adb, gives a decision table for the common failure messages, and covers what to do when there is no build that fits your device.",
    date: "2026-11-24",
    readTime: "14 min read",
    tags: ["APK", "compatibility", "Android", "sideloading"],
    content: ARTICLE_470,
  },
];

export const enPosts20261124List = toList(enPosts20261124);
