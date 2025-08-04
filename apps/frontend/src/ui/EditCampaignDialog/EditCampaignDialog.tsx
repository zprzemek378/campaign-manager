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
import Keywords from "./components/Keywords/Keywords";

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

type CampaignFormState = Omit<
  CampaignType,
  "bidAmount" | "campaignFund" | "radiusInKm"
> & {
  bidAmount: string;
  campaignFund: string;
  radiusInKm: string;
};

const decimalFields = ["bidAmount", "campaignFund", "radiusInKm"];

const emptyCampaign: CampaignFormState = {
  id: "",
  name: "",
  keyWords: [],
  bidAmount: "",
  campaignFund: "",
  isActive: false,
  town: TOWNS[0].id,
  radiusInKm: "",
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
  const [form, setForm] = useState<CampaignFormState>(
    isCreating
      ? { ...emptyCampaign }
      : {
          ...campaign!,
          bidAmount: campaign!.bidAmount.toString(),
          campaignFund: campaign!.campaignFund.toString(),
          radiusInKm: campaign!.radiusInKm.toString(),
        }
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [isKeywordError, setIsKeywordError] = useState(false);

  const handleNumericInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = (e.nativeEvent as InputEvent).data;

    const isAllowed = input === null || /^[0-9.,]$/.test(input);

    if (!isAllowed) {
      e.preventDefault();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let sanitizedValue: string | boolean = value;

    if (type === "checkbox") {
      sanitizedValue = (e.target as HTMLInputElement).checked;
    } else if (decimalFields.includes(name)) {
      sanitizedValue = value.replace(",", ".");
    }

    setForm((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSave = () => {
    if (isValid()) {
      const parsedForm: CampaignType = {
        ...form,
        bidAmount: parseFloat(form.bidAmount as string),
        campaignFund: parseFloat(form.campaignFund as string),
        radiusInKm: parseFloat(form.radiusInKm as string),
      };

      onSave(parsedForm);
      setOpen(false);
    }
  };

  const isValid = () => {
    if (!form.keyWords.length) {
      setIsKeywordError(true);
      return false;
    }

    return true;
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

        <Keywords
          value={form.keyWords}
          onChange={(newKeywords) =>
            setForm((prev) => ({ ...prev, keyWords: newKeywords }))
          }
          isKeywordError={isKeywordError}
        />

        <DialogFieldset>
          <DialogLabel htmlFor="bidAmount">Bid amount</DialogLabel>
          <DialogInput
            id="bidAmount"
            name="bidAmount"
            type="text"
            inputMode="decimal"
            pattern="^\d*\.?\d*$"
            value={form.bidAmount}
            onChange={handleChange}
            onBeforeInput={handleNumericInput}
            required
          />
        </DialogFieldset>
        <DialogFieldset>
          <DialogLabel htmlFor="campaignFund">Campaign fund</DialogLabel>
          <DialogInput
            id="campaignFund"
            name="campaignFund"
            type="text"
            inputMode="decimal"
            pattern="^\d*\.?\d*$"
            value={form.campaignFund}
            onChange={handleChange}
            onBeforeInput={handleNumericInput}
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
            type="text"
            inputMode="decimal"
            pattern="^\d*\.?\d*$"
            value={form.radiusInKm}
            onChange={handleChange}
            onBeforeInput={handleNumericInput}
            required
          />
        </DialogFieldset>
      </form>
    </CustomDialog>
  );
};

export default EditCampaignDialog;
