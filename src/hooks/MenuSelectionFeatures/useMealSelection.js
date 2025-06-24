// src/hooks/useMealSelection.js
import { useState, useEffect, useCallback } from "react";

/**
 * Хук useMealSelection отвечает за:
 * 1) Хранение локальных состояний selectedWeight и selectedMeal.
 * 2) Синхронизацию их со значениями initialSelection (если пакет уже был заполнен).
 * 3) Генерацию правильного payload и вызова onSelect(payload).
 *
 * Параметры:
 *   - allMeals: массив объектов { id, name, description, priceBase, image }.
 *   - weightOptions: массив объектов { weight, price }.
 *   - initialSelection: либо null, либо объект вида { id, weight, name, description, price }.
 *   - onSelect: колбэк, который хотим вызывать, когда пользователь выбрал новое блюдо.
 */
export function useMealSelection(
  allMeals,
  weightOptions,
  initialSelection,
  onSelect
) {
  const [selectedWeight, setSelectedWeight] = useState(() => {
    if (initialSelection?.weight) {
      return (
        weightOptions.find((w) => w.weight === initialSelection.weight) || null
      );
    }
    return null;
  });

  const [selectedMeal, setSelectedMeal] = useState(() => {
    if (initialSelection?.id) {
      return allMeals.find((m) => m.id === initialSelection.id) || null;
    }
    return null;
  });

  // Синхронизация, если initialSelection или сам allMeals/weightOptions меняются.
  useEffect(() => {
    if (initialSelection) {
      const w =
        weightOptions.find((w) => w.weight === initialSelection.weight) || null;
      const m = allMeals.find((m) => m.id === initialSelection.id) || null;
      setSelectedWeight(w);
      setSelectedMeal(m);
    } else {
      setSelectedWeight(null);
      setSelectedMeal(null);
    }
  }, [initialSelection, allMeals, weightOptions]);

  // Обработчик клика по опции веса
  const handleWeightClick = useCallback(
    (option) => {
      if (selectedWeight?.weight === option.weight) {
        // если клик по уже выбранному весу — сбросить
        setSelectedWeight(null);
        if (selectedMeal) {
          setSelectedMeal(null);
          onSelect(null);
        }
      } else {
        // иначе — выбрать новый вес, и сбросить текущее блюдо
        setSelectedWeight(option);
        if (selectedMeal) {
          setSelectedMeal(null);
          onSelect(null);
        }
      }
    },
    [selectedMeal, selectedWeight, onSelect]
  );

  // Обработчик клика по конкретному блюду
  const handleMealClick = useCallback(
    (meal) => {
      if (!selectedWeight) {
        // нельзя выбрать блюдо без выбранного веса
        return;
      }

      if (selectedMeal?.id === meal.id) {
        // повторный клик по тому же блюду → сброс всего
        setSelectedMeal(null);
        setSelectedWeight(null);
        onSelect(null);
      } else {
        // выбрали новое блюдо с уже выбранным весом
        setSelectedMeal(meal);
        const payload = {
          id: meal.id,
          name: meal.name,
          description: meal.description,
          weight: selectedWeight.weight,
          price: selectedWeight.price,
        };
        onSelect(payload);
      }
    },
    [selectedMeal, selectedWeight, onSelect]
  );

  return {
    selectedWeight,
    selectedMeal,
    handleWeightClick,
    handleMealClick,
  };
}
