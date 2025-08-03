import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCampaign, MdErrorOutline } from "react-icons/md";
import styles from "./DataStatusMessage.module.scss";
import clsx from "clsx";

type DataStatusMessage = {
  type: "loading" | "error" | "empty";
  error?: string;
};

const MESSAGES = {
  loading: {
    icon: (
      <AiOutlineLoading3Quarters
        className={clsx(styles.icon, styles.loadingIcon)}
      />
    ),
    h1: "Loading campaigns...",
    p: "Please hold on while we gather your data. This won't take long.",
  },
  empty: {
    icon: <MdCampaign className={styles.icon} />,
    h1: "No campaigns yet",
    p: "You haven't created any campaigns. Click 'Add new campaign' to get started!",
  },
  error: {
    icon: <MdErrorOutline className={clsx(styles.icon, styles.errorIcon)} />,
    h1: "Something went wrong",
  },
};

const DataStatusMessage = ({ type, error = "" }: DataStatusMessage) => {
  return (
    <div className={styles.wrapper}>
      {MESSAGES[type].icon}
      <h1>{MESSAGES[type].h1}</h1>
      <p>{type === "error" ? error : MESSAGES[type].p}</p>
    </div>
  );
};

export default DataStatusMessage;
