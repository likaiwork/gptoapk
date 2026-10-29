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
    question: "Can I downgrade an APK without a computer?",
    answer:
      "Usually, if the old and new packages share the same signing key and the OEM has not blocked it. A file manager with overwrite-install support will show a downgrade confirmation prompt you can accept. Results vary by manufacturer; adb install -d is the reliable route.",
  },
  {
    question: "Does downgrading lose app data?",
    answer:
      "adb install -d -r keeps data, provided the signatures match. Uninstalling and reinstalling always loses it. Even the in-place path carries a hidden risk: if the old build cannot read the database schema the newer version migrated to, it crashes on launch and you end up clearing data anyway.",
  },
  {
    question: "Can I upgrade again after downgrading?",
    answer:
      "Yes. Install the current APK normally, as long as the downgrade did not corrupt the database. Confirm the old version works, export a backup, then upgrade.",
  },
  {
    question: "Where do I find older APK versions?",
    answer:
      "APKMirror and APKPure keep broad version archives. Verify the certificate fingerprint on anything you download, since re-signing is common on aggregator sites. For the current build, resolving the Play Store link through gptoapk.com gets you the store's original artifact.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Does a matching signature guarantee an APK is safe?",
    answer:
      "Largely yes. A matching signature means the package came from the keyholder, so third-party injection is extremely unlikely. The remaining risk is the developer shipping aggressive analytics or bundled SDKs, which is a judgment call rather than a verification problem.",
  },
  {
    question: "Why does the same app show different signatures from different sites?",
    answer:
      "Three causes, in order of frequency: the download site re-signed the package to inject ads; the app uses Google Play App Signing so non-Play builds carry a different key; or different distribution channels use different keys. The first accounts for most cases.",
  },
  {
    question: "Do I need to verify apps installed from the Play Store?",
    answer:
      "No. Play enforces server-side signature checks and refuses tampered updates at install time. Verification matters for APKs obtained outside official channels.",
  },
  {
    question: "Where do I find the official signing fingerprint?",
    answer:
      "The developer's security page, GitHub release notes, or the app's about screen. If none exist, let the device check for you: install from the official channel first, then attempt an overwrite with the downloaded package. A signature mismatch is rejected outright.",
  },
];

