// src/components/MenuSelectionFeatures/PackageWidget/PackageWidget.jsx
import React, { useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import pl from "air-datepicker/locale/pl";
import "air-datepicker/air-datepicker.css";

import MealCategorySection from "../MealCategorySection/MealCategorySection";
import styles from "./PackageWidget.module.css";

const PackageWidget = ({ index, data, onUpdate, onRemove, isFirst }) => {
  const pickerRef = useRef(null);
  const dpRef = useRef(null);

  // Инициализируем календарь один раз
  useEffect(() => {
    if (pickerRef.current && !dpRef.current) {
      dpRef.current = new AirDatepicker(pickerRef.current, {
        inline: true,
        locale: pl,
        minDate: new Date(),
        onSelect({ date }) {
          const formattedDate = date?.toLocaleDateString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });

          if (formattedDate) {
            onUpdate(index, { ...data, date: formattedDate });
          }
        },
      });

      // Установим дату из данных, если она уже есть
      if (data.date) {
        const [dd, mm, yyyy] = data.date.split(".");
        const jsDate = new Date(`${yyyy}-${mm}-${dd}`);
        if (!isNaN(jsDate)) {
          dpRef.current.selectDate(jsDate);
        }
      }
    }

    // Очистка
    return () => {
      if (dpRef.current) {
        dpRef.current.destroy();
        dpRef.current = null;
      }
    };
  }, [data.date, index, onUpdate]);

  const handleMealSelect = (category, mealObj) => {
    const newData = { ...data, [category]: mealObj || null };
    onUpdate(index, newData);
  };

  return (
    <div className={styles.packageWidget}>
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

      {/* Календарь прямо на странице */}
      <div className={styles.dateRow}>
        <div ref={pickerRef} className={styles.datepicker} />
      </div>

      {/* Блюда — всегда отображаются */}
      <div className={styles.categoriesContainer}>
        <MealCategorySection
          category="sniad"
          title="Śniadania"
          initialSelection={
            data.sniad ? { id: data.sniad.id, weight: data.sniad.weight } : null
          }
          onSelect={(payload) => handleMealSelect("sniad", payload)}
        />
        <MealCategorySection
          category="obiad"
          title="Obiad"
          initialSelection={
            data.obiad ? { id: data.obiad.id, weight: data.obiad.weight } : null
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
    </div>
  );
};

export default React.memo(PackageWidget);
