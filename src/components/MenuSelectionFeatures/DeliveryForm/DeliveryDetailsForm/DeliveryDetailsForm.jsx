import React from "react";
import styles from "./DeliveryDetailsForm.module.css";

const DeliveryDetailsForm = ({ formData, onChange }) => (
  <>
    {/* Контакты */}
    <div className={styles.row}>
      <div className={styles.title}>Dane kontaktowe:</div>
      <div className={styles.grid}>
        <div className={`${styles.field} ${styles.large}`}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>E-mail
          </div>
          <input
            type="email"
            name="email"
            value={formData.email ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="E-mail"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Numer telefonu
          </div>
          <input
            type="text"
            name="phone"
            value={formData.phone ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Numer telefonu"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Pełne imię i nazwisko
          </div>
          <input
            type="text"
            name="fullname"
            value={formData.fullname ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Pełne imię i nazwisko"
          />
        </div>
      </div>
    </div>

    {/* Адрес */}
    <div className={styles.row}>
      <div className={styles.title}>Dane dostawy:</div>
      <div className={styles.deliveryGrid}>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Ulica
          </div>
          <input
            type="text"
            name="street"
            value={formData.street ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Ulica"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Dom
          </div>
          <input
            type="text"
            name="house_number"
            value={formData.house_number ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Dom"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Klatka</div>
          <input
            type="text"
            name="klatka"
            value={formData.klatka ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className={styles.input}
            placeholder="Klatka"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Piętro
          </div>
          <input
            type="text"
            name="floor"
            value={formData.floor ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Piętro"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Mieszkanie
          </div>
          <input
            type="text"
            name="apartment"
            value={formData.apartment ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Mieszkanie"
          />
        </div>
        <div className={styles.field}>
          <div className={styles.label}>
            <span className={styles.asterisk}>*</span>Kod do klatki
          </div>
          <input
            type="text"
            name="gate_code"
            value={formData.gate_code ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            required
            className={styles.input}
            placeholder="Kod do klatki"
          />
        </div>
        <div className={`${styles.field} ${styles.large}`}>
          <div className={styles.label}>Uwagi</div>
          <input
            type="text"
            name="notes"
            value={formData.notes ?? ""}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            className={styles.input}
            placeholder="Uwagi"
          />
        </div>
      </div>
    </div>
  </>
);

export default DeliveryDetailsForm;
