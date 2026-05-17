const SITE_HOST = process.env.INDEXNOW_HOST || "https://gptoapk.com";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "5935b2b9dcd6c981f8b9a5002fb55451";
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10000;

const explicitUrls = process.argv
  .slice(2)
  .filter((arg) => arg.startsWith("https://"));

async function loadSitemapUrls() {
  const sitemapUrl = `${SITE_HOST}/sitemap.xml`;
  const response = await fetch(sitemapUrl, { headers: { "User-Agent": "gptoapk-indexnow/1.0" } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${sitemapUrl}: ${response.status}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replace(/&amp;/g, "&")
  );
}

async function submitUrls(urlList) {
  const uniqueUrls = [...new Set(urlList)].filter((url) => url.startsWith(SITE_HOST));
  if (uniqueUrls.length === 0) {
    console.log("[indexnow] No URLs to submit.");
    return;
  }

  for (let i = 0; i < uniqueUrls.length; i += MAX_URLS_PER_REQUEST) {
    const chunk = uniqueUrls.slice(i, i + MAX_URLS_PER_REQUEST);
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_HOST).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: chunk,
      }),
    });

    if (!response.ok && response.status !== 202) {
      const body = await response.text().catch(() => "");
      throw new Error(`IndexNow rejected batch ${i / MAX_URLS_PER_REQUEST + 1}: ${response.status} ${body}`);
    }

    console.log(`[indexnow] Submitted ${chunk.length} URLs.`);
  }
}

try {
  const urls = explicitUrls.length > 0 ? explicitUrls : await loadSitemapUrls();
  await submitUrls(urls);
} catch (error) {
  console.warn(`[indexnow] ${error instanceof Error ? error.message : String(error)}`);
  if (process.env.INDEXNOW_STRICT === "1") process.exit(1);
}
