import React from "react";
import DashboardDisplay from "@/components/DashboardDisplay";
import { getLeaderboardData, getMarketData } from "@/utils/api";
import pageStyles from "@/styles/pages/HomePage.module.scss";

export default async function Home() {
  const [initialLeaderboardData, initialMarketData] = await Promise.all([
    getLeaderboardData(),
    getMarketData(),
  ]);

  return (
    <main className={pageStyles.mainContainer}>
      <h1 className={pageStyles.pageTitle}>Game Dashboard</h1>

      <DashboardDisplay
        initialLeaderboardData={initialLeaderboardData}
        initialMarketData={initialMarketData}
      />
    </main>
  );
}
