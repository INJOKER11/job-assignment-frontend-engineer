import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { children } = props;
  // btn btn-outline-primary btn-sm pull-xs-right
  return (
    <button className={styles.btnOutlinePrimary}>
      {children}
    </button>
  );
}
