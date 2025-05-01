import React from "react";
import styles from "@/styles/components/MarketTable.module.scss";
import type { Item } from "@/utils/api";

interface MarketTableProps {
  items: Item[];
}

const MarketTable: React.FC<MarketTableProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className={styles.tableHeader}>
          <tr>
            <th scope="col" className={styles.headerCell}>
              Name
            </th>
            <th scope="col" className={styles.headerCell}>
              Description
            </th>
            <th scope="col" className={styles.headerCell}>
              Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {items.map((item) => (
            <tr key={item.id} className={styles.tableRow}>
              <td className={styles.nameCell}>{item.name}</td>
              <td className={styles.descriptionCell}>{item.description}</td>
              <td className={styles.costCell}>{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
