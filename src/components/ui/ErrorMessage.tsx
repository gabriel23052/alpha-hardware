import classes from "./ErrorMessage.module.css";

type Props = {
  blockMarginRem?: number;
  children: string;
};

const DEFAULT_BLOCK_MARGIN = 4;

const ErrorMessage = ({ blockMarginRem, children }: Props) => {
  return (
    <div
      className={classes.container}
      style={{
        marginBlock: `${blockMarginRem?.toString() || DEFAULT_BLOCK_MARGIN}rem`,
      }}
    >
      <p className="text-large-m primary">Ops! Parece que algo deu errado 🙁</p>
      <p className="text-default dneutral">{children}</p>
    </div>
  );
};

export default ErrorMessage;
