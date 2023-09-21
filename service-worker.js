// service-worker.js

const CACHE_VERSION = '8'; //todo UPDATE?
const CACHE_NAME = `matrix-game-cache-${CACHE_VERSION}`;
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
  'assets/libraries/mathjax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff',
  'assets/libraries/mathjax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff',

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

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// try to fetch version.js from server, update cache if it's newer and do not crash if it's not available
self.addEventListener('message', event => {
  if (event.data === 'updateCache') {
    fetch('version.js')
      .then(response => response.json())
      .then(data => {
        if (data.version > CACHE_VERSION) {
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting());
        }
      })
      .catch(() => {
        console.log('version.js not available');
      });
  }
});



