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
      <p>Start with the reassuring part: <strong>an APK is the least alarming file you can lose</strong>. A deleted photo is gone forever. A deleted APK can be obtained again, byte-for-byte, as long as the app is still published and the version still exists somewhere.</p>
      <p>The genuinely hard cases are narrower: the file was deleted and the app was <strong>never installed</strong>, or you need a <strong>specific old version</strong> that has since been taken down. Everything else has a clean path.</p>
      <h2>Three situations, three plans</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse my-4">
        <thead><tr><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Situation</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">What you actually need</th><th className="border border-gray-200 dark:border-gray-700 px-3 py-2 text-left bg-gray-50 dark:bg-gray-900">Recommended path</th></tr></thead>
        <tbody><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App is installed, you just want a backup of the installer</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Extract the package from the device</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2"><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb pull</code> — always works</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">App not installed, file deleted</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Get the same or a newer build again</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Official source or mirror, then verify</td></tr><tr><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">You need a specific delisted version</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Locate an archived build</td><td className="border border-gray-200 dark:border-gray-700 px-3 py-2">Trusted archive, then check the signature</td></tr></tbody>
      </table></div>
      <p>The instinct for most people is to install a data-recovery app and scan the phone for deleted <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk</code> files. On modern Android that basically does not work: internal flash has TRIM/discard enabled, so deleted blocks are actively reclaimed. Recovery tools typically scan and find zeros. <strong>Recovery software is worth trying only on SD cards or computer drives</strong> that are not sending discard commands, and even then only if you stop writing immediately.</p>
      <h2>Path 1: Pull the package from the device</h2>
      <p>This is the only path that depends on nothing external. Even if the installer file is long gone, the system still holds <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">/data/app/.../base.apk</code> for any installed app.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# 1. Find the package name\nadb shell pm list packages | grep something\n\n# 2. Get its real path\nadb shell pm path com.example.app\n# package:/data/app/~~aBcD==/com.example.app-xYz==/base.apk\n\n# 3. Pull it\nadb pull /data/app/~~aBcD==/com.example.app-xYz==/base.apk ./example.apk"}</code></pre>
      <p>Apps installed as split APKs (App Bundles) report multiple <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">package:</code> lines. Pull the whole directory instead:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb pull /data/app/~~aBcD==/com.example.app-xYz==/ ./example-splits/"}</code></pre>
      <p>Reinstalling those requires <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">install-multiple</code>:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"adb install-multiple ./example-splits/*.apk"}</code></pre>
      <p>Before you archive the extracted file as your precious backup, confirm it is sane:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"aapt dump badging example.apk | head -3\napksigner verify --print-certs example.apk | head -5"}</code></pre>
      <h2>Path 2: Re-download, then compare against a known fingerprint</h2>
      <p>If you know the version (or can read it from another device that still has the app), re-downloading is fastest. The essential part is verification, otherwise your &quot;recovery&quot; may be a repackaged build.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# Read the real version from a device that still has it\nadb shell dumpsys package com.example.app | grep versionName\n\n# After downloading, verify\nshasum -a 256 example.apk\napksigner verify example.apk && echo \"signature ok\""}</code></pre>
      <p><code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">apksigner verify</code> passing only means the package's self-signature is internally consistent — not that it came from the official publisher. To check publisher identity, compare certificate digests:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs example.apk | grep SHA-256"}</code></pre>
      <p>Compare against the digest of a package pulled from a known-good device. Skipping this step is how people end up with a same-name, same-version package signed by someone else — at best it refuses to update over the existing install, at worst it is malware.</p>
      <h2>Path 3: Delisted versions, three things to check</h2>
      <p>Once a version is removed from official channels, your sources are archives and third-party version repositories. When picking one, check three things:</p>
      <ol className="list-decimal pl-6 space-y-1">
        <li><strong>Exact version match</strong> — do not accept a &quot;latest&quot; label on a listing page.</li>
        <li><strong>Plausible file size</strong> — a package 3x larger or 90% smaller than expected is a red flag.</li>
        <li><strong>Matching signing certificate</strong> — the only hard requirement.</li>
      </ol>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"apksigner verify --print-certs old-version.apk | grep -i \"SHA-256\""}</code></pre>
      <p>If no official copy exists to compare against, fall back to behavioral checks: it installs cleanly, its requested permissions in <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">adb shell dumpsys package</code> match what the app plausibly needs, and it does not ask for unrelated access at launch.</p>
      <h2>Path 4: Recovery software, only for removable media</h2>
      <p>Software-based undelete only makes sense for <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">.apk</code> files on an SD card, USB stick, or computer disk. The rule is <strong>stop writing to the volume immediately</strong>, then image it before scanning:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"# macOS: create an image first, scan the image, keep the original untouched\nsudo dd if=/dev/disk4 of=./sdcard.img bs=4m"}</code></pre>
      <p>Scanning an image rather than the live volume preserves the original for a second attempt. On a volume that is still receiving writes, success rates fall off quickly.</p>
      <h2>Prevent the next incident</h2>
      <p>Recovering is always the expensive path. Cheaper: keep a searchable backup directory.</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"mkdir -p ~/apk-backup\necho \"$(date +%F) com.example.app 1.2.3 gptoapk\" >> ~/apk-backup/index.txt"}</code></pre>
      <p>Batch-extract every sideloaded app in one loop and you will never care what the cleaner app deleted:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>{"for p in $(adb shell pm list packages -3 | sed 's/package://'); do\n  adb shell pm path \"$p\" | sed 's/package://' | while read -r f; do\n    adb pull \"$f\" ~/apk-backup/ 2>/dev/null\n  done\ndone"}</code></pre>
      <p>The <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">-3</code> flag lists third-party packages only, which keeps the run fast and skips hundreds of system APKs.</p>
      <h2>One-line summary</h2>
      <p>Recovery priority for a deleted APK: <strong>pull it from the device if the app is installed, otherwise re-download from a trustworthy source and verify the certificate, and only then consider version archives or undelete tools</strong>. Scanning phone internal storage for deleted APKs is a dead end — do not spend your first hour there.</p>
  </>
);

export const enPosts20261117B = [
  {
    slug: "recover-deleted-apk-file",
    title: "Recover a Deleted APK File: What Actually Works and What Doesn't",
    description: "Cleaning apps delete installer files, or you wiped a folder before backing it up. Unlike photos, an APK is reproducible — which changes the recovery strategy entirely. Split by installed vs not-installed and internal vs removable storage, with adb pull, re-download plus signature verification, and the cases where recovery software is pointless.",
    date: "2026-11-17",
    readTime: "5 min read",
    tags: ["android","apk","recovery","adb","troubleshooting","gptoapk"],
    content: ARTICLE,
  },
];

export const enPosts20261117BList = toList(enPosts20261117B);
