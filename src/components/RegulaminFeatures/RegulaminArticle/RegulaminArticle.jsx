import React from "react";
import styles from "./RegulaminArticle.module.css";

const RegulaminArticle = ({ sections }) => (
  <article className={styles.articleContainer}>
    <h2 className={styles.articleIntro}>
      Potwierdzając i opłacając zamówienie, zgadzasz się na poniższe zasady i
      warunki:
    </h2>

    {sections.map((section) => (
      <section
        key={section.id}
        id={section.id}
        className={styles.articleSection}
      >
        <h3 className={styles.sectionTitle}>{section.title}</h3>
        <p className={styles.sectionContent}>{section.content}</p>
      </section>
    ))}
  </article>
);

export default RegulaminArticle;
