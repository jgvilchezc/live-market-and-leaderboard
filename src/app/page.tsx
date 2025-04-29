import React from "react";
import DashboardDisplay from "@/components/DashboardDisplay";
import { getLeaderboardData, getMarketData } from "@/utils/api";

export default async function Home() {
  const [leaderboardData, marketData] = await Promise.all([
    getLeaderboardData(),
    getMarketData(),
  ]);

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800 dark:text-gray-100">
        Game Dashboard
      </h1>

      <DashboardDisplay
        leaderboardData={leaderboardData}
        marketData={marketData}
      />
    </main>
  );
}
