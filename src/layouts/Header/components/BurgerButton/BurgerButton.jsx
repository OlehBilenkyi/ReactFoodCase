import React from "react";
import styles from "./BurgerButton.module.css";

/**
 * @param {boolean} isOpen  — состояние меню
 * @param {() => void} onClick — колбэк переключения
 */
export default function BurgerButton({ isOpen, onClick }) {
  return (
    <button
      className={`${styles.burgerButton} ${isOpen ? styles.open : ""}`}
      onClick={onClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
    >
      <span className={styles.line} />
      <span className={styles.line} />
      <span className={styles.line} />
    </button>
  );
}
