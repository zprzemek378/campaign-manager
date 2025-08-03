import MainLayout from "../../layouts/MainLayout/MainLayout";
import CampaignCard from "./components/CampaignCard/CampaignCard";

import styles from "./CampaignList.module.scss";
import { CampaignType } from "@shared/types";
import { useState } from "react";
import { Button } from "@ui/Button/Button";

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
  {
    id: "1a23bc45-6789-4def-8123-456789abcdef",
    name: "Paris Gourmet Week",
    keyWords: ["food", "gourmet", "wine"],
    bidAmount: 0.8,
    campaignFund: 180,
    isActive: true,
    town: "eu-par",
    radiusInKm: 12,
  },
  {
    id: "2b34cd56-7890-4abc-9234-567890abcdef",
    name: "Sydney Tech Expo",
    keyWords: ["technology", "expo", "innovation"],
    bidAmount: 1.0,
    campaignFund: 250,
    isActive: false,
    town: "au-syd",
    radiusInKm: 18,
  },
  {
    id: "3c45de67-8901-4bcd-0345-678901abcdef",
    name: "Toronto Winter Gear",
    keyWords: ["winter", "clothing", "outdoor"],
    bidAmount: 0.55,
    campaignFund: 130,
    isActive: true,
    town: "ca-tor",
    radiusInKm: 22,
  },
  {
    id: "4d56ef78-9012-4cde-1456-789012abcdef",
    name: "Madrid Art Fiesta",
    keyWords: ["art", "festival", "culture"],
    bidAmount: 0.7,
    campaignFund: 160,
    isActive: true,
    town: "eu-mad",
    radiusInKm: 14,
  },
  {
    id: "5e67fa89-0123-4def-2567-890123abcdef",
    name: "Dubai Luxury Cars",
    keyWords: ["luxury", "cars", "expo"],
    bidAmount: 1.5,
    campaignFund: 300,
    isActive: false,
    town: "me-dxb",
    radiusInKm: 25,
  },
  {
    id: "6f78ab90-1234-4fab-3678-901234abcdef",
    name: "Rome Pasta Lovers",
    keyWords: ["pasta", "italian", "food"],
    bidAmount: 0.4,
    campaignFund: 90,
    isActive: true,
    town: "eu-rom",
    radiusInKm: 10,
  },
  {
    id: "7a89bc01-2345-4cba-4789-012345abcdef",
    name: "Chicago Jazz Nights",
    keyWords: ["music", "jazz", "festival"],
    bidAmount: 0.65,
    campaignFund: 140,
    isActive: true,
    town: "us-chi",
    radiusInKm: 20,
  },
  {
    id: "8b90cd12-3456-4dab-5890-123456abcdef",
    name: "Seoul Gaming Marathon",
    keyWords: ["gaming", "esports", "technology"],
    bidAmount: 1.3,
    campaignFund: 220,
    isActive: false,
    town: "asia-seo",
    radiusInKm: 15,
  },
  {
    id: "9c01de23-4567-4ebc-6901-234567abcdef",
    name: "Cape Town Surf Fest",
    keyWords: ["surfing", "beach", "festival"],
    bidAmount: 0.5,
    campaignFund: 110,
    isActive: true,
    town: "af-ct",
    radiusInKm: 17,
  },
  {
    id: "0d12ef34-5678-4fcd-7012-345678abcdef",
    name: "Bangkok Street Food Tour",
    keyWords: ["street food", "thai", "culture"],
    bidAmount: 0.45,
    campaignFund: 100,
    isActive: true,
    town: "asia-bkk",
    radiusInKm: 8,
  },
];

const CampaignList = () => {
  const [currentlyExpanded, setCurrentlyExpanded] = useState<string | null>(
    null
  );

  return (
    <MainLayout>
      <div className={styles.headerWrapper}>
        <h2>Campaign List</h2>
        <Button variant="primary">Add new campaign</Button>
      </div>
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
