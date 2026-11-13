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
      <p>The confusing case isn't &quot;App not installed&quot;. It's the app that installs perfectly, opens to a polished home screen, and then quietly fails: Google sign-in loops forever, notifications never arrive, the map is a grey rectangle, or checkout closes the activity. On Huawei and HarmonyOS devices, AOSP-based ROMs, certain mainland-China models, Android tablets, and car head units, that pattern almost always means <strong>Google Play Services (GMS) is absent</strong>.</p>
      <p>The installer only checks signature and manifest declarations. It has no idea what the app will call at runtime. So &quot;it installed&quot; tells you nothing about &quot;it works&quot;.</p>
      <p>The usual advice — &quot;just flash a GMS package&quot; — is often impossible and frequently a bad trade. A dependency-first map gives you a better answer: which failures are client-side and fixable, and which are server-side and final.</p>
      <h2>Step 1: confirm the device state</h2>
      <p>Don't change anything until you know what you have:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages | grep -E 'gms|gsf|vending'"}</code></pre>
      <p>You need both <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.google.android.gms</code> and <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">com.android.vending</code> for a complete stack. Alternatively look for &quot;Google Play services&quot; in the app list, or check whether Settings offers a Google account entry.</p>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">State</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Typical symptom</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Direction</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Full GMS</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Sign-in, push, maps all work</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Not a GMS issue — check network, region, app version</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Framework present but disabled or stale</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">&quot;Update Google Play services&quot; dialog</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Enable or update existing components</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No GMS at all</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Google-dependent features silently degrade</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Work through the map below</td></tr></tbody>
      </table></div>
      <h2>Step 2: map each broken feature to its dependency</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Broken feature</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">What it needs</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Fixable locally?</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Google account / one-tap sign-in</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">AccountManager, Play services</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Usually yes — email/password or web sign-in</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Push notifications</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Firebase Cloud Messaging</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Sometimes — many apps fall back to polling</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Blank map, drifting location</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Maps SDK, fused location</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Rarely inside that app; alternative apps often exist</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">In-app purchase / subscription</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Play Billing</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No — server-side validation</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Banking / streaming refuses to run</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Play Integrity, SafetyNet, Widevine L1</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No — server-side policy</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Analytics, crash reports, remote config</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Firebase suite</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Usually cosmetic degradation</td></tr></tbody>
      </table></div>
      <p>The dividing line is simple: <strong>if the check happens on a server, nothing you do locally changes the outcome</strong>. If it is a pure client capability, there is usually a path around it.</p>
      <h2>Step 3: workarounds, in order of cost</h2>
      <h3>Change the entry point, not the OS</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Try the <strong>web app / PWA</strong> first. Most content and utility services are fully functional in a browser and sidestep push entirely.</li>
        <li>Look for a <strong>GMS-free alternative</strong>: open-source clients, Lite builds, or regional editions often swap FCM for their own push channel.</li>
        <li>Sign in with <strong>email + password</strong> instead of &quot;Continue with Google&quot;. Many apps only bind the login button to GMS; the core product doesn't depend on it.</li>
      </ul>
      <h3>Let the app's fallback actually run</h3>
      <p>A well-built app detects missing FCM and falls back to periodic polling. That fallback dies instantly if the vendor kills background work. Three switches matter:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>battery optimisation whitelist for the app;</li>
        <li>vendor-specific &quot;autostart&quot; / &quot;background high power&quot; permission;</li>
        <li>no data-saver or background-data restriction on that app.</li>
      </ul>
      <p>This is worth checking even on devices with GMS: &quot;push not arriving&quot; is often a battery policy problem wearing a GMS costume.</p>
      <h3>Evaluate microG honestly</h3>
      <p>microG reimplements part of the Play services API surface and can restore some FCM and location functionality. The trade-offs are real:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>it generally requires <strong>signature spoofing</strong>, which stock ROMs do not support, so you are looking at a custom ROM;</li>
        <li>it sits between your accounts and their push credentials, so it becomes part of your trust boundary;</li>
        <li>Play Integrity, Play Billing, and DRM still fail.</li>
      </ul>
      <p><strong>Do not flash an unverified &quot;Google services installer&quot; to make one app work.</strong> These packages demand system-level privileges and have no meaningful provenance. Prefer an official vendor path, a web alternative, or a different device.</p>
      <h2>Step 4: know when to stop</h2>
      <p>Stop iterating on APK versions when you hit any of these:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>banking or payment apps reporting an unsafe device environment;</li>
        <li>streaming apps refusing the device or capping resolution;</li>
        <li>apps enforcing Play licensing verification;</li>
        <li>games tied to Play Games Services for saves and achievements.</li>
      </ul>
      <p>These are remote attestations. Client-side spoofing is fragile and can put the associated account at risk.</p>
      <h2>Pre-flight checklist</h2>
      <p>Before blaming GMS, rule out a bad package — wrong ABI, wrong density variant, or a repacked build produces almost identical symptoms:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Confirm GMS state with <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm list packages</code></li>
        <li>Verify versionCode, minSdk, ABI, and signature of the APK</li>
        <li>Try email/web sign-in to test core functionality</li>
        <li>Whitelist the app from battery optimisation and background limits</li>
        <li>Check the system WebView version (many blank login screens are just an old WebView)</li>
        <li>If it is a server-side attestation, stop</li>
        <li>Need a clean official build? Fetch one from <a href="https://www.gptoapk.com/en" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">gptoapk</a> and verify the signature</li>
      </ul>
      <p>That last point saves the most time. Half of &quot;no GMS&quot; reports turn out to be a wrong-architecture build or a modified package. Getting the right official APK first eliminates a large branch of the tree.</p>
      <h2>FAQ</h2>
      <p><strong>The app opens, so surely GMS isn't the issue?</strong> No. Installers validate signatures and declarations, not runtime dependencies. Many apps treat Google components as optional and only touch them on specific screens.</p>
      <p><strong>I sideloaded a GMS framework APK and login still fails.</strong> Those components need system signatures and privileged permissions; sideloading them as ordinary APKs mostly adds icons. Version, architecture, and Android API level must also match.</p>
      <p><strong>Is a ten-minute notification delay normal?</strong> For polling fallbacks, yes. Whitelisting background work usually brings it down to a minute or two, but it will never match FCM latency.</p>
      <p><strong>Why do some apps work fine on the same device?</strong> It depends on how many Google dependencies the developer marked as required. Firebase Analytics alone is invisible; FCM as the only push channel, or Play Billing at checkout, is not.</p>
      <h2>Bottom line</h2>
      <p>Diagnose by <strong>dependency layer</strong>, not by &quot;is Google installed&quot;. Client-side capabilities have alternatives; server-side attestation does not. Verify the package first, free up background execution second, and only then consider replacement stacks — and never trade the whole device's trust boundary for a single app.</p>
  </>
);

export const enPosts20261113E = [
  {
    slug: "apk-without-google-play-services-dependency-map",
    title: "Running APKs Without Google Play Services: A Dependency-First Troubleshooting Map",
    description: "An APK that installs and opens can still fail at login, push, maps, or checkout on devices without GMS. This dependency-first map separates client-side problems you can work around from server-side checks you cannot.",
    date: "2026-11-13",
    readTime: "5 min read",
    tags: ["android","apk","gms","troubleshooting","howto"],
    content: ARTICLE,
  },
];

export const enPosts20261113EList = toList(enPosts20261113E);
