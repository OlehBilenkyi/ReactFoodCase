// src/components/MenuSelectionFeatures/DatePickerModal/DatePickerModal.jsx
import React, { useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import pl from "air-datepicker/locale/pl";
import "air-datepicker/air-datepicker.css";
import styles from "./DatePickerModal.module.css";

const DatePickerModal = ({
  isOpen,
  onClose,
  onDateSelect,
  initialDates = [], // массив строк в формате "DD.MM.YYYY"
}) => {
  // ссылка на <div> для календаря
  const pickerEl = useRef(null);
  // храним инстанс не в состоянии, а в ref
  const dpRef = useRef(null);

  // инициализация/закрытие календаря
  useEffect(() => {
    if (isOpen && pickerEl.current && !dpRef.current) {
      // создаём AirDatepicker
      dpRef.current = new AirDatepicker(pickerEl.current, {
        inline: true,
        locale: pl,
        minDate: new Date(),
        multipleDates: true,
        multipleDatesSeparator: ", ",
        onSelect({ datepicker }) {
          // собираем выбранные JS Date в отформатированные строки
          const arr = datepicker.selectedDates.map((d) =>
            d.toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          );
          onDateSelect(arr);
        },
      });

      // если есть изначальные даты — сразу поставим их
      if (initialDates.length) {
        const jsDates = initialDates
          .map((str) => {
            const [dd, mm, yyyy] = str.split(".");
            return new Date(`${yyyy}-${mm}-${dd}`);
          })
          .filter((d) => !isNaN(d));
        dpRef.current.selectDate(jsDates);
      }
    }

    // когда isOpen становится false — удаляем календарь
    if (!isOpen && dpRef.current) {
      dpRef.current.destroy();
      dpRef.current = null;
    }

    // чистка при размонтировании компонента
    return () => {
      if (dpRef.current) {
        dpRef.current.destroy();
        dpRef.current = null;
      }
    };
  }, [isOpen, onDateSelect, initialDates]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Wybierz daty dostawy</h2>
        {/* вот сюда AirDatepicker и «прилипнет» */}
        <div ref={pickerEl} className={styles.datepicker} />
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Anuluj
          </button>
          <button className={styles.confirmButton} onClick={onClose}>
            Zatwierdź
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
