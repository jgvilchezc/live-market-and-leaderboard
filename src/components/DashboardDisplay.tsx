"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Expandable from "./Expandable";
import LeaderboardTable from "./LeaderboardTable";
import MarketTable from "./MarketTable";
import type { Player, LeaderboardResponse, MarketResponse } from "@/utils/api";
import { getLeaderboardData, getMarketData } from "@/utils/api";
import styles from "@/styles/components/DashboardDisplay.module.scss";
import toast from "react-hot-toast";

const INITIAL_VISIBLE_COUNT = 10;
const INCREMENT_COUNT = 10;

const LEADERBOARD_CACHE_KEY = "leaderboardDataCache";
const MARKET_CACHE_KEY = "marketDataCache";

const DashboardDisplay: React.FC = () => {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);
  const [marketData, setMarketData] = useState<MarketResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineData, setIsOfflineData] = useState(false);

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    let cachedLeaderboard: LeaderboardResponse | null = null;
    let cachedMarket: MarketResponse | null = null;

    try {
      const leaderboardCache = localStorage.getItem(LEADERBOARD_CACHE_KEY);
      if (leaderboardCache) {
        cachedLeaderboard = JSON.parse(leaderboardCache);
        if (isMounted) setLeaderboardData(cachedLeaderboard);
      }
      const marketCache = localStorage.getItem(MARKET_CACHE_KEY);
      if (marketCache) {
        cachedMarket = JSON.parse(marketCache);
        if (isMounted) setMarketData(cachedMarket);
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
      localStorage.removeItem(LEADERBOARD_CACHE_KEY);
      localStorage.removeItem(MARKET_CACHE_KEY);
    }

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);
      if (isMounted) setIsOfflineData(false);
      let fetchError = null;

      try {
        const [freshLeaderboard, freshMarket] = await Promise.all([
          getLeaderboardData(),
          getMarketData(),
        ]);

        if (isMounted) {
          if (freshLeaderboard) {
            setLeaderboardData(freshLeaderboard);
            try {
              localStorage.setItem(
                LEADERBOARD_CACHE_KEY,
                JSON.stringify(freshLeaderboard)
              );
            } catch (e) {
              console.error("Error writing leaderboard to localStorage", e);
            }
          } else {
            if (!cachedLeaderboard)
              fetchError = "Failed to load leaderboard data.";
            else setIsOfflineData(true);
          }

          if (freshMarket) {
            setMarketData(freshMarket);
            try {
              localStorage.setItem(
                MARKET_CACHE_KEY,
                JSON.stringify(freshMarket)
              );
            } catch (e) {
              console.error("Error writing market to localStorage", e);
            }
          } else {
            if (!cachedMarket) {
              const marketError = "Failed to load market data.";
              fetchError = fetchError
                ? `${fetchError} ${marketError}`
                : marketError;
            } else setIsOfflineData(true);
          }

          if (
            !freshLeaderboard &&
            !freshMarket &&
            (cachedLeaderboard || cachedMarket)
          ) {
            setIsOfflineData(true);
          }

          setError(fetchError);
        }
      } catch (e: unknown) {
        console.error("Error fetching data", e);
        if (isMounted) {
          if (!cachedLeaderboard && !cachedMarket) {
            const errorMessage =
              e instanceof Error
                ? e.message
                : "An unexpected error occurred while fetching data.";
            setError(errorMessage);
          } else {
            setIsOfflineData(true);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isOfflineData) {
      toast.error("Offline: Showing last available data.", {
        duration: 5000,
        id: "offline-toast",
      });
    }
  }, [isOfflineData]);

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

  if (isLoading && !leaderboardData && !marketData) {
    return <p className={styles.fallbackText}>Loading dashboard...</p>;
  }

  if (error) {
    return <p className={styles.fallbackText}>{error}</p>;
  }

  return (
    <div className={styles.dashboardGrid}>
      <section>
        <Expandable title={`Leaderboard`} startCollapsed={true}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search username..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          {visiblePlayers.length > 0 ? (
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
          ) : searchTerm ? (
            <p className={styles.fallbackText}>
              No players found matching &apos;{searchTerm}&apos;.
            </p>
          ) : (
            <p className={styles.fallbackText}>
              No leaderboard data available.
            </p>
          )}
        </Expandable>
      </section>

      <section>
        <Expandable title={`Market`} startCollapsed={true}>
          {marketData && marketData.items && marketData.items.length > 0 ? (
            <MarketTable items={marketData.items} />
          ) : (
            <p className={styles.fallbackText}>No market data available.</p>
          )}
        </Expandable>
      </section>
    </div>
  );
};

export default DashboardDisplay;
