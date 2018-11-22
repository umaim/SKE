var cacheName = 'ske-public-v1.6.6';

const filesToCache = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/manifest.json',
    '/img/Background.jpg',
    '/img/Logo.png',
    '/css/app.css',
    '/css/materialize.min.css',
    '/css/material-icons.css',
    '/fonts/material-icons/MaterialIcons-Regular.woff2',
    '/js/app.js',
    '/js/materialize.min.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});