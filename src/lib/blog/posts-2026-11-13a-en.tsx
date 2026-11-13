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
      <p>&quot;Check the source&quot; is the standard advice, and it is the least useful part of it. A repackaged APK with injected ad code usually comes from a site that passes a casual source check: clean layout, correct app name, no obvious scam signals. The download completes. The install succeeds. The app runs.</p>
      <p>The problem is that safety is not a single decision, it is <strong>five independent checks</strong>, and a bad package only has to beat the one you are not doing.</p>
      <p>Here they are, in the order they occur, with what each one actually protects against.</p>
      <h2>The chain</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"source → integrity → signature → install-time checks → first launch"}</code></pre>
      <p>Be clear about what each gate covers, because they do not overlap:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Gate</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Protects against</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Fails how</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Source</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Deliberately malicious sites, paywall-ad funnels</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">You never get a real APK</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Integrity</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Corruption, truncation, MITM substitution</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">&quot;There was a problem parsing the package&quot;</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Signature</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Repackaging, ad injection, false apps</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Signature mismatch, or no mismatch and you never notice</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Install-time</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Incompatible builds, policy blocks</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">&quot;App not installed&quot;</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">First launch</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Runtime problems the file cannot reveal</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Crash, missing components, odd permission requests</td></tr></tbody>
      </table></div>
      <p>Signature is the only gate that catches a <strong>skillfully</strong> repackaged APK. Everything upstream is bypassable by a competent attacker.</p>
      <h2>Gate 1: Source</h2>
      <p>Three channels are authoritative: Google Play, the developer's own site, and the app's GitHub Releases. Everything else is a mirror, and mirrors vary enormously in quality.</p>
      <p>Judging a mirror in ten seconds:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>It names the package and version.</strong> &quot;com.example.app v4.2.1&quot; is a good sign. &quot;Latest version 2026&quot; is not.</li>
        <li><strong>The real download button is not the most prominent one.</strong> Sites with four &quot;DOWNLOAD&quot; buttons and one that works are affiliate funnels. The working button is usually smaller and lower on the page.</li>
        <li><strong>No downloader required.</strong> Any site that asks you to install a &quot;download assistant&quot; first is serving you something other than the APK.</li>
      </ul>
      <p>None of this is proof. Gate 1 only filters out the lazy attacks.</p>
      <h2>Gate 2: Integrity</h2>
      <h3>Check the file size first</h3>
      <p>A 100 MB app that arrives as 12 MB failed. Network handoff from Wi-Fi to cellular mid-download produces a truncated file silently, and the browser reports success. This is the single most common cause of &quot;parse error&quot;.</p>
      <h3>Verify the hash when one is published</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# macOS\nshasum -a 256 app.apk\n\n# Linux\nsha256sum app.apk\n\n# Windows PowerShell\nGet-FileHash app.apk -Algorithm SHA256"}</code></pre>
      <p>Compare character by character. A mismatch means either corruption in transit or deliberate substitution. Either way, do not install it.</p>
      <h3>&quot;There was a problem parsing the package&quot;</h3>
      <p>This message has essentially one meaning: the file is not a valid APK. Causes, in order of frequency:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Truncated download</li>
        <li>You downloaded an HTML page, not the binary (check the extension)</li>
        <li>A split/multi-part package where you only got one part (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk.1</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk.2</code>)</li>
        <li>The server returned an error page with a 200 status</li>
      </ol>
      <p>The fix is deletion and re-download. There is no repair path.</p>
      <h2>Gate 3: Signature</h2>
      <p>This is the gate that matters most and the one almost nobody performs.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"keytool -printcert -jarfile app.apk | grep -A2 SHA256"}</code></pre>
      <p>Compare against the fingerprint the developer publishes. A mismatch means one of three things:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>The developer rotated keys (rare; usually only when migrating to Play App Signing)</li>
        <li>The APK was repackaged</li>
        <li>It is a different app under a borrowed name</li>
      </ol>
      <p>Case 2 is the common one and the dangerous one. Repackaging is how ad SDKs, credential stealers, and subscription-fraud code get into apps that otherwise behave normally. <strong>The app still works.</strong> That is the entire point of the technique.</p>
      <p>Note the structural constraint this creates: two APKs with the same package name but different signatures <strong>cannot</strong> coexist. Android uses the signature as app identity. So if you are downgrading or switching builds and the install fails with a signature conflict, you are looking at a build that was re-signed by someone who is not the original developer. That is your answer, before any other diagnosis.</p>
      <h2>Gate 4: Install-time checks</h2>
      <h3>Install-source permission (per app since Android 8)</h3>
      <p>Whichever app opened the APK is the one that needs the permission. If you tapped the file in WeChat, you grant WeChat. Not the file manager. This is the single highest-frequency misdiagnosis in the entire flow — people search settings for a switch that governs a different app.</p>
      <p>Path: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Settings → Apps → Special app access → Install unknown apps</code></p>
      <p>Since Android 14, newly installed apps do not receive this permission by default, and the first install triggers an extra &quot;not allowed to install&quot; prompt that must be acknowledged.</p>
      <h3>Play Protect</h3>
      <p>&quot;This app was not scanned&quot; or &quot;may be harmful&quot; is Play Protect refusing based on detection history and permission profile, not signature. For an official build from a developer site, proceeding is reasonable. For anything of uncertain provenance, it is not.</p>
      <h3>Compatibility</h3>
      <p>Three independent conditions:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">minSdkVersion</code> ≤ your Android version</li>
        <li>ABI match (arm64-v8a is the current default)</li>
        <li>Screen density (rarely blocks install, affects rendering)</li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt2 dump badging app.apk | grep -E \"sdkVersion|native-code\""}</code></pre>
      <h3>&quot;App not installed&quot; with no detail</h3>
      <p>The on-device installer gives you nothing. adb gives you the actual error code:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install app.apk"}</code></pre>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Error</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Meaning</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_UPDATE_INCOMPATIBLE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Signature conflict with the installed version</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_VERSION_DOWNGRADE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Lower versionCode than installed</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INSUFFICIENT_STORAGE</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Needs roughly 2.5× the APK size free</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App requires a newer Android than yours</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_NO_MATCHING_ABIS</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Wrong CPU architecture</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_PARSE_FAILED_NO_CERTIFICATES</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Unsigned package</td></tr></tbody>
      </table></div>
      <p>One adb attempt replaces a dozen taps on the phone.</p>
      <h2>Gate 5: First launch</h2>
      <p>Installation success says nothing about whether the app will run.</p>
      <p>Common failure modes:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Data directory permissions</strong> — most common with sideloaded builds; clear data and retry</li>
        <li><strong>Missing Google services</strong> — foreign apps on ROMs without GMS crash or hang at sign-in</li>
        <li><strong>Low targetSdk</strong> — Android 14+ restricts apps targeting below API 23</li>
        <li><strong>Scoped storage incompatibility</strong> — apps still using legacy file access</li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb logcat -c && adb logcat | grep -E \"FATAL|AndroidRuntime\""}</code></pre>
      <p>Read the exception type, not the message:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">ClassNotFoundException</code> → missing dependency, often a split APK installed incompletely</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SecurityException</code> → permission or SELinux denial</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">UnsatisfiedLinkError</code> → ABI mismatch</li>
      </ul>
      <h3>The permission moment is the real check</h3>
      <p>An app that asks for contacts and call logs when it is a flashlight is telling you what it is. Ad-funded repackages routinely add permission requests that the original never had. Compare what it asks for against what the feature set justifies — this catches repackaging that passed the signature check because you skipped it.</p>
      <p>Since Android 13, notifications are a runtime permission. A sideloaded app that never requests it and then &quot;does not notify&quot; is behaving exactly as designed.</p>
      <h2>Checklist</h2>
      <p>Before downloading:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Source names the <strong>package + version</strong></li>
        <li>No downloader/assistant required</li>
        <li>Hash published, if available</li>
      </ul>
      <p>After downloading:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>File size matches the stated size</li>
        <li>SHA-256 verified</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">keytool -printcert -jarfile</code> fingerprint matches the developer's</li>
      </ul>
      <p>Before installing:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The app that opened the file has install permission</li>
        <li>Free space ≥ 2.5× APK size</li>
        <li>Android version ≥ minSdkVersion</li>
      </ul>
      <p>After installing:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Version in system settings matches what you intended to install</li>
        <li>Permission requests map to actual features</li>
        <li>Notification permission granted if it matters</li>
        <li>Battery optimization disabled for background-type apps</li>
      </ul>
      <h2>The short version</h2>
      <p>Two checks carry most of the weight: <strong>verify the signature</strong>, and <strong>read the permission list at first launch</strong>. The rest are diagnostics for when something goes wrong.</p>
      <p>A site that publishes package names, version numbers, and checksums — <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk.com</a> among them — removes the guesswork from gates 1 and 2, which is where most of the wasted effort happens. Gates 3 through 5 are on you regardless.</p>
  </>
);

export const enPosts20261113A = [
  {
    slug: "safely-download-apk-files-five-gates",
    title: "macOS",
    description: "Most APK safety guides tell you to 'check the source'. That's one gate out of five. A repackaged APK passes a source check every day — the site looks fine, the download works, the app installs. Here's the full chain: source reputation, package integrity, signature match, install-time system checks, and post-install verification, with the exact command for each.",
    date: "2026-11-13",
    readTime: "6 min read",
    tags: ["android","apk","security","howto"],
    content: ARTICLE,
  },
];

export const enPosts20261113AList = toList(enPosts20261113A);
