import React from "react";
import { PAYMENT_METHODS } from "../../../constants/footerData.jsx";
import styles from "./FooterPayments.module.css";

const FooterPayments = () => (
  <div className={styles.column}>
    <div className={styles.title}>Metody płatności:</div>
    <div className={styles.paymentMethods}>
      {PAYMENT_METHODS.map((m) => (
        <div key={m.alt} className={styles.paymentMethod}>
          <img src={m.image} alt={m.alt} />
        </div>
      ))}
    </div>
  </div>
);

export default FooterPayments;
