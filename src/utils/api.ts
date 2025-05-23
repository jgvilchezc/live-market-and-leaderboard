export interface Player {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
}

export interface Item {
  id: string;
  name: string;
  type: string;
  description: string;
  cost: number;
}

export interface LeaderboardResponse {
  players: Player[];
}

export interface MarketResponse {
  items: Item[];
}

export async function getLeaderboardData(): Promise<LeaderboardResponse | null> {
  const url = "https://api-game.bloque.app/game/leaderboard";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error fetching leaderboard! status: ${res.status}`);
    }
    return (await res.json()) as LeaderboardResponse;
  } catch (error) {
    console.error(`Error fetching leaderboard from ${url}:`, error);
    return null;
  }
}

export async function getMarketData(): Promise<MarketResponse | null> {
  const url = "https://api-game.bloque.app/game/market";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error fetching market! status: ${res.status}`);
    }
    return (await res.json()) as MarketResponse;
  } catch (error) {
    console.error(`Error fetching market from ${url}:`, error);
    return null;
  }
}
