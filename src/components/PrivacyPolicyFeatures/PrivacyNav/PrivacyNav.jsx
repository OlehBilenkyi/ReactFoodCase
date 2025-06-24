import React from "react";
import styles from "./PrivacyNav.module.css";

const navItems = [
  { id: "1", text: "Informacje osobiste, które zbieramy" },
  { id: "2", text: "Dlaczego przetwarzamy Twoje dane?" },
  { id: "3", text: "Twoje prawa" },
  { id: "4", text: "Linki do innych stron internetowych" },
  { id: "5", text: "Bezpieczeństwo informacji" },
  { id: "6", text: "Ujawnienie prawne" },
  { id: "7", text: "Dane kontaktowe" },
  { id: "8", text: "Informacja o plikach cookie" },
];

const PrivacyNav = () => (
  <nav className={styles.nav}>
    <ul className={styles.list}>
      {navItems.map((item) => (
        <li key={item.id} className={styles.item}>
          <a href={`#${item.id}`} className={styles.link}>
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default PrivacyNav;
