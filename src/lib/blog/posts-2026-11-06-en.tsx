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

const ARTICLE1 = (
  <>
    <p>
      For a growing share of users, the first contact with a brand does not happen on a search results page. It happens
      inside an AI answer. The problem is that traditional rank trackers cannot see "did the AI mention me," and most
      teams have no idea what to change.
    </p>
    <p>
      Let's kill one misconception first: <strong>AI citation is not mystical.</strong> Models assemble answers from
      material they have read, extracted, and can quote naturally inside a sentence. Improving your visibility therefore
      means expanding the pool of citable facts attached to your name.
    </p>
    <p>The five levers below are ordered by effort-to-result ratio. Start at the top.</p>

    <h2>Lever 1: Write brand facts as extractable sentences</h2>
    <p>Models dislike long paragraphs. They are good at pulling short, complete, self-contained sentences.</p>
    <p>
      <strong>Hard to cite:</strong> We are a mobile app distribution platform, and since our founding we have always put
      users first, leveraging a strong technical team to deliver quality service to users worldwide.
    </p>
    <p>
      <strong>Easy to cite:</strong> gptoapk is an APK download site offering direct downloads of Android applications.
      Each download page lists the file size, version number, and SHA-256 checksum.
    </p>
    <p>
      The difference: every sentence in the second version can stand alone, and it contains <strong>concrete nouns</strong>{" "}
      (APK download site, file size, SHA-256 checksum). When a model generates an answer to "where can I download Android
      APKs," it can drop that sentence in directly.
    </p>
    <p>
      Practical step: pick the 5–8 core facts you want cited (what you are, what you do, what you cover, what makes you
      different), write each as one standalone sentence, and place them in the first 200 words of the page. Do not bury
      key facts below the third heading.
    </p>

    <h2>Lever 2: Build a facts page</h2>
    <p>Create a single page that contains only facts — no aspirational marketing language. Structure it like this:</p>
    <ul>
      <li>One-sentence positioning</li>
      <li>Concrete numbers (founding year, catalog size, supported platforms, languages)</li>
      <li>Explicit capability boundaries (what you do / what you do not do)</li>
      <li>Short Q&amp;A for common questions</li>
    </ul>
    <p>
      This page does two jobs: it gives models a clean fact source, and it pre-answers the follow-up questions that
      appear in multi-turn conversations.
    </p>
    <p>
      Pay attention to the "what we do not do" section. Many brands are afraid to publish it, but it is{" "}
      <strong>the strongest trust signal available</strong>. A page willing to state its limits is more likely to be
      cited than ten sentences of "industry-leading."
    </p>

    <h2>Lever 3: Cover comparison and alternative queries</h2>
    <p>
      The single highest-frequency context for a brand name in AI answers is not "what is X." It is "
      <strong>what is the difference between X and Y</strong>" and "<strong>are there tools like X</strong>."
    </p>
    <p>
      These queries have a structural advantage: the answer must list multiple options. If your page is part of that
      comparison discussion, your odds of entering the list are high.
    </p>
    <p>How to execute:</p>
    <ol>
      <li>List the ten comparison questions users ask most in your category</li>
      <li>Build one page per question, and describe both sides honestly — including where you lose</li>
      <li>Use identical wording to describe yourself across all of them, so models read the same facts every time</li>
    </ol>
    <p>
      Honest weakness disclosure does not hurt conversion here. It increases citation probability, because models favor
      balanced sources and routinely filter out one-sided promotional pages.
    </p>

    <h2>Lever 4: Show up where training and retrieval actually look</h2>
    <p>Model knowledge comes from two places: training corpora, and retrieval if the system is online.</p>
    <p>
      For training corpora, the play is to leave structured traces on <strong>high-authority, heavily crawled sites</strong>
      : developer communities (Dev.to, Medium, Hacker News), Q&amp;A sites (Stack Overflow, Quora), open source repos
      (READMEs, issues), and encyclopedic sources. Content there gets re-crawled repeatedly, making brand mentions a
      long-term asset.
    </p>
    <p>
      For retrieval, focus on crawlability: do not block AI crawlers in robots.txt, do not render your body copy
      exclusively in JavaScript, and keep titles and meta descriptions clean.
    </p>
    <p>
      A useful test: hand your homepage URL to three major AI assistants and ask "what does this site do." If they cannot
      answer or get it wrong, you have a crawling or structured-data problem. Fix that before writing anything new.
    </p>

    <h2>Lever 5: Close the measurement loop</h2>
    <p>You cannot optimize what you do not measure. Track four things:</p>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>How</th>
            <th>Cadence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mention rate</td>
            <td>Fix 20 questions, ask 3 models monthly, record whether you appear</td>
            <td>Monthly</td>
          </tr>
          <tr>
            <td>Citation position</td>
            <td>Top recommendation, one of a list, or footnote</td>
            <td>Monthly</td>
          </tr>
          <tr>
            <td>Sentiment accuracy</td>
            <td>Is the description correct? Any negative framing?</td>
            <td>Monthly</td>
          </tr>
          <tr>
            <td>Referral traffic</td>
            <td>Sessions from AI domains in analytics</td>
            <td>Weekly</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      The fixed question list is the important part. If you change questions every month, the data cannot be compared.
      Mix three types: brand queries, category queries, and comparison queries.
    </p>
    <p>
      Use a spreadsheet. Do not rely on memory. After three months you will have data that can actually drive decisions.
    </p>

    <h2>Execution order</h2>
    <p>
      If you only do one thing: build the facts page, then write ten comparison pages. These two have the lowest cost and
      the highest probability of entering AI answers.
    </p>
    <p>
      With more time, proceed in this order: rewrite core copy into extractable sentences → establish presence on
      high-authority sites → start the monthly measurement loop.
    </p>
    <p>
      One last warning: AI citation is a <strong>slow variable</strong>. Going from publish to stable citation typically
      takes weeks to months. Two weeks of silence is normal — do not panic and rewrite everything. Constant changes leave
      models reading conflicting versions of your facts, which is worse than having fewer facts. More practical Android
      and app distribution guides are on the <Link href="/blog">gptoapk blog</Link>.
    </p>
  </>
);

