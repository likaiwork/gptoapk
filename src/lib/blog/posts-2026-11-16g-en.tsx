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
      <p>The install finished, Android said &quot;App installed&quot;, and then you go back to the home screen and there is nothing there. The usual reaction is to download the APK again and reinstall it. In most cases the package is already sitting on the device just fine — what is missing is either a <strong>launcher entry</strong> or the <strong>user space</strong> you are looking in.</p>
      <p>Separate the cases first. It saves a lot of pointless reinstalling.</p>
      <h2>Four different kinds of &quot;I can't find it&quot;</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Symptom</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">What actually happened</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Fastest check</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Not listed in Settings → Apps either</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">The package never landed</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm path com.example.app</code> returns nothing</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Listed in Settings, absent from home screen and drawer</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Installed, but no visible launch entry</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell cmd package resolve-activity --brief com.example.app</code> returns no result</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Listed in Settings, visible only after switching spaces</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Installed into another user or profile</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list users</code> shows multiple users, or the phone has a Work / Private space tab</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Icon existed before, disappeared after an update</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Disabled, hidden, or stale launcher cache</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">The package shows up in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell pm list packages -d</code></td></tr></tbody>
      </table></div>
      <p>Only the first row needs a new download. Reinstalling ten times will not produce an icon in the other three.</p>
      <h2>Layer 1: Ask the package manager, not your eyes</h2>
      <p>With adb connected:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm path com.example.app"}</code></pre>
      <p>A path like <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/.../base.apk</code> means the install succeeded and confirms the exact package name. No output, or <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Error: package not found</code>, means it genuinely is not installed.</p>
      <p>If you are unsure of the package name, list third-party packages only:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages -3"}</code></pre>
      <p>The <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-3</code> filter is far shorter than the full list. In the UI, use Settings → Apps → Show all / Show system and search by app name or version.</p>
      <p><strong>Only when this layer fails should you go back to the download stage</strong>: incomplete file, signature mismatch, or an install rolled back midway. For those, see <a href="https://www.gptoapk.com/en/blog/apk-download-403-404-expired-link-guide" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">APK download 403, 404, and mid-transfer failures</a> and the <a href="https://www.gptoapk.com/en/blog/safe-apk-download-five-gates-checklist" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">safe APK download checklist</a>.</p>
      <h2>Layer 2: Does the package even have a launcher entry?</h2>
      <p>Android does not create an icon for every installed package. The launcher looks for an Activity declaring <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.action.MAIN</code> together with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">android.intent.category.LAUNCHER</code> in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">AndroidManifest.xml</code>. Without that declaration, an app installs perfectly and still never appears in the drawer.</p>
      <p>Let the platform resolver answer:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell cmd package resolve-activity --brief com.example.app"}</code></pre>
      <p>A result prints the package plus Activity class. <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">no result</code> or empty output means there is no launchable main Activity.</p>
      <p>Apps that legitimately have no icon:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Service-only apps</strong> — keyboards, live wallpapers, accessibility services, notification listeners. Their switches live in Settings, not on the home screen.</li>
        <li><strong>Plugins, extensions, font packs, data packs</strong> that only work inside a host app.</li>
        <li>Component packages exposing just a <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">content provider</code> or a broadcast receiver.</li>
        <li>A split APK set where only the base was installed and the feature module carrying the UI is missing — visible in Settings, but it fails on launch.</li>
      </ul>
      <p>For these, look under Settings → Keyboards, Accessibility, or Wallpaper. A keyboard with no launcher icon is completely normal.</p>
      <p>One related but different case: an accessibility toggle that is <strong>greyed out</strong> after sideloading is Android 13+ Restricted Settings, a permission-layer policy rather than an entry-layer problem. See <a href="https://www.gptoapk.com/en/blog/android-restricted-settings-accessibility-sideload" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Android Restricted Settings explained</a>.</p>
      <h2>Layer 3: Which user space was it installed into?</h2>
      <p>A single phone can hold several users, each with its own app list and home screen. Work profile, guest mode, Private Space, and app cloning are all wrappers around that mechanism. A package installed in the main user will not show up in the work profile drawer, or the other way around.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list users\nadb shell pm list packages --user 0\nadb shell pm list packages --user 10"}</code></pre>
      <p>A numeric ID such as <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--user 10</code> usually maps to the work profile. If the package appears under only one user, switch to that space.</p>
      <p>Vendor naming varies, so use this map:</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Vendor / ROM</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Feature that hides apps</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Where to check</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Xiaomi / HyperOS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App lock, hidden apps, Dual apps, Private space</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Settings → Apps → App lock / Privacy protection</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">OPPO / ColorOS, OnePlus</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Hide apps, Private Safe, App cloner</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Settings → Permissions &amp; privacy → Hide apps</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">vivo / OriginOS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Atomic Privacy System, App clone</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Settings → Atomic Privacy System</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Samsung One UI</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Secure Folder, Hide applications</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Home screen settings → Hide apps; or inside Secure Folder</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Stock Android / Pixel</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Work profile, Private Space (Android 15+), Guest</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">&quot;Work&quot; tab at the top of the app drawer; Settings → System → Multiple users</td></tr></tbody>
      </table></div>
      <p>A classic trap: you open the APK from a file manager <strong>inside</strong> the work profile, so the install happens in the work profile, then you go looking on the personal home screen. No reinstall is needed — open it in the right space, or copy the APK back to the main user and install there.</p>
      <h2>Layer 4: The launcher is hiding it</h2>
      <p>Package present, entry present, correct user — now it is a launcher problem:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Search the app drawer.</strong> If the name is found but no icon renders, the icon cache or icon pack is at fault.</li>
        <li><strong>Try a different launcher.</strong> Temporarily switch to the stock launcher or a third-party one; an icon appearing there confirms the original launcher's data is stale.</li>
        <li><strong>Clear the launcher cache.</strong> Settings → Apps → your launcher → Clear cache. Clearing *data* resets your home layout, so screenshot it first.</li>
        <li><strong>Check the hidden apps list.</strong> Many launchers have one, and a single accidental tick removes an app from the drawer.</li>
        <li><strong>Icon packs.</strong> After switching icon packs, some launchers show nothing for apps with no matching icon resource. Disable the pack to confirm.</li>
      </ul>
      <h2>Layer 5: Disabled or policy-hidden</h2>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages -d</code> lists disabled packages:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages -d"}</code></pre>
      <p>If your package is in there, re-enable it:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm enable com.example.app"}</code></pre>
      <p>Typical causes: device admin or enterprise MDM policy, parental controls, vendor &quot;deep sleep&quot; or auto-disable of unused apps (Android 12+ on some ROMs), or simply having disabled it manually earlier. The icon normally returns immediately.</p>
      <h2>When to stop looking and start worrying</h2>
      <p>No icon plus any of the following means you should not keep hunting for a launch entry:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Standby drain or background data spikes, from a package name you do not recognise;</li>
        <li>Accessibility, notification access, SMS, or overlay permissions requested;</li>
        <li>The APK did not come from a source you deliberately chose.</li>
      </ul>
      <p>No icon plus a permanently resident background process is one of the most common shapes of a malicious package — it was never meant for you to tap. Uninstall it:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm uninstall com.example.app"}</code></pre>
      <p>Verifying the signature and permission list before installing is far cheaper than investigating afterwards; see the <a href="https://www.gptoapk.com/en/blog/fix-apk-signature-verification-failed" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">APK signature verification guide</a>. If drain and wake-ups are already visible, <a href="https://www.gptoapk.com/en/blog/apk-install-battery-drain-diagnosis" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Battery draining after you install an APK</a> walks through the five cause classes.</p>
      <h2>One-line decision list</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm path</code> empty → genuinely not installed; go back to download and verification.</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">resolve-activity</code> empty → no launcher entry by design; find the toggle in Settings.</li>
        <li><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list users</code> shows several users → switch to the work profile / private space / clone.</li>
        <li>Package in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages -d</code> → <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm enable</code> it.</li>
        <li>Drawer search finds it but no icon renders → clear launcher cache or drop the icon pack.</li>
        <li>Everything checks out but drain and traffic persist → uninstall, do not keep looking for an icon.</li>
      </ul>
      <p><strong>The order matters.</strong> Start with &quot;is the package there&quot;, not &quot;reinstall it once more&quot;. Almost every &quot;installed but no icon&quot; report is a deviation in the entry, user-space, or launcher-display layer — not a failed install.</p>
  </>
);

export const enPosts20261116G = [
  {
    slug: "apk-installed-no-app-icon-launcher",
    title: "Installed an APK but There's No App Icon: Launcher Entry, Work Profile, and Hidden-App Checks",
    description: "The installer says success, yet nothing appears on your home screen or in the app drawer. That rarely means the install failed. Use pm path, resolve-activity, and user checks to tell apart a missing package, an app with no launcher Activity, and an app installed into a work profile or hidden by the launcher.",
    date: "2026-11-16",
    readTime: "6 min read",
    tags: ["android","apk","launcher","work profile","troubleshooting","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261116GList = toList(enPosts20261116G);
