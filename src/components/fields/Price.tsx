import { type InputHTMLAttributes } from "react";

import { useFieldContext } from "@lib/form/formContexts";

import classes from "./Price.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Price = ({ label, ...attr }: Props) => {
  const field = useFieldContext<string>();

  return (
    <div className={classes.container}>
      <label className="text-small dneutral" htmlFor={field.name}>
        {label}
      </label>
      <input
        className="text-small dneutral bg-lneutral-xlight"
        id={field.name}
        name={field.name}
        type="text"
        inputMode="numeric"
        pattern="[0-9,]*"
        placeholder="0,00"
        maxLength={8}
        autoComplete="off"
        aria-label="Digite um preço"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const newValue = e.target.value;
          if (/^[\d,]*$/.test(newValue)) {
            field.handleChange(newValue);
          }
        }}
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

export default Price;
