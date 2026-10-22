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
    question: "Where do I find the crash log on an Android phone without root?",
    answer:
      "Use the built-in bug report: enable Developer options (tap Build number seven times), then Settings → System → Developer options → Bug report → Full report. It produces a zip containing bugreport-*.txt, where you can search your package name and find the FATAL EXCEPTION block. No root and no computer required.",
  },
  {
    question: "What is the fastest way to get a crash log with a computer?",
    answer:
      "Run adb logcat -c to clear the buffer, reproduce the crash, then adb logcat -b crash. The crash buffer prints only fatal exceptions, so the FATAL EXCEPTION block is the first thing you see. Pipe it to a file with adb logcat -b crash > crash.txt for analysis.",
  },
  {
    question: "What does UnsatisfiedLinkError or dlopen failed mean?",
    answer:
      "It means a native library could not be loaded. The usual cause is a mismatched CPU architecture, or a split APK installed without its config.arm64_v8a component so the lib/ directory is empty. Reinstall with a complete package or use a split-aware installer such as SAI.",
  },
  {
    question: "Does restarting or clearing memory fix a crash?",
    answer:
      "Only for OutOfMemoryError. If the log shows UnsatisfiedLinkError, ParseException, or SecurityException, the cause is the installation package or app permissions, not the phone's memory, and restarting will change nothing. Read the log first, then act.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why can an app not connect to the internet when the phone's network works?",
    answer:
      "The three main causes are a missing network permission (Chinese ROMs often disable mobile data for newly installed apps by default), a tampered or incomplete split APK missing its native networking module, and the system clock being wrong, which breaks certificate validation for every HTTPS request.",
  },
  {
    question: "How do I check if a split APK was installed incompletely?",
    answer:
      "Run adb shell pm path com.example.app. A healthy install lists multiple lines: base.apk plus split_config.arm64_v8a.apk and density splits. If only base.apk appears, native libraries are missing and network or rendering code that depends on them will fail.",
  },
  {
    question: "Can a wrong system clock really prevent an app from loading content?",
    answer:
      "Yes. HTTPS certificate validation compares the certificate's validity window against the device clock. A clock set years forward or back causes SSLHandshakeException across the board, which many apps surface as a generic 'network error'. Set time to automatic and restart the app.",
  },
  {
    question: "Does a proxy or VPN app break other apps' connectivity?",
    answer:
      "It can. Global proxy tools replace DNS and route traffic through a selected node. If an app's domain is routed to a dead node, or the app is excluded from the proxy while DNS still points through it, that app alone loses connectivity. Temporarily disable the proxy to confirm.",
  },
];

