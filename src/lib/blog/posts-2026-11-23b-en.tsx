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

const ARTICLE = (
  <>
      <p>So you downloaded an APK from a site you half-trust. The usual moves are to upload it to an online multi-engine scanner, or to install it and tap &quot;Scan&quot; in the phone's built-in security centre. Both feel responsible. Both miss a large class of problems.</p>
      <p>Online scanners match <strong>static file signatures</strong>. Repackaged builds, greymarket ad SDKs and clones with swapped payment channels are usually clean by that measure - they contain no known malware, they just contain things you did not agree to. Phone-based &quot;security centres&quot; often only validate the install source against a vendor whitelist; once the file is installed, they announce &quot;protected&quot; and stop looking.</p>
      <p>The reliable path is the opposite of both: <strong>inspect the file before installing it</strong>, using tools that ship with the Android SDK - <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">unzip</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb</code>. About ten minutes of work gives you a concrete picture of what the package declares it can do, whether it came from who it claims, and whether it carries signs of a shell packer.</p>
      <p>This guide is about the <strong>decision criteria</strong>, not the commands - the commands are trivially copyable.</p>
      <h2>1. What this can and cannot prove</h2>
      <p>Set the boundary first, so you do not over-trust it.</p>
      <p><strong>You can establish:</strong></p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Whether the package really comes from the developer it claims (certificate and signing scheme).</li>
        <li>Every permission it requests, including the dangerous ones: SMS, accessibility, notification access, overlay, device admin.</li>
        <li>Whether components are exported to the rest of the system - i.e. how much of an attack surface it presents.</li>
        <li>Whether there are signs of runtime code loading (dropped <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dex</code>/<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">so</code>, encrypted <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assets/</code> payloads).</li>
        <li>Whether well-known ad or analytics SDKs are baked in.</li>
      </ul>
      <p><strong>You cannot establish:</strong></p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Server-delivered behaviour after install, including staged payloads.</li>
        <li>The real logic inside a packed or heavily obfuscated binary - you can only see that a packer is present.</li>
        <li>Zero-days.</li>
      </ul>
      <p>Treat this as <strong>risk reduction, not a guarantee</strong>. It is extremely effective against sloppy clones, stripped builds and pirated apps that quietly request SMS access. It will not defeat a well-built multi-stage trojan.</p>
      <h2>2. Preparation</h2>
      <p>Install Android SDK platform-tools and build-tools (this is where <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> live), then confirm:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb version\naapt version\napksigner --version"}</code></pre>
      <p>Use the official <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> for signature work. Third-party verifiers still misreport some v3/v4 signatures, which is exactly the kind of ambiguity you do not want in a security check.</p>
      <h2>3. Check 1: signature and provenance</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs app.apk"}</code></pre>
      <p>Read <strong>Signer #1 certificate DN</strong> and the <strong>SHA-256 digest</strong>.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>A company DN that matches the official publisher (e.g. a recognisable corporate <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">CN=</code>) is a good sign.</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">CN=Android Debug</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Unknown</code>, or a random string means either a repack or a hobby build. Risk rises sharply.</li>
        <li><strong>The same app from two sources with different SHA-256 fingerprints</strong>: at least one was modified. Do not install both, and do not assume the one you have is the good one.</li>
      </ul>
      <p>The single most useful trick here: download the official copy from Google Play and compare fingerprints. If they match, a third-party mirror likely shipped you the real file - just possibly with a different download wrapper.</p>
      <p>Then check the signing scheme:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify -v app.apk"}</code></pre>
      <p>If only <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">v1 scheme (JAR signing): true</code> shows while v2 and v3 are false, the build is old or badly packaged, and is easier to modify in transit.</p>
      <h2>4. Check 2: declared permissions (highest signal per minute spent)</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump permissions app.apk"}</code></pre>
      <p>Or, for something already installed:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys package <package> | grep -i \"granted\\|requested\""}</code></pre>
      <p>The judgement is a <strong>permission-to-function</strong> comparison, not a count:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Permission</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Legitimate use</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Red flag when</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SEND_SMS</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">READ_SMS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Messaging apps, OTP autofill</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">A flashlight, calculator or small game requests it</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BIND_ACCESSIBILITY_SERVICE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Accessibility, some automation tools</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Requested by a utility app (can read screen and click for you)</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BIND_NOTIFICATION_LISTENER_SERVICE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Notification managers, watch sync</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Unrelated to widgets or screens</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SYSTEM_ALERT_WINDOW</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Floating widgets, screen recorders</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Cleaning tools, &quot;boosters&quot;</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">DEVICE_ADMIN</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Enterprise MDM, find-my-phone</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Entertainment apps</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">REQUEST_INSTALL_PACKAGES</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App stores, updaters</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Single-purpose utilities</td></tr></tbody>
      </table></div>
      <p>One heuristic does most of the work: <strong>a calculator asking for SMS access is broken; a camera asking for accessibility is hostile.</strong> A mismatch between declared power and stated purpose is stronger evidence than any scanner verdict.</p>
      <h2>5. Check 3: exported components</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump xmltree app.apk AndroidManifest.xml | grep -B2 -A2 \"android:exported\""}</code></pre>
      <p>Exported activities, services and receivers are reachable by any other app on the device. Most apps have a few, so the question is again proportional:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>An exported <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BroadcastReceiver</code> on <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">BOOT_COMPLETED</code> means it starts at every boot. Paired with an ad SDK, that is a permanently resident background process.</li>
        <li>An exported <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Service</code> with no permission guard can be bound by third parties - a convenient relay for data.</li>
        <li>An exported <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Activity</code> on <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.action.VIEW</code> with a custom scheme is a phishing landing target.</li>
      </ul>
      <p>An offline note-taking app with five boot-start receivers is not a plausible design.</p>
      <h2>6. Check 4: signs of packing and runtime loading</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"unzip -l app.apk | head -50\nunzip -l app.apk | grep -iE \"\\.so$|assets/|payload\""}</code></pre>
      <p>Signals worth flagging:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Large encrypted blobs under <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">assets/</code> (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.bin</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.dat</code>) - often a second-stage payload.</li>
        <li>An unusual number of native libraries with random names (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">liba1b2c3.so</code>) - classic packer output.</li>
        <li>Networks endpoints discoverable with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">unzip -p app.apk classes.dex | strings | grep -iE &quot;http://|report|track&quot;</code> - quick look at where it phones home.</li>
      </ul>
      <p>For a closer read, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apktool d app.apk</code> decompiles to smali; grep for <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">DexClassLoader</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Runtime.exec</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">System.loadLibrary</code> to see whether it loads executable code at runtime. Slow, but decisive for &quot;is this a shell&quot;.</p>
      <p>Cross-check against known ad SDK prefixes (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.google.android.gms.ads</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.bytedance.sdk</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.qq.e</code>, and similar). Ads alone are not malware - but <strong>many permissions plus an ad SDK plus several exported boot receivers</strong> is the standard signature of a grey-market build.</p>
      <h2>7. Check 5: runtime behaviour after install</h2>
      <p>Static analysis sees declared capability. Behaviour needs the device:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb logcat -v time | grep -iE \"permission|denied|security|avc\""}</code></pre>
      <p>Frequent <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">avc: denied</code> lines mean the app keeps reaching for resources outside its grants. Frequent clipboard reads or location requests in the log are also meaningful.</p>
      <p>Finally open Settings → Apps → <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">&lt;app&gt;</code> → Permissions → <strong>Permission usage history</strong>. Access to features you have never triggered from that app is the clearest post-install signal there is. Uninstall on the spot.</p>
      <h2>8. Status summary</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Check</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Low risk</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">High risk</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Signer DN</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Official publisher</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Debug / Unknown / mismatch</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Signing scheme</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">v2 + v3</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">v1 only</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Permissions</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Match stated function</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">High power, trivial function</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Exported components</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Few, justified</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Multiple boot-start receivers</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Package structure</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Clean, few natives</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Many random <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">so</code>, encrypted assets</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Runtime</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No anomalies</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Repeated privilege attempts</td></tr></tbody>
      </table></div>
      <p>Three or more items in the right column: drop the build and get it from an official source.</p>
      <h2>9. FAQ</h2>
      <p><strong>Q1: Do I need a computer?</strong></p>
      <p>Permissions are readable on-device from Settings after install, and some tools can show the certificate. Precise inspection with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code>/<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner</code> is desktop-first. Termux can host <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">aapt</code> on the phone, at the cost of setup friction.</p>
      <p><strong>Q2: Online scanners report the file is clean. Isn't that enough?</strong></p>
      <p>It means the static file matches no known signature. Most problematic sideloaded builds are not viruses at all - they are clones with extra ad SDKs and changed payment paths. Clean but harmful.</p>
      <p><strong>Q3: If the signature matches the official one, is it definitely safe?</strong></p>
      <p>No. A matching fingerprint proves it is the same developer and key - it does not mean the official build itself is free of ads or trackers. Signature matching removes the &quot;modified by a third party&quot; risk, nothing more.</p>
      <p><strong>Q4: Everything checks out but the installed app still behaves badly.</strong></p>
      <p>That is the runtime phase: watch traffic, wake locks and permission usage history. Static checks describe what an app is allowed to do, not what it does.</p>
      <h2>Bottom line</h2>
      <p>Auditing an APK on your own machine is five steps: <strong>`apksigner` for provenance, `aapt dump permissions` for declared power, exported-component review for attack surface, package inspection for runtime loading, then `logcat` plus permission-usage history for real behaviour</strong>. The value is not technical sophistication - it is replacing a gut feeling with evidence. The one rule that filters the most bad builds on its own: <strong>does the requested power match the advertised function.</strong></p>
  </>
);

export const enPosts20261123B = [
  {
    slug: "scan-apk-for-malware-without-antivirus",
    title: "Scan an APK for Malware Without Installing an Antivirus: The On-Device Toolkit",
    description: "Uploading a sideloaded APK to an online scanner or trusting the phone's built-in security centre sounds responsible but misses a whole class of junk: repackaged builds, greymarket ad SDKs, and signature-swapped clones rarely match any malware signature. The reliable path is to inspect the file before installing it, using tools Android already ships with - apksigner, aapt, unzip and adb. This guide covers the five checks, what each one can and cannot prove, and the permission/function mismatch table that filters most bad builds in one read.",
    date: "2026-11-23",
    readTime: "7 min read",
    tags: ["apk","security","adb","verification"],
    content: ARTICLE,
  },
];

export const enPosts20261123BList = toList(enPosts20261123B);