const ARTICLE1 = (
  <>
    <h1>APK Signature Verification: How to Prove a Downloaded Package Has Not Been Tampered With</h1>

    <p>
      Downloading an APK from a third-party site carries one real risk, and it is not whether it will install. It is whether
      the thing you install is the original build or someone&apos;s modified version with an ad SDK, a silent subscription, or a
      malware stub bolted on.
    </p>

    <p>
      Verifying authenticity does not require reverse-engineering skill. It requires three checks in the right order, and an
      understanding of what each one actually proves.
    </p>

    <p>
      <strong>The short version:</strong> structure rules out a broken download, the certificate rules out a forged origin, and
      content inspection rules out injected components. Skip the certificate step and you have verified nothing that matters.
    </p>

    <h2>1. Why a hash check is not enough</h2>

    <p>
      The common advice — compare the SHA256 against the published value — proves less than people think. A hash confirms the
      file was not corrupted in transit. It says nothing about who created it, because anyone who modifies a package can
      publish the matching hash on their own site.
    </p>

    <p>
      Only the signing certificate proves origin. Android apps are signed with a private key the developer controls. Without
      that key, you cannot produce a package whose certificate matches the official one.
    </p>

    <h2>2. Step one: is the file intact?</h2>

    <p>An APK is a ZIP archive. A truncated download fails as a ZIP, which surfaces on the device as &quot;There was a problem parsing the package.&quot;</p>

    <pre>
      <code>unzip -t app.apk | tail -3{`\n# `}&quot;No errors detected&quot; means the archive structure is sound</code>
    </pre>

    <p>If you have a published hash to compare against:</p>

    <pre>
      <code>shasum -a 256 app.apk        {`# macOS / Linux`}{`\n`}sha256sum app.apk            {`# Linux`}{`\n`}Get-FileHash app.apk -Algorithm SHA256   {`# Windows PowerShell`}</code>
    </pre>

    <p>
      Compare against the value published by <strong>the developer&apos;s own site or GitHub release page</strong>. Never against
      the hash printed on the download site itself — the file and the hash get replaced together, which makes the comparison
      meaningless.
    </p>

    <h2>3. Step two: who signed this package?</h2>

    <p>This is the check that matters. The most reliable tool is apksigner, shipped with the Android SDK:</p>

    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>

    <p>
      The output includes <code>Signer #1 certificate SHA-256 digest:</code>, which is the fingerprint to compare against the
      official value. apksigner reads the v2 and v3 signing blocks directly, so it detects tampering that older tools miss.
    </p>

    <p>Without the SDK, keytool works anywhere Java is installed:</p>

    <pre>
      <code>keytool -printcert -jarfile app.apk</code>
    </pre>

    <p>
      Its limitation: it reads the v1 JAR signature only and cannot detect tampering inside the v2/v3 block. Use it as a quick
      check, not as a definitive answer.
    </p>

    <ul>
      <li>
        <strong>SHA-256 matches the official value</strong> → authentic build, install it
      </li>
      <li>
        <strong>Same subject, different fingerprint</strong> → re-signed, the classic injection pattern, discard
      </li>
      <li>
        <strong>More than one signer</strong> → a second signature was appended, discard
      </li>
      <li>
        <strong>DOES NOT VERIFY</strong> → signature is broken or forged, discard
      </li>
    </ul>

    <p>
      <strong>A shortcut worth knowing:</strong> if the official version is already installed on your phone, just try installing
      the downloaded APK over it. Android refuses to replace an app with a package signed by a different key, so a successful
      overwrite is itself proof the signatures match. &quot;App not installed&quot; when you expected an update is a signature
      mismatch.
    </p>

    <h2>4. Step three: what is actually inside?</h2>

    <pre>
      <code>unzip -l app.apk | less{`\n`}aapt2 dump badging app.apk | grep uses-permission</code>
    </pre>

    <p>Signals worth investigating:</p>

    <ul>
      <li>
        <code>.dex</code> or <code>.jar</code> files under <code>assets/</code> — dynamically loaded code, often ad or plugin
        payloads
      </li>
      <li>
        Native libraries under <code>lib/</code> that differ from the official build — core logic replaced
      </li>
      <li>Extra SDK resource directories absent from the official package</li>
      <li>
        Multiple signing blocks in <code>META-INF/</code> — evidence of re-signing
      </li>
      <li>
        Permissions that do not match function: a flashlight app requesting READ_SMS alongside
        BIND_ACCESSIBILITY_SERVICE is the textbook malware profile
      </li>
    </ul>

    <h2>5. Online scanners</h2>

    <p>
      VirusTotal accepts APK uploads up to 650 MB and runs them past 70+ engines. Koodous is Android-specific and shows
      behavioral traits rather than just signatures. The caveat is operational rather than technical:
      <strong>uploading publishes the file</strong>. Never upload a banking, messaging, or enterprise app.
    </p>

    <h2>6. The full workflow</h2>

    <ol>
      <li>Download the APK</li>
      <li>unzip -t — broken? redownload</li>
      <li>sha256 vs published value — mismatch? discard</li>
      <li>apksigner --print-certs — mismatch? discard</li>
      <li>aapt2 dump badging — implausible permissions? caution</li>
      <li>Install</li>
    </ol>

    <p>Three minutes once you have done it a few times. Considerably less effort than cleaning up after a malicious install.</p>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      When you pull a package directly from a Play Store link with{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>
      , you start from the store&apos;s original artifacts rather than a third-party re-upload, which removes most of the tampering
      risk before verification begins.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <h1>Downgrading an Android App: Why It Fails and How to Do It Without Losing Data</h1>

    <p>
      Wanting the previous version of an app is a common and reasonable request. The redesign is worse, a feature was removed,
      battery drain doubled. The APK is easy to find. Getting it installed is where things stop working.
    </p>

    <p>
      The failure is almost always one of two messages: &quot;App not installed,&quot; or a version-downgrade rejection. Neither
      means the file is broken. Both mean a protection mechanism is doing its job.
    </p>

    <p>
      <strong>The short version:</strong> matching signatures allow an in-place downgrade with <code>adb install -d</code>.
      Differing signatures require a full uninstall, which wipes app data — so export first.
    </p>

    <h2>1. Decide which path you are on first</h2>

    <ul>
      <li>
        <strong>&quot;App not installed,&quot; no further detail</strong> — Android rejects a lower versionCode. Fixable with
        <code> adb install -d</code> or a reinstall.
      </li>
      <li>
        <strong>&quot;App not installed&quot; with a signature conflict</strong> — the two packages were signed by different
        keys. Uninstall is mandatory; data is lost.
      </li>
      <li>
        <strong>&quot;There was a problem parsing the package&quot;</strong> — corrupt or truncated download. Redownload and
        verify the hash.
      </li>
      <li>
        <strong>Installs fine, crashes on launch</strong> — the newer database schema the old build cannot read. Clear app data.
      </li>
    </ul>

    <p>Everything hinges on one fact: do the two packages share a signing key? Check before doing anything else.</p>

    <pre>
      <code>aapt2 dump badging old.apk | head -3{`\n`}aapt2 dump badging new.apk | head -3{`\n\n`}keytool -printcert -jarfile old.apk | grep -A1 &quot;SHA256&quot;{`\n`}keytool -printcert -jarfile new.apk | grep -A1 &quot;SHA256&quot;</code>
    </pre>

    <p>Matching fingerprints → Path A (preserve data). Different fingerprints → Path B (uninstall, data lost).</p>

    <h2>2. Path A: downgrade in place with adb</h2>

    <pre>
      <code>adb devices{`\n`}adb install -d -r app-old.apk</code>
    </pre>

    <p>
      Both flags are required: <code>-r</code> reinstalls over the existing package, <code>-d</code> permits a lower
      versionCode. Without <code>-d</code> you get INSTALL_FAILED_VERSION_DOWNGRADE; without <code>-r</code>,
      INSTALL_FAILED_ALREADY_EXISTS.
    </p>

    <ul>
      <li>
        <code>INSTALL_FAILED_UPDATE_INCOMPATIBLE</code> — signature mismatch, not fixable, switch to Path B
      </li>
      <li>
        <code>INSTALL_FAILED_INSUFFICIENT_STORAGE</code> — needs roughly 2.5× the APK size free
      </li>
      <li>
        <code>INSTALL_FAILED_USER_RESTRICTED</code> — confirmation required on the device
      </li>
      <li>
        <code>INSTALL_FAILED_TEST_ONLY</code> — package carries the testOnly flag, add <code>-t</code>
      </li>
    </ul>

    <p>
      Without a computer, some devices accept a downgrade through a file manager that supports overwrite installs. The system
      shows a downgrade confirmation you can accept. Success rates vary by ROM; adb is dependable.
    </p>

    <h2>3. Path B: uninstall and reinstall</h2>

    <p>
      When signatures differ there is no shortcut. Uninstalling wipes <code>/data/data/&lt;package&gt;/</code>, so export what you
      can first.
    </p>

    <pre>
      <code>adb backup -apk -shared -all -f backup.ab{`\n`}adb pull /sdcard/Android/data/com.example.app/files ./backup-files{`\n\n`}adb uninstall com.example.app{`\n`}adb install app-old.apk</code>
    </pre>

    <p>
      Note that <code>adb backup</code> now returns empty archives for most apps on Android 12 and later. The reliable option is
      the app&apos;s own export or cloud sync — check the settings menu for &quot;export,&quot; &quot;backup,&quot; or
      &quot;transfer&quot; before uninstalling anything.
    </p>

    <h2>4. Do not skip this: disable auto-update</h2>

    <p>If you skip it, the store will silently push the app back to the current version, usually within a day.</p>

    <ul>
      <li>Play Store: app page → three-dot menu → uncheck &quot;Enable auto-update&quot;</li>
      <li>OEM stores (Huawei, Xiaomi, OPPO, vivo): disable auto-update in store settings; some devices also pin per-app versions</li>
      <li>Disabling auto-update does not stop manual update prompts, and some stores nag periodically</li>
    </ul>

    <h2>5. Four real scenarios</h2>

    <p>
      <strong>Banking and payment apps.</strong> Not worth downgrading. Old builds usually have their API endpoints disabled
      server-side, so the app demands an update regardless of what you install. The security patch gap makes it a bad idea on
      its own terms.
    </p>

    <p>
      <strong>A redesign you dislike.</strong> Common with social and video apps. Disable auto-update, run
      <code> adb install -d</code>, then archive the APK somewhere permanent — once the store stops serving that version, it is
      effectively gone.
    </p>

    <p>
      <strong>A third-party build that will not install.</strong> Likely re-signed with injected ads. Compare the certificate
      fingerprint against the official build; if it does not match, discard it.
    </p>

    <p>
      <strong>Post-update crashes.</strong> The fastest fix is not a downgrade, it is clearing data:
      <code> adb shell pm clear &lt;package&gt;</code>. Most post-update crashes come from stale data conflicting with the new
      schema.
    </p>

    <h2>6. Checklist before you start</h2>

    <ul>
      <li>Compared certificate fingerprints of old and new APKs</li>
      <li>Confirmed whether the app has cloud sync or export, and used it if so</li>
      <li>Free storage exceeds APK size × 2.5</li>
      <li>Auto-update disabled in every store that manages this app</li>
      <li>Old APK saved permanently, not just in the Downloads folder</li>
    </ul>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      When you need the current build, resolving the Play Store link through{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      gives you the store&apos;s original artifact, with a signature matching the official release — which avoids the
      re-signing problems that break in-place downgrades.
    </p>
  </>
);

const ARTICLE3 = (
  <>
    <h1>Backing Up Android App Data Before Switching Phones: What Actually Survives</h1>

    <p>
      The worst moment in a phone migration is not the transfer itself. It is two days later, when you open an app on the new
      device and find an empty account, an empty inbox, an empty note list.
    </p>

    <p>
      The data existed. It just was not included in what you moved, because Android stores app data in layers and only some
      layers are covered by default backup.
    </p>

    <p>
      <strong>The short version:</strong> local databases and session state are the layer that matters, and only two mechanisms
      reach it — the app&apos;s own export, and the system backup service. Stack all three layers and most apps are covered.
    </p>

    <h2>1. Where app data actually lives</h2>

    <ul>
      <li>
        <code>/data/data/&lt;package&gt;/</code> — login tokens, SQLite databases, preferences. Deleted on uninstall;
        inaccessible without root.
      </li>
      <li>
        <code>/sdcard/Android/data/&lt;package&gt;/</code> — cache, downloads, media produced by the app. Deleted on most devices.
      </li>
      <li>
        <strong>The app&apos;s own servers</strong> — chat history, saved items, cloud documents. Tied to the account, not the
        device.
      </li>
    </ul>

    <p>
      The layer that matters is the first one. The second is mostly re-downloadable. The third is not your problem, as long as
      the account still works.
    </p>

    <h2>2. Layer one: Google&apos;s automatic backup</h2>

    <p>Check Settings → System → Backup → confirm &quot;Back up to Google Drive&quot; is on. Force a run rather than waiting:</p>

    <pre>
      <code>adb shell bmgr backupnow --all</code>
    </pre>

    <p>What it does not cover:</p>

    <ul>
      <li>Apps that opt out with allowBackup=&quot;false&quot; — banking, payment, and some messaging apps by default</li>
      <li>Any app whose backup exceeds 25 MB, which is skipped entirely</li>
      <li>Devices without Google services, where the equivalent is Huawei Cloud, Mi Cloud, or OPPO Cloud</li>
      <li>Cross-brand restores — OEM cloud services usually restore only on the same brand</li>
    </ul>

    <h2>3. Layer two: the app&apos;s own export (most complete)</h2>

    <p>
      The most reliable path is the app&apos;s built-in transfer or export feature. It knows which data matters and serializes it
      properly.
    </p>

    <ul>
      <li>WeChat: Me → Settings → General → Chat History Migration &amp; Backup</li>
      <li>WhatsApp: Settings → Chats → Chat backup, or &quot;Transfer chats&quot; for device-to-device</li>
      <li>Browsers: sign in with the same account, or export bookmarks as HTML</li>
      <li>Notes (Notion, Evernote): settings → export all, usually a ZIP or Markdown archive</li>
      <li>
        Password managers (Bitwarden, 1Password): encrypted JSON. <strong>CSV is plaintext — delete it immediately</strong>
      </li>
      <li>Authenticators: confirm cloud sync, or export the TOTP seeds as a QR code</li>
    </ul>

    <p>
      Two rules: if a settings menu contains the word &quot;export,&quot; &quot;backup,&quot; or &quot;transfer,&quot; use it.
      And store the output off the old phone — a backup on the phone you are about to wipe is not a backup.
    </p>

    <h2>4. Layer three: adb backup (heavily restricted now)</h2>

    <pre>
      <code>adb backup -apk -shared -all -f backup.ab{`\n`}adb restore backup.ab</code>
    </pre>

    <ul>
      <li>Most apps on Android 12+ refuse it and return empty archives</li>
      <li>The archive is all-or-nothing; there is no selective restore</li>
      <li>Restoring overwrites everything currently on the device</li>
      <li>Financial apps often store nothing backup-able by design</li>
    </ul>

    <p>Reasonable use case: an Android 11 or older device, and only where the apps in question permit it.</p>

    <h2>5. The migration order that works</h2>

    <ol>
      <li>Export data from each important app using its own built-in feature</li>
      <li>Copy exports to a computer or an encrypted cloud folder</li>
      <li>Sign in on the new device and import / restore</li>
      <li>Verify the data is actually there — open the app, check history and files</li>
      <li>Re-enable system backup on the new device</li>
      <li>Only now, factory reset or sell the old phone</li>
    </ol>

    <p>Step 4 is the one people skip. Verify first, wipe second. The reverse order has no fallback.</p>

    <h2>6. Five mistakes that cost people real data</h2>

    <ul>
      <li>
        <strong>WeChat migration needs the same Wi-Fi and an unlocked screen.</strong> A large chat history takes hours; plug both
        phones in.
      </li>
      <li>
        <strong>Passwords exported as CSV.</strong> Plaintext. Use encrypted JSON and delete immediately.
      </li>
      <li>
        <strong>Confusing app data backup with media backup.</strong> Photos live in <code>/sdcard/DCIM/</code>, outside app data.
        Check Downloads and the WeChat file directory too.
      </li>
      <li>
        <strong>Restoring onto a newer Android version.</strong> Data from an Android 11 app may fail to import on Android 15 due
        to schema or permission changes.
      </li>
      <li>
        <strong>Forgetting the authenticator.</strong> TOTP seeds in Google Authenticator or Microsoft Authenticator are the most
        overlooked migration data. Losing them locks you out of every 2FA account.
      </li>
    </ul>

    <h2>7. Pre-migration checklist</h2>

    <ul>
      <li>Messaging history migrated or exported to a computer</li>
      <li>Photos, videos, app-produced files, Downloads copied or synced</li>
      <li>Password manager exported in encrypted format, stored off-device</li>
      <li>Authenticator cloud sync confirmed, or seeds exported</li>
      <li>Browser bookmarks and passwords synced to an account</li>
      <li>Notes and to-do apps exported</li>
      <li>A written record of which accounts use which phone number</li>
      <li>New device verified: data is present in each app</li>
      <li>Old device factory reset only after all of the above</li>
    </ul>

    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      When reinstalling apps on the new device, use{" "}
      <Link href="https://www.gptoapk.com" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      to pull the original package from Google Play, with a version and signature matching the official release — which avoids
      the version-mismatch failures that break data imports.
    </p>
  </>
);

export const enPosts20261029b: BlogPostEntry[] = [
  {
    slug: "apk-signature-verification-prove-package-not-tampered",
    title: "APK Signature Verification: How to Prove a Downloaded Package Has Not Been Tampered With",
    description:
      "A hash check proves integrity, not origin. The three-layer workflow that does prove it: unzip -t for structure, sha256 against the developer's published value, apksigner for the certificate fingerprint, aapt2 for permissions. Plus a shortcut that makes Android verify the signature for you.",
    date: "2026-10-29",
    readTime: "9 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "downgrading-android-app-why-it-fails-and-how-to-do-it",
    title: "Downgrading an Android App: Why It Fails and How to Do It Without Losing Data",
    description:
      "Installing an older APK usually fails with 'App not installed' — not because the file is bad, but because Android blocks version downgrades by default. Compare signatures first: matching keys allow adb install -d with data intact, different keys require an uninstall. Includes the full error-code table and backup steps.",
    date: "2026-10-29",
    readTime: "10 min read",
    tags: ["android", "apk", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
  {
    slug: "backing-up-android-app-data-before-switching-phones",
    title: "Backing Up Android App Data Before Switching Phones: What Actually Survives",
    description:
      "Most migrations fail quietly: photos transfer, apps reinstall, and the chat history, notes, and login sessions are gone. Here is which data lives where on Android, what each backup layer can and cannot capture, the migration order that works, and five mistakes that cost people real data.",
    date: "2026-10-29",
    readTime: "10 min read",
    tags: ["android", "backup", "migration"],
    content: ARTICLE3,
  },
];

export const enPosts20261029bList = toList(enPosts20261029b);
