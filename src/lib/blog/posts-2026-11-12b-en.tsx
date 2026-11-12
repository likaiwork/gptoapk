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
      Two WeChat accounts. A work profile and a personal one. A second game account that does not get banned
      as a farm. Running two copies of the same Android app is one of the most common Android requests — and
      also the category most aggressively exploited by third-party &ldquo;parallel space&rdquo; apps, which
      take a capability the OS already provides and repackage it while sitting between you and your
      credentials.
    </p>
    <p>
      Here are four approaches, ordered from lowest risk to highest. You almost certainly do not need the
      last two.
    </p>

    <h2>First, the mechanism</h2>
    <p>
      An Android app&apos;s identity is determined by its <strong>package name</strong>. The system isolates
      its data at <code>/data/data/&lt;package&gt;/</code>. So &ldquo;dual app&rdquo; can only be implemented
      in one of two ways:
    </p>
    <blockquote>
      <p>
        <strong>
          Give the second copy a different package name, or give it a different user identity (UID).
        </strong>
      </p>
    </blockquote>
    <p>
      Every dual-app solution is one of those two paths. Once you understand that, you can evaluate any
      third-party tool instantly.
    </p>

    <h2>Approach 1: Built-in dual-app support (start here)</h2>
    <p>Every major manufacturer ships this. No installs required:</p>
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Path</th>
          <th>Instances per app</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Xiaomi / Redmi</td>
          <td>Settings → Apps → Dual apps</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Samsung</td>
          <td>Settings → Advanced features → Dual Messenger, or Secure Folder</td>
          <td>1–2</td>
        </tr>
        <tr>
          <td>OPPO / OnePlus / realme</td>
          <td>Settings → Apps → App cloner</td>
          <td>1</td>
        </tr>
        <tr>
          <td>vivo / iQOO</td>
          <td>Settings → Apps &amp; permissions → App clone</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Honor</td>
          <td>Settings → Apps → App twin</td>
          <td>1</td>
        </tr>
        <tr>
          <td>Stock / Pixel</td>
          <td>Not built in — use Island (see approach 2)</td>
          <td>—</td>
        </tr>
      </tbody>
    </table>
    <p>
      <strong>Why it&apos;s safe:</strong> it is implemented at the system level using Android&apos;s native{' '}
      <code>UserManager</code> or work profile plumbing. Data isolation is kernel-enforced; no third party can
      read across the boundary.
    </p>
    <p>
      <strong>Note:</strong> the clone usually gets a small badge on its icon. That is expected. Some banking
      and payment apps deliberately detect cloned environments and refuse to launch — that is the
      app&apos;s risk control, not a fault in your phone.
    </p>

    <h2>Approach 2: Work profile / isolated space</h2>
    <p>
      Android has supported <strong>work profiles</strong> since 5.0. A work profile is a second{' '}
      <code>UserHandle</code> with its own UID range, its own data directory, and its own contacts store.
    </p>
    <ul>
      <li>
        <strong>Xiaomi:</strong> Settings → Special features → Second space
      </li>
      <li>
        <strong>Samsung:</strong> Secure Folder
      </li>
      <li>
        <strong>Stock / Pixel / AOSP:</strong> <strong>Island</strong> (open source, work-profile based,
        source on GitHub — you can actually audit it)
      </li>
    </ul>
    <p>
      <strong>Advantages over dual apps:</strong> stronger isolation. You can put a separate lock screen on
      the work profile, disable the camera inside it, and freeze it entirely. This is the correct setup for
      &ldquo;company MDM app on the same phone as my personal apps.&rdquo;
    </p>
    <p>
      <strong>Costs:</strong> Google services and push notifications inside a work profile sometimes need
      separate configuration. Some banking apps treat work profiles as suspicious environments.
    </p>

    <h2>Approach 3: Sideload a second APK with a different signature (high risk)</h2>
    <p>
      People search for &ldquo;app name + mod APK&rdquo; and install it to get a second copy. These are{' '}
      <strong>repackaged</strong> builds: decompile the official APK → change the package name → re-sign.
    </p>
    <p>Three problems:</p>
    <ol>
      <li>
        <strong>The signing certificate changes.</strong> Play Protect flags it as unverified; some systems
        refuse to install it outright.
      </li>
      <li>
        <strong>A repackaged APK can contain arbitrary injected code.</strong> You believe you installed an
        app; in fact you installed that app plus a routine that uploads your session data somewhere. Ordinary
        users have no way to tell.
      </li>
      <li>
        <strong>Integrity checks fail.</strong> The app may demand face verification or SMS re-auth, or
        simply ban the account.
      </li>
    </ol>
    <p>
      If you genuinely need this path (an old game with no clone support, say), the only somewhat-controlled
      version is <strong>repackaging it yourself and signing with your own key</strong>:
    </p>
    <pre>
      <code>{`apktool d app.apk -o decoded
# edit decoded/apktool.yml and AndroidManifest.xml package attribute
apktool b decoded -o rebuilt.apk
apksigner sign --ks my.keystore --out clone.apk rebuilt.apk`}</code>
    </pre>
    <p>At least then the injected code is code you wrote.</p>
    <p>
      <strong>Hard line:</strong> never do this with payments, messaging, or enterprise apps. The account
      holds money, conversations, and work data. Not worth saving the price of a second phone.
    </p>

    <h2>Approach 4: Third-party &ldquo;parallel space&rdquo; apps (don&apos;t)</h2>
    <p>
      Apps on the store called &ldquo;Dual App Assistant,&rdquo; &ldquo;Parallel Space,&rdquo; or
      &ldquo;Multi Parallel&rdquo; are one of two things:
    </p>
    <ul>
      <li>
        <strong>VirtualApp / VirtualXposed-style containers.</strong> They run the target app inside their
        own process and redirect system calls. Clever technically — but{' '}
        <strong>the target app&apos;s credentials, tokens, and full data live in the container&apos;s process
        memory</strong>, which the container&apos;s authors can read.
      </li>
      <li>
        <strong>Thin wrappers that just call the system dual-app API.</strong> In which case there is no
        reason to install them; use approach 1.
      </li>
    </ul>
    <p>
      Quick test: if the app asks for <strong>accessibility service</strong> or{' '}
      <strong>overlay + device admin</strong> permissions, uninstall it. Running a second instance does not
      require those permissions. Asking for them means it wants something else.
    </p>

    <h2>FAQ</h2>
    <h3>Do both instances receive push notifications?</h3>
    <p>
      Yes, but clones and work profiles use different push channels; some apps only notify the primary
      instance.
    </p>
    <h3>How do I migrate a cloned app to a new phone?</h3>
    <p>
      Clone data lives under <code>/data/data/</code> but under a different UID, so ordinary migration tools
      cannot move it. You will either log in again or use <code>adb</code> (needs root or{' '}
      <code>allowBackup=true</code>).
    </p>
    <h3>Can iOS do this?</h3>
    <p>
      No. The iOS sandbox model has no concept of multiple users. Everything sold as an &ldquo;iOS dual
      app&rdquo; is enterprise-certificate signing or configuration profiles — these get revoked regularly
      and leak data. Avoid.
    </p>
    <h3>How many copies can I run?</h3>
    <p>
      System dual app gives 1 extra; a work profile gives 1; multi-user mode theoretically gives one per
      user, but switching is painful. Realistically, three.
    </p>

    <h2>Bottom line</h2>
    <p>
      <strong>
        Use the built-in dual-app feature first. If that is not enough, use a work profile or second space.
        If that is still not enough, buy a cheap second phone.
      </strong>{' '}
      Do not hand your primary account&apos;s password to an opaque container app to save a few hundred
      yuan.
    </p>
    <p>
      Need the genuine, officially signed APK rather than a repackaged &ldquo;multi-open&rdquo; build?{' '}
      <Link href="/">gptoapk.com</Link> pulls the original package from Google Play, so you can install the
      real app and then clone it with the system feature — the cleanest possible path.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Does running a dual app drain battery or slow the phone down?",
    answer:
      "There is extra overhead, but it comes from the second instance rather than from the cloning mechanism itself. Each clone is an independent process with its own memory footprint, background keep-alive, and push channel. For messaging apps the impact is usually small; for large games it is significant in both RAM and battery.",
  },
  {
    question: "Why do some apps refuse to launch inside a clone or report an abnormal environment?",
    answer:
      "That is the app's own risk engine detecting the environment. Banking, payment, some social, and some game apps check for work profiles, multiple instances of the same package, and unusual device fingerprints. It is not a phone fault, and there is no reliable bypass besides using a real second device or the OEM's native dual-app feature.",
  },
  {
    question: "Do the clone and the original share data?",
    answer:
      "No. The clone runs under a different UID with its own /data/data directory, so login state, databases, and cache are fully separate. That separation is exactly why two accounts can be signed in at once, but it also means nothing syncs from the original into the clone.",
  },
  {
    question: "Will uninstalling the clone delete the original app?",
    answer:
      "No. The clone and the original are two independent installations. Disabling the OEM dual-app feature removes only the clone and its data; the primary app and its data are untouched. Still worth confirming the app list before you tap, so you remove the right one.",
  },
];

