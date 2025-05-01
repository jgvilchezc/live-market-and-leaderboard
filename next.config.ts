import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// API endpoint base URL (kept for reference, but not used in caching now)
// const apiBaseUrl = "https://api-game.bloque.app/game/";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // runtimeCaching: [ // <-- Comenta o elimina esta sección temporalmente
  //   {
  //     urlPattern: new RegExp(`^${apiBaseUrl}.*`),
  //     handler: "StaleWhileRevalidate",
  //     options: {
  //       cacheName: "api-game-cache",
  //       expiration: {
  //         maxEntries: 50,
  //         maxAgeSeconds: 60 * 60 * 24,
  //       },
  //       cacheableResponse: {
  //         statuses: [0, 200],
  //       },
  //     },
  //   },
  // ],
});

const nextConfig: NextConfig = {};

export default (withPWA as (config: NextConfig) => NextConfig)(nextConfig);
