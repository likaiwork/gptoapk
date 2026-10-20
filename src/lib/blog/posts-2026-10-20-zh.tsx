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
      Search &ldquo;APK extractor&rdquo; on any app store and you get dozens of results &mdash; most of them ad shells
      that show three full-screen ads before producing a file that may not even be installable. The real question
      isn&rsquo;t <em>which tool</em>, it&rsquo;s <em>which kind of extraction you actually need</em>. This guide sorts
      the options by scenario: one-tap on the phone, batch on a computer, and the &ldquo;I don&rsquo;t need to extract
      at all&rdquo; case most people overlook.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> There is no best APK extractor, only a best fit. Phone-side one-tap export,
        computer-side scripting, and split-aware repackaging are three different jobs &mdash; and 90% of guides skip
        the step that decides whether the result actually installs.
      </p>
    </blockquote>

    <h2>First: know which kind of package you have</h2>
    <p>
      Extraction difficulty is determined by the install format, not by the tool. Modern Play Store apps are almost
      always App Bundles, which install as a base plus several split files.
    </p>
    <table>
      <thead>
        <tr>
          <th>Format</th>
          <th>Signs</th>
          <th>Extraction difficulty</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Single APK</td>
          <td>One file, under ~100&nbsp;MB</td>
          <td>Easy &mdash; any extractor works</td>
        </tr>
        <tr>
          <td>Split APK (App Bundle)</td>
          <td><code>base.apk</code> + <code>split_config.*.apk</code></td>
          <td>Hard &mdash; base alone won&rsquo;t install</td>
        </tr>
        <tr>
          <td>APK + OBB</td>
          <td>Plus an <code>Android/obb/&lt;pkg&gt;/</code> folder</td>
          <td>Medium &mdash; back up both parts</td>
        </tr>
        <tr>
          <td><code>.apks</code> / <code>.xapk</code></td>
          <td>A zip bundle from a mirror site</td>
          <td>Easy to move, needs a split-aware installer</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Practical rule:</strong> if the app came from the Play Store, assume it&rsquo;s a split package and plan
      accordingly.
    </p>

    <h2>Option 1: On-device one-tap extraction</h2>
    <p>
      <strong>MT Manager</strong> is the most capable free file manager for this job, with no ads. Open it, switch to
      the <em>Apps</em> tab, long-press the target, choose <em>Extract APK</em>, and pick a destination. Its advantage
      is that it dumps every split file into one folder automatically &mdash; you never have to assemble them by hand.
      Turn on &ldquo;show system apps&rdquo; from the menu if the app you want isn&rsquo;t listed.
    </p>
    <p>
      <strong>SAI (Split APKs Installer)</strong> is technically an installer, but its export function is the cleanest
      way to handle bundles: it packages all splits into a single <code>.apks</code> file. That matters for sharing
      &mdash; one file, one import, no &ldquo;installed base but missing config&rdquo; failures on the other end.
    </p>

    <h2>Option 2: Computer-side extraction (batch and scriptable)</h2>
    <p>
      <code>adb</code> is the most reliable method and requires no third-party app at all. Enable USB debugging, then
      list the package&rsquo;s files &mdash; note that a split app returns multiple paths:
    </p>
    <pre>
      <code>{`adb shell pm path com.example.app
# package:/data/app/~~abc==/com.example.app-xyz==/base.apk
# package:/data/app/~~abc==/com.example.app-xyz==/split_config.arm64_v8a.apk
# package:/data/app/~~abc==/com.example.app-xyz==/split_config.zh.apk`}</code>
    </pre>
    <p>To pull every split in one pass:</p>
    <pre>
      <code>{`PKG=com.example.app
for p in $(adb shell pm path $PKG | sed 's/^package://' | tr -d '\\r'); do
  adb pull "$p" ./extract/
done`}</code>
    </pre>
    <p>
      No permissions prompts, no third-party app, cleanest possible output. The only requirement is that the device
      allows USB debugging.
    </p>

    <h2>Option 3: Don&rsquo;t extract &mdash; just download the version you want</h2>
    <p>
      A large share of &ldquo;I need to extract this APK&rdquo; situations are really &ldquo;I want to install the same
      app on another device.&rdquo; In that case a signature-verifying mirror is the better route: same version,
      usually a choice of historical builds, and no extraction step.
    </p>
    <p>Extraction is genuinely necessary only when:</p>
    <ul>
      <li>The app is privately distributed (enterprise beta, region-locked) and mirrors don&rsquo;t have it;</li>
      <li>You need the exact build currently installed on <em>this</em> device, e.g. after patching;</li>
      <li>The app has been pulled from stores entirely.</li>
    </ul>

    <h2>The step every guide skips: verify the export</h2>
    <p>
      <strong>1. Check the file size.</strong> A few KB means an empty shell or a saved redirect page. A 300&nbsp;MB
      app that exports as 5&nbsp;MB means you only got the base of a bundle.
    </p>
    <p>
      <strong>2. Compare the signature.</strong> Run{" "}
      <code>apksigner verify --print-certs extract/base.apk</code> and compare the SHA-256 against a known-good copy.
      Two copies of the same version with different signatures means at least one is repackaged.
    </p>
    <p>
      <strong>3. Confirm the split set is complete.</strong> An APK is a zip &mdash; inspect it with{" "}
      <code>unzip -l</code>. A complete bundle needs at least one ABI split (<code>arm64_v8a</code> or{" "}
      <code>armeabi_v7a</code>), one density split, and one language split. Missing the ABI split produces
      &ldquo;App not installed&rdquo; or an instant crash on launch.
    </p>

    <h2>Quick reference</h2>
    <ul>
      <li><strong>One or two apps, occasionally</strong> &rarr; MT Manager</li>
      <li><strong>Sharing or migrating devices</strong> &rarr; SAI, exported as <code>.apks</code></li>
      <li><strong>Batch work or scripting</strong> &rarr; adb + <code>pm path</code> loop</li>
      <li><strong>Just need a specific version</strong> &rarr; skip extraction, download from a verifying mirror</li>
    </ul>
    <p>
      The tools are the easy part. What decides success is whether you verify the package is complete and
      correctly signed <em>before</em> installing &mdash; thirty seconds of checking saves an hour of troubleshooting.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "How do I extract an APK from a split (App Bundle) app?",
    answer:
      "Use a split-aware tool. On the phone, MT Manager's Extract APK copies every split into one folder, and SAI can package them into a single .apks file. On a computer, run adb shell pm path <package> — it returns multiple paths for a bundle — and pull each one. Installing only base.apk will fail or crash because the ABI and resource splits are missing.",
  },
  {
    question: "Why is my extracted APK only a few KB?",
    answer:
      "A few-KB APK is never a real application. It is either a failed extraction that left an empty file, or a download page saved with an .apk extension. Re-extract with MT Manager or adb and confirm the size is in the tens to hundreds of megabytes range.",
  },
  {
    question: "Do I need root to extract APKs?",
    answer:
      "No, not for apps you installed yourself — adb shell pm path and MT Manager both work without root. Root (or Shizuku for apps that request it) is only needed for certain system apps that live in protected partitions, and even then only for some of them.",
  },
  {
    question: "Is it better to extract an APK or download it from APKMirror?",
    answer:
      "If you just want a specific version on another device, download from a signature-verifying mirror — it's faster and gives you version choice. Extract only when the app is privately distributed, has been delisted, or you need the exact build already on your own device. Either way, verify the signing certificate before installing.",
  },
  {
    question: "How do I check that an extracted APK is complete?",
    answer:
      "Three checks: confirm the file size is plausible, run apksigner verify --print-certs and compare the SHA-256 to a known-good copy, and open the APK as a zip to confirm the bundle contains at least one ABI split, one density split, and one language split. Missing the ABI split is the most common cause of 'App not installed'.",
  },
];

