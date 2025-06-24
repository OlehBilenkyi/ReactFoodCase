import React, { useState, useEffect } from "react";
import styles from "./OrderTotal.module.css";

export default function OrderTotal({
  order = {},
  currentStep,
  onNextStep,
  onPrevStep,
  isStep1Valid,
  isStep2Valid, // <-- принимаем
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Если потеряли валидность шага 1 или 2 — сбрасываем чекбокс
  useEffect(() => {
    if (
      termsAccepted &&
      ((currentStep === 1 && !isStep1Valid) ||
        (currentStep === 2 && !isStep2Valid))
    ) {
      setTermsAccepted(false);
    }
  }, [currentStep, isStep1Valid, isStep2Valid, termsAccepted]);

  const meals = Array.isArray(order.selectedMeals) ? order.selectedMeals : [];
  const dates = Array.isArray(order.selectedDates) ? order.selectedDates : [];
  const total = meals.reduce((sum, m) => sum + (m.price || 0), 0);

  const handleNext = () => {
    // на шаге 2 блокируем, если форма не валидна
    if (!termsAccepted) return;
    onNextStep();
  };

  const handlePay = () => {
    if (!termsAccepted) return;
    setIsProcessing(true);
    onNextStep();
  };

  return (
    <div className={styles.orderTotal}>
      <div className={styles.totalItem}>
        <b>Wybrane daty:</b> <span>{dates.length}</span>
      </div>
      <div className={styles.totalItem}>
        <b>Liczba dań:</b> <span>{meals.length}</span>
      </div>
      <div className={styles.totalItem}>
        <b>Razem do zapłaty:</b>{" "}
        <span className={styles.totalPrice}>{total.toFixed(2)} zł</span>
      </div>

      <label className={styles.termsCheckbox}>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          disabled={
            (currentStep === 1 && !isStep1Valid) ||
            (currentStep === 2 && !isStep2Valid)
          }
        />
        <span>Zapoznałem się z regulaminem</span>
      </label>

      {currentStep === 1 && (
        <button
          className={`${styles.nextButton} ${
            (!termsAccepted || !isStep1Valid) && styles.disabled
          }`}
          onClick={handleNext}
          disabled={!termsAccepted || !isStep1Valid}
        >
          Podaj adres dostawy
        </button>
      )}

      {currentStep === 2 && (
        <button
          className={`${styles.nextButton} ${
            (!termsAccepted || !isStep2Valid) && styles.disabled
          }`}
          onClick={handleNext}
          disabled={!termsAccepted || !isStep2Valid}
        >
          Podsumowania zamówienia
        </button>
      )}

      {currentStep === 3 && (
        <button
          className={`${styles.payButton} ${
            (!termsAccepted || isProcessing) && styles.disabled
          }`}
          onClick={handlePay}
          disabled={!termsAccepted || isProcessing}
        >
          Płatność
        </button>
      )}
    </div>
  );
}
