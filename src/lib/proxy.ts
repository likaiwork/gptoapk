import { HttpsProxyAgent } from 'hpagent';

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || '';

// Pass to google-play-scraper as `requestOptions`. Undefined if no proxy
// configured.
export const gplayRequestOptions = proxyUrl
  ? { agent: { https: new HttpsProxyAgent({ proxy: proxyUrl }) } }
  : undefined;

// Pass to plain `got` calls (e.g. when fetching APK binaries from a mirror).
export const gotProxyAgent = proxyUrl
  ? { https: new HttpsProxyAgent({ proxy: proxyUrl }) }
  : undefined;
