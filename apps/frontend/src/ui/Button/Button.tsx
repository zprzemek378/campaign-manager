import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "accent" | "outlined";

export type ButtonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={clsx(styles.button, styles[variant])} {...props}>
      {children}
    </button>
  );
};
