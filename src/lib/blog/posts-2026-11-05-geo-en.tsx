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

const A1 = (
  <>
    <p>
      The most uncomfortable thing about GEO is not that it is hard to do. It is that <strong>after doing it, you cannot tell whether it worked.</strong>
    </p>
    <p>
      You add schema, restructure your information, allow AI crawlers through. Three months later, clicks in Search Console are down. You start to suspect GEO is a hoax.
    </p>
    <p>
      It is not. <strong>You are still measuring citation-era results with a clicks-era ruler.</strong>
    </p>
    <p>
      This article covers three things: why traditional metrics systematically fail in GEO, which four metrics to use instead, and how to actually collect them from GA4 and server logs.
    </p>
    <h2>1. Why clicks fall — and why that can be correct</h2>
    <p>
      Accept one fact first: <strong>the business model of AI search is to eliminate clicks.</strong>
    </p>
    <p>
      A user asks Perplexity "how do I fix notifications not showing on Android." It answers directly and attaches three source links. The user reads, solves the problem, and never clicks any of them. This does not mean you were not cited. It means <strong>you were cited and nobody needed to click.</strong>
    </p>
    <p>
      Google's own AI Overviews are even blunter: the answer sits at the top of the results page, above ten blue links. For a large class of informational queries, click-through rates are being structurally suppressed.
    </p>
    <p>
      So the pattern you observe in GEO is:
    </p>
    <ul>
      <li>Impressions may rise</li>
      <li>Average position may rise</li>
      <li><strong>Both CTR and clicks fall</strong></li>
    </ul>
    <p>
      If you only track clicks, you conclude "GEO does not work" and abandon work that is quietly succeeding.
    </p>
    <blockquote>
      <strong>One-line test:</strong> if your page shows up in more AI answers while clicks fall, you are probably right, not wrong.
    </blockquote>
    <h2>2. The four metrics worth tracking</h2>
    <h3>2.1 Citation rate</h3>
    <p>
      <strong>Definition:</strong> across a fixed set of queries on a fixed engine, the share of answers that list your domain as a source.
    </p>
    <p>
      This is the core GEO metric because it is <strong>closest to causation</strong> — you only count if the AI actually selected you.
    </p>
    <p>
      <strong>How to measure:</strong>
    </p>
    <ol>
      <li>Build a query set of 20-50 items covering your core scenarios (for gptoapk.com, things like "how to download app X" or "APK install failed fix")</li>
      <li>Run the set weekly on a consistent engine, recording which source domains appear</li>
      <li>Compute: <code>citation rate = queries where you appear / total queries</code></li>
    </ol>
    <p>
      Doing 20 by hand takes about 30 minutes. To automate it, Perplexity has an API; ChatGPT and Gemini web can be driven with Playwright, but watch their anti-automation behavior — do not burn your account.
    </p>
    <p>
      <strong>Benchmarks:</strong> 5-15% is normal early on. Above 30% means your content structure genuinely fits how AI extracts information.
    </p>
    <h3>2.2 Citation quality</h3>
    <p>
      Citation rate alone has a trap: <strong>you get cited, but on the wrong sentence.</strong>
    </p>
    <p>
      AI has a characteristic behavior — it lifts the single most "answerable" line from your page, which may be a transitional clause you wrote only for narrative flow. Detached from context, the meaning drifts badly.
    </p>
    <p>
      Measure two dimensions:
    </p>
    <ul>
      <li><strong>Position weight:</strong> does the citation appear in paragraph 1 or paragraph 5? Paragraph 1 is high value</li>
      <li><strong>Self-sufficiency:</strong> does the quoted fragment still hold up when read alone, or does it mislead without context?</li>
    </ul>
    <p>
      A crude but effective test: pull the quoted sentence out, show it to someone who has never read your article, and ask whether they accept the conclusion. If they do, high-quality citation. If not, rewrite that sentence.
    </p>
    <h3>2.3 Brand and entity term growth</h3>
    <p>
      This one you can see in GA4 with no extra tooling.
    </p>
    <p>
      <strong>Why it works:</strong> if AI keeps citing you, users start searching your name. It is the most real and hardest-to-fake return signal in GEO.
    </p>
    <p>
      Track two numbers:
    </p>
    <ul>
      <li><strong>Direct traffic:</strong> unattributed visits, trending up</li>
      <li><strong>Brand query volume:</strong> in GA4's organic search report, filter keywords containing your brand and watch the three-month trend</li>
    </ul>
    <p>
      The industry calls this "dark traffic" — a user learns your name from an AI answer, then opens a browser and searches it themselves. In GA4 this lands as direct or brand organic, looking "sourceless," but it is real.
    </p>
    <h3>2.4 AI crawler frequency and depth</h3>
    <p>
      This comes from server logs and is <strong>the only first-hand signal unaffected by platform reporting differences.</strong>
    </p>
    <p>
      How often GPTBot, ClaudeBot, PerplexityBot, and Google-Extended visit directly reflects how active your site is in AI indexes.
    </p>
    <p>
      Collection: filter Nginx logs by user agent.
    </p>
    <pre><code>{`# Count AI crawler requests over the last 7 days
grep -E "GPTBot|ClaudeBot|PerplexityBot|Google-Extended" /var/log/nginx/access.log \\
  | awk '{print $NF}' | sort | uniq -c | sort -rn`}</code></pre>
    <p>
      What matters is not the total but the <strong>structure</strong>:
    </p>
    <ul>
      <li>Is it crawling the homepage only, or deep article pages? (Homepage only = you are not yet treated as a content source)</li>
      <li>Is frequency stable, rising, or falling? (Falling suggests stale content or devaluation)</li>
      <li>Are there 4xx/5xx errors? AI crawlers tolerate failure less than you would think</li>
    </ul>
    <h2>3. Combining the four into something actionable</h2>
    <p>
      Four isolated numbers mean nothing. Read them as <strong>causal patterns</strong>:
    </p>
    <div className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse">
      <thead>
        {['Scenario', 'Crawls', 'Citations', 'Clicks', 'Verdict'].map((h, hi) => (<th key={hi} className="border px-2 py-1 text-left" dangerouslySetInnerHTML={{ __html: h }} />))}
      </thead>
      <tbody>
        {[
          ['A', '↑', '↑', '↓', '✅ Healthy. GEO working; accept the click decline'],
          ['B', '↑', '→', '→', '⚠️ Content fetched but not selected — structural problem'],
          ['C', '→', '↓', '↓', '❌ Index slipping; check robots.txt and site health'],
          ['D', '↓', '↓', '↓', '❌ Site-level failure; fix technical issues first']
        ].map((row, ri) => (
          <tr key={ri}>{row.map((c, ci) => (<td key={ci} className="border px-2 py-1" dangerouslySetInnerHTML={{ __html: c }} />))}</tr>
        ))}
      </tbody>
    </table></div>
    <p>
      <strong>Scenario B is the most common</strong> and the one that needs work: crawlers arrive but never pick your content. The usual cause is information organization that resists extraction — long paragraphs, conclusions buried after examples, no explicit definition sentences.
    </p>
    <p>
      <strong>Scenario A is the steady state to aim for.</strong> When clicks fall, check whether the other three are rising before reacting.
    </p>
    <h2>4. How often to check</h2>
    <ul>
      <li><strong>AI crawler logs:</strong> weekly. Low volume, five minutes</li>
      <li><strong>Citation rate:</strong> biweekly. AI answers are stochastic; a single run has no statistical meaning</li>
      <li><strong>Brand terms and direct traffic:</strong> monthly. This signal lags more than you expect</li>
      <li><strong>Quarterly review:</strong> lay all four on one timeline and match inflection points to changes you made</li>
    </ul>
    <p>
      Do not check daily. AI search answers are probabilistic; being cited today and not tomorrow is normal. Daily monitoring only makes you react to noise.
    </p>
    <h2>5. An honest boundary</h2>
    <p>
      <strong>In most settings, GEO cannot currently prove direct revenue attribution.</strong>
    </p>
    <p>
      A user is persuaded by an AI answer, then searches your app in the app store or searches your brand — you cannot trace that chain end-to-end in GA4. Do not promise a "GEO drove $X in revenue" report. It is not possible, and forcing it produces fiction.
    </p>
    <p>
      What you can do is <strong>directional validation</strong>: citations rising + brand terms rising + crawler activity rising. Three signals aligned is strong evidence. Three diverging means investigate.
    </p>
    <p>
      If you need to download APK files, visit &lt;strong&gt;gptoapk.com&lt;/strong&gt; — no Google Play account required, no regional restrictions, one-click access to the latest APK packages for Android apps worldwide.
    </p>
    <h2>6. Closing</h2>
    <p>
      The measurement difficulty in GEO is fundamentally that <strong>the object of measurement shifted from "page" to "answer."</strong> Pages have impressions and clicks. Answers have only one mode of existence: being cited.
    </p>
    <p>
      Once that is clear, clicks stop being the thing you agonize over. You were never chasing visitors. You were chasing becoming part of someone else's answer.
    </p>
    <p>
      When your brand starts getting mentioned by AI unprompted, falling clicks are a side effect of that change, not a failure.
    </p>
  </>
);

