var cacheStorageKey = "ske-dev-v0.1";

var filesToCache = [
    "/",
    "/index.html",
    "/favicon.ico",
    "/img/Background.png",
    "/img/SteamLogo.png",
    "/css/app.css",
    "/css/materialize.min.css",
    "/css/material-icons.css",
    "/fonts/material-icons/MaterialIcons-Regular.woff2",
    "js/app.js",
    "js/materialize.min.js",
    "js/service-worker.js"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheStorageKey).then(cache => cache.addAll(filesToCache)).then(() => self.skipWaiting())
    );
});

self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if (response != null) {
                return response;
            }
            return fetch(e.request.url);
        })
    );
});

self.addEventListener("activate", function (e) {
    e.waitUntil(
        Promise.all(
            caches.keys().then(cacheNames => {
                return cacheNames.map(name => {
                    if (name !== cacheStorageKey) {
                        return caches.delete(name);
                    }
                });
            })
        ).then(() => {
            return self.clients.claim();
        })
    );
});