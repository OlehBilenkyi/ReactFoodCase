// src/components/MenuSelectionFeatures/StepsIndicator/StepsIndicator.jsx
import React from "react";
import styles from "./StepsIndicator.module.css";

const steps = [
  { number: 1, label: "Wybierz kaloryczność" },
  { number: 2, label: "Podaj dane dostawy" },
  { number: 3, label: "Podsumowania zamówienia" },
  { number: 4, label: "Płatność" },
];

const StepsIndicator = ({ currentStep = 1 }) => {
  return (
    <div className={styles.stepsLine}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.stepsLineItem} ${
            index < currentStep ? styles.active : ""
          }`}
        >
          <div className={styles.stepsLineNum}>{step.number}</div>
          <div className={styles.stepLabel}>{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;
