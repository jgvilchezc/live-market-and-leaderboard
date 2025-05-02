"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const api_1 = require("@/utils/api");
const PORT = process.env.SOCKET_PORT || 3001;
const POLLING_INTERVAL_MS = 5000;
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
let leaderboardCache = null;
let marketCache = null;
let pollingInterval = null;
async function fetchData() {
    console.log("Fetching latest data from APIs...");
    try {
        const [leaderboardData, marketData] = await Promise.all([
            (0, api_1.getLeaderboardData)(),
            (0, api_1.getMarketData)(),
        ]);
        if (JSON.stringify(leaderboardData) !== JSON.stringify(leaderboardCache)) {
            leaderboardCache = leaderboardData;
            io.emit("leaderboardUpdate", leaderboardCache);
            console.log("Leaderboard data updated and emitted.");
        }
        if (JSON.stringify(marketData) !== JSON.stringify(marketCache)) {
            marketCache = marketData;
            io.emit("marketUpdate", marketCache);
            console.log("Market data updated and emitted.");
        }
    }
    catch (error) {
        console.error("Error fetching data during polling:", error);
    }
}
io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    if (leaderboardCache) {
        socket.emit("leaderboardUpdate", leaderboardCache);
    }
    if (marketCache) {
        socket.emit("marketUpdate", marketCache);
    }
    if (io.sockets.sockets.size === 1 && !pollingInterval) {
        console.log("First client connected, starting polling...");
        fetchData();
        pollingInterval = setInterval(fetchData, POLLING_INTERVAL_MS);
    }
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        if (io.sockets.sockets.size === 0 && pollingInterval) {
            console.log("Last client disconnected, stopping polling.");
            clearInterval(pollingInterval);
            pollingInterval = null;
        }
    });
});
httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
(async () => {
    try {
        console.log("Performing initial data fetch...");
        await fetchData();
        console.log("Initial data fetch completed.");
    }
    catch (error) {
        console.error("Error during initial data fetch:", error);
    }
})();
