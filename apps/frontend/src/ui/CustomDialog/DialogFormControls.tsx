import clsx from "clsx";
import styles from "./CustomDialog.module.scss";
import React from "react";

type DialogFieldsetProps = {
  children?: React.ReactNode;
  reduceMarginBottom?: boolean;
};

type DialogLabelProps = {
  htmlFor?: string;
  children?: React.ReactNode;
};

type DialogInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const DialogFieldset = ({
  children,
  reduceMarginBottom = false,
}: DialogFieldsetProps) => (
  <fieldset
    className={clsx(
      styles.Fieldset,
      reduceMarginBottom && styles.reduceMarginBottom
    )}
  >
    {children}
  </fieldset>
);

export const DialogLabel = ({ htmlFor, children }: DialogLabelProps) => (
  <label className={styles.Label} htmlFor={htmlFor}>
    {children}
  </label>
);

export const DialogInput = React.forwardRef<HTMLInputElement, DialogInputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`${styles.Input} ${className ?? ""}`}
      {...props}
    />
  )
);
DialogInput.displayName = "DialogInput";
