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
      <p>The old phone in your drawer is not slow hardware - it is a complete device with a screen, a battery, two cameras, radios and a full sensor suite, sitting idle. For almost every small always-on appliance job in a home, it beats buying a Raspberry Pi plus accessories, and it costs nothing.</p>
      <p>The trick is choosing the right job. Old phones fail when used as daily drivers under modern app loads; they thrive on <strong>low-interaction, long-running, performance-insensitive tasks</strong>.</p>
      <h2>Before you start: three checks</h2>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><strong>Physical condition</strong> - screen intact, battery not swollen, charges normally. A swollen battery must never be left plugged in continuously; recycle that unit instead.</li>
        <li><strong>Factory reset</strong>, then skip the Google account prompt if you want a fully local device. You can always add an account later.</li>
        <li><strong>Android version</strong> - Settings → About phone → Android version. Anything below Android 8 will struggle with modern camera apps; stick to the clock, media player, or NAS projects.</li>
      </ol>
      <h2>1. Dash cam or home security camera (difficulty 1/5, value 5/5)</h2>
      <p>The single best use of an old phone, because the camera is the most valuable leftover component. You need a windshield or window mount and a long charging cable.</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>Install a dash-cam app, or grab an offline APK if the store is unreachable.</li>
        <li>Enable loop recording, 3-5 minute segments, 720p rather than 1080p - sustained 1080p encoding overheats older chips.</li>
        <li>Disable auto-brightness and keep-screen-on; the screen can stay off while recording continues.</li>
        <li>Keep it plugged in: cigarette lighter in a car, always-on outlet at home.</li>
      </ol>
      <p>Pitfall: in summer, in-car heat trips battery protection and stops charging. Mount it near an air vent and remove thick cases.</p>
      <h2>2. Dedicated music player or car audio terminal (difficulty 1/5, value 4/5)</h2>
      <p>Load local FLAC/MP3, enable airplane mode, disable every sync service. <strong>Airplane mode roughly doubles usable battery life on an old device</strong>, and the result is a playback terminal that never drops a connection. Pair with headphones or a Bluetooth speaker.</p>
      <h2>3. Desk clock, weather display or photo frame (difficulty 1/5, value 4/5)</h2>
      <p>A fullscreen clock app with weather plus "stay awake while charging" makes a solid nightstand or entryway display. Brightness below 20%; on OLED panels use dark backgrounds to slow burn-in. Sitting at 100% permanently is hard on lithium cells, so use a plug timer to cycle between roughly 40% and 80%.</p>
      <h2>4. Home NAS / lightweight file server (difficulty 3/5, value 5/5)</h2>
      <p>64-128 GB of phone storage is plenty for a household share.</p>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Easy route:</strong> a file manager app with FTP or SMB sharing. Connect to <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">ftp://PHONE_IP:2121</code> from any device on the LAN.</li>
        <li><strong>Serious route:</strong> install Termux, run <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pkg install openssh</code>, start sshd, and use sftp or rsync for backups. Termux also runs Python and nginx.</li>
      </ul>
      <p>Pitfall: Android kills background processes. In Settings → Apps → Battery, set Termux and the file manager to "Unrestricted."</p>
      <h2>5. Download box / overnight fetch machine (difficulty 3/5, value 3/5)</h2>
      <p>Old phone plus a spare USB stick over OTG is a 24/7 downloader. Set "Wi-Fi only" and a nightly schedule, and use the phone for something else during the day.</p>
      <h2>6. Kids' device or emergency phone for parents (difficulty 1/5, value 5/5)</h2>
      <p>A SIM-less, Wi-Fi-only old phone with parental control apps is far cheaper than a new tablet and survives drops better. For elderly parents: maximum font and icon size, exactly three home screen icons, and every notification turned off.</p>
      <h2>7. Dedicated e-reader (difficulty 1/5, value 4/5)</h2>
      <p>One reading app, everything else disabled, low blue light at low brightness. A 6-inch phone page-turns far faster than e-ink and handles PDFs and comics well.</p>
      <h2>8. Retro handheld (difficulty 3/5, value 3/5)</h2>
      <p>Old flagships run GBA/PSP/NDS emulators without breaking a sweat. Add a clip-on Bluetooth controller. <strong>Only use ROMs of games you own - legality varies by jurisdiction.</strong></p>
      <h2>Universal optimization: stop the lagging and the battery drain</h2>
      <p>Three changes fix most "it freezes after an hour" complaints.</p>
      <p><strong>1. Remove bloatware without root</strong> (enable USB debugging first):</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{`adb shell pm list packages | grep -i vendorprefix   # list first
adb shell pm uninstall -k --user 0 com.example.bloat  # then remove`}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">pm uninstall --user 0</code> removes the app for the current user only - a factory reset restores it, so it is safe and reversible.</p>
      <p><strong>2. Kill sync and push:</strong> Settings → Accounts → disable auto-sync. Settings → Notifications → mute in bulk.</p>
      <p><strong>3. Pin battery policy:</strong> Settings → Apps → Battery → "Unrestricted" for anything that must stay resident.</p>
      <h2>When to give up</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li>Swollen battery, dead touch zones, or large dead pixels - recycle it.</li>
        <li>Android 6 or older - clock or photo frame only.</li>
        <li>Carrier-locked devices that block background processes - the experience will be poor.</li>
      </ul>
      <h2>FAQ</h2>
      <p><strong>Is it dangerous to keep an old phone plugged in forever?</strong><br />With a healthy battery, a proper charger, and ventilation, risk is low. Avoid thick cases and direct sunlight, and prefer a plug timer.</p>
      <p><strong>Do I still need Google services?</strong><br />For clocks, music, NAS, downloads and emulators, no. Add an account only when you need the Play Store.</p>
      <p><strong>Is a custom ROM worth it?</strong><br />Only if you specifically want zero vendor bloat plus current security patches and the device has active maintainers. For ordinary repurposing, stock plus debloating is enough and carries no brick risk.</p>
      <p><strong>How do I move apps from the old phone to the new one?</strong><br />Reinstall from the store. Only for apps you can no longer obtain should you manually export the APK and sideload it.</p>
  </>
);

export const enPosts20261119A = [
  {
    slug: "repurpose-old-android-phone-projects",
    title: "Turn an Old Android Phone Into 8 Useful Tools Instead of Trashing It",
    description: "A three-year-old Android phone still has a screen, a battery, a camera and always-on networking - everything a small home appliance needs. Eight tested repurposing projects ranked by difficulty and value, with setup steps, power pitfalls, and adb commands to strip bloatware without root.",
    date: "2026-11-19",
    readTime: "8 min read",
    tags: ["android","old phone","repurposing","termux","homelab","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261119AList = toList(enPosts20261119A);
