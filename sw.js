//Asignar nombre y versión a la cache
const CACHE_NAME = 'cv-cache-v1';

//Archivos a cachear en la aplicación
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './manifest.json',
    './img/img.jpg',
    './img/img16.jpg',
    './img/img32.jpg',
    './img/img64.jpg',
    './img/img72.jpg',
    './img/img96.jpg',
    './img/img120.jpg',
    './img/img144.jpg',
    './img/img152.jpg',
    './img/img180.jpg',
    './img/img192.jpg',
    './img/img512.jpg',
    './img/img1024.jpg',
];

//evento install
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    console.log('Cache abierto');

    for (const url of urlsToCache) {
      try {
        await cache.add(url);
        console.log('Cacheado:', url);
      } catch (err) {
        console.warn('NO se pudo cachear:', url, err);
      }
    }

    await self.skipWaiting();
  })());
});

//Evento activate
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim();
        })
    );
});


//Evento fetch con el que se recuperan los recursos y si no esta en cache se recupera de la red
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(e.request);
        })
    );
});

