import { CampaignType } from "@shared/types";

// TODO move to env
const API_URL = "http://localhost:3001/api";

export const campaignApi = {
  getAllCampaigns: async (): Promise<CampaignType[]> => {
    const response = await fetch(`${API_URL}/campaigns`);
    if (!response.ok) {
      throw new Error("Failed to fetch campaigns");
    }
    return response.json();
  },

  getCampaign: async (id: string): Promise<CampaignType> => {
    const response = await fetch(`${API_URL}/campaigns/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch campaign");
    }
    return response.json();
  },

  createCampaign: async (
    campaign: Omit<CampaignType, "id">
  ): Promise<CampaignType> => {
    const response = await fetch(`${API_URL}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaign),
    });
    if (!response.ok) {
      throw new Error("Failed to create campaign");
    }
    return response.json();
  },

  updateCampaign: async (
    id: string,
    updates: Partial<CampaignType>
  ): Promise<CampaignType> => {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update campaign");
    }
    return response.json();
  },

  deleteCampaign: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/campaigns/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete campaign");
    }
  },
};
