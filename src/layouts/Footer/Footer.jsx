import React from "react";
import { Link } from "react-router-dom";
import FooterNavigation from "./FooterNavigation/FooterNavigation";
import FooterPayments from "./FooterPayments/FooterPayments";
import FooterContact from "./FooterContact/FooterContact";
import styles from "./Footer.module.css";
import LogoFooter from "../../assets/img/footer/logo-w.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className={styles.footer}
      itemScope
      itemType="http://schema.org/Organization"
    >
      <div className={styles.container}>
        <div className={styles.footer__left}>
          <div className={styles.footer__logFlex}>
            <img
              src={LogoFooter}
              alt="FoodCase Logo"
              className={styles.footer__logo}
            />
            <div className={styles.footer__slogan}>
              Nasza firma zapewnia wygodną dostawę gotowych dań do Twojego domu
            </div>
          </div>
          <div className={styles.footer__email}>
            Email: <a href="#">for@example.com</a>
          </div>
        </div>
        <div className={styles.footer__right}>
          <FooterNavigation />
          <FooterPayments />
          <FooterContact />
        </div>
      </div>
      <div className={styles.footer__copyright}>
        &copy; {year} <span itemProp="name">FoodCase</span>. Wszelkie prawa
        zastrzeżone.
      </div>
    </footer>
  );
};

export default Footer;
