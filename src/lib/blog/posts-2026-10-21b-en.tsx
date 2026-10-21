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
    question: "Is reverse engineering an APK legal?",
    answer:
      "The act itself is generally lawful in most jurisdictions for interoperability, security research, and personal study. What determines legality is what you do with the result. Analyzing an app you installed, studying an implementation and writing your own, and inspecting a suspicious package are all fine. Redistributing a modified app, defeating licence checks, or publishing someone else's code as yours is infringement.",
  },
  {
    question: "What's the fastest way to check whether a downloaded APK was tampered with?",
    answer:
      "Run apksigner verify --print-certs and compare the SHA-256 certificate digest against a known-good install. Every version the same developer publishes carries the same signature, so a mismatch means the package was rebuilt and re-signed by someone else. It takes about ten seconds and catches the large majority of malicious repackages.",
  },
  {
    question: "Why does jadx fail to decompile some methods?",
    answer:
      "Two common reasons: complex control flow or heavily optimized bytecode, which --show-bad-code works around by showing raw smali; or the app is hardened with a packer, in which case the real code is encrypted and decrypted in memory at runtime. Packed apps only expose the loader stub to static analysis and require dynamic tooling to go further.",
  },
  {
    question: "Can decompiled output be compiled back into a working app?",
    answer:
      "Almost never. Decompilation is lossy: control flow survives, but type information, generics, resource references, and original identifiers do not round-trip. For modifications, patch the smali that apktool emits and rebuild with apktool b, then sign with apksigner. The resigned APK cannot install over the original because the certificate differs.",
  },
];

const FAQS2: BlogFaqItem[] = [
  {
    question: "Do cleaner apps actually speed up an old Android phone?",
    answer:
      "Barely. The real bottlenecks on old devices are RAM pressure from too many resident apps and degraded eMMC random-write performance. Cleaners delete caches and junk files, which touches neither. What works is disabling autostart and inter-app launch for non-essential apps, disabling the three animation scales, and pinning heavy apps to older versions.",
  },
  {
    question: "Does disabling animation scales really make the phone faster?",
    answer:
      "Yes. An old GPU composites a transition frame in three to five times the time a current SoC takes, so you are watching real latency, not a perceptual trick. Turning off window, transition, and animator duration scales removes that latency from every navigation. The only cost is that screens snap instead of sliding.",
  },
  {
    question: "Can a phone that won't boot be recovered?",
    answer:
      "Depends on the failure. Stuck on the boot logo or bootlooping can often be fixed with Recovery wipe cache, then factory reset. A corrupted system can be reflashed using the manufacturer's own firmware and tool. A totally dead device with no charge response is usually battery or mainboard; test a known-good battery first, and if that fails it is generally not worth repairing.",
  },
  {
    question: "What goes wrong with leaving an old phone plugged in as a security camera?",
    answer:
      "Battery swelling. A lithium cell held at full charge and elevated temperature degrades and expands, often visibly within a year. Use a charge limit around 80 percent if the ROM supports it, or accept that you will replace the battery periodically. Do not leave the phone sealed and permanently plugged in.",
  },
];

