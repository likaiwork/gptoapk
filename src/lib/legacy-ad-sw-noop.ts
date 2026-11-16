/**
 * Legacy ad Service Worker terminator.
 *
 * Older deployments registered a third-party push worker at /sw.js. Browsers
 * keep revalidating that URL, so /sw.js still serves this no-op worker, which
 * unregisters itself on activation. It displays no ads, loads no scripts and
 * makes no network requests. Keep it (and the /sw.js rewrite) until those old
 * registrations have expired from returning visitors' browsers.
 */
export const LEGACY_AD_SW_NOOP_SOURCE = `self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clients) {
        client.postMessage({ type: 'gptoapk-legacy-ad-sw-disabled' });
      }
    } catch (_) {}
    try {
      await self.registration.unregister();
    } catch (_) {}
  })());
});
`;