const ARTICLE2 = (
  <>
    <p>
      &ldquo;App installed, it&apos;s running, but notifications just don&apos;t show up.&rdquo; It is the
      most common misdiagnosis on Android: people reinstall the app, and it changes nothing — because{' '}
      <strong>roughly 90% of notification failures live in the system layer</strong>, not the app.
    </p>
    <p>
      Here is a five-layer diagnostic chain, ordered by probability, with the specific setting to check at
      each layer.
    </p>

    <h2>Layer 1: Notification channels (the #1 culprit since Android 8)</h2>
    <p>
      Android 8.0 introduced <strong>notification channels</strong>. A single app can define many channels —
      chat messages, system notices, marketing, download progress — and{' '}
      <strong>each channel has its own on/off switch and importance level that the app cannot override</strong>
      .
    </p>
    <p>This explains the classic &ldquo;reinstalling didn&apos;t help&rdquo;:</p>
    <ul>
      <li>You turned off a channel at some point</li>
      <li>The app&apos;s channel metadata is stored in the system database by package name + channel ID</li>
      <li>
        <strong>Uninstalling does not clear that database record.</strong> As long as the channel ID is
        unchanged, it stays off.
      </li>
    </ul>
    <p>
      <strong>Where to look:</strong>
    </p>
    <pre>
      <code>{`Settings → Notifications → [the app] → inspect the channel list below`}</code>
    </pre>
    <p>For each channel check:</p>
    <ul>
      <li>Is it enabled?</li>
      <li>
        Is importance set to <strong>Urgent/High</strong>? (Default, Low, and None never show a heads-up
        banner)
      </li>
      <li>Is it set to silent?</li>
    </ul>
    <p>
      <strong>Fix:</strong> set importance to High, or reset entirely:
    </p>
    <pre>
      <code>{`# List all channels for an app
adb shell dumpsys notification --noredact | grep -A 20 "com.example.app"

# Reset channel settings for one app (run while app is alive)
adb shell cmd notification reset com.example.app`}</code>
    </pre>

    <h2>Layer 2: In-app notification settings</h2>
    <p>
      Many apps maintain <strong>two separate settings surfaces</strong>: the system one (layer 1) and their
      own internal one.
    </p>
    <p>
      WeChat&apos;s &ldquo;new message notifications,&rdquo; Telegram&apos;s per-chat toggles, Slack&apos;s
      channel settings — any of these can be off inside the app while the system layer looks perfectly fine.
    </p>
    <p>
      Order of inspection: <strong>in-app settings → Settings → Notifications.</strong> Not the reverse.
    </p>

    <h2>Layer 3: Do Not Disturb and focus modes</h2>
    <p>
      DND intercepts <strong>above</strong> the channel layer. Even a channel with importance
      &ldquo;High&rdquo; will not fire while DND is on.
    </p>
    <p>Commonly missed:</p>
    <ul>
      <li>
        <strong>Scheduled DND</strong>: 23:00–07:00 automatically, set months ago and forgotten
      </li>
      <li>
        <strong>Driving / sleep modes</strong>: several ROMs tie these into DND
      </li>
      <li>
        <strong>Allow exceptions</strong>: per-contact or per-app allowlists live inside the DND settings
      </li>
    </ul>
    <pre>
      <code>{`Settings → Sound & vibration (or Notifications) → Do Not Disturb → Allow exceptions → Apps`}</code>
    </pre>

    <h2>Layer 4: Battery optimization and background limits (the OEM problem)</h2>
    <p>
      A notification can only fire if <strong>the app&apos;s push process is alive</strong>. Aggressive OEM
      power management kills background processes hard — and sideloaded apps get hit hardest, because the
      system tags them as unknown-source and applies stricter defaults.
    </p>
    <p>
      This is the <strong>specific trap for sideload users</strong>: the same app installed from the Play
      Store and installed from an APK may get different background treatment.
    </p>
    <p>
      <strong>Settings to loosen, one by one:</strong>
    </p>
    <table>
      <thead>
        <tr>
          <th>Setting</th>
          <th>Example path</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Autostart</td>
          <td>Settings → Apps → Autostart manager</td>
          <td>Let the push service survive boot</td>
        </tr>
        <tr>
          <td>Associated startup</td>
          <td>Same</td>
          <td>Allow being woken by other apps</td>
        </tr>
        <tr>
          <td>Background activity</td>
          <td>Settings → Battery → App power management</td>
          <td>Set Unrestricted / Allow</td>
        </tr>
        <tr>
          <td>Battery optimization whitelist</td>
          <td>Settings → Battery → Optimization → All apps</td>
          <td>Set the app to Not optimized</td>
        </tr>
        <tr>
          <td>Lock in recents</td>
          <td>Pull down the card in the multitask view and lock it</td>
          <td>Survive &ldquo;clear all&rdquo;</td>
        </tr>
      </tbody>
    </table>
    <p>
      Take <strong>FCM / HMS Push</strong> specifically. If Google Play Services (FCM) is background-limited,
      every FCM-dependent app — WhatsApp, Telegram, Gmail, Slack — will delay or entirely drop notifications.
      This is the primary reason overseas apps &ldquo;don&apos;t get messages&rdquo; on Android phones sold in
      China.
    </p>
    <p>
      <strong>Fix FCM:</strong>
    </p>
    <pre>
      <code>{`Settings → Apps → Google Play services → Battery → Unrestricted`}</code>
    </pre>

    <h2>Layer 5: Is the push service usable at all?</h2>
    <p>If all four layers above are open and there is still nothing, the problem may not be your phone:</p>
    <ol>
      <li>
        <strong>FCM unreachable.</strong> In mainland China, Google services are not reachable without a
        working connection, so FCM-dependent apps get no push. This requires a network environment that can
        actually reach Google.
      </li>
      <li>
        <strong>HMS token not registered.</strong> On Huawei devices, apps installed outside Huawei AppGallery
        may not obtain an HMS token.
      </li>
      <li>
        <strong>App frozen by the OEM.</strong> Some ROMs auto-freeze rarely used apps; opening it once thaws
        it.
      </li>
    </ol>
    <p>
      <strong>Verify whether push arrives (no UI needed):</strong>
    </p>
    <pre>
      <code>{`adb logcat -s NotificationService:* NotificationManager:* | grep com.example.app`}</code>
    </pre>
    <p>
      If you see <code>enqueueNotification</code> but no banner appears, it is a <strong>channel or DND
      problem</strong> (layers 1 and 3). If you see nothing at all, the <strong>push never arrived</strong>{' '}
      (layers 4 and 5).
    </p>
    <p>
      That one command cleanly separates &ldquo;suppressed&rdquo; from &ldquo;never delivered&rdquo; — two
      completely different bugs that look identical from the outside and are usually debugged by blindly
      toggling settings for an hour.
    </p>

    <h2>Fast decision table</h2>
    <table>
      <thead>
        <tr>
          <th>Symptom</th>
          <th>Most likely cause</th>
          <th>Check first</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Some messages notify, others don&apos;t</td>
          <td>Channel-level importance</td>
          <td>Layer 1, per-channel importance</td>
        </tr>
        <tr>
          <td>Silent, not even a badge</td>
          <td>Push not delivered</td>
          <td>Layer 5, logcat + FCM status</td>
        </tr>
        <tr>
          <td>Badge appears, no banner</td>
          <td>Low channel importance + DND</td>
          <td>Layers 1 + 3</td>
        </tr>
        <tr>
          <td>Everything arrives only when the app opens</td>
          <td>Background restricted</td>
          <td>Layer 4, battery whitelist</td>
        </tr>
        <tr>
          <td>Still broken after reinstall</td>
          <td>Stale channel settings</td>
          <td>
            Layer 1, <code>cmd notification reset</code>
          </td>
        </tr>
        <tr>
          <td>No lock-screen notification, fine when unlocked</td>
          <td>Lock screen notification setting</td>
          <td>Notifications → Lock screen → Show all content</td>
        </tr>
      </tbody>
    </table>

    <h2>One piece of context about notification delay</h2>
    <p>
      Android notification latency is a property of the <strong>push architecture</strong>:
    </p>
    <ul>
      <li>
        <strong>FCM uses a persistent socket.</strong> Latency is normally under a second. Network switching,
        weak signal, and power saving tear the socket down, and messages queued during reconnection are lost.
      </li>
      <li>
        <strong>Chinese apps mostly use self-hosted sockets or vendor push</strong> (Mi Push, HMS, OPPO
        Push). Those channels are stable on their own brand of device and degrade to polling cross-brand —
        which can mean minutes of delay.
      </li>
      <li>
        <strong>This is not directly related to where you downloaded the APK</strong> — but if the APK came
        from a non-official channel and its signature differs from the original, the system may tag it as an
        unknown source and tighten background permissions, which indirectly destabilizes push.
      </li>
    </ul>
    <p>
      So if you are fighting unstable notifications on a sideloaded app, first confirm the package you are
      holding is the officially signed build. Pulling the original from Google Play via{' '}
      <Link href="/">gptoapk.com</Link> eliminates the &ldquo;modified package / wrong channel&rdquo; class of
      problems and leaves a much shorter list to debug.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "I turned a notification channel off — why does reinstalling still not bring notifications back?",
    answer:
      "Channel settings are stored in the system database keyed by package name plus channel ID, and uninstalling an app does not remove that record. If the reinstalled app uses the same channel ID, the previous off state is reused. Open the channel in Notifications settings and enable it manually, or run adb shell cmd notification reset <package> to clear it.",
  },
  {
    question: "The app shows a badge but no banner and nothing on the lock screen. Why?",
    answer:
      "Usually two conditions stacked. First, the channel importance is set to Default or Low, which does not produce a heads-up banner. Second, Do Not Disturb or a focus mode is active. Raise the channel to Urgent, then check the DND schedule and the allow-exceptions list.",
  },
  {
    question: "Why do many messages arrive at once only after I open the app?",
    answer:
      "The pushes are arriving but being held, or the app's push process only runs while the app is in the foreground. The typical cause is background restriction: the app is not whitelisted from battery optimization, autostart and associated startup are disabled, or the process is reclaimed under memory pressure. Loosen those one by one and real-time delivery usually returns.",
  },
  {
    question: "How do I get notifications from FCM-dependent apps on an Android phone in China?",
    answer:
      "First confirm Google Play services is unrestricted and whitelisted from battery optimization, then check whether the network can actually reach FCM. If it cannot, the socket fails to reconnect repeatedly and no notifications can arrive. Some Chinese ROMs also provide a notification assist or vendor push option in notification settings as a supplement.",
  },
];

export const enPosts20261112B = [
  {
    slug: "android-dual-app-four-approaches",
    title: "How to Run Two Copies of Any Android App: Four Approaches, Ranked by Risk",
    description:
      "Dual apps are a real Android capability — but most parallel-space apps on the store are containers that can read your login tokens. Four legitimate ways to run a second instance, from OEM dual-app features to work profiles, and why repackaged multi-open APKs are a trap.",
    date: "2026-11-12",
    readTime: "9 min read",
    tags: ["android", "apk", "privacy"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-app-notifications-not-showing-fix",
    title: "Android App Not Showing Notifications? A Layer-by-Layer Diagnostic",
    description:
      "If an app runs but never shows a notification, reinstalling usually fixes nothing — 90% of these failures live in the system layer. A five-layer diagnostic chain, from notification channels to OEM background killing, plus the one adb command that separates suppressed from never delivered.",
    date: "2026-11-12",
    readTime: "11 min read",
    tags: ["android", "notifications", "troubleshoot"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261112BList = toList(enPosts20261112B);
