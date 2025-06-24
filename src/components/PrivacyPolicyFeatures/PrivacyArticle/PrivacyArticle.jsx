import React from "react";
import styles from "./PrivacyArticle.module.css";
import { PRIVACY_SECTIONS } from "./privacySections";

const PrivacyArticle = () => (
  <article className={styles.article}>
    {PRIVACY_SECTIONS.map(({ id, title, content }) => (
      <section key={id} id={id} className={styles.section}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{content}</p>
      </section>
    ))}
  </article>
);

export default PrivacyArticle;
