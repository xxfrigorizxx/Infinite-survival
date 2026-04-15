const CACHE='survivor-launch-v1';
const ASSETS=[
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap'
];

// Installation — mettre en cache
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

// Activation — nettoyer vieux caches
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

// Fetch — cache d'abord, réseau ensuite
self.addEventListener('fetch',e=>{
  // Firebase toujours en réseau
  if(e.request.url.includes('firebase')||e.request.url.includes('googleapis.com/identitytoolkit')){
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached)return cached;
      return fetch(e.request).then(resp=>{
        // Mettre en cache les nouvelles ressources statiques
        if(resp.ok&&e.request.method==='GET'){
          const clone=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
        }
        return resp;
      }).catch(()=>cached||new Response('Hors ligne',{status:503}));
    })
  );
});
