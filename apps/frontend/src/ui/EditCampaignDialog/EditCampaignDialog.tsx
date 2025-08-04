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
import {
  CampaignErrorsType,
  CampaignFormState,
  decimalFields,
  dialogProps,
  emptyCampaign,
  emptyCampaignErrors,
  handleNumericInput,
} from "./helpers";

type EditCampaignDialogProps =
  | {
      isCreating: true;
      campaign?: CampaignType;
      onSave: (newCampaign: CampaignType) => boolean | void;
      triggerElement: React.ReactNode;
    }
  | {
      isCreating?: false;
      campaign: CampaignType;
      onSave: (updated: CampaignType) => boolean | void;
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
  const [errors, setErrors] = useState<CampaignErrorsType>({
    ...emptyCampaignErrors,
  });

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

      if (!onSave(parsedForm)) {
        setErrors((prev) => ({
          ...prev,
          campaignFund: "Exceeded available gem quantity",
        }));
        return;
      }

      setOpen(false);
      setErrors({ ...emptyCampaignErrors });
      if (isCreating) setForm({ ...emptyCampaign });
    }
  };

  const isValid = () => {
    const newErrors: CampaignErrorsType = { ...emptyCampaignErrors };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.keyWords.length) {
      newErrors.keyWords = "You have to add at least 1 keyword";
      isValid = false;
    }

    const bidAmount = parseFloat(form.bidAmount);
    if (isNaN(bidAmount) || bidAmount < 0.1) {
      newErrors.bidAmount = "Bid amount must be at least 0.1";
      isValid = false;
    }

    const campaignFund = parseFloat(form.campaignFund);
    if (isNaN(campaignFund) || campaignFund <= 0) {
      newErrors.campaignFund = "Campaign fund must be greater than 0";
      isValid = false;
    }

    const radius = parseFloat(form.radiusInKm);
    if (isNaN(radius) || radius <= 0) {
      newErrors.radiusInKm = "Radius must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetKeyWordError = () => {
    setErrors((prev) => ({ ...prev, keyWords: "" }));
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
            error={errors.name}
            required
          />
        </DialogFieldset>

        <Keywords
          value={form.keyWords}
          onChange={(newKeywords) =>
            setForm((prev) => ({ ...prev, keyWords: newKeywords }))
          }
          error={errors.keyWords}
          resetError={resetKeyWordError}
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
            error={errors.bidAmount}
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
            error={errors.campaignFund}
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
            error={errors.radiusInKm}
            required
          />
        </DialogFieldset>
      </form>
    </CustomDialog>
  );
};

export default EditCampaignDialog;
