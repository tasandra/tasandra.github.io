/* =====================================================
   PWA Explorer — service-worker.js
   All app assets (HTML, CSS, JS, images, icons, fonts)
   are cached on install so the app works fully offline.
   ===================================================== */

'use strict';

const CACHE_NAME = 'pwa-explorer-v1';

/* All assets to pre-cache at install time */
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',

  /* Background images from the hw4 folder */
  './images/bg-blue.jpg',
  './images/bg-gold.jpg',

  /* App icons (all sizes declared in manifest.json) */
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
];

/* ---- INSTALL: pre-cache all defined assets ---- */
self.addEventListener('install', function (event) {
  console.log('[SW] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('[SW] Caching all app assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(function () {
        return self.skipWaiting();
      })
      .catch(function (error) {
        console.error('[SW] Cache addAll failed:', error);
      })
  );
});

/* ---- ACTIVATE: delete old caches ---- */
self.addEventListener('activate', function (event) {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames
            .filter(function (name) { return name !== CACHE_NAME; })
            .map(function (name) {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

/* ---- FETCH: Cache-First strategy ---- */
self.addEventListener('fetch', function (event) {
  /* Only handle GET requests */
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        /* Not in cache — try the network */
        return fetch(event.request)
          .then(function (networkResponse) {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type !== 'opaque'  
            ) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(function () {
            /* Network failed and not in cache — return offline fallback for HTML requests */
            if (event.request.headers.get('accept') &&
                event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            return new Response('Resource unavailable offline.', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});
