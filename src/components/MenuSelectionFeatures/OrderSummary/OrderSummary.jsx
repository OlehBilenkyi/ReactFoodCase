// src/components/MenuSelectionFeatures/OrderSummary/OrderSummary.jsx
import React from "react";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({ order, onBack }) => {
  if (!order || !Array.isArray(order.packages) || !order.delivery) {
    return null;
  }

  const {
    email,
    phone,
    fullname,
    street,
    house_number,
    klatka,
    floor,
    apartment,
    gate_code,
    notes,
  } = order.delivery;

  return (
    <div className={styles.orderSummary}>
      {/* Кнопка редактирования */}
      <button className={styles.backButton} onClick={onBack}>
        Edytuj dane
      </button>
      {/* Заголовок */}
      <h2 className={styles.orSumH}>Podsumowanie zamówienia</h2>

      {/* Информация по пакетам */}
      <div className={styles.summarySection}>
        <h3>Informacje o zamówieniu</h3>
        {order.packages.map((pkg, idx) => {
          if (!pkg.date) return null;
          const meals = [];
          if (pkg.sniad) meals.push({ category: "Śniadanie", ...pkg.sniad });
          if (pkg.obiad) meals.push({ category: "Obiad", ...pkg.obiad });
          if (pkg.kolacja) meals.push({ category: "Kolacja", ...pkg.kolacja });
          if (meals.length === 0) return null;

          const dayTotal = meals
            .reduce((sum, m) => sum + m.price, 0)
            .toFixed(2);
          return (
            <div key={idx} className={styles.dateBlock}>
              <p className={styles.dateHeader}>
                <strong>Data: {pkg.date}</strong>
              </p>
              <div className={styles.mealsList}>
                {meals.map((meal, i) => (
                  <div key={i} className={styles.mealSummary}>
                    <span>
                      {meal.category}: {meal.name}
                    </span>
                    <span>
                      {meal.weight} g — {meal.price} zł
                    </span>
                  </div>
                ))}
              </div>
              <p>
                <strong>Razem za dzień: {dayTotal} zł</strong>
              </p>
              <hr />
            </div>
          );
        })}
      </div>

      {/* Данные доставки */}
      <div className={styles.summarySection}>
        <h3>Dane dostawy</h3>
        <div className={styles.deliveryDetails}>
          {/* Контактные данные */}
          <div className={styles.detailRow}>
            <strong>E-mail:</strong> {email}
          </div>
          <div className={styles.detailRow}>
            <strong>Telefon:</strong> {phone}
          </div>
          <div className={styles.detailRow}>
            <strong>Pełne imię i nazwisko:</strong> {fullname}
          </div>

          <hr />

          {/* Адрес: сначала улица, затем дом */}
          <div className={styles.detailRow}>
            <strong>Ulica:</strong> {street}
          </div>
          <div className={styles.detailRow}>
            <strong>Dom:</strong> {house_number}
          </div>

          {/* Дополнительные поля */}
          {klatka && (
            <div className={styles.detailRow}>
              <strong>Klatka:</strong> {klatka}
            </div>
          )}
          <div className={styles.detailRow}>
            <strong>Piętro:</strong> {floor}
          </div>
          <div className={styles.detailRow}>
            <strong>Mieszkanie:</strong> {apartment}
          </div>
          <div className={styles.detailRow}>
            <strong>Kod do klatki:</strong> {gate_code}
          </div>

          {notes && (
            <>
              <hr />
              <div className={styles.detailRow}>
                <strong>Uwagi:</strong> {notes}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Итог */}
      <div className={styles.summaryTotal}>
        <strong>Razem do zapłaty:</strong> {order.total.toFixed(2)} zł
      </div>
    </div>
  );
};

export default OrderSummary;