const ARTICLE1 = (
  <>
    <p className="lead">
      &ldquo;Reverse engineering an APK&rdquo; sounds like it needs a special setup. It doesn&rsquo;t. An APK is a zip
      archive with a compiled manifest, a Dalvik bytecode file, and some resources. Everything you need ships in four
      command-line tools, three of which install in one <code>brew</code> line. The real skill is knowing which tool
      answers which question &mdash; and stopping as soon as you have your answer.
    </p>
    <blockquote>
      <p>
        <strong>Core idea:</strong> Reverse engineering an APK is a read-first workflow, not an edit-first workflow. Most
        real-world use cases are answered by signature verification and the permission manifest, before you ever
        decompile a line of code.
      </p>
    </blockquote>

    <h2>What&rsquo;s inside an APK</h2>
    <p>
      Rename <code>.apk</code> to <code>.zip</code> and open it:
    </p>
    <pre>
      <code>{`app.apk
├── AndroidManifest.xml     # compiled binary XML — not readable as text
├── classes.dex             # Dalvik bytecode (may continue as classes2.dex, ...)
├── resources.arsc          # compiled resource index
├── res/                    # compiled layouts, drawables, values
├── lib/
│   ├── arm64-v8a/*.so      # native libraries per ABI
│   └── armeabi-v7a/*.so
├── assets/                 # raw files, not compiled
└── META-INF/               # signing material`}</code>
    </pre>
    <p>
      Two things surprise people. First, <code>AndroidManifest.xml</code> and everything under <code>res/</code> is
      binary XML, which is why <code>unzip</code> shows garbage and why apktool exists. Second, there is no Java source
      inside &mdash; only Dalvik bytecode, which maps to something Java-like but is not the original source.
    </p>

    <h2>The four-tool chain</h2>

    <h3>apksigner &mdash; &ldquo;is this the real app?&rdquo;</h3>
    <pre>
      <code>apksigner verify --print-certs app.apk</code>
    </pre>
    <p>
      The <strong>SHA-256 digest is stable across every version</strong> the same developer publishes. Compare it against
      a known-good install &mdash; pull the installed APK with <code>adb shell pm path com.example.app</code> then{" "}
      <code>adb pull</code> &mdash; and you have a definitive answer in ten seconds. A mismatch means the package was
      rebuilt and re-signed by someone else. This single step eliminates most malicious repackages.
    </p>

    <h3>aapt2 &mdash; &ldquo;what does it claim to need?&rdquo;</h3>
    <pre>
      <code>{`aapt2 dump badging app.apk | head -30
aapt2 dump permissions app.apk
aapt2 dump permissions suspect.apk > suspect.txt
aapt2 dump permissions official.apk > official.txt
diff official.txt suspect.txt`}</code>
    </pre>
    <p>Extra permissions that matter:</p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Permission</th>
            <th>What it enables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>READ_SMS</code> / <code>RECEIVE_SMS</code>
            </td>
            <td>Steals 2FA codes &mdash; no legitimate reason for most apps</td>
          </tr>
          <tr>
            <td>
              <code>READ_CONTACTS</code>
            </td>
            <td>Bulk contact exfiltration</td>
          </tr>
          <tr>
            <td>
              <code>BIND_ACCESSIBILITY_SERVICE</code>
            </td>
            <td>Read screen content, simulate taps, keylog &mdash; the most abused permission on Android</td>
          </tr>
          <tr>
            <td>
              <code>BIND_DEVICE_ADMIN</code>
            </td>
            <td>Prevent uninstall, lock the device</td>
          </tr>
          <tr>
            <td>
              <code>SYSTEM_ALERT_WINDOW</code>
            </td>
            <td>Overlay attacks &mdash; draw a fake login UI over a real app</td>
          </tr>
          <tr>
            <td>
              <code>REQUEST_INSTALL_PACKAGES</code>
            </td>
            <td>Silently drop and install a second payload</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>A downloaded &ldquo;mod&rdquo; showing three of those is not a mod. It is a dropper.</p>

    <h3>apktool &mdash; &ldquo;what&rsquo;s configured and what resources ship?&rdquo;</h3>
    <pre>
      <code>{`apktool d app.apk -o app_src
grep -rn "https://" app_src/res/values/strings.xml
grep -n 'android:exported="true"' app_src/AndroidManifest.xml
grep -rn "loadLibrary\\|DexClassLoader" app_src/smali`}</code>
    </pre>
    <p>
      You get human-readable <code>AndroidManifest.xml</code>, <code>res/</code> XML, and a <code>smali/</code> tree. An{" "}
      <code>android:exported=&quot;true&quot;</code> component you did not expect is worth understanding: exported
      components can be triggered by any other app on the device, which is real attack surface.
    </p>

    <h3>jadx &mdash; &ldquo;how does it actually work?&rdquo;</h3>
    <pre>
      <code>{`jadx -d out_java app.apk
jadx-gui app.apk   # far more usable: global search, jump to definition`}</code>
    </pre>
    <p>
      jadx decompiles dex into readable Java. Not perfect Java &mdash; control flow is reconstructed and some methods
      fail &mdash; but good enough to follow business logic. Search by string constant to find where a URL or error
      message is used, then jump to definition to walk the call graph.
    </p>

    <h2>Case study 1: is this download tampered with?</h2>
    <ol>
      <li>
        <strong>Signature.</strong> <code>apksigner verify --print-certs</code> and compare the digest. A mismatch means
        stop.
      </li>
      <li>
        <strong>Permissions.</strong> Diff against official. New SMS, accessibility, or install_packages means stop.
      </li>
      <li>
        <strong>Injected libraries.</strong> List <code>lib/arm64-v8a/</code> for <code>.so</code> files that do not
        belong. Native payloads hide here because they are harder to inspect than dex.
      </li>
      <li>
        <strong>Assets.</strong> Anything <code>file</code> cannot identify is worth a look. Encrypted payload blobs
        typically appear as <code>.dat</code> or <code>.bin</code> files in the tens-to-hundreds of KB range reported as
        plain <code>data</code>, decrypted at runtime by a matching <code>.so</code>.
      </li>
    </ol>

    <h2>Case study 2: how does feature X work?</h2>
    <p>
      Search jadx for the API method name, or for a class that appears in <code>logcat</code> when you trigger the
      feature. &ldquo;Find usages&rdquo; walks you to the implementation: thresholds, debounce strategies, retry logic
      &mdash; the parts that usually are not in the docs.
    </p>
    <p>
      <strong>The line here is real:</strong> learning the approach and writing your own implementation is fine. Copying
      decompiled code into your project is copyright infringement, and if the app ships obfuscated you are probably also
      violating its terms of service. Understand, then build.
    </p>

    <h2>Case study 3: recovering your own lost source</h2>
    <pre>
      <code>apktool d myapp.apk -o recovered</code>
    </pre>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Recoverable</th>
            <th>Not recoverable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Layout XML, menus, animations</td>
            <td>Original Java/Kotlin source (only decompiled approximations)</td>
          </tr>
          <tr>
            <td>Drawables &mdash; icons, colors, styles</td>
            <td>Comments</td>
          </tr>
          <tr>
            <td>
              <code>strings.xml</code> &mdash; all UI copy
            </td>
            <td>Original identifiers (obfuscated to a, b, c)</td>
          </tr>
          <tr>
            <td>Manifest: permissions, components, intent filters</td>
            <td>Third-party library sources</td>
          </tr>
          <tr>
            <td>
              Everything under <code>assets/</code>
            </td>
            <td>Build config, Gradle files</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      For an unobfuscated app, jadx output is often readable enough to port business logic by hand. Budget more time than
      you expect: decompiled code loses type information in generic-heavy sections and needs manual cleanup.
    </p>

    <h2>Obfuscation vs. hardening</h2>
    <h3>Obfuscation (R8 / ProGuard)</h3>
    <p>
      Classes and methods are renamed to short identifiers, but structure survives. Lots of single-letter packages in the
      output is the tell &mdash; jadx still shows full control flow, you just infer intent from strings, API calls, and
      data flow. It slows reading down significantly but does not stop it.
    </p>
    <h3>Hardening (packers)</h3>
    <p>
      The real dex is encrypted and decrypted in memory at runtime. Symptoms: <code>classes.dex</code> is suspiciously
      small (a few hundred KB) while the APK is 30+ MB, jadx shows only a loader stub, and native libraries are huge with
      names like <code>libjiagu.so</code>. Getting past this requires dynamic analysis &mdash; Frida hooks, a debugger
      attached to the running process. For most purposes the correct answer at this point is to stop and treat the app as
      opaque.
    </p>

    <h2>Legal boundaries</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Decompiling your own app</td>
            <td>Fine</td>
          </tr>
          <tr>
            <td>Studying an implementation, then writing your own</td>
            <td>Fine</td>
          </tr>
          <tr>
            <td>Analyzing a suspicious APK before installing</td>
            <td>Fine</td>
          </tr>
          <tr>
            <td>Analyzing malware</td>
            <td>Fine, and useful to everyone</td>
          </tr>
          <tr>
            <td>Removing a paywall or licence check for your own use</td>
            <td>Violates ToS; illegal in many jurisdictions</td>
          </tr>
          <tr>
            <td>Modifying and redistributing someone&rsquo;s app</td>
            <td>Copyright infringement</td>
          </tr>
          <tr>
            <td>Publishing a modified app to an app store</td>
            <td>Clearly illegal</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      The tools are neutral. The verification workflow above is the same one a security researcher uses on malware &mdash;
      you are just pointing it at a package you downloaded.
    </p>

    <h2>Common questions</h2>
    <h3>Can decompiled output be recompiled into a working app?</h3>
    <p>
      Not really. Decompilation is lossy: control flow survives, but type information, generics, and resource references
      do not round-trip. For modifications, patch smali and rebuild:
    </p>
    <pre>
      <code>{`apktool b app_src -o modified.apk
keytool -genkey -v -keystore test.keystore -alias test -keyalg RSA -keysize 2048 -validity 10000
apksigner sign --ks test.keystore --ks-pass pass:123456 modified.apk`}</code>
    </pre>
    <p>
      The resigned APK cannot install over the original because the certificate differs &mdash; that is the OS enforcing
      integrity, not a bug.
    </p>

    <h2>The short version</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Tool</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Is this the genuine app?</td>
            <td>
              <code>apksigner --print-certs</code>
            </td>
            <td>10 sec</td>
          </tr>
          <tr>
            <td>What does it ask for?</td>
            <td>
              <code>aapt2 dump permissions</code>
            </td>
            <td>5 sec</td>
          </tr>
          <tr>
            <td>What&rsquo;s configured?</td>
            <td>
              <code>apktool d</code>
            </td>
            <td>1 min</td>
          </tr>
          <tr>
            <td>How does the code work?</td>
            <td>
              <code>jadx-gui</code>
            </td>
            <td>10+ min</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      Start at the top. Most questions never reach the fourth row &mdash; and the first row alone would prevent the
      majority of malicious sideloads. If you just need a Play-distributed APK without trusting a mirror site, use{" "}
      <Link href="/">gptoapk&rsquo;s download tool</Link>, which resolves through Google Play&rsquo;s own distribution
      path.
    </p>
  </>
);

