self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    try {
      await self.registration.unregister();
    } catch (_) {}
  })());
});
