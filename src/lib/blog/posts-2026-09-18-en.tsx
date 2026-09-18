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
      You found the APK you need on a third-party site. It has the right name, the right icon, the right version number.
      But <strong>anyone can open an APK, change the code, and re-upload it under the same name.</strong> Version numbers and
      icons prove nothing.
    </p>
    <p>
      The only way to know the file on your disk is the <em>real</em> app is to <strong>verify it yourself</strong>: compare
      its <strong>SHA-256 checksum</strong> against the official source, and inspect its <strong>signing certificate</strong>.
      Both take under a minute once you know the commands.
    </p>

    <blockquote>
      <p>
        <strong>The core rule:</strong> <strong>a matching checksum proves the file wasn&apos;t tampered with; a valid
        signature proves who built it.</strong> You want both.
      </p>
    </blockquote>

    <h2>1. Why checksums and signatures matter</h2>
    <p>An APK is just a ZIP archive. Anyone with the file can:</p>
    <ul>
      <li>Decompile it, inject adware or a backdoor, and recompile.</li>
      <li>Re-sign it with their own key so Android will still install it.</li>
      <li>Keep the same name, icon, and version string.</li>
    </ul>
    <p>Two defenses catch this:</p>
    <ul>
      <li>
        <strong>Checksum (SHA-256):</strong> a fingerprint of the exact bytes. If even one byte changed, the hash is
        completely different.
      </li>
      <li>
        <strong>Signature:</strong> Android requires every APK to be cryptographically signed. The signer&apos;s certificate
        is embedded and can&apos;t be faked without the private key.
      </li>
    </ul>
    <p>Verify the checksum → the file is intact. Verify the signature → it came from the right developer.</p>

    <h2>2. Get the official checksum first</h2>
    <p>
      A checksum only helps if you compare against a <strong>trusted reference</strong>. Get it from:
    </p>
    <ul>
      <li>The developer&apos;s official site (many publish SHA-256 next to the download).</li>
      <li>The app&apos;s official GitHub Releases page.</li>
      <li>APKMirror / APKPure, which show the checksum on the file page.</li>
    </ul>
    <p>
      <strong>If the site gives you no checksum at all, treat that as a yellow flag</strong> — you&apos;ll have to lean
      entirely on the signature check.
    </p>

    <h2>3. Compute the SHA-256 on your computer</h2>
    <p>Download the APK, then run the right command.</p>
    <p>
      <strong>Windows (CMD):</strong>
    </p>
    <pre>
      <code>certutil -hashfile app.apk SHA256</code>
    </pre>
    <p>
      <strong>Windows (PowerShell native):</strong>
    </p>
    <pre>
      <code>Get-FileHash .\app.apk -Algorithm SHA256</code>
    </pre>
    <p>
      <strong>macOS:</strong>
    </p>
    <pre>
      <code>shasum -a 256 app.apk</code>
    </pre>
    <p>
      <strong>Linux:</strong>
    </p>
    <pre>
      <code>sha256sum app.apk</code>
    </pre>
    <p>
      Compare the output to the official value, character by character. <strong>Case doesn&apos;t matter; every character
      does.</strong> A single mismatch means the file is not the one the publisher released — delete it.
    </p>
    <blockquote>
      <p>Tip: if the checksum is truncated or formatted with spaces/dashes on the website, strip those before comparing.</p>
    </blockquote>

    <h2>4. Verify the signature</h2>
    <p>
      The checksum ties you to a specific file; the signature ties that file to a developer. Use Android&apos;s own tools.
    </p>
    <p>
      <strong>With apksigner (Android SDK build-tools):</strong>
    </p>
    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>
    <p>
      This prints the signer&apos;s certificate: the <strong>DN (distinguished name)</strong> and <strong>SHA-256
      fingerprint</strong> of the signing cert. Compare the fingerprint against the one shown on the app&apos;s official page
      or Play Store listing.
    </p>
    <p>
      <strong>With keytool (bundled with the JDK):</strong>
    </p>
    <pre>
      <code>keytool -printcert -jarfile app.apk</code>
    </pre>
    <p>
      This also outputs the certificate fingerprint. The <strong>SHA-256 fingerprint must match</strong> the official
      app&apos;s.
    </p>
    <p>
      <strong>Why this matters:</strong> if a repackager modified the APK, they had to strip the original signature and
      re-sign with <em>their</em> key. The fingerprint will differ — that&apos;s your tell.
    </p>

    <h2>5. Verify on the phone itself</h2>
    <p>No computer handy? There are apps for it:</p>
    <ul>
      <li>
        <strong>Signature checkers</strong> show the signing certificate fingerprint of an APK.
      </li>
      <li>
        <strong>App Inspector</strong> tools list the installed package&apos;s signature.
      </li>
      <li>Some file managers compute SHA-256 directly from a downloaded file.</li>
    </ul>
    <p>
      Compare the fingerprint shown against the official one. <strong>A different signing fingerprint than the official app
      = a repackaged build.</strong>
    </p>
    <blockquote>
      <p>
        Note: Android blocks installing an APK whose signature doesn&apos;t match the already-installed version of the same
        package. If you get a &quot;signature mismatch&quot; error when updating, that&apos;s this exact mechanism — often a
        sign the new file is from a different signer.
      </p>
    </blockquote>

    <h2>6. Red flags of a repackaged APK</h2>
    <p>Even before you run commands, watch for:</p>
    <ul>
      <li>
        <strong>File size</strong> noticeably larger than the official build.
      </li>
      <li>
        <strong>Different developer name</strong> in the package info (<code>aapt dump badging app.apk</code> shows it).
      </li>
      <li>
        <strong>Same icon/name</strong> as a popular app, unknown publisher.
      </li>
      <li>
        <strong>Requests permissions</strong> far beyond its function (a calculator asking for SMS).
      </li>
      <li>
        <strong>No checksum</strong> published anywhere reliable.
      </li>
      <li>
        <strong>HTTP (not HTTPS)</strong> download link.
      </li>
    </ul>
    <p>Any one of these plus a mismatched hash or cert = throw it away.</p>

    <h2>7. A 60-second verification recipe</h2>
    <ol>
      <li>
        Download the APK from a <strong>trusted</strong> source.
      </li>
      <li>
        Grab the <strong>official SHA-256</strong> from the developer.
      </li>
      <li>
        Run <code>sha256sum</code> / <code>shasum</code> / <code>certutil</code> and <strong>compare</strong>.
      </li>
      <li>
        Run <code>apksigner verify --print-certs</code> and <strong>compare the cert fingerprint</strong>.
      </li>
      <li>
        Both match → install with confidence. Either mismatches → <strong>delete and re-download elsewhere.</strong>
      </li>
    </ol>

    <h2>8. FAQ</h2>
    <p>
      <strong>Q: The checksum matches but the signature looks different.</strong> Trust the signature — it&apos;s
      cryptographic identity. A cert mismatch means re-signing; don&apos;t install.
    </p>
    <p>
      <strong>Q: The site gives no checksum.</strong> Fall back to the signature check and reputation of the source. Prefer
      sources that publish hashes.
    </p>
    <p>
      <strong>Q: Can a checksum be faked?</strong> Only by serving you a re-signed file <em>and</em> a fake checksum
      together — which a malicious page can do. That&apos;s why you compare against a source you already trust, and check
      the signature too.
    </p>
    <p>
      <strong>Q: Does Play Protect do this for me?</strong> Partially, for Play-installed and scanned apps. It won&apos;t
      verify a manual sideload against the publisher&apos;s published hash.
    </p>

    <p>
      <strong>Bottom line:</strong> a downloaded APK is just bytes until you verify it.{" "}
      <strong>Checksum = is this the exact file? Signature = did the right developer build it?</strong> Check both in under
      a minute with the commands above, and you&apos;ll never install a repackaged build by mistake. For the wider workflow,
      see our guide on{" "}
      <Link href="/en/blog/how-to-check-if-an-apk-is-safe-verification-guide">checking whether an APK is safe</Link>.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I verify an APK's checksum and signature?",
    answer:
      "First compute the SHA-256 hash of the file (certutil -hashfile app.apk SHA256 on Windows, shasum -a 256 app.apk on macOS, sha256sum app.apk on Linux) and compare it character-by-character with the SHA-256 published by the official source. Then verify the signing certificate with 'apksigner verify --print-certs app.apk' or 'keytool -printcert -jarfile app.apk' and confirm the cert fingerprint matches the official developer's. A checksum match means the file wasn't altered; a signature match means the right developer built it.",
  },
  {
    question: "What's the difference between an APK checksum and an APK signature?",
    answer:
      "A checksum (SHA-256) is a fingerprint of the exact bytes, so any change — even one byte of injected code — produces a completely different hash. A signature is a cryptographic certificate showing who published the file and proving it wasn't re-signed. You want both: the checksum ties you to a specific file, and the signature ties that file to a trusted developer. If a repackager modifies an APK, they must re-sign it, so the certificate fingerprint will differ.",
  },
  {
    question: "Can a malicious site fake the checksum?",
    answer:
      "A single site can serve you both a re-signed malicious APK and a matching fake checksum, so a checksum alone isn't proof if you don't trust the source. That's why you compare against a source you already trust (the developer's official site or GitHub) and also verify the signature. A signature can't be faked without the developer's private key.",
  },
  {
    question: "How do I check an APK signature on my phone without a computer?",
    answer:
      "Install a purpose-built APK signature checker or an App Inspector tool from a trusted source — these display the signing certificate fingerprint of an APK or installed package. Compare that fingerprint with the developer's official one. A different signing fingerprint than the official app indicates a repackaged build. Note that Android itself blocks installing an APK whose signature doesn't match the already-installed version.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      You tap <strong>Update</strong> and Android refuses: <em>&quot;App not installed,&quot; &quot;Update failed,&quot;
      &quot;Package conflicts with an existing package,&quot;</em> or the install just spins forever and dies. You&apos;ve
      already restarted the phone. Still broken.
    </p>
    <p>
      Here&apos;s the good news: <strong>failed APK updates almost always come down to a small set of causes.</strong> Match
      your exact error message to the cause below, apply the fix, and you&apos;ll get past it. The trick is that each error
      means something slightly different.
    </p>

    <blockquote>
      <p>
        <strong>The core rule:</strong> <strong>read the exact error text — it names the cause.</strong> &quot;Signature
        mismatch,&quot; &quot;insufficient storage,&quot; and &quot;conflict&quot; are three different problems.
      </p>
    </blockquote>

    <h2>1. Identify your error first</h2>
    <p>Grab the exact wording before doing anything:</p>
    <ul>
      <li>
        <strong>&quot;App not installed&quot;</strong> → generic; usually a leftover version, storage, or signature issue.
      </li>
      <li>
        <strong>&quot;Package conflicts with an existing package&quot;</strong> → signature mismatch. Big one.
      </li>
      <li>
        <strong>&quot;Update failed&quot; / &quot;Installation failed&quot;</strong> → often storage or a corrupted download.
      </li>
      <li>
        <strong>&quot;Insufficient storage&quot;</strong> → you&apos;re out of space (the real fix below, not just
        &quot;delete a photo&quot;).
      </li>
      <li>
        <strong>Install hangs / spins forever</strong> → install source conflict or a stuck package.
      </li>
    </ul>
    <p>Match yours to the sections below.</p>

    <h2>2. Cause #1: signature mismatch (the most common)</h2>
    <p>
      <strong>Symptom:</strong> &quot;Package conflicts with an existing package,&quot; or &quot;App not installed&quot;
      when updating.
    </p>
    <p>
      <strong>Why:</strong> Android will only update an app if the new APK is signed with <strong>the same
      certificate</strong> as the installed one. If you installed the app from Google Play and now try to update with an APK
      downloaded from elsewhere (or vice versa), the signers differ — and Android blocks the update.
    </p>
    <p>
      <strong>Fixes:</strong>
    </p>
    <ol>
      <li>
        <strong>Update from the same source you installed from.</strong> Play-installed → update via Play. Sideloaded →
        update with an APK signed by the same key.
      </li>
      <li>
        <strong>Uninstall the old version, then install the new one.</strong> This wipes app data, so{" "}
        <strong>back up first</strong>. After that, use one consistent source going forward.
      </li>
      <li>
        <strong>If you need to keep data:</strong> you can&apos;t cross signers without root. Migrate data first, then
        clean-install.
      </li>
    </ol>
    <blockquote>
      <p>
        Tip: this is exactly why some &quot;modded&quot; or repackaged APKs won&apos;t update over the official app —
        different signature by design.
      </p>
    </blockquote>

    <h2>3. Cause #2: not enough storage</h2>
    <p>
      <strong>Symptom:</strong> &quot;Insufficient storage&quot; or &quot;Update failed&quot; late in the process.
    </p>
    <p>
      <strong>Why:</strong> Android needs free space for the <strong>new APK + extraction + the old version still
      present</strong> during the update. A 200 MB app can need 400–600 MB free to update.
    </p>
    <p>
      <strong>Fixes:</strong>
    </p>
    <ol>
      <li>
        Check <strong>Settings → Storage</strong> for real free space.
      </li>
      <li>
        Free up <strong>at least 2× the app&apos;s size</strong>. Delete caches, old downloads, unused apps.
      </li>
      <li>
        Empty the <strong>Play Store cache</strong>: Settings → Apps → Google Play Store → Storage →{" "}
        <strong>Clear cache</strong>.
      </li>
      <li>Retry. If it fails at 90%, it&apos;s almost always storage.</li>
    </ol>

    <h2>4. Cause #3: leftover / conflicting version</h2>
    <p>
      <strong>Symptom:</strong> &quot;App not installed&quot; with plenty of storage, sometimes after a failed attempt.
    </p>
    <p>
      <strong>Why:</strong> A half-installed package, a &quot;work profile&quot; copy, a pre-installed system version, or
      an app cloned/dual-app instance is blocking the new install.
    </p>
    <p>
      <strong>Fixes:</strong>
    </p>
    <ol>
      <li>
        <strong>Uninstall the existing version completely</strong> (including any &quot;dual app&quot; clone).
      </li>
      <li>
        Check for copies under <strong>Settings → Apps</strong> — look for the same name in a{" "}
        <strong>work profile</strong> or <strong>secure folder</strong>.
      </li>
      <li>
        If it&apos;s a <strong>system app</strong> (pre-installed, can&apos;t uninstall),{" "}
        <strong>uninstall its updates</strong> first: app info → ⋮ → <strong>Uninstall updates</strong>. Then install the
        new APK.
      </li>
      <li>Reboot and retry.</li>
    </ol>

    <h2>5. Cause #4: corrupted or incomplete download</h2>
    <p>
      <strong>Symptom:</strong> &quot;App not installed&quot; / &quot;There was a problem parsing the package.&quot;
    </p>
    <p>
      <strong>Why:</strong> The APK got truncated, or a &quot;split APK&quot; (App Bundle) was downloaded as a single file.
      Modern apps ship as <strong>split APKs</strong> (base + config splits); installing the base alone fails.
    </p>
    <p>
      <strong>Fixes:</strong>
    </p>
    <ol>
      <li>
        <strong>Re-download</strong> the APK — the file is likely corrupt.
      </li>
      <li>
        If it&apos;s a <strong>split/app-bundle</strong> app, download a proper <strong>XAPK or APKS bundle</strong>, and
        install it with a tool that handles splits (e.g., an XAPK installer or <code>adb install-multiple</code>).
      </li>
      <li>Verify the file isn&apos;t 0 bytes and matches the expected size.</li>
    </ol>

    <h2>6. Cause #5: install source / permissions</h2>
    <p>
      <strong>Symptom:</strong> Install hangs or the button does nothing.
    </p>
    <p>
      <strong>Why:</strong> The app you&apos;re installing <em>from</em> (Files, browser, chat app) lacks the &quot;install
      unknown apps&quot; permission, or Play Protect blocks it.
    </p>
    <p>
      <strong>Fixes:</strong>
    </p>
    <ol>
      <li>
        Settings → Apps → [the app opening the APK] → <strong>Install unknown apps</strong> → allow.
      </li>
      <li>
        Temporarily pause <strong>Play Protect</strong> scanning (Settings → Play Store → Play Protect).
      </li>
      <li>
        Retry from a plain <strong>Files</strong> app to rule out the opener.
      </li>
    </ol>

    <h2>7. Cause #6: stale package installer state</h2>
    <p>
      <strong>Symptom:</strong> Everything looks fine but installs silently fail.
    </p>
    <p>
      <strong>Fixes:</strong>
    </p>
    <ol>
      <li>
        Settings → Apps → <strong>Google Play Store</strong> and <strong>Package installer</strong> →{" "}
        <strong>Clear cache</strong> (and data for Play Store if needed).
      </li>
      <li>
        <strong>Reboot</strong> the phone.
      </li>
      <li>Retry.</li>
    </ol>

    <h2>8. Quick decision table</h2>
    <ul>
      <li>
        <strong>Package conflicts with existing</strong> → Signature mismatch → Same-source update / uninstall+reinstall
      </li>
      <li>
        <strong>Insufficient storage</strong> → Space → Free 2× app size, clear caches
      </li>
      <li>
        <strong>App not installed</strong> → Leftover version / clone → Uninstall fully, check work profile
      </li>
      <li>
        <strong>Problem parsing package</strong> → Corrupt / split APK → Re-download / use XAPK
      </li>
      <li>
        <strong>Install hangs</strong> → Missing permission → Enable install-unknown-apps
      </li>
      <li>
        <strong>Silent failure</strong> → Stale installer → Clear Play Store cache, reboot
      </li>
    </ul>

    <h2>9. FAQ</h2>
    <p>
      <strong>Q: Will uninstalling lose my data?</strong> Yes, uninstalling clears app data. Back up (in-app export, cloud
      sync, or <code>adb backup</code> where supported) first.
    </p>
    <p>
      <strong>Q: Can I update across different signers without losing data?</strong> Not without root. Cross-signer updates
      aren&apos;t allowed by Android&apos;s design.
    </p>
    <p>
      <strong>Q: Play Store update fails but sideloading works — why?</strong> Usually a Play Store side issue
      (cache/account). Clearing Play Store cache and retrying typically fixes it.
    </p>
    <p>
      <strong>Q: It works after a reboot, then fails again.</strong> A background package manager or clone service is
      re-conflicting. Check for dual-app / work-profile copies.
    </p>

    <p>
      <strong>Bottom line:</strong> failed APK updates aren&apos;t random — <strong>the error names the cause.</strong>{" "}
      Signature mismatch → same source or clean reinstall. Out of space → free 2× the size. Leftover version → uninstall
      fully first. Corrupt/split APK → re-download the right format. Match your message to the fix above and you&apos;ll
      update cleanly every time. For related fixes, see our{" "}
      <Link href="/en/blog/apk-install-blocked-by-android-how-to-allow">install-block troubleshooting guide</Link>.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why does my APK update fail with 'App not installed'?",
    answer:
      "The three most common causes are: (1) a signature mismatch — the new APK is signed with a different certificate than the installed version, which happens when you mix sources like Google Play and a third-party downloader; (2) not enough free storage, since an update needs room for the new APK plus the old version simultaneously; (3) a leftover or conflicting version, such as a half-installed package, a work-profile copy, or a dual-app clone. Match the exact error text to the cause and apply the matching fix.",
  },
  {
    question: "How do I fix an APK signature mismatch when updating?",
    answer:
      "Android only updates an app if the new APK is signed with the same certificate as the installed one. To fix it, either update from the same source you originally installed from, or uninstall the old version and then install the new APK (back up your data first, since uninstalling clears app data). You cannot update across different signers while keeping data without root access.",
  },
  {
    question: "Why does my APK fail at 90% or say insufficient storage?",
    answer:
      "An update needs free space for the new APK, its extraction, and the old version still present at the same time — so a 200 MB app can require 400-600 MB free. Free up at least twice the app's size by clearing caches, deleting old downloads, and removing unused apps, then clear the Google Play Store cache (Settings → Apps → Google Play Store → Storage → Clear cache) and retry.",
  },
  {
    question: "Why does my APK fail with 'problem parsing the package'?",
    answer:
      "This usually means the file was corrupted or truncated during download, or — very commonly on Android 8+ — you downloaded only one slice of a split APK (App Bundle). Modern apps ship as a base APK plus config splits, and installing the base alone fails. Re-download the file, or get a proper XAPK/APKS bundle and install it with an XAPK installer or 'adb install-multiple'.",
  },
];

