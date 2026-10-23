/* PyDrill offline cache (A20). The VERSION placeholder is replaced at build time, so every deploy
   ships a byte-different sw.js; the browser then installs it and old caches are dropped. */
const VERSION = '20261023075222';
const CACHE = `pydrill-${VERSION}`;
const SCOPE = new URL(self.registration.scope);
const SHELL = ['./', './index.html', './manifest.webmanifest', './question-bank/questions.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL.map((p) => new Request(new URL(p, SCOPE), { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pydrill-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isNetworkFirst(url, request) {
  return request.mode === 'navigate' || url.pathname.endsWith('/questions.json') || url.pathname.endsWith('/index.html') || url.pathname === SCOPE.pathname;
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request, { cache: 'no-store' });
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch (err) {
    const hit = (await cache.match(request, { ignoreSearch: true })) || (request.mode === 'navigate' ? await cache.match(new URL('./', SCOPE)) : undefined);
    if (hit) return hit;
    throw err;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;
  // Old preview folders live under the same scope; leave them alone.
  const rest = url.pathname.slice(SCOPE.pathname.length);
  if (rest.startsWith('preview/') || rest.startsWith('preview-b/') || rest === 'preview' || rest === 'preview-b') return;
  if (rest === 'sw.js') return;
  event.respondWith(isNetworkFirst(url, request) ? networkFirst(request) : cacheFirst(request));
});
