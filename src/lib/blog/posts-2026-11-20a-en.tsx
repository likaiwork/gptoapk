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
      <p>Mirroring a phone to a TV looks like a small feature and has an unusually high failure rate. You get picture but no sound. The TV never appears in the list. The stream stutters like a slideshow. Or it works perfectly until the phone screen locks - then the TV goes black.</p>
      <p>The root cause is almost always the same: <strong>casting is not one technology, it is five.</strong> Each has different compatibility, latency, and rules about protected content. Pick the wrong one and no amount of fiddling helps.</p>
      <h2>Know the three protocols first</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li><strong>Miracast (Wi-Fi Display)</strong> - Android&apos;s built-in &quot;Cast&quot; / &quot;Wireless display&quot; and Windows. Direct device-to-device link, no router needed, 100-300 ms latency, not on every device.</li>
        <li><strong>Google Cast</strong> - Chromecast, Google TV, some smart TVs. Runs over the router, powers in-app cast buttons, lowest power, best quality.</li>
        <li><strong>DLNA / UPnP</strong> - most budget TVs and set-top boxes. Pushes media files only; cannot mirror the screen.</li>
      </ul>
      <p>Beyond those, there are two physical routes: <strong>HDMI over USB-C</strong> and <strong>installing a receiver app on the TV</strong>.</p>
      <p>Before choosing, determine what the TV actually supports: open TV settings and look for &quot;Screen Share,&quot; &quot;Miracast,&quot; or &quot;Chromecast built-in,&quot; then check whether your phone&apos;s quick settings has a Cast / Wireless display tile. If the two sides do not share a protocol, the rest is wasted effort.</p>
      <h2>Method 1: Built-in wireless display (Miracast)</h2>
      <p>No apps required.</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>Put phone and TV on the same Wi-Fi (some devices allow direct connection).</li>
        <li>On the TV, open the screen-share / &quot;waiting for connection&quot; screen.</li>
        <li>On the phone, pull down quick settings and tap <strong>Cast / Wireless display</strong>.</li>
        <li>Select the TV and confirm the pairing code if one appears.</li>
      </ol>
      <p>Common failures: the TV&apos;s receiver screen <strong>times out</strong> (many are 2 minutes) so the device vanishes from the list - reopen it and search again; audio stays on the phone on some models, so check media volume and look for a &quot;transmit audio&quot; toggle; stuttering usually means 2.4 GHz congestion, so move to 5 GHz and get closer to the router.</p>
      <h2>Method 2: Chromecast / Google TV</h2>
      <p>The best quality and stability, if the TV has it built in or you add a Chromecast / Google TV device.</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li>Same Wi-Fi for everything.</li>
        <li>Install <strong>Google Home</strong> and confirm the TV appears.</li>
        <li>Two distinct modes: <strong>in-app casting</strong> - hit the cast icon inside YouTube, Netflix, etc., and the phone can lock or leave the house while playback continues; <strong>full screen mirror</strong> - Google Home → TV card → &quot;Cast my screen.&quot;</li>
      </ol>
      <p>The difference matters: in-app casting tells the TV to fetch the stream itself, so <strong>battery and frame rate are unaffected</strong>. Screen mirroring encodes your display in real time - hot phone, fast drain. Prefer in-app casting whenever it exists.</p>
      <h2>Method 3: A receiver app on the TV</h2>
      <p>Many TVs without Miracast can gain it by installing a receiver from the TV&apos;s app store. Once installed it shows a device name or QR code the phone can find.</p>
      <p>Sideloading on a TV requires enabling installs from unknown sources, and TV malware is far harder to clean up than phone malware. Verify the signing certificate of the package you install - the same discipline as any APK.</p>
      <h2>Method 4: HDMI over USB-C</h2>
      <p>A USB-C to HDMI adapter is the lowest-latency option by a wide margin - no Wi-Fi involved, which makes it the only reasonable choice for gaming.</p>
      <p><strong>Check your device first.</strong> Only phones supporting DP Alt Mode output video over USB-C; many mid-range and budget models have a data-only USB 2.0 port. Buying the adapter before confirming is the usual mistake. Samsung DeX devices and some Xiaomi, OnePlus and Huawei models support wired output.</p>
      <h2>Method 5: DLNA push</h2>
      <p>Install a DLNA-capable player (VLC works), enable the TV&apos;s DLNA receiver, and push local video to it. This <strong>cannot mirror the screen</strong>, but the phone stays free, and the file plays natively without re-encoding. Ideal for downloaded movies.</p>
      <h2>Method 6: TV-native app builds</h2>
      <p>For streaming services, install the TV build of the app on the TV rather than casting. No phone involvement, no dropped frames, often 4K.</p>
      <p>The standard sideload route is to download the TV APK and install it from a USB stick or the TV&apos;s file-transfer feature - and to pick the <strong>arm64-v8a</strong> build, or it will refuse to install or crash on launch.</p>
      <h2>Diagnostic order when nothing works</h2>
      <p>Work down this list; it isolates most failures in under three minutes.</p>
      <ol className="list-decimal pl-6 space-y-1 my-4">
        <li><strong>Same network?</strong> Guest networks on many routers are isolated and devices cannot see each other.</li>
        <li><strong>Same protocol?</strong> A Miracast TV and a Chromecast-only phone will never connect.</li>
        <li><strong>Is the TV still waiting?</strong> Receiver screens time out and quietly stop advertising.</li>
        <li><strong>AP isolation enabled?</strong> A router setting that hides clients from each other. Turn it off.</li>
        <li><strong>DRM black screen?</strong> Netflix and Disney+ block screen mirroring - you get audio and a black frame. This is by design, not a fault. Use in-app casting, which supports DRM.</li>
        <li><strong>Restart both ends.</strong> The TV&apos;s casting service deadlocks regularly, and a power cycle is faster than any settings hunt.</li>
      </ol>
      <h2>Choosing in one table</h2>
      <ul className="list-disc pl-6 space-y-1 my-4">
        <li>TV with Chromecast or Google TV → <strong>in-app casting</strong> (best)</li>
        <li>Miracast-capable TV, occasional use → <strong>built-in wireless display</strong></li>
        <li>Budget TV with neither → <strong>receiver app</strong> or <strong>USB-C to HDMI</strong></li>
        <li>Gaming or lowest latency → <strong>USB-C to HDMI</strong></li>
        <li>Downloaded movies only → <strong>DLNA</strong> or a <strong>TV-native app build</strong></li>
      </ul>
      <p>Most casting frustration is a protocol mismatch wearing a disguise. Two minutes confirming what the TV supports beats two hours of trial and error.</p>
      <h2>Frequently asked questions</h2>
      <p><strong>Q: Can I lock the phone while casting?</strong><br />With in-app casting yes - the phone can lock or leave the network and playback continues. With full screen mirroring, locking usually disconnects the session; look for a keep-awake option or disable the &quot;disconnect on lock&quot; behaviour.</p>
      <p><strong>Q: Why does Netflix cast audio but a black picture?</strong><br />DRM blocks screen mirroring by design. Use the in-app cast button, which uses Google Cast and supports protected playback, instead of system-level mirroring.</p>
      <p><strong>Q: Does casting use mobile data?</strong><br />No. Casting runs over the local network, and in-app casting has the TV fetch the stream itself, consuming the TV&apos;s bandwidth rather than your phone&apos;s.</p>
      <p><strong>Q: Do phone and TV need the same Wi-Fi?</strong><br />Google Cast requires the same network. Miracast on some devices supports Wi-Fi Direct, which needs no router but does require the two devices to be within range.</p>
  </>
);

export const enPosts20261120A = [
  {
    slug: "cast-android-to-tv-methods-and-troubleshooting",
    title: "Casting Android to a TV: 6 Methods and a Diagnostic Order for When It Fails",
    description: "Casting fails for a small set of reasons, and almost all of them are protocol mismatches or network isolation. A practical comparison of Miracast, Google Cast, DLNA, HDMI and receiver-app setups, plus a six-step troubleshooting order that covers black-screen DRM failures, missing audio, and devices that never appear.",
    date: "2026-11-20",
    readTime: "8 min read",
    tags: ["android","chromecast","miracast","casting","troubleshooting","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261120AList = toList(enPosts20261120A);
