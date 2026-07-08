import { type ButtonHTMLAttributes } from "react";

import classes from "./FormButton.module.css";

type FormButtonState = "disable" | "enable" | "loading";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  state: FormButtonState;
  children: string;
};

const FormButton = ({ children, className, state, ...attr }: Props) => {
  const disabled = attr.disabled || state === "disable" || state === "loading";

  return (
    <button
      className={`text-default-b lneutral-xlight bg-primary ${classes.button} ${className ?? ""}`}
      data-state={state}
      {...attr}
      disabled={disabled}
    >
      {state === "loading" ? (
        <span className={classes.spinner} aria-hidden="true" />
      ) : (
        children
      )}
    </button>
  );
};

export default FormButton;
