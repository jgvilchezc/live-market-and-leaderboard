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

interface DashboardDisplayProps {
  initialLeaderboardData: LeaderboardResponse | null;
  initialMarketData: MarketResponse | null;
}

const DashboardDisplay: React.FC<DashboardDisplayProps> = ({
  initialLeaderboardData,
  initialMarketData,
}) => {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(initialLeaderboardData);
  const [marketData, setMarketData] = useState<MarketResponse | null>(
    initialMarketData
  );
  const [isConnected, setIsConnected] = useState(false);
  const [attemptedConnection, setAttemptedConnection] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let socket: Socket | null = null;

    if (typeof window !== "undefined" && navigator.onLine) {
      console.log("Attempting to connect to Socket.IO server...");
      setAttemptedConnection(true);
      socket = io(SOCKET_SERVER_URL, {});

      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        setIsConnected(true);
      });

      socket.on("connect_error", (err) => {
        console.warn("Socket connection error:", err.message);
        setIsConnected(false);
        socket?.disconnect();
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
        setIsConnected(false);
      });

      socket.on("leaderboardUpdate", (data: LeaderboardResponse) => {
        console.log("Received leaderboard update:", data);
        setLeaderboardData(data);
      });

      socket.on("marketUpdate", (data: MarketResponse) => {
        console.log("Received market update:", data);
        setMarketData(data);
      });
    } else {
      console.log("Offline or SSR, skipping socket connection attempt.");
    }
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected on cleanup");
      }
    };
  }, []);

  const showConnectingMessage =
    attemptedConnection && !isConnected && navigator.onLine;
  const hasLeaderboardData =
    leaderboardData && leaderboardData.players.length > 0;
  const hasMarketData = marketData && marketData.items.length > 0;

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

          {showConnectingMessage && (
            <p className={styles.fallbackText}>
              Connecting to real-time updates...
            </p>
          )}

          {hasLeaderboardData ? (
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
          ) : showConnectingMessage ? (
            <p className={styles.fallbackText}>
              Waiting for initial real-time data...
            </p>
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
          {showConnectingMessage && (
            <p className={styles.fallbackText}>
              Connecting to real-time updates...
            </p>
          )}

          {hasMarketData ? (
            <MarketTable items={marketData.items} />
          ) : showConnectingMessage ? (
            <p className={styles.fallbackText}>
              Waiting for initial real-time data...
            </p>
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