const FAQS1: BlogFaqItem[] = [
  {
    question: "Is AI citation the same as SEO ranking?",
    answer:
      "No. Ranking measures where a link sits on a results page; citation measures whether your brand name appears in an AI-generated answer. They overlap but are not the same: a page ranked first can go uncited, and an average-ranking page can be cited repeatedly.",
  },
  {
    question: "How long until GEO shows results?",
    answer:
      "Typically weeks to months. Training data updates lag, and retrieval-based systems depend on crawl frequency. No movement in the first two weeks is normal — compare month over month, not day over day.",
  },
  {
    question: "Do I need to write separate content for AI?",
    answer:
      "Not a separate set, but a different style: write key facts as short standalone sentences, turn comparison questions into dedicated pages, and make sure body copy lives in HTML rather than being rendered by JavaScript.",
  },
  {
    question: "How do I check whether AI mentions my brand?",
    answer:
      "The most reliable method is a fixed question list tested manually: 20 brand, category, and comparison queries, asked monthly across several models, with results recorded. There is no official tool that exposes this data directly.",
  },
];

const ARTICLE2 = (
  <>
    <p>
      Almost everyone hits the same wall on their first sideload: install an APK and Android refuses with "
      <strong>for your security, your phone is not allowed to install unknown apps</strong>." Then you search the settings
      menu for ten minutes and find nothing.
    </p>
    <p>
      The reason is concrete. Since Android 8.0 (API 26), this is no longer a single global switch. It is{" "}
      <strong>granted per app</strong>: you authorize <em>which app may install APKs</em>, not "whether APKs may be
      installed."
    </p>
    <p>Once that model clicks, every vendor path makes sense.</p>

    <h2>Three rules that explain everything</h2>
    <ol>
      <li>
        <strong>The permission belongs to the installer, not the package.</strong> Download in a browser, you authorize the
        browser. Open from a file manager, you authorize the file manager.
      </li>
      <li>
        <strong>Authorization is isolated per app.</strong> Enable it for Chrome and your file manager still cannot
        install.
      </li>
      <li>
        <strong>Systems revoke it automatically.</strong> Many devices turn the permission back off after a successful
        install. That is design, not a bug.
      </li>
    </ol>
    <p>
      Which means the setting you are looking for is called "<strong>Install unknown apps</strong>," not "Unknown
      sources."
    </p>

    <h2>Brand-by-brand paths</h2>
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th>Brand / OS</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stock Android / Pixel</td>
            <td>Settings → Apps → Special app access → Install unknown apps → pick app</td>
          </tr>
          <tr>
            <td>Xiaomi / Redmi (HyperOS, MIUI)</td>
            <td>Settings → Apps → Manage apps → ⋮ → Special permissions → Install unknown apps</td>
          </tr>
          <tr>
            <td>Samsung (One UI)</td>
            <td>Settings → Apps → Special access → Install unknown apps</td>
          </tr>
          <tr>
            <td>OPPO / OnePlus / realme (ColorOS)</td>
            <td>Settings → App management → Special app permissions → Install unknown apps</td>
          </tr>
          <tr>
            <td>vivo / iQOO (OriginOS)</td>
            <td>Settings → More settings → Permission manager → Install unknown apps</td>
          </tr>
          <tr>
            <td>Huawei / Honor (EMUI, HarmonyOS)</td>
            <td>Settings → Security → More security settings → External source downloads</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      If your device is not listed, use the universal method: <strong>search "unknown" in the Settings search bar.</strong>{" "}
      It lands you on the right screen in one step and works across every skin.
    </p>

    <h2>Second gates per vendor</h2>
    <p>Even with the permission on, several brands add a second layer. Knowing these saves a lot of confusion:</p>
    <ul>
      <li>
        <strong>Xiaomi / Redmi:</strong> a "security check" prompt appears; you can wait about 10 seconds to skip. Some
        builds also block sideloads while "Pure Mode" is enabled.
      </li>
      <li>
        <strong>Samsung:</strong> Auto Blocker blocks all sideloads regardless of the per-app permission.
      </li>
      <li>
        <strong>Huawei / Honor:</strong> you get "this app has not passed Huawei security checks" with a "Continue
        installation" option. Some builds also restrict installs to the AppGallery only.
      </li>
      <li>
        <strong>OPPO / OnePlus:</strong> may run an app safety scan; choose "Install anyway" afterward.
      </li>
      <li>
        <strong>vivo:</strong> some builds route through iManager's install interception, which needs a per-app whitelist
        entry.
      </li>
    </ul>
    <p>
      These prompts are not errors. They are vendor safety notices. The decision rule is simple:{" "}
      <strong>
        if you deliberately want this app and its source is traceable, continue. If it arrived via an unsolicited popup or
        a random SMS link, cancel.
      </strong>
    </p>

    <h2>Should you leave the permission on?</h2>
    <p>
      This is the part most guides skip. My recommendation: <strong>leave it off by default and enable it only when
      needed.</strong>
    </p>
    <p>
      The reason is scope. This permission is not just a one-time install approval — it grants that app the ongoing
      ability to install things onto your phone. For apps you use daily (browsers, messaging clients), holding that
      permission permanently significantly widens the blast radius if that app itself is compromised.
    </p>
    <p>A safer routine:</p>
    <ol>
      <li>Enable the permission for the specific app right before you need it</li>
      <li>Turn it back off immediately after installing</li>
      <li>Delete the downloaded APK file</li>
    </ol>
    <p>
      If you sideload frequently — developers, QA testers — pick <strong>one dedicated file manager</strong> as your
      installer and grant the permission only to it. Everything else stays off. Risk gets concentrated into one
      controllable point.
    </p>

    <h2>Three checks before you install</h2>
    <p>The permission is only part of the flow. The file itself determines safety:</p>
    <p>
      <strong>First, verify the source.</strong> Official developer sites, Google Play, F-Droid, and APKMirror (which
      verifies signatures) carry meaningfully lower risk than forum attachments and cloud-drive links.
    </p>
    <p>
      <strong>Second, sanity-check the file.</strong> Does the size make sense? A 300MB game is not 2MB. Do the version
      number and publisher match what the developer publishes?
    </p>
    <p>
      <strong>Third, read the permission list.</strong> The install screen shows what the app requests. A flashlight app
      asking for contacts and SMS is a hard pass.
    </p>
    <p>
      For high-security cases, compare signing certificates. <code>apksigner verify --print-certs app.apk</code> prints
      the certificate fingerprint; if it matches the developer's published fingerprint, the file has not been repackaged.
    </p>

    <h2>Common errors, decoded</h2>
    <ul>
      <li>
        <strong>"There was a problem parsing the package"</strong> → corrupt or incomplete download, or the file is not
        actually an APK (a .xapk renamed to .apk). Re-download first.
      </li>
      <li>
        <strong>"App not installed"</strong> → usually a signature conflict with an existing copy. Uninstall the old
        version.
      </li>
      <li>
        <strong>"Not compatible with your device"</strong> → architecture (32-bit vs 64-bit) or minimum SDK mismatch. This
        is not a permission issue.
      </li>
      <li>
        <strong>"Installation blocked" with no detail</strong> → check Pure Mode, Auto Blocker, or an MDM policy.
      </li>
    </ul>
    <p>
      Separating "permission problem" from "file problem" saves real time. Permission issues say <em>not allowed to
      install</em>. File issues say <em>installation failed</em>. Different symptoms, different fixes.
    </p>

    <h2>The short version</h2>
    <p>
      Three sentences: the permission is per-app, so search for "Install unknown apps" rather than "Unknown sources";
      vendor paths vary, so use the Settings search box; turn it off when you are done.
    </p>
    <p>
      Sideloading is a normal Android capability, not a dangerous act. What is dangerous is making it a reflex without
      knowing where the file came from. You can grab installation packages from <Link href="/">gptoapk</Link>.
    </p>
  </>
);

