import React from "react";
import styles from "./Feedback.module.css";
import FeedbackImg from "../../../assets/img/feedback/1.png";
const Feedback = () => {
  return (
    <>
      <div className={styles.feedback__title}>Twoje uwagi dotyczące diety</div>
      <div className={styles.feedbackSection}>
        <form className={styles.feedback__form}>
          <div className={styles.feedback__field}>
            <label className={styles.feedback__label}>Twoje imię:</label>
            <input className={styles.feedback__input} type="text" name="name" />
          </div>
          <div className={styles.feedback__field}>
            <label className={styles.feedback__label}>Twój email:</label>
            <input
              className={styles.feedback__input}
              type="email"
              name="email"
            />
          </div>
          <div className={styles.feedback__field}>
            <label className={styles.feedback__label}>Twój komentarz:</label>
            <textarea
              className={styles.feedback__textarea}
              name="message"
            ></textarea>
          </div>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </form>

        <img
          src={FeedbackImg}
          alt="Эко-упаковка"
          className={styles.promoIcon}
        />
      </div>
    </>
  );
};

export default Feedback;
