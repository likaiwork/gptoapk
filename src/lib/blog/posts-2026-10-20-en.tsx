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
      &ldquo;Only download APKs from trusted sources&rdquo; is the most repeated and least useful advice in the Android
      community. Everyone says it; nobody defines <em>trusted</em>, and the sites that look cleanest are often the ones
      paying for the top search result. This guide replaces the slogan with a framework: four risk tiers, what each can
      and cannot be trusted for, and a 60-second check you can run before every install.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> You cannot verify that an APK is free of malware by looking at it. You{" "}
        <em>can</em> verify that it is the same file the original developer published. Source selection plus signature
        matching covers almost everything else.
      </p>
    </blockquote>

    <h2>Tier 1 &mdash; The developer&rsquo;s own channel</h2>
    <p>
      Official website, GitHub Releases, F-Droid, or the Play Store itself. This is the only tier where the signature
      you see is authoritative by definition, because the developer produced it. Risk is near zero &mdash; provided you
      actually reached the real domain. Phishing clones of developer sites are common, so check the URL character by
      character and prefer a bookmark.
    </p>
    <p>
      One caveat: Play Store installs are split APKs. If your goal is a single redistributable file, extract it with a
      split-aware tool rather than pulling <code>base.apk</code> alone.
    </p>

    <h2>Tier 2 &mdash; Signature-verifying mirrors</h2>
    <p>
      APKMirror is the canonical example, and the distinguishing feature is not &ldquo;they scan for malware&rdquo;
      &mdash; it&rsquo;s that they reject uploads whose signing certificate doesn&rsquo;t match the developer&rsquo;s
      known certificate. That is a cryptographic property, not a moderation policy, which is exactly why this tier
      differs from Tier 3.
    </p>
    <p>Use Tier 2 for: a specific historical version, a version unavailable in your region, or a single-file APK when Play only offers splits.</p>
    <p>Not for: apps pulled everywhere, or modified builds. Those are Tier 3 by definition.</p>

    <h2>Tier 3 &mdash; Aggregators and download portals</h2>
    <p>
      Regional APK portals, large aggregator sites, anything with banner ads and a countdown timer. Some are legitimate
      businesses with real scanning, but the business model is ad revenue, and the incentive runs toward re-packaging
      files with modified SDKs.
    </p>
    <p>
      Treat every file here as unverified until you check its signature. If the certificate matches the
      developer&rsquo;s known certificate, it is cryptographically the same app &mdash; that check is what upgrades a
      Tier 3 download to Tier 1 trust.
    </p>

    <h2>Tier 4 &mdash; Messaging attachments, cracks, and &ldquo;mod&rdquo; builds</h2>
    <p>
      APKs received as file attachments in chat apps or SMS, Telegram channels distributing &ldquo;premium unlocked&rdquo;
      builds, anything behind a link shortener. Nearly all Android malware lives here, and delivery is social
      engineering rather than an exploit: a compromised friend account sending &ldquo;install this to see the
      photos,&rdquo; or a channel posting a modded build with a trojanized updater.
    </p>
    <p>
      Tier 4 is acceptable for exactly one thing: apps you compiled yourself and transferred from your own machine.
      Everything else is a gamble you should only take on a device you can afford to wipe.
    </p>

    <h2>The 60-second pre-install check</h2>
    <p><strong>1. Sanity-check size and extension.</strong></p>
    <ul>
      <li>A few KB for an app APK is a saved redirect page, not an application.</li>
      <li>A 300&nbsp;MB game appearing as 4&nbsp;MB is a stub installer that pulls the rest from an unknown server.</li>
      <li>Double extensions like <code>app.apk.zip</code> or <code>app.apk.exe</code> rely on your file manager hiding extensions.</li>
    </ul>
    <p><strong>2. Compare the signing certificate.</strong></p>
    <pre>
      <code>{`apksigner verify --print-certs downloaded.apk | grep -i "SHA-256"`}</code>
    </pre>
    <p>
      Compare against a trusted reference. The easiest one is the same app installed on a device &mdash; pull it with{" "}
      <code>adb pull $(adb shell pm path com.example.app)</code> and print its certificate. Matching SHA-256 digests mean
      the file is the developer&rsquo;s build. A mismatch on something that isn&rsquo;t an intentional fork means delete
      it. Google Play also displays the app signing certificate fingerprint on many listings, which works as a reference
      without a second device.
    </p>
    <p><strong>3. Read the permission list before granting anything.</strong></p>
    <p>The signal isn&rsquo;t &ldquo;many permissions&rdquo; &mdash; it&rsquo;s mismatch between function and permission:</p>
    <ul>
      <li>Flashlight &rarr; camera for the LED, nothing else.</li>
      <li>Calculator &rarr; nothing at all.</li>
      <li>Photo editor &rarr; photos and storage, not SMS.</li>
      <li>
        <strong>Any app</strong> &rarr; accessibility + display-over-other-apps + install packages together is a red
        flag regardless of what it claims to do.
      </li>
    </ul>
    <p>
      That last combination is the standard toolkit for overlay phishing and silent installation. No legitimate consumer
      app needs all three.
    </p>

    <h2>Handling split APKs</h2>
    <p>Most Play Store apps now ship as App Bundles &mdash; a base APK plus several <code>split_config.*.apk</code> files. Two consequences:</p>
    <ul>
      <li>
        <strong>You can&rsquo;t just grab base.apk.</strong> Without the ABI split (<code>arm64_v8a</code> or{" "}
        <code>armeabi_v7a</code>) it installs and crashes at launch; without density or language splits it installs but
        renders wrong or falls back to the wrong locale.
      </li>
      <li>
        <strong>Bundle before you distribute.</strong> Export as a single <code>.apks</code> archive rather than a
        folder of loose files, so split-aware installers treat it atomically and fail cleanly if a piece is missing.
      </li>
    </ul>
    <pre>
      <code>{`adb install-multiple base.apk split_config.arm64_v8a.apk \\
                     split_config.xxhdpi.apk split_config.en.apk`}</code>
    </pre>
    <p>
      Tier 2 mirrors usually offer both a bundle (<code>.apkm</code> / <code>.xapk</code>) and a merged single APK. For
      bundle-only apps, prefer the bundle &mdash; the merged single file some sites offer is a re-pack, which puts you
      back in signature-verification territory.
    </p>

    <h2>What &ldquo;safe&rdquo; realistically means</h2>
    <p>
      No checklist makes sideloading risk-free. What this framework buys you is a <em>detectable failure mode</em>:
      instead of &ldquo;I hope this is fine,&rdquo; you have a specific, checkable property that tells you whether the
      file is the developer&rsquo;s build.
    </p>
    <p>The order that matters most:</p>
    <ul>
      <li>Stay in Tier 1&ndash;2 when you can &mdash; the best security decision is not needing verification.</li>
      <li>When you drop to Tier 3, always verify the signature. It&rsquo;s one command.</li>
      <li>Treat Tier 4 as hostile unless you produced the file yourself.</li>
      <li>Never grant accessibility + overlay + install-packages to the same app.</li>
    </ul>
    <p>
      Sixty seconds of checking beats an hour of malware cleanup &mdash; and it costs a lot less data than
      re-downloading a bad bundle.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I know if an APK download site is trustworthy?",
    answer:
      "Look for whether the site verifies signing certificates against the developer's known key, not whether it claims to scan for malware. APKMirror and F-Droid do this; most aggregators do not. Whatever the site, verify the SHA-256 certificate yourself with apksigner verify --print-certs and compare it against the publisher's fingerprint.",
  },
  {
    question: "Is it safe to install APKs received on WeChat, WhatsApp, or Telegram?",
    answer:
      "Treat them as untrusted by default. Messaging apps are the primary delivery channel for Android malware because a compromised contact account provides instant social proof. Only install a chat-received APK if you produced it yourself or can verify its signature against the developer's certificate.",
  },
  {
    question: "What does apksigner verify --print-certs actually prove?",
    answer:
      "It proves which signing certificate the file was signed with. If the certificate matches the developer's published fingerprint, the file is the developer's build and has not been repackaged. It does not prove the developer's build is free of malicious code — that requires the developer to be honest.",
  },
  {
    question: "Why does an APK install fail with 'App not installed' on a legitimate file?",
    answer:
      "Usually one of three reasons: you pulled only base.apk from a split bundle and are missing the ABI or resource splits; an older copy of the same package with a different signing key is still installed; or the device's CPU architecture isn't in the APK's native-code list. Check the ABI list with aapt2 dump badging before assuming the file is corrupt.",
  },
  {
    question: "Should I use a single merged APK or the split bundle?",
    answer:
      "For bundle-only apps, use the split bundle with a split-aware installer (SAI on-device, adb install-multiple on desktop). A merged single APK offered by some sites is a re-pack — it may work, but its signing certificate is no longer the developer's, so you lose the cryptographic check that makes verification meaningful.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      Reading <code>minSdkVersion</code> tells you whether an APK can install. It does not tell you whether it will run,
      whether it&rsquo;s the right split, or why it crashes the moment you open it. This guide turns the four
      compatibility axes into a decision table: what each one predicts, the exact command or screen that reveals it, and
      what to do when it fails.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> Three declarations predict compatibility with near certainty &mdash;{" "}
        <code>minSdkVersion</code> (can it install), the <code>lib/&lt;abi&gt;/</code> folders (can it run), and the
        split set (is it complete). Check them in that order; they fail at different stages, so the first failure tells
        you where to stop.
      </p>
    </blockquote>

    <h2>The four axes and the symptom each produces</h2>
    <ul>
      <li><strong>minSdkVersion</strong> &rarr; fails <em>before</em> install: &ldquo;Your device isn&rsquo;t compatible&rdquo; or install blocked outright.</li>
      <li><strong>Supported ABIs</strong> &rarr; fails <em>at launch</em>: &ldquo;App not installed&rdquo; for ABI-filtered bundles, or an instant native crash.</li>
      <li><strong>Split completeness</strong> &rarr; installs but crashes on missing resources or libraries.</li>
      <li><strong>Density and features</strong> &rarr; installs and runs, but scales wrong or lacks hardware features.</li>
    </ul>
    <p>
      These are ordered. If install is blocked, ABI is irrelevant. If it installs and crashes, minSdk was fine and the
      problem is in the next two rows.
    </p>

    <h2>Axis 1 &mdash; minSdkVersion: read it before downloading</h2>
    <p>API level to Android version, the ones you&rsquo;ll actually meet:</p>
    <table>
      <thead>
        <tr>
          <th>API</th>
          <th>Android</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>23</td><td>6.0 Marshmallow</td></tr>
        <tr><td>26</td><td>8.0 Oreo</td></tr>
        <tr><td>29</td><td>10</td></tr>
        <tr><td>31</td><td>12</td></tr>
        <tr><td>33</td><td>13</td></tr>
        <tr><td>34</td><td>14</td></tr>
        <tr><td>35</td><td>15</td></tr>
        <tr><td>36</td><td>16</td></tr>
      </tbody>
    </table>
    <pre>
      <code>{`adb shell getprop ro.build.version.sdk        # your device, e.g. 34
aapt2 dump badging app.apk | grep sdkVersion  # the APK: sdkVersion:'24'`}</code>
    </pre>
    <p>
      If your device API is below the APK&rsquo;s <code>sdkVersion</code>, no amount of re-downloading helps &mdash; the
      installer rejects it by design. Find an older app version or a different app.
    </p>
    <p>
      <strong>targetSdkVersion matters differently.</strong> It doesn&rsquo;t gate installation but gates behavior. Very
      old targets lose compatibility shims for scoped storage, background execution, and notification permissions, so an
      app that installs fine and behaves bizarrely on Android 15 usually has a stale target, not a corrupt file.
    </p>

    <h2>Axis 2 &mdash; ABI: the real cause of &ldquo;App not installed&rdquo;</h2>
    <pre>
      <code>{`aapt2 dump badging app.apk | grep native-code
# native-code: 'arm64-v8a' 'armeabi-v7a'

adb shell getprop ro.product.cpu.abilist
# arm64-v8a,armeabi-v7a,armeabi`}</code>
    </pre>
    <p>Matching rules, easiest to hardest to get right:</p>
    <ul>
      <li>File has one ABI, device supports it &rarr; fine.</li>
      <li>File has several ABIs, device supports one &rarr; fine, the installer picks.</li>
      <li>No intersection between the lists &rarr; install fails or the app dies at <code>System.loadLibrary</code>.</li>
      <li>No <code>native-code</code> line at all &rarr; pure managed code, ABI is irrelevant. Common and not a problem.</li>
    </ul>
    <p>
      Nearly every modern phone is <code>arm64-v8a</code>. Failures cluster around old 32-bit-only devices, x86/x86_64
      emulators and Chromebooks, and 32-bit-only builds of a large app landing on a 64-bit-only device.
    </p>

    <h2>Axis 3 &mdash; Split completeness</h2>
    <p>If there&rsquo;s no <code>native-code</code> but the app clearly needs native libraries, or the base APK is suspiciously small, you&rsquo;re looking at a bundle.</p>
    <pre>
      <code>{`# A complete split set looks like:
# base.apk
# split_config.arm64_v8a.apk
# split_config.xxhdpi.apk
# split_config.en.apk`}</code>
    </pre>
    <p>
      A working install needs: <code>base.apk</code>, one ABI split (only if native code exists), one density split, and
      one language split. Install them atomically, not one at a time:
    </p>
    <pre>
      <code>{`adb install-multiple base.apk split_config.arm64_v8a.apk \\
                     split_config.xxhdpi.apk split_config.en.apk`}</code>
    </pre>
    <p>
      On-device, use a split-aware installer (SAI and similar) and hand it the whole folder or <code>.apks</code>{" "}
      archive. Installing <code>base.apk</code> alone is the number one cause of &ldquo;install succeeded, app crashes
      immediately.&rdquo;
    </p>

    <h2>Axis 4 &mdash; Density and features</h2>
    <pre>
      <code>{`aapt2 dump badging app.apk | grep -E "densities|uses-feature"
# densities:'nodpi'
# uses-feature:'android.hardware.camera',not-required`}</code>
    </pre>
    <ul>
      <li><code>densities:'nodpi'</code> means vector or resolution-independent assets &mdash; no density split needed.</li>
      <li>
        <code>uses-feature</code> <em>without</em> <code>not-required</code> is a hard requirement: a camera app on a
        camera-less device gets blocked in Play, or crashes at launch when sideloaded.
      </li>
      <li>With <code>not-required</code>, the app degrades gracefully. Don&rsquo;t confuse the two.</li>
    </ul>

    <h2>The decision table</h2>
    <p>Apply top to bottom; stop at the first failure.</p>
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Command</th>
          <th>Fail &rarr; action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Can it install on my API level?</td>
          <td><code>aapt2 dump badging</code></td>
          <td>Find an older version, or skip</td>
        </tr>
        <tr>
          <td>Does it run on my CPU?</td>
          <td><code>grep native-code</code> vs <code>abilist</code></td>
          <td>Get the right ABI split</td>
        </tr>
        <tr>
          <td>Is the file complete?</td>
          <td><code>unzip -l</code> / split set</td>
          <td>Re-download bundle, use <code>install-multiple</code></td>
        </tr>
        <tr>
          <td>Will features work?</td>
          <td><code>grep uses-feature</code></td>
          <td>Accept degraded behavior, or skip</td>
        </tr>
        <tr>
          <td>Does the signature match?</td>
          <td><code>apksigner verify --print-certs</code></td>
          <td>Delete it &mdash; you have a re-pack</td>
        </tr>
      </tbody>
    </table>
    <p>
      The last row is a security check rather than a compatibility one, but it belongs in the same pass: a re-packaged
      APK often carries injected compatibility bugs along with whatever else was modified.
    </p>

    <h2>Two shortcuts worth knowing</h2>
    <p>
      <strong>Emulators and Chromebooks:</strong> x86_64 devices can&rsquo;t run arm64-only APKs natively. Grab the
      x86_64 build, or enable ARM translation on images that support it. If neither exists, the app isn&rsquo;t
      compatible with that hardware.
    </p>
    <p>
      <strong>&ldquo;App not installed&rdquo; with no detail:</strong> before blaming compatibility, rule out the boring
      causes &mdash; a stale copy of the package signed with a different key (uninstall it first), insufficient storage
      for the expanded size, or the package already existing in a work profile or Secure Folder.
    </p>
    <p>
      Four checks, four commands, and you stop guessing. The whole pass takes under a minute &mdash; less time than
      re-downloading a broken bundle over mobile data.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "How do I check if an APK is compatible with my Android phone?",
    answer:
      "Compare three things: the APK's minSdkVersion (from aapt2 dump badging) against your device's API level (adb shell getprop ro.build.version.sdk); the APK's native-code ABI list against your device's abilist; and, for split apps, whether you have the full set of splits. The first mismatch in that order is your actual problem.",
  },
  {
    question: "Why does a compatible APK still say 'App not installed'?",
    answer:
      "Most often because it's a split bundle and you installed only base.apk, missing the ABI or resource splits. Other common causes are an existing copy of the package signed with a different key, insufficient free storage for the expanded size, or the same package already installed in a work profile.",
  },
  {
    question: "What is minSdkVersion versus targetSdkVersion?",
    answer:
      "minSdkVersion is the lowest Android API the app will install on — if your device is lower, installation is blocked. targetSdkVersion is the API the app was designed against; it doesn't block installation but determines which compatibility behaviors apply, so a stale target often causes odd behavior on newer Android versions.",
  },
  {
    question: "How do I find my phone's CPU architecture?",
    answer:
      "Run adb shell getprop ro.product.cpu.abilist. The first entry is the primary ABI, typically arm64-v8a on modern phones. Emulators and Chromebooks report x86 or x86_64, which cannot run arm64-only APKs without translation.",
  },
  {
    question: "How do I install a split APK correctly?",
    answer:
      "On a computer, use adb install-multiple with base.apk plus every split file in one command, so the set installs atomically. On the phone, use a split-aware installer such as SAI and give it the whole folder or a single .apks archive — never install base.apk on its own.",
  },
];

export const enPosts20261020: BlogPostEntry[] = [
  {
    slug: "safely-download-apk-files-android-risk-tier-framework",
    title: "How to Safely Download APK Files on Android: A Risk-Tier Framework for Choosing Sources",
    description:
      "Most 'safe APK download' advice stops at 'use trusted sites.' That's not actionable. A 4-tier source model, the three checks to run before tapping Install, and a 60-second verification routine you can actually repeat.",
    date: "2026-10-20",
    readTime: "8 min read",
    tags: ["android", "apk", "security", "sideloading"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-apk-compatibility-check-decision-table",
    title: "Android APK Compatibility Check: A Pre-Download Decision Table (API Level, ABI, Density, Split)",
    description:
      "Reading minSdkVersion tells you whether an APK can install — not whether it will run. Turn the four compatibility axes into a decision table with the exact command for each, on-device or from a terminal.",
    date: "2026-10-20",
    readTime: "9 min read",
    tags: ["android", "apk", "compatibility", "adb"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261020List = toList(enPosts20261020);
