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
      You need a copy of an app you already installed from Google Play &mdash; to back it up before switching phones, to
      sideload it on an older device, or just to keep an offline installer. There&rsquo;s one catch:{" "}
      <strong>Google Play doesn&rsquo;t leave a neat <code>app.apk</code> on your phone.</strong> Thanks to Android App
      Bundles, what actually gets installed is a <em>split</em> structure &mdash; a base APK plus several feature/config
      splits. Copy one file and you get an app that won&rsquo;t install or crashes on launch.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> Modern APK extraction = find the app&rsquo;s install path + export{" "}
        <em>base.apk together with every split</em>. You do <strong>not</strong> need ADB for a no-root extraction
        &mdash; a dedicated extractor app handles it.
      </p>
    </blockquote>

    <h2>1. First, understand where Play Store apps live</h2>
    <p>Android installs user apps under a fixed location:</p>
    <pre>
      <code>{`/data/app/            ← user-installed apps
/data/app/~~random~~/com.example.app-XXXX/`}</code>
    </pre>
    <p>Inside that folder you&rsquo;ll find:</p>
    <ul>
      <li>
        <strong>base.apk</strong> &mdash; the main package (core code + resources)
      </li>
      <li>
        <strong>split_config.xxx.apk</strong> &mdash; splits, cut by CPU architecture, language, and screen density
      </li>
      <li>
        <strong>lib/</strong> &mdash; native libraries (already extracted)
      </li>
    </ul>
    <p>
      Since Android 5.0, apps ship as <strong>Split APKs</strong>: one base plus N splits. So &ldquo;extraction&rdquo;
      means grabbing <strong>base + all splits together</strong> &mdash; not just base.apk. Copy only the base and many
      apps will crash or show <em>&ldquo;App not installed.&rdquo;</em>
    </p>

    <h2>2. Method 1: Extractor apps (no root &mdash; recommended)</h2>
    <p>The easiest route. No root, no computer.</p>
    <p>
      <strong>Popular tools:</strong>
    </p>
    <ul>
      <li>
        <strong>MT Manager</strong> &mdash; the most widely used file manager with built-in app export.
      </li>
      <li>
        <strong>APK Extractor / App Backup &amp; Restore</strong> &mdash; dead-simple UI, grab from any store.
      </li>
      <li>
        <strong>SAI (Split APKs Installer)</strong> &mdash; built for splits; also extracts and bundles them.
      </li>
    </ul>
    <p>
      <strong>Steps with MT Manager:</strong>
    </p>
    <ol>
      <li>
        Open MT Manager and switch to the <strong>root directory</strong> view (it uses &ldquo;All files access,&rdquo; no
        root needed).
      </li>
      <li>
        Navigate to <code>/data/app/</code> and find the folder matching your app (folder names include the package name,
        e.g. <code>com.example.app-xxxx</code>).
      </li>
      <li>
        Long-press to select <strong>base.apk</strong> and every <strong>split_config*.apk</strong>.
      </li>
      <li>
        Copy them into <code>/sdcard/Download/xxx/</code>.
      </li>
      <li>If you want a single shareable file, use MT Manager&rsquo;s APK merge/bundle feature to combine base + splits.</li>
    </ol>
    <blockquote>
      <p>Tip: Some extractors bundle splits into a standard APK automatically &mdash; the top-rated &ldquo;APK extractor&rdquo; apps usually do.</p>
    </blockquote>

    <h2>3. Method 2: ADB (computer, no root)</h2>
    <p>Cleaner if you prefer a terminal.</p>
    <p>
      <strong>Setup:</strong> ADB installed on your computer, USB debugging enabled on the phone.
    </p>
    <pre>
      <code>{`# 1. Find the package name (if unsure)
adb shell pm list packages | grep keyword

# 2. List every install path (base + all splits show up)
adb shell pm path com.example.app

# Example output:
# package:/data/app/~~abc~~/com.example.app-xyz/base.apk
# package:/data/app/~~abc~~/com.example.app-xyz/split_config.arm64_v8a.apk
# package:/data/app/~~abc~~/com.example.app-xyz/split_config.en.apk

# 3. Pull each one
adb pull /data/app/~~abc~~/com.example.app-xyz/base.apk
adb pull /data/app/~~abc~~/com.example.app-xyz/split_config.arm64_v8a.apk
adb pull /data/app/~~abc~~/com.example.app-xyz/split_config.en.apk`}</code>
    </pre>
    <p>
      <strong>Key point:</strong> <code>pm path</code> lists <em>every</em> split &mdash; don&rsquo;t miss one.
      Reinstall the full set with <code>install-multiple</code>:
    </p>
    <pre>
      <code>{`adb install-multiple base.apk split_config.arm64_v8a.apk split_config.en.apk`}</code>
    </pre>

    <h2>4. Method 3: Root copy (fastest if you&rsquo;re rooted)</h2>
    <p>With root, extraction is just copy-paste:</p>
    <ol>
      <li>
        Open a root file manager (MT Manager in root mode, Solid Explorer, etc.) and go to <code>/data/app/</code>.
      </li>
      <li>
        Select the target folder and copy base.apk plus all splits to <code>/sdcard/</code>.
      </li>
      <li>Done.</li>
    </ol>
    <p>
      Root also reaches <strong>every</strong> app directory &mdash; handy when a no-root tool can&rsquo;t read protected
      or system apps.
    </p>

    <h2>5. Turning extracted files into a normal, installable APK</h2>
    <p>Sharing raw splits trips people up: install base.apk alone and it fails. Two options:</p>
    <ul>
      <li>
        <strong>Merge into a single APK</strong> using MT Manager or an APK editor. Note: merging{" "}
        <strong>changes the signature</strong> &mdash; apps with signature checks may refuse to launch. That&rsquo;s
        expected.
      </li>
      <li>
        <strong>Keep the split set + use a split installer</strong> (SAI). Good for dev/testing workflows.
      </li>
    </ul>

    <h2>6. Quick troubleshooting</h2>
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
          <td>&ldquo;Parse error&rdquo; after extraction</td>
          <td>Only base copied, splits missing</td>
          <td>Include all split_config files</td>
        </tr>
        <tr>
          <td>Crashes on launch</td>
          <td>Architecture mismatch (x86 split on arm)</td>
          <td>Grab the matching CPU split</td>
        </tr>
        <tr>
          <td>
            Can&rsquo;t read <code>/data/app</code>
          </td>
          <td>No-root permissions</td>
          <td>Use MT Manager / enable root</td>
        </tr>
        <tr>
          <td>Recipient can&rsquo;t install</td>
          <td>Splits not bundled</td>
          <td>Merge to single APK or use SAI</td>
        </tr>
        <tr>
          <td>Merged APK won&rsquo;t open</td>
          <td>Signature changed</td>
          <td>Normal &mdash; copy works, checks may fail</td>
        </tr>
      </tbody>
    </table>

    <h2>7. Bottom line</h2>
    <p>
      Extracting a Play Store app comes down to three steps:{" "}
      <strong>
        locate <code>/data/app</code> → export base.apk plus every split → merge into one APK if you need a single file.
      </strong>
    </p>
    <ul>
      <li>
        No root? <strong>MT Manager</strong> is the friendliest.
      </li>
      <li>
        Prefer a terminal? <strong>
          <code>adb pm path</code> + <code>install-multiple</code>
        </strong>{" "}
        is cleanest.
      </li>
      <li>Rooted? Just copy.</li>
    </ul>
    <p>
      Remember the golden rule: <strong>modern Android is Split APK &mdash; copying only the base will never be enough.</strong>{" "}
      In a hurry for one app? Downloading the matching APK by package name from <Link href="/">gptoapk.com</Link> is often
      the fastest route.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Why won't the APK I extracted from Google Play install?",
    answer:
      "Usually because only base.apk was copied and the split files were missed. Modern Android uses Split APKs: an app is a base plus several splits (architecture, language, density) that must all be installed together in one transaction. Missing any file gives you \"App not installed\" or \"Parse error.\" Export and install base.apk plus every split_config*.apk.",
  },
  {
    question: "Do I need root to extract an APK from Google Play?",
    answer:
      "Not necessarily. With tools like MT Manager or APK Extractor, granting \"All files access\" lets you read /data/app and export apps without root. Only certain protected or system apps are unreadable without root — in those cases use root or ADB instead.",
  },
  {
    question: "Why does the extracted app crash on launch?",
    answer:
      "It's almost always a CPU architecture mismatch. If your phone is arm64-v8a but you only pulled an arm or x86 split, native libraries fail to load and the app crashes. Always include the split_config.<arch>.apk that matches your device ABI.",
  },
  {
    question: "Why won't the app open after I merge the splits into a single APK?",
    answer:
      "Merging changes the APK's signature, which triggers the app's own signature check. Installing doesn't guarantee running — some games and banking apps detect the changed signature and refuse to launch. For personal backups or testing, installing the original splits with SAI is more reliable.",
  },
  {
    question: "Can I extract an APK without root and without a computer?",
    answer:
      "Yes. Use an on-device APK extractor app: grant All files access, browse installed apps, and export directly on your phone. For a single file, choose an extractor that bundles splits into a standard APK.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      If you&rsquo;ve ever downloaded an app from a third-party source and ended up with a folder of oddly named files
      &mdash; <code>base.apk</code>, <code>split_config.arm64_v8a.apk</code>, <code>split_config.en.apk</code> &mdash;
      you know the pain. Tapping any single one fails with <em>&ldquo;App not installed&rdquo;</em> or{" "}
      <em>&ldquo;There was a problem parsing the package.&rdquo;</em>
    </p>
    <p>
      That&rsquo;s a <strong>Split APK</strong>. It&rsquo;s a packaging method Android introduced in 5.0 and that Google
      Play has enforced since 2021. This guide explains splits clearly and gives you the{" "}
      <strong>step-by-step install methods that actually work</strong>.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> Split APKs can&rsquo;t be installed one by one. You must submit <em>all</em> splits to
        the system at once &mdash; via SAI or <code>adb install-multiple</code>.
      </p>
    </blockquote>

    <h2>1. What is a Split APK, and why split at all?</h2>
    <p>
      A traditional APK is one big file bundling native libraries for every CPU architecture, strings for every language,
      and images for every screen density. The problem: <strong>your phone downloads tons of resources it will never use.</strong>
    </p>
    <p>Google&rsquo;s fix is unbundling (App Bundles):</p>
    <ul>
      <li>
        <strong>base.apk</strong> &mdash; core code and resources every device needs. <strong>Required.</strong>
      </li>
      <li>
        <strong>split_config.&lt;arch&gt;.apk</strong> &mdash; cut by CPU architecture (<code>arm64_v8a</code>,{" "}
        <code>x86_64</code>&hellip;). You only need yours.
      </li>
      <li>
        <strong>split_config.&lt;lang&gt;.apk</strong> &mdash; cut by language (<code>en</code>, <code>zh</code>&hellip;).
      </li>
      <li>
        <strong>split_config.&lt;density&gt;.apk</strong> &mdash; cut by screen density (<code>xxhdpi</code>&hellip;).
      </li>
    </ul>
    <p>
      The upside: much smaller downloads. <strong>The cost:</strong> the system must assemble all splits together at
      install time &mdash; miss one and it won&rsquo;t assemble.
    </p>
    <p>
      Critical rule: <strong>base + all splits must belong to the same app, same version, same signature.</strong> Mixing
      versions fails outright.
    </p>

    <h2>2. Before installing: make sure your split set is complete</h2>
    <p>You should be looking at a group of files, not one:</p>
    <pre>
      <code>{`com.example.app/
├── base.apk                    ← core, required
├── split_config.arm64_v8a.apk  ← your CPU architecture
├── split_config.xxhdpi.apk     ← screen density
└── split_config.en.apk         ← language (optional)`}</code>
    </pre>
    <p>
      <strong>Find your phone&rsquo;s CPU architecture</strong> (decides which arch split you need): check Settings →
      About phone → processor info, or use CPU-Z / AIDA64. Since ~2020, nearly all phones are{" "}
      <strong>arm64-v8a</strong>.
    </p>
    <p>
      <strong>Minimum needed:</strong> base + the matching architecture split. Density and language splits can usually be
      skipped (base carries defaults), but <strong>the architecture split is mandatory</strong> &mdash; skip it and you get
      crashes.
    </p>

    <h2>3. Method 1: SAI (Split APKs Installer) &mdash; recommended, no PC</h2>
    <p>SAI exists purely for split apps. GUI, right on your phone.</p>
    <p>
      <strong>Steps:</strong>
    </p>
    <ol>
      <li>
        Install <strong>SAI</strong> from a trusted source (open-source, available on GitHub).
      </li>
      <li>Put the downloaded split folder in your phone storage.</li>
      <li>
        Open SAI → tap &ldquo;Install APK&rdquo; → select <strong>the whole folder</strong> (or all splits together).
      </li>
      <li>SAI auto-detects base and splits &mdash; tap &ldquo;Install.&rdquo;</li>
      <li>If you hit a signature conflict, uninstall the old version first, then install.</li>
    </ol>
    <p>
      <strong>Note:</strong> SAI needs &ldquo;Install unknown apps&rdquo; permission. Some skins (MIUI, etc.) also
      require enabling SAI in Developer Options.
    </p>

    <h2>4. Method 2: ADB install-multiple &mdash; cleanest for desktop users</h2>
    <p>One command installs the whole set, no phone-side app.</p>
    <pre>
      <code>{`# Put all splits in one folder, cd into it
cd /path/to/com.example.app/

# Submit base + all splits at once
adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk split_config.en.apk`}</code>
    </pre>
    <p>Or with a wildcard if there are many:</p>
    <pre>
      <code>{`adb install-multiple base.apk split_config.*.apk`}</code>
    </pre>
    <p>
      <strong>Error reference:</strong>
    </p>
    <table>
      <thead>
        <tr>
          <th>ADB error</th>
          <th>Meaning</th>
          <th>Fix</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INSTALL_FAILED_INVALID_APK</td>
          <td>Incomplete or mismatched splits</td>
          <td>Ensure base + splits are same version</td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_UPDATE_INCOMPATIBLE</td>
          <td>Signature conflict</td>
          <td>
            <code>adb uninstall &lt;pkg&gt;</code> then reinstall
          </td>
        </tr>
        <tr>
          <td>INSTALL_FAILED_NO_MATCHING_ABIS</td>
          <td>Arch split doesn&rsquo;t fit phone</td>
          <td>Use arm64-v8a or the correct arch</td>
        </tr>
        <tr>
          <td>INSTALL_PARSE_FAILED_UNEXPECTED_EXCEPTION</td>
          <td>Corrupt file</td>
          <td>Redownload</td>
        </tr>
      </tbody>
    </table>

    <h2>5. Method 3: Merge into a single APK, then install normally</h2>
    <p>If you&rsquo;d rather have &ldquo;one file to rule them all,&rdquo; merge the splits into a standard APK:</p>
    <ul>
      <li>
        <strong>MT Manager:</strong> long-press base.apk → open with the APK editor → use &ldquo;merge split packages /
        load external package&rdquo; → save.
      </li>
      <li>
        <strong>APKEditor</strong> (open source): CLI-oriented, good for batches.
      </li>
    </ul>
    <pre>
      <code>{`java -jar APKEditor.jar m -i ./com.example.app/ -o merged.apk`}</code>
    </pre>
    <p>
      The result is a single tappable APK. <strong>But merging changes the signature</strong> &mdash; apps with signature
      checks (some games, banking apps) may refuse to open. It installs, but doesn&rsquo;t always run &mdash; a normal
      tradeoff.
    </p>

    <h2>6. If it won&rsquo;t install, check in this order</h2>
    <ol>
      <li>
        <strong>Are all splits present?</strong> Did you grab only base and skip the arch split?
      </li>
      <li>
        <strong>Right architecture?</strong> arm64 phone + x86 split = guaranteed failure. Use arm64_v8a.
      </li>
      <li>
        <strong>Same version?</strong> Don&rsquo;t mix splits from different downloads.
      </li>
      <li>
        <strong>Signature conflict?</strong> Fully uninstall the old copy (including clones/work profiles), reboot,
        reinstall.
      </li>
      <li>
        <strong>Corrupt download?</strong> Verify file sizes, redownload.
      </li>
    </ol>

    <h2>7. Bottom line</h2>
    <p>
      Split APK installation in one sentence:{" "}
      <strong>submit all splits (base + arch + density + language) to the system at once &mdash; never one by one.</strong>
    </p>
    <ul>
      <li>
        On phone: <strong>use SAI</strong>, select the whole folder, done in one shot.
      </li>
      <li>
        On desktop: <strong>
          <code>adb install-multiple</code>
        </strong>
        , one line, cleanest.
      </li>
      <li>
        Want a single file: <strong>merge with MT Manager / APKEditor</strong> &mdash; signatures change.
      </li>
    </ul>
    <p>
      Remember the two most common traps &mdash; <strong>a missing architecture split guarantees crashes, and mixed
      versions always fail.</strong> Nail those and Split APKs go from &ldquo;a confusing pile of files&rdquo; to
      &ldquo;installed in three steps.&rdquo; Need one app fast? Grab the matching APK by package name from{" "}
      <Link href="/">gptoapk.com</Link>.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Can I install Split APKs one file at a time?",
    answer:
      "No. A Split APK is a base.apk plus several splits, and the system must assemble all of them in a single install transaction — missing any file fails. Use SAI and select the whole folder, or adb install-multiple to submit every file at once.",
  },
  {
    question: "I get \"App not installed\" when installing a Split APK — what now?",
    answer:
      "Check that all splits are present (especially the architecture split), that versions match, and that there's no signature conflict. The most common cause is installing base only and missing a split, or having a same-package app with a different signature already installed. Fully uninstall the old copy (including clones/work profiles), then install the full set with SAI.",
  },
  {
    question: "How do I know which architecture split to use?",
    answer:
      "Check your phone's CPU architecture (ABI): Settings → About phone → processor info, or use CPU-Z / AIDA64. Nearly all phones since 2020 are arm64-v8a, matching split_config.arm64_v8a.apk. Installing the wrong arch gives INSTALL_FAILED_NO_MATCHING_ABIS or a launch crash.",
  },
  {
    question: "What's the difference between a Split APK and a normal APK?",
    answer:
      "A normal APK packs all architectures, languages, and densities into one file — larger but simple to install. A Split APK ships only the resources a device needs, so downloads are smaller and storage is saved, but installation requires submitting base plus all relevant splits together — you can't install a single file.",
  },
  {
    question: "After merging splits into one file, the app won't open — why?",
    answer:
      "Merging re-signs the APK, which trips the app's own signature check. Installing successfully doesn't mean it will run — some games and banking apps refuse to launch on a mismatched signature, which is normal. For personal use or testing, installing the original splits with SAI is more reliable.",
  },
];

export const enPosts20261016: BlogPostEntry[] = [
  {
    slug: "how-to-extract-apk-from-google-play",
    title: "How to Extract an APK from Google Play (Complete 2026 Guide)",
    description:
      "Google Play doesn't leave an APK on your phone — modern Android installs split app bundles. Here's how to extract a full, installable APK from any installed Play Store app, with and without root, using tools or ADB.",
    date: "2026-10-16",
    readTime: "9 min read",
    tags: ["android", "apk", "google-play", "guide", "tutorial"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "how-to-install-split-apks-on-android",
    title: "How to Install Split APKs on Android (Complete 2026 Guide)",
    description:
      "Downloaded an app that's a pile of base.apk and split_config files that won't install? That's a Split APK. Here's exactly how to install splits on Android — with SAI, ADB install-multiple, or by merging into one APK.",
    date: "2026-10-16",
    readTime: "9 min read",
    tags: ["android", "apk", "split-apk", "guide", "tutorial"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261016List = toList(enPosts20261016);
