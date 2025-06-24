// src/components/OrderFeatures/PackageSelection/PackageSelection.jsx
import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import PackageWidget from "../PackageWidget/PackageWidget";
import styles from "./PackageSelection.module.css";
import Package1200 from "../../../assets/img/pay/1.png";
import Package1500 from "../../../assets/img/pay/2.png";
import Package1800 from "../../../assets/img/pay/3.png";
import Package2000 from "../../../assets/img/pay/4.png";
import Package2500 from "../../../assets/img/pay/5.png";

const DEFAULT_PACKAGES = [
  {
    id: 1,
    name: "1200",
    price: 50.0,
    image: Package1200,
    discount1: 4,
    discount2: 5,
    discount3: 7,
  },
  {
    id: 2,
    name: "1500",
    price: 60.0,
    image: Package1500,
    discount1: 4,
    discount2: 5,
    discount3: 7,
  },
  {
    id: 3,
    name: "1800",
    price: 70.0,
    image: Package1800,
    discount1: 4,
    discount2: 5,
    discount3: 7,
  },
  {
    id: 4,
    name: "2100",
    price: 80.0,
    image: Package2000,
    discount1: 4,
    discount2: 5,
    discount3: 7,
  },
  {
    id: 5,
    name: "2400",
    price: 90.0,
    image: Package2500,
    discount1: 4,
    discount2: 5,
    discount3: 7,
  },
];

const PackageSelection = ({ onOrderUpdate, className }) => {
  const [widgets, setWidgets] = useState([{ id: Date.now() }]);
  const [selections, setSelections] = useState({});

  // При изменении widgets или selections отдаем ровно widgets.length пакетов
  useEffect(() => {
    if (!onOrderUpdate) return;
    const arrayOfPackages = widgets.map(({ id }) =>
      selections[id] ? selections[id] : { dates: [] }
    );
    onOrderUpdate(arrayOfPackages);
  }, [widgets, selections, onOrderUpdate]);

  // Обработка выбора в конкретном виджете
  const handleSelectionChange = useCallback((widgetId, selection) => {
    setSelections((prev) => ({
      ...prev,
      [widgetId]: selection,
    }));
  }, []);

  // Добавление нового виджета
  const addPackageWidget = useCallback(() => {
    setWidgets((prev) => [...prev, { id: Date.now() }]);
  }, []);

  // Удаление виджета
  const removePackageWidget = useCallback(
    (id) => {
      if (widgets.length <= 1) return;
      setWidgets((prev) => prev.filter((w) => w.id !== id));
      setSelections((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    },
    [widgets]
  );

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {widgets.map((widget, idx) => (
        <PackageWidget
          key={widget.id}
          widgetId={widget.id} // прокидываем widgetId
          packages={DEFAULT_PACKAGES}
          isFirst={idx === 0}
          onRemove={() => removePackageWidget(widget.id)}
          onSelectionChange={(sel) => handleSelectionChange(widget.id, sel)}
        />
      ))}

      <button
        onClick={addPackageWidget}
        className={styles.addButton}
        aria-label="Dodaj kolejny pakiet"
      >
        Dodaj kolejny pakiet
      </button>
    </div>
  );
};

PackageSelection.propTypes = {
  onOrderUpdate: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default React.memo(PackageSelection);
