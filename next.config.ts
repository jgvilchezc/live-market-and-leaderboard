import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

// API endpoint base URL (kept for reference, but not used in caching now)
// const apiBaseUrl = "https://api-game.bloque.app/game/";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Add buildExcludes to prevent specific files from being precached
  buildExcludes: [
    // Exclude the problematic manifest file
    /_next\/app-build-manifest\.json$/i,
    // You might need regex for other problematic internal files if they appear
    // Example: /_next\/some-other-internal-file\.js$/i
  ],
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
