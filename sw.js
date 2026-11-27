// Offline cache cho Bidding English Studio. Dữ liệu Sheet/AI luôn đi thẳng ra mạng.
const CACHE = 'be-v10';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg', './data/preply-lessons.json', './data/lesson-reviews.json', './data/c1-plan.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // no-cache: luôn hỏi lại máy chủ (304 nếu không đổi) để bản mới hiện ngay sau khi merge
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
