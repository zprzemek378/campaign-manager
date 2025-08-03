import MainLayout from "../../layouts/MainLayout/MainLayout";
import CampaignCard from "./components/CampaignCard/CampaignCard";

import styles from "./CampaignList.module.scss";
import { CampaignType } from "@shared/types";
import { useState, useEffect } from "react";
import { Button } from "@ui/Button/Button";
import EditCampaignDialog from "../../ui/EditCampaignDialog/EditCampaignDialog";
import { campaignApi } from "../../api/campaign.api";
import DataStatusMessage from "./components/DataStatusMessage/DataStatusMessage";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // TODO add error component
  const [error, setError] = useState<string | null>(null);
  const [currentlyExpanded, setCurrentlyExpanded] = useState<string | null>(
    null
  );

  const fetchCampaigns = async () => {
    try {
      const data = await campaignApi.getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch campaigns"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (
    newCampaign: Omit<CampaignType, "id">
  ) => {
    try {
      await campaignApi.createCampaign(newCampaign);
      fetchCampaigns();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create campaign"
      );
    }
  };

  const handleUpdateCampaign = async (
    id: string,
    updates: Partial<CampaignType>
  ) => {
    try {
      await campaignApi.updateCampaign(id, updates);
      fetchCampaigns();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update campaign"
      );
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      await campaignApi.deleteCampaign(id);
      fetchCampaigns();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete campaign"
      );
    }
  };

  return (
    <MainLayout>
      <div className={styles.headerWrapper}>
        <h2>Campaign List</h2>

        <EditCampaignDialog
          triggerElement={
            <Button disabled={isLoading} variant="primary">
              Add new campaign
            </Button>
          }
          isCreating
          onSave={handleCreateCampaign}
        />
      </div>
      <div className={styles.list}>
        {isLoading || !campaigns.length ? (
          <DataStatusMessage type={isLoading ? "loading" : "empty"} />
        ) : (
          campaigns.map((c) => (
            <CampaignCard
              key={c.id}
              campaign={c}
              expanded={currentlyExpanded === c.id}
              setCurrentlyExpanded={setCurrentlyExpanded}
              onUpdate={(updates) => handleUpdateCampaign(c.id, updates)}
              onDelete={() => handleDeleteCampaign(c.id)}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default CampaignList;
