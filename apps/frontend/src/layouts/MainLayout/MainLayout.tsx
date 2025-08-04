import { Link } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import clsx from "clsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { FaGem } from "react-icons/fa";

type MainLayoutProps = {
  children: React.ReactNode;
  gemQuantity: number;
  className?: string;
};

const MainLayout = ({ children, gemQuantity, className }: MainLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoAccentLetter}>C</span>Manager
        </div>
        <button
          className={styles.burger}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <GiHamburgerMenu />
        </button>
        <nav
          className={clsx(styles.nav, menuOpen && styles.open)}
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/">Campaign List</Link>
          <Link to="/info">Informations</Link>
          <div className={styles.gems}>
            <FaGem className={styles.gemIcon} size={32} /> {gemQuantity}
          </div>
        </nav>

        {menuOpen && (
          <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
        )}
      </header>

      <main className={clsx(styles.main, className)}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2025 Campaign Manager</p>
      </footer>
    </div>
  );
};

export default MainLayout;
