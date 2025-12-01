
const CACHE_NAME = 'ogretmen-gorusme-cache-v1';
const OFFLINE_URLS = [
  './ogretmen_ogrenci_pwa.html',
  './manifest.webmanifest'
  // İstersen buraya icon dosyalarını ve diğer statik dosyaları da ekleyebilirsin.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          caches.match('./ogretmen_ogrenci_pwa.html')
        )
      );
    })
  );
});
