import styles from "./CustomDialog.module.scss";
import React from "react";

export const DialogFieldset = ({ children }: { children: React.ReactNode }) => (
  <fieldset className={styles.Fieldset}>{children}</fieldset>
);

export const DialogLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label className={styles.Label} htmlFor={htmlFor}>
    {children}
  </label>
);

export const DialogInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} className={styles.Input} {...props} />);
DialogInput.displayName = "DialogInput";
