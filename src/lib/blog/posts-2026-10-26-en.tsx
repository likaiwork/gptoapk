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
    question: "How do I check an APK's signature fingerprint on Windows or macOS?",
    answer:
      "Use keytool from any JDK: keytool -printcert -jarfile app.apk. Look for the SHA256 line in the output. Download the same app from Google Play or the official site and run the same command. Identical SHA256 means the same signer; different means the build is not official.",
  },
  {
    question: "Is it enough to compare the package name with the official app?",
    answer:
      "No. Package names are chosen by whoever builds the APK and can be copied freely. Signing keys cannot be forged. Two APKs with the same package name can come from completely different developers, which is why the signature check is the one that matters.",
  },
  {
    question: "Which permission combinations are the biggest red flags?",
    answer:
      "Four sets: SMS read/receive plus internet access (OTP interception and premium subscription fraud), accessibility service plus internet (screen reading and synthetic taps against banking apps), device admin plus boot-completed (blocks uninstall), and overlay plus background ads plus autostart (the classic cracked-app monetization pattern).",
  },
  {
    question: "Why is it a bad idea to install now and uninstall later if something looks wrong?",
    answer:
      "Apps holding device-administrator privileges can block their own uninstallation, and accessibility-enabled apps can re-grant themselves permissions or hide their own settings screens. Verification before install is cheap; cleanup after a malicious app has established persistence ranges from tedious to impossible without a factory reset.",
  },
];

