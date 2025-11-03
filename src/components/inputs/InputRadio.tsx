import { type ChangeEvent } from "react";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

type Props = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  field: JafhField<string>;
  updateField: JafhUpdateField<string>;
};

const InputRadio = ({
  containerClassName,
  labelStyles,
  id,
  options,
  field,
  updateField,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateField(id, e.target.id.split("-").pop()!);
  };

  return (
    <fieldset className={`${containerClassName ?? ""} ${labelStyles ?? ""}`}>
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={`${id}-${option.value}`}
          className={`${field.value === option.value ? "selected" : ""}`}
        >
          <input
            type="radio"
            name={id}
            id={`${id}-${option.value}`}
            onChange={handleChange}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
};

export default InputRadio;
