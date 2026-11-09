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
      Most malware on Android does not arrive through an exploit. It arrives because someone tapped &quot;Download&quot; on a
      page that looked fine, installed the package, and tapped &quot;Allow&quot; without reading the list.
    </p>
    <p>
      The good news: sideloading safely is a solved problem. It comes down to <strong>four verification steps</strong> —
      the source, the package identity, the signature, and the permissions. Each takes seconds. Skipping any of them is
      what gets people into trouble.
    </p>

    <h2>Rule zero: know why you are sideloading</h2>
    <p>You are sideloading because:</p>
    <ul>
      <li>
        <strong>The app is not on Google Play in your region</strong> — legitimate.
      </li>
      <li>
        <strong>The Play version is missing a feature</strong> — usually legitimate.
      </li>
      <li>
        <strong>Your device lacks Google services</strong> — legitimate.
      </li>
      <li>
        <strong>The app was removed from the store</strong> — this is a warning, not a reason. Removed apps are removed
        for a reason.
      </li>
      <li>
        <strong>A &quot;free premium&quot; or &quot;modded&quot; build was offered</strong> — stop. This is how most Android
        malware spreads.
      </li>
    </ul>
    <p>
      More than half of the malicious APKs in circulation are repackaged versions of popular apps: messaging apps
      &quot;with extra features,&quot; modded games, cracked paid apps. They are the original app <em>plus</em> a payload.
    </p>

    <h2>Step 1: Verify the source</h2>
    <p>Rank your sources like this:</p>
    <ol>
      <li>
        <strong>The developer&apos;s own website</strong> — best. Reach it through the official project page, not a search
        ad.
      </li>
      <li>
        <strong>APKMirror / APKPure</strong> — these verify signatures against known-good values.
      </li>
      <li>
        <strong>F-Droid</strong> — open-source, reproducible builds. Excellent for anything available there.
      </li>
      <li>
        <strong>Generic APK aggregator sites</strong> — treat as untrusted until proven otherwise.
      </li>
    </ol>
    <p>Two specific traps:</p>
    <p>
      <strong>Lookalike domains.</strong> Names like <code>whatsapp-download.com</code> or <code>spotify-apk.net</code> are
      almost never official. Check the domain carefully — a single extra hyphen matters.
    </p>
    <p>
      <strong>Search ads.</strong> Malicious APK sites buy ads on the app&apos;s own name. Always scroll past the ad block.
    </p>

    <h2>Step 2: Confirm the package name</h2>
    <p>Every Android app has a unique package name (application ID). This is the strongest identity check available.</p>
    <table>
      <thead>
        <tr>
          <th>App</th>
          <th>Package name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>WhatsApp</td>
          <td>
            <code>com.whatsapp</code>
          </td>
        </tr>
        <tr>
          <td>Spotify</td>
          <td>
            <code>com.spotify.music</code>
          </td>
        </tr>
        <tr>
          <td>Telegram</td>
          <td>
            <code>org.telegram.messenger</code>
          </td>
        </tr>
        <tr>
          <td>Signal</td>
          <td>
            <code>org.thoughtcrime.securesms</code>
          </td>
        </tr>
        <tr>
          <td>Instagram</td>
          <td>
            <code>com.instagram.android</code>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      To check an APK you already downloaded, use <code>aapt dump badging app.apk | head -1</code> and compare the package
      name. An APK calling itself &quot;WhatsApp&quot; with the ID <code>com.whatsapp.pro.plus</code> is not WhatsApp.{" "}
      <strong>Exact match only</strong> — no variations, no added suffixes.
    </p>

    <h2>Step 3: Check the signature</h2>
    <p>
      This is the step almost everyone skips, and it is the one that actually catches repackaged malware. An APK is
      signed. If someone modified the app and re-signed it, the certificate is different from the original.
      Comparing cert fingerprints is definitive.
    </p>
    <pre>
      <code>{`keytool -printcert -jarfile app.apk
# or
apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>You will see a SHA-256 fingerprint. Compare it against the known-good value:</p>
    <ul>
      <li>The developer&apos;s official site (many publish it)</li>
      <li>APKMirror, which lists fingerprints for every hosted version</li>
      <li>Google Play Console, for your own app</li>
    </ul>
    <p>
      <strong>If the fingerprint does not match, delete the file.</strong> No exceptions. This single check blocks the
      large majority of repackaged trojans.
    </p>
    <p>
      Android 11+ also enforces APK Signature Scheme v2/v3, which means an APK tampered with after signing will fail to
      install. That is a real safety net — but it only helps if the source you used did not re-sign the app itself.
    </p>

    <h2>Step 4: Read the permissions before installing</h2>
    <p>After you tap install, Android shows the permission list. Read it. This is your last chance to back out.</p>
    <p>Red flags by app category:</p>
    <table>
      <thead>
        <tr>
          <th>App type</th>
          <th>Reasonable</th>
          <th>Suspicious</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flashlight</td>
          <td>Camera</td>
          <td>SMS, contacts, accessibility</td>
        </tr>
        <tr>
          <td>Calculator</td>
          <td>Nothing</td>
          <td>Internet + accessibility</td>
        </tr>
        <tr>
          <td>Wallpaper</td>
          <td>Storage</td>
          <td>SMS, call logs</td>
        </tr>
        <tr>
          <td>Video player</td>
          <td>Storage, network</td>
          <td>Contacts, location, SMS</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Accessibility Service</strong> is the single most dangerous permission on Android. It can read everything on
      screen and simulate taps. A non-accessibility app requesting it is a near-certain sign of malicious intent — this
      is how banking trojans work. <strong>SMS permission</strong> on a non-messaging app is the classic premium-rate
      fraud setup.
    </p>

    <h2>Step 5: Understand Play Protect</h2>
    <ul>
      <li>It scans on install and periodically afterward</li>
      <li>It catches known malware, not zero-days or targeted attacks</li>
      <li>
        It can be turned off — verify it is on: Play Store → Profile → Play Protect → Settings
      </li>
    </ul>
    <p>
      If you sideload regularly, add a second opinion. Malwarebytes or Bitdefender Free both scan local APKs on demand.
      Two scanners is not paranoia; it is reasonable hygiene.
    </p>

    <h2>Step 6: Limit the damage before it happens</h2>
    <ul>
      <li>
        <strong>Do not sideload on the device holding your banking apps and primary email.</strong> Use a secondary device
        if you sideload often.
      </li>
      <li>
        <strong>Turn &quot;Install unknown apps&quot; back off immediately after you finish.</strong> It is a per-app
        permission — revoke it so the browser cannot silently install anything later.
      </li>
      <li>
        <strong>Use a Work Profile</strong> (via Shelter or Island) to isolate sideloaded apps from your main data.
      </li>
      <li>
        <strong>Keep backups.</strong> Ransomware on Android is rare but not nonexistent.
      </li>
    </ul>

    <h2>The two-minute checklist</h2>
    <ol>
      <li>Source is official site or APKMirror/F-Droid — not a random aggregator</li>
      <li>Domain spelling checks out, ad links ignored</li>
      <li>Package name matches the official application ID exactly</li>
      <li>SHA-256 certificate fingerprint matches the known-good value</li>
      <li>Permission list has no accessibility/SMS surprises</li>
      <li>Play Protect is enabled</li>
      <li>&quot;Install unknown apps&quot; revoked afterward</li>
    </ol>
    <p>
      Six of these seven take under fifteen seconds. The signature check takes thirty. That is the entire cost of avoiding
      almost every infected APK in circulation. You can compare verified files and checksums on our{" "}
      <Link href="/">APK download pages</Link>, and follow the install walkthrough in our{" "}
      <Link href="/blog/android-install-unknown-apps-setting-by-brand">per-brand install guide</Link>.
    </p>
    <p>
      Sideloading is a legitimate practice — it is how you install apps outside a gatekeeper&apos;s rules, keep an older
      version, or get software a store will not carry. The goal is not to stop doing it. The goal is to stop doing it
      blind.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Is downloading APK files from third-party sites legal?",
    answer:
      "Downloading an APK from a third-party site is generally legal for personal use in most jurisdictions, but distributing a paid app for free is not. The bigger risk is not legal but security: unverified third-party sites are the main distribution channel for repackaged malware. Prefer the developer's site, APKMirror, or F-Droid.",
  },
  {
    question: "How do I know if an APK is safe without installing it?",
    answer:
      "Check three things before installing: (1) the package name matches the official application ID exactly, (2) the signing certificate SHA-256 fingerprint matches the known-good value for that app, (3) the declared permission list has nothing unexpected. No install needed — aapt, keytool, and apksigner read all of this straight from the file.",
  },
  {
    question: "Why is the APK I downloaded much smaller than the real app?",
    answer:
      "A repackaged or malicious build is often much smaller because it strips the original resources and adds a small payload. A legitimate APK should be close in size to the Play version. A large size gap is a strong warning sign — verify the signature before installing.",
  },
  {
    question: "Does installing an APK void the warranty or break updates?",
    answer:
      "Sideloading does not void a hardware warranty and does not root the device. However, if you install a sideloaded build over a Play-installed app, Play will stop auto-updating it until versions reconcile. Installing a lower version number over a higher one also fails — uninstall first.",
  },
  {
    question: "What should I do if I already installed a suspicious APK?",
    answer:
      "Immediately: turn on airplane mode, uninstall the app, revoke its accessibility service permission (Settings → Accessibility), change the passwords for accounts signed in on that device from a different device, and run Play Protect plus a second scanner. If it had SMS or banking app access, contact your bank.",
  },
];

const ARTICLE2 = (
  <>
    <p>
      Installing an APK and finding out it will not run is a specific kind of frustration. The install succeeds, the icon
      appears, you tap it — and it crashes instantly, shows a black screen, or refuses to open with &quot;your device is
      not compatible.&quot;
    </p>
    <p>
      Compatibility has <strong>four independent dimensions</strong>, and only one of them (the API level) is enforced at
      install time. The other three fail later, often with useless error messages. Checking all four takes about two
      minutes.
    </p>

    <h2>The four dimensions</h2>
    <ol>
      <li>
        <strong>CPU architecture</strong> — does the device&apos;s ABI appear in the APK&apos;s native libraries?
      </li>
      <li>
        <strong>API level</strong> — is the device&apos;s Android version at least the app&apos;s minSdkVersion?
      </li>
      <li>
        <strong>Screen density</strong> — is there a matching resource bucket?
      </li>
      <li>
        <strong>Hardware features</strong> — does the device have the required sensors, GPU support, or services?
      </li>
    </ol>

    <h2>Dimension 1: CPU architecture (the biggest offender)</h2>
    <p>Modern Android devices are overwhelmingly <code>arm64-v8a</code>. But APKs in the wild are built for several ABIs:</p>
    <table>
      <thead>
        <tr>
          <th>ABI</th>
          <th>Where it comes from</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>arm64-v8a</code>
          </td>
          <td>All modern phones (2016+)</td>
        </tr>
        <tr>
          <td>
            <code>armeabi-v7a</code>
          </td>
          <td>Older 32-bit ARM devices</td>
        </tr>
        <tr>
          <td>
            <code>x86</code> / <code>x86_64</code>
          </td>
          <td>Emulators, some Intel tablets, ChromeOS</td>
        </tr>
      </tbody>
    </table>
    <p>Check your device:</p>
    <pre>
      <code>{`adb shell getprop ro.product.cpu.abi
# arm64-v8a
adb shell getprop ro.product.cpu.abilist
# arm64-v8a,armeabi-v7a,armeabi`}</code>
    </pre>
    <p>
      No ADB? Any system info app (AIDA64, Device Info HW) shows &quot;Supported ABIs.&quot; Then check the APK:{" "}
      <code>unzip -l app.apk | grep &quot;lib/&quot;</code>
    </p>
    <p>Rules:</p>
    <ul>
      <li>If your device&apos;s ABI appears, native code is fine.</li>
      <li>
        If only <code>armeabi-v7a</code> is present and your device is arm64, it usually installs but runs through a
        translation layer — slow, battery-hungry, and frequently crashing. Prefer the arm64 build.
      </li>
      <li>
        If no matching ABI exists at all (an <code>x86</code>-only APK on an ARM phone), it installs and crashes on the
        first native call. This is the classic &quot;installs then instantly closes&quot; case.
      </li>
    </ul>
    <p>
      Watch out: an APK with <strong>no <code>lib/</code> directory at all</strong> is pure Java/Kotlin and runs on any
      architecture. An empty <code>lib/</code> is not an error.
    </p>

    <h2>Dimension 2: minSdk and targetSdk</h2>
    <pre>
      <code>{`aapt dump badging app.apk | grep -E "sdkVersion|targetSdkVersion"
# sdkVersion:'24'
# targetSdkVersion:'34'`}</code>
    </pre>
    <p>Map the API level to an Android version:</p>
    <table>
      <thead>
        <tr>
          <th>API</th>
          <th>Android version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>23</td>
          <td>6.0 Marshmallow</td>
        </tr>
        <tr>
          <td>26</td>
          <td>8.0 Oreo</td>
        </tr>
        <tr>
          <td>29</td>
          <td>10</td>
        </tr>
        <tr>
          <td>31</td>
          <td>12</td>
        </tr>
        <tr>
          <td>33</td>
          <td>13</td>
        </tr>
        <tr>
          <td>34</td>
          <td>14</td>
        </tr>
        <tr>
          <td>35</td>
          <td>15</td>
        </tr>
      </tbody>
    </table>
    <p>
      If minSdkVersion is higher than your device&apos;s API level, the install is blocked outright — at least it fails
      early and clearly. More insidious is <strong>targetSdkVersion too low</strong>: apps targeting below API 23 cannot
      be installed on Android 14+ at all, so an old unmaintained app that &quot;used to work&quot; may simply refuse to
      install on a new phone.
    </p>

    <h2>Dimension 3: Screen density and resource buckets</h2>
    <p>
      Android scales resources automatically, so a missing density bucket is not fatal — but an APK shipping only{" "}
      <code>xxxhdpi</code> wastes storage, and one shipping only <code>ldpi</code> looks terrible on a modern panel. Check
      with <code>unzip -l app.apk | grep &quot;res/drawable-&quot;</code>. The real complaint behind &quot;incompatible&quot;
      is often tablet layout: if the app ships only default phone layouts, you get a stretched phone UI on a tablet.
    </p>

    <h2>Dimension 4: Hardware and software features</h2>
    <pre>
      <code>{`aapt dump badging app.apk | grep uses-feature
# uses-feature:'android.hardware.nfc'
# uses-feature-not-required:'android.hardware.bluetooth'`}</code>
    </pre>
    <p>
      <code>uses-feature-not-required</code> is fine — the app works without it. Plain <code>uses-feature</code> means
      the Play Store hides the app from devices lacking it, and on sideload the app may crash when it tries to use the
      missing hardware.
    </p>
    <p>
      <strong>The Google Play Services trap:</strong> on a device without GMS (some Huawei/Honor models, custom ROMs,
      de-Googled phones), apps that declared Play Services as required will install but break at runtime — login fails,
      maps stay blank, push notifications never arrive. Check for{" "}
      <code>com/google/android/gms</code> classes inside the APK.
    </p>

    <h2>Diagnosing after the fact: read the crash log</h2>
    <pre>
      <code>{`adb logcat -d | grep -iE "AndroidRuntime|FATAL|UnsatisfiedLinkError"`}</code>
    </pre>
    <table>
      <thead>
        <tr>
          <th>Log signature</th>
          <th>Cause</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>UnsatisfiedLinkError: dlopen failed</code>
          </td>
          <td>Wrong ABI</td>
        </tr>
        <tr>
          <td>
            <code>NoClassDefFoundError</code> on a GMS class
          </td>
          <td>Missing Play Services</td>
        </tr>
        <tr>
          <td>
            <code>SecurityException: Permission not granted</code>
          </td>
          <td>Missing runtime permission</td>
        </tr>
        <tr>
          <td>
            <code>Resources$NotFoundException</code>
          </td>
          <td>Missing resource for your density</td>
        </tr>
      </tbody>
    </table>
    <p>
      An <code>UnsatisfiedLinkError</code> on a <code>.so</code> file is almost always the architecture dimension — go back
      to Dimension 1.
    </p>

    <h2>Pre-download checklist</h2>
    <ol>
      <li>Note your device&apos;s ABI and Android API level (AIDA64, or <code>adb shell getprop</code>)</li>
      <li>
        Check the APK listing or <code>aapt dump badging</code> for <code>sdkVersion</code> and ABIs
      </li>
      <li>Confirm the app does not require hardware you lack</li>
      <li>If the device lacks Google Play Services, confirm the app works without it</li>
      <li>Only then download</li>
    </ol>
    <p>
      One more note worth knowing: <strong>split APKs</strong> (<code>.apks</code>, <code>.xapk</code>) are not single
      files — they are bundles of a base APK plus config APKs. Installing them requires a split-aware installer, and
      picking the wrong config split produces exactly the &quot;installs then crashes&quot; symptom described above. Our{" "}
      <Link href="/">APK catalog</Link> lists ABI and version per file so you can match before downloading.
    </p>
    <p>
      Compatibility checking is boring, it takes two minutes, and it saves you from downloading a 400MB file that will
      never work. That is a good trade.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why does an APK install successfully but crash immediately on launch?",
    answer:
      "Almost always a CPU architecture mismatch. The package installs because Android does not validate native libraries at install time, then the app crashes with UnsatisfiedLinkError on the first native call because no matching .so exists for your device's ABI. Check adb logcat for UnsatisfiedLinkError, then get an arm64-v8a build for modern phones.",
  },
  {
    question: "How do I check which Android version an APK requires?",
    answer:
      "Run aapt dump badging app.apk | grep sdkVersion. The sdkVersion value is the minimum API level; targetSdkVersion is the level it was built against. Map API 23 to Android 6, 26 to 8.0, 29 to 10, 31 to 12, 33 to 13, 34 to 14, 35 to 15.",
  },
  {
    question: "Will an armeabi-v7a APK work on a 64-bit ARM phone?",
    answer:
      "It usually installs and runs through a 32-bit translation layer, so it is not an outright failure — but expect worse performance, higher battery drain, and occasional crashes. Modern 64-bit builds (arm64-v8a) are always the better choice. Some Android 14+ devices ship with the 32-bit layer removed entirely, in which case it will not install at all.",
  },
  {
    question: "Can I install an APK that needs Google Play Services on a Huawei phone?",
    answer:
      "The APK will install, but anything depending on Google sign-in, Maps, or Firebase Cloud Messaging will break at runtime. Check for com/google/android/gms classes in the APK to see whether GMS is required. If it is, look for an HMS (Huawei Mobile Services) build of the same app instead.",
  },
  {
    question: "What is the difference between .apk, .xapk and .apks files?",
    answer:
      "An .apk is a single installable file. .xapk and .apks are bundles containing a base APK plus per-device config splits (ABI, density, language). Installing them requires a split-aware installer such as SAI or APKPure, and you must pick the split matching your device — choosing the wrong one is a common cause of immediate crashes.",
  },
];

export const enPosts20261109 = [
  {
    slug: "how-to-safely-download-apk-files-on-android",
    title: "How to Safely Download APK Files on Android: A Practical Checklist",
    description:
      "Sideloading is not inherently dangerous — downloading carelessly is. The exact verification chain that separates a legitimate APK from a trojan: source, package name, signing certificate, and permissions.",
    date: "2026-11-09",
    readTime: "9 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-compatibility-check",
    title: "Android APK Compatibility Check: Will This App Actually Run on Your Phone?",
    description:
      "An APK can install successfully and still be useless — wrong CPU architecture, too-new minSdk, missing hardware features. How to check all four compatibility dimensions before you download, and read crash logs after.",
    date: "2026-11-09",
    readTime: "9 min read",
    tags: ["android", "apk", "howto"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261109List = toList(enPosts20261109);
