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
      &quot;Only download from trusted sources&quot; is not a security practice. It is a hope.
    </p>
    <p>
      Trusted sources get compromised. Mirrors get hijacked. A site that was fine last year is a parked domain today. And the
      single most dangerous case — an APK that installs cleanly, asks for plausible permissions, and then quietly proxies your
      traffic — passes every &quot;does it look legit&quot; test.
    </p>
    <p>
      What actually works is <strong>verification you can perform yourself</strong>, in order, before and after install. Four
      gates. Five minutes. Here is the workflow.
    </p>

    <h2>Gate 1: Confirm the file is what the site said it was</h2>
    <p>Before you install anything, get the file&apos;s hash and check it against a second source.</p>
    <pre>
      <code>{`# On the file you downloaded
shasum -a 256 app.apk

# Or on-device, if you have a terminal app
sha256sum /sdcard/Download/app.apk`}</code>
    </pre>
    <p>
      Now the important part: <strong>cross-reference the hash against a source that is not the page you downloaded from.</strong>{" "}
      Options in order of reliability:
    </p>
    <ol>
      <li>The developer&apos;s official site or GitHub release page (different domain from the APK host is fine)</li>
      <li>A third-party aggregator that lists version + hash (APKMirror lists SHA-256 per release)</li>
      <li>VirusTotal&apos;s file search by hash</li>
    </ol>
    <p>
      If no hash is published anywhere, that itself is a signal. Reputable distributers publish hashes because they expect them
      to be checked.
    </p>
    <p>
      <strong>What the hash does and does not prove:</strong> it proves the file you have matches the file someone published. It
      does not prove that file is safe. Gate 2 is where safety starts.
    </p>

    <h2>Gate 2: Verify the signing certificate, not just &quot;signed&quot;</h2>
    <p>
      An APK can be signed by anyone. The question is <em>who</em> signed it.
    </p>
    <pre>
      <code>{`# apksigner ships with Android SDK build-tools
apksigner verify --print-certs app.apk`}</code>
    </pre>
    <p>You will get output like:</p>
    <pre>
      <code>{`Signer #1 certificate DN: CN=WhatsApp Inc., OU=Android, O=WhatsApp Inc., L=Mountain View, ST=CA, C=US
Signer #1 certificate SHA-256 digest: 5f2b8c4d...`}</code>
    </pre>
    <p>Two things to check:</p>
    <ul>
      <li>
        <strong>DN matches the real developer.</strong> A &quot;WhatsApp&quot; APK signed by <code>CN=Android Debug</code> is a
        repack.
      </li>
      <li>
        <strong>SHA-256 digest matches the version you already have installed.</strong> If it does not, the new APK cannot
        update the old one anyway — you would have to uninstall, losing data. Better to know now.
      </li>
    </ul>
    <p>Convenient shortcut: if the app is already installed, compare directly.</p>
    <pre>
      <code>{`adb shell pm path com.example.app
# /data/app/~~xyz==/com.example.app-1/base.apk
adb pull /data/app/~~xyz==/com.example.app-1/base.apk installed.apk
apksigner verify --print-certs installed.apk | grep SHA-256
apksigner verify --print-certs app.apk | grep SHA-256`}</code>
    </pre>
    <p>
      Matching digests mean the new APK is a genuine update from the same author. A mismatch on a &quot;same app&quot; download is
      the single strongest malware signal you can get.
    </p>

    <h2>Gate 3: Read the permission delta</h2>
    <p>
      Do not read the full permission list. Read the <em>difference</em> between what the app claims it needs and what the
      category of app plausibly needs.
    </p>
    <pre>
      <code>{`# Get the permission list without installing
aapt2 dump permissions app.apk

# Or with aapt
aapt dump permissions app.apk`}</code>
    </pre>
    <p>
      Then apply this test honestly: <strong>for each dangerous permission, name the feature that requires it.</strong> If you
      cannot, ask why it is requested.
    </p>
    <table>
      <thead>
        <tr>
          <th>Permission</th>
          <th>Plausible for</th>
          <th>Red flag for</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>READ_SMS / RECEIVE_SMS</td>
          <td>OTP-based auth apps only</td>
          <td>A flashlight, a game, a cleaner</td>
        </tr>
        <tr>
          <td>BIND_ACCESSIBILITY_SERVICE</td>
          <td>Genuinely assistive apps</td>
          <td>Anything that also reads screen content</td>
        </tr>
        <tr>
          <td>SYSTEM_ALERT_WINDOW</td>
          <td>Overlay-specific tools</td>
          <td>Generic utilities</td>
        </tr>
        <tr>
          <td>REQUEST_INSTALL_PACKAGES</td>
          <td>App stores, updaters</td>
          <td>A single-purpose app</td>
        </tr>
        <tr>
          <td>DEVICE_ADMIN</td>
          <td>MDM, enterprise</td>
          <td>Consumer apps entirely</td>
        </tr>
      </tbody>
    </table>
    <p>
      The accessibility service is the one to take seriously. An app with accessibility access can read every screen, including
      your banking app, and simulate taps. Combined with network permission it is a complete account-takeover kit. There are
      legitimate uses — but not for a photo editor.
    </p>
    <p>
      If the delta is unexpected, stop. Do not install and &quot;just watch it for a while.&quot; Malware does not announce
      itself.
    </p>

    <h2>Gate 4: Confirm what it actually does after install</h2>
    <p>This is the gate almost every guide skips, and it is the one that catches sophisticated repacks.</p>
    <pre>
      <code>{`# Watch outbound connections while the app runs
adb shell "tcpdump -i any -n 'not port 53'" 2>/dev/null | head -50

# Simpler: list active connections grouped by UID
adb shell "cat /proc/net/tcp /proc/net/tcp6" | head -30`}</code>
    </pre>
    <p>
      Practical approach without root: install a local VPN-based firewall (NetGuard, RethinkDNS), run the app for ten minutes,
      and look at what domains it contacts.
    </p>
    <p>Signs that warrant removal:</p>
    <ul>
      <li>Connections to raw IP addresses with no hostname</li>
      <li>Domains registered this week (check WHOIS)</li>
      <li>Beaconing at fixed intervals to a single endpoint</li>
      <li>Traffic to hosts unrelated to the app&apos;s stated function</li>
    </ul>
    <p>
      This is also where you notice the app requesting <code>READ_PHONE_STATE</code> while opening a connection to an IP in a
      country with no relation to the developer.
    </p>

    <h2>The four gates, as a checklist</h2>
    <pre>
      <code>{`# 1. Hash
shasum -a 256 app.apk                      # compare to published hash
# 2. Signature
apksigner verify --print-certs app.apk     # DN + SHA-256 digest
# 3. Permissions
aapt2 dump permissions app.apk             # justify each dangerous one
# 4. Behavior (post-install)
# firewall app → observe domains for 10 minutes`}</code>
    </pre>
    <p>
      Run these four and you will catch: repacked apps, tampered downloads, trojanised &quot;mod&quot; versions, and the
      silent-data-exfiltration class that no antivirus reliably flags.
    </p>

    <h2>What to do about updates</h2>
    <p>Two rules:</p>
    <ol>
      <li>
        <strong>Keep the same source.</strong> Switching sources between versions is how signature mismatches and repacks creep
        in.
      </li>
      <li>
        <strong>Re-run Gate 2 on every update.</strong> It costs ten seconds and is the only cheap way to detect a source that
        has gone bad.
      </li>
    </ol>
    <p>
      One more: if a previously installed app suddenly shows a signature difference on a routine update, that is not a glitch.
      That is the exact failure mode of a compromised download site. Uninstall, do not update.
    </p>

    <h2>The honest limit</h2>
    <p>
      None of this makes sideloading risk-free. It makes it <em>measurable</em>. A verified, hash-matched, signature-matched,
      permission-justified APK from the developer&apos;s own site is about as safe as sideloading gets — and it is still less
      safe than the Play Store, which does server-side scanning and can revoke apps remotely.
    </p>
    <p>
      Use sideloading for apps Play does not carry, for regions where Play is unavailable, or for specific versions you need.
      Use it with these four gates. Do not use it as a default habit, because the failure mode is silent and the blast radius is
      your whole account.
    </p>
    <p>
      Official, per-version builds with ABI and signature details are listed at <Link href="/">gptoapk.com</Link>, which makes
      Gate 1 and Gate 2 much faster to run.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I check if an APK file is safe before installing it?",
    answer:
      "Run four checks: compute the SHA-256 hash and compare it against a published source that is not the download page; verify the signing certificate DN and digest with apksigner verify --print-certs; dump the permission list with aapt2 dump permissions and justify each dangerous one; and after install, monitor outbound connections with a firewall app for ten minutes.",
  },
  {
    question: "What does a hash check actually prove about an APK?",
    answer:
      "Only that the file you have is byte-identical to the file someone published. It does not prove the file is safe — a malicious APK can have a perfectly published hash on the attacker's own site. The signature check (who signed it) and the permission check (what it can do) are what actually establish safety.",
  },
  {
    question: "How can I tell if an APK was repackaged with malware?",
    answer:
      "Compare the signing certificate against a known-official build of the same app. Run apksigner verify --print-certs on both; if the SHA-256 certificate digests differ, the APK is a repack. Also watch for a debug certificate DN like CN=Android Debug on an app that ships from a real company.",
  },
  {
    question: "Which Android permissions should make me refuse an install?",
    answer:
      "Accessibility service access (BIND_ACCESSIBILITY_SERVICE) is the most dangerous — it can read every screen and simulate taps. SMS read/receive, device admin, and REQUEST_INSTALL_PACKAGES are also high risk. The test is not the permission itself but whether you can name the specific feature that requires it for that category of app.",
  },
  {
    question: "Is sideloading safer than using the Play Store?",
    answer:
      "No. Sideloading with the four-gate verification workflow is reasonably safe, but the Play Store adds server-side scanning and remote app revocation that you cannot replicate locally. Use sideloading for apps Play does not carry or specific versions you need, not as a default habit.",
  },
];

