const CACHE = 'tanzeeli-cec60539d6';
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "img/logo.svg", "img/logo-ar.svg", "img/macbook.webp", "img/kitchen.webp", "img/sneaker.webp", "img/headphones.webp", "img/espresso.webp", "img/tablet.webp"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const fresh = e.request.mode === 'navigate' || new URL(e.request.url).pathname.endsWith('version.json');
  e.respondWith(fetch(e.request, fresh ? { cache: 'no-store' } : {}).then((r) => { if (r.ok && new URL(e.request.url).origin === location.origin) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); } return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