const ARTICLE1 = (
  <>
    <p>
      An app that closes the moment you tap its icon, or drops back to the home screen mid-use, is not a mystery. Android
      records a specific error every time an app dies. Nobody just tells you where to look.
    </p>
    <p>
      This guide covers the practical part: how to capture the crash log on the phone itself, without root and without
      installing desktop software, and how to read it.
    </p>
    <div className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
      <p className="m-0 text-sm text-emerald-900 dark:text-emerald-200">
        <strong>Bottom line:</strong> 90% of the answer sits in three lines — the exception type, the location
        (<code>at ...</code>), and the root cause (<code>Caused by</code>). Get those three lines before trying any fix.
      </p>
    </div>

    <h2>Three kinds of &quot;crash&quot; that need different fixes</h2>
    <p>
      People conflate these, which is why the same fix gets tried five times and fails five times.
    </p>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">Symptom</th>
            <th className="text-left py-2 pr-4">Pattern</th>
            <th className="text-left py-2">Typical cause</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Crash on launch</td>
            <td className="py-2 pr-4">White screen, back to home in 0.5s</td>
            <td className="py-2">Missing library, ABI mismatch, signing conflict</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Runtime crash</td>
            <td className="py-2 pr-4">Works, then suddenly exits</td>
            <td className="py-2">Null pointer, denied permission, low memory</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">ANR (not responding)</td>
            <td className="py-2 pr-4">Freezes, dialog appears</td>
            <td className="py-2">Main thread blocked, deadlock</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Crash-on-launch usually means <strong>the APK you installed is wrong</strong> — especially packages from
      third-party sites. Runtime crashes are usually data or permissions. ANRs are the app&apos;s own code quality.
    </p>

    <h2>Method 1: the built-in bug report (no tools at all)</h2>
    <p>
      This is the most overlooked and highest-success method, and it works on any phone running Android 7.0 or later.
    </p>
    <ol>
      <li>
        Open <strong>Settings → About phone</strong>, tap <strong>Build number</strong> seven times to unlock Developer
        options.
      </li>
      <li>
        Go to <strong>Settings → System → Developer options</strong>.
      </li>
      <li>
        Find <strong>Bug report</strong> and choose <strong>Full report</strong>.
      </li>
      <li>Wait one to three minutes. A notification appears; tap it to share or save.</li>
    </ol>
    <p>
      You get a zip. Extract it and find <code>bugreport-*.txt</code> (tens of megabytes — don&apos;t open it in a phone
      text editor). Search for your package name, then scroll up to the <code>FATAL EXCEPTION</code> block.
    </p>
    <p>
      The advantage is a complete system-level log including ANR traces. The disadvantage is size.
    </p>

    <h2>Method 2: ADB and logcat (fastest and clearest)</h2>
    <p>With a computer, this takes under a minute.</p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`# 1. Enable USB debugging on the phone, then:
adb devices

# 2. Clear old logs so noise doesn't bury the crash
adb logcat -c

# 3. Capture only crash-level output (the key command)
adb logcat -b crash

# 4. Or tail everything from one app
adb logcat --pid=$(adb shell pidof -s com.example.app)`}</pre>
    <p>Reproduce the crash and the terminal prints something like:</p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`FATAL EXCEPTION: main
Process: com.example.app, PID: 12345
java.lang.UnsatisfiedLinkError: dlopen failed: library "libfoo.so" not found
    at java.lang.Runtime.loadLibrary0(Runtime.java:1016)
    at com.example.app.MainActivity.onCreate(MainActivity.java:42)`}</pre>
    <p>
      Save it for analysis: <code>adb logcat -b crash &gt; crash.txt</code>.
    </p>

    <h2>Method 3: a log viewer app on the phone</h2>
    <p>
      Without a computer, a logcat viewer works for most cases. Since Android 4.1, apps can read their own logs without
      root. Reading all apps&apos; logs on Android 10+ generally needs a one-time ADB grant:
    </p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`adb shell pm grant com.example.logcat android.permission.READ_LOGS`}</pre>
    <p>Grant once, and it persists.</p>

    <h2>How to read it: five keywords</h2>
    <p>Scan in this order.</p>
    <p>
      <strong>1. <code>FATAL EXCEPTION</code></strong> — the start of the crash; the cause is three lines below.
    </p>
    <p>
      <strong>2. The exception type</strong> — this tells you what kind of problem it is:
    </p>
    <ul>
      <li>
        <code>NullPointerException</code> — app bug, nothing the user can do
      </li>
      <li>
        <code>UnsatisfiedLinkError</code> / <code>dlopen failed</code> — <strong>ABI mismatch</strong> or a split APK
        installed without its native config
      </li>
      <li>
        <code>OutOfMemoryError</code> — low memory or a leak
      </li>
      <li>
        <code>SecurityException</code> — permission denied
      </li>
      <li>
        <code>ParseException</code> / <code>PackageParser</code> — damaged package
      </li>
    </ul>
    <p>
      <strong>3. <code>Caused by:</code></strong> — the actual root cause, often different from the headline exception.
    </p>
    <p>
      <strong>4. <code>at com.xxx.yyy</code></strong> — the exact class and method. Your app&apos;s package means the
      app&apos;s fault; <code>android.</code> means the system.
    </p>
    <p>
      <strong>5. <code>Process</code> and <code>PID</code></strong> — which process died. Multi-process apps often crash
      in a push service, not the main process.
    </p>

    <h2>Three common scenarios and their fixes</h2>
    <h3>UnsatisfiedLinkError — installs but won&apos;t open</h3>
    <p>The most common problem with APKs from third-party sources. Causes:</p>
    <ul>
      <li>Only the base of a split APK was installed, without <code>config.arm64_v8a</code></li>
      <li>The package is for a different CPU architecture</li>
      <li>The package was &quot;slimmed&quot; and native libraries were stripped</li>
    </ul>
    <p>
      Fix: reinstall with the complete package, or use a split-aware installer. Check your architecture first with{" "}
      <code>adb shell getprop ro.product.cpu.abi</code>.
    </p>

    <h3>SecurityException or permission crashes</h3>
    <p>
      Android 13+ split notifications, media, and nearby-devices permissions out of the older groups, and older apps
      crash outright. Fix: grant the permissions manually under App info → Permissions.
    </p>

    <h3>Crashes right after an update</h3>
    <p>
      Usually the new version reading old data. Try clear cache first, then clear data (losing login state), then
      uninstall and reinstall — after backing up the APK itself.
    </p>

    <h2>Quick reference for non-technical users</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">Log shows</th>
            <th className="text-left py-2 pr-4">Meaning</th>
            <th className="text-left py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">dlopen failed</td>
            <td className="py-2 pr-4">Incomplete or wrong-ABI package</td>
            <td className="py-2">Reinstall a complete package</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">PackageParser / ParseException</td>
            <td className="py-2 pr-4">Damaged package</td>
            <td className="py-2">Download again</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SecurityException</td>
            <td className="py-2 pr-4">Missing permission</td>
            <td className="py-2">Grant manually</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">OutOfMemoryError</td>
            <td className="py-2 pr-4">Not enough memory</td>
            <td className="py-2">Close background apps</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">NullPointerException</td>
            <td className="py-2 pr-4">App bug</td>
            <td className="py-2">Update or roll back</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>The pitfall almost everyone hits</h2>
    <p>
      After a crash, the instinct is to reboot and clear memory. That only helps with memory problems. If the log says{" "}
      <code>UnsatisfiedLinkError</code> or <code>ParseException</code>, rebooting a hundred times changes nothing —{" "}
      <strong>the problem is not the phone, it is the install package in your hand</strong>.
    </p>
    <p>
      The order should be: read the log, classify the failure, then act. That is also why professional troubleshooting
      is never &quot;just reinstall&quot; — it is gathering evidence first.
    </p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      Need a verified, complete APK instead of guessing whether your download was truncated?{" "}
      <Link href="https://www.gptoapk.com/en" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      serves full packages with published checksums.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p>
      An app opens, spins, and reports a network error — while the phone is clearly online. WeChat sends messages, the
      browser loads pages. Only this one app can&apos;t reach the network.
    </p>
    <p>
      The confusing part is that the answer usually isn&apos;t &quot;the network.&quot; It&apos;s that{" "}
      <strong>the app never got permission to use the network</strong>, or an OS policy is blocking it, or the app&apos;s
      own network configuration doesn&apos;t match reality.
    </p>
    <div className="not-prose my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
      <p className="m-0 text-sm text-emerald-900 dark:text-emerald-200">
        <strong>Bottom line:</strong> three families of cause — <strong>permission not granted</strong>,{" "}
        <strong>system network policy blocking</strong>, and <strong>app-level config (DNS, certificate, proxy)</strong>.
        90% of cases are in the first two.
      </p>
    </div>

    <h2>Step 1: is it this one app, or everything?</h2>
    <p>Do a control test first so you don&apos;t waste an hour.</p>
    <ol>
      <li>Open a browser and load any page — does it work?</li>
      <li>Open another third-party app — does it connect?</li>
      <li>Is it only this one app?</li>
    </ol>
    <p>
      If steps 1 and 2 fail, it&apos;s a phone-wide network problem (Wi-Fi portal login pending, data toggle off, VPN
      down). Unrelated to the APK. If only step 3 fails, continue.
    </p>

    <h2>Step 2: check the network permission (most common, especially Chinese ROMs)</h2>
    <p>
      Since Android 6.0, <code>INTERNET</code> is a normal permission granted at install time — it won&apos;t appear in
      the permission list. But many custom OEM builds add a separate network control layer.
    </p>
    <ul>
      <li>
        <strong>Xiaomi / Redmi:</strong> Settings → Apps → App → Data usage — check both Wi-Fi and mobile data
      </li>
      <li>
        <strong>Huawei / Honor:</strong> Phone Manager → Data traffic → App network access
      </li>
      <li>
        <strong>OPPO / OnePlus:</strong> Settings → App management → App → Data usage
      </li>
      <li>
        <strong>vivo:</strong> iManager → Data monitoring → Network management
      </li>
    </ul>
    <p>
      This is the classic trap: <strong>the system disables mobile data for newly installed apps by default</strong> and
      only allows Wi-Fi. The moment you leave the house, the app &quot;loses internet.&quot;
    </p>

    <h2>Step 3: turn off privacy and &quot;pure mode&quot; interception</h2>
    <p>
      OEM privacy features intercept network requests from &quot;suspicious&quot; apps, producing an app that opens but
      never finishes loading.
    </p>
    <ul>
      <li>Huawei: Settings → System &amp; updates → Pure Mode (turn off)</li>
      <li>Xiaomi: Settings → Privacy protection → Special permissions → review restricted apps</li>
      <li>Some models: Security Center → Network assistant → check the blocklist</li>
    </ul>

    <h2>Step 4: check for VPN or proxy hijacking</h2>
    <p>If you run a proxy tool (Clash, Surge, V2Ray and similar), it takes over traffic:</p>
    <ul>
      <li>A routing rule sends this app&apos;s domain to a node that doesn&apos;t work</li>
      <li>The app is excluded from the proxy while system DNS still points through it</li>
    </ul>
    <p>
      Test by temporarily disabling the proxy. If connectivity returns, the routing rules are the problem — set the app
      or its domain to direct.
    </p>

    <h2>Step 5: check APK integrity and ABI (specific to third-party packages)</h2>
    <p>
      The app UI opens but any content load fails with a network error, and the log shows{" "}
      <code>NoClassDefFoundError</code> or <code>UnsatisfiedLinkError</code>. This is a strong signal.
    </p>
    <p>
      Many apps put networking, crypto, and image decoding in native libraries. Install only the base of a split APK
      without <code>config.arm64_v8a</code> and the native layer fails to initialise — so the networking module dies
      before it ever sends a request.
    </p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`adb shell pm path com.example.app
# Healthy: base.apk + split_config.arm64_v8a.apk + ...
# Broken:  only base.apk`}</pre>
    <p>Fix: install base plus configs together with a split-aware installer.</p>

    <h2>Step 6: certificates (a major change in Android 7.0+)</h2>
    <p>
      Since Android 7.0, <strong>apps no longer trust user-installed CA certificates by default</strong>. Consequences:
    </p>
    <ul>
      <li>Proxy tools like Charles or HttpCanary installed a self-signed certificate — it only works if the app opts in</li>
      <li>Apps with certificate pinning break entirely when the chain changes</li>
      <li>A wrong system clock (after a flash, battery swap, or manual change) breaks certificate validation for every HTTPS request</li>
    </ul>
    <p>
      Test it: set the phone time to automatic, then restart the app. Clock problems are an extremely common and
      extremely overlooked cause of &quot;this app has no internet.&quot;
    </p>

    <h2>Step 7: DNS and domain resolution</h2>
    <p>Some overseas apps can&apos;t resolve their API domain and just spin. Check from a computer on the same Wi-Fi:</p>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`nslookup api.example.com`}</pre>
    <p>
      No result, or an obviously wrong IP, means a DNS-layer problem. Also check the APN settings: setting the IP
      protocol to <code>IPv4/IPv6</code> resolves a surprising number of cases.
    </p>

    <h2>Step 8: data and cache corruption</h2>
    <p>If the app worked before and suddenly doesn&apos;t:</p>
    <ol>
      <li>Clear cache (safe, keeps data)</li>
      <li>Clear data (loses login state)</li>
      <li>Uninstall and reinstall</li>
    </ol>
    <p>
      Apps sometimes store a stale token or an old server address in <code>shared_prefs</code>, which makes every request
      return 401 or time out.
    </p>

    <h2>The shortcut: read the log</h2>
    <pre className="not-prose my-4 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{`adb logcat | grep -iE "UnknownHost|SocketTimeout|SSLHandshake|ConnectException|Permission denied"`}</pre>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">Log keyword</th>
            <th className="text-left py-2 pr-4">Meaning</th>
            <th className="text-left py-2">Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">UnknownHostException</td>
            <td className="py-2 pr-4">DNS failed</td>
            <td className="py-2">DNS, connectivity, proxy</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SocketTimeoutException</td>
            <td className="py-2 pr-4">Connected but no reply</td>
            <td className="py-2">Server or proxy node</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">SSLHandshakeException</td>
            <td className="py-2 pr-4">Certificate validation failed</td>
            <td className="py-2">Clock, proxy cert, pinning</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">ConnectException</td>
            <td className="py-2 pr-4">Connection refused</td>
            <td className="py-2">Port blocked, wrong host</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Permission denied</td>
            <td className="py-2 pr-4">No network permission</td>
            <td className="py-2">Back to step 2</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Scenario cheat sheet</h2>
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 pr-4">Situation</th>
            <th className="text-left py-2 pr-4">Likely cause</th>
            <th className="text-left py-2">Do this first</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Mobile data fails, Wi-Fi works</td>
            <td className="py-2 pr-4">Data toggle disabled for the app</td>
            <td className="py-2">Check app network access</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">UI opens, content never loads</td>
            <td className="py-2 pr-4">Incomplete split APK</td>
            <td className="py-2">pm path, then reinstall full</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">All HTTPS suddenly broken</td>
            <td className="py-2 pr-4">System clock wrong</td>
            <td className="py-2">Set time to automatic</td>
          </tr>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <td className="py-2 pr-4">Broke after proxy/capture tool</td>
            <td className="py-2 pr-4">Certificate or routing rules</td>
            <td className="py-2">Disable proxy, remove cert</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Used to work, stopped recently</td>
            <td className="py-2 pr-4">Local data corruption</td>
            <td className="py-2">Clear data, log in again</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>What not to do</h2>
    <p>
      Don&apos;t factory reset on the first sign of a network problem. Eight of the ten steps above can be verified in
      under three minutes: is it only this app, is the app&apos;s network access on, is the clock right, is the package
      complete. A factory reset is the last resort and costs you things you actually wanted to keep.
    </p>
    <p className="not-prose my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
      Most &quot;installed but no internet&quot; APKs come from incomplete downloads.{" "}
      <Link href="https://www.gptoapk.com/en" className="text-emerald-600 underline">
        gptoapk.com
      </Link>{" "}
      serves complete packages with split configs included.
    </p>
  </>
);

export const enPosts20261022: BlogPostEntry[] = [
  {
    slug: "android-apk-crash-log-how-to-read",
    title: "How to Read an Android Crash Log: Finding the Cause of an App That Closes Itself",
    description:
      "Crash logs on Android are not hidden — just buried. Three ways to capture them (built-in bug report, adb logcat -b crash, on-phone viewer) and the five keywords that identify the cause in seconds.",
    date: "2026-10-22",
    readTime: "10 min read",
    tags: ["android", "apk", "troubleshooting", "debugging"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-app-no-internet-after-apk-install",
    title: "App Installed but No Internet: An Eight-Step Diagnostic for Android",
    description:
      "The network works but one app can't connect. Eight causes in order of likelihood: mobile data toggle, privacy mode, proxy rules, incomplete split APK, system clock, DNS, and corrupted app data — with the logcat keyword for each.",
    date: "2026-10-22",
    readTime: "11 min read",
    tags: ["android", "apk", "network", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261022List = toList(enPosts20261022);