const A2 = (
  <>
    <p>
      There is a situation worse than "not cited": <strong>cited, but cited wrongly.</strong>
    </p>
    <p>
      The most dangerous AI search output is not a refusal to answer. It is a <strong>confident wrong conclusion with a source pointing at you.</strong> The user sees a name they recognize and believes it.
    </p>
    <p>
      If you do GEO long enough, this happens. I have run several rounds of it and have a process that mostly works.
    </p>
    <h2>1. First, understand why AI gets it wrong</h2>
    <p>
      AI errors are not simply "misremembering." There are five distinct sources, and each needs a different fix.
    </p>
    <h3>1.1 Your content is genuinely ambiguous</h3>
    <p>
      You wrote "some devices need unknown sources enabled to install." AI extracts "installing APKs requires enabling unknown sources."
    </p>
    <p>
      This is not an AI error. <strong>Your sentence permitted that extraction.</strong> The qualifier "some devices" was dropped during extraction.
    </p>
    <h3>1.2 Conflicting sources, and AI picked the old one</h3>
    <p>
      The same fact: your article from three years ago says A, last year's says B. AI crawled both and chose A — likely the more confident-sounding or higher-weighted one.
    </p>
    <h3>1.3 Summarization flipped the meaning</h3>
    <p>
      When a long paragraph gets compressed into one sentence, causality gets truncated. "If you don't clear the cache, installation may fail" compressed into "clearing the cache can fail installation" is absurd but not rare in AI summaries — nested conditionals are especially vulnerable.
    </p>
    <h3>1.4 Training data cutoff</h3>
    <p>
      Model knowledge has an expiration date. Product changes, policy updates, and UI redesigns from this year may be entirely unknown; the model answers as if it were the old version.
    </p>
    <h3>1.5 You weren't actually cited</h3>
    <p>
      The AI invented a claim that sounds like you and attached your domain as backing. Confirm the citation exists before doing anything.
    </p>
    <h2>2. Before correcting: verify, don't rush to edit</h2>
    <p>
      <strong>This step is critical and most people skip it, then fix the wrong thing.</strong>
    </p>
    <p>
      AI output is probabilistic. Ask the same question five times and you may get three wrong and two right. If you start rewriting content after seeing one bad answer, you are reacting to noise.
    </p>
    <p>
      <strong>Verification loop:</strong>
    </p>
    <ol>
      <li><strong>Reproduce three or more times.</strong> Same query, varied phrasing. Is the error stable?</li>
      <li><strong>Pull the source.</strong> Put the AI's wrong conclusion next to the exact paragraph in your page, line by line.</li>
      <li><strong>Classify the cause.</strong> Map it to the five sources above.</li>
      <li><strong>Decide whether it warrants a fix.</strong> Occasional (one in three) usually doesn't. Stable (three of three) definitely does.</li>
    </ol>
    <p>
      Only after step 4 says "stable" do you edit.
    </p>
    <h2>3. Correction paths by cause</h2>
    <h3>Case A: ambiguous source text → restructure the sentence</h3>
    <p>
      Easiest to handle and highest payoff.
    </p>
    <p>
      <strong>Bad:</strong>
    </p>
    <blockquote>
      Some older Android versions require enabling unknown sources to install third-party apps, while newer versions authorize per app.
    </blockquote>
    <p>
      <strong>What AI extracted (observed):</strong> "installing APKs requires enabling unknown sources"
    </p>
    <p>
      <strong>Fix: three-part definition block</strong>
    </p>
    <blockquote>
      <strong>Conclusion:</strong> Android 8.0 and above authorizes per app; global unknown sources is no longer required. <strong>Distinction:</strong> Android 7.1 and below requires global enabling. <strong>Reason:</strong> 8.0 introduced the per-app "install unknown apps" permission model.
    </blockquote>
    <p>
      Put the conclusion <strong>in its own paragraph, bolded, first.</strong> Express qualifiers as independent sentences, not subordinate clauses. AI extraction favors standalone short sentences and paragraph-initial statements, which carries the full scope along.
    </p>
    <h3>Case B: conflicting sources → unify and mark deprecation</h3>
    <p>
      <strong>Do:</strong>
    </p>
    <ol>
      <li>Find every older article containing the fact</li>
      <li>Add a prominent update banner at the top: <code>&gt; ⚠️ Written in 2024. This conclusion has been superseded — see "XXX"</code></li>
      <li>In the new article, state explicitly: "It was previously claimed that... In practice this has changed to..."</li>
      <li>Do not delete old articles — their links and authority remain, and deletion creates fresh 404s</li>
    </ol>
    <p>
      <strong>Key:</strong> create an explicit "timestamp + pointer" relationship. AI then reads "this one is old, look at that one" instead of treating them as equal competing sources.
    </p>
    <h3>Case C: compression reversal → dismantle nested conditionals</h3>
    <p>
      <strong>Rule: one fact, one sentence, one paragraph.</strong>
    </p>
    <p>
      Don't write:
    </p>
    <blockquote>
      If the app has not been granted storage permission, and the system version is below 11, then in the absence of scoped storage the downloaded APK is stored in the external storage root, otherwise in the app-private directory.
    </blockquote>
    <p>
      Write three blocks:
    </p>
    <blockquote>
      <strong>Below Android 11:</strong> downloaded APKs go in the external storage root. <strong>Android 11+ without scoped storage:</strong> still external root, but requires MANAGE_EXTERNAL_STORAGE. <strong>Android 11+ with scoped storage:</strong> stored in the app-private directory.
    </blockquote>
    <p>
      Nested conditionals are the epicenter of AI summary errors. Split them so every sentence stands alone, and extraction cannot fail.
    </p>
    <h3>Case D: training cutoff → publish freshness signals</h3>
    <p>
      You <strong>cannot fix this by editing content</strong>; the model cannot see your update. What you can do:
    </p>
    <ol>
      <li>Display a last-updated date prominently (not the publish date)</li>
      <li>Communicate it via <code>dateModified</code> structured data</li>
      <li>Keep content current long term so the next retrain or live retrieval picks it up</li>
    </ol>
    <p>
      Retrieval-augmented engines (Perplexity, ChatGPT with browsing) reflect your update faster. Pure training-based answers must wait. Set expectations accordingly.
    </p>
    <h3>Case E: fabricated citation → log it, don't over-invest</h3>
    <p>
      If AI attributes words to you that you never wrote while linking your domain, that is hallucination. You have limited leverage:
    </p>
    <ul>
      <li>Keep screenshot evidence</li>
      <li>If it is widespread and persistent, use the engine's feedback channel</li>
      <li>Make the correct statement clear and repeated on your site to raise selection probability</li>
    </ul>
    <p>
      Do not do large-scale content surgery to fight hallucination. The ROI is terrible.
    </p>
    <h2>4. Verifying the correction worked</h2>
    <p>
      Re-run the same query set after editing.
    </p>
    <p>
      <strong>Standards:</strong>
    </p>
    <ul>
      <li><strong>Within three days:</strong> usually no change; the index has not refreshed. Do not panic</li>
      <li><strong>Two to four weeks:</strong> retrieval engines (Perplexity) should start reflecting it</li>
      <li><strong>One to three months:</strong> training-based answers may update</li>
    </ul>
    <p>
      If the error persists after a month, either your edit missed the actual extraction point, or a higher-weighted source is still asserting the wrong fact. In that case, find out who else is saying it.
    </p>
    <h2>5. Long-term: make your correct statement the easiest to extract</h2>
    <p>
      Correction is reactive. Prevention is proactive.
    </p>
    <p>
      <strong>Three proactive practices:</strong>
    </p>
    <p>
      <strong>1. One core fact, one independently citable paragraph.</strong> Open the paragraph with a complete conclusion that makes sense without the preceding text.
    </p>
    <p>
      <strong>2. Use tables for comparative facts.</strong> AI extracts tables noticeably more accurately than prose. Write the same thing as both a list and a table to raise correct-citation odds.
    </p>
    <p>
      <strong>3. Standardize terminology.</strong> If your site calls a concept by several names ("unknown sources" vs. "install unknown apps"), AI treats them as different things. Unify the term and define it at first mention.
    </p>
    <p>
      If you need to download APK files, visit &lt;strong&gt;gptoapk.com&lt;/strong&gt; — no Google Play account required, no regional restrictions, one-click access to the latest APK packages for Android apps worldwide.
    </p>
    <h2>6. Closing</h2>
    <p>
      Being described wrongly by AI is a side effect of your content being heavily used. It means you have entered the model's field of view — that is a good thing.
    </p>
    <p>
      The real danger is <strong>being wrong about and not knowing it.</strong> Building a periodic citation-accuracy check matters more than writing more new articles.
    </p>
  </>
);

