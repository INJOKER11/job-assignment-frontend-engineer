import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(({className, ...props}, ref) => {

  return <input ref={ref} className={clsx(styles.input, className)} {...props} />
}
);
Input.displayName = "Input";

export default Input;
