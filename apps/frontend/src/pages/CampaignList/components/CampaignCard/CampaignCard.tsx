import { CampaignType } from "@shared/types";
import styles from "./CampaignCard.module.scss";
import { MdExpandMore } from "react-icons/md";
import clsx from "clsx";
import MoneyView from "./components/MoneyView/MoneyView";
import StatusIndicator from "./components/StatusIndicator/StatusIndicator";
import LocationIndicator from "./LocationIndicator/LocationIndicator";
import { FaMoneyBillWave, FaCoins } from "react-icons/fa";
import { useLayoutEffect, useRef } from "react";

type CampaignCardProps = {
  campaign: CampaignType;
  expanded: boolean;
  setCurrentlyExpanded: React.Dispatch<React.SetStateAction<string | null>>;
};

const CampaignCard = ({
  campaign,
  expanded,
  setCurrentlyExpanded,
}: CampaignCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      el.style.maxHeight = el.scrollHeight + "px";
      const timeout = setTimeout(() => {
        el.style.maxHeight = "none";
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      el.style.maxHeight = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.maxHeight = "0px";
      });
    }
  }, [expanded]);

  const toggleCurrentlyExpanded = () =>
    setCurrentlyExpanded(expanded ? null : campaign.id);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>{campaign.name}</h2>
        <StatusIndicator isActive={campaign.isActive} />
      </div>
      <div className={styles.keyWordList}>
        {campaign.keyWords.map((k) => (
          <div className={styles.keyWord}>{k}</div>
        ))}
      </div>

      <div ref={contentRef} className={styles.collapsibleContent}>
        <LocationIndicator
          town={campaign.town}
          radiusInKm={campaign.radiusInKm}
        />
        <div className={styles.money}>
          <MoneyView
            title="Bid amount:"
            money={campaign.bidAmount}
            Icon={FaCoins}
          />
          <MoneyView
            title="Campaign fund:"
            money={campaign.campaignFund}
            Icon={FaMoneyBillWave}
          />
        </div>
      </div>

      <div className={styles.expandIconWrapper}>
        <button
          onClick={toggleCurrentlyExpanded}
          className={clsx(styles.expandIcon, expanded && styles.expanded)}
        >
          <MdExpandMore size={32} />
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
