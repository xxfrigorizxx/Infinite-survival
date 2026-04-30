const CACHE = 'survivor-v8.1.1-hotfix-recup-progression-2026-04-29';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (
    e.request.url.includes('firebase') ||
    e.request.url.includes('googleapis.com/identitytoolkit')
  ) {
    return;
  }
  if (e.request.method !== 'GET') return;
  // iOS/Safari: on privilégie le réseau pour les navigations HTML,
  // avec fallback cache/offline, afin de récupérer plus vite les nouvelles versions.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE).then((c) => c.put('./index.html', clone));
          }
          return resp;
        })
        .catch(() =>
          caches.match(e.request).then((cached) =>
            cached || caches.match('./index.html') || new Response('Hors ligne', { status: 503 })
          )
        )
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((resp) => {
          if (resp.ok && e.request.method === 'GET') {
            const clone = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return resp;
        })
        .catch(() => cached || new Response('Hors ligne', { status: 503 }));
    })
  );
});
