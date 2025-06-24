import React from "react";
import { SOCIAL_LINKS } from "../../../constants/footerData.jsx";
import styles from "./FooterContact.module.css";

const FooterContact = () => (
  <div className={styles.column}>
    <div className={styles.title}>Kontakt:</div>
    <div className={styles.socials}>
      <a href={SOCIAL_LINKS.email} className={styles.socialLink}>
        📧 Email
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialLink}
      >
        📷 Instagram
      </a>
    </div>
  </div>
);

export default FooterContact;
