// src/components/WeightSelector/WeightSelector.jsx
import React from "react";
import styles from "./WeightSelector.module.css";

/**
 * Чистый компонент «кнопки-выбора веса».
 *
 * Пропсы:
 *   - options: массив { weight, price }
 *   - selected: либо { weight, price }, либо null
 *   - onSelect: колбэк (option) => void
 */
const WeightSelector = ({ options, selected, onSelect }) => {
  return (
    <div className={styles.weightSelector}>
      <div className={styles.weightButtons}>
        {options.map((option, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.weightButton} ${
              selected?.weight === option.weight ? styles.active : ""
            }`}
            onClick={() => onSelect(option)}
          >
            {option.weight} g – {option.price} zł
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(WeightSelector);
