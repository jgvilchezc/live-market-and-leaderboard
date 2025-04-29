import React from "react";
// Import the SCSS module
import styles from "@/styles/components/MarketTable.module.scss";
// Import the Item type
import type { Item } from "@/utils/api";

// Remove local Item interface definition
// interface Item { ... }

interface MarketTableProps {
  items: Item[];
}

const MarketTable: React.FC<MarketTableProps> = ({ items }) => {
  return (
    // Keep Tailwind for overall structure and responsiveness
    <div className="overflow-x-auto shadow-md rounded-lg">
      {/* Keep Tailwind for table structure */}
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {/* Use SCSS module for thead styling */}
        <thead className={styles.tableHeader}>
          <tr>
            {/* Use SCSS module for header cell styling */}
            <th scope="col" className={styles.headerCell}>
              Name
            </th>
            {/* <th scope="col" className={styles.headerCell}> Type </th> */}
            <th scope="col" className={styles.headerCell}>
              Description
            </th>
            <th scope="col" className={styles.headerCell}>
              Cost
            </th>
          </tr>
        </thead>
        {/* Keep Tailwind for tbody base styles (background, divide) */}
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {items.map((item) => (
            // Use SCSS module for row hover effect, keep key
            <tr key={item.id} className={styles.tableRow}>
              {/* Use SCSS module for specific cell styling */}
              <td className={styles.nameCell}>{item.name}</td>
              {/* <td className={styles.bodyCell}>{item.type}</td> */}
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
