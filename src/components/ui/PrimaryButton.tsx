import { type ButtonHTMLAttributes } from "react";

import classes from "./PrimaryButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: string;
};

const PrimaryButton = ({ children, className, ...attr }: Props) => {
  return (
    <button
      className={`lneutral-xlight bg-primary text-default-b ${classes.button} ${className ?? ""}`}
      {...attr}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
