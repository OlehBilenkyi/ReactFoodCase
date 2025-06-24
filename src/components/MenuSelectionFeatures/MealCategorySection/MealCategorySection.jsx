import React from "react";
import { useMealData } from "../../../hooks/MenuSelectionFeatures/useMealData";
import { useMealSelection } from "../../../hooks/MenuSelectionFeatures/useMealSelection";
import WeightSelectorWrapper from "./WeightSelectorWrapper";
import MealGrid from "./MealGrid";
import styles from "./MealCategorySection.module.css";

const MealCategorySection = ({
  category,
  title,
  onSelect,
  initialSelection,
}) => {
  const { weightOptions, allMeals } = useMealData(category);
  const { selectedWeight, selectedMeal, handleWeightClick, handleMealClick } =
    useMealSelection(allMeals, weightOptions, initialSelection, onSelect);

  return (
    <section className={styles.categorySection} data-category={category}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <WeightSelectorWrapper
        options={weightOptions}
        selectedWeight={selectedWeight}
        onWeightClick={handleWeightClick}
      />

      <MealGrid
        allMeals={allMeals}
        selectedWeight={selectedWeight}
        selectedMeal={selectedMeal}
        onMealClick={handleMealClick}
      />
    </section>
  );
};

export default MealCategorySection;
