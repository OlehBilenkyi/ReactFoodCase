// src/components/MealItem/MealItem.jsx
import React from "react";
import styles from "./MealItem.module.css";

const MealItem = ({ meal, isSelected, isDisabled, onSelect }) => {
  const handleClick = () => {
    if (!isDisabled) onSelect();
  };

  return (
    <div
      className={[
        styles.mealItem,
        isSelected && styles.selected,
        isDisabled && styles.disabled,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClick}
    >
      <div className={styles.mealImage}>
        {/* meal.image теперь = "/meals/jajecznica.png" и тянется из public */}
        <img
          src={meal.image}
          alt={meal.name}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      <div className={styles.mealInfo}>
        <h3 className={styles.mealName}>{meal.name}</h3>
        <p className={styles.mealDescription}>{meal.description}</p>
        {isSelected && (
          <div className={styles.mealPrice}>
            {meal.price} zł ({meal.weight} g)
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MealItem);
