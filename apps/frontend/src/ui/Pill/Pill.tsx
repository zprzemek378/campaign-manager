import clsx from "clsx";
import styles from "./Pill.module.scss";
import { TiDelete } from "react-icons/ti";

type PillProps = {
  text: string;
  onRemove?: (text: string) => void;
};

const Pill = ({ text, onRemove }: PillProps) => {
  return (
    <div className={clsx(styles.pill, onRemove && styles.removable)}>
      <span className={styles.text}>{text}</span>
      {onRemove && (
        <button className={styles.button} onClick={() => onRemove(text)}>
          <TiDelete size={20} />
        </button>
      )}
    </div>
  );
};

export default Pill;
