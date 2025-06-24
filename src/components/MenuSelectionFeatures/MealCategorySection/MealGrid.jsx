import React from "react";
import MealItem from "../MealItem/MealItem";
import styles from "./MealCategorySection.module.css";

const MealGrid = ({ allMeals, selectedWeight, selectedMeal, onMealClick }) => {
  return (
    <div className={styles.mealGrid}>
      {allMeals.map((meal) => {
        const isThisSelected = selectedMeal?.id === meal.id;
        const disabled = !selectedWeight;

        return (
          <MealItem
            key={meal.id}
            meal={{
              ...meal,
              price: meal.priceBase,
              weight: selectedWeight?.weight || 0,
            }}
            isSelected={isThisSelected}
            isDisabled={disabled}
            onSelect={() => onMealClick(meal)}
          />
        );
      })}
    </div>
  );
};

export default MealGrid;
