import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// API endpoint base URL (kept for reference, but not used in caching now)
// const apiBaseUrl = "https://api-game.bloque.app/game/";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {};

export default (withPWA as (config: NextConfig) => NextConfig)(nextConfig);
