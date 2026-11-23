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
      <p>You sideload a game from a third-party site, pair a Bluetooth gamepad, and Android shows the controller icon in the status bar - so the hardware obviously works. Then you open the game: the character does not move when you push the stick, A and B are swapped, the triggers do nothing, or the only thing that works is the on-screen touch controls. You try a second controller. Same result. The natural conclusion is &quot;this APK is a pirated or stripped build.&quot;</p>
      <p>Most of the time it isn't. Controller input on Android is a chain of four independent layers, and any one broken link produces the same visible symptom: &quot;the controller does nothing.&quot; Worse, sideloading hits a trap that store installs never see - <strong>in-game mapping profiles are keyed to package name plus signing certificate</strong>, so changing the install source silently throws away your mapping. On top of that, repackaged or &quot;lite&quot; builds sometimes ship without the gamepad support libraries entirely.</p>
      <p>Below is the chain, layer by layer, with the exact commands to test each one.</p>
      <h2>1. Identify which of four problems you actually have</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Symptom</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Most likely layer</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">First check</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Controller connected, game completely ignores it</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Event reporting / app support</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">getevent</code> - any events at all?</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Buttons work but are wrong (AB swapped, stick inverted)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">HID descriptor / mapping table</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys input</code> device source</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Only some inputs fail (triggers, d-pad)</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">HID descriptor parsing</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Controller mode switch (XInput/DInput)</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Playable only with on-screen touch controls</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App deliberately detecting a gamepad</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Game settings toggle</td></tr></tbody>
      </table></div>
      <p>Do not reinstall the game before you know which row you are in.</p>
      <h2>2. Prove the system receives input at all</h2>
      <p>With the controller connected, stream raw input events over adb:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell getevent -lt"}</code></pre>
      <p>Now press buttons. If the terminal streams <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">EV_KEY</code> / <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">EV_ABS</code> lines, <strong>Android is receiving input</strong> and the problem lives above the driver - in device classification, app support, or the mapping table. If nothing appears, the problem is at the connection layer: pairing, OTG power, or the controller being in the wrong mode.</p>
      <p>Next, ask Android what it thinks the device is:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys input | grep -A 20 -i \"gamepad\\|joystick\""}</code></pre>
      <p>Two fields matter:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Source.</strong> It should contain <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SOURCE_JOYSTICK</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SOURCE_GAMEPAD</code>. If it says <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">SOURCE_KEYBOARD</code>, Android classified your controller as a keyboard - many mobile games have no keyboard-remap path and will simply ignore it.</li>
        <li><strong>Device name and Vendor/Product ID.</strong> The same controller can enumerate as two different devices over Bluetooth versus USB, and mapping profiles are saved per device name. A new name means your old profile never loads.</li>
      </ul>
      <h2>3. Switch the controller out of DInput mode</h2>
      <p>Most third-party controllers have two modes - <strong>XInput</strong> (the standard Android/PC gamepad layout) and <strong>DInput</strong> (legacy direct input) - usually toggled with a button combo such as <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">X + Home</code>.</p>
      <p>Tell them apart from <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">dumpsys input</code>: in DInput mode you will see ordinary key codes (<code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KEYCODE_A</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KEYCODE_ENTER</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">KEYCODE_MOVE_HOME</code>) instead of the gamepad range. Switching to XInput and re-pairing resolves &quot;triggers dead&quot; and &quot;d-pad acts like a stick&quot; in one step.</p>
      <h2>4. Mapping profiles do not travel with the APK</h2>
      <p>This is the sideload-specific trap. Games that support controllers typically store the mapping in:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"/sdcard/Android/data/<package>/files/"}</code></pre>
      <p>or in app-private <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">shared_prefs</code>. That storage is isolated by <strong>package name plus signer</strong>. So:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>The store build and a third-party build of the same game with <strong>different certificates</strong> are, to Android, two separate apps. The profile does not carry over.</li>
        <li>Uninstalling and reinstalling, or overwriting with a differently signed build, leaves you with an empty or freshly created config directory.</li>
      </ul>
      <p>Confirm what you have installed:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell pm list packages | grep -i <name>\nadb shell pm path <package>\napksigner verify --print-certs app.apk"}</code></pre>
      <p>If the certificate differs from the build you previously used, do not try to copy the old profile over - signature checks inside the game can reject it, and the profile may reference a device ID that no longer matches. Re-run the in-game mapping wizard instead. It takes two minutes and avoids a category of weird half-working states.</p>
      <p>Also confirm the game can actually write where it wants:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb shell dumpsys package <package> | grep -i \"storage\\|MANAGE_EXTERNAL\""}</code></pre>
      <p>If the game writes to shared external storage without <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">MANAGE_EXTERNAL_STORAGE</code> or the correct scoped-storage grants, the &quot;Save mapping&quot; dialog reports success while nothing is persisted - which looks exactly like a mapping bug.</p>
      <h2>5. Only now question the APK itself</h2>
      <p>Check whether this build contains gamepad support at all:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"unzip -l app.apk | grep -iE \"gamepad|joystick|controller|input\"\naapt dump badging app.apk | grep -i \"uses-feature\\|uses-permission\""}</code></pre>
      <p>Two common failure shapes:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>&quot;Lite&quot; / &quot;no-ads&quot; / carrier-customised builds</strong> where <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">lib/</code> has had gamepad-related native libraries stripped. Nothing in Settings can restore what is not in the file.</li>
        <li><strong>Missing `&lt;uses-feature android:name=&quot;android.hardware.gamepad&quot;&gt;`</strong> in the manifest, which some game engines use to decide whether to enable the controller code path at all.</li>
      </ul>
      <p>Also verify the ABI matches your device. An arm64 phone running a build with only armv7 natives can start the game fine and then fail to load the peripheral module.</p>
      <h2>6. Quick status table</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Finding</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Conclusion</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Action</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">getevent</code> shows nothing</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Connection layer</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Re-pair, or use a USB-OTG cable</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Events but <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">Source=KEYBOARD</code></td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">DInput mode</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Switch to XInput, re-pair</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Source correct, game ignores input</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Mapping or app support</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Rebuild mapping in-game</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Some inputs dead</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Descriptor parsing</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Change mode or controller</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">No gamepad libraries in APK</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Stripped build</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Get the full official build</td></tr></tbody>
      </table></div>
      <h2>7. FAQ</h2>
      <p><strong>Q1: The system's gamepad test screen responds, but the game doesn't. Why?</strong></p>
      <p>System calibration uses the standard input channel; the game reads input through its own engine layer. A responsive test screen proves the hardware and driver are fine - the failure is above them. Look for a controller toggle in the game's settings and check whether a mapping profile exists.</p>
      <p><strong>Q2: The controller works in other games but not this one.</strong></p>
      <p>That is an app-support problem, not a controller problem. Check whether the game exposes a peripheral option, or whether it only whitelists specific models.</p>
      <p><strong>Q3: I switched install source and lost every mapping. Can I copy the old file back?</strong></p>
      <p>You can, but expect it to be rejected. Signing differs, so the app sees a different installation, and profiles often embed a device identifier. Redo the mapping in-game.</p>
      <p><strong>Q4: The stick drifts - a slight touch moves the character.</strong></p>
      <p>That is hardware deadzone, not mapping. Most games expose a deadzone slider; otherwise calibrate the controller's firmware. Raising the deadzone is the standard fix.</p>
      <h2>Bottom line</h2>
      <p>&quot;sideloaded game ignores my controller&quot; is not one bug but four possible breaks in one chain. Work the fixed order: <strong>`getevent` to prove input arrives, `dumpsys input` to see how Android classified the device, switch to XInput, rebuild the in-game mapping, and only then check whether the APK was stripped</strong>. The sideload-specific insight is that a new signing certificate means a new app as far as mapping storage is concerned - so if you changed download sources, plan to remap rather than restore.</p>
  </>
);

export const enPosts20261123A = [
  {
    slug: "sideloaded-game-controller-buttons-not-mapped",
    title: "Sideloaded Game Ignores Your Controller: Four Layers Behind Broken Button Mapping",
    description: "You install a game from a third-party site, pair a Bluetooth controller, Android shows it as connected - and in-game nothing works or every button is wrong. This is rarely a fake or stripped APK. Controller input on Android passes through four independent layers: HID descriptor parsing, input event reporting, the app's device support, and the in-game mapping table. Here is how to find which layer is broken using getevent, dumpsys input, and a look inside the APK, plus how per-package signing quietly wipes mapping profiles.",
    date: "2026-11-23",
    readTime: "6 min read",
    tags: ["gamepad","controller","adb","troubleshooting"],
    content: ARTICLE,
  },
];

export const enPosts20261123AList = toList(enPosts20261123A);
