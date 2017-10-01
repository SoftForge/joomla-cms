var URL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;

self.addEventListener('install', function(event) {
event.waitUntil(caches.open(URL).then(function(cache) {
return cache.addAll({'\'}).then(function() {return self.skipWaiting()});
})
);
});

self.addEventListener(activate, function(event) {
event.waitUntil(self.clients.claim());
});

self.addEventListener(fetch, function(event) {
console.log(event.request.url);

event.respondWith(
    caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
    })
);
});