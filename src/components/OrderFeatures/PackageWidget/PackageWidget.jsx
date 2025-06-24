// src/components/OrderFeatures/PackageWidget/PackageWidget.jsx
import React, { useState, useRef, useEffect } from "react";
import AirDatepicker from "air-datepicker";
import pl from "air-datepicker/locale/pl";
import "air-datepicker/air-datepicker.css";
import styles from "./PackageWidget.module.css";
import PackageCard from "./PackageCard";
import PackageSummary from "./PackageSummary";

export default React.memo(function PackageWidget({
  packages,
  isFirst,
  onRemove,
  onSelectionChange,
}) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [pickerVisible, setPickerVisible] = useState(false);

  const pickerRef = useRef(null);
  const dpInstance = useRef(null);

  // Функция расчёта количества дней и цены
  const calc = (pkg, dates) => {
    if (!pkg || dates.length === 0) {
      return { days: 0, originalPrice: 0, price: 0, discountPercent: 0 };
    }
    const days = dates.length;
    let dp =
      days >= 28
        ? pkg.discount3
        : days >= 24
        ? pkg.discount2
        : days >= 20
        ? pkg.discount1
        : 0;
    const originalPrice = pkg.price * days;
    const discount = (originalPrice * dp) / 100;
    return {
      days,
      originalPrice,
      price: originalPrice - discount,
      discountPercent: dp,
    };
  };

  // Инициализация и уничтожение даты-пикера
  useEffect(() => {
    if (pickerVisible && pickerRef.current) {
      // Конвертируем строки "DD.MM.YYYY" в Date
      const initialJsDates = selectedDates
        .map((str) => {
          const [dd, mm, yyyy] = str.split(".");
          return new Date(`${yyyy}-${mm}-${dd}`);
        })
        .filter((d) => !isNaN(d));

      dpInstance.current = new AirDatepicker(pickerRef.current, {
        inline: true,
        locale: pl,
        minDate: new Date(),
        multipleDates: true,
        multipleDatesSeparator: ", ",
        selectedDates: initialJsDates, // сразу передаём уже выбранные даты
        onSelect({ datepicker }) {
          const arr = datepicker.selectedDates.map((d) =>
            d.toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          );
          updateDates(arr);
        },
      });
    }

    // При скрытии или размонтировании — уничтожаем инстанс
    return () => {
      if (dpInstance.current) {
        dpInstance.current.destroy();
        dpInstance.current = null;
      }
    };
  }, [pickerVisible]); // слушаем только флаг видимости

  // По клику на карточку — селектим пакет и открываем календарь
  const selectPkg = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedDates([]);
    setPickerVisible(true);
    onSelectionChange({
      packageId: pkg.id,
      dates: [],
      ...calc(pkg, []),
      packageData: pkg,
    });
  };

  // Обновляем даты и пересылаем наверх
  const updateDates = (dates) => {
    setSelectedDates(dates);
    onSelectionChange({
      packageId: selectedPackage.id,
      dates,
      ...calc(selectedPackage, dates),
      packageData: selectedPackage,
    });
  };

  const priceInfo = selectedPackage ? calc(selectedPackage, selectedDates) : {};

  return (
    <div className={styles.widgetContainer}>
      <div className={styles.packageGrid}>
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            selected={selectedPackage?.id === pkg.id}
            onSelect={() => selectPkg(pkg)}
          />
        ))}
      </div>

      {selectedPackage && (
        <div className={styles.summaryAndCalendar}>
          <PackageSummary
            pkg={selectedPackage}
            dates={selectedDates}
            priceInfo={priceInfo}
            onToggleCalendar={() => setPickerVisible((v) => !v)}
            onChangeDates={updateDates}
          />
          {pickerVisible && (
            <div ref={pickerRef} className={styles.calendarAside} />
          )}
        </div>
      )}

      {!isFirst && (
        <button onClick={onRemove} className={styles.removeButton}>
          Usuń pakiet
        </button>
      )}
    </div>
  );
});
