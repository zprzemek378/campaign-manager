import { Link } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import clsx from "clsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

type MainLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>Campaign Manager</div>
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
