import { TOWNS } from "@shared/constants";
import { CampaignType } from "@shared/types";
import CustomDialog from "@ui/CustomDialog/CustomDialog";
import {
  DialogFieldset,
  DialogInput,
  DialogLabel,
} from "@ui/CustomDialog/DialogFormControls";
import { useState, useRef } from "react";
import ToggleCheckbox from "@ui/ToggleCheckbox/ToggleCheckbox";

const dialogProps = {
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

const emptyCampaign: CampaignType = {
  id: "",
  name: "",
  keyWords: [],
  bidAmount: 0,
  campaignFund: 0,
  isActive: false,
  town: TOWNS[0].id,
  radiusInKm: 0,
};

type EditCampaignDialogProps =
  | {
      isCreating: true;
      campaign?: CampaignType;
      onSave: (newCampaign: CampaignType) => void;
      triggerElement: React.ReactNode;
    }
  | {
      isCreating?: false;
      campaign: CampaignType;
      onSave: (updated: CampaignType) => void;
      triggerElement: React.ReactNode;
    };

const EditCampaignDialog = ({
  campaign,
  onSave,
  isCreating = false,
  triggerElement,
}: EditCampaignDialogProps) => {
  const [form, setForm] = useState<CampaignType>(
    isCreating ? { ...emptyCampaign } : { ...campaign! }
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev: CampaignType) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: CampaignType) => ({
      ...prev,
      keyWords: e.target.value.split(",").map((kw) => kw.trim()),
    }));
  };

  const handleSave = () => {
    onSave(form);
    setOpen(false);
  };

  return (
    <CustomDialog
      triggerElement={triggerElement}
      {...dialogProps[String(isCreating) as "true" | "false"]}
      formRef={formRef}
      open={open}
      onOpenChange={setOpen}
    >
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <DialogFieldset>
          <DialogLabel htmlFor="name">Name</DialogLabel>
          <DialogInput
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="keyWords">Keywords</DialogLabel>
          <DialogInput
            id="keyWords"
            name="keyWords"
            value={form.keyWords.join(", ")}
            onChange={handleKeywordsChange}
            placeholder="np. summer, sale, clothing"
          />
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="bidAmount">Bid amount</DialogLabel>
          <DialogInput
            id="bidAmount"
            name="bidAmount"
            type="number"
            min={0}
            value={form.bidAmount}
            onChange={handleChange}
            required
          />
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="campaignFund">Campaign fund</DialogLabel>
          <DialogInput
            id="campaignFund"
            name="campaignFund"
            type="number"
            min={0}
            value={form.campaignFund}
            onChange={handleChange}
            required
          />
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="isActive">Active</DialogLabel>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <ToggleCheckbox
              checked={form.isActive}
              onChange={(checked) =>
                setForm((prev) => ({ ...prev, isActive: checked }))
              }
              ariaLabel="Toggle campaign active"
            />
          </div>
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="town">Town</DialogLabel>
          <select
            id="town"
            name="town"
            value={form.town}
            onChange={handleChange}
            style={{ flex: 1, height: 35, borderRadius: 4, fontSize: 15 }}
          >
            {TOWNS.map((town: { id: string; name: string }) => (
              <option key={town.id} value={town.id}>
                {town.name}
              </option>
            ))}
          </select>
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="radiusInKm">Radius (km)</DialogLabel>
          <DialogInput
            id="radiusInKm"
            name="radiusInKm"
            type="number"
            min={0}
            value={form.radiusInKm}
            onChange={handleChange}
            required
          />
        </DialogFieldset>
      </form>
    </CustomDialog>
  );
};

export default EditCampaignDialog;
