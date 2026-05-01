self.addEventListener('fetch', function(event) {
  // Ammaaf waan hunda interneeta irraa akka fidu qofa godha
  event.respondWith(fetch(event.request));
});
