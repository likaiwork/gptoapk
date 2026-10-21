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
      &ldquo;Only download APKs from trusted sites&rdquo; is not actionable. Users cannot audit a site&rsquo;s
      trustworthiness, and the sites that look most trustworthy are usually paying for that look. The useful version of
      the advice is a set of <em>signals you can check in two minutes</em> &mdash; signals that correlate with whether
      the file you are about to install is the developer&rsquo;s build or someone else&rsquo;s.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> A mirror has exactly one legitimate job &mdash; serve the bytes the developer signed.
        Every red flag below is a place where that job gets compromised. You are not judging reputation; you are judging
        whether the site has any incentive to alter files.
      </p>
    </blockquote>

    <h2>Red flag 1 &mdash; The download button is an ad</h2>
    <p>
      Before anything else: is the big green &ldquo;DOWNLOAD&rdquo; button an actual link to a file, or is it an ad
      slot? Legitimate mirrors put the real download behind a short delay page, label the button with the filename and
      version, and link directly to a <code>.apk</code> URL you can inspect. Red flags: multiple download buttons on
      one page, a button that opens an <code>.exe</code> or a store-style landing page, or a redirect chain through
      three or more domains.
    </p>
    <p>
      This single check catches most bundle-droppers, because the revenue model determines behavior. A site monetizing
      through ads wrapped around the download button cannot afford to hand you the real link first.
    </p>

    <h2>Red flag 2 &mdash; No published certificate fingerprint</h2>
    <p>
      Good mirrors publish, for each file: the SHA-256, the signing certificate fingerprint, the upload date, and the
      version code. If a site lists only a version number and a size, you have no way to verify anything &mdash; which
      means it is asking you to trust it blindly. That is a business model, not a data source.
    </p>

    <h2>Red flag 3 &mdash; The file is &ldquo;pre-patched&rdquo; or &ldquo;modded&rdquo;</h2>
    <p>
      Any of <code>Mod</code>, <code>Premium Unlocked</code>, <code>No Ads</code>, <code>Cracked</code>,{" "}
      <code>Patched</code>, <code>Unlimited</code>, or <code>VIP</code> in the title, description, or filename means
      the file has been modified. Modified APKs cannot carry the original signature &mdash; if they did, the app would
      reject the update as a signature mismatch. So a &ldquo;modded APK that installs over the original&rdquo; is
      either a lie or requires that you already uninstalled the original. Either way, the app now runs code the
      developer never shipped.
    </p>
    <p>If you need a feature behind a paywall, that is a purchase decision, not a download decision.</p>

    <h2>Red flag 4 &mdash; The permissions do not match the app</h2>
    <p>Pull the permission list before installing:</p>
    <pre>
      <code>aapt2 dump permissions downloaded.apk | grep uses-permission</code>
    </pre>
    <p>
      A social or chat app should ask for internet, camera, microphone, media read, and notifications. A photo editor
      should not ask for contacts. A flashlight should never ask for device admin or accessibility. Pay special
      attention to <code>REQUEST_INSTALL_PACKAGES</code> &mdash; it lets the app install <em>other</em> apps. Legitimate
      for stores and file managers, a red flag almost everywhere else.
    </p>

    <h2>Red flag 5 &mdash; The version is newer than the developer&rsquo;s</h2>
    <p>
      This is the tell that requires the most work and catches the most sophisticated repacks: compare against the
      developer&rsquo;s own release channel. GitHub releases, the official changelog, the Play listing. If a mirror
      offers 12.4.1 and the developer&rsquo;s newest is 12.4.0, ask why. Either the mirror has an internal build, or
      someone re-versioned a modified APK to look like a fresh update &mdash; which conveniently triggers the
      &ldquo;update available&rdquo; prompt inside the original app.
    </p>

    <h2>Red flag 6 &mdash; Split APKs repackaged as one file</h2>
    <p>
      Modern apps ship as a base plus config splits. Repackaging those into a single APK is technically possible but
      requires re-signing, which changes the certificate. If a site offers a &ldquo;single APK&rdquo; for a bundle-only
      app and claims the original signature still applies, be suspicious.
    </p>
    <p>Use split-aware tooling instead:</p>
    <pre>
      <code>adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk</code>
    </pre>

    <h2>Red flag 7 &mdash; No HTTPS on the actual file transfer</h2>
    <p>
      Check the domain serving the file, not just the page. A page loaded over HTTPS can still redirect to{" "}
      <code>http://</code> for the binary, and on a hostile network that is enough to swap it. Every hop in the redirect
      chain should be HTTPS.
    </p>
    <pre>
      <code>curl -sIL &quot;https://example.com/download/app.apk&quot; | grep -iE &quot;^(location|HTTP/)&quot;</code>
    </pre>

    <h2>After download: the two commands that matter</h2>
    <p>Regardless of how clean the site looked:</p>
    <pre>
      <code>{`# Integrity — compare against the site's published value
shasum -a 256 app.apk

# Authenticity — compare the signer to the developer's known certificate
apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>
      The signature check is the decisive one. A hash proves the download was not corrupted; the certificate proves who
      built the file. One caveat: Play-distributed apps are re-signed by Google, so a Play-installed copy carries
      Google&rsquo;s certificate, not the developer&rsquo;s upload key. Compare like with like.
    </p>

    <h2>A practical decision table</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>What you find</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No hash, no fingerprint, ad-wrapped button</td>
            <td>Skip the site entirely</td>
          </tr>
          <tr>
            <td>Hash matches, certificate matches a reference copy</td>
            <td>Install</td>
          </tr>
          <tr>
            <td>Hash matches, no certificate reference available</td>
            <td>Install, then watch permissions on first launch</td>
          </tr>
          <tr>
            <td>Certificate mismatch, no explanation</td>
            <td>Do not install &mdash; it is a repack</td>
          </tr>
          <tr>
            <td>&ldquo;Mod / Premium / No Ads&rdquo; in the name</td>
            <td>Do not install &mdash; treat as untrusted software</td>
          </tr>
          <tr>
            <td>Version newer than the developer&rsquo;s release</td>
            <td>Do not install &mdash; verify the source first</td>
          </tr>
          <tr>
            <td>Permissions wildly out of scope</td>
            <td>Do not install, even if the signatures match</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>The one-minute version</h2>
    <p>
      If you only do three things: check that the download button is a real link, get a SHA-256 to compare, and verify
      the signing certificate. Everything else is a refinement. Sites that fail the first check rarely pass the second
      and third, which is why the ad-button check is a decent filter on its own.
    </p>
    <p>
      If you need a clean copy of an installed app to use as a signature reference, see our{" "}
      <Link href="/blog/how-to-extract-apk-from-google-play">guide to extracting APKs from Google Play</Link>, and for
      the full pre-install audit see the{" "}
      <Link href="/blog/apk-safety-check-before-install-5-steps">5-step APK safety check</Link>.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I know if an APK download site is safe?",
    answer:
      "You cannot audit a site's intentions, so check verifiable signals instead: does it publish a SHA-256 and signing certificate fingerprint for every file, is the download button a real file link rather than an ad, and does it offer modified builds? A site that publishes a verifiable hash and certificate is far more useful than one with a nice reputation and no data.",
  },
  {
    question: "Is APKMirror safe for downloading APKs?",
    answer:
      "APKMirror is safer than most aggregators because it rejects uploads whose signing certificate does not match the developer's known certificate. That is a cryptographic check rather than a moderation policy. Still verify the hash after downloading, and never use it for modified or patched builds.",
  },
  {
    question: "What does it mean if an APK has a different signature than the original?",
    answer:
      "It means the file was re-signed after modification, so it is not the developer's build. It will also fail to install over the original with INSTALL_FAILED_UPDATE_INCOMPATIBLE. Treat signature mismatches as a hard stop unless you have a specific reason to trust the modifier.",
  },
  {
    question: "Can malware be inside a legitimately signed APK?",
    answer:
      "Yes, if the developer ships it — signature verification proves provenance, not intent. That is why permission review matters alongside signature checks. Signature verification protects against repacks and impersonation, which is the majority of real-world Android malware delivery.",
  },
  {
    question: "How do I compare my phone's CPU architecture with the APK?",
    answer:
      "Run adb shell getprop ro.product.cpu.abilist to see supported ABIs, then compare with the native-code line in aapt2 dump badging app.apk. At least one ABI must appear in both lists, otherwise installation fails with INSTALL_FAILED_NO_MATCHING_ABIS.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      &ldquo;App not compatible&rdquo; and &ldquo;opens then immediately closes&rdquo; feel like the same problem. They
      are not. The first is a <em>manifest filter</em> &mdash; Android refuses the install because a declared
      requirement does not match your device. The second is a <em>runtime failure</em> &mdash; the install succeeded, so
      the manifest matched, and something broke after launch. Different tools, different fixes.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> Read the APK&rsquo;s declared requirements with <code>aapt2</code> before installing.
        If they match your device and it still breaks, the problem moved to runtime &mdash; and then{" "}
        <code>adb logcat</code> is the only useful tool.
      </p>
    </blockquote>

    <h2>Part 1 &mdash; Reading the APK&rsquo;s requirements</h2>
    <p>One command gives you almost everything:</p>
    <pre>
      <code>aapt2 dump badging app.apk | head -40</code>
    </pre>
    <p>The lines that matter:</p>
    <pre>
      <code>{`package: name='com.example.app' versionCode='4210' versionName='4.2.1'
sdkVersion:'26'
targetSdkVersion:'34'
native-code: 'arm64-v8a' 'armeabi-v7a'`}</code>
    </pre>
    <p>
      <code>sdkVersion</code> is minSdk: the minimum API level. A mismatch blocks installation outright with{" "}
      <code>INSTALL_FAILED_OLDER_SDK</code>. <code>targetSdkVersion</code> does not block installation but determines
      which compatibility behaviors apply at runtime. <code>native-code</code> lists the CPU architectures with native
      libraries; a mismatch either blocks installation or causes an instant crash.
    </p>
    <p>
      Mapping API level to Android version: 23 is 6.0, 26 is 8.0, 28 is 9, 29 is 10, 30 is 11, 31 is 12, 33 is 13, 34
      is 14. So <code>sdkVersion:&apos;26&apos;</code> means Android 8.0 or newer &mdash; on Android 7 no amount of
      &ldquo;allow unknown sources&rdquo; will help.
    </p>

    <h2>Part 2 &mdash; Checking your device</h2>
    <pre>
      <code>{`adb shell getprop ro.build.version.sdk        # API level, e.g. 34
adb shell getprop ro.product.cpu.abi          # primary ABI
adb shell getprop ro.product.cpu.abilist      # all supported ABIs
adb shell wm density                          # dpi`}</code>
    </pre>
    <p>
      The critical comparison is <code>abilist</code> against the APK&rsquo;s <code>native-code</code>. A device
      reporting only <code>arm64-v8a</code> &mdash; increasingly common on newer flagships &mdash; cannot install
      32-bit-only <code>armeabi-v7a</code> APKs.
    </p>

    <h2>Part 3 &mdash; The install failures and what they actually mean</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>ADB error</th>
            <th>Root cause</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>INSTALL_FAILED_OLDER_SDK</code>
            </td>
            <td>APK minSdk is higher than the device API</td>
            <td>Find an older APK version with a lower minSdk</td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_FAILED_NO_MATCHING_ABIS</code>
            </td>
            <td>No compatible native library</td>
            <td>Get a matching ABI build or a universal APK</td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code>
            </td>
            <td>Signature differs from the installed version</td>
            <td>Uninstall the existing app first</td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_FAILED_VERSION_DOWNGRADE</code>
            </td>
            <td>versionCode lower than installed</td>
            <td>
              Use <code>adb install -d app.apk</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code>
            </td>
            <td>Not enough free space (needs roughly 2.5x the APK size)</td>
            <td>Free space</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <code>UPDATE_INCOMPATIBLE</code> is also the signature-mismatch error. If you are installing what you believe is
      the official app over a previously sideloaded modified build, this is where it surfaces. The error is a security
      feature doing its job &mdash; do not try to defeat it; uninstall and reinstall clean.
    </p>

    <h2>Part 4 &mdash; Installed fine, crashes on launch</h2>
    <p>Now the failure is at runtime. Three causes cover most cases.</p>

    <h3>Cause 1: a missing native library for the ABI</h3>
    <p>
      Logcat shows <code>UnsatisfiedLinkError</code> or{" "}
      <code>dlopen failed: library &quot;libfoo.so&quot; not found</code>. The APK declared a native-code list and the
      device matched, but a specific library is not in the split you installed. This is common with bundles where only{" "}
      <code>base.apk</code> was installed.
    </p>
    <pre>
      <code>adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk</code>
    </pre>

    <h3>Cause 2: a missing dependency</h3>
    <p>
      Logcat shows <code>ClassNotFoundException</code> for a Google Play Services class, or the app shows a blank white
      screen. Many apps assume GMS exists; on devices without it they install and then crash &mdash; often on the login
      or map screen rather than at launch, which makes it look random.
    </p>
    <pre>
      <code>adb logcat -d | grep -iE &quot;ClassNotFound|NoClassDefFound|UnsatisfiedLink|FATAL&quot;</code>
    </pre>

    <h3>Cause 3: targetSdk behavior changes</h3>
    <p>
      An app built against an old targetSdk runs on a new Android version with legacy compatibility behaviors applied,
      and some of those are silently broken. The classic case: apps with <code>targetSdk &lt; 23</code> cannot request
      runtime permissions properly on Android 6+, so they install, launch, and fail to access storage.
    </p>
    <p>Usually there is no fix on your side. Downgrade to a version whose targetSdk is closer to your OS, or wait for an update.</p>

    <h2>Part 5 &mdash; The pre-download checklist</h2>
    <p>
      Before downloading a version, write down four numbers: minSdk, targetSdk, the ABI list, and the version code.
      Compare against: your device API level (must be at least minSdk), your <code>abilist</code> (must overlap), your
      density (needs a matching split or <code>nodpi</code>), and your installed versionCode (remember{" "}
      <code>-d</code> when downgrading).
    </p>
    <p>
      If all four check out and it still fails, the problem is not compatibility &mdash; it is integrity. Verify the
      signature.
    </p>

    <h2>Part 6 &mdash; Diagnostics when nothing makes sense</h2>
    <pre>
      <code>{`adb install --verbose app.apk
adb shell dumpsys package com.example.app | grep -E "versionName|versionCode|primaryCpuAbi"
adb logcat -c && adb shell am start -n com.example.app/.MainActivity && adb logcat | grep -E "FATAL|AndroidRuntime"`}</code>
    </pre>
    <p>
      <code>primaryCpuAbi</code> is particularly useful: it tells you which ABI the installed app is actually using. If
      you expected <code>arm64-v8a</code> and see <code>armeabi-v7a</code>, the app is running in 32-bit mode &mdash;
      which explains both slowness and some native crashes.
    </p>

    <h2>The short version</h2>
    <p>
      Compatibility is a read-the-manifest problem, not a trial-and-error problem. Once you can decode{" "}
      <code>aapt2 dump badging</code> output, &ldquo;app not compatible&rdquo; becomes a specific diagnosis with a
      specific fix instead of a dead end.
    </p>
    <p>
      For the source-side checklist, see{" "}
      <Link href="/blog/safely-download-apk-mirror-red-flag-checklist">the mirror-site red flag checklist</Link>.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why does my phone say an app is not compatible when it installs on other phones?",
    answer:
      "Usually minSdkVersion is higher than your Android version, or the APK has no native library for your CPU architecture. Check with aapt2 dump badging app.apk: compare the sdkVersion line against your device API level and the native-code line against ro.product.cpu.abilist.",
  },
  {
    question: "An APK installed successfully but crashes immediately. What do I check first?",
    answer:
      "Run adb logcat and look for UnsatisfiedLinkError or ClassNotFoundException. The first means a native library split was not installed; the second usually means a missing Google Play Services dependency. Fix the split install first since it is the most common cause.",
  },
  {
    question: "What is the difference between minSdk and targetSdk for compatibility?",
    answer:
      "minSdk blocks installation on older Android versions outright. targetSdk does not block anything — it decides which legacy compatibility behaviors the OS applies. A very old targetSdk can install fine and then misbehave, which is why some old APKs seem broken on new phones.",
  },
  {
    question: "How do I install an APK on a device that only supports arm64-v8a?",
    answer:
      "Download the arm64-v8a build, or a universal APK if none exists. A device whose abilist contains only arm64-v8a cannot run armeabi-v7a-native apps, and many newer flagship phones no longer include 32-bit support.",
  },
  {
    question: "Does INSTALL_FAILED_UPDATE_INCOMPATIBLE always mean the app is fake?",
    answer:
      "No. It means the signing certificate differs from the installed copy. That happens with modified builds, but also legitimately when switching between a Play-signed version and a developer-signed APK, since Play re-signs apps. Either way the only fix is uninstalling the existing copy first.",
  },
];

export const enPosts20261021: BlogPostEntry[] = [
  {
    slug: "safely-download-apk-mirror-red-flag-checklist",
    title: "How to Safely Download APK Files on Android: A Mirror-Site Red Flag Checklist",
    description:
      "Forget 'trusted vs untrusted' sites. Seven concrete signals that separate a legitimate APK mirror from a bundle-dropper — checkable in under two minutes, before you tap install.",
    date: "2026-10-21",
    readTime: "8 min read",
    tags: ["android", "apk", "security", "sideloading"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-compatibility-diagnose-not-compatible-and-crash",
    title: "Android APK Compatibility Check: Diagnosing 'App Not Compatible' and Crash-on-Launch",
    description:
      "Two different failures, two different causes. How to read minSdk, targetSdk, ABI, and density requirements from an APK before installing — and how to fix the most common install and launch errors.",
    date: "2026-10-21",
    readTime: "9 min read",
    tags: ["android", "apk", "adb", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261021List = toList(enPosts20261021);