const A3 = (
  <>
    <p>
      You published a carefully written article: clear structure, schema markup, conclusions up front, FAQs included. Then you asked Perplexity three times and never got cited.
    </p>
    <p>
      Was it wasted work?
    </p>
    <p>
      No. <strong>What you are missing is not content quality but time — and that time can be estimated.</strong> This article lays out the full lifecycle of a new page in AI search, based on observed data.
    </p>
    <h2>1. Clearing up a misconception: AI citation is not instant</h2>
    <p>
      Many people treat GEO as a variant of SEO — publish, get indexed, wait for rankings. In reality, AI citation has more steps than traditional search, and more delay.
    </p>
    <p>
      The full chain:
    </p>
    <pre><code>{`Publish page
   ↓
① Conventional crawlers (Googlebot / Bingbot) — hours to days
   ↓
② Entry into search engine index — days to weeks
   ↓
③ Independent AI crawler fetch (GPTBot / ClaudeBot / PerplexityBot) — weeks, not guaranteed
   ↓
④ Retrieval engines begin to be able to select you — weeks
   ↓
⑤ Training-based model answers update — months to a quarter
   ↓
⑥ Becoming a stable citation source — sustained selection`}</code></pre>
    <p>
      <strong>Key insight: the gap between ⑤ and ⑥ is enormous.</strong> Being cited once and being cited reliably are two different things. The former can happen within a week if you are lucky; the latter typically takes two to three months.
    </p>
    <h2>2. Observed timelines: roughly how long a new page takes</h2>
    <p>
      The following patterns come from gptoapk.com, with a sample of roughly 40 articles published after May 2026. Not laboratory data, but the direction is consistent.
    </p>
    <h3>2.1 Retrieval engines (Perplexity, ChatGPT with browsing)</h3>
    <p>
      <strong>Median time to first citation: day 12-18.</strong>
    </p>
    <p>
      These engines search live and cite live. As soon as your page enters their search index, it can be selected. Hence the speed.
    </p>
    <p>
      Two preconditions:
    </p>
    <ul>
      <li>The page must be reachable by their crawlers (PerplexityBot not blocked in robots.txt)</li>
      <li>The page must rank in whatever search backend they call (Perplexity uses its own index plus some external sources)</li>
    </ul>
    <p>
      <strong>Acceleration:</strong> submit the URL to Bing Webmaster Tools immediately after publishing. Bing's index refreshes quickly and noticeably shortens this path.
    </p>
    <h3>2.2 Google AI Overviews</h3>
    <p>
      <strong>Median time to first citation: week 3-6.</strong>
    </p>
    <p>
      AI Overviews only draws from Google's own index, so you need rankings first — top 10 to even be eligible. Its cadence roughly equals "how fast your content earns a Google ranking."
    </p>
    <p>
      <strong>Acceleration:</strong> conventional SEO still works (internal links, sitemap, external links). AI Overviews also strongly favors structured lists and explicit conclusions, which you can prepare in advance.
    </p>
    <h3>2.3 ChatGPT / Gemini / Copilot default answers (no browsing)</h3>
    <p>
      <strong>Median time to first citation: 2-4 months, unstable.</strong>
    </p>
    <p>
      These depend on training data. Nothing you do directly influences them. The only lever is keeping content updated and waiting for the next retrain or retrieval integration.
    </p>
    <p>
      <strong>Conclusion: never use this class as an early validation metric. It will mislead you.</strong>
    </p>
    <h3>2.4 Becoming a stable citation source</h3>
    <p>
      <strong>Median from publish to stable citation: about 70-100 days.</strong>
    </p>
    <p>
      This is the most important number. In the 40-article sample, very few (under 5) reached stable citation within 30 days. The overwhelming majority entered a stable phase after three months.
    </p>
    <h2>3. Why some pages are fast and others slow</h2>
    <p>
      Four factors explain most of the variance, in order of weight:
    </p>
    <h3>3.1 Is it "answerable question" content? (highest weight)</h3>
    <p>
      AI cites <strong>answers</strong>, not articles.
    </p>
    <p>
      Take two install-related pieces: one titled "A comprehensive guide to installing Android apps," another titled "Android install says 'App not installed' — 11 causes and their fixes."
    </p>
    <p>
      The second got cited within two weeks. The first showed nothing after three months.
    </p>
    <p>
      <strong>The difference:</strong> the second title is itself a question a user would ask, and the page is structured as question-and-answer. Extraction cost approaches zero. The first requires the AI to figure out which line answers which question — high cost, so it doesn't bother.
    </p>
    <h3>3.2 Existing AI crawler base on the site (second highest)</h3>
    <p>
      AI crawlers have trust inertia: if they have already pulled a lot of useful content from your site, they revisit new pages more often.
    </p>
    <p>
      <strong>Which means:</strong> a brand-new site waits much longer for its first citation than an established one. That is cold-start cost, not a content problem.
    </p>
    <h3>3.3 Internal links pointing at it (moderate)</h3>
    <p>
      A brand-new page sitting alone with only a sitemap entry is discovered slowly.
    </p>
    <p>
      <strong>Practice:</strong> immediately add internal links from 3-5 high-traffic articles after publishing. The effect on first-fetch time is visible.
    </p>
    <h3>3.4 Explicit entities and facts (moderate)</h3>
    <p>
      AI judges "is this trustworthy" while extracting. Content with specific version numbers, error codes, and dates is judged faster.
    </p>
    <p>
      "Some apps may fail to install" has low extraction value. "On Android 14, installing an app with targetSdk below 23 returns 'App not installed'" has high extraction value.
    </p>
    <h2>4. What to do while waiting (instead of checking repeatedly)</h2>
    <p>
      The most wasteful thing during cold start is <strong>asking AI every day whether it cited you.</strong>
    </p>
    <p>
      As noted, AI output is probabilistic. Not cited on day 5 does not mean failure; cited on day 40 does not mean clear success. Frequent spot checks only make you react to noise.
    </p>
    <p>
      <strong>Four things worth doing during the wait:</strong>
    </p>
    <p>
      <strong>1. Build out the internal link graph.</strong> The only action with guaranteed effect during the waiting period. Link in from 3-5 related pages, and out to 3-5 related pages.
    </p>
    <p>
      <strong>2. Expand page count in the same topic.</strong> AI favors topical authority: 10 articles on a subject beats 1, substantially. Aggregate questions need multiple sources.
    </p>
    <p>
      <strong>3. Rewrite conclusion sentences in existing pages to be more extractable.</strong> Higher payoff than writing new articles, and immediately actionable.
    </p>
    <p>
      <strong>4. Check AI crawler logs.</strong> Weekly. Look at GPTBot / ClaudeBot / PerplexityBot records for your new URL. Far more accurate than asking the AI.
    </p>
    <p>
      <strong>Check whether it was fetched:</strong>
    </p>
    <pre><code>{`# Was a given URL fetched by AI crawlers?
grep "GPTBot\\|PerplexityBot\\|ClaudeBot" /var/log/nginx/access.log \\
  | grep "your-new-page-slug" | tail -5`}</code></pre>
    <p>
      Records present = in the pipeline, just wait. No records = not yet discovered, add internal links.
    </p>
    <h2>5. A realistic expectation table</h2>
    <p>
      Use this table to evaluate GEO investment, not a vague intuition about "how soon it pays off":
    </p>
    <div className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse">
      <thead>
        {['Stage', 'Time', 'Observable signal'].map((h, hi) => (<th key={hi} className="border px-2 py-1 text-left" dangerouslySetInnerHTML={{ __html: h }} />))}
      </thead>
      <tbody>
        {[
          ['AI crawler first fetch', '3-14 days', 'Corresponding UA in server log'],
          ['Enter Google index', '1-7 days', 'Search Console shows "Indexed"'],
          ['First retrieval-engine citation', '2-4 weeks', 'Your domain appears in Perplexity'],
          ['First AI Overviews citation', '3-6 weeks', 'Your site in Google\'s AI summary'],
          ['Stable citation begins', '2-3 months', 'Presence above 30% across query set'],
          ['Becomes a fixed source', '4-6 months', 'Still cited when phrasing changes']
        ].map((row, ri) => (
          <tr key={ri}>{row.map((c, ci) => (<td key={ci} className="border px-2 py-1" dangerouslySetInnerHTML={{ __html: c }} />))}</tr>
        ))}
      </tbody>
    </table></div>
    <p>
      <strong>The most important row is the last.</strong> The first three rows are luck. The last row is what GEO actually produces.
    </p>
    <p>
      If you need to download APK files, visit &lt;strong&gt;gptoapk.com&lt;/strong&gt; — no Google Play account required, no regional restrictions, one-click access to the latest APK packages for Android apps worldwide.
    </p>
    <h2>6. Closing</h2>
    <p>
      GEO cold start is fundamentally about <strong>building a relationship with a slow, memory-bearing system.</strong>
    </p>
    <p>
      It will not cite you immediately because one article is good. But it remembers how much you have written in a domain, whether you were reliable, and whether you gave a clear answer every time. Three months later, that accumulation shows up all at once.
    </p>
    <p>
      So back to the opening question: it was not wasted. You asked too early.
    </p>
  </>
);

