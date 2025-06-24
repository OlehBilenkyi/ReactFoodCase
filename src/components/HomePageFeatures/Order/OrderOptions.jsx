// OrderOptions.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./OrderOptions.module.css";

const OrderOptions = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "0 15px",
        gap: "5px",
        backgroundColor: "#fff",
      }}
    >
      {/* эти пути должны совпадать с вашими <Route path="…" /> из mainLinks.js */}
      <Link to="/order" className={styles.btnCentre}>
        Standardowe menu
      </Link>
      <Link to="/menu-selection" className={styles.btnCentre}>
        Menu do wyboru
      </Link>
    </div>
  );
};

export default OrderOptions;
