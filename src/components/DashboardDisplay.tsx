"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { io, Socket } from "socket.io-client";
import Expandable from "./Expandable";
import LeaderboardTable from "./LeaderboardTable";
import MarketTable from "./MarketTable";
import type { Player, LeaderboardResponse, MarketResponse } from "@/utils/api";
import styles from "@/styles/components/DashboardDisplay.module.scss";

const INITIAL_VISIBLE_COUNT = 10;
const INCREMENT_COUNT = 10;
const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

const DashboardDisplay = () => {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);
  const [marketData, setMarketData] = useState<MarketResponse | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Initialize socket connection
    const socket: Socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    socket.on("leaderboardUpdate", (data: LeaderboardResponse) => {
      console.log("Received leaderboard update:", data);
      setLeaderboardData(data);
      // Reset visibility/search when data updates? Optional.
      // setSearchTerm("");
      // setVisibleCount(INITIAL_VISIBLE_COUNT);
    });

    socket.on("marketUpdate", (data: MarketResponse) => {
      console.log("Received market update:", data);
      setMarketData(data);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      console.log("Socket disconnected on cleanup");
    };
  }, []);

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

          {!isConnected && (
            <p className={styles.fallbackText}>
              Connecting to real-time updates...
            </p>
          )}

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
          ) : !isConnected ? (
            <p className={styles.fallbackText}>Waiting for initial data...</p>
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
          {!isConnected && (
            <p className={styles.fallbackText}>
              Connecting to real-time updates...
            </p>
          )}

          {marketData && marketData.items && marketData.items.length > 0 ? (
            <MarketTable items={marketData.items} />
          ) : !isConnected ? (
            <p className={styles.fallbackText}>Waiting for initial data...</p>
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
