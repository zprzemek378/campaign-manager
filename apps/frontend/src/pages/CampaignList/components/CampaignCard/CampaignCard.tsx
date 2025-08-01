import { CampaignType } from "@shared/types";
import styles from "./CampaignCard.module.scss";

type CampaignCardProps = {
  campaign: CampaignType;
};

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  return (
    <div className={styles.card}>
      <h3>{campaign.name}</h3>
      <div className={styles.keyWordList}>
        {campaign.keyWords.map((k) => (
          <div className={styles.keyWord}>{k}</div>
        ))}
      </div>

      <div>
        <span>Bid amount: {campaign.bidAmount}</span>
        <span>Campaign fund: {campaign.campaignFund}</span>
      </div>
    </div>
  );
};

export default CampaignCard;
