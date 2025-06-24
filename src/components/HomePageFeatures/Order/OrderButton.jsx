import React from "react";
import styles from "./OrderButton.module.css";

const OrderButton = () => {
  return (
    <div id="buttonContainer" className={styles.zamowienieContainer}>
      <h4 className={styles.menu__btn} id="toggleButton">
        Złóż zamówienie
      </h4>
    </div>
  );
};

export default OrderButton;
