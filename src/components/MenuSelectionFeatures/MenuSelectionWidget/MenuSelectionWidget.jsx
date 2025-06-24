// src/components/MenuSelectionFeatures/MenuSelectionWidget/MenuSelectionWidget.jsx
import React, { useState } from "react";
import DatePickerModal from "../DatePickerModal/DatePickerModal";
import MealCategorySection from "../MealCategorySection/MealCategorySection";
import styles from "./MenuSelectionWidget.module.css";

const MenuSelectionWidget = ({ onSelectionChange }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState({
    sniad: [],
    obiad: [],
    kolacja: [],
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(false);
  };

  const handleMealSelect = (category, meal) => {
    const updatedMeals = {
      ...selectedMeals,
      [category]: [...selectedMeals[category], meal],
    };
    setSelectedMeals(updatedMeals);
    onSelectionChange(updatedMeals);
  };

  return (
    <div className={styles.widget}>
      {/* Блок для кнопки «Wybierz datę dostawy» */}
      <div className={styles.dateSelection}>
        <button
          className={styles.dateButton}
          onClick={() => setIsModalOpen(true)}
        >
          {selectedDate || "Wybierz datę dostawy"}
        </button>
      </div>

      {selectedDate && (
        <>
          <MealCategorySection
            category="sniad"
            title="Śniadania"
            onSelect={(meal) => handleMealSelect("sniad", meal)}
          />
          <MealCategorySection
            category="obiad"
            title="Obiad"
            onSelect={(meal) => handleMealSelect("obiad", meal)}
          />
          <MealCategorySection
            category="kolacja"
            title="Kolacja"
            onSelect={(meal) => handleMealSelect("kolacja", meal)}
          />
        </>
      )}

      <DatePickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default MenuSelectionWidget;