const ARTICLE2 = (
  <>
    <p>
      The most common sideloading failure is not malware and not a corrupt file. It is a perfectly good APK that your phone
      simply cannot install — wrong CPU architecture, wrong minimum SDK, or a build that only ships the wrong density.
    </p>
    <p>
      All three are knowable <em>before</em> you download. You need three facts about your device and one fact about the APK.
    </p>

    <h2>Your device: one command, three answers</h2>
    <pre>
      <code>{`adb shell getprop | grep -E "ro.product.cpu.abi|ro.build.version.sdk|ro.sf.lcd_density"`}</code>
    </pre>
    <p>Expected output:</p>
    <pre>
      <code>{`[ro.product.cpu.abi]: [arm64-v8a]
[ro.build.version.sdk]: [34]
[ro.sf.lcd_density]: [420]`}</code>
    </pre>
    <p>
      These three numbers map directly to the checks below. No PC? Any &quot;Device Info&quot; app shows the same three values;
      look for <strong>CPU ABI</strong>, <strong>API level</strong>, and <strong>screen density (dpi)</strong>.
    </p>

    <h2>Check 1: CPU architecture (the biggest offender)</h2>
    <p>
      Android APKs contain native libraries compiled per architecture. If the APK has no <code>lib/</code> directory for your
      device&apos;s ABI, it either fails to install or crashes on first launch.
    </p>
    <table>
      <thead>
        <tr>
          <th>Your ABI</th>
          <th>What the APK must contain</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>arm64-v8a</td>
          <td>lib/arm64-v8a/</td>
        </tr>
        <tr>
          <td>armeabi-v7a</td>
          <td>lib/armeabi-v7a/</td>
        </tr>
        <tr>
          <td>x86_64 (emulators, some tablets)</td>
          <td>lib/x86_64/</td>
        </tr>
      </tbody>
    </table>
    <p>Inspect an APK before installing:</p>
    <pre>
      <code>{`# List the native library folders inside the APK
unzip -l app.apk | grep "lib/" | awk -F/ '{print $2}' | sort -u`}</code>
    </pre>
    <p>
      Output like <code>arm64-v8a</code> and <code>armeabi-v7a</code> means it covers essentially all real phones. Output with
      only <code>x86</code> means it is an emulator build — installing it on a phone will fail at launch with{" "}
      <code>UnsatisfiedLinkError</code>.
    </p>
    <p>
      <strong>Important subtlety:</strong> many modern apps are <strong>pure Java/Kotlin with no native code</strong>. Those are
      architecture-independent and will run anywhere. A missing <code>lib/</code> folder is not a problem; a{" "}
      <code>lib/</code> folder that <em>lacks your ABI</em> is.
    </p>
    <p>
      Also check whether it is a split APK. If the download is a folder of <code>base.apk</code> +{" "}
      <code>config.arm64_v8a.apk</code> + <code>config.xxhdpi.apk</code>, install with:
    </p>
    <pre>
      <code>{`adb install-multiple base.apk config.arm64_v8a.apk config.xxhdpi.apk`}</code>
    </pre>
    <p>
      Installing only <code>base.apk</code> from a split bundle produces a &quot;compatible&quot; app that mysteriously
      misbehaves.
    </p>

    <h2>Check 2: minSdk and targetSdk</h2>
    <p>Read them without installing:</p>
    <pre>
      <code>{`aapt2 dump badging app.apk | grep -E "sdkVersion|targetSdkVersion"
# sdkVersion:'24'
# targetSdkVersion:'34'`}</code>
    </pre>
    <p>
      Compare <code>sdkVersion</code> (minSdk) to your <code>ro.build.version.sdk</code> (API level):
    </p>
    <table>
      <thead>
        <tr>
          <th>Android version</th>
          <th>API level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Android 10</td>
          <td>29</td>
        </tr>
        <tr>
          <td>Android 12</td>
          <td>31</td>
        </tr>
        <tr>
          <td>Android 13</td>
          <td>33</td>
        </tr>
        <tr>
          <td>Android 14</td>
          <td>34</td>
        </tr>
        <tr>
          <td>Android 15</td>
          <td>35</td>
        </tr>
        <tr>
          <td>Android 16</td>
          <td>36</td>
        </tr>
      </tbody>
    </table>
    <p>
      If minSdk is above your API level, the install fails outright — this is a hard block, no workaround short of modifying the
      APK manifest (which requires resigning, which breaks updates).
    </p>
    <p>
      <code>targetSdk</code> is a different story: too low is a soft problem. Apps with targetSdk below 23 on Android 14+ hit
      stricter runtime permission behaviour; below 30 and some ROMs warn about compatibility. They usually still run, but may
      show &quot;this app was built for an older version of Android.&quot;
    </p>

    <h2>Check 3: Screen density and resource splits</h2>
    <p>
      This one rarely blocks install but frequently causes bad rendering — huge or tiny UI, missing images.
    </p>
    <pre>
      <code>{`aapt2 dump badging app.apk | grep -i density
# density:'420'
# supports-screens: 'small' 'normal' 'large' 'xlarge'`}</code>
    </pre>
    <p>
      Compare against <code>ro.sf.lcd_density</code>. A match or a nearby bucket is fine: Android scales resources across
      density buckets reasonably well. The real failure is a <strong>density-split APK</strong> where you install only{" "}
      <code>config.mdpi.apk</code> on an <code>xxhdpi</code> device, producing enormous blurry assets.
    </p>

    <h2>The full check, in one pass</h2>
    <pre>
      <code>{`# Device side
adb shell getprop ro.product.cpu.abi
adb shell getprop ro.build.version.sdk
adb shell getprop ro.sf.lcd_density

# APK side
aapt2 dump badging app.apk | grep -E "sdkVersion|targetSdkVersion|density|native-code"
unzip -l app.apk | grep "lib/" | awk -F/ '{print $2}' | sort -u`}</code>
    </pre>
    <p>Four lines of output, and you know whether it will install before you transfer 150MB.</p>

    <h2>Decision table: the four mismatch cases</h2>
    <table>
      <thead>
        <tr>
          <th>Symptom</th>
          <th>Cause</th>
          <th>Fix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INSTALL_FAILED_NO_MATCHING_ABIS</td>
          <td>APK lacks your CPU architecture</td>
          <td>Get the arm64 build, or a universal APK</td>
        </tr>
        <tr>
          <td>Failure before install completes, &quot;not compatible&quot; toast</td>
          <td>minSdk higher than your API level</td>
          <td>Not fixable — find a build for your Android version</td>
        </tr>
        <tr>
          <td>Installs fine, crashes on launch with UnsatisfiedLinkError</td>
          <td>Native lib for wrong ABI present, correct one absent</td>
          <td>Same as case 1</td>
        </tr>
        <tr>
          <td>Installs and runs, UI looks broken / assets missing</td>
          <td>Density or split-APK mismatch</td>
          <td>Install all splits, or a universal build</td>
        </tr>
      </tbody>
    </table>

    <h2>Where to find a compatible build</h2>
    <p>If the version you want does not match:</p>
    <ol>
      <li>
        <strong>Check for a universal APK.</strong> Many release pages offer one; it covers all ABIs and densities at the cost of
        file size.
      </li>
      <li>
        <strong>Look at the version history.</strong> Older releases often support lower minSdk. A two-year-old build may be the
        newest thing that runs on Android 8.
      </li>
      <li>
        <strong>Prefer a bundle-aware source.</strong> Aggregators that list ABI and density per file save you the guessing
        entirely.
      </li>
      <li>
        <strong>For emulators, get the x86_64 build explicitly.</strong> Pulling the phone build is the number one reason people
        conclude &quot;the app doesn&apos;t work in the emulator.&quot;
      </li>
    </ol>

    <h2>One thing worth doing before you install</h2>
    <p>If the app is already installed at a different version, check what the new one requires before overwriting:</p>
    <pre>
      <code>{`adb shell dumpsys package com.example.app | grep -E "versionName|versionCode|targetSdk"`}</code>
    </pre>
    <p>
      If <code>targetSdk</code> jumps significantly between versions, behaviour changes (background limits, storage access,
      notification permissions) are likelier than you would expect. Knowing that in advance turns a confusing bug report into an
      obvious one.
    </p>
    <p>
      The whole workflow above takes about ninety seconds and eliminates the majority of &quot;why won&apos;t this install&quot;
      cases before they happen. Builds with ABI, density, and minSdk listed per version are available at{" "}
      <Link href="/">gptoapk.com</Link>.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "How do I check if an APK is compatible with my Android phone?",
    answer:
      "Compare three values. Get your device's CPU ABI, API level, and density with adb shell getprop (ro.product.cpu.abi, ro.build.version.sdk, ro.sf.lcd_density). Then check the APK's native library folders with unzip -l and its minSdk with aapt2 dump badging. If the APK has a lib/ folder without your ABI, or minSdk is above your API level, it will not work.",
  },
  {
    question: "What does INSTALL_FAILED_NO_MATCHING_ABIS mean and how do I fix it?",
    answer:
      "The APK contains native libraries but none compiled for your device's CPU architecture, usually a 32-bit-only build on a 64-bit-only phone. Fix it by downloading the arm64-v8a variant or a universal APK. Forcing the install does not help — the app still crashes at the first native call.",
  },
  {
    question: "Does every APK need native libraries for my CPU?",
    answer:
      "No. Apps written purely in Java/Kotlin with no native code are architecture-independent and run on any device. Only when an APK does contain a lib/ folder does the ABI matter, and then it must include yours.",
  },
  {
    question: "Why does an app install but show broken or blurry UI?",
    answer:
      "Usually a density or split-APK mismatch — for example installing only the mdpi config split on an xxhdpi screen. Install all splits from the bundle with adb install-multiple, or use a universal APK that includes every resource bucket.",
  },
  {
    question: "Why won't an APK install in an Android emulator?",
    answer:
      "Emulators use x86 or x86_64 architecture, while most APKs downloaded from phone-oriented sites ship arm64-v8a libraries only. Download the x86_64 build, or use an emulator image with ARM translation support.",
  },
];

export const enPosts20261111 = [
  {
    slug: "safely-download-apk-verification-workflow",
    title:
      "How to Safely Download APK Files on Android: A Verification Workflow That Actually Catches Malware",
    description:
      "Most APK safety guides say 'use trusted sources' and stop there. This one gives you a concrete four-gate verification workflow — file hash, signing certificate, permission delta, and post-install network check — you can run in under five minutes per app.",
    date: "2026-11-11",
    readTime: "11 min read",
    tags: ["android", "security", "apk"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-compatibility-check-three-commands",
    title: "Android APK Compatibility Check: The Three Commands That Tell You Before You Download",
    description:
      "Instead of downloading a 150MB APK and finding out it won't install, check compatibility from three properties — ABI, minSdk, and screen density — plus a one-line adb command that reports all three. Includes a decision table for the four common mismatch cases.",
    date: "2026-11-11",
    readTime: "10 min read",
    tags: ["android", "apk", "tips"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261111List = toList(enPosts20261111);
