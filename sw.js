// SERVICE WORKER 
const CACHE_NAME = 'punto-musica-v6';

const ARCHIVOS_CACHE = [
  './',
  './index.html',
  './offline.html',
  './css/style.css',
  './js/app.js',
  './js/storage.js',
  './js/api.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// install

self.addEventListener('install', (evento) => {
  console.log('Instalando Service Worker...');

  const promesaCache = caches.open(CACHE_NAME).then((cache) => {
    console.log('Guardando archivos en caché:', ARCHIVOS_CACHE);
    return cache.addAll(ARCHIVOS_CACHE);
  });

  evento.waitUntil(promesaCache);

  self.skipWaiting();
});


// activate

self.addEventListener('activate', (evento) => {
  console.log('Service Worker activado');

  const limpieza = caches.keys().then((nombresCache) => {
    return Promise.all( nombresCache.filter((nombre) =>nombre !== CACHE_NAME).map((nombre) => {
      console.log('Borrando caché antiguo:', nombre);
      return caches.delete(nombre);
        })
    );
  });

  evento.waitUntil(
    limpieza.then(() => self.clients.claim())
  );
});


//fetch
self.addEventListener('fetch', (evento) => {

  if (evento.request.method !== 'GET') return;

  const url = new URL(evento.request.url);
  const esExterno = url.origin !== self.location.origin;

  if (esExterno) {
    evento.respondWith(fetch(evento.request));
    return;
  }

  const respuesta = caches.match(evento.request).then((respuestaCache) => {
    if (respuestaCache) {
      return respuestaCache;
    }

    return fetch(evento.request).catch(() => {
      if (evento.request.destination === 'document') {
        console.warn('Sin red y sin caché');
        return caches.match('./offline.html');
      }
    });
  });

  evento.respondWith(respuesta);
});