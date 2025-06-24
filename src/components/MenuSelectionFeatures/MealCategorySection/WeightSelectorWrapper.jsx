import React from "react";
import WeightSelector from "../WeightSelector/WeightSelector";
import styles from "./MealCategorySection.module.css";

const WeightSelectorWrapper = ({ options, selectedWeight, onWeightClick }) => {
  return (
    <div className={styles.weightWrapper}>
      <h4 className={styles.selectorTitle}>Zważ wagę</h4>
      <WeightSelector
        options={options}
        selected={selectedWeight}
        onSelect={onWeightClick}
      />
    </div>
  );
};

export default WeightSelectorWrapper;
