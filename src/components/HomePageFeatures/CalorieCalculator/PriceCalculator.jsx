import React, { useState, useRef, useEffect } from "react";
import styles from "./PriceCalculator.module.css";

// Хелпер для процента
const getPercent = (value, min, max) => ((value - min) * 100) / (max - min);

// Компонент range с динамическим фоном
const RangeInput = ({ name, min, max, value, onChange }) => {
  const ref = useRef(null);

  const updateBg = () => {
    const pct = getPercent(Number(value), Number(min), Number(max));
    if (ref.current) {
      ref.current.style.background = `linear-gradient(to right, #0056d3 0%, #0056d3 ${pct}%, #d7d7d7 ${pct}%, #d7d7d7 100%)`;
    }
  };

  // при монтировании и при каждом изменении value
  useEffect(updateBg, [value]);

  return (
    <input
      ref={ref}
      type="range"
      name={name}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      onInput={updateBg}
      className={styles.calculatorRangeInput}
    />
  );
};

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    age: 30,
    gender: "male",
    weight: 70,
    height: 170,
    activity: "1.2",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState({
    bmr: 0,
    calories: 0,
    recommendation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateCalories = () => {
    let bmr;
    if (formData.gender === "male") {
      bmr =
        88.362 +
        13.397 * formData.weight +
        4.799 * formData.height -
        5.677 * formData.age;
    } else {
      bmr =
        447.593 +
        9.247 * formData.weight +
        3.098 * formData.height -
        4.33 * formData.age;
    }

    const calories = bmr * parseFloat(formData.activity);

    let recommendation;
    if (calories < 1500) recommendation = "1200";
    else if (calories < 1800) recommendation = "1500";
    else if (calories < 2200) recommendation = "1800";
    else if (calories < 2500) recommendation = "2000";
    else recommendation = "2500";

    setResults({
      bmr: Math.round(bmr),
      calories: Math.round(calories),
      recommendation,
    });

    setModalOpen(true);
  };

  return (
    <div className={styles.calculator}>
      <h2 className={styles.calculatorTitle}>Kalkulator kalorii</h2>

      <div className={styles.calculatorGrid}>
        {/* ВОЗРАСТ */}
        <div className={styles.calculatorField}>
          <label className={styles.calculatorLabel}>Wiek (lata):</label>
          <div className={styles.calculatorRange}>
            <input
              type="tel"
              min="10"
              max="80"
              value={formData.age}
              onChange={handleChange}
              name="age"
            />
            <RangeInput
              name="age"
              min="10"
              max="80"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ПОЛ */}
        <div className={styles.calculatorField}>
          <label className={styles.calculatorLabel}>Płeć:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={styles.calculatorSelect}
          >
            <option value="male">Mężczyzna</option>
            <option value="female">Kobieta</option>
          </select>
        </div>

        {/* ВЕС */}
        <div className={styles.calculatorField}>
          <label className={styles.calculatorLabel}>Waga (kg):</label>
          <div className={styles.calculatorRange}>
            <input
              type="tel"
              min="10"
              max="200"
              value={formData.weight}
              onChange={handleChange}
              name="weight"
            />
            <RangeInput
              name="weight"
              min="10"
              max="200"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ВЫСОТА */}
        <div className={styles.calculatorField}>
          <label className={styles.calculatorLabel}>Wysokość (cm):</label>
          <div className={styles.calculatorRange}>
            <input
              type="tel"
              min="100"
              max="300"
              value={formData.height}
              onChange={handleChange}
              name="height"
            />
            <RangeInput
              name="height"
              min="100"
              max="300"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* АКТИВНОСТЬ */}
        <div className={styles.calculatorField}>
          <label className={styles.calculatorLabel}>Poziom aktywności:</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className={styles.calculatorSelect}
          >
            <option value="1.2">Minimum</option>
            <option value="1.375">Lekka aktywność</option>
            <option value="1.55">Umiarkowana aktywność</option>
            <option value="1.725">Wysока aktywność</option>
            <option value="1.9">Bardzo duża aktywność</option>
          </select>
        </div>
      </div>

      <button className={styles.calculatorButton} onClick={calculateCalories}>
        Obliczać
      </button>

      {modalOpen && (
        <div
          className={`${styles.calculatorModal} ${styles.calculatorModalOpen}`}
        >
          <div className={styles.modalInner}>
            <button
              className={styles.modalClose}
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            <div className={styles.modalRow}>
              <h3 className={styles.modalTitle}>Twoje wyniki:</h3>
              <p className={styles.modalResult}>
                Podstawowa przemiana materii (BMR): <span>{results.bmr}</span>{" "}
                kcal/dzień
              </p>
              <p className={styles.modalResult}>
                Zapotrzebowanie kaloryczne: <span>{results.calories}</span>{" "}
                kcal/dzień
              </p>
            </div>

            <div className={styles.modalRow}>
              <h3 className={styles.modalTitle}>Polecamy Cię:</h3>
              <p className={styles.modalResult}>
                Pakiet <span>{results.recommendation}</span> kcal
              </p>
            </div>

            <a
              href={`/order?plan=${results.recommendation}`}
              className={styles.modalButton}
            >
              Zamów pakiet {results.recommendation} kalorii
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
export default PriceCalculator;
