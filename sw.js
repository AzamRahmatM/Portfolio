const CACHE_NAME = 'luxury-slider-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/index.js',
  'assets/img/bg.png',
  'assets/abreezlogoscrolled.png',
  'assets/img/bg.webp',
  'assets/img/big cricle.webp',
  'assets/img/big cricle.png',
  'assets/img/Group 1.webp',
  'assets/img/Group 1.png',
  'assets/img/podium.webp',
  'assets/img/podium.png',
  'assets/img/luxury.webp',
  'assets/img/luxury.png',
  'assets/img/bags/bg.webp',
  'assets/img/bags/big cricle.webp',
  'assets/img/bags/big cricle.png',
  'assets/img/bags/Group 1.webp',
  'assets/img/bags/Group 1.png',
  'assets/img/bags/Group 7.webp',
  'assets/img/bags/Group 7.png',
  'assets/img/gift/bg.webp',
  'assets/img/gift/big cricle.webp',
  'assets/img/gift/big cricle.png',
  'assets/img/gift/Group 1.webp',
  'assets/img/gift/Group 1.png',
  'assets/img/gift/Group 7.webp',
  'assets/img/gift/Group 7.png',
  'assets/img/uniforms/bg.webp',
  'assets/img/uniforms/big cricle.webp',
  'assets/img/uniforms/big cricle.png',
  'assets/img/uniforms/Group 1.webp',
  'assets/img/uniforms/Group 1.png',
  'assets/img/uniforms/Group 7.webp',
  'assets/img/uniforms/Group 7.png',
  'assets/img/events/bg.webp',
  'assets/img/events/big cricle.webp',
  'assets/img/events/big cricle.png',
  'assets/img/events/Group 1.webp',
  'assets/img/events/Group 1.png',
  'assets/img/events/Group 6.webp',
  'assets/img/events/Group 6.png',
  'assets/img/events/Group 7.webp',
  'assets/img/events/Group 7.png',
  'assets/img/arrow_leftpng.svg',
  'assets/img/arrow_right.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Ensure immediate activation
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