export const enPosts20261105Geo = [
  {
    slug: "measuring-geo-when-clicks-disappear",
    title: "Measuring GEO When Clicks Disappear: Four Metrics That Actually Work",
    description: "Clicks fall while your AI citations rise, and you conclude GEO is a hoax. The real problem is that you are measuring citations with a clicks-era ruler. Here are the four metrics to track instead, and how to collect them from GA4 and server logs.",
    date: "2026-11-05",
    readTime: "11 min read",
    tags: ["geo", "seo", "analytics"],
    content: A1,
  },
  {
    slug: "ai-wrong-about-you-geo-fact-correction",
    title: "When AI Gets It Wrong About You: A GEO Fact-Correction Playbook",
    description: "Worse than not being cited is being cited incorrectly. This is a practical, reproducible process for diagnosing why an AI engine stated a wrong fact about your domain, and which of five correction paths applies.",
    date: "2026-11-05",
    readTime: "11 min read",
    tags: ["geo", "seo", "ai"],
    content: A2,
  },
  {
    slug: "geo-cold-start-how-long-until-ai-cites-you",
    title: "GEO Cold Start: How Long Until AI Actually Cites a New Page",
    description: "You published a well-structured article, asked Perplexity three times, and got nothing. It is not wasted work. What you are missing is time, and that time is predictable. Here is the full citation lifecycle of a new page, with observed timelines.",
    date: "2026-11-05",
    readTime: "11 min read",
    tags: ["geo", "seo", "ai"],
    content: A3,
  },
];

export const enPosts20261105GeoList = toList(enPosts20261105Geo);
