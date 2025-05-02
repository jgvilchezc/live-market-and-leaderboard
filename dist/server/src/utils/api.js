"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboardData = getLeaderboardData;
exports.getMarketData = getMarketData;
async function getLeaderboardData() {
    const url = "https://api-game.bloque.app/game/leaderboard";
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error fetching leaderboard! status: ${res.status}`);
        }
        return (await res.json());
    }
    catch (error) {
        console.error(`Error fetching leaderboard from ${url}:`, error);
        return null;
    }
}
async function getMarketData() {
    const url = "https://api-game.bloque.app/game/market";
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error fetching market! status: ${res.status}`);
        }
        return (await res.json());
    }
    catch (error) {
        console.error(`Error fetching market from ${url}:`, error);
        return null;
    }
}
