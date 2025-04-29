import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // add more options here
});

const nextConfig: NextConfig = {
  /* config options here */
};

// Cast withPWA to a function accepting NextConfig and returning NextConfig
export default (withPWA as (config: NextConfig) => NextConfig)(nextConfig);
