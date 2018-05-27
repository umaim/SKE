/**
 * Copyright 2018 Cloud
 * Contact: hi@cloudswift.me or cloudswift@qq.com
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cacheName = 'ske-public-v1.4.1';

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