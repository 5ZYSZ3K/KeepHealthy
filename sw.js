const assets = 'assets-v1';
const assetsDyn = 'assetsDyn-v1';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(assets).then(cache => {
            cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/scripts/app.js',
                '/manifest.json',
                '/pages/fallback.html'
            ]);
        })
    )
})
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            Promise.all(
                keys.filter(key => key !== assets && key !== assetsDyn)
                .map(key => caches.delete(key))
            )
        })
    )
})
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request)
            .then(fRes => caches
                .open(assetsDyn).then(cache => {
                    cache.put(e.request.url, fRes.clone());
                    return fRes;
                })
            ))
            .catch(() => {
                if(e.request.url.indexOf('.htm') > -1){
                    return caches.match('/pages/fallback.html');
                }
            })
    );
})