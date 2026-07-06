import classes from "./UnderlinedTitle.module.css";

const UnderlinedTitle = ({
  className,
  align,
  children,
}: {
  className?: string,
  align: "left" | "center" | "right";
  children: string;
}) => {
  return (
    <div className={`${classes.container} ${className}`} style={{ justifyContent: align }}>
      <h2
        className={`dneutral-dark text-large ${classes.underlinedTitle}`}
      >
        {children}
      </h2>
    </div>
  );
};

export default UnderlinedTitle;
