import type { InputHTMLAttributes } from "react";

import { useFieldContext } from "@lib/form/formContexts";

import classes from "./Text.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
};

const Text = ({ label, className, ...attr }: Props) => {
  const field = useFieldContext<string>();

  return (
    <div className={`${classes.container} ${className || ""}`}>
      <label className="text-default dneutral" htmlFor={field.name}>
        {label}
      </label>
      <input
        className="text-default dneutral-light bg-lneutral-xlight"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...attr}
      />
      {!field.state.meta.isValid && field.state.meta.isBlurred && (
        <em className="text-small feedback-negative">
          {field.state.meta.errors.join(", ")}
        </em>
      )}
    </div>
  );
};

export default Text;
