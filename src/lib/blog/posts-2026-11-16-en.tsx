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

const CODE = "bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono";
const PRE = "bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm";
const TH = "border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900";
const TD = "border border-gray-200 dark:border-gray-700 px-3 py-2";

const RESUME_ARTICLE = (
  <>
    <p>You are 150 MB into a 200 MB APK. You take a call, switch back, and the progress bar is at zero. You restart it, and it dies at the same byte again.</p>
    <p>Resuming is not a client-side feature you can switch on. <strong>It is a negotiation</strong>: the server must support byte ranges, and the client must actually use them. If either side is missing, the only path forward is starting over — which is fine, as long as you know that's what you're doing.</p>

    <h2>The mechanism: HTTP Range</h2>
    <p>A normal download says "send me everything." A resumed download says "start at byte N":</p>
    <pre className={PRE}><code>{`GET /app-release.apk HTTP/1.1
Host: example.com
Range: bytes=157286400-`}</code></pre>
    <p>A server that supports it answers:</p>
    <pre className={PRE}><code>{`HTTP/1.1 206 Partial Content
Content-Range: bytes 157286400-209715199/209715200
Content-Length: 52428800`}</code></pre>
    <p>Three conditions must all hold:</p>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>Status is <code className={CODE}>206</code></strong>, not <code className={CODE}>200</code>. A 200 means "I ignored your range and I'm sending the whole file" — which is correct if the file changed underneath you.</li>
      <li><strong><code className={CODE}>Content-Range</code> is present</strong> and its total size matches what you already have on disk.</li>
      <li><strong>The file is the same version.</strong> Downloaders should send <code className={CODE}>If-Range</code> with the validator they saw originally:</li>
    </ol>
    <pre className={PRE}><code>{`If-Range: "a3f5c9e2-19d8b1c"
Range: bytes=157286400-`}</code></pre>
    <p>If the build was replaced in the meantime, the server correctly falls back to a full 200. Accept that. Splicing a fresh header onto an old tail produces a corrupt APK — and a corrupt APK that still installs is worse than one that doesn't.</p>

    <h3>Test any URL in one command</h3>
    <pre className={PRE}><code>{`curl -sI -H "Range: bytes=0-1023" https://example.com/app-release.apk | head -5`}</code></pre>
    <p><code className={CODE}>206 Partial Content</code> means resumable. <code className={CODE}>200 OK</code> with the full Content-Length means it is not; use a segmented downloader or switch networks and accept a full restart.</p>

    <h2>Why Android kills large downloads</h2>
    <p>APKs are big and slow, which puts them directly on top of several Android defaults:</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
      <thead><tr><th className={TH}>Cause</th><th className={TH}>Symptom</th><th className={TH}>Fix</th></tr></thead>
      <tbody>
        <tr><td className={TD}>Process frozen in background</td><td className={TD}>Progress resets after a call</td><td className={TD}>Keep downloader foregrounded, allow background activity</td></tr>
        <tr><td className={TD}>Battery optimisation cuts network</td><td className={TD}>Stalls when screen is off</td><td className={TD}>Set downloader to "Unrestricted"</td></tr>
        <tr><td className={TD}>Wi-Fi ↔ cellular handoff</td><td className={TD}>Connection resets mid-transfer</td><td className={TD}>Disable "switch to mobile data" assistants</td></tr>
        <tr><td className={TD}>Proxy or VPN dropout</td><td className={TD}>Stalls at the same percentage</td><td className={TD}>Avoid sharded proxies; use a stable route</td></tr>
        <tr><td className={TD}>Low storage</td><td className={TD}>Download completes, write fails</td><td className={TD}>Free 2× the APK size</td></tr>
        <tr><td className={TD}>Server rate limiting</td><td className={TD}>Fast start, slow tail, timeout</td><td className={TD}>Wait minutes, don't hammer retry</td></tr>
      </tbody>
    </table></div>
    <p>The most diagnostic symptom is <strong>"retries die at the same byte."</strong> That means everything before the breakpoint is reachable and the problem is near the tail — usually an edge-cache miss on that slice, or an aggressive upstream timeout. Change the source; more retries won't help.</p>

    <h3>Where to grant background permission</h3>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Stock / near-AOSP</strong>: Settings → Apps → Downloader → Battery → Unrestricted</li>
      <li><strong>MIUI / HyperOS</strong>: Apps → Manage apps → Downloader → Battery saver → No restrictions</li>
      <li><strong>ColorOS / OriginOS</strong>: Battery → App battery management → Allow background activity</li>
      <li><strong>One UI</strong>: Battery → Background usage limits → remove from "Sleeping apps"</li>
    </ul>
    <p>Then test properly: lock the phone for ten minutes and check whether the progress moved.</p>

    <h2>Three ways to actually resume</h2>
    <h3>1. Use a downloader that honours Range</h3>
    <p>ADM, IDM-class apps, and most built-in browser downloaders all support it. The only test that matters: after an interruption, does "Retry" continue from the breakpoint or restart at 0%?</p>
    <ul className="list-disc pl-6 space-y-1">
      <li>Download from a <strong>direct file URL</strong>, not a redirect page or a signed link with a short-lived token. Expired tokens turn a resume into a 403.</li>
      <li>Never clear browser cache or the download task while a transfer is incomplete.</li>
      <li>After reconnecting, wait 10–30 seconds before retrying so you don't hit a rate limiter.</li>
    </ul>
    <h3>2. Refresh and restart the task (for expired links)</h3>
    <p>When the URL itself has expired, "Resume" is meaningless — the task points at a dead address. Go back to the page, click download again, and delete the stale task. Delete-then-redownload is cleaner than trying to revive a task with a replaced URL.</p>
    <h3>3. Resumable download on a computer, then copy to the phone</h3>
    <pre className={PRE}><code>{`# -C - resumes from the current end of file; safe to run repeatedly
curl -L -C - -o app-release.apk "https://example.com/app-release.apk"

# wget equivalent
wget -c "https://example.com/app-release.apk"`}</code></pre>
    <p><code className={CODE}>curl -C -</code> is idempotent: after any disconnect, run it again and it computes the offset itself. Keep <code className={CODE}>-L</code>, or a 302 will end the transfer.</p>
    <p>When a single connection is unstable but the server supports ranges, fetch slices in parallel:</p>
    <pre className={PRE}><code>{`SIZE=$(curl -sI "https://example.com/app-release.apk" | awk '/Content-Length/{print $2}' | tr -d '\\r')
for i in $(seq 0 7); do
  START=$(( SIZE / 8 * i ))
  END=$(( SIZE / 8 * (i+1) - 1 ))
  [ $i -eq 7 ] && END=$(( SIZE - 1 ))
  curl -s -r \${START}-\${END} -o part.\$i "https://example.com/app-release.apk" &
done
wait
cat part.* > app-release.apk`}</code></pre>
    <p>Segmented downloads are where corruption actually happens. <strong>Verify before installing.</strong></p>

    <h2>Verify the stitched file — always</h2>
    <ol className="list-decimal pl-6 space-y-1">
      <li><strong>Size</strong> matches the advertised byte count exactly. A few hundred bytes short means the last chunk never landed.</li>
      <li><strong>Hash</strong>, if the site publishes SHA-256:</li>
    </ol>
    <pre className={PRE}><code>{`shasum -a 256 app-release.apk      # macOS
sha256sum app-release.apk          # Linux`}</code></pre>
    <ol className="list-decimal pl-6 space-y-1" start={3}>
      <li><strong>Archive integrity</strong>: <code className={CODE}>unzip -t app-release.apk</code> validates the ZIP central directory. An APK is a ZIP; a broken directory is exactly what "There was a problem parsing the package" reports.</li>
    </ol>
    <p>If any check fails, the only correct action is a full re-download. Particularly for banking, payment, and messaging apps, a single bad byte from a spliced file is enough to make the package untrustworthy.</p>

    <h2>Decision shortcut</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li>Server answers <code className={CODE}>206</code> → use a resumable downloader; the breakpoint reconnects on its own.</li>
      <li>Server answers <code className={CODE}>200</code> → resume is impossible; loop <code className={CODE}>curl -C -</code> or segment-and-verify.</li>
      <li>Dies at the same percentage every time → change source.</li>
      <li>Completes but won't install → run <code className={CODE}>unzip -t</code> and the hash before assuming the build is broken.</li>
    </ul>
    <p>For failures that happen <em>before</em> the transfer starts — 403, 404, expired signed URLs — see <Link href="/en/blog/apk-download-403-404-expired-link-guide" className="text-blue-600 dark:text-blue-400 hover:underline">APK download 403, 404, and mid-transfer failures</Link>, or grab packages directly from the <a href="https://www.gptoapk.com/en" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk APK downloader</a>.</p>
  </>
);

