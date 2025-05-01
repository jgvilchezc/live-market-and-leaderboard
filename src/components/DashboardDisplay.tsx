"use client";

import React from "react";
import Expandable from "./Expandable";
import LeaderboardTable from "./LeaderboardTable";
import MarketTable from "./MarketTable";
import type { LeaderboardResponse, MarketResponse } from "@/utils/api";
import styles from "@/styles/components/DashboardDisplay.module.scss";

interface DashboardDisplayProps {
  leaderboardData: LeaderboardResponse | null;
  marketData: MarketResponse | null;
}

const DashboardDisplay: React.FC<DashboardDisplayProps> = ({
  leaderboardData,
  marketData,
}) => {
  return (
    <div className={styles.dashboardGrid}>
      <section>
        <Expandable title="Leaderboard" startCollapsed={true}>
          {leaderboardData && leaderboardData.players ? (
            <LeaderboardTable players={leaderboardData.players} />
          ) : (
            <p className={styles.fallbackText}>
              {leaderboardData === null
                ? "Failed to load leaderboard data."
                : "No leaderboard data available."}
            </p>
          )}
        </Expandable>
      </section>

      <section>
        <Expandable title="Market" startCollapsed={true}>
          {marketData && marketData.items ? (
            <MarketTable items={marketData.items} />
          ) : (
            <p className={styles.fallbackText}>
              {marketData === null
                ? "Failed to load market data."
                : "No market data available."}
            </p>
          )}
        </Expandable>
      </section>
    </div>
  );
};

export default DashboardDisplay;
