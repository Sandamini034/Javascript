self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["task5.html"])
        })
    );
});

self.addEventListener("fetch", e => {
    console.log("fetch event", e.request.url);
});