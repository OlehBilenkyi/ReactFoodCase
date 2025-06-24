// src/components/OrderFeatures/PackageWidget/PackageSummary.jsx
import React from "react";
import styles from "./PackageSummary.module.css";

export default function PackageSummary({
  pkg,
  dates,
  priceInfo,
  onToggleCalendar,
  onChangeDates,
}) {
  // Если pkg не передали — просто ничего не рендерим
  if (!pkg) return null;

  const { days, originalPrice, price, discountPercent } = priceInfo;
  const imgSrc = pkg.image;

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={imgSrc}
          alt={`${pkg.name} kalorii`}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      <div className={styles.details}>
        <h4 className={styles.title}>{pkg.name} kalorii</h4>

        <div className={styles.row}>
          <span>Ilość dni:</span>
          <strong>{days}</strong>
        </div>

        <div
          className={styles.row}
          onClick={onToggleCalendar}
          style={{ cursor: "pointer" }}
        >
          <span>Data dostawy:</span>
          <div>{dates.length ? dates.join(", ") : "     "}</div>
        </div>

        <div className={styles.row}>
          <span>Cena:</span>
          <div className={styles.priceContainer}>
            {discountPercent > 0 && (
              <span className={styles.original}>
                {originalPrice.toFixed(2)} zł
              </span>
            )}
            <span className={styles.final}>{price.toFixed(2)} zł</span>
            {discountPercent > 0 && (
              <span className={styles.badge}>-{discountPercent}%</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
