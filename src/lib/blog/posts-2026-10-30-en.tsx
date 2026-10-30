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
    question: "Why does an APK install on one phone and fail on another?",
    answer:
      "Compatibility is decided by four independent checks: the minimum Android version in the manifest, the CPU architectures included in the archive, required hardware features, and screen density. A build can pass three and fail one, which is why the same file installs on a friend's phone and not yours.",
  },
  {
    question: "How do I check which CPU architectures an APK supports?",
    answer:
      "Run aapt2 dump badging app.apk and read the native-code line, or unzip -l app.apk | grep 'lib/' to list the ABI folders. No native-code line at all means the app is pure Java/Kotlin and runs on any architecture.",
  },
  {
    question: "My phone is 64-bit and the APK only has 32-bit code. Can I fix that?",
    answer:
      "No. Modern flagship chips have dropped 32-bit support entirely, so a build shipping only armeabi-v7a native code cannot run on them. You need a 64-bit build of the app; there is no setting that changes this.",
  },
  {
    question: "Where can I see the real install failure reason instead of 'App not installed'?",
    answer:
      "Logcat. Run adb logcat -c, then adb logcat | grep -iE 'PackageManager|INSTALL_FAILED' while installing. INSTALL_FAILED_OLDER_SDK, INSTALL_FAILED_NO_MATCHING_ABIS and INSTALL_FAILED_UPDATE_INCOMPATIBLE each point to a different, specific cause.",
  },
  {
    question: "What does 'device not compatible' from the Play Store mean versus a sideload failure?",
    answer:
      "The Play Store blocks downloads when the manifest declares required hardware you lack, or the ABI is missing. Sideloading skips only those pre-checks. The manifest rules are still enforced by the package installer, so a sideload can install and then misbehave instead of refusing outright.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Is sideloading an APK inherently unsafe?",
    answer:
      "No. Unverified sideloading is unsafe. A signature check against the publisher's certificate tells you whether the package was modified, and that check works regardless of which site you downloaded from.",
  },
  {
    question: "What does a SHA-256 comparison actually prove?",
    answer:
      "That the file matches the publisher's file byte for byte. It is a tamper check, not an intent check — if the publisher is dishonest, the hash will still match their file.",
  },
  {
    question: "Why does the certificate matter more than the hash?",
    answer:
      "Repackaged APKs, which make up most malicious Android packages, must be signed with a new key. That key is visible in the file. A random owner name, a blank owner on a major app, or a certificate issued a few days ago is direct evidence of re-signing, whereas a hash only proves the bytes were not corrupted in transit.",
  },
  {
    question: "Which permissions should make me stop?",
    answer:
      "Any permission the app's core function cannot explain. The pair of SYSTEM_ALERT_WINDOW plus accessibility, or READ_SMS on something that is not a messaging or banking app, are standard overlay and OTP-theft setups. Treat any mismatch as the finding.",
  },
  {
    question: "Can I verify an APK entirely on the phone without a computer?",
    answer:
      "Yes, with an APK inspector app that displays the signing certificate and permission list, plus a checksum tool for the hash. It takes about two minutes rather than 90 seconds with adb attached, but the checks are the same.",
  },
];

