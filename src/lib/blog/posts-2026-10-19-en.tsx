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
      Sideloading an APK isn&rsquo;t inherently dangerous. Downloading one from the wrong place is. The gap between a
      clean install and a phone full of adware is usually <strong>five minutes of checking before you tap
      Install</strong> &mdash; not which app you picked. This is a practical checklist: every step is something you can
      do on the phone or a laptop, in order, before the package touches your device.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> Security is a chain, not a gate &mdash; verified source &rarr; intact download &rarr;
        matching signature &rarr; clean scan &rarr; sane permissions. Break one link and the rest is decoration.
      </p>
    </blockquote>

    <h2>Step 1: Rank your sources honestly</h2>
    <p>
      <strong>Tier 1 (best):</strong> the developer&rsquo;s own site or GitHub Releases; F-Droid for open-source apps.
    </p>
    <p>
      <strong>Tier 2 (acceptable):</strong> APKMirror &mdash; it checks signatures against the developer key and
      rejects mismatches; APKPure, which exposes signature info you should still verify yourself.
    </p>
    <p>
      <strong>Tier 3 (risky):</strong> aggregators that show only a download button &mdash; no version, no hash, no
      signature.
    </p>
    <p>
      <strong>Never</strong> use a site that requires installing a &ldquo;downloader&rdquo; app first, or that pushes
      you to enable unknown sources before it will show you the file. That pattern is malware distribution.
    </p>

    <h2>Step 2: Confirm the download is intact</h2>
    <ul>
      <li>
        <strong>Check the size</strong> against the listing. A 200&nbsp;MB app arriving as 4&nbsp;MB is broken.
      </li>
      <li>
        <strong>Check the extension.</strong> <code>.apk</code> installs directly. <code>.apks</code>,{" "}
        <code>.xapk</code>, <code>.apkm</code> are bundles requiring a split-aware installer like SAI.
      </li>
      <li>
        <strong>Use Wi-Fi for large files</strong> &mdash; interrupted mobile downloads are the usual source of
        &ldquo;parse error.&rdquo;
      </li>
    </ul>

    <h2>Step 3: Check the signature, not the icon</h2>
    <p>
      Every Android app is signed with a developer key. Malware keeps the name and icon but carries a different
      signature. On a computer:
    </p>
    <pre>
      <code>{`apksigner verify --print-certs app.apk
# older APKs:
keytool -printcert -jarfile app.apk`}</code>
    </pre>
    <p>
      Compare the SHA-256 fingerprint with one published by the developer, or with a known-good copy you already trust.
      If two copies of the &ldquo;same&rdquo; app have different signatures, one is fake &mdash; don&rsquo;t guess which.
    </p>

    <h2>Step 4: Scan with more than one engine</h2>
    <p>
      Upload to <a href="https://www.virustotal.com" rel="nofollow noopener" target="_blank">VirusTotal</a> and read
      three things: detection count, first-seen date, and the signing certificate.
    </p>
    <ul>
      <li>
        <strong>1&ndash;2 of 70 detections</strong> are usually heuristic false positives, common for niche utilities.
      </li>
      <li>
        <strong>5+ detections, or any named family</strong> (e.g. <code>Trojan.AndroidOS.*</code>) means delete it.
      </li>
    </ul>

    <h2>Step 5: Read permissions before installing</h2>
    <ul>
      <li>Flashlight &rarr; camera only. Contacts or SMS is a red flag.</li>
      <li>Notes/to-do &rarr; storage. Location and phone access is a red flag.</li>
      <li>
        <strong>Accessibility Service</strong> and <strong>Device Admin</strong> turn an app into a remote control.
        No normal consumer app needs Accessibility. If a sideloaded app asks for it, stop.
      </li>
    </ul>

    <h2>Step 6: Scope the install permission narrowly</h2>
    <p>Android has used per-source install permission since 8.0 &mdash; exploit it:</p>
    <ol>
      <li>Settings → Apps → Special app access → Install unknown apps.</li>
      <li>Enable <em>only</em> the app you&rsquo;re installing from.</li>
      <li>Install.</li>
      <li>
        <strong>Turn it back off.</strong>
      </li>
    </ol>
    <p>Keep Play Protect on. If it flags your file, investigate rather than reflexively overriding.</p>

    <h2>Step 7: Contain the app afterwards</h2>
    <ul>
      <li>
        <strong>Revoke unneeded permissions</strong> (location, contacts, SMS) right after install.
      </li>
      <li>
        <strong>Restrict background activity</strong> &mdash; Samsung: Battery and device care → Background usage
        limits → Deep sleeping apps. Xiaomi: App → Battery saver → Restrict background activity. Pixel: App →
        Battery → Restricted.
      </li>
      <li>
        <strong>Watch it for a week</strong> &mdash; battery drain, notification spam, or unknown icons mean uninstall
        and rescan.
      </li>
    </ul>

    <h2>Device-specific notes</h2>
    <ul>
      <li>
        <strong>Samsung (One UI):</strong> strictly per-source authorization; Secure Folder is a separate install
        space; Knox-managed devices can block sideloading outright.
      </li>
      <li>
        <strong>Xiaomi (HyperOS/MIUI):</strong> extra scanner plus a 10-second risk countdown. Verify with VirusTotal
        first, then proceed if the signature matches.
      </li>
      <li>
        <strong>Pixel:</strong> closest to stock; Play Protect is the main gate and it&rsquo;s strict.
      </li>
      <li>
        <strong>Android 14+:</strong> apps with <code>targetSdkVersion</code> below 23 are blocked from installing
        entirely.
      </li>
    </ul>

    <h2>The 60-second version</h2>
    <ol>
      <li>Download from APKMirror, F-Droid, or the developer directly.</li>
      <li>Check size and that the file ends in .apk.</li>
      <li>Verify the signature fingerprint if published.</li>
      <li>Run it through VirusTotal.</li>
      <li>Skim permissions &mdash; no Accessibility for games.</li>
      <li>Enable unknown-source permission for one app, then disable it.</li>
      <li>Revoke extras and restrict background activity after install.</li>
    </ol>
    <p>
      Sideloading stays useful and stays safe &mdash; as long as the checklist happens <em>before</em> the install, not
      after.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Is it safe to download APKs from third-party sites?",
    answer:
      "It depends entirely on the site. APKMirror and F-Droid verify signatures against developer keys and are generally trustworthy. Site-agnostic safe practice: check the file size, verify the APK signature against the developer's published fingerprint, and run the file through VirusTotal before installing. Avoid any site that requires a downloader app.",
  },
  {
    question: "How do I verify an APK signature?",
    answer:
      "On a computer run apksigner verify --print-certs app.apk (or keytool -printcert -jarfile for older APKs) and compare the SHA-256 fingerprint to the value the developer publishes. If two copies of the same app show different signatures, one has been repackaged and should be discarded.",
  },
  {
    question: "What is the difference between 'Install unknown apps' and a global unknown sources toggle?",
    answer:
      "Since Android 8.0 the permission is granted per app, not globally. Each app that can install packages (file manager, browser, messaging app) needs its own toggle. Enabling it only for the one app you're installing from and turning it off afterwards limits exposure if a malicious file appears later.",
  },
  {
    question: "Is one VirusTotal detection enough to reject an APK?",
    answer:
      "Usually not. One or two detections out of seventy engines are frequently heuristic false positives, especially for small or niche utilities. Five or more detections, or any detection naming a known malware family, is a clear reason to delete the file.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      You download an APK, install it, and get <strong>&ldquo;App not installed&rdquo;</strong> or{" "}
      <strong>&ldquo;Your device isn&rsquo;t compatible with this version.&rdquo;</strong> Or it installs and crashes on
      launch. Almost every time the file isn&rsquo;t corrupt &mdash; it&rsquo;s a <strong>compatibility
      mismatch</strong>, and everything needed to predict it was inside the APK the whole time.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> An APK declares its requirements in <code>AndroidManifest.xml</code> (
        <code>minSdkVersion</code>, <code>targetSdkVersion</code>) and in its <code>lib/</code> folders (CPU ABIs). Read
        those two places and compatibility becomes predictable.
      </p>
    </blockquote>

    <h2>The four compatibility axes</h2>
    <ul>
      <li>
        <strong>minSdkVersion</strong> &mdash; hard gate. Too low an Android version means the installer refuses.
      </li>
      <li>
        <strong>targetSdkVersion</strong> &mdash; soft gate. Installs fine, then misbehaves on newer Android.
      </li>
      <li>
        <strong>CPU ABI</strong> &mdash; most common silent failure. Missing native library = instant crash.
      </li>
      <li>
        <strong>Density / hardware features</strong> &mdash; wrong UI scaling, or an app that needs NFC/GPS your phone
        lacks.
      </li>
    </ul>

    <h2>1. minSdkVersion: the hard gate</h2>
    <p>API level mapping worth memorizing:</p>
    <pre>
      <code>{`API 23 → Android 6.0      API 31 → Android 12
API 26 → Android 8.0      API 33 → Android 13
API 29 → Android 10       API 34 → Android 14
API 30 → Android 11       API 35 → Android 15
                          API 36 → Android 16`}</code>
    </pre>
    <p>
      Find yours with <code>adb shell getprop ro.build.version.sdk</code>.
    </p>
    <p>
      <strong>Android 14+ rule:</strong> apps with <code>targetSdkVersion</code> below 23 are blocked from installing
      entirely, even if <code>minSdkVersion</code> would allow them. That&rsquo;s why some very old APKs simply
      can&rsquo;t be installed on modern phones. There&rsquo;s no workaround short of editing and re-signing the
      manifest, which breaks the signature and is rarely worth it.
    </p>

    <h2>2. targetSdkVersion: the soft gate</h2>
    <p>
      This is what the app was built and tested against. It doesn&rsquo;t block installation (above API 23) but predicts
      odd behavior:
    </p>
    <ul>
      <li>Scoped storage on Android 11+ breaks old file access patterns.</li>
      <li>Background execution limits changed substantially from API 26 onward.</li>
      <li>Bluetooth and location permission handling changed in API 31.</li>
    </ul>
    <p>
      Rule of thumb: if <code>targetSdkVersion</code> is three or four Android releases behind your device, expect
      problems even when it installs.
    </p>

    <h2>3. CPU ABI: the most common silent failure</h2>
    <p>The four ABIs you&rsquo;ll encounter:</p>
    <ul>
      <li>
        <strong>arm64-v8a</strong> &mdash; 64-bit ARM. Essentially every phone since ~2020. What you want 95% of the
        time.
      </li>
      <li>
        <strong>armeabi-v7a</strong> &mdash; 32-bit ARM. Older and low-end devices; some modern chipsets dropped
        32-bit support entirely.
      </li>
      <li>
        <strong>x86 / x86_64</strong> &mdash; emulators, Chromebooks, rare tablets.
      </li>
    </ul>
    <p>Check your device and the APK:</p>
    <pre>
      <code>{`adb shell getprop ro.product.cpu.abi      # your primary ABI
adb shell getprop ro.product.cpu.abilist  # full list
unzip -l app.apk | grep "lib/"            # ABIs in the APK`}</code>
    </pre>
    <p>
      Each <code>lib/&lt;abi&gt;/</code> folder is a supported architecture. No <code>lib/</code> folder at all means
      the app is pure Java/Kotlin and runs anywhere &mdash; common for small utilities.
    </p>
    <p>
      <strong>The 32-bit trap:</strong> an app shipping only <code>armeabi-v7a</code> will not install on a
      64-bit-only device. It&rsquo;s increasingly common and easy to misdiagnose as a broken file.
    </p>

    <h2>4. Density and hardware features</h2>
    <ul>
      <li>
        <strong>Density splits</strong> &mdash; in split APKs, <code>split_config.xxhdpi.apk</code> matches your
        screen. Wrong density usually just means awkward scaling.
      </li>
      <li>
        <strong>uses-feature</strong> &mdash; requirements like NFC, GPS, or a specific OpenGL version. Play Store
        filters on these; direct APK installs don&rsquo;t, so the app can install and fail the moment it needs the
        missing hardware.
      </li>
    </ul>

    <h2>Reading it all at once</h2>
    <p>
      <strong>Fastest, with aapt:</strong>
    </p>
    <pre>
      <code>{`aapt dump badging app.apk | grep -E "sdkVersion|targetSdkVersion|native-code|densities"`}</code>
    </pre>
    <p>Four lines of output:</p>
    <pre>
      <code>{`sdkVersion:'24'
targetSdkVersion:'34'
native-code: 'arm64-v8a' 'armeabi-v7a'
densities: '480'`}</code>
    </pre>
    <p>
      <strong>With the Android SDK:</strong> <code>apkanalyzer manifest min-sdk app.apk</code> and{" "}
      <code>apkanalyzer manifest target-sdk app.apk</code>.
    </p>
    <p>
      <strong>No SDK, Python:</strong>
    </p>
    <pre>
      <code>{`pip install apkutils
# from apkutils import APK
# apk = APK.from_file("app.apk"); apk.parse()
# apk.get_manifest().get_min_sdk()`}</code>
    </pre>
    <p>
      <strong>On the phone:</strong> SAI or APK Info show minSdk, targetSdk, and ABIs before installing &mdash; fastest
      when the file is already on the device.
    </p>

    <h2>Troubleshooting map</h2>
    <ul>
      <li>
        <strong>&ldquo;Your device isn&rsquo;t compatible&rdquo;</strong> &rarr; minSdk above your API level &rarr; find
        a lower-minSdk build.
      </li>
      <li>
        <strong>&ldquo;App not installed&rdquo; on a valid file</strong> &rarr; ABI mismatch (32 vs 64-bit) &rarr; get
        the matching build.
      </li>
      <li>
        <strong>Installs then crashes instantly</strong> &rarr; native library missing for your ABI &rarr; check{" "}
        <code>lib/</code>.
      </li>
      <li>
        <strong>Crashes on file access</strong> &rarr; targetSdk too old for scoped storage &rarr; newer build.
      </li>
      <li>
        <strong>Refuses to install with no reason</strong> &rarr; targetSdk below 23 on Android 14+ &rarr; no
        workaround.
      </li>
    </ul>

    <h2>Bottom line</h2>
    <p>
      Compatibility isn&rsquo;t guesswork. Two commands &mdash; <code>aapt dump badging</code> and{" "}
      <code>unzip -l</code> &mdash; tell you everything an APK needs before it touches your phone. Check{" "}
      <code>minSdkVersion</code> against your API level, confirm your ABI appears in <code>lib/</code>, and skip
      anything built two Android generations ago. That routine eliminates the majority of failed installs.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "How do I find an APK's minimum Android version without installing it?",
    answer:
      "Run 'aapt dump badging app.apk | grep sdkVersion' on a computer, use apkanalyzer manifest min-sdk, or read it with a Python library such as apkutils. On the phone, apps like SAI or APK Info display minSdkVersion before installation.",
  },
  {
    question: "Why won't an APK install even though my Android version is new enough?",
    answer:
      "The most common cause is a CPU architecture mismatch — for example an armeabi-v7a-only build on a 64-bit-only device. It can also be Android 14+'s block on apps with targetSdkVersion below 23, or a signature conflict with an already-installed version of the app.",
  },
  {
    question: "What is the difference between minSdkVersion and targetSdkVersion?",
    answer:
      "minSdkVersion is the lowest Android API level the app supports and acts as a hard install gate. targetSdkVersion is the API level the app was built and tested against; it doesn't block installation above API 23, but determines how modern Android behaviors (storage, background limits, permissions) are applied.",
  },
  {
    question: "Which CPU ABI should I download for an Android phone?",
    answer:
      "For any phone made since roughly 2020, choose arm64-v8a. Check yours with 'adb shell getprop ro.product.cpu.abi'. Only fall back to armeabi-v7a if a 64-bit build doesn't exist and your device still supports 32-bit apps.",
  },
];

export const enPosts20261019: BlogPostEntry[] = [
  {
    slug: "how-to-safely-download-apk-files-on-android-checklist",
    title: "How to Safely Download APK Files on Android: A 7-Step Pre-Install Checklist",
    description:
      "Most sideloading disasters are preventable before you tap Install. A practical checklist covering source verification, APK signature checks, VirusTotal scanning, permission audits, and safe installation — with Samsung, Xiaomi, and Pixel specifics.",
    date: "2026-10-19",
    readTime: "9 min read",
    tags: ["android", "apk", "security", "sideloading", "guide"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-compatibility-check-before-install",
    title: "How to Check APK Compatibility on Android Before Installing (minSdk, ABI, Density)",
    description:
      "Before downloading a 200 MB APK, find out in 30 seconds whether it will run on your phone. How to read minSdkVersion, targetSdkVersion, supported CPU ABIs, and screen density from any APK — with aapt, apkanalyzer, and on-device tools.",
    date: "2026-10-19",
    readTime: "8 min read",
    tags: ["android", "apk", "compatibility", "adb", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261019List = toList(enPosts20261019);
