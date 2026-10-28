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
    question: "Why does a sideloaded APK fail on a Samsung but work on a Pixel?",
    answer:
      "One UI adds Auto Blocker (default on since One UI 6.1) and routes installs through its own package installer with per-app install permission. Stock Android guides never mention Auto Blocker, so the install silently fails even after you granted 'unknown sources' access.",
  },
  {
    question: "Which app do I grant install permission to?",
    answer:
      "Whichever app actually opens the APK file. If you open it from My Files, grant to My Files — granting it to Chrome does nothing. This mismatch is one of the most common dead ends: the permission prompt reappears and nothing installs.",
  },
  {
    question: "Does turning off Auto Blocker weaken my phone permanently?",
    answer:
      "Auto Blocker also blocks malicious USB commands and untrusted software updates, so leaving it off long-term reduces protection. The safer pattern is to disable it only for the install and re-enable it afterwards — but note it will re-block every future side-loaded update.",
  },
  {
    question: "Can I sideload on a Knox-managed or work-profile device?",
    answer:
      "Not by changing settings. On MDM-enrolled devices the block is administrative, not a user toggle, and no amount of unknown-sources or Auto Blocker changes will get around it.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why is the APK from an online extractor often outdated?",
    answer:
      "Because the extractor served a cache instead of performing a live Play request. The cached file's age depends on when the service last refreshed that package, and most sites do not disclose it — the page will still claim it is the current version.",
  },
  {
    question: "Do online extractors give the official signed APK?",
    answer:
      "Only when they proxy an authenticated Play Store request. Even then, verify the certificate SHA-256 against a copy you pulled from your own device with adb. An extractor that re-serves user-uploaded files will hand you a re-signed build with no provenance.",
  },
  {
    question: "Why does an extracted APK crash on my phone?",
    answer:
      "Split-APK delivery. Modern Play installs are split by ABI, density, and language, and an extractor may return only one split — correct for the profile it requested, wrong for your device. Pull all splits and install them together with adb install-multiple.",
  },
  {
    question: "What is the most trustworthy way to get an APK?",
    answer:
      "adb shell pm path <package> on a device you control, then adb pull. The bytes are identical to what is installed, the official signature is intact, and no third party is in the chain. Use that copy as the reference for judging any download.",
  },
];

