// service-worker.js

const CACHE_NAME = 'matrix-game-cache-v3';
const urlsToCache = [
  '/',
  'index.html',
  'css/style.css',
  // icons
  '192x192.png',
  '512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
