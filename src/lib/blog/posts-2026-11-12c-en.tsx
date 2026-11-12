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
      &ldquo;Allow installation from unknown sources&rdquo; has appeared in Android settings for over a
      decade, but few people realize <strong>the meaning of that switch changed completely in Android
      8.0</strong>, and was tightened again in Android 14. If you are following a 2015 tutorial and cannot
      find the toggle it describes, your phone is not broken — the tutorial is stale.
    </p>
    <p>Here is how install-source permission actually works across three Android generations.</p>

    <h2>How the model evolved</h2>

    <h3>Android 7.x and earlier: one global switch</h3>
    <p>
      A single <code>Settings.Secure.INSTALL_NON_MARKET_APPS</code> boolean. Turn it on and every app could
      present an install screen.
    </p>
    <p>
      <strong>The security problem was obvious:</strong> you flip it on to install one APK, forget to turn it
      off, and from then on any malicious app can push installers at you. This is the technical basis of the
      mid-2010s &ldquo;click an ad, get five junk apps&rdquo; experience.
    </p>

    <h3>Android 8.0+: permission is granted per installing app</h3>
    <p>
      Google moved to the <code>REQUEST_INSTALL_PACKAGES</code> model. The permission no longer belongs to
      the system globally — it is <strong>granted to one specific app</strong>.
    </p>
    <p>
      That means &ldquo;Chrome may install apps&rdquo; and &ldquo;the file manager may install apps&rdquo; are{' '}
      <strong>two separate switches</strong>.
    </p>
    <p>
      A useful side effect: <strong>you can grant it only to the browser you are actually using and leave
      everything else denied</strong>, which dramatically narrows the attack surface.
    </p>

    <h3>Android 14+: further tightening</h3>
    <ul>
      <li>
        Sideloaded installs require an extra confirmation (&ldquo;Don&apos;t allow&rdquo; is the default),
        with a risk warning
      </li>
      <li>
        Newly installed apps do <strong>not</strong> get <code>REQUEST_INSTALL_PACKAGES</code> automatically;
        the user must grant it explicitly
      </li>
      <li>
        Some ROMs apply additional risk checks to APKs arriving from messaging apps (files sent over WeChat,
        QQ, and similar)
      </li>
    </ul>

    <h2>Identify which app is asking</h2>
    <p>
      The simplest method: look at the <strong>icon and name at the top of the install screen</strong>. That
      is the actual installing app.
    </p>
    <p>
      If you opened an APK from a chat app and the install screen is headed by that chat app&apos;s icon, then{' '}
      <strong>the chat app</strong> is what needs permission — not the file manager. This is the single most
      common misdiagnosis: people hunt through file manager settings when the permission belongs to the
      messaging app they clicked from.
    </p>
    <p>
      <strong>Generic system path:</strong>
    </p>
    <pre>
      <code>{`Settings → Apps → Special app access (or Special permissions) → Install unknown apps`}</code>
    </pre>
    <p>
      This lists every app that has ever requested <code>REQUEST_INSTALL_PACKAGES</code> and its current
      state.
    </p>

    <h2>Per-OEM paths</h2>
    <table>
      <thead>
        <tr>
          <th>Device</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Stock / Pixel / AOSP</td>
          <td>Settings → Apps → Special app access → Install unknown apps</td>
        </tr>
        <tr>
          <td>Samsung (One UI)</td>
          <td>Settings → Apps → Special access → Install unknown apps</td>
        </tr>
        <tr>
          <td>Xiaomi / Redmi (HyperOS, MIUI)</td>
          <td>Settings → Apps → Permissions → Special permissions → Install unknown apps</td>
        </tr>
        <tr>
          <td>Huawei / Honor (EMUI, HarmonyOS)</td>
          <td>Settings → Security → More security settings → Install apps from external sources</td>
        </tr>
        <tr>
          <td>OPPO / OnePlus / realme (ColorOS)</td>
          <td>Settings → Security → Install external apps</td>
        </tr>
        <tr>
          <td>vivo / iQOO (OriginOS)</td>
          <td>Settings → Apps &amp; permissions → Permission manager → Install unknown apps</td>
        </tr>
        <tr>
          <td>Meizu (Flyme)</td>
          <td>Settings → Security → Unknown source installation</td>
        </tr>
      </tbody>
    </table>
    <p>
      If you cannot find it, <strong>search &ldquo;install&rdquo; in the settings search box</strong> —
      nearly every ROM surfaces it directly, which is far faster than walking menus.
    </p>

    <h2>Common errors and their real causes</h2>

    <h3>&ldquo;For security, this app can&apos;t be installed&rdquo;</h3>
    <p>Much more frequent since Android 14. Causes:</p>
    <ol>
      <li>
        The package was downloaded from the network and is unverified; the system blocks it by default — you
        must tap &ldquo;Install anyway&rdquo; on the risk screen
      </li>
      <li>
        The package&apos;s target SDK is below the ROM&apos;s minimum (some ROMs block{' '}
        <code>targetSdk &lt; 23</code>)
      </li>
      <li>
        <code>REQUEST_INSTALL_PACKAGES</code> has been force-disabled by a device policy (MDM / managed
        device)
      </li>
    </ol>

    <h3>&ldquo;There was a problem parsing the package&rdquo;</h3>
    <p>
      This is <strong>unrelated to source permissions</strong>. It is the package itself: an incomplete
      download, an architecture mismatch (arm64 build on an x86 emulator), or a truncated file. Verify:
    </p>
    <pre>
      <code>{`# Check APK integrity
unzip -t app.apk

# Check architecture and minimum SDK
aapt dump badging app.apk | grep -E "sdkVersion|native-code"`}</code>
    </pre>

    <h3>The install screen never appears at all</h3>
    <p>
      Not a permission issue — the tap on the APK file was not routed to the package installer. Usually:
    </p>
    <ul>
      <li>
        The file manager has no <code>application/vnd.android.package-archive</code> MIME association
      </li>
      <li>You tapped inside a chat app&apos;s in-app preview, which routed to its built-in viewer</li>
    </ul>
    <p>
      Fix: open the containing folder in the system <strong>Files</strong> app and tap there, or use{' '}
      <code>adb install</code>.
    </p>

    <h2>ADB: bypass all source restrictions</h2>
    <p>
      If you just want the app installed, <code>adb install</code> from a computer sidesteps phone-side source
      authorization entirely (requires USB debugging):
    </p>
    <pre>
      <code>{`adb devices
adb install -r app.apk          # Replace, keep data
adb install -r -d app.apk       # Allow downgrade
adb install-multiple *.apk      # Split APK bundles`}</code>
    </pre>
    <p>
      <code>adb</code> installs under shell UID, unaffected by{' '}
      <code>REQUEST_INSTALL_PACKAGES</code>, with no OEM security prompts. The tradeoff: developer options and
      USB debugging must be enabled.
    </p>

    <h2>Security advice: revoke the permission afterward</h2>
    <p>
      After installing an APK, <strong>revoke the install-source permission</strong> — especially from
      browsers and messaging apps, which are the primary delivery channel for malicious packages.
    </p>
    <p>
      A simple heuristic: <strong>how many times per year does this app need to install an APK?</strong>{' '}
      Usually once or twice. Granting it the ability to present install screens 365 days a year for two
      installs is a bad trade.
    </p>
    <p>
      The more robust pattern is to use one dedicated installer: download an officially signed APK via a tool
      like <Link href="/">gptoapk.com</Link>, install it through the system Files app, then immediately revoke
      the Files app&apos;s install permission — and leave your browser and messaging apps permanently set to
      &ldquo;not allowed.&rdquo;
    </p>

    <h2>Bottom line</h2>
    <p>
      <strong>Since Android 8, unknown sources is granted per app.</strong> Check which app&apos;s icon heads
      the install screen, grant the permission to that one, and revoke it when you are done. Do not leave
      browsers and chat apps holding the ability to prompt installs permanently.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Why can't I find the 'allow unknown sources' toggle in settings?",
    answer:
      "Because it was removed in Android 8.0. There is no longer a global unknown-sources master switch; permission is granted per installing app under Settings → Apps → Special app access → Install unknown apps, which lists each app individually. You can also type 'install' into the settings search box.",
  },
  {
    question: "The permission is on, but installs still say 'for security, this app cannot be installed'. Why?",
    answer:
      "That block comes from the system validating the source and the package, not from a missing permission. The usual causes: the package is an unverified network download, so you must tap 'Install anyway' on the risk screen; the package's targetSdk is below the system minimum; or install permission is disabled by a device management policy. Confirm the package's origin and signature before trying another build.",
  },
  {
    question: "What does adb install require on the phone?",
    answer:
      "USB debugging must be enabled in developer options (some vendors also require a separate 'install via USB' toggle), and platform-tools must be installed on the computer. adb installs under shell UID, bypassing REQUEST_INSTALL_PACKAGES, so there are no unknown-source prompts — but signature, downgrade, and targetSdk checks still apply.",
  },
  {
    question: "Should I revoke the install-source permission after installing?",
    answer:
      "Yes. Browsers and messaging apps are the main delivery channel for malicious installers. Letting them hold the ability to present install screens means a single page hijack can prompt an install. Revoke right after use and keep just one deliberate installer, such as the system Files app.",
  },
];

export const enPosts20261112C = [
  {
    slug: "android-install-unknown-sources-modern",
    title: "Install From Unknown Sources on Modern Android: It's Not One Switch, It's Three",
    description:
      "The 'allow unknown sources' toggle changed meaning completely in Android 8 and tightened again in Android 14. That's why the 2015 tutorial you found doesn't match your settings screen. How install-source permission works now, per-OEM paths, and the adb route that bypasses all of it.",
    date: "2026-11-12",
    readTime: "10 min read",
    tags: ["android", "apk", "security"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
];

export const enPosts20261112CList = toList(enPosts20261112C);
