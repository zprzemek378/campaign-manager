import MainLayout from "../../layouts/MainLayout/MainLayout";
import CampaignCard from "./components/CampaignCard/CampaignCard";

import styles from "./CampaignList.module.scss";
import { CampaignType } from "@shared/types";
import { useState } from "react";

const exampleCampaigns: CampaignType[] = [
  {
    id: "d1a58c3e-22b0-4f74-b8dc-d54b679ac12e",
    name: "Summer Sale NYC",
    keyWords: ["summer", "sale", "clothing"],
    bidAmount: 0.5,
    campaignFund: 100,
    isActive: true,
    town: "us-nyc",
    radiusInKm: 15,
  },
  {
    id: "fa76a294-9327-41f2-a109-622b25b5665f",
    name: "Berlin Electronics Promo",
    keyWords: ["electronics", "gadgets", "discount"],
    bidAmount: 0.75,
    campaignFund: 200,
    isActive: true,
    town: "eu-ber",
    radiusInKm: 20,
  },
  {
    id: "9f08b0b6-9cf1-4ae3-8127-9dd25a2fa2e0",
    name: "Tokyo Fashion Week",
    keyWords: ["fashion", "tokyo", "runway"],
    bidAmount: 1.2,
    campaignFund: 150,
    isActive: false,
    town: "asia-tok",
    radiusInKm: 10,
  },
  {
    id: "ef3a2046-7905-4bb7-8ff4-f1d1ab5d609e",
    name: "London Books Push",
    keyWords: ["books", "reading", "education", "runway", "tokyo", "fashion"],
    bidAmount: 0.3,
    campaignFund: 80,
    isActive: true,
    town: "eu-lon",
    radiusInKm: 25,
  },
  {
    id: "3c1ef4df-933e-45c7-8d6e-f308b94a6f4e",
    name: "LA Home Decor Boost",
    keyWords: ["home", "decor", "interior"],
    bidAmount: 0.6,
    campaignFund: 120,
    isActive: true,
    town: "us-la",
    radiusInKm: 30,
  },
];

const CampaignList = () => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState<string | null>(
    null
  );

  return (
    <MainLayout>
      <div className={styles.list}>
        {exampleCampaigns.map((c) => (
          <CampaignCard
            campaign={c}
            expanded={currentlyExpanded === c.id}
            setCurrentlyExpanded={setCurrentlyExpanded}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default CampaignList;
