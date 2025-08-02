import { formatMoney } from "@utils/formatMoney";
import styles from "./MoneyView.module.scss";
import { IconType } from "react-icons";

type MoneyViewProps = {
  title: string;
  money: number;
  Icon: IconType;
};

const MoneyView = ({ title, money, Icon }: MoneyViewProps) => {
  return (
    <div className={styles.moneyView}>
      <Icon />
      <div className={styles.title}>{title}</div>
      <div className={styles.money}>{formatMoney(money)}</div>
    </div>
  );
};

export default MoneyView;
