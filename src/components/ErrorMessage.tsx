import classes from "./Error.module.css";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={`${classes.container}`}>
      <h3 className={`text-large-m primary`}>
        Ops! Parece que algo deu errado 🙁
      </h3>
      <span className={`text-default dneutral`}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
