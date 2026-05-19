const SITE_HOST = process.env.BAIDU_SITE || "https://gptoapk.com";
const BAIDU_TOKEN = process.env.BAIDU_TOKEN || "";
const BAIDU_SITE_PARAM = process.env.BAIDU_SITE_PARAM || new URL(SITE_HOST).host;
const BAIDU_ENDPOINT =
  process.env.BAIDU_ENDPOINT ||
  `http://data.zz.baidu.com/urls?site=${encodeURIComponent(BAIDU_SITE_PARAM)}&token=${encodeURIComponent(BAIDU_TOKEN)}`;
const SITEMAP_URLS = (process.env.BAIDU_SITEMAPS || `${SITE_HOST}/sitemap-zh.xml,${SITE_HOST}/sitemap-ai.xml`)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);
const MAX_URLS_PER_REQUEST = 2000;

const explicitUrls = process.argv
  .slice(2)
  .filter((arg) => arg.startsWith("https://"));

function normalizeToBaiduSite(url) {
  const normalizedUrl = new URL(url);
  const site = new URL(SITE_HOST);
  normalizedUrl.protocol = site.protocol;
  normalizedUrl.host = site.host;
  return normalizedUrl.toString();
}

async function loadSitemapUrls(sitemapUrl) {
  const response = await fetch(sitemapUrl, { headers: { "User-Agent": "gptoapk-baidu-submit/1.0" } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${sitemapUrl}: ${response.status}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizeToBaiduSite(match[1].replace(/&amp;/g, "&")));
}

async function loadAllSitemapUrls() {
  const nested = await Promise.all(SITEMAP_URLS.map((sitemapUrl) => loadSitemapUrls(sitemapUrl)));
  return nested.flat();
}

async function submitUrls(urlList) {
  if (!BAIDU_TOKEN) {
    throw new Error("Missing BAIDU_TOKEN. Get it from Baidu Search Resource Platform and run BAIDU_TOKEN=xxx npm run baidu-submit.");
  }

  const uniqueUrls = [...new Set(urlList)].filter((url) => url.startsWith(SITE_HOST));
  if (uniqueUrls.length === 0) {
    console.log("[baidu] No URLs to submit.");
    return;
  }

  for (let i = 0; i < uniqueUrls.length; i += MAX_URLS_PER_REQUEST) {
    const chunk = uniqueUrls.slice(i, i + MAX_URLS_PER_REQUEST);
    const response = await fetch(BAIDU_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "User-Agent": "gptoapk-baidu-submit/1.0",
      },
      body: chunk.join("\n"),
    });
    const body = await response.text().catch(() => "");

    if (!response.ok) {
      throw new Error(`Baidu rejected batch ${i / MAX_URLS_PER_REQUEST + 1}: ${response.status} ${body}`);
    }

    console.log(`[baidu] Submitted ${chunk.length} URLs. ${body}`);
  }
}

try {
  const urls = explicitUrls.length > 0 ? explicitUrls : await loadAllSitemapUrls();
  await submitUrls(urls);
} catch (error) {
  console.warn(`[baidu] ${error instanceof Error ? error.message : String(error)}`);
  if (process.env.BAIDU_STRICT === "1") process.exit(1);
}
