import clsx from "clsx";
import styles from "./StatusIndicator.module.scss";
import { FaTimes, FaCheck } from "react-icons/fa";

type StatusIndicatorProps = {
  isActive: boolean;
};

const StatusIndicator = ({ isActive }: StatusIndicatorProps) => {
  return (
    <div
      className={clsx(
        styles.statusIndicator,
        isActive ? styles.active : styles.inactive
      )}
    >
      <span className={styles.text}>
        {isActive ? (
          <>
            <FaCheck className={styles.icon} />
            Active
          </>
        ) : (
          <>
            <FaTimes className={styles.icon} />
            Inactive
          </>
        )}
      </span>
    </div>
  );
};

export default StatusIndicator;
