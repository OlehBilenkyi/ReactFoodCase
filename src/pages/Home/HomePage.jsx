import React from "react";
import Promo from "../../components/HomePageFeatures/Promo/Promo";
import Advantages from "../../components/HomePageFeatures/Advantages/Advantages";
import CalorieCalculator from "../../components/HomePageFeatures/CalorieCalculator/PriceCalculator";
import OrderButton from "../../components/HomePageFeatures/Order/OrderButton";
import OrderOptions from "../../components/HomePageFeatures/Order/OrderOptions";

import Feedback from "../../components/HomePageFeatures/Feedback/Feedback";
import styles from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div>
      <Promo />
      <div className={styles.HomePageContainer}>
        <Advantages />
        <CalorieCalculator />
        <OrderButton />
        <OrderOptions />
        <Feedback />
      </div>
    </div>
  );
};

export default HomePage;
