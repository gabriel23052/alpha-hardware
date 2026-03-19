import classes from "./ErrorMessage.module.css";

type Props = {
  children: string;
};

const ErrorMessage = ({ children }: Props) => {
  return (
    <div className={`${classes.container}`}>
      <p className={`text-large-m primary`}>
        Ops! Parece que algo deu errado 🙁
      </p>
      <p className={`text-default dneutral`}>{children}</p>
    </div>
  );
};

export default ErrorMessage;
