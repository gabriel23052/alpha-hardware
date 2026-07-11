import classes from "./AuthNotice.module.css";

type Props = {
  children: string;
};

const AuthNotice = ({ children }: Props) => {
  return (
    <p
      className={`text-default dneutral ${classes.container}`}
    >
      <span className="text-default-b">Importante:</span> {children}
    </p>
  );
};

export default AuthNotice;

