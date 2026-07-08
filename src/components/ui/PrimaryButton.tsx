import { type ButtonHTMLAttributes } from "react";

import classes from "./PrimaryButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: string;
};

const PrimaryButton = ({ children, className, ...attr }: Props) => {
  return (
    <button
      className={`text-default-b lneutral-xlight bg-primary ${classes.button} ${className ?? ""}`}
      {...attr}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
