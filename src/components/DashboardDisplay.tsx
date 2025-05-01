"use client";

import React, { useState, ChangeEvent } from "react";
import Expandable from "./Expandable";
import LeaderboardTable from "./LeaderboardTable";
import MarketTable from "./MarketTable";
import type { Player, LeaderboardResponse, MarketResponse } from "@/utils/api";
import styles from "@/styles/components/DashboardDisplay.module.scss";

const INITIAL_VISIBLE_COUNT = 10;
const INCREMENT_COUNT = 10;

interface DashboardDisplayProps {
  leaderboardData: LeaderboardResponse | null;
  marketData: MarketResponse | null;
}

const DashboardDisplay: React.FC<DashboardDisplayProps> = ({
  leaderboardData,
  marketData,
}) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [searchTerm, setSearchTerm] = useState("");

  const allPlayers: Player[] = leaderboardData?.players || [];
  const filteredPlayers = allPlayers.filter((player) =>
    player.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalFilteredPlayers = filteredPlayers.length;
  const visiblePlayers = filteredPlayers.slice(0, visibleCount);
  const canShowMore = visibleCount < totalFilteredPlayers;

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + INCREMENT_COUNT, totalFilteredPlayers)
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <div className={styles.dashboardGrid}>
      <section>
        <Expandable title="Leaderboard" startCollapsed={true}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search username..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          {leaderboardData && visiblePlayers.length > 0 ? (
            <>
              <LeaderboardTable players={visiblePlayers} />
              {canShowMore && (
                <div className={styles.showMoreContainer}>
                  <button
                    onClick={handleShowMore}
                    className={styles.showMoreButton}
                  >
                    Show More ({totalFilteredPlayers - visibleCount} left)
                  </button>
                </div>
              )}
            </>
          ) : leaderboardData && filteredPlayers.length === 0 && searchTerm ? (
            <p className={styles.fallbackText}>
              No players found matching &apos;{searchTerm}&apos;.
            </p>
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
          {marketData && marketData.items && marketData.items.length > 0 ? (
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
