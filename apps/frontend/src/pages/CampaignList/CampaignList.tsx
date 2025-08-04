import MainLayout from "../../layouts/MainLayout/MainLayout";
import CampaignCard from "./components/CampaignCard/CampaignCard";

import styles from "./CampaignList.module.scss";
import { CampaignType } from "@shared/types";
import { useState, useEffect } from "react";
import { Button } from "@ui/Button/Button";
import EditCampaignDialog from "../../ui/EditCampaignDialog/EditCampaignDialog";
import { campaignApi } from "../../api/campaign.api";
import DataStatusMessage from "./components/DataStatusMessage/DataStatusMessage";

type CampaignListProps = {
  gemQuantity: number;
  reduceGemQuantity: (quantity: number) => boolean;
};

const CampaignList = ({
  gemQuantity,
  reduceGemQuantity,
}: CampaignListProps) => {
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
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

  const attemptCreateCampaign = (newCampaign: Omit<CampaignType, "id">) => {
    if (!reduceGemQuantity(newCampaign.campaignFund)) return false;

    handleCreateCampaign(newCampaign);
    return true;
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

  const attemptUpdateCampaign = (
    id: string,
    updates: Partial<CampaignType>
  ): boolean => {
    if (updates.campaignFund !== undefined) {
      const previousCampaignFund = campaigns.find(
        (c) => c.id === id
      )?.campaignFund;
      if (!previousCampaignFund) return false;

      const newCampaignFund = updates.campaignFund;
      const difference = newCampaignFund - previousCampaignFund;

      if (!reduceGemQuantity(difference)) return false;
    }

    handleUpdateCampaign(id, updates);

    return true;
  };

  const handleDeleteCampaign = async (id: string) => {
    const foundCampaign = campaigns.find((c) => c.id === id);
    if (foundCampaign) {
      reduceGemQuantity(-foundCampaign.campaignFund);
    }

    try {
      await campaignApi.deleteCampaign(id);
      fetchCampaigns();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete campaign"
      );
    }
  };

  const renderCampaignListContent = () => {
    if (isLoading) {
      return <DataStatusMessage type="loading" />;
    }

    if (error) {
      return <DataStatusMessage type="error" error={error} />;
    }

    if (!campaigns.length) {
      return <DataStatusMessage type="empty" />;
    }

    return campaigns.map((c) => (
      <CampaignCard
        key={c.id}
        campaign={c}
        expanded={currentlyExpanded === c.id}
        setCurrentlyExpanded={setCurrentlyExpanded}
        onUpdate={(updates) => attemptUpdateCampaign(c.id, updates)}
        onDelete={() => handleDeleteCampaign(c.id)}
      />
    ));
  };

  return (
    <MainLayout gemQuantity={gemQuantity}>
      <div className={styles.headerWrapper}>
        <h2>Campaign List</h2>

        <EditCampaignDialog
          triggerElement={
            <Button disabled={isLoading} variant="primary">
              Add new campaign
            </Button>
          }
          isCreating
          onSave={attemptCreateCampaign}
        />
      </div>
      <div className={styles.list}>{renderCampaignListContent()}</div>
    </MainLayout>
  );
};

export default CampaignList;
