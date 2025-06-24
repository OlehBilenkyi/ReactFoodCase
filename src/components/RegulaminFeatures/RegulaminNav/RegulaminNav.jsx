import React from "react";
import styles from "./RegulaminNav.module.css";

const RegulaminNav = ({ items }) => (
  <nav className={styles.navContainer} aria-label="Nawigacja regulaminu">
    <h2 className={styles.navTitle}>Spis treści</h2>
    <ul className={styles.navList}>
      {items.map((item) => (
        <li key={item.id} className={styles.navItem}>
          <a
            href={`#${item.id}`}
            className={styles.navLink}
            aria-label={`Przejdź do sekcji ${item.text}`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default RegulaminNav;
