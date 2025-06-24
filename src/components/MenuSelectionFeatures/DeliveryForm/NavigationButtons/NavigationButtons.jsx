import React from "react";
import styles from "./NavigationButtons.module.css";

const NavigationButtons = ({ onBack, onNext }) => (
  <div className={styles.buttons}>
    <button type="button" className={styles.btn} onClick={onBack}>
      Wstecz
    </button>
    <button type="submit" className={styles.btn} onClick={onNext}>
      Dalej
    </button>
  </div>
);

export default NavigationButtons;
