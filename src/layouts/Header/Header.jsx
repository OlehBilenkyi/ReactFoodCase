import React, { useState } from "react";
import styles from "./Header.module.css";
import Logo from "./Logo/Logo";
import DesktopMenu from "./components/DesktopMenu/DesktopMenu";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import BurgerButton from "./components/BurgerButton/BurgerButton";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerContainer}>
        <Logo />

        {/* Десктоп-меню (показать ≥768px) */}
        <nav className={styles.desktopMenu}>
          <DesktopMenu />
        </nav>

        {/* Бургер-кнопка (показать <768px) */}
        <div className={styles.burgerWrapper}>
          <BurgerButton isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>

        {/* Мобильное меню (рендерит null, если isOpen=false) */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </div>
    </header>
  );
};

export default Header;
