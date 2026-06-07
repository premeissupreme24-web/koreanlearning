const CACHE_VERSION = "korean-learning-pwa-v18";
const CORE_CACHE = `${CACHE_VERSION}-core`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const CDN_CACHE = `${CACHE_VERSION}-cdn`;
const AUDIO_CACHE = `${CACHE_VERSION}-audio`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css?v=18",
  "./data/letters.js?v=18",
  "./data/strokes.js?v=18",
  "./data/pronunciationRules.js?v=18",
  "./data/quizItems.js?v=18",
  "./data/vocabulary.js?v=18",
  "./data/dialogues.js?v=18",
  "./data/grammarTrack.js?v=18",
  "./data/verbs.js?v=18",
  "./data/topikQuestions.js?v=18",
  "./data/curriculum.js?v=18",
  "./js/i18n.js?v=18",
  "./js/audio.js?v=18",
  "./js/progress.js?v=18",
  "./js/pointerUtils.js?v=18",
  "./js/handwritingStore.js?v=18",
  "./js/canvas.js?v=18",
  "./js/exerciseRenderer.js?v=18",
  "./js/quizEngine.js?v=18",
  "./js/copybook.js?v=18",
  "./js/app.js?v=18",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon-180.png"
];

const CDN_HOSTS = new Set([
  "cdn.tailwindcss.com",
  "cdnjs.cloudflare.com"
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("korean-learning-pwa-") && !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, CORE_CACHE, "./index.html"));
    return;
  }

  if (url.origin === self.location.origin) {
    if (url.pathname.includes("/audio/")) {
      event.respondWith(networkFirst(request, AUDIO_CACHE));
      return;
    }
    event.respondWith(cacheFirst(request, CORE_CACHE));
    return;
  }

  if (CDN_HOSTS.has(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, CDN_CACHE));
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && (response.ok || response.type === "opaque")) {
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName, fallbackUrl = null) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackUrl) return cache.match(fallbackUrl);
    throw new Error("Offline and no cached response available.");
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || network;
}
