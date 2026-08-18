// ============================================================
// RuchiRush — Service Worker (sw.js)
// Handles caching for PWA / offline support
// ============================================================

const CACHE_NAME = "ruchirush-v2";
const CACHE_VERSION = "1.0.0";

// Files to cache immediately on install
const STATIC_ASSETS = [
    "/",
    "/site.webmanifest",
    "/favicon.ico",
];

// ── Install: cache static assets ─────────────────────────────
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// ── Activate: clear old caches ───────────────────────────────
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

// ── Fetch: network-first for HTML, cache-first for assets ────
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and cross-origin requests
    if (request.method !== "GET" || url.origin !== location.origin) return;

    // HTML pages → network first, fallback to cache
    if (request.headers.get("accept")?.includes("text/html")) {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return res;
                })
                .catch(() => caches.match(request).then((r) => r || caches.match("/")))
        );
        return;
    }

    // Static assets (fonts, images, scripts) → cache first, then network
    event.respondWith(
        caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((res) => {
                if (res.ok) {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                }
                return res;
            });
        })
    );
});