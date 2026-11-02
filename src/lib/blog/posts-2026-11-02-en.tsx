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
    question: "A Play Store update is stuck on 'Waiting for Wi-Fi'. Is something broken?",
    answer:
      "Almost never. That message is the Wi-Fi-only download preference or the update queue doing its job. Play Store → Settings → Auto-update apps, then allow updates on mobile data or join a Wi-Fi network. Clearing caches does nothing for this case.",
  },
  {
    question: "play.google.com loads in the browser but updates still stall. Why?",
    answer:
      "Downloads come from dl.google.com, which is a different host than the store front end. A loading page proves only that the front end is reachable. If you use a proxy, also check that Download Manager is in scope — per-app proxy rules routinely include the store and Play Services but omit Download Manager, the one component that actually fetches bytes.",
  },
  {
    question: "What is the difference between clearing Play Store data and Play Services cache?",
    answer:
      "Play Services cache is the safer one and should be tried first, because Play Services performs the download and authorization. Clearing the store's data resets your sign-in and the pending update list — only do it after the earlier steps fail, and expect to sign in again.",
  },
  {
    question: "What does error -505 mean?",
    answer:
      "An app with the same package name but a different signing certificate is already installed, usually because you installed it from a third-party source earlier. Signatures cannot be mixed, so the old copy must be uninstalled first. Back up app data before you do, since uninstalling wipes it.",
  },
  {
    question: "Is it safe to just update with an APK instead of fighting the Play Store?",
    answer:
      "Yes, if the signature matches. Download the official build from a source that publishes certificate fingerprints, compare its SHA-256 with the installed app using apksigner, then install — a covering install keeps your data. A signature conflict warning means the source is wrong; do not force it.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Does 'this app may be harmful' from Play Protect mean the APK has malware?",
    answer:
      "Not necessarily. The most common real cause is a signing certificate that does not match Google's record for that package name, which usually means the app was repackaged. False positives also happen with homemade apps that use a packer or dynamic code loading. Check the certificate yourself before deciding.",
  },
  {
    question: "Can I turn Play Protect off permanently?",
    answer:
      "Technically yes, but it is a bad trade. You lose the daily scan and install-time signature verification, and a growing number of banking and payment apps check Play Protect status and may refuse to run. For a single app, the one-time 'install anyway' override is enough.",
  },
  {
    question: "How do I check a sideloaded app after installing it?",
    answer:
      "Play Store → avatar → Play Protect → Scan. It runs a full-device check within a few minutes and reports by notification. Read the verdict type in the notification before deciding whether to uninstall or keep the app.",
  },
  {
    question: "Why do my own builds keep getting flagged by Play Protect?",
    answer:
      "Four common causes: debug signing (the debug keystore is shared by every Android device and effectively untrusted), a packer or hardening service (packed DEX overlaps heavily with malware features), a targetSdkVersion below 23, and downloading DEX at runtime. Signing release builds with a real key fixes most cases.",
  },
  {
    question: "Should both Play Protect toggles be on?",
    answer:
      "The 'Scan apps with Play Protect' toggle is the protection itself and should stay on. 'Improve harmful app detection' only uploads anonymous sample data to Google; turning it off does not reduce protection, so it is a privacy choice.",
  },
];

