"use client";

import { useEffect } from "react";

const ServiceWorkerRegistrar: React.FC = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Manual SW registration successful with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Manual SW registration failed:", error);
        });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistrar;
