"use client";

import type { Metadata } from "next";
import { useEffect } from "react";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import layoutStyles from "@/styles/layout/RootLayout.module.scss";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Game Dashboard",
  description: "Live Leaderboard and Market for the Game",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- Manual Service Worker Registration (for diagnosis) ---
  useEffect(() => {
    if (
      typeof window !== "undefined" && // Run only in browser
      "serviceWorker" in navigator && // Check browser support
      process.env.NODE_ENV === "production" // Only register in production
    ) {
      navigator.serviceWorker
        .register("/sw.js") // Attempt to register the SW
        .then((registration) => {
          console.log(
            "Service Worker registered successfully with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []); // Empty dependency array runs once on mount
  // --- End Manual Registration ---

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={layoutStyles.rootBody}>
        <ThemeProvider>
          <Toaster position="bottom-center" />
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggleButton />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
