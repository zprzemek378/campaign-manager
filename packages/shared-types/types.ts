import { TOWNS } from "constants";

export type TownId = (typeof TOWNS)[number]["id"];

export interface CampaignType {
  id: string;
  name: string;
  keyWords: string[];
  bidAmount: number;
  campaignFund: number;
  isActive: boolean;
  town: TownId;
  radiusInKm: number;
}
