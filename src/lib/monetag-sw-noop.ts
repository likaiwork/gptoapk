/** Replaces Monetag push SW — unregisters on activate so old installs stop serving ads. */
export const MONETAG_SW_NOOP_SOURCE = `self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clients) {
        client.postMessage({ type: 'gptoapk-monetag-sw-disabled' });
      }
    } catch (_) {}
    try {
      await self.registration.unregister();
    } catch (_) {}
  })());
});
`;
