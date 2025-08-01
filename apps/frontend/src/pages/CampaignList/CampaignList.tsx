import MainLayout from "../../layouts/MainLayout/MainLayout";
import CampaignCard from "./components/CampaignCard/CampaignCard";

import styles from "./CampaignList.module.scss";
import { CampaignType } from "@shared/types";

const exampleCampaigns: CampaignType[] = [
  {
    name: "Summer Sale NYC",
    keyWords: ["summer", "sale", "clothing"],
    bidAmount: 0.5,
    campaignFund: 100,
    isActive: true,
    town: "us-nyc",
    radiusInKm: 15,
  },
  {
    name: "Berlin Electronics Promo",
    keyWords: ["electronics", "gadgets", "discount"],
    bidAmount: 0.75,
    campaignFund: 200,
    isActive: true,
    town: "eu-ber",
    radiusInKm: 20,
  },
  {
    name: "Tokyo Fashion Week",
    keyWords: ["fashion", "tokyo", "runway"],
    bidAmount: 1.2,
    campaignFund: 150,
    isActive: false,
    town: "asia-tok",
    radiusInKm: 10,
  },
  {
    name: "London Books Push",
    keyWords: ["books", "reading", "education"],
    bidAmount: 0.3,
    campaignFund: 80,
    isActive: true,
    town: "eu-lon",
    radiusInKm: 25,
  },
  {
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
  return (
    <MainLayout className={styles.list}>
      {exampleCampaigns.map((c) => (
        <CampaignCard campaign={c} />
      ))}
    </MainLayout>
  );
};

export default CampaignList;