const ARTICLE1 = (
  <>
    <h1>Sideloading an APK on a Samsung Phone: What One UI Actually Changes</h1>

    <p>
      Sideloading on Samsung is not the same as sideloading on stock Android. One UI replaces the generic
      &quot;Allow from this source&quot; toggle with a per-app install permission prompt, adds Auto Blocker (on by
      default since One UI 6.1), and routes installs through Knox-related checks in some configurations. Follow a
      Pixel guide on a Galaxy and you will usually stall at &quot;app not installed&quot; with no explanation.
    </p>
    <p>This is the current procedure, ordered by what actually blocks installs.</p>

    <h2>What One UI changes</h2>
    <table>
      <thead>
        <tr>
          <th>Stock Android</th>
          <th>Samsung One UI</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Settings → Security → Unknown sources (global)</td>
          <td>
            Per-app: the app that <em>opens</em> the APK gets install permission
          </td>
        </tr>
        <tr>
          <td>No default blocker</td>
          <td>Auto Blocker, default ON since One UI 6.1</td>
        </tr>
        <tr>
          <td>No vendor layer</td>
          <td>Knox / device management policies on enterprise devices</td>
        </tr>
        <tr>
          <td>Package installer</td>
          <td>Samsung package installer with its own error strings</td>
        </tr>
      </tbody>
    </table>
    <p>
      Two consequences follow. First, the permission belongs to your <strong>file manager or browser</strong>, not
      to Android as a whole — granting it to Chrome does nothing for a file you open from My Files. Second, Auto
      Blocker will reject installs from sources it does not trust even after you grant install permission.
    </p>

    <h2>Step 1: Disable Auto Blocker first</h2>
    <p>
      This is the step most guides omit, and it is the single most common cause of a silent failure on a recent
      Galaxy.
    </p>
    <p>
      Settings → <strong>Security and privacy</strong> → <strong>Auto Blocker</strong> → toggle{" "}
      <strong>Off</strong>.
    </p>
    <p>
      Auto Blocker blocks installs from unofficial sources, blocks software updates outside Play / Galaxy Store,
      and blocks USB commands — which is also why <code>adb install</code> can appear to hang. Leave it on long-term
      and it will re-block every subsequent side-loaded update, so expect to toggle it each time.
    </p>

    <h2>Step 2: Grant install permission to the right app</h2>
    <p>
      Open the APK. When the prompt appears, tap <strong>Settings</strong> in the dialog — it deep-links you to the
      correct screen for <em>that specific app</em>.
    </p>
    <p>
      The path is: Settings → <strong>Apps</strong> → <strong>Special access</strong> →{" "}
      <strong>Install unknown apps</strong> → select the app → <strong>Allow from this source</strong>.
    </p>
    <p>The app to select is whichever one launched the file:</p>
    <ul>
      <li>Opened from My Files → grant to My Files</li>
      <li>Downloaded and opened in Chrome → grant to Chrome</li>
      <li>Opened from a Telegram download → grant to Telegram</li>
    </ul>

    <h2>Step 3: Install</h2>
    <p>
      Return to the file and tap it. Samsung&apos;s package installer shows the requested permissions and a warning
      banner. Confirm.
    </p>

    <h2>The error messages and what they mean</h2>
    <p>
      <strong>&quot;App not installed&quot; (no detail)</strong> — almost always a signature conflict. A build with
      the same package name but a different signing certificate is already installed.
    </p>
    <pre>
      <code>adb shell pm list packages | grep &lt;package.name&gt;</code>
    </pre>
    <p>
      If present, uninstall first — but note that uninstalling clears app data.
    </p>
    <p>
      <strong>&quot;This app was blocked by Auto Blocker&quot;</strong> — explicitly Step 1.
    </p>
    <p>
      <strong>&quot;Your phone is not compatible with this app&quot;</strong> — ABI or minSdkVersion mismatch, not a
      permission issue.
    </p>
    <pre>
      <code>{`unzip -l app.apk | grep "lib/" | awk -F/ '{print $2}' | sort -u
adb shell getprop ro.product.cpu.abi`}</code>
    </pre>
    <p>Samsung flagships are arm64-v8a. An APK shipping only x86_64 will never install.</p>
    <p>
      <strong>Install hangs at &quot;Installing…&quot;</strong> — usually Auto Blocker intercepting silently, or a
      Knox policy on a managed device.
    </p>
    <p>
      <strong>&quot;Invalid package&quot; / parse error</strong> — the file is incomplete. Compare its SHA-256 with
      the publisher&apos;s value before retrying.
    </p>

    <h2>Step 4: Verify the install is what you think it is</h2>
    <pre>
      <code>{`adb shell dumpsys package <package.name> | grep -E "versionName|versionCode|firstInstallTime"`}</code>
    </pre>
    <p>
      If the package shows up but the store does not recognize it (no listing, or &quot;not installed&quot;), the APK
      was re-signed by a third party. That is your signal the install is not the official build.
    </p>

    <h2>Keep updates working</h2>
    <p>
      A side-loaded app does not auto-update through Play Store. Android only allows an update if the new APK is
      signed by the same key — so if you installed a modified build, the official APK will <em>never</em> install
      over it, and you must uninstall first, losing data. If the app is also on Galaxy Store, installing from there
      restores normal auto-updates.
    </p>

    <h2>Checklist</h2>
    <ul>
      <li>Auto Blocker turned off (Settings → Security and privacy → Auto Blocker)</li>
      <li>Install permission granted to the app that <em>opens</em> the APK, not just the browser</li>
      <li>No existing copy with the same package name and a different signature</li>
      <li>APK ABI matches arm64-v8a</li>
      <li>versionCode ≥ currently installed version</li>
      <li>After install, the package is recognized by a store (signature unmodified)</li>
      <li>Not on a Knox-managed / MDM-enrolled device (sideloading may be blocked entirely)</li>
    </ul>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      Need an APK to sideload that is signed by the original publisher?{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      serves Play-original packages, so the signature check in Step 4 passes the first time.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>APK Online Extractors for Google Play: What They Can and Cannot Do</h1>

    <p>
      Paste a Play Store URL, get an APK. That is the entire promise of an online extractor, and it is a genuinely
      convenient workflow — when it is honest about what it did. The problem is that &quot;an APK came out&quot; is
      not the same as &quot;the official APK came out.&quot;
    </p>

    <h2>How an online extractor actually works</h2>
    <p>
      There is no public Google API that says &quot;give me the APK for this package.&quot; So every extractor does
      one of three things:
    </p>
    <ol>
      <li>
        <strong>Proxied Play Store request.</strong> The service authenticates to Play with a Google account and
        requests the download for the device profile you selected. This is the only method that produces a genuine,
        officially-signed APK.
      </li>
      <li>
        <strong>Cache.</strong> The service downloaded this package before and serves a stored copy. You may receive
        something months old while the page claims it is current.
      </li>
      <li>
        <strong>Re-upload.</strong> A user uploaded an APK and the site serves it. No provenance. This is where
        modified builds enter the ecosystem.
      </li>
    </ol>
    <p>
      From the outside, all three look identical. That is the core problem: the page cannot tell you which method
      produced your file, and most do not try.
    </p>

    <h2>What they cannot do</h2>
    <ul>
      <li>
        <strong>Region-locked apps</strong> — if no backing account can reach the app, extraction fails.
      </li>
      <li>
        <strong>Paid apps</strong> — paying for an extractor does not grant app licenses.
      </li>
      <li>
        <strong>Split APK / AAB apps</strong> — you may get a <code>.xapk</code> / <code>.apks</code> bundle, or a
        single split that installs on the target profile but crashes on yours.
      </li>
      <li>
        <strong>Version pinning</strong> — many can only fetch the latest version.
      </li>
      <li>
        <strong>Anything Google rotates</strong> — Play delivery is signed and time-limited; an extractor with a
        stale client breaks without notice.
      </li>
    </ul>

    <h2>What they can do well</h2>
    <ul>
      <li>Getting an official-signed APK of a free app onto a phone without Google services</li>
      <li>Checking whether an app is available in another region</li>
      <li>Grabbing a build quickly without setting up adb or a local downloader</li>
    </ul>

    <h2>Verify what you received — 60 seconds</h2>
    <h3>1. Signature</h3>
    <pre>
      <code>apksigner verify --print-certs downloaded.apk | head -5</code>
    </pre>
    <p>
      Expect <code>Verifies</code> and a certificate SHA-256. Compare it against the certificate of a copy you know
      is official — for example one pulled from your own device. Matching certificate = same publisher. If{" "}
      <code>Verifies</code> fails, the file was modified after signing. Discard it.
    </p>

    <h3>2. Version</h3>
    <pre>
      <code>aapt dump badging downloaded.apk | grep -E "versionCode|versionName|package:"</code>
    </pre>
    <p>
      Compare with the Play listing&apos;s &quot;Updated on&quot; date. If the extractor gave you something older,
      it served cache — fine if you wanted that version, a problem if you assumed you got the latest.
    </p>

    <h3>3. Structure and ABI</h3>
    <pre>
      <code>{`unzip -l downloaded.apk | grep -E "AndroidManifest|classes.*dex|lib/" | head
unzip -l downloaded.apk | grep "lib/" | awk -F/ '{print $2}' | sort -u`}</code>
    </pre>
    <p>
      Confirm the core files exist and the ABI list includes your device&apos;s architecture (arm64-v8a for
      essentially all modern phones).
    </p>

    <h2>Safer alternative: extract from a device you control</h2>
    <pre>
      <code>{`# 1. Find the installed APK path(s)
adb shell pm path com.example.app

# 2. Pull each path
adb pull /data/app/~~xxxx/com.example.app-yyyy/base.apk ./app-base.apk

# 3. For split apps, pull all splits and install as a bundle
adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk`}</code>
    </pre>
    <p>
      The result is byte-identical to what you have installed, official signature intact, no third party in the
      loop. This is the reference by which any extractor&apos;s output should be judged.
    </p>

    <h2>Practical rule</h2>
    <p>
      Treat an online extractor as a <strong>convenience layer, not a trust layer</strong>. The tool&apos;s
      reputation tells you nothing about the specific bytes it handed you. Signature verification is the only part
      of the chain that actually answers &quot;is this the real thing.&quot;
    </p>

    <h2>Checklist</h2>
    <ul>
      <li>Downloaded file verifies with apksigner (not &quot;DOES NOT VERIFY&quot;)</li>
      <li>Certificate SHA-256 matches a known-official copy</li>
      <li>versionCode matches or exceeds what you intended to install</li>
      <li>Core files present (AndroidManifest.xml, classes*.dex)</li>
      <li>ABI includes your device&apos;s architecture</li>
      <li>For split apps, you have all required splits (adb install-multiple)</li>
    </ul>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      Skip the verification step entirely:{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      extracts packages directly from Google Play with the original signature intact, so the certificate always
      matches the official build.
    </p>
  </>
);

export const enPosts20261028: BlogPostEntry[] = [
  {
    slug: "sideload-apk-samsung-one-ui-guide",
    title: "Sideloading an APK on a Samsung Phone: What One UI Actually Changes",
    description:
      "One UI adds Auto Blocker (on by default since One UI 6.1), per-app install permissions, and Knox policies on top of stock Android. The current sideload procedure, why the permission belongs to your file manager rather than the browser, and what each Samsung error message actually means.",
    date: "2026-10-28",
    readTime: "9 min read",
    tags: ["android", "apk", "samsung", "mobile"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-online-extractor-google-play-limits",
    title: "APK Online Extractors for Google Play: What They Can and Cannot Do",
    description:
      "Online extractors use one of three methods — proxied Play requests, cache, or re-uploads — and you cannot tell which from the page. Covers what they cannot deliver (paid, region-locked, split APKs, old versions), a 60-second signature/version/ABI verification routine, and how to extract from your own device instead.",
    date: "2026-10-28",
    readTime: "10 min read",
    tags: ["android", "apk", "google-play", "security"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261028List = toList(enPosts20261028);