export const enPosts20260918: BlogPostEntry[] = [
  {
    slug: "how-to-verify-apk-checksum-and-signature",
    title: "How to Verify an APK: Checksum and Signature Check in 2026",
    description:
      "Anyone can repackage an APK, swap the code, and re-upload it under the same name. The only way to know a downloaded APK is the real thing is to verify it yourself — by comparing its SHA-256 checksum against the official source and inspecting its signing certificate. This guide shows the exact commands for Windows, macOS, Linux, and Android (certutil, shasum, sha256sum, apksigner, keytool), plus how to spot a repackaged or re-signed app.",
    date: "2026-09-18",
    readTime: "8 min read",
    tags: ["android", "apk", "security", "checksum", "sha256", "signing", "sideload"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "apk-update-failed-how-to-fix",
    title: "APK Update Failed? How to Fix It on Android in 2026",
    description:
      "You tap Update and Android refuses — 'App not installed,' 'Package conflicts with an existing package,' or it hangs. Almost every failed APK update comes down to a handful of causes: signature mismatch, insufficient storage, a leftover version, a corrupted or split-APK download, install-source permissions, or a stale package installer. This guide matches each error message to its exact fix, for both Play Store and sideloaded apps.",
    date: "2026-09-18",
    readTime: "8 min read",
    tags: ["android", "apk", "update", "troubleshooting", "install", "sideload"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20260918List = toList(enPosts20260918);
