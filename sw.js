
var CACHE_NAME = 'sw.wwc.2018'
var urlsToCache = [
  '/sw.wwc.2018',
  '/sw.wwc.2018/styles.css',
  '/sw.wwc.2018/offline.png',
  '/sw.wwc.2018/online.png',
  '/sw.wwc.2018/index.js'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
})

self.addEventListener('fetch', function(event) {
  if (navigator.onLine) {
    event.respondWith(
      fetch(fetchRequest)
        .then(function(response) {
          // Response that we don't want to cache let's just send on
          if(!response || response.status !== 200 || response.type !== 'basic') { return response }

          // Streams can only be consumed once. 
          // Clone so that the cache and the browser can each consume one
          const responseToCache = response.clone()

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache)
            })

          return response
        })
    )
  } else if (new URL(event.request.url).pathname === '/sw.wwc.2018/online.png') {
    console.log('returning offline png')
    event.respondWith(caches.match('/sw.wwc.2018/offline.png'))
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) { return response }
          else throw new Error('send me main!')
        })
        .catch(() => caches.match('/sw.wwc.2018'))
    )
  }
}))

self.addEventListener('activate', function(event) {
  clients.claim()
})