const BATTERY_ARTICLE = (
  <>
    <p>You install an APK from outside the Play Store. Next morning the phone has lost 25% overnight instead of the usual 3%. The easy conclusion — "sideloaded apps drain batteries" — is wrong in a way that matters. <strong>It's a specific behaviour that drains the battery, not the install channel.</strong> The same APK installed from Play would drain just as much.</p>
    <p>The useful move is classifying the drain into one of five causes, because each has a different test and a different fix.</p>

    <h2>Step zero: measure a baseline</h2>
    <p>Feelings are not data. Start with the built-in report: <strong>Settings → Battery → Battery usage</strong>.</p>
    <p>Look at two numbers per app:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Foreground vs background time.</strong> Background time far exceeding real usage is almost always a wake-up problem.</li>
      <li><strong>Network usage.</strong> Abnormal drain usually comes with steady uplink traffic — heartbeats, telemetry, ad requests.</li>
    </ul>
    <p>Watch two full charge cycles before concluding anything. Single-cycle readings swing wildly.</p>
    <p>For something more precise, use adb (enable Developer options → USB debugging):</p>
    <pre className={PRE}><code>{`# per-app attribution with estimated mAh
adb shell dumpsys batterystats --charged com.example.app | head -60

# who is preventing the device from idling
adb shell dumpsys deviceidle | head -40`}</code></pre>
    <p>The full dump is enormous; filter by package first, then read the <code className={CODE}>Wake lock</code>, <code className={CODE}>Mobile radio active</code>, and <code className={CODE}>Sensor</code> sections.</p>

    <h2>Cause 1: an unreleased wake lock</h2>
    <p>The app holds a <code className={CODE}>PARTIAL_WAKE_LOCK</code> to run a background sync and forgets to call <code className={CODE}>release()</code>. The CPU never sleeps.</p>
    <pre className={PRE}><code>{`adb shell dumpsys power | grep -A3 "Wake Locks"`}</code></pre>
    <p><strong>Fix:</strong> you cannot patch the app, but you can contain it — Settings → Apps → the app → Battery → <strong>Restricted</strong>. Android then force-stops it after a period in the background. Caveat: restricted mode delays or kills push notifications. For messaging apps, use cause 3's method instead.</p>

    <h2>Cause 2: background location and sensors</h2>
    <p>Common with maps, fitness, and delivery apps. The tell is that drain <strong>spikes while moving or outdoors</strong> and normalises when stationary indoors.</p>
    <pre className={PRE}><code>{`adb shell dumpsys location | grep -i "client\\|request" | head -20`}</code></pre>
    <p><strong>Fix:</strong> change location permission from "Allow all the time" to "Allow only while using the app." This single change typically removes half the abnormal drain and rarely breaks core functionality.</p>

    <h2>Cause 3: alarm storms</h2>
    <p>Apps schedule syncs with <code className={CODE}>AlarmManager</code>. An interval set to one minute means wake, spin up the process, connect, sleep — continuously.</p>
    <pre className={PRE}><code>{`adb shell dumpsys alarm | grep -B2 -A6 "com.example.app"`}</code></pre>
    <p>Look for <code className={CODE}>RTC_WAKEUP</code> entries and their intervals. A third-party app waking the device more often than every 15 minutes is far outside normal.</p>
    <p><strong>Fix:</strong> stretch the interval at the system level (some ROMs expose "background network restrictions" or "autostart management"), or reduce the app's real-time requirement.</p>

    <h2>Cause 4: a crash loop</h2>
    <p>The most invisible cause. The app starts in the background, crashes immediately, the system restarts it, it crashes again. Nothing is visible on screen, but the CPU is never idle.</p>
    <pre className={PRE}><code>{`adb logcat -b crash -d | grep -i "com.example.app" | tail -30`}</code></pre>
    <p><strong>Fix:</strong> this is usually a <strong>compatibility or packaging problem</strong>, not a battery problem:</p>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>ABI mismatch</strong> — a universal package can load the wrong native library on older devices; the correct <code className={CODE}>arm64-v8a</code> split is often more stable.</li>
      <li><strong>Missing split</strong> — installing only the base APK from a bundle leaves <code className={CODE}>UnsatisfiedLinkError</code> at launch.</li>
      <li><strong>Signature mismatch</strong> — installing the same app from two different sources leaves stale data directories that crash on start.</li>
    </ul>
    <p>Uninstall cleanly and reinstall the matching build. To read ABI, minSdk, and density requirements first, see <Link href="/en/blog/android-apk-compatibility-check-sdk-abi-density" className="text-blue-600 dark:text-blue-400 hover:underline">Android APK compatibility check</Link>.</p>

    <h2>Cause 5: the source itself is the problem</h2>
    <p>This is not poor optimisation, it is <strong>hostile behaviour</strong>: constant background uploads, ad fetches, silent pushes of promoted packages.</p>
    <p><strong>Signal:</strong> standby drain is normal, but battery falls fast the moment the screen is on; network stats show more upload than download.</p>
    <p><strong>Fix:</strong> stop tuning battery settings and uninstall. An unknown-origin APK making frequent outbound connections is a security signal first — the battery is just the symptom you noticed.</p>

    <h2>Order of operations</h2>
    <ol className="list-decimal pl-6 space-y-1">
      <li>Downgrade location permission to "while in use" — five seconds, highest hit rate.</li>
      <li>Set the app to Restricted — tests whether it really is a background wake-up problem.</li>
      <li>Disable autostart / background data for that app.</li>
      <li>Still abnormal? Check <code className={CODE}>adb logcat -b crash</code> for a crash loop; if found, uninstall and install the correct build.</li>
      <li>All of the above fails <em>and</em> there's unexplained traffic → uninstall and re-acquire from a trusted source.</li>
    </ol>

    <h2>Counter-intuitive note</h2>
    <p>"Turn off battery optimisation" gets prescribed as a universal fix, but it addresses <strong>notification latency</strong>, not drain. Setting a chatty app to Unrestricted so its push arrives instantly will make your battery worse, not better. Identify the cause class first — which is why the baseline measurement in step zero isn't optional.</p>
    <p>Most of this work disappears if you verify the package before installing: hash, signature, and the permission list. See <Link href="/en/blog/fix-apk-signature-verification-failed" className="text-blue-600 dark:text-blue-400 hover:underline">APK signature verification guide</Link> for the checks worth doing every time.</p>
  </>
);

