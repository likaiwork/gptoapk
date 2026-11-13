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

const ARTICLE = (
  <>
      <p>An APK that installs on one Android phone and not another is not a mystery. Compatibility is decided by a small number of independent conditions, each with its own failure signal, and each checkable with one command.</p>
      <p>The reason people get stuck is that they treat &quot;incompatible&quot; as a single diagnosis. It is four, and they are evaluated in order.</p>
      <h2>The four conditions</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Condition</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">What it means</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Fails as</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>minSdkVersion</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">The oldest Android the build supports</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_OLDER_SDK</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>ABI</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">The CPU instruction set the native code targets</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_NO_MATCHING_ABIS</code></td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>targetSdkVersion</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Behavior contract with the current Android</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Installs, then misbehaves</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><strong>Split APKs</strong></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">The app ships as base + config APKs</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INVALID_APK</code> / missing resources</td></tr></tbody>
      </table></div>
      <p>Two are hard blocks. Two are soft failures that only show up after installation, which is why &quot;it installed but does not work&quot; is a distinct problem from &quot;it will not install&quot;.</p>
      <h2>Reading the manifest</h2>
      <p>One command gives you three of the four:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt2 dump badging app.apk | grep -E \"sdkVersion|targetSdkVersion|native-code|package:\""}</code></pre>
      <p>Typical output:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"package: name='com.example.app' versionCode='4201' versionName='4.2.1'\nsdkVersion:'26'\ntargetSdkVersion:'34'\nnative-code: 'arm64-v8a' 'armeabi-v7a'"}</code></pre>
      <h3>minSdkVersion</h3>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">sdkVersion:'26'</code> means Android 8.0. It will not install on anything below. The mapping matters because it is the most common hard failure:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">API</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Android</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Year</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">21</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">5.0 Lollipop</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2014</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">23</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">6.0 Marshmallow</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2015</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">26</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">8.0 Oreo</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2017</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">29</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">10</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2019</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">31</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">12</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2021</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">33</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">13</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2022</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">34</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">14</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2023</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">35</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">15</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">2024</td></tr></tbody>
      </table></div>
      <p>Check your own version in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Settings → About phone → Android version</code>.</p>
      <h3>ABI</h3>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">native-code: 'arm64-v8a' 'armeabi-v7a'</code> means the package contains native libraries for both 64-bit and 32-bit ARM. This is the current standard. What you need to watch for:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>`armeabi-v7a` only</strong> — will run on most phones, but Google Play stopped accepting such builds in 2019, so it is an old package</li>
        <li><strong>`x86` / `x86_64` only</strong> — emulator builds; will not run on a real phone</li>
        <li><strong>No `native-code` line at all</strong> — pure Java/Kotlin app, works on any architecture. Not a problem.</li>
      </ul>
      <p>Your phone's architecture: <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell getprop ro.product.cpu.abi</code> returns <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">arm64-v8a</code> on essentially every phone shipped since 2016.</p>
      <p><strong>A 32-bit-only APK on a 64-bit-only device</strong> is a real scenario on newer phones that dropped 32-bit support. The install fails with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">NO_MATCHING_ABIS</code> and there is no workaround.</p>
      <h3>targetSdkVersion</h3>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">targetSdkVersion</code> does not affect whether the install succeeds. It affects behavior after. What it controls:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Below 23</strong>: Android 14+ restricts installation and warns. Old permission model.</li>
        <li><strong>Below 26</strong>: no notification channels. Notifications behave inconsistently on Android 13+.</li>
        <li><strong>Below 30</strong>: scoped storage opt-out; file access may be blocked on Android 11+.</li>
        <li><strong>Below 33</strong>: no <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">POST_NOTIFICATIONS</code> handling; notifications may silently never appear on Android 13+.</li>
        <li><strong>Below 34</strong>: foreground service types not declared; background services may be killed on Android 14+.</li>
      </ul>
      <p>This is the answer to a very common question: *&quot;the app installed fine but notifications do not work.&quot;* Check <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">targetSdkVersion</code> before you check anything else.</p>
      <h2>Split APKs: the fourth condition</h2>
      <p>Modern apps frequently ship as <strong>base.apk plus configuration splits</strong> (per-ABI, per-density, per-language). You cannot install one split alone, and you cannot install them as separate files by tapping them.</p>
      <p>Symptoms of getting this wrong:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INSTALL_FAILED_INVALID_APK: Missing split for ...</code></li>
        <li>Install succeeds but the app crashes with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Resources$NotFoundException</code></li>
        <li>Only some languages or densities are missing</li>
      </ul>
      <p>How to check:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# If this contains more than one APK, it is a split package\nunzip -l app.apk | head"}</code></pre>
      <p>If the download was an <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.xapk</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apks</code>, or a folder of <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">split_*.apk</code> files, install the whole set:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk"}</code></pre>
      <p>Or use a tool that understands the format. <strong>Installing only `base.apk` from a split package is a common and confusing failure</strong> — it usually installs and then crashes on launch.</p>
      <h2>Checking the device side</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# Android version and API level\nadb shell getprop ro.build.version.release\nadb shell getprop ro.build.version.sdk\n\n# CPU architecture\nadb shell getprop ro.product.cpu.abi\nadb shell getprop ro.product.cpu.abilist\n\n# Screen density\nadb shell wm density\nadb shell wm size"}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">abilist</code> shows every supported ABI, most preferred first. Compare it against the package's <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">native-code</code> line — if there is no overlap, the install is impossible.</p>
      <h2>Density: rarely blocks, often looks wrong</h2>
      <p>Density mismatch does not prevent installation when the package is a universal APK. It matters in two cases:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>Split APKs</strong>: a package containing only <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">xxhdpi</code> resources on an <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">ldpi</code> device renders badly, and some split designs fail to install if the device density does not match any included split.</li>
        <li><strong>Ancient apps</strong>: pre-2012 packages with only <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">mdpi</code> assets look upscaled and blurry.</li>
      </ol>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell wm density</code> returns something like <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Physical density: 440</code>. Values map roughly:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Range</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Bucket</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">120</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">ldpi</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">160</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">mdpi</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">240</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">hdpi</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">320</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">xhdpi</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">480</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">xxhdpi</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">640</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">xxxhdpi</td></tr></tbody>
      </table></div>
      <h2>Diagnostic order</h2>
      <p>When an install fails, check in this order — it matches the order the system evaluates:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Read the actual error code with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb install app.apk</code>. On-device &quot;App not installed&quot; tells you nothing.</li>
        <li>If <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">OLDER_SDK</code> → minSdkVersion exceeds your Android version. Nothing to fix; get a build with a lower minSdk.</li>
        <li>If <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">NO_MATCHING_ABIS</code> → architecture mismatch. Look for a different build variant.</li>
        <li>If <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">INVALID_APK</code> or missing resources → you are installing a split package incorrectly.</li>
        <li>If <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">UPDATE_INCOMPATIBLE</code> → this is a signature problem, not compatibility. Different issue entirely.</li>
        <li>If it installs but crashes → check <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">targetSdkVersion</code> and logcat:</li>
      </ol>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb logcat -c && adb logcat | grep -E \"FATAL|AndroidRuntime\""}</code></pre>
      <h2>The practical summary</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Will not install at all</strong>: minSdkVersion or ABI. Both are hard blocks with no workaround.</li>
        <li><strong>Installs but the UI is broken or missing features</strong>: split APKs installed incompletely.</li>
        <li><strong>Installs and runs but behaves wrong</strong>: targetSdkVersion — the app was written for older Android behavior.</li>
        <li><strong>Installs but crashes immediately</strong>: usually an incompletely installed split, or a missing Google services dependency on ROMs without GMS.</li>
      </ul>
      <p>One habit covers most of this: before downloading, note the package name, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">minSdkVersion</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">native-code</code> from the listing. Sites that publish them — <a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk.com</a> does this per build — let you rule out two hard failures before you spend the bandwidth.</p>
  </>
);

export const enPosts20261113C = [
  {
    slug: "android-apk-compatibility-check-sdk-abi-density",
    title: "If this contains more than one APK, it is a split package",
    description: "The APK downloads fine, installs on your friend's phone, and refuses on yours. Compatibility on Android is decided by three independent checks that have nothing to do with each other — the API level, the CPU architecture, and the screen density — plus one packaging decision that silently breaks installs on some devices. Here is how to read all four in about a minute, with the exact commands.",
    date: "2026-11-13",
    readTime: "5 min read",
    tags: ["android","apk","howto","mobile"],
    content: ARTICLE,
  },
];

export const enPosts20261113CList = toList(enPosts20261113C);
