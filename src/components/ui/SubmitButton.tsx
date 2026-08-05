import { type ButtonHTMLAttributes } from "react";

import classes from "./SubmitButton.module.css";
import { useFormContext } from "../../lib/form/formContexts";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: string;
};

const SubmitButton = ({ children, className, ...attr }: Props) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [
        state.isValid,
        state.isPristine,
        state.isSubmitting,
      ]}
    >
      {([isValid, isPristine, isSubmitting]) => (
        <button
          type="submit"
          className={`text-default-b lneutral-xlight bg-primary ${classes.button} ${className ?? ""}`}
          disabled={!isValid || isPristine || isSubmitting}
          data-issubmitting={isSubmitting}
          {...attr}
        >
          {isSubmitting ? (
            <span className={classes.spinner} aria-hidden="true" />
          ) : (
            children
          )}
        </button>
      )}
    </form.Subscribe>
  );
};

export default SubmitButton;

