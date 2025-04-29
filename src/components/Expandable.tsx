"use client";

import React, { useState, ReactNode } from "react";

interface ExpandableProps {
  title: ReactNode;
  children: ReactNode;
  startCollapsed?: boolean; // Controls if it starts collapsed on mobile
}

const Expandable: React.FC<ExpandableProps> = ({
  title,
  children,
  startCollapsed = true, // Default to starting collapsed on mobile
}) => {
  // State to manage the collapsed/expanded view, primarily for mobile/tablet
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(!startCollapsed);

  return (
    // Use group utility for coordinating hover/focus states if needed later
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg mb-4 overflow-hidden shadow-sm">
      <button
        onClick={() => setIsManuallyExpanded(!isManuallyExpanded)}
        className="flex justify-between items-center w-full p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50"
        // aria-expanded reflects the state relevant for mobile/assistive tech
        aria-expanded={isManuallyExpanded}
        // Control which section is expanded on mobile using aria-controls (optional but good practice)
        // aria-controls={`expandable-content-${title?.toString()}`} // Needs unique ID generation if title isn't simple string
      >
        {/* Ensure title stays on one line if possible, truncate if necessary */}
        <h2 className="text-lg sm:text-xl font-semibold truncate pr-2">
          {title}
        </h2>
        {/* Toggle icon visible only on smaller screens */}
        <span className="text-xl sm:text-2xl ml-2 transition-transform duration-300 transform lg:hidden">
          {isManuallyExpanded ? "−" : "+"}{" "}
          {/* Using minus sign instead of hyphen */}
        </span>
        {/* Placeholder to maintain alignment on large screens where icon is hidden */}
        <span
          className="text-xl sm:text-2xl ml-2 hidden lg:inline"
          aria-hidden="true"
        ></span>
      </button>

      {/* Content Div:
                - Base: Transitions for smooth open/close. Max-height controls collapse/expand.
                - State Control: `max-h` and `opacity` change based on `isManuallyExpanded`.
                - Large Screens (`lg:`): Force display using `lg:max-h-none`, `lg:opacity-100`, `lg:overflow-visible`.
            */}
      <div
        // id={`expandable-content-${title?.toString()}`} // Corresponding ID for aria-controls
        className={`
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${
                      isManuallyExpanded
                        ? "max-h-[1500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }
                    lg:max-h-none lg:opacity-100 lg:overflow-visible
                `}
      >
        {/* Apply padding within the content div */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Expandable;
