import SVGAlert from "@svg/alert.svg?react";

import classes from "./Alert.module.css";

type Props = { children: string; className?: string };

const Alert = ({ children, className }: Props) => {
  return (
    <div className={`${classes.container} ${className}`}>
      <SVGAlert aria-hidden="true" width={24} height={24}/>
      <p className="text-default feedback-negative">{children}</p>
    </div>
  );
};

export default Alert;
