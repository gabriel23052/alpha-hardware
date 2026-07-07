import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

import classes from "./InputDefault.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  label: string;
  id: string;
  field: JafhField<string>;
  updateField: JafhUpdateField<string>;
};

const InputDefault = ({
  containerClassName,
  label,
  id,
  field,
  updateField,
  ...attr
}: Props) => {
  const [showError, setShowError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateField(id, e.currentTarget.value);
  };

  const handleBlur = () => {
    setShowError(true);
  };

  return (
    <div className={`${classes.container} ${containerClassName ?? ""}`}>
      <label className="text-default dneutral" htmlFor={id}>
        {label}
      </label>
      <input
        className="text-default dneutral-light bg-lneutral-xlight"
        id={id}
        name={id}
        value={field.value}
        onBlur={handleBlur}
        onChange={handleChange}
        {...attr}
      />
      {field.error && showError && (
        <p className="text-small feedback-negative">{field.error}</p>
      )}
    </div>
  );
};

export default InputDefault;