const ARTICLE2 = (
  <>
    <p className="lead">
      A three-year-old Android phone in a drawer is not slow because it is old. It is slow because the software running
      on it grew to assume more memory and faster storage than it has. That distinction matters, because it determines
      whether anything you do will help. Cleaner apps will not. Three specific settings changes will.
    </p>
    <blockquote>
      <p>
        <strong>Core idea:</strong> Old phones bottleneck on <strong>RAM pressure</strong> and{" "}
        <strong>eMMC random-write degradation</strong>, not CPU. Fix RAM pressure with autostart control, mask storage
        latency with disabled animations, and re-role the device when the hardware gap is real.
      </p>
    </blockquote>

    <h2>Step 0 &mdash; measure before you fix anything</h2>
    <p>
      Enable Developer Options (tap Build Number seven times), then turn on <strong>Show CPU usage</strong>. Use the phone
      normally for a day and watch the overlay:
    </p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>What you see</th>
            <th>Real bottleneck</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Memory bar red, pinned near max</td>
            <td>RAM pressure &mdash; apps killed and reloaded</td>
          </tr>
          <tr>
            <td>UI stutters, memory normal, battery fine</td>
            <td>GPU or storage</td>
          </tr>
          <tr>
            <td>Apps take 3&ndash;5s to open, then run fine</td>
            <td>eMMC random-read latency &mdash; hardware, not fixable</td>
          </tr>
          <tr>
            <td>Battery drops fast, warm when idle</td>
            <td>Battery aging &rarr; thermal throttling</td>
          </tr>
        </tbody>
      </table>
    </div>
    <pre>
      <code>{`adb shell dumpsys meminfo | head -20
adb shell cat /proc/meminfo | grep -E "MemTotal|MemAvailable"
adb shell dumpsys battery | grep -E "level|health"`}</code>
    </pre>
    <p>
      <code>MemAvailable</code> under 300 MB on a 4 GB device is your answer, and everything below is about buying that
      back.
    </p>

    <h2>Fix 1 &mdash; autostart control (biggest single win)</h2>
    <p>
      Modern apps assume 8 GB. A shopping app that idles at 400 MB resident on a new phone will pin the same 400 MB on
      yours, because memory targets are not hardware-aware. On Chinese ROMs (MIUI, ColorOS, OriginOS, HyperOS) there is a
      dedicated panel:
    </p>
    <pre>
      <code>{`Settings → Apps → Autostart
Settings → Apps → [app] → Battery → Restricted`}</code>
    </pre>
    <p>
      Turn off everything except messaging apps, authenticator apps, and your keyboard. Then kill{" "}
      <strong>inter-app launch</strong>, the separate switch that lets one app wake another. This is the mechanism that
      makes &ldquo;closing&rdquo; an app pointless &mdash; something else restarts it.
    </p>
    <p>
      <strong>Measured effect:</strong> on a 4 GB device with about 15 user apps, <code>MemAvailable</code> typically
      goes from roughly 250 MB to over 1 GB. That is the difference between reloading a chat app every time and not.
    </p>

    <h2>Fix 2 &mdash; disable all three animation scales</h2>
    <pre>
      <code>{`Settings → Developer options →
  Window animation scale      → Off
  Transition animation scale  → Off
  Animator duration scale     → Off`}</code>
    </pre>
    <p>
      This is not perceptual trickery. An old GPU composites a transition frame in three to five times the time a current
      SoC does, so you are watching real latency. Disabling animations removes that latency from every navigation. The
      tradeoff is visual &mdash; screens snap rather than slide &mdash; but it is the cheapest speedup available and
      takes fifteen seconds.
    </p>

    <h2>Fix 3 &mdash; pin critical apps to older versions</h2>
    <p>
      New app releases target new hardware. Current builds of heavy apps are meaningfully worse on old devices than
      builds from one or two major versions back.
    </p>
    <ol>
      <li>Export app data if needed &mdash; chat backups specifically</li>
      <li>
        Note the signing certificate of your current install: <code>apksigner verify --print-certs</code>
      </li>
      <li>
        Download the target old version and <strong>verify the signature matches</strong> before installing
      </li>
      <li>Uninstall current, install the old version</li>
      <li>
        <strong>Turn off auto-update for that app</strong> &mdash; otherwise the store reverts your work within hours
      </li>
    </ol>
    <p>
      Step five is the one people skip. In Play Store: app page &rarr; three dots &rarr; uncheck &ldquo;Enable
      auto-update&rdquo;.
    </p>

    <h2>Fix 4 &mdash; reduce the launcher&rsquo;s footprint</h2>
    <p>
      The system launcher is often the heaviest always-resident component after the keyboard. Nova Launcher 7.x, KISS
      Launcher, or Niagara reliably reclaim 100&ndash;200 MB and reduce redraw cost during home-screen navigation.
    </p>

    <h2>Fix 5 &mdash; reduce write amplification on storage</h2>
    <p>
      eMMC degrades. After a few years of use, random writes get dramatically slower, and that is the three-to-five
      second &ldquo;app is opening&rdquo; pause. You cannot fix it, but you can stop making it worse:
    </p>
    <ul>
      <li>
        <strong>Keep at least 20 percent free space.</strong> When flash is full, write amplification spikes and latency
        multiplies.
      </li>
      <li>Do not keep 40 GB of video cache &mdash; clear caches periodically or cap cache size in-app.</li>
      <li>Do not let a photo app re-index tens of thousands of images on every launch.</li>
    </ul>

    <h2>Fix 6 &mdash; the nuclear option: factory reset</h2>
    <pre>
      <code>Full backup → Settings → System → Reset → Factory data reset</code>
    </pre>
    <p>
      Long-term use fragments the <code>/data</code> partition and inflates system caches in ways no cleaner reaches. The
      critical part: do not restore the full app backup. Restore photos, contacts, and chat history, then install only
      the apps you actually used in the last month. People who restore everything end up exactly where they started
      within a week.
    </p>

    <h2>When software stops helping: re-role the device</h2>
    <h3>Home or dash camera</h3>
    <p>
      IP Webcam or Alfred turns it into a network camera. <strong>Battery warning:</strong> a phone left on the charger
      24/7 will swell its battery within a year. Use a charge limit around 80 percent if your ROM supports it, or accept
      periodic battery replacement. Do not leave it sealed and plugged in indefinitely.
    </p>
    <h3>Offline media box</h3>
    <p>
      VLC or MX Player plus a USB-C to HDMI adapter makes it a better media box than most budget streaming sticks,
      because the screen and decode pipeline are usually superior.
    </p>
    <h3>Download or SSH station</h3>
    <p>
      ADM for unattended downloads; Termux for real scripting &mdash; Python, Node, curl, and{" "}
      <code>termux-job-scheduler</code> all run natively. A three-year-old midrange phone running Python scraping jobs is
      entirely practical.
    </p>
    <h3>Locked-down device for a kid or elderly parent</h3>
    <p>
      Remove the browser and app store, keep messaging and camera, restrict install permission. What is left is a device
      that cannot be talked into installing anything.
    </p>

    <h2>If it will not boot</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Likely cause</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Totally dead, no charge response</td>
            <td>Battery or board</td>
            <td>Test a known-good battery</td>
          </tr>
          <tr>
            <td>Charge icon only, power button dead</td>
            <td>Power button</td>
            <td>Hold 30s, else hardware repair</td>
          </tr>
          <tr>
            <td>Stuck on boot logo</td>
            <td>Corrupted system</td>
            <td>Recovery: wipe cache, then factory reset</td>
          </tr>
          <tr>
            <td>Boots to Recovery/Fastboot only</td>
            <td>System failure</td>
            <td>Flash official firmware</td>
          </tr>
          <tr>
            <td>Boot loop</td>
            <td>Battery or system</td>
            <td>Battery first, then reflash</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      For a reflash, use <strong>only the manufacturer&rsquo;s firmware and tool</strong> &mdash; Odin (Samsung), MiFlash
      (Xiaomi), <code>fastboot</code> (Pixel/AOSP). Third-party &ldquo;clean ROM&rdquo; sites are a major malware vector;
      a modified system image is the deepest possible compromise.
    </p>

    <h2>The three hardware limits software cannot fix</h2>
    <h3>1. Battery capacity</h3>
    <p>
      Li-ion loses about 20 percent capacity by 500 cycles. Many &ldquo;the phone got slow&rdquo; reports are actually
      battery aging &rarr; voltage sag under load &rarr; throttling &rarr; CPU capped well below spec. A battery swap
      usually costs about 5 percent of a new phone and produces the largest perceived improvement of anything on this
      list.
    </p>
    <h3>2. eMMC random I/O degradation</h3>
    <p>
      Flash does not recover. Once random-read latency has climbed, every app launch pays it. Free space headroom is the
      only mitigation.
    </p>
    <h3>3. Thermal design</h3>
    <p>
      An old phone with a degraded battery generates more heat per unit of work and throttles sooner. Nothing in software
      changes the chassis.
    </p>

    <h2>Repair or retire?</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Verdict</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Battery weak, everything else fine</td>
            <td>Replace battery &mdash; best value move available</td>
          </tr>
          <tr>
            <td>Storage latency high, daily use unpleasant</td>
            <td>Re-role as dedicated device</td>
          </tr>
          <tr>
            <td>System corrupted, hardware fine</td>
            <td>Reflash official firmware</td>
          </tr>
          <tr>
            <td>Cracked screen + weak battery + slow storage</td>
            <td>Retire &mdash; parts or recycling</td>
          </tr>
          <tr>
            <td>Motherboard fault / liquid damage</td>
            <td>Retire, unless the data is irreplaceable</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <strong>Data first.</strong> If there is anything valuable on it, recover data before deciding. A same-model donor
      board plus a competent shop usually costs far less than expected &mdash; and far less than the photos are worth.
    </p>

    <h2>The short version</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Problem</th>
            <th>Fix</th>
            <th>Effort</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apps reload constantly</td>
            <td>Autostart control</td>
            <td>5 min</td>
          </tr>
          <tr>
            <td>Everything feels sluggish</td>
            <td>Disable 3 animation scales</td>
            <td>15 sec</td>
          </tr>
          <tr>
            <td>Specific apps unusable</td>
            <td>Pin older version + block updates</td>
            <td>20 min</td>
          </tr>
          <tr>
            <td>Home screen lags</td>
            <td>Lighter launcher</td>
            <td>5 min</td>
          </tr>
          <tr>
            <td>App launches take 3+ seconds</td>
            <td>Nothing &mdash; keep 20% free space</td>
            <td>&mdash;</td>
          </tr>
          <tr>
            <td>Short battery life</td>
            <td>Replace battery</td>
            <td>~1 hour</td>
          </tr>
          <tr>
            <td>Unpleasant as a phone</td>
            <td>Re-role: camera / media / Termux</td>
            <td>30 min</td>
          </tr>
          <tr>
            <td>Will not boot</td>
            <td>Recovery, then official firmware</td>
            <td>30 min</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      A four-year-old midrange phone still outperforms a 2018 flagship. Half of why it feels slow is software bloat, half
      is battery and flash aging. The first half is fixable with settings; the second half is fixable with parts. Very
      little of it is actually unfixable.
    </p>
  </>
);

export const enPosts20261021B: BlogPostEntry[] = [
  {
    slug: "reverse-engineering-apk-tools-and-legal-boundaries",
    title: "Reverse Engineering an APK: What the Tools Actually Show You (And What's Legal)",
    description:
      "An APK is a zip file. Unpacking it is standard static analysis, not magic. The four-tool chain — apksigner, aapt2, apktool, jadx — and exactly what each step tells you about a package you downloaded.",
    date: "2026-10-21",
    readTime: "11 min read",
    tags: ["android", "apk", "security", "reverse-engineering"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "reviving-old-android-phone-what-actually-works",
    title: "Reviving an Old Android Phone: What Actually Works, Ranked by Impact",
    description:
      "Old phones aren't CPU-limited — they're memory and flash-limited. The ordered fix list that measurably helps, the repurposing options that beat 'daily driver', and the three hardware limits no software can fix.",
    date: "2026-10-21",
    readTime: "10 min read",
    tags: ["android", "performance", "troubleshooting"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261021BList = toList(enPosts20261021B);
