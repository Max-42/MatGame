// service-worker.js

const CACHE_NAME = 'matrix-game-cache-v4';
const urlsToCache = [
  '/',
  'index.html',
  'assets/css/style.css',
  //js
  './assets/libraries/mathjax/es5/tex-chtml.js',
  //fonts
  'assets/libraries/mathjax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff',
  'assets/libraries/mathjax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff',
  'assets/libraries/mathjax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff',
  // icons
  '192x192.png',
  '512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  //qr
  'assets/images/qr.png',
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