export const enPosts20261116 = [
  {
    slug: "android-apk-resume-interrupted-download",
    title: "Resuming an Interrupted APK Download: HTTP Range, Mobile Dropouts, and Verification",
    description: "An APK download that dies at 80% is a server-and-client negotiation problem, not bad luck. Learn how HTTP Range and If-Range work, why Android kills downloads, how to resume with curl -C -, and how to verify a stitched file before installing.",
    date: "2026-11-16",
    readTime: "8 min read",
    tags: ["android", "apk", "download", "http", "gptoapk"],
    content: RESUME_ARTICLE,
    faqs: [
      { question: "How do I check whether an APK download URL supports resuming?", answer: "Send a range request: curl -sI -H \"Range: bytes=0-1023\" <url>. A 206 Partial Content response with Content-Range means resumable. A 200 with the full Content-Length means it is not." },
      { question: "Why does my APK download always fail at the same percentage?", answer: "Everything before that byte is reachable, so the problem is near the tail — typically an edge cache missing that slice or an upstream read timeout. Switch sources instead of retrying." },
      { question: "Can a resumed APK download end up corrupted?", answer: "Byte-range concatenation is safe if the server sends 206 for the same file version. If the build changed mid-transfer, you can end up with mixed content — so always verify SHA-256 and run unzip -t after resuming." },
      { question: "How do I stop downloads dying when my phone screen turns off?", answer: "Set the downloader's battery mode to Unrestricted or allow background activity, disable automatic Wi-Fi to mobile-data switching, and keep the downloader in the foreground." },
    ],
  },
  {
    slug: "apk-install-battery-drain-diagnosis",
    title: "Battery Draining After You Install an APK? Five Causes and How to Tell Them Apart",
    description: "A sideloaded app that halves your standby time is not a vague 'bad optimisation' problem. Diagnose it as a wake lock, background location, alarm storms, a crash loop, or a hostile app — with dumpsys and logcat commands for each.",
    date: "2026-11-16",
    readTime: "7 min read",
    tags: ["android", "apk", "battery", "wakelock", "gptoapk"],
    content: BATTERY_ARTICLE,
    faqs: [
      { question: "What is the first thing to check when battery drain starts after installing an APK?", answer: "Go to Settings → Battery → Battery usage and compare that app's foreground time with its background time. Background time far exceeding real usage almost always means a wake-up problem." },
      { question: "Does restricting an app stop notifications?", answer: "It can delay or block background push. For messaging apps, revoke background location and background data instead of using Restricted mode." },
      { question: "Why does an app show almost no background time but still drain the battery?", answer: "That pattern points to a crash loop: the app starts, crashes, and is restarted repeatedly. Check adb logcat -b crash for repeating stack traces — usually an ABI mismatch, a missing split, or a signature mismatch." },
      { question: "Will disabling battery optimisation fix the drain?", answer: "Usually not, and it can make things worse. Disabling optimisation addresses notification latency; it lets chatty apps run even more freely in the background." },
    ],
  },
];

export const enPosts20261116List = toList(enPosts20261116);
