// src/components/OrderFeatures/StandardOrderSummary/StandardOrderSummary.jsx
import React from "react";
import PropTypes from "prop-types";
import pkgStyles from "./StandardOrderSummary.module.css";
import PackageSummary from "../PackageWidget/PackageSummary";
import DeliveryDetailsForm from "../../../components/MenuSelectionFeatures/DeliveryForm/DeliveryDetailsForm/DeliveryDetailsForm";
import ChangeOrderButton from "../../../components/MenuSelectionFeatures/DeliveryForm/ChangeOrderButton/ChangeOrderButton";

export default function StandardOrderSummary({
  packages,
  delivery,
  onBack,
  onPlace,
}) {
  if (!Array.isArray(packages) || !delivery) return null;

  return (
    <div className={pkgStyles.orderSummary}>
      {/* Заголовок + кнопка «назад» */}
      <div className={pkgStyles.headerWithBack}>
        <ChangeOrderButton onBack={onBack} />
      </div>
      <h2>Podsumowanie zamówienia</h2>
      <div className={pkgStyles.summarySection}>
        <h3>Informacje o zamówieniu</h3>
        <div className={pkgStyles.totalInfoGrid}>
          {packages
            .filter((pkg) => pkg.packageData)
            .map((pkg, idx) => (
              <div key={idx} className={pkgStyles.dateBlock}>
                {/* <p className={pkgStyles.dateHeader}>
                  Data: {pkg.dates.join(", ")}
                </p> */}
                <div className={pkgStyles.mealsList}>
                  <PackageSummary
                    pkg={pkg.packageData}
                    dates={pkg.dates}
                    priceInfo={pkg}
                    onToggleCalendar={() => {}}
                    onChangeDates={() => {}}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={pkgStyles.summarySection}>
        <h3>Dane dostawy</h3>
        <div className={pkgStyles.deliveryDetails}>
          <DeliveryDetailsForm formData={delivery} onChange={() => {}} />
        </div>
      </div>

      <div className={pkgStyles.summaryTotal}>
        Razem do zapłaty:{" "}
        {packages
          .filter((pkg) => pkg.packageData)
          .reduce((s, p) => s + p.price, 0)
          .toFixed(2)}{" "}
        zł
      </div>
    </div>
  );
}

StandardOrderSummary.propTypes = {
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      packageData: PropTypes.object.isRequired,
      dates: PropTypes.arrayOf(PropTypes.string).isRequired,
      days: PropTypes.number.isRequired,
      originalPrice: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      discountPercent: PropTypes.number.isRequired,
    })
  ).isRequired,
  delivery: PropTypes.shape({
    email: PropTypes.string,
    phone: PropTypes.string,
    fullname: PropTypes.string,
    street: PropTypes.string,
    house_number: PropTypes.string,
    klatka: PropTypes.string,
    floor: PropTypes.string,
    apartment: PropTypes.string,
    gate_code: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onPlace: PropTypes.func,
};
