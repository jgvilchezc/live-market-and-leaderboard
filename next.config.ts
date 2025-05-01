import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const apiBaseUrl = "https://api-game.bloque.app/game/";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: new RegExp(`^${apiBaseUrl}.*`),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-game-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

const nextConfig: NextConfig = {};

export default (withPWA as (config: NextConfig) => NextConfig)(nextConfig);
