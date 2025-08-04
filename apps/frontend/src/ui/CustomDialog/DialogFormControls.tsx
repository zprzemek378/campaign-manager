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

type DialogInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

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
  ({ className, error, ...props }, ref) => (
    <div className={styles.InputWrapper}>
      <input
        ref={ref}
        className={`${styles.Input} ${className ?? ""} ${error ? styles.InputError : ""}`}
        {...props}
      />

      {error && <span className={styles.ErrorMessage}>{error}</span>}
    </div>
  )
);
DialogInput.displayName = "DialogInput";
