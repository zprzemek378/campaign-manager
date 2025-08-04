import { TOWNS } from "@shared/constants";
import { CampaignType } from "@shared/types";

export const dialogProps = {
  false: {
    title: "Edit Campaign",
    description: "Modify the campaign details and save your changes.",
    saveText: "Save Changes",
  },
  true: {
    title: "Create Campaign",
    description: "Fill in the details to create a new campaign.",
    saveText: "Create Campaign",
  },
};

export type CampaignFormState = Omit<
  CampaignType,
  "bidAmount" | "campaignFund" | "radiusInKm"
> & {
  bidAmount: string;
  campaignFund: string;
  radiusInKm: string;
};

export const decimalFields = ["bidAmount", "campaignFund", "radiusInKm"];

export const emptyCampaign: CampaignFormState = {
  id: "",
  name: "",
  keyWords: [],
  bidAmount: "",
  campaignFund: "",
  isActive: false,
  town: TOWNS[0].id,
  radiusInKm: "",
};

export type CampaignErrorsType = Record<keyof CampaignType, string>;

export const emptyCampaignErrors: CampaignErrorsType = {
  id: "",
  name: "",
  keyWords: "",
  bidAmount: "",
  campaignFund: "",
  isActive: "",
  town: "",
  radiusInKm: "",
};

export const handleNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
  const input = (e.nativeEvent as InputEvent).data;

  const isAllowed = input === null || /^[0-9.,]$/.test(input);

  if (!isAllowed) {
    e.preventDefault();
  }
};
