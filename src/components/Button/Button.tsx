import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: "sm" | "lg";
  skin?: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  const { children, size = "sm", className, skin = "primary", ...rest } = props;
  // btn btn-outline-primary btn-sm pull-xs-right
  return (
    <button {...rest} className={clsx(
      styles.button,
      styles[`btn${size === "sm" ? "Sm" : "Lg"}`],
      skin === "primary"
        ? styles.btnPrimary
        : styles.btnSecondary,
      className
    )
    }>
      {children}
    </button>
  );
}
