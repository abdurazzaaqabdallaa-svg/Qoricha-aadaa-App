const CACHE_NAME = 'qoricha-aadaa-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // Bakka kanatti 'icon-512.png' mofaa sana gara 'icon.png' tti jijjiirreera
];

// 1. Install - Fayiilota kuusaa (cache) keessa kaa'uuf
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Fayiilonni cache keessa galaniiru');
      return cache.addAll(assets).catch(err => console.log("Cache addAll error: ", err));
    })
  );
});

// 2. Activate - Kuusaa durii (old cache) qulqulleessuuf
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch - Offline yeroo ta'u kuusaa irraa akka fiduuf
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
