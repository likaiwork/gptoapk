import { HttpsProxyAgent } from 'hpagent';
import { ProxyAgent } from 'undici';

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || '';

// Pass to google-play-scraper as `requestOptions`. Undefined if no proxy
// configured. Only used for local development (Clash, etc.).
export const gplayRequestOptions = proxyUrl
  ? { agent: { https: new HttpsProxyAgent({ proxy: proxyUrl }) } }
  : undefined;

// Pass to native fetch via the `dispatcher` option to route through the
// proxy in local dev. Undefined in production (Vercel sets no proxy var).
export const fetchDispatcher = proxyUrl ? new ProxyAgent({ uri: proxyUrl }) : undefined;
