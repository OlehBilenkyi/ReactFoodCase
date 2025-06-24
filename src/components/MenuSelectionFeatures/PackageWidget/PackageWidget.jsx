// src/components/MenuSelectionFeatures/PackageWidget/PackageWidget.jsx
import React, { useState } from "react";
import DatePickerModal from "../DatePickerModal/DatePickerModal";
import MealCategorySection from "../MealCategorySection/MealCategorySection";
import styles from "./PackageWidget.module.css";

const PackageWidget = ({ index, data, onUpdate, onRemove, isFirst }) => {
  const [isDateModalOpen, setDateModalOpen] = useState(false);

  const handleDateSelect = (formattedDate) => {
    onUpdate(index, { ...data, date: formattedDate });
    setDateModalOpen(false);
  };

  const handleMealSelect = (category, mealObj) => {
    const newData = { ...data };
    if (!mealObj) {
      newData[category] = null;
    } else {
      newData[category] = mealObj;
    }
    onUpdate(index, newData);
  };

  return (
    <div className={styles.packageWidget}>
      {/* Шапка: «Pakiet #» и кнопка удаления (если не первый) */}
      <div className={styles.header}>
        <h3>Pakiet #{index + 1}</h3>
        {!isFirst && (
          <button
            className={styles.removeButton}
            onClick={() => onRemove(index)}
            title="Usuń ten pakiet"
          >
            &times;
          </button>
        )}
      </div>

      {/* Строка с кнопкой выбора даты */}
      <div className={styles.dateRow}>
        <button
          className={styles.dateButton}
          onClick={() => setDateModalOpen(true)}
        >
          {data.date ? `Data: ${data.date}` : "Wybierz datę"}
        </button>
      </div>

      {/* Если дата выбрана, показываем три секции выбора блюд */}
      {data.date && (
        <div className={styles.categoriesContainer}>
          <MealCategorySection
            category="sniad"
            title="Śniadania"
            initialSelection={
              data.sniad
                ? { id: data.sniad.id, weight: data.sniad.weight }
                : null
            }
            onSelect={(payload) => handleMealSelect("sniad", payload)}
          />
          <MealCategorySection
            category="obiad"
            title="Obiad"
            initialSelection={
              data.obiad
                ? { id: data.obiad.id, weight: data.obiad.weight }
                : null
            }
            onSelect={(payload) => handleMealSelect("obiad", payload)}
          />
          <MealCategorySection
            category="kolacja"
            title="Kolacja"
            initialSelection={
              data.kolacja
                ? { id: data.kolacja.id, weight: data.kolacja.weight }
                : null
            }
            onSelect={(payload) => handleMealSelect("kolacja", payload)}
          />
        </div>
      )}

      {/* Модальное окно выбора даты */}
      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setDateModalOpen(false)}
        onDateSelect={handleDateSelect}
        initialDate={data.date || null}
      />
    </div>
  );
};

export default React.memo(PackageWidget);
