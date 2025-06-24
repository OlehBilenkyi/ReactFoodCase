import React from "react";
import styles from "./PricingPage.module.css";
import PriceTable from "@components/Pricing/PriceTable/PriceTable.jsx";
import CalorieCalculator from "../../components/HomePageFeatures/CalorieCalculator/PriceCalculator";

import Package1200 from "../../assets/img/pay/1.png";
import Package1500 from "../../assets/img/pay/2.png";
import Package1800 from "../../assets/img/pay/3.png";
import Package2000 from "../../assets/img/pay/4.png";
import Package2500 from "../../assets/img/pay/5.png";

const PricingPage = () => {
  const prices = [
    // This would come from your API/backend
    { name: "1200", price: 85, image: Package1200 },
    { name: "1500", price: 90, image: Package1500 },
    { name: "1800", price: 95, image: Package1800 },
    { name: "2000", price: 100, image: Package2000 },
    { name: "2500", price: 110, image: Package2500 },
  ];

  const discounts = {
    20: 4,
    24: 5,
    28: 7,
  };

  return (
    <>
      <main className={styles.pageMain}>
        <h1 className={styles.pageTitle}>Cennik usług cateringowych</h1>

        <div className={styles.priceList}>
          <div className={styles.container}>
            <PriceTable prices={prices} discounts={discounts} />

            <a href="/order" className={styles.orderButton}>
              Złóż zamówienie
            </a>
          </div>
        </div>

        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <CalorieCalculator />
          </div>
        </section>
      </main>
    </>
  );
};

export default PricingPage;