const ARTICLE1 = (
  <>
    <h1>Android APK Compatibility Check: Why a Build Won&apos;t Install on the Right Phone</h1>

    <p>
      An APK that &quot;doesn&apos;t work&quot; is almost never a defective APK. It is a package built for a device profile
      different from yours. Android will let you download a file that the installer has already decided it cannot use.
    </p>

    <p>
      Compatibility is decided by four independent checks. Any one failing produces either an install refusal or a crash on
      launch. Knowing which one failed tells you whether to find a different build or accept that it is not going to run.
    </p>

    <h2>The four checks</h2>

    <ul>
      <li>
        <strong>Minimum SDK</strong> — <code>minSdkVersion</code> in the manifest. Failure reads &quot;App not installed&quot; or
        &quot;device isn&apos;t compatible&quot;.
      </li>
      <li>
        <strong>CPU architecture</strong> — the <code>lib/</code> folders inside the archive. Failure either refuses to install
        or crashes within a second of launch.
      </li>
      <li>
        <strong>Required hardware features and density</strong> — the Play Store refuses the download; a sideload installs and
        then misbehaves.
      </li>
      <li>
        <strong>Distribution and integrity flags</strong> — installs cleanly, then exits with a region or modified-device
        message.
      </li>
    </ul>

    <p>
      Sideloading skips only the Play Store&apos;s pre-checks. The manifest rules are still enforced at install time by the
      package installer, which is why the failure moves rather than disappears.
    </p>

    <h2>Read the manifest with one command</h2>

    <pre>
      <code>{`aapt2 dump badging app.apk

package: name='com.example.app' versionCode='8420' versionName='4.2.1'
sdkVersion:'24'
targetSdkVersion:'34'
native-code: 'arm64-v8a' 'armeabi-v7a'`}</code>
    </pre>

    <p>
      <code>sdkVersion:&apos;24&apos;</code> means Android 7.0 or newer is required. The <code>native-code</code> line is the
      single most common cause of sideload failures.
    </p>

    <h2>The architecture problem in detail</h2>

    <p>
      The legacy 32-bit ABI is <code>armeabi-v7a</code>; 64-bit is <code>arm64-v8a</code>. Phones sold since roughly 2019 are
      64-bit capable, but that does not mean they accept 32-bit builds — several current flagship chips dropped 32-bit support
      outright. Check what your device actually advertises:
    </p>

    <pre>
      <code>{`adb shell getprop ro.product.cpu.abilist
# arm64-v8a,armeabi-v7a,armeabi`}</code>
    </pre>

    <p>Two related traps:</p>

    <ol>
      <li>
        A build with <strong>no native-code line at all</strong> is pure Java/Kotlin and runs on any architecture. If it still
        fails, the cause is <code>minSdk</code>, not architecture.
      </li>
      <li>
        <strong>x86 / x86_64 entries</strong> mean the build targets emulators and Chromebooks. It installs on an ARM phone and
        crashes with <code>UnsatisfiedLinkError</code> on the first native call.
      </li>
    </ol>

    <h2>Get the real failure reason from logcat</h2>

    <p>
      The on-screen text is imprecise. The log is not:
    </p>

    <pre>
      <code>{`adb logcat -c && adb logcat | grep -iE "PackageManager|INSTALL_FAILED"`}</code>
    </pre>

    <ul>
      <li>
        <code>INSTALL_FAILED_OLDER_SDK</code> — your Android version is below minSdk. Find an older build.
      </li>
      <li>
        <code>INSTALL_FAILED_NO_MATCHING_ABIS</code> — no compatible architecture in the archive. Find a build for your ABI.
      </li>
      <li>
        <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> — a different signing key is already installed. Uninstall first, which
        loses data.
      </li>
      <li>
        <code>INSTALL_FAILED_VERSION_DOWNGRADE</code> — the installed version is newer. Use <code>adb install -d</code>.
      </li>
      <li>
        <code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code> — needs roughly 2.5× the APK size free, not 1×.
      </li>
    </ul>

    <h2>Required features: why Play and sideload disagree</h2>

    <p>
      A manifest entry like <code>{`<uses-feature android:name="android.hardware.telephony" android:required="true"/>`}</code>{" "}
      makes the Play Store hide the app on devices without that hardware. Sideloading bypasses the check, so the app installs
      and then throws on the screens that use the missing feature. Density splits behave the same way more quietly: an APK built
      only for <code>xxhdpi</code> installs fine and looks broken at runtime on lower-density screens.
    </p>

    <h2>Region and integrity gates</h2>

    <p>
      Some builds install perfectly and exit on first launch citing the region, the government, or a modified device. That is
      not an installer-level compatibility failure — the app decided at runtime, using SIM country, IP geolocation, Play
      Integrity verdicts, or the installer package name. None of it is fixable by choosing a different architecture, and
      bypassing it usually violates the terms the account runs under. Treat it as a hard stop.
    </p>

    <h2>The 60-second pre-install checklist</h2>

    <ol>
      <li>
        <code>aapt2 dump badging</code> → note <code>sdkVersion</code> and <code>native-code</code>
      </li>
      <li>Compare minSdk to your Android version in Settings → About phone</li>
      <li>
        Compare native-code to <code>ro.product.cpu.abilist</code> — or just confirm both sides are 64-bit
      </li>
      <li>Look for <code>required=&quot;true&quot;</code> hardware features you do not have</li>
      <li>Check free space is at least 2.5× the APK size</li>
      <li>Check whether a version is already installed, and decide about signing keys before uninstalling</li>
    </ol>

    <p>
      One command&apos;s worth of output. It converts &quot;the APK is broken&quot; into &quot;the APK is for a different
      phone&quot;, which is a solvable problem. If you need the current build for your own device profile, resolving the Play
      Store link through <Link href="/">gptoapk.com</Link> gets you the store&apos;s original artifact rather than a
      re-packaged copy.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>How to Safely Download APK Files on Android: A Verification Workflow That Takes 90 Seconds</h1>

    <p>
      Most &quot;is it safe to download APKs&quot; answers are a list of sites. That is the least durable part of the answer.
      Sites change owners, get cloned, and get compromised. What does not change is the verification: a signature, a hash, and a
      permission list. All three are checkable on any download, from any source, indefinitely.
    </p>

    <h2>Step 1: Pick a source that lets you verify</h2>

    <p>
      The feature that separates a verifiable source from an unverifiable one is not reputation — it is whether the site
      publishes something you can check against the file you received.
    </p>

    <ul>
      <li>
        <strong>Verifiable:</strong> publishes original signing certificate fingerprints; publishes SHA-256 per file with a
        version history; or is Google Play, which performs the check for you.
      </li>
      <li>
        <strong>Not verifiable:</strong> a &quot;100% safe&quot; badge; a Telegram channel; a file-hosting link.
      </li>
    </ul>

    <p>
      Version history matters more than it looks. An APK mirror with only the latest build cannot be used to pin or roll back,
      and is a common vector for &quot;updated&quot; builds that quietly differ from the original. A mirror that shows the
      certificate fingerprint allows an independent check even if the mirror itself were malicious.
    </p>

    <h2>Step 2: Download deliberately</h2>

    <ul>
      <li>
        Use the phone browser, not a messaging relay. WhatsApp, WeChat, and Telegram rewrite filenames and can truncate large
        files.
      </li>
      <li>Confirm the reported size matches the site before installing.</li>
      <li>
        Do all of this <strong>before</strong> installing. The package can still be inspected afterwards, but you have already
        run the code once.
      </li>
    </ul>

    <h2>Step 3: Fingerprint the file</h2>

    <pre>
      <code>{`shasum -a 256 app.apk
adb shell sha256sum /sdcard/Download/app.apk`}</code>
    </pre>

    <p>
      A mismatch means the bytes differ from what the source claims. Do not install. But note the limit: a hash proves the file
      matches the publisher&apos;s file, not that the publisher is honest. It is a tamper check, not an intent check.
    </p>

    <h2>Step 4: Read the signature — the check that actually matters</h2>

    <p>
      Repackaged builds are the overwhelming majority of malicious Android APKs, and repackaging requires signing with a new
      key. That key is visible:
    </p>

    <pre>
      <code>{`keytool -printcert -jarfile app.apk | grep -E "Owner|SHA256"
apksigner verify --print-certs app.apk`}</code>
    </pre>

    <p>What to look at:</p>

    <ul>
      <li>
        <strong>Owner</strong> should read as the company that makes the app. A random personal name, a reseller, or a blank
        owner on a major app is a repackage.
      </li>
      <li>
        <strong>Certificate SHA-256</strong> should be stable across versions. Compare a trusted older version with the new one.
      </li>
      <li>
        <strong>Validity dates</strong> — certificates valid for a few days are almost always generated by a repackaging tool.
      </li>
    </ul>

    <h2>Step 5: Check permissions against purpose</h2>

    <p>
      Permissions are not a reliable malware detector, but they are an excellent mismatch detector:
    </p>

    <ul>
      <li>
        <code>READ_SMS</code> / <code>RECEIVE_SMS</code> — reasonable for SMS and banking apps, suspicious on a game or photo
        editor.
      </li>
      <li>
        <code>SYSTEM_ALERT_WINDOW</code> plus an accessibility service — the standard overlay-attack setup. Reasonable for
        launchers and automation tools, and for little else.
      </li>
      <li>
        <code>REQUEST_INSTALL_PACKAGES</code> — expected for app stores and updaters, a red flag anywhere else.
      </li>
    </ul>

    <pre>
      <code>{`aapt2 dump permissions app.apk`}</code>
    </pre>

    <p>
      If the app&apos;s core function does not explain the permission, that is the finding. No further analysis needed.
    </p>

    <h2>Step 6: Install with the blast radius reduced</h2>

    <ol>
      <li>Install into a work profile or secondary user, which cannot read your main profile&apos;s storage.</li>
      <li>Revoke permissions after first launch, then grant only what you need, on demand.</li>
      <li>Turn &quot;Install unknown apps&quot; back off afterwards — the grant is persistent per source app.</li>
      <li>Do not sign into accounts that matter until the app has run cleanly for a session.</li>
    </ol>

    <h2>What is out of scope</h2>

    <ul>
      <li>
        <strong>On-device AV scanning</strong> catches known samples only. A useful last filter, worthless as assurance.
      </li>
      <li>
        <strong>&quot;APK safety scanner&quot; websites</strong> upload your file to a third party. You trade one possible risk
        for a different one.
      </li>
      <li>
        <strong>Play Protect</strong> is a real control but flags by reputation, so a freshly repackaged build can pass for days.
      </li>
    </ul>

    <p>
      For the official build itself, resolving the Play Store link through <Link href="/">gptoapk.com</Link> gives you the
      store&apos;s original artifact — which makes the certificate check in Step 4 a formality rather than a decision.
    </p>
  </>
);

export const enPosts20261030 = [
  {
    slug: "android-apk-compatibility-check-before-install",
    title: "Android APK Compatibility Check: Why a Build Won't Install on the Right Phone",
    description:
      "The APK downloads fine, opens fine on a friend's phone, and refuses to install on yours. Compatibility in Android is decided by four independent checks — minSdk, ABI, required hardware, and density. Here is how to read each one in under a minute before installing.",
    date: "2026-10-30",
    readTime: "9 min read",
    tags: ["android", "apk", "troubleshooting"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "how-to-safely-download-apk-files-on-android-verification-workflow",
    title: "How to Safely Download APK Files on Android: A Verification Workflow That Takes 90 Seconds",
    description:
      "Sideloading is not inherently unsafe — unverified sideloading is. A practical workflow: pick a source that publishes fingerprints, hash the file, read the signing certificate, match permissions to purpose, then install into a secondary profile so the blast radius stays small.",
    date: "2026-10-30",
    readTime: "9 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261030List = toList(enPosts20261030);
