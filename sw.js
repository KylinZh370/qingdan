const CACHE = 'qingdan-v3'
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
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)))
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE).then((cache) => cache.match(event.request)).then((cached) => cached || fetch(event.request)),
  )
})