const ARTICLE1 = (
  <>
    <h1>Google Play Update Stuck or Won&apos;t Download: A Layer-by-Layer Troubleshooting Guide</h1>

    <p>
      A Play Store update that stalls at 0%, hangs mid-download, or fails with &quot;can&apos;t download, try again later&quot; is
      common enough that most people have a ritual for it: tap update again, clear the cache, and if that fails, factory reset.
      That ritual skips the two checks that resolve most cases, and the last step is almost never necessary.
    </p>

    <p>
      Updates fail for three structurally different reasons: <strong>network</strong> (the device cannot reach Google&apos;s
      download infrastructure), <strong>storage</strong> (no space, or a download manager in a bad state), and
      <strong>account and package state</strong> (signing conflicts, Play Services cache, device policy). The symptoms look
      alike; the fixes are opposite.
    </p>

    <h2>Step 1: Read the actual message</h2>

    <p>
      Open Play Store → tap your avatar → Manage apps &amp; device → Manage → Installed → Updates available, then tap the stuck
      app and read the status text.
    </p>

    <ul>
      <li>
        <strong>Pending / Waiting for Wi-Fi</strong> — a policy or queue, not a failure
      </li>
      <li>
        <strong>Downloading… frozen</strong> — network layer or Play Services cache
      </li>
      <li>
        <strong>Can&apos;t download, try again later (error code)</strong> — use the code table below
      </li>
      <li>
        <strong>App not installed / installation failed</strong> — storage, signature, or device policy
      </li>
    </ul>

    <p>
      Do not apply the same fix to all four. &quot;Waiting for Wi-Fi&quot; is solved by turning off the Wi-Fi-only
      preference — clearing caches does nothing.
    </p>

    <h2>Step 2: Network — a loading page is not a working download</h2>

    <p>
      The most common failure is that <code>play.google.com</code> resolves but <code>dl.google.com</code> (the actual
      download CDN) is throttled or blocked.
    </p>

    <ol>
      <li>Load <code>https://play.google.com</code> in a browser. If the page will not load, fix connectivity first — nothing else matters yet.</li>
      <li>If the page loads but downloads stall, you are being throttled or blocked at the CDN layer, not the front end. Change route and retry.</li>
      <li>
        If you are on a proxy, check that three apps are in scope, not two: Play Store, Google Play Services, and Download
        Manager.
      </li>
    </ol>

    <p>
      That is the highest-value diagnostic here. Per-app proxy configurations routinely omit Download Manager, which is the one
      component that actually fetches bytes — producing the confusing &quot;the page opens but nothing downloads&quot; symptom.
    </p>

    <h2>Step 3: Storage, and phantom usage</h2>

    <p>
      Updating needs roughly 2–3× the new APK size in free space, because the old and new packages coexist temporarily.
    </p>

    <ul>
      <li>Check Settings → Storage. Keep at least 2 GB free; 5 GB+ for large games.</li>
      <li>
        If free space looks implausibly low, look at the &quot;Other&quot; or &quot;System&quot; category. Stale <code>.apk</code>
        files left by Download Manager are a common cause.
      </li>
    </ul>

    <pre>
      <code>{`adb shell du -h /data/local/tmp/*.apk 2>/dev/null
adb shell ls -lh /storage/emulated/0/Android/data/com.android.vending/files/ 2>/dev/null`}</code>
    </pre>

    <p>
      Without adb: Settings → Apps → Download Manager → Storage → Clear data. This removes temporary files only, not your
      downloaded documents. With adb, delete the leftovers precisely:
    </p>

    <pre>
      <code>{`adb shell rm -f /data/local/tmp/*.apk`}</code>
    </pre>

    <h2>Step 4: Account and package state — clear the right cache</h2>

    <p>
      Most guides start with &quot;clear Play Store data,&quot; which also wipes your sign-in and the update queue. Do it in this
      order instead.
    </p>

    <p>
      <strong>1. Clear Google Play Services cache</strong> (not storage): Settings → Apps → show system apps → Google Play
      Services → Storage → Clear cache. Play Services performs the actual download and authorization; when it is wedged, the
      store UI often looks perfectly normal.
    </p>

    <p>
      <strong>2. Clear Play Store cache</strong>: Settings → Apps → Google Play Store → Storage → Clear cache.
    </p>

    <p>
      <strong>3. Only then clear Play Store data</strong>. This resets your sign-in and the pending update list. A corrupted
      list is a real cause of an update that retries forever.
    </p>

    <p>
      <strong>4. Check for policy restrictions</strong>: Play Store → avatar → Settings → Account &amp; device preferences.
      Family Link, managed Google accounts, and MDM profiles on company devices block updates silently. On a work phone this is
      frequently the root cause.
    </p>

    <h2>Error codes that name the layer</h2>

    <p>
      <code>-505</code> means a signature conflict: an app with the same package name but a different signing certificate is
      already installed. That is typically because you installed it from a third-party source earlier and now want the Play
      version. Signatures cannot be mixed, so the old copy must go — and uninstalling usually wipes its data, so back that up
      first. <code>-504</code> is the same class of problem (package name conflict).
    </p>

    <p>
      <code>-113</code> (Download Manager not responding) — clear Download Manager data. <code>-24</code> (insufficient space) —
      free storage. <code>-101</code> and <code>-110</code> (download interrupted, no space) — retry on another network and free
      space. <code>495</code> and <code>496</code> (network-induced download or install failure) — change route and retry.
      <code>RH-01</code> (cannot reach server) — clear Play Services and Store data, then reboot.
    </p>

    <h2>When it is faster to install the official build</h2>

    <p>
      If ten minutes of troubleshooting has not fixed it, updating via the officially signed APK is a legitimate path —
      provided the signature matches, which also preserves your data on a covering install.
    </p>

    <ol>
      <li>Find the same app and version on APKMirror or APKPure. Both publish the signing certificate fingerprint.</li>
      <li>
        Compare that SHA-256 with the certificate of the app already on your device (commands below).
      </li>
      <li>If the fingerprints match, install the downloaded APK — it covers the existing app and keeps its data.</li>
      <li>If it reports a signature conflict, the source is wrong. Do not force it; that is the same condition that made Play refuse the update.</li>
    </ol>

    <pre>
      <code>{`adb shell pm path com.example.app
adb pull /data/app/.../base.apk ./installed.apk
apksigner verify --print-certs installed.apk | head -5`}</code>
    </pre>

    <h2>The 60-second checklist</h2>

    <ol>
      <li>Classify the message (waiting / frozen / error code / install failure)</li>
      <li>Does play.google.com load in a browser? If not, fix the network</li>
      <li>At least 2 GB free? If not, clear download leftovers</li>
      <li>Clear Play Services cache, then the Store cache</li>
      <li>Still failing: clear Store data and sign in again</li>
      <li>Still failing: match the error code, or update with a fingerprint-verified official APK</li>
    </ol>

    <p>
      Steps 2–4 resolve the large majority. A factory reset is essentially never the answer for a failed update, and before you
      consider it, rule out the signature conflict, which is solved by choosing a different source. If what you need is the
      official build for a device that will not cooperate, resolving the Play link through{" "}
      <Link href="/">gptoapk.com</Link> gets you the store&apos;s original artifact without the retry loop.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>What Google Play Protect Actually Blocks, and How to Decide When to Override It</h1>

    <p>
      Anyone who sideloads APKs eventually meets the Play Protect dialog: &quot;This app may be harmful,&quot; or
      &quot;Installation blocked for your security.&quot; The usual reaction is to turn Play Protect off. That reaction has a
      cost most people do not price correctly.
    </p>

    <p>
      Play Protect is the only system-level, enabled-by-default app scanner on Android. It is small, but it decides three
      things: <strong>whether you can install</strong>, <strong>whether an installed app gets disabled later</strong>, and
      <strong>whether unused apps get reclaimed</strong>. Understanding its detection logic tells you when to trust the warning
      and when to override it.
    </p>

    <h2>The four things Play Protect does</h2>

    <ul>
      <li>
        <strong>Install-time scan</strong> — every APK install; appears as &quot;app may be harmful, install anyway?&quot;
      </li>
      <li>
        <strong>Periodic full scan</strong> — roughly daily while idle; reports as &quot;1 harmful app found&quot;
      </li>
      <li>
        <strong>Real-time behavior detection</strong> — at runtime; the app is force-stopped and its data cleared
      </li>
      <li>
        <strong>Uninstall unused apps</strong> (optional) — long-term non-use; app removed, data retained
      </li>
    </ul>

    <p>
      The first three are on by default. &quot;Scan apps with Play Protect&quot; and &quot;Improve harmful app detection&quot;
      are separate switches — the second sends anonymous samples and can be off without reducing protection. Path: Play Store →
      avatar → Play Protect → gear icon.
    </p>

    <h2>Why it flagged your APK: three real causes</h2>

    <p>
      <strong>1. The signing certificate is not what Google expects.</strong> This is the most common case. Play Protect
      fingerprints the signing certificate and compares it against its records. A paid app downloaded from a mirror with an
      intact signature usually produces an &quot;unknown source&quot; warning, not a harmful one. A harmful label more often
      means the signature does not match Google&apos;s record for that package name — i.e. it was repackaged.
    </p>

    <p>
      <strong>2. Feature similarity to known malware.</strong> Detection is clustering-based, not hash matching. A test app you
      built yourself can be flagged if it uses a packer, a dynamic-loading framework, or obfuscation patterns that overlap with
      malware families.
    </p>

    <p>
      <strong>3. Runtime behavior.</strong> An app disabled after install is usually reading SMS, abusing Accessibility Service,
      or attempting a silent install. These detections are worth taking seriously — real malware hits at least one of them.
    </p>

    <h2>Two minutes of verification before you override</h2>

    <p>
      <strong>Check who signed it.</strong>
    </p>

    <pre>
      <code>{`apksigner verify --print-certs app.apk`}</code>
    </pre>

    <p>
      The certificate owner and SHA-256 digest are the identity. Search the fingerprint: a legitimate app surfaces a real
      developer, while an unsearchable certificate — or one issued days ago — is a strong red flag.
    </p>

    <p>
      <strong>Check whether permissions fit the app.</strong> A flashlight requesting SMS and contacts is an automatic discard.
    </p>

    <pre>
      <code>{`aapt dump permissions app.apk`}</code>
    </pre>

    <p>
      High-risk permissions to watch for: <code>READ_SMS</code>, <code>RECEIVE_SMS</code>,
      <code>BIND_ACCESSIBILITY_SERVICE</code>, <code>SYSTEM_ALERT_WINDOW</code>, <code>REQUEST_INSTALL_PACKAGES</code>.
    </p>

    <p>
      <strong>Check the package name and version.</strong> Repackaged apps frequently alter the package name
      (<code>com.whatsapp</code> → <code>com.whatsapp.mobile</code>) or inflate the version string. Compare against the
      developer&apos;s published package name.
    </p>

    <p>If all three check out, override with a better evidence base than the dialog provided.</p>

    <h2>Overriding correctly — and what it costs</h2>

    <ul>
      <li>
        In the dialog, tap More details → Install anyway. This is a one-time allowance and does not change global settings.
      </li>
      <li>
        If &quot;Install anyway&quot; is not offered, the block is policy-level: Settings → Security → Install unknown apps →
        grant permission to the file manager you are using, then retry.
      </li>
    </ul>

    <p>
      <strong>Turning Play Protect off globally is a different decision.</strong> The cost: no daily scan, so installed malware
      is never surfaced; no signature verification at install; and banking and payment apps increasingly check Play Protect
      status and may refuse to run.
    </p>

    <p>If the goal is one specific app, the per-app override is sufficient. Re-check afterward that Play Protect is still enabled.</p>

    <h2>After installing: scan on demand</h2>

    <p>
      Do not wait for the daily scan. Play Store → avatar → Play Protect → Scan. It completes within a few minutes and reports by
      notification.
    </p>

    <ul>
      <li>
        <strong>Harmful</strong> — uninstall immediately
      </li>
      <li>
        <strong>Potentially harmful</strong> — check permissions; usually a false positive
      </li>
      <li>
        <strong>Unwanted software</strong> — common for adware; uninstall
      </li>
      <li>
        <strong>Privacy risk</strong> — review what it actually reads
      </li>
    </ul>

    <h2>Developer side: why your builds keep getting flagged</h2>

    <ol>
      <li>
        <strong>Debug signing.</strong> The debug keystore is shared across all Android devices, so its trust level is
        effectively zero. Sign release builds with a real key.
      </li>
      <li>
        <strong>Packers and hardening services.</strong> Packed DEX has high feature overlap with malware. Whitelisting exists
        but is slow.
      </li>
      <li>
        <strong>Low targetSdkVersion.</strong> Apps below API 23 are flagged as not optimized for modern Android and get
        stricter scrutiny.
      </li>
      <li>
        <strong>Dynamic code loading.</strong> Downloading and loading DEX at runtime is a classic malware technique and also a
        normal engineering choice. Submit the app with an explanation early rather than disputing flags after release.
      </li>
    </ol>

    <h2>The short version</h2>

    <p>
      When Play Protect blocks you, the reason is almost always <strong>an unexpected signature or suspicious behavior</strong> —
      not Android refusing to allow third-party apps. Treat it as a free quality inspector with a real false-positive rate:
      verify the signature and permissions yourself; override for that one app if they check out; scan after installing. You keep
      the ability to sideload without giving up system-level protection.
    </p>

    <p>
      When you need the official package, resolving the Play link through <Link href="/">gptoapk.com</Link> returns the
      store&apos;s original artifact, which makes the signature check a formality rather than a decision.
    </p>
  </>
);

export const enPosts20261102 = [
  {
    slug: "google-play-update-stuck-wont-download-fix",
    title: "Google Play Update Stuck or Won't Download: A Layer-by-Layer Troubleshooting Guide",
    description:
      "An update stuck at 0%, hanging mid-download, or failing with an error code has one of three causes: network, storage, or account and package state. This guide separates them in the order you should check, with the error codes that tell you which layer you are in.",
    date: "2026-11-02",
    readTime: "9 min read",
    tags: ["android", "google play", "troubleshooting"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "google-play-protect-what-it-blocks-and-when-to-override",
    title: "What Google Play Protect Actually Blocks, and How to Decide When to Override It",
    description:
      "Play Protect warns about sideloaded APKs for three distinct reasons: an unexpected signing certificate, feature similarity to known malware, or runtime behavior detection. What each means, how to verify the APK yourself in two minutes, and why a single-app override is safe while disabling it globally is not.",
    date: "2026-11-02",
    readTime: "9 min read",
    tags: ["android", "security", "apk"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261102List = toList(enPosts20261102);
