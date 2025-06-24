import React from "react";
import { Helmet } from "react-helmet";
import { RegulaminArticle, RegulaminNav } from "@regulamin";
import styles from "./RegulaminPage.module.css";

// Импортируем из отдельного файла с данными
import { NAV_ITEMS, ARTICLE_SECTIONS } from "./RegulaminPageSection";

const RegulaminPage = () => {
  const metaData = {
    title: "Regulamin - Twoja Restauracja",
    description:
      "Regulamin zamówień w naszej restauracji. Zapoznaj się z zasadami i warunkami.",
    keywords: "regulamin, restauracja, zasady zamówień, dostawa",
    canonicalUrl: "https://twojarestauracja.pl/regulamin",
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <link rel="canonical" href={metaData.canonicalUrl} />
      </Helmet>

      <main className={styles.pageMain}>
        <div className={styles.pageContainer}>
          <h1 className={styles.pageTitle}>Regulamin</h1>
          <div className={styles.contentGrid}>
            <article className={styles.mainContent}>
              <RegulaminArticle sections={ARTICLE_SECTIONS} />
            </article>
            <aside className={styles.sidebar}>
              <RegulaminNav items={NAV_ITEMS} />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegulaminPage;