const ARTICLE2 = (
  <>
    <p className="lead">
      Most people leave their Android security settings exactly as the phone shipped them. Vendor defaults block a lot,
      but almost all real-world risk concentrates in one moment: <strong>the instant you install an APK yourself</strong>.
      This is a list you can actually work through &mdash; specific toggles, where they live, what breaks when you turn
      them on, and when you should leave them alone.
    </p>
    <blockquote>
      <p>
        <strong>Key idea:</strong> Android security isn&rsquo;t &ldquo;install an antivirus.&rdquo; It&rsquo;s
        controlling <em>who is allowed to install apps</em> and <em>who is allowed to read your data</em>. Get those two
        right and most of the attack surface disappears.
      </p>
    </blockquote>

    <h2>Layer 1: Lock the device itself</h2>
    <p>
      <strong>1. Use a real PIN, not just biometrics.</strong> A 6-digit PIN is the baseline. Biometrics are convenient
      but are not a secret in the same sense &mdash; a device can be held up to your face, and a PIN cannot be. Use
      biometrics for daily unlocking and the PIN as the fallback for sensitive actions.
    </p>
    <p>
      <strong>2. Hide notification content on the lock screen.</strong> Verification codes and messages rendered on a
      locked screen are the most common physical-access attack vector. Settings &rarr; Notifications &rarr; Lock screen
      notifications &rarr; hide sensitive content.
    </p>
    <p>
      <strong>3. Turn on Find My Device and remote erase</strong> before you need it. Settings &rarr; Security &rarr;
      Find My Device, and confirm you are signed into a Google or vendor account. On Android 15+, also enable theft
      protection (automatic lock when the device is snatched).
    </p>

    <h2>Layer 2: Control the install gate</h2>
    <p>
      <strong>4. Grant install permission to one source only.</strong> Since Android 8.0, &ldquo;install unknown
      apps&rdquo; is per-source, not global. Settings &rarr; Apps &rarr; Special app access &rarr; Install unknown
      apps. Ideally only your file manager and one browser appear enabled. Turn off messaging apps &mdash; APKs
      arriving via chat are the single most common phishing delivery channel &mdash; and turn the toggle back off after
      every install.
    </p>
    <p>
      <strong>5. Keep Play Protect scanning on.</strong> Play Store &rarr; profile &rarr; Settings &rarr; Play
      Protect. It will occasionally flag a legitimate split bundle; you can still choose to install, but read the
      warning first.
    </p>
    <p>
      <strong>6. Disable &ldquo;Install via USB&rdquo;</strong> in Developer options. It lets <em>any</em> connected
      computer install apps silently, including public charging stations that present as USB hosts.
    </p>
    <p>
      <strong>7. Disable wireless debugging when not developing.</strong> The open port is scannable from the same
      Wi-Fi network.
    </p>
    <p><strong>8. Before installing any sideloaded file, check three things:</strong></p>
    <ul>
      <li><strong>Size</strong> &mdash; a few KB is a redirect page, not an app;</li>
      <li><strong>Permissions</strong> &mdash; a flashlight requesting contacts and SMS is a no;</li>
      <li>
        <strong>Signature</strong> &mdash; compare the certificate against the developer&rsquo;s published fingerprint
        with <code>apksigner verify --print-certs</code>.
      </li>
    </ul>

    <h2>Layer 3: Tighten data access</h2>
    <p>
      <strong>9. Audit permissions by type, not by app.</strong> Settings &rarr; Privacy &rarr; Permission manager lets
      you see every app holding location, microphone, camera, or contacts in one place. Set location, mic, and camera
      to &ldquo;only while using&rdquo; &mdash; never &ldquo;allow all the time&rdquo; unless a genuine use case exists.
    </p>
    <p>
      <strong>10. Clean out special access permissions.</strong> These never surface in normal permission prompts:
    </p>
    <ul>
      <li>
        <strong>Accessibility service</strong> &mdash; can read the screen and simulate taps. This is the preferred
        entry point for Android banking trojans. Allow only genuine accessibility tools and trusted automation.
      </li>
      <li><strong>Device admin</strong> &mdash; can lock, wipe, and block uninstall.</li>
      <li><strong>Display over other apps</strong> &mdash; enables overlay phishing screens.</li>
      <li><strong>Notification access</strong> &mdash; reads every notification, including OTP codes.</li>
    </ul>
    <p>
      The dangerous combination is <em>accessibility + overlay + install packages</em> on the same app. No legitimate
      consumer app needs all three.
    </p>
    <p>
      <strong>11. Isolate sensitive apps.</strong> Put banking, payment, and wallet apps into Secure Folder (Samsung),
      a private space, or a separate work profile (Shelter / Island). Apps outside the container cannot see inside it.
    </p>
    <p>
      <strong>12. Keep Google Play system updates on.</strong> Settings &rarr; Security &rarr; System update &rarr;
      Google Play system update. These patch media codecs, Bluetooth, and Wi-Fi stacks without waiting for a full OEM
      release. While you&rsquo;re there, check the security patch date &mdash; if it&rsquo;s six months old, the
      device&rsquo;s real risk is higher than it appears.
    </p>

    <h2>Checklist summary</h2>
    <ul>
      <li>Strong PIN + lock screen notification content hidden</li>
      <li>Find My Device / theft protection enabled</li>
      <li>Install unknown apps: one source at a time, then off</li>
      <li>Play Protect scanning on; Install via USB and wireless debugging off</li>
      <li>Location / mic / camera set to &ldquo;while using&rdquo;</li>
      <li>Accessibility and notification access restricted to genuine tools</li>
      <li>Sensitive apps in Secure Folder or work profile</li>
      <li>Google Play system update automatic; patch date checked</li>
    </ul>
    <p>
      And skip the &ldquo;phone cleaner&rdquo; apps entirely. They request notification access and accessibility for
      ad data, not performance. The built-in storage page cleans cache, and a reboot beats every booster on the store.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "What are the most important Android security settings to change?",
    answer:
      "Two matter more than the rest: restricting 'install unknown apps' to a single source at a time (and turning it off after each install), and removing Accessibility and Notification access from any app that doesn't genuinely need them. Together they block most malware that spreads by disguising itself as a normal app.",
  },
  {
    question: "Why does Android ask me to allow installs per app instead of giving one global switch?",
    answer:
      "Since Android 8.0 the install permission is granted per source app rather than globally, so granting a browser the ability to install packages doesn't also grant it to every messaging app. Exploit this: enable it for the one app you're installing from, install, then turn it back off.",
  },
  {
    question: "Is it safe to grant Accessibility service to a sideloaded app?",
    answer:
      "Almost never. Accessibility lets an app read everything on screen and simulate taps, which is exactly what banking trojans need. Grant it only to genuine accessibility tools (screen readers, switch access) or automation apps you installed deliberately and trust. If a sideloaded app asks for it, treat that as a stop signal.",
  },
  {
    question: "What is the difference between a system update and a Google Play system update?",
    answer:
      "System updates come from your device manufacturer and replace Android itself. Google Play system updates patch core components — media codecs, Bluetooth, Wi-Fi, permission modules — without an OEM release. Keeping Play system updates automatic means security fixes arrive in weeks rather than months.",
  },
  {
    question: "Do phone cleaner and booster apps actually improve security?",
    answer:
      "No. Most request notification access and accessibility services so they can monetize usage data, while their cleaning has no measurable effect. Use the built-in storage settings for cache and reboot the device instead; uninstalling the cleaner improves both performance and privacy.",
  },
];

export const zhPosts20261020: BlogPostEntry[] = [
  {
    slug: "android-apk-extractor-tools-comparison",
    title: "安卓 APK 提取工具全对比：手机端一键导出、电脑端批量抓、还是根本不用提",
    description:
      "商店里的 APK 提取工具绝大多数是广告壳，导出的包还可能是坏的。这篇按场景对比 MT 管理器、SAI、adb 等方案，并给出导出后验证包完整性的三步检查。",
    date: "2026-10-20",
    readTime: "8 min read",
    tags: ["android", "apk", "工具", "提取", "指南"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-security-settings-checklist",
    title: "安卓手机安全防护设置清单：从系统开关到 APK 安装闸门的 12 项检查",
    description:
      "安卓的真实风险几乎都集中在你亲手装 APK 的那一刻。这份清单给到具体开关位置、开启后的副作用，以及为什么「无障碍服务」是最该关掉的权限。",
    date: "2026-10-20",
    readTime: "7 min read",
    tags: ["android", "安全", "隐私", "设置", "指南"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const zhPosts20261020List = toList(zhPosts20261020);
