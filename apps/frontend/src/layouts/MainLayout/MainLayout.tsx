import { Link } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import clsx from "clsx";

type MainLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>Campaign Manager</div>
        <nav>
          <Link to="/">Campaign List</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </header>

      <main className={clsx(styles.main, className)}>{children}</main>

      <footer className={styles.footer}>
        <p>© 2025 Campaign Manager</p>
      </footer>
    </div>
  );
};

export default MainLayout;
