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
      <p>&quot;My phone is out of space - can I move apps to the SD card?&quot;</p>
      <p>The answer has changed three times in ten years. On Android 2.x you moved apps manually. Android 6.0 introduced adoptable storage and the system started managing placement. From Android 11 onward, <strong>the &quot;Move to SD card&quot; button is gone on most devices.</strong></p>
      <p>Here is what actually happens, why the old instructions no longer work, and what to do when storage runs out.</p>
      <h2>The storage layout that explains everything</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>/system</strong> - OS image and preinstalled apps; no user control without root.</li>
        <li><strong>/data</strong> - installed apps, app data, photos, downloads. This <em>is</em> &quot;internal storage.&quot;</li>
        <li><strong>/data/app</strong> - the installed APK payloads. System-managed, not user-selectable.</li>
        <li><strong>External SD / adoptable storage</strong> - removable or merged storage; mergeable since Android 6.</li>
        <li><strong>/sdcard</strong> - an emulated view of /data/media, which is what file managers show as internal.</li>
      </ul>
      <p>The key realization: the &quot;128 GB internal storage&quot; in Settings is largely the <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data</code> partition. Apps install there. There is no special system region to relocate them out of.</p>
      <h2>What &quot;installing an APK&quot; really does</h2>
      <p>Installing a package is a four-part operation:</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>Unpack and validate the APK&apos;s signature.</li>
        <li>Compile dex into oat/vdex and store it under <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/dalvik-cache</code> or the app&apos;s oat directory.</li>
        <li>Place the APK at <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/&lt;package&gt;-&lt;suffix&gt;/base.apk</code>.</li>
        <li>Create the private data directory at <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/data/&lt;package&gt;/</code>.</li>
      </ol>
      <p>So &quot;install location&quot; actually means two things - where the APK payload lives and where app data lives. Since Android 8 these are effectively bound together and chosen by the system.</p>
      <h2>Changing install location, by version</h2>
      <h3>Android 6 - 10: &quot;Move to SD card&quot; exists</h3>
      <p>Settings → Apps → an app → Storage → <strong>Change</strong> → SD card. Only apps declaring external storage support can move; for many the option is greyed out. Even when it works, <strong>only the APK payload moves</strong> - often tens of megabytes - while data stays on internal storage. The space savings are far smaller than people expect.</p>
      <h3>Android 6+: adoptable storage</h3>
      <p>Formatting the SD card as internal storage lets apps install to it. The trade-offs are real: the card is encrypted to that device and unreadable elsewhere, SD throughput is far below built-in flash so app launches slow down, and a card failure means total data loss. Use it only on a low-end device paired with a quality A2-rated card.</p>
      <h3>Android 11+: the feature is removed</h3>
      <p>Android 11 dropped the &quot;Move to SD card&quot; UI; apps install to internal storage. Forcing installs externally requires adb:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell pm install --install-location 2 /path/to/app.apk`}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">--install-location</code>: 0 = auto, 1 = internal, 2 = external. A few vendor ROMs (some Samsung and Xiaomi builds) still expose a default-storage setting. For most people this is where the investigation should end - minimal upside, real risk.</p>
      <h2>What pm set-install-location actually controls</h2>
      <p>Older guides recommend:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell pm set-install-location 2`}</code></pre>
      <p>That sets the <strong>default for new installs</strong> and applies only to APKs declaring <code className="font-mono">android:installLocation=&quot;auto&quot;</code> or <code className="font-mono">&quot;preferExternal&quot;</code>. Practically every modern app is internalOnly because internal storage is required for performance and security. In 2026 the command has <strong>no effect on the apps you care about</strong>. If a tutorial opens with that command, treat the rest of it with suspicion.</p>
      <h2>Six things that actually free space</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><strong>Find the real consumer.</strong> Settings → Storage, then look at <strong>App data</strong>, not app size. Chat apps and social feeds routinely hold 10 GB+ each.</li>
        <li><strong>Clear cache, not data.</strong> &quot;Clear cache&quot; is safe; &quot;Clear data&quot; destroys login state and local files.</li>
        <li><strong>Clean the dominant chat app specifically.</strong> Every major messenger has a storage management screen with per-chat media breakdown. This is usually the single largest reclaim.</li>
        <li><strong>Uninstall what you do not open.</strong> A year unused is a year wasted; export anything important first.</li>
        <li><strong>Move photos and video off-device.</strong> Back up, then delete local copies. Highest one-time gain.</li>
        <li><strong>Delete old APKs in Download/.</strong> Each is 50-200 MB and users almost always forget them. Downloading from a reputable source and <strong>verifying the signature</strong> matters more than where it lands - a wrong install location costs space, a wrong source costs security.</li>
      </ol>
      <h2>Common misconceptions</h2>
      <p><strong>&quot;Apps on SD card slow the phone down.&quot;</strong> True, most noticeably on slow cards. A2 cards soften it, but the system no longer offers the choice anyway.</p>
      <p><strong>&quot;Moving an app to SD frees a lot of space.&quot;</strong> The payload moves; data does not. The gain is usually small.</p>
      <p><strong>&quot;Root lets you move anything.&quot;</strong> It does, and banking apps will then refuse to run. A poor trade.</p>
      <p><strong>&quot;The installer asks where to put the app.&quot;</strong> Stock Android does not. Some vendor ROMs offer a &quot;prefer SD card&quot; toggle, and it only means something for apps that declare support.</p>
      <h2>Bottom line</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Android 11+:</strong> install location is not yours to choose. Clean up instead.</li>
        <li><strong>Android 6 - 10:</strong> &quot;Move to SD card&quot; exists, with limited benefit and a performance cost.</li>
        <li><strong>Low-end device with a large A2 card:</strong> adoptable storage is defensible; otherwise skip it.</li>
        <li><strong>What to actually do:</strong> clear caches, clean your chat app, purge Download/ of stale APKs, back up media.</li>
      </ul>
      <p>Knowing what is consuming your storage beats researching how to relocate apps - by a wide margin.</p>
      <h2>Frequently asked questions</h2>
      <p><strong>Q: Can I still move apps to SD card on Android 12?</strong><br />The system UI is gone. In principle <code className="font-mono">pm install --install-location 2</code> over adb can install to external storage, but it only applies to APKs that declare external support, and modern apps generally do not.</p>
      <p><strong>Q: Is adoptable storage worth it?</strong><br />Only on a low-end device with a fast A2 card. The card becomes device-encrypted, is unreadable on a computer, and its failure means total data loss.</p>
      <p><strong>Q: What is the difference between clearing cache and clearing data?</strong><br />Cache is temporary files the app regenerates, with no effect on login state. Data includes accounts, chat history and local files; clearing it forces a re-login and can lose content.</p>
      <p><strong>Q: Why is there no &quot;install to SD card&quot; option when installing an APK?</strong><br />Because the package declares internalOnly, which has been the default for nearly all apps since Android 8, for performance and storage-security reasons.</p>
  </>
);

export const enPosts20261120B = [
  {
    slug: "android-app-install-location-internal-vs-sd-card",
    title: "Internal Storage or SD Card? Where Android Apps Actually Install, and What to Do Instead",
    description: "The 'move app to SD card' option mostly no longer exists, the adb commands you find in older guides rarely apply, and moving an APK saves far less space than people expect. A version-by-version explanation of Android storage layout, what set-install-location really controls, and six steps that actually free space.",
    date: "2026-11-20",
    readTime: "8 min read",
    tags: ["android","storage","sd card","apk","troubleshooting","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261120BList = toList(enPosts20261120B);
