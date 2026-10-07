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
      Same filename, same icon, same version number — that proves nothing. When you download an APK from a third-party
      site, the real question is whether the file matches the official build, or whether someone repackaged it and slipped
      something in. The good news:{" "}
      <strong>every APK carries verifiable &ldquo;fingerprints,&rdquo; and three simple methods tell you if it&rsquo;s
      been tampered with.</strong>
    </p>
    <p>
      Bottom line:{" "}
      <strong>
        Hash values (SHA-256) prove the file didn&rsquo;t change. Signature checks prove it came from the official
        developer. Together, they lock down an APK&rsquo;s authenticity.
      </strong>
    </p>

    <blockquote>
      <p>
        <strong>Core idea:</strong>{" "}
        <strong>
          A hash alone isn&rsquo;t enough — a malicious site hands you a fake hash too. Compare against the official
          value, and rely on signature fingerprints for the strongest check.
        </strong>
      </p>
    </blockquote>

    <h2>What &ldquo;integrity&rdquo; actually means</h2>
    <p>People conflate two different things. Split them apart and it gets much clearer:</p>
    <ol>
      <li>
        <strong>File integrity</strong> — whether the file was corrupted or swapped in transit. → verify with a{" "}
        <strong>hash (SHA-256/MD5)</strong>.
      </li>
      <li>
        <strong>Source authenticity</strong> — whether the package was signed by the real developer and not repackaged.
        → verify with the <strong>digital signature (certificate fingerprint)</strong>.
      </li>
    </ol>
    <p>
      A hash alone can&rsquo;t protect you: if the source is malicious, the hash it publishes is fake too. That&rsquo;s
      why signature fingerprints — compared against the <em>known official</em> fingerprint — are more trustworthy.
    </p>

    <h2>Method 1: Hash verification (fastest, for official releases)</h2>
    <p>If the developer or a trusted site publishes a SHA-256, compute the local file&rsquo;s hash and compare.</p>
    <pre>
      <code>{`# Windows (PowerShell)
Get-FileHash .\\app.apk -Algorithm SHA256

# macOS / Linux
shasum -a 256 app.apk
sha256sum app.apk`}</code>
    </pre>
    <p>
      Compare the output against the official 64-character hex string, character by character. One character off means
      the file is corrupted or modified.
    </p>

    <h2>Method 2: Signature fingerprint (most reliable, defeats repackaging)</h2>
    <p>
      A hash proves the file didn&rsquo;t change, but what if you don&rsquo;t have an official hash? Use the{" "}
      <strong>signing certificate fingerprint</strong> — it derives from the developer&rsquo;s private key, so anyone
      who repackages the app must re-sign it and the fingerprint changes.
    </p>
    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>
    <p>
      You&rsquo;ll see a line like <code>Signer #1 certificate SHA-256 digest: 8a3f... (64 hex chars)</code>. Compare
      that against the official build of the same app (e.g., one extracted from Google Play). Match → same developer.
      Mismatch → it was almost certainly repackaged.
    </p>
    <p>
      <strong>No computer? Use an app.</strong> SAI (Split APKs Installer) or APK Info shows the signing
      certificate&rsquo;s SHA-256 fingerprint right on your phone.
    </p>

    <h2>Method 3: Cross-check with VirusTotal (against malware)</h2>
    <p>
      Integrity checks catch &ldquo;file changed,&rdquo; but not &ldquo;the official build itself is dirty&rdquo; (rare
      but real). Use multi-engine scanning as a cross-check:
    </p>
    <ol>
      <li>
        Open <strong>VirusTotal</strong> and upload the APK — or better, paste its <strong>SHA-256</strong> (faster and
        more private).
      </li>
      <li>Review 60+ engines: all green is ideal; multiple mainstream engines flagging it is a red flag.</li>
      <li>
        Combine with the signature check: fingerprint matches + no malware = safe to install.
      </li>
    </ol>

    <h2>Pick the right method</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Your goal</th>
            <th>Method</th>
            <th>Tool</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Confirm download isn&rsquo;t corrupted</td>
            <td>Hash compare</td>
            <td>sha256sum / PowerShell</td>
          </tr>
          <tr>
            <td>Confirm it&rsquo;s official, not repackaged</td>
            <td>Signature fingerprint</td>
            <td>apksigner / SAI</td>
          </tr>
          <tr>
            <td>Confirm there&rsquo;s no malware</td>
            <td>Multi-engine scan</td>
            <td>VirusTotal</td>
          </tr>
          <tr>
            <td>Full coverage</td>
            <td>All three</td>
            <td>Combined</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Why &ldquo;same version number&rdquo; can still differ</h2>
    <p>
      The same app at the same version can carry <strong>different signatures</strong> depending on the source: the
      official build uses the official key; if a third-party site modified anything (removed ads, changed language,
      injected a channel ID), it <em>must</em> re-sign — and the fingerprint changes instantly. That&rsquo;s why you can
      hit &ldquo;App not installed&rdquo; even with matching version numbers, and why{" "}
      <strong>signature checks beat version numbers every time.</strong>
    </p>

    <h2>60-second pre-install checklist</h2>
    <ol>
      <li>Grab the official SHA-256 from the download page (if available).</li>
      <li>Compute the local hash and compare, character by character.</li>
      <li>Check the signature SHA-256 with apksigner or SAI, compare to official.</li>
      <li>Paste the SHA-256 into VirusTotal.</li>
      <li>All pass → install; any mismatch → get it from another source.</li>
    </ol>
    <p>
      Do this and you can be accountable for every APK you install.{" "}
      <strong>Integrity and signatures are the two strongest defenses a regular user has.</strong>
    </p>
    <p>
      Want a shortcut? <Link href="/">gptoapk.com</Link> extracts original APKs straight from Google Play with
      verification info attached, saving you the hunt for official hashes.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I check if an APK file has been tampered with?",
    answer:
      "Use two complementary checks: (1) compare the file's SHA-256 hash against the developer's official value, and (2) verify the signing certificate's SHA-256 fingerprint with apksigner (PC) or SAI (phone) against the known official fingerprint. A hash catches corruption or replacement in transit; the signature fingerprint catches repackaging. Cross-check with VirusTotal for malware.",
  },
  {
    question: "Is verifying a SHA-256 hash enough to trust an APK?",
    answer:
      "No. A hash only proves the file didn't change since it was hashed — but if you downloaded from a malicious site, the hash it gives you is fake too. Always compare against the developer's officially published hash, and rely on the signature certificate fingerprint (derived from the developer's private key) for the strongest authenticity check.",
  },
  {
    question: "Why do two APKs with the same version number have different signatures?",
    answer:
      "Because any modification to an APK forces a re-sign with a different key. If a third-party site removes ads, changes language, or injects a channel ID, it must re-sign the file, which changes the certificate fingerprint. That's why the same app version from different sources can have different signatures — and why signature checks are more reliable than version numbers.",
  },
  {
    question: "What tools can I use to verify an APK on my phone without a PC?",
    answer:
      "Use SAI (Split APKs Installer) or APK Info: open the APK and look for the 'Signature' or 'Certificates' section, which shows the signing certificate's subject and SHA-256 fingerprint. Compare the fingerprint against the app's official reference. For malware cross-checking, paste the file's SHA-256 into VirusTotal.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      Ever had an app work perfectly on an older phone, then crash, drop notifications, get denied permissions, or show
      &ldquo;this app isn&rsquo;t supported on this device&rdquo; after moving to a newer one or updating to Android 15?
      Nine times out of ten, the culprit is{" "}
      <strong>targetSdkVersion</strong> — a single number buried in AndroidManifest.xml that decides which Android
      version&rsquo;s rules the app runs under.
    </p>
    <p>
      Bottom line:{" "}
      <strong>
        targetSdkVersion tells the system &ldquo;which version&rsquo;s contract this app was written against.&rdquo;
        Higher means access to newer behaviors — but when it falls below what Google Play or the OS requires, you hit
        install, listing, and behavior limits.
      </strong>
    </p>

    <blockquote>
      <p>
        <strong>Core idea:</strong>{" "}
        <strong>
          min decides &ldquo;can it install,&rdquo; target decides &ldquo;how it runs,&rdquo; compile decides
          &ldquo;which APIs you can write with.&rdquo;
        </strong>
      </p>
    </blockquote>

    <h2>Three SDK versions — don&rsquo;t mix them up</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Meaning</th>
            <th>Who cares</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>minSdkVersion</td>
            <td>Lowest Android version the app supports</td>
            <td>Whether a user&rsquo;s device is new enough</td>
          </tr>
          <tr>
            <td>targetSdkVersion</td>
            <td>The version the app is written for (runtime uses that version&rsquo;s behavior)</td>
            <td>The system, the store, behavior consistency</td>
          </tr>
          <tr>
            <td>compileSdkVersion</td>
            <td>Which Android SDK you compile against</td>
            <td>Developers, access to new APIs</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>What targetSdkVersion actually changes</h2>
    <p>It&rsquo;s the most overlooked yet most impactful, because it triggers system behavior changes:</p>
    <ul>
      <li>
        <strong>Android 6.0 (target 23)</strong> — runtime permissions begin. target ≥ 23 shows permission prompts;
        target &lt; 23 gets auto-granted.
      </li>
      <li>
        <strong>Android 10 (target 29)</strong> — background location restricted, Scoped Storage enforced.
      </li>
      <li>
        <strong>Android 13 (target 33)</strong> — the POST_NOTIFICATIONS permission becomes a runtime permission.
        Apps with target ≥ 33 that don&rsquo;t request it won&rsquo;t show notifications at all.
      </li>
      <li>
        <strong>Android 14 (target 34)</strong> — foreground service types must be declared, or the app crashes
        outright.
      </li>
    </ul>
    <p>
      The same code, with target 33 vs target 31, can behave completely differently on Android 14.
    </p>

    <h2>Why a low target causes install / update failures</h2>
    <ol>
      <li>
        <strong>Google Play listing rules</strong> — new apps and updates must meet a higher targetSdkVersion or
        they&rsquo;re rejected.
      </li>
      <li>
        <strong>Sideloading limits</strong> — since Android 14, installing an app with targetSdkVersion below 23 is
        blocked by the system (&ldquo;This app was built for an older version of Android&rdquo;).
      </li>
      <li>
        <strong>Downgrade installs</strong> — going from a high-target build to a low-target one can trigger signature
        or version conflicts.
      </li>
    </ol>
    <p>
      So &ldquo;it won&rsquo;t install&rdquo; isn&rsquo;t always a signature problem — sometimes the APK&rsquo;s
      targetSdkVersion is simply too low for the new OS.
    </p>

    <h2>How to check an APK&rsquo;s targetSdkVersion</h2>
    <pre>
      <code>{`# Option 1: aapt (Android SDK Build-Tools)
aapt dump badging app.apk | grep sdkVersion

# Output looks like:
# sdkVersion:'24'
# targetSdkVersion:'33'

# Option 2: apkanalyzer
apkanalyzer manifest target-sdk app.apk`}</code>
    </pre>
    <p>
      <strong>No computer?</strong> Use APK Info or SAI on your phone — select the APK and it shows min/target/compile
      SDK at a glance.
    </p>

    <h2>Quick FAQ</h2>
    <p>
      <strong>Higher target is always better, right?</strong> Not necessarily. A higher target means more new rules to
      follow; if the app hasn&rsquo;t adapted, you may get missing notifications or a killed background process. The
      ideal is &ldquo;target tracks the mainstream version <em>and</em> the app has adapted.&rdquo;
    </p>
    <p>
      <strong>Why does an app work on an old phone but act up on a new one?</strong> Likely a low target: newer systems
      apply stronger compatibility restrictions to low-target apps.
    </p>
    <p>
      <strong>My downloaded APK has a target so low the system blocks it. Now what?</strong> There&rsquo;s no clean fix.
      Find a newer build of that app, or resort to custom ROMs/tools that lift the restriction (not recommended). The
      safe path is waiting for the developer to update.
    </p>

    <h2>Advice by role</h2>
    <ul>
      <li>
        <strong>Regular users:</strong> before installing, check targetSdkVersion with APK Info; builds too low
        (especially &lt; 23) likely won&rsquo;t install on new phones; if notifications stop appearing, suspect a low
        target and the resulting permission behavior difference.
      </li>
      <li>
        <strong>Developers:</strong> after every major OS release, bump target and complete the adaptation; track
        Google Play&rsquo;s yearly target threshold increases; manage min / target / compile separately.
      </li>
    </ul>

    <h2>Action checklist</h2>
    <ol>
      <li>Look up the target APK&rsquo;s targetSdkVersion via aapt dump badging or APK Info.</li>
      <li>Compare against the device&rsquo;s Android version to judge behavior/install risk.</li>
      <li>When install fails, distinguish signature issues from target too low.</li>
      <li>Developers: make target upgrades a routine task with every OS update.</li>
    </ol>
    <p>
      Understand targetSdkVersion and you hold a key to Android compatibility problems.{" "}
      <strong>Many &ldquo;mystery crashes&rdquo; and install failures are solved the moment you look at this one
      number.</strong>
    </p>
    <p>
      Need to extract APKs from Google Play with full version metadata for analysis? Try <Link href="/">gptoapk.com</Link>{" "}
      — extracted packages come with SDK-related metadata attached.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "What is targetSdkVersion in Android?",
    answer:
      "targetSdkVersion tells the system which Android version's rules the app was written against — the app runs under that version's compatibility behavior. It's different from minSdkVersion (the lowest version the app can install on) and compileSdkVersion (which SDK you compile against). Higher target values unlock newer behaviors but also require the app to follow newer rules.",
  },
  {
    question: "Why won't an app install on my new phone but worked on my old one?",
    answer:
      "A common cause is targetSdkVersion being too low. Since Android 14, installing an app with targetSdkVersion below 23 is blocked by the system. Newer Android versions also apply stronger compatibility restrictions to low-target apps. Check the APK's targetSdkVersion with aapt dump badging or an app like APK Info, and look for a newer build with an upgraded target.",
  },
  {
    question: "What's the difference between minSdkVersion, targetSdkVersion, and compileSdkVersion?",
    answer:
      "minSdkVersion is the lowest Android version the app supports (decides if it can install). targetSdkVersion is the version the app is written for and whose compatibility behavior it runs under (decides how it runs). compileSdkVersion is the SDK used to compile the app (decides which APIs the developer can use). They're related but serve completely different purposes.",
  },
  {
    question: "Why do my notifications stop appearing after an Android update?",
    answer:
      "Since Android 13, the POST_NOTIFICATIONS permission became a runtime permission. Apps with targetSdkVersion 33 or higher must actively request it, or no notifications will show. If an app hasn't adapted, its notifications can silently fail. Check the app's target, grant the notification permission manually, or look for an updated version of the app.",
  },
];

export const enPosts20261007: BlogPostEntry[] = [
  {
    slug: "how-to-check-apk-file-integrity",
    title: "How to Check APK File Integrity: 3 Ways to Confirm a Download Wasn't Tampered With (2026)",
    description:
      "Same filename, same icon, same version number — that doesn't mean the APK is clean. Learn three practical ways to verify an APK's integrity and signature before you install it: hash comparison, signature fingerprints (apksigner/SAI), and VirusTotal.",
    date: "2026-10-07",
    readTime: "8 min read",
    tags: ["android", "apk", "security", "integrity", "sideloading"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-targetsdkversion-explained",
    title: "Android targetSdkVersion Explained: Why It Decides If an App Installs, Updates, and Behaves (2026)",
    description:
      "App worked fine on your old phone but crashes or won't install on Android 15? The answer is often targetSdkVersion. Learn what it means, how it differs from min/compile SDK, why a low target causes install failures, and how to check any APK.",
    date: "2026-10-07",
    readTime: "8 min read",
    tags: ["android", "apk", "targetsdkversion", "compatibility", "development"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261007List = toList(enPosts20261007);
