import React, { useState, useEffect, useRef } from "react"; // ← добавили useRef
import useModal from "../ModalManager/useModal";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import styles from "../../MenuSelectionFeatures/DatePickerModal/DatePickerModal.module.css";

const DatePickerModal = () => {
  const { closeModal, modalProps } = useModal();
  const {
    packageId,
    initialDates = [],
    onSelect,
  } = modalProps["date-picker"] || {};

  const [selectedDates, setSelectedDates] = useState(initialDates);
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (!datepickerRef.current) return;

    const datepicker = new AirDatepicker(datepickerRef.current, {
      inline: true,
      multipleDates: true,
      selectedDates: initialDates,
      minDate: new Date(),
      onSelect: ({ date }) => {
        // “date” może być albo pojedynczą datą, albo tablicą dat
        setSelectedDates(Array.isArray(date) ? date : [date]);
      },
    });

    return () => datepicker.destroy();
  }, [initialDates]);

  const handleConfirm = () => {
    if (typeof onSelect === "function") {
      onSelect(selectedDates);
    }
    closeModal("date-picker");
  };

  return (
    <div className={styles.modalContent}>
      <h2>Wybierz daty dostawy dla pakietu #{packageId}</h2>
      <div ref={datepickerRef} className={styles.datepicker} />
      <div className={styles.modalActions}>
        <button
          onClick={() => closeModal("date-picker")}
          className={styles.cancelButton}
        >
          Anuluj
        </button>
        <button onClick={handleConfirm} className={styles.confirmButton}>
          Zatwierdź
        </button>
      </div>
    </div>
  );
};
export default DatePickerModal;
