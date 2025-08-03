import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import styles from "./ToggleCheckbox.module.scss";

type ToggleCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
  size?: number;
  onColor?: string;
  offColor?: string;
};

const ToggleCheckbox = ({
  checked,
  onChange,
  ariaLabel = "Toggle",
  size = 28,
  onColor = "#22c55e",
  offColor = "#d1d5db",
}: ToggleCheckboxProps) => (
  <button
    type="button"
    aria-pressed={checked}
    aria-label={ariaLabel}
    onClick={() => onChange(!checked)}
    className={styles.toggleButton}
    style={{ width: size + 4, height: size + 4 }}
    tabIndex={0}
  >
    {checked ? (
      <FaToggleOn size={size} color={onColor} />
    ) : (
      <FaToggleOff size={size} color={offColor} />
    )}
  </button>
);

export default ToggleCheckbox;
