import React from "react";
import ChangeOrderButton from "./ChangeOrderButton/ChangeOrderButton";
import DeliveryDetailsForm from "./DeliveryDetailsForm/DeliveryDetailsForm";
import NavigationButtons from "./NavigationButtons/NavigationButtons";
import styles from "./DeliveryForm.module.css";

const DeliveryForm = ({ formData, onChange, onSubmit, onBack }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.deliveryWidget}>
      <ChangeOrderButton onBack={onBack} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <DeliveryDetailsForm
          formData={formData}
          onChange={(name, value) => onChange(name, value)}
        />
      </form>
    </div>
  );
};

export default DeliveryForm;
