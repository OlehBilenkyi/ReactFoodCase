import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import LogoPng from "../../../assets/img/logo.png";

/**
 * Логотип с ссылкой на главную страницу
 * @component
 * @returns {JSX.Element}
 */
const Logo = () => (
  <Link
    to="/"
    className={styles.logo}
    aria-label="Перейти на главную страницу"
    tabIndex={0}
  >
    <img
      src={LogoPng}
      alt="Логотип сайта"
      className={styles.logoImage}
      draggable={false}
    />
  </Link>
);
export default Logo;
