import React from "react";
// Import the SCSS module
import styles from "@/styles/components/LeaderboardTable.module.scss";
// Import the Player type
import type { Player } from "@/utils/api";

interface LeaderboardTableProps {
  players: Player[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ players }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={styles.tableHeader}>
          <tr>
            <th scope="col" className={styles.headerCell}>
              Rank
            </th>
            <th scope="col" className={styles.headerCell}>
              Username
            </th>
            <th scope="col" className={styles.headerCell}>
              Level
            </th>
            <th scope="col" className={styles.headerCell}>
              XP
            </th>
            <th scope="col" className={styles.headerCell}>
              Gold
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {players.map((player) => (
            <tr key={player.username} className={styles.tableRow}>
              <td className={styles.rankCell}>{player.rank}</td>
              <td className={styles.usernameCell}>{player.username}</td>
              <td className={styles.levelCell}>{player.level}</td>
              <td className={styles.xpCell}>{player.xp}</td>
              <td className={styles.goldCell}>{player.gold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
