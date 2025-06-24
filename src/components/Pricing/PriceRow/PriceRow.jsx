// src/components/Pricing/PriceRow/PriceRow.jsx

import React from "react";
import styles from "./PriceRow.module.css";
import PriceCell from "@components/Pricing/PriceCell/PriceCell";

const PriceRow = ({ price, discounts }) => {
  const { name, price: pricePerDay, image } = price;

  // Функция расчёта со скидкой
  const calculateDiscountedPrice = (days, discountPercent) => {
    const originalPrice = pricePerDay * days;
    const discountedPrice = originalPrice * (1 - discountPercent / 100);
    return { original: originalPrice, discounted: discountedPrice };
  };

  const price20 = calculateDiscountedPrice(20, discounts[20]);
  const price24 = calculateDiscountedPrice(24, discounts[24]);
  const price28 = calculateDiscountedPrice(28, discounts[28]);

  return (
    <tr>
      <td className={styles.firstCell}>
        {/* Используем image напрямую, без дополнительных префиксов */}

        <span className={styles.mealLabel}>
          {" "}
          <img
            src={image}
            alt={`${name} kalorii`}
            className={styles.mealIcon}
          />
          {name} Kalorii
        </span>
      </td>

      <PriceCell price={pricePerDay} />

      <PriceCell price={price20.discounted} originalPrice={price20.original} />

      <PriceCell price={price24.discounted} originalPrice={price24.original} />

      <PriceCell price={price28.discounted} originalPrice={price28.original} />
    </tr>
  );
};

export default PriceRow;
