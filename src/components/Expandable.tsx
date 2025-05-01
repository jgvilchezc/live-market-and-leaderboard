"use client";

import React, { useState, ReactNode } from "react";
import styles from "@/styles/components/Expandable.module.scss";

interface ExpandableProps {
  title: ReactNode;
  children: ReactNode;
  startCollapsed?: boolean;
}

const Expandable: React.FC<ExpandableProps> = ({
  title,
  children,
  startCollapsed = true,
}) => {
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(!startCollapsed);

  const contentWrapperClasses = `
    ${styles.contentWrapperBase}
    ${isManuallyExpanded ? styles.contentWrapperExpanded : ""}
  `;

  return (
    <div className={styles.expandableContainer}>
      <button
        onClick={() => setIsManuallyExpanded(!isManuallyExpanded)}
        className={styles.expandableButton}
        aria-expanded={isManuallyExpanded}
      >
        <h2 className={styles.expandableTitle}>{title}</h2>
        <span
          className={`${styles.toggleIcon} ${
            isManuallyExpanded ? styles.expanded : ""
          }`}
        >
          {isManuallyExpanded ? "−" : "+"}
        </span>
        <span className={styles.iconPlaceholder} aria-hidden="true"></span>
      </button>

      <div className={contentWrapperClasses}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
};

export default Expandable;
