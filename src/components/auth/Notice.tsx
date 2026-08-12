import classes from "./Notice.module.css";

type Props = {
  children: string;
};

const Notice = ({ children }: Props) => {
  return (
    <p className={`text-default dneutral ${classes.container}`}>
      <span className="text-default-b">Importante:</span> {children}
    </p>
  );
};

export default Notice;
