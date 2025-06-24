import React, { useState, useEffect } from "react";
import styles from "../../MenuSelectionFeatures/OrderTotal/OrderTotal.module.css";

export default React.memo(function OrderTotalPackage({
  packageCount,
  totalDays,
  discountAmount,
  totalPrice,
  currentStep,
  isStep1Valid,
  isStep2Valid,
  onNextStep,
  onPrevStep,
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // сброс галочки, если потерялась валидность текущего шага
  useEffect(() => {
    if (
      termsAccepted &&
      ((currentStep === 1 && !isStep1Valid) ||
        (currentStep === 2 && !isStep2Valid))
    ) {
      setTermsAccepted(false);
    }
  }, [currentStep, isStep1Valid, isStep2Valid, termsAccepted]);

  const handleNext = () => {
    if (!termsAccepted) return;
    onNextStep();
  };

  const handleProcessNext = () => {
    if (!termsAccepted || isProcessing) return;
    setIsProcessing(true);
    onNextStep();
  };

  const decl = (n) => {
    const d10 = n % 10,
      d100 = n % 100;
    if (d10 === 1 && d100 !== 11) return "pakiet";
    if ([2, 3, 4].includes(d10) && ![12, 13, 14].includes(d100))
      return "pakiety";
    return "pakietów";
  };

  return (
    <div className={styles.orderTotal}>
      <div className={styles.totalItem}>
        <b>Liczba pakietów:</b>
        <span>
          {packageCount} {decl(packageCount)}
        </span>
      </div>

      <div className={styles.totalItem}>
        <b>Ilość dni:</b>
        <span>{totalDays}</span>
      </div>

      {discountAmount > 0 && (
        <div className={styles.totalItem}>
          <b>Rabat:</b>
          <span>-{discountAmount.toFixed(2)} zł</span>
        </div>
      )}

      <div className={styles.totalItem}>
        <b>Razem do zapłaty:</b>
        <span className={styles.totalPrice}>{totalPrice.toFixed(2)} zł</span>
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
        <span>Akceptuję regulamin</span>
      </label>

      {currentStep === 1 && (
        <button
          className={`${styles.nextButton} ${
            !termsAccepted || !isStep1Valid ? styles.disabled : ""
          }`}
          onClick={handleNext}
          disabled={!termsAccepted || !isStep1Valid}
        >
          Podaj dane dostawy
        </button>
      )}

      {currentStep === 2 && (
        <button
          className={`${styles.nextButton} ${
            !termsAccepted || !isStep2Valid ? styles.disabled : ""
          }`}
          onClick={handleNext}
          disabled={!termsAccepted || !isStep2Valid}
        >
          Podsumowanie zamówienia
        </button>
      )}

      {currentStep === 3 && (
        <button
          className={`${styles.payButton} ${
            !termsAccepted || isProcessing ? styles.disabled : ""
          }`}
          onClick={handleProcessNext}
          disabled={!termsAccepted || isProcessing}
        >
          Przejdź do płatności
        </button>
      )}
    </div>
  );
});
