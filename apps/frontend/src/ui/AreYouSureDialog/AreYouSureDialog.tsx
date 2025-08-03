import CustomDialog from "@ui/CustomDialog/CustomDialog";
import { useRef } from "react";

type AreYouSureDialogProps = {
  triggerElement: React.ReactNode;
  onConfirm: () => void;
  itemName?: string;
};

const AreYouSureDialog = ({
  triggerElement,
  onConfirm,
  itemName,
}: AreYouSureDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <CustomDialog
      triggerElement={triggerElement}
      title="Confirm deletion"
      description={`Are you sure you want to delete ${itemName ? `"${itemName}"` : "this item"}? This action cannot be undone.`}
      saveText="Delete"
      formRef={formRef}
    >
      <form ref={formRef} onSubmit={handleSubmit} />
    </CustomDialog>
  );
};

export default AreYouSureDialog;
