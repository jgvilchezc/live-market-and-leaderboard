"use client";

import React from "react";
import Expandable from "./Expandable";
import LeaderboardTable from "./LeaderboardTable";
import MarketTable from "./MarketTable";
// Import shared types from the utility file
import type { LeaderboardResponse, MarketResponse } from "@/utils/api";

// Remove local type definitions
// interface Player { ... }
// interface Item { ... }
// interface LeaderboardData { ... }
// interface MarketData { ... }

interface DashboardDisplayProps {
  // Use imported types for props
  leaderboardData: LeaderboardResponse | null;
  marketData: MarketResponse | null;
}

const DashboardDisplay: React.FC<DashboardDisplayProps> = ({
  leaderboardData,
  marketData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      <section>
        {/* Use Expandable, starts collapsed on mobile, always open on desktop */}
        <Expandable title="Leaderboard" startCollapsed={true}>
          {leaderboardData && leaderboardData.players ? (
            <LeaderboardTable players={leaderboardData.players} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {leaderboardData === null
                ? "Failed to load leaderboard data."
                : "No leaderboard data available."}
            </p>
          )}
        </Expandable>
      </section>

      <section>
        {/* Use Expandable, starts collapsed on mobile, always open on desktop */}
        <Expandable title="Market" startCollapsed={true}>
          {marketData && marketData.items ? (
            <MarketTable items={marketData.items} />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
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
