const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json", "/vite.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    })
  );
});