const FAQS2: BlogFaqItem[] = [
  {
    question: "Why can't I find an \"Unknown sources\" option in Settings?",
    answer:
      "Because Android 8.0 renamed and split that switch. It is now called \"Install unknown apps,\" and you first choose which specific app (browser, file manager) receives install permission. Searching \"unknown\" in Settings jumps straight to the right screen.",
  },
  {
    question: "Does enabling install unknown apps make sideloading safe?",
    answer:
      "No. That permission only controls whether an install can happen, not whether the file is safe. Safety depends on source trustworthiness and signature matching — check file size, version, and certificate fingerprint before installing.",
  },
  {
    question: "Why does the permission switch itself off after an install?",
    answer:
      "It is a deliberate vendor safety design. Many systems revoke the permission after a successful install so an app cannot hold install capability indefinitely. Re-enable it when you need to install again.",
  },
  {
    question: "An install is blocked with no error message. What now?",
    answer:
      "Check in order: Pure Mode (Xiaomi), Auto Blocker (Samsung), AppGallery-only restriction (Huawei), and any MDM enterprise policy. These blockers typically do not surface a specific error code.",
  },
];

export const enPosts20261106 = [
  {
    slug: "get-brand-mentioned-in-ai-search-answers",
    title: "How to Get Your Brand Mentioned in AI Search Answers: Five Levers That Actually Move the Needle",
    description:
      "AI citations are not luck — they depend on extractable facts models can actually use. Five levers ordered by effort-to-result ratio: extractable sentences, a facts page, comparison pages, source coverage, and a measurement loop.",
    date: "2026-11-06",
    readTime: "9 min read",
    tags: ["geo", "seo", "marketing"],
    content: ARTICLE1,
    faqs: FAQS1,
  },
  {
    slug: "android-install-unknown-apps-setting-by-brand",
    title: "Where Is the Install Unknown Apps Setting on Android? A Brand-by-Brand Guide",
    description:
      "Android 8.0 changed the model: install permission is per-app, not global. Where the setting lives on Pixel, Xiaomi, Samsung, Huawei, OPPO and vivo — plus the second gates each vendor adds and when to turn it off again.",
    date: "2026-11-06",
    readTime: "9 min read",
    tags: ["android", "apk", "howto"],
    content: ARTICLE2,
    faqs: FAQS2,
  },
];

export const enPosts20261106List = toList(enPosts20261106);
