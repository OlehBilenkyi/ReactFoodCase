// src/hooks/useMealData.js
import { useMemo } from "react";
import { mealData } from "../../data/mealData.js";

/**
 * Хук useMealData принимает параметр `category` (строка: "sniad" | "obiad" | "kolacja"),
 * обращается к нашей «имитации сервера» mealData и возвращает объект
 * { weightOptions, allMeals }.
 *
 * Благодаря useMemo, при одинаковом category хуки не пересчитываются,
 * и мы получаем стабильные массивы.
 */
export function useMealData(category) {
  const result = useMemo(() => {
    if (mealData.hasOwnProperty(category)) {
      return {
        weightOptions: mealData[category].weightOptions,
        allMeals: mealData[category].allMeals,
      };
    }
    return { weightOptions: [], allMeals: [] };
  }, [category]);

  return result;
}
