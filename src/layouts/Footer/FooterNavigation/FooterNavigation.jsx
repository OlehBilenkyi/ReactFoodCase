import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FOOTER_LINKS } from "../../../constants/footerData.jsx";
import styles from "./FooterNavigation.module.css";

const FooterNavigation = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname.endsWith("/index.php");

  return (
    <div className={styles.column}>
      <div className={styles.title}>Nawigacja:</div>
      <ul className={styles.navList}>
        {FOOTER_LINKS.map((link) => (
          <li key={link.path} className={styles.navItem}>
            {link.isAnchor && isHome ? (
              <a href={link.path} className={styles.navLink}>
                {link.label}
              </a>
            ) : (
              <Link to={link.path} className={styles.navLink}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavigation;
