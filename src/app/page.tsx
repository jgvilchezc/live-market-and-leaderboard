import React from "react";
import DashboardDisplay from "@/components/DashboardDisplay";
// Removed api imports: import { getLeaderboardData, getMarketData } from "@/utils/api";
import pageStyles from "@/styles/pages/HomePage.module.scss";

export default async function Home() {
  return (
    <main className={pageStyles.mainContainer}>
      <h1 className={pageStyles.pageTitle}>Game Dashboard</h1>

      <DashboardDisplay />
    </main>
  );
}
