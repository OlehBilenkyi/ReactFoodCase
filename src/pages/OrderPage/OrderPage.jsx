import React, { useState, useCallback, useMemo, useEffect } from "react";
import styles from "./OrderPage.module.css";
import {
  ModalProvider,
  PackageSelection,
  OrderTotalPackage,
  StandardOrderSummary,
} from "../../components/OrderFeatures";
import DeliveryDetailsForm from "../../components/MenuSelectionFeatures/DeliveryForm/DeliveryDetailsForm/DeliveryDetailsForm";
import StepsIndicator from "../../components/MenuSelectionFeatures/StepsIndicator/StepsIndicator";
import ChangeOrderButton from "../../components/MenuSelectionFeatures/DeliveryForm/ChangeOrderButton/ChangeOrderButton";

const emptyDelivery = {
  email: "",
  phone: "",
  fullname: "",
  street: "",
  house_number: "",
  klatka: "",
  floor: "",
  apartment: "",
  gate_code: "",
  notes: "",
};

export default function OrderPage() {
  // Шаги 1–3
  const [currentStep, setCurrentStep] = useState(1);
  const [orderState, setOrderState] = useState({
    packages: [], // [{ packageData, dates, days, originalPrice, price, discountPercent }, ...]
    delivery: {}, // { email, phone, ... }
  });
  const [deliveryData, setDeliveryData] = useState(emptyDelivery);

  // Когда заходим на шаг 2, подтягиваем ранее сохранённые данные:
  useEffect(() => {
    if (currentStep === 2) {
      setDeliveryData({ ...emptyDelivery, ...orderState.delivery });
    }
  }, [currentStep, orderState.delivery]);

  // === Шаг 1: выбор пакетов ===
  const handlePackageUpdate = useCallback((packages) => {
    setOrderState((s) => ({ ...s, packages }));
  }, []);
  const isStep1Valid = useMemo(() => {
    return (
      orderState.packages.length > 0 &&
      orderState.packages.every(
        (p) => Array.isArray(p.dates) && p.dates.length > 0
      )
    );
  }, [orderState.packages]);

  // === Шаг 2: форма доставки ===
  const handleDeliveryChange = useCallback((name, value) => {
    setDeliveryData((d) => ({ ...d, [name]: value }));
  }, []);
  const isStep2Valid = useMemo(() => {
    const req = [
      "email",
      "phone",
      "fullname",
      "street",
      "house_number",
      "floor",
      "apartment",
      "gate_code",
    ];
    return req.every((k) => deliveryData[k]?.toString().trim().length > 0);
  }, [deliveryData]);
  const handleDeliverySubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!isStep2Valid) return;
      // сохраняем форму и переходим на шаг 3
      setOrderState((s) => ({ ...s, delivery: deliveryData }));
      setCurrentStep(3);
    },
    [deliveryData, isStep2Valid]
  );

  // === Итоги для сайдбара ===
  const { totalDays, subtotal, discountAmount, totalPrice } = useMemo(() => {
    const days = orderState.packages.reduce((s, p) => s + (p.days || 0), 0);
    const sub = orderState.packages.reduce(
      (s, p) => s + (p.originalPrice || 0),
      0
    );
    const disc = orderState.packages.reduce(
      (s, p) => s + ((p.discountPercent || 0) * (p.originalPrice || 0)) / 100,
      0
    );
    return {
      totalDays: days,
      subtotal: sub,
      discountAmount: disc,
      totalPrice: sub - disc,
    };
  }, [orderState.packages]);

  // === Навигация ===
  const goNext = useCallback(() => {
    if (currentStep === 1 && !isStep1Valid) return;
    if (currentStep === 2 && !isStep2Valid) return;
    // при переходе со 2 на 3 — сохраняем deliveryData
    if (currentStep === 2) {
      setOrderState((s) => ({ ...s, delivery: deliveryData }));
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
  }, [currentStep, isStep1Valid, isStep2Valid, deliveryData]);
  const goPrev = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  return (
    <ModalProvider>
      <div className={styles.orderPage}>
        <main className={styles.pageMain}>
          <div className={`${styles.container} ${styles.orderContainer}`}>
            <h1 className={styles.pageTitle}>Złóż zamówienie</h1>
            <StepsIndicator currentStep={currentStep} />

            <div className={styles.contentGrid}>
              {/* левая колонка */}
              <div className={styles.mainColumn}>
                {/* Шаг 1 */}
                <div className={currentStep === 1 ? "" : styles.hidden}>
                  <PackageSelection onOrderUpdate={handlePackageUpdate} />
                </div>

                {/* Шаг 2 */}
                <div className={currentStep === 2 ? "" : styles.hidden}>
                  <div className={styles.background}>
                    <ChangeOrderButton onBack={() => setCurrentStep(1)} />
                    <form
                      id="deliveryForm"
                      onSubmit={handleDeliverySubmit}
                      className={styles.deliveryStep}
                    >
                      <DeliveryDetailsForm
                        formData={deliveryData}
                        onChange={handleDeliveryChange}
                      />
                    </form>
                  </div>
                </div>

                {/* Шаг 3 */}
                <div className={currentStep === 3 ? "" : styles.hidden}>
                  <StandardOrderSummary
                    packages={orderState.packages}
                    delivery={orderState.delivery}
                    onBack={() => setCurrentStep(2)}
                  />
                </div>
              </div>

              {/* правая колонка */}
              <div className={styles.asideColumn}>
                <OrderTotalPackage
                  packageCount={orderState.packages.length}
                  totalDays={totalDays}
                  discountAmount={discountAmount}
                  totalPrice={totalPrice}
                  currentStep={currentStep}
                  isStep1Valid={isStep1Valid}
                  isStep2Valid={isStep2Valid}
                  onNextStep={goNext}
                  onPrevStep={goPrev}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ModalProvider>
  );
}
