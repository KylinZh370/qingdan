const CACHE = 'qingdan-v5'
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './app-data.js',
  './app-enhancements.js',
  './app-views.js',
  './manifest.webmanifest',
  './icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE).then((cache) => cache.match(event.request)).then((cached) => cached || fetch(event.request)),
  )
})

