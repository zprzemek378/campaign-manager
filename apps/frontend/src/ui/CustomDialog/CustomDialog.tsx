import * as React from "react";
import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "./CustomDialog.module.scss";
import clsx from "clsx";

type CustomDialogProps = {
  triggerElement: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  saveText: string;
};

const CustomDialog = ({
  triggerElement,
  title,
  description,
  children,
  saveText,
}: CustomDialogProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.DialogOverlay} />
      <Dialog.Content className={styles.DialogContent}>
        {title && (
          <Dialog.Title className={styles.DialogTitle}>{title}</Dialog.Title>
        )}
        {description && (
          <Dialog.Description className={styles.DialogDescription}>
            {description}
          </Dialog.Description>
        )}
        {children}
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Dialog.Close asChild>
            <button className={clsx(styles.Button, styles.green)}>
              {saveText}
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CustomDialog;
