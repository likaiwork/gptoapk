import { HttpsProxyAgent } from 'hpagent';

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || '';

// Pass to google-play-scraper as `requestOptions`. Undefined if no proxy
// configured. Only used for local development (Clash, etc.).
export const gplayRequestOptions = proxyUrl
  ? { agent: { https: new HttpsProxyAgent({ proxy: proxyUrl }) } }
  : undefined;
