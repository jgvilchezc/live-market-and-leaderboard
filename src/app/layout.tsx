import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import layoutStyles from "@/styles/layout/RootLayout.module.scss";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

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
          <ServiceWorkerRegistrar />
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggleButton />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