const ARTICLE1 = (
  <>
    <p>
      Most advice about downloading APKs safely amounts to &quot;use a trusted site,&quot; which is not actionable when
      the trusted site is the one that got compromised. The risk profile is also widely misunderstood: the dangerous
      APK is rarely the one that fails to install. It is the one that installs, runs normally, and quietly reads SMS
      verification codes or subscribes the device to premium services.
    </p>
    <p>
      This guide is an audit you can complete in about five minutes, before and after installing, with no root access
      and no security app.
    </p>

    <h2>Why &quot;trusted source&quot; is a weak control</h2>
    <p>
      A trusted source protects you against exactly one threat: a malicious upload to an otherwise legitimate site. It
      does nothing against a lookalike domain, a hijacked CDN, or a page where one of the download buttons is an ad
      slot serving a different package. The source check is worth doing, but it has to be paired with checks performed
      on the <em>file itself</em>.
    </p>
    <blockquote>
      <p>
        The principle that replaces trust in sources: a signature fingerprint and a permission list tell you more than
        any review section.
      </p>
    </blockquote>

    <h2>Step 1: Validate the source before clicking download</h2>
    <p>Three fast checks.</p>
    <p>
      <strong>Domain shape.</strong> Legitimate distribution domains are tied to the developer. Warning signs:
      keyword-stuffed domains such as <code>apk-download-free-fast.com</code>, brand-lookalike domains such as{" "}
      <code>whatsapp-apk.com</code> when the official domain is <code>whatsapp.com</code>, and multi-hop short-link
      redirect chains — each hop is an opportunity to swap the payload.
    </p>
    <p>
      <strong>Number of download buttons.</strong> A page with several differently-styled download buttons usually has
      one real entry and several ad placements that serve a different APK or a download manager. A single unambiguous
      download entry is a good sign; it is not proof, but its absence is a strong negative.
    </p>
    <p>
      <strong>File extension.</strong> What you receive should end in <code>.apk</code>. If it ends in{" "}
      <code>.apk.exe</code>, <code>.zip</code>, <code>.xapk</code>, or <code>.apks</code>, stop and identify what you
      actually got before touching it.
    </p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">Extension</th>
            <th className="py-2">What it actually is</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>.apk.exe</code>
            </td>
            <td className="py-2">A Windows executable. You are on the wrong platform or the site is hostile.</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">
              <code>.zip</code> / <code>.xapk</code>
            </td>
            <td className="py-2">A container holding several APKs (per-ABI or split packages). Not directly installable.</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">
              <code>.apks</code>
            </td>
            <td className="py-2">Extracted Android App Bundle, needs a dedicated installer.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Step 2: Verify the signature fingerprint</h2>
    <p>
      This is the single highest-value check, and the one people skip. Package names are free to specify; signing keys
      are not. Two APKs with the same package name are not necessarily from the same developer.
    </p>
    <pre>
      <code>{`keytool -printcert -jarfile app.apk`}</code>
    </pre>
    <p>
      Look for the <code>SHA256:</code> line under certificate fingerprints. Then download the same app from Google
      Play or the developer&apos;s official site — an older version is fine — and run the same command on it.
    </p>
    <p>
      <strong>Identical SHA256 means the same signer. Different means not the official build — stop.</strong>
    </p>
    <p>
      If no official build is available, cross-validate: download from two independent third-party sites and compare.
      Two &quot;popular&quot; sites producing different signatures means at least one is repackaged.
    </p>
    <p>You can also check signature consistency against an already-installed copy:</p>
    <pre>
      <code>{`adb shell pm list packages -f | grep com.example.app`}</code>
    </pre>
    <p>
      If the installed copy&apos;s signer differs from the file you are about to install, you will get a signature
      mismatch on install — and more importantly, it tells you one of the two is not legitimate.
    </p>

    <h2>Step 3: Read the permission list as combinations</h2>
    <pre>
      <code>{`aapt dump permissions app.apk
# or
apkanalyzer manifest permissions app.apk`}</code>
    </pre>
    <p>
      Do not read permissions one at a time. Read them as combinations, because that is how malicious functionality is
      built:
    </p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">Combination</th>
            <th className="py-2">What it enables</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SMS read/receive + INTERNET</td>
            <td className="py-2">Intercepting OTP codes, silently replying to premium subscriptions</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">BIND_ACCESSIBILITY_SERVICE + INTERNET</td>
            <td className="py-2">Screen reading and synthetic taps — remote control of banking apps</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">DEVICE_ADMIN + BOOT_COMPLETED</td>
            <td className="py-2">Hard to uninstall, used for ransomware-style lock screens</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">SYSTEM_ALERT_WINDOW + background ads + autostart</td>
            <td className="py-2">The classic &quot;cracked app&quot; monetization pattern</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Then apply the only test that matters: <strong>can the app&apos;s stated function justify each permission?</strong>{" "}
      A calculator requesting SMS access, a wallpaper app requesting an accessibility service — inability to justify is
      sufficient grounds to reject.
    </p>

    <h2>Step 4: Compare version and size against official</h2>
    <p>
      <strong>Version number:</strong> repackaged builds are usually based on an older release with a new wrapper on
      top. If the version does not line up with the official release available at the same time, you are likely looking
      at stale code in a fresh shell.
    </p>
    <p>
      <strong>File size:</strong> a difference over roughly 20% from the official build of the same version deserves
      scrutiny. Repackaging adds code, packers, and resources (larger); &quot;lite&quot; modifications strip resources
      (smaller).
    </p>

    <h2>Step 5: Post-install hardening</h2>
    <p>Two things, immediately after install.</p>
    <p>
      <strong>Revoke special grants.</strong> Settings → Apps → the app → Permissions, plus the special access screens:
    </p>
    <ul>
      <li>Accessibility — off</li>
      <li>Device admin — off (except for genuine enterprise apps)</li>
      <li>Display over other apps — off</li>
      <li>Autostart / background launch — off</li>
    </ul>
    <p>
      <strong>Check background network behavior.</strong> Without a packet capture, the simplest proxy: Settings →
      Network → Data usage, filtered by app. Significant traffic in periods when you never opened the app is a signal
      worth investigating.
    </p>

    <h2>The audit checklist</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pr-4">Check</th>
            <th className="py-2">Pass condition</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Download domain</td>
            <td className="py-2">Tied to the developer, no keyword stuffing</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">File extension</td>
            <td className="py-2">
              <code>.apk</code> only
            </td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SHA256 signer</td>
            <td className="py-2">Matches the official build</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Permission combination</td>
            <td className="py-2">No SMS / accessibility / device-admin danger sets</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Version</td>
            <td className="py-2">Comparable to official release period</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">File size</td>
            <td className="py-2">Within roughly 20% of official</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Post-install grants</td>
            <td className="py-2">All non-essential special access revoked</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Any row you cannot explain is a reason not to install. The alternative always exists: an official channel, or a
      different app that does the same job. That cost is far lower than cleaning up a phone that has been silently
      billing premium SMS.
    </p>

    <h2>Common false comforts</h2>
    <ul>
      <li>
        <strong>&quot;The comments say it works.&quot;</strong> Comment sections are the cheapest part of a malicious
        distribution page to fake.
      </li>
      <li>
        <strong>&quot;The antivirus scan came back clean.&quot;</strong> Static detection is trivially bypassed by
        packing and small code mutations.
      </li>
      <li>
        <strong>&quot;I&apos;ll just uninstall it if something goes wrong.&quot;</strong> Device-admin apps can block
        uninstallation. Verify first, not after.
      </li>
      <li>
        <strong>&quot;Same package name, so it&apos;s the same app.&quot;</strong> Package names are chosen by the
        developer; signing keys are not forgeable.
      </li>
    </ul>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      Every APK on{" "}
      <Link href="https://www.gptoapk.com/en" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      is pulled directly from Google Play and served unmodified, so the signing certificate always matches the official
      publisher.
    </p>
    <p>
      The value of a checklist is not perfection. It is replacing a feeling with a comparison — same command, two
      files, two fingerprints. Do that once and the habit sticks.
    </p>
  </>
);

export const enPosts20261026: BlogPostEntry[] = [
  {
    slug: "safely-download-apk-source-to-uninstall-audit",
    title: "How to Safely Download APK Files on Android: A Source-to-Uninstall Audit",
    description:
      "A practical five-minute audit for any APK: signature fingerprint verification, permission combination analysis, version and size comparison, plus post-install hardening — no root or third-party security app required.",
    date: "2026-10-26",
    readTime: "10 min read",
    tags: ["android", "apk", "security", "download"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
];

export const enPosts20261026List = toList(enPosts20261026);
