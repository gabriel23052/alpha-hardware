import { type ChangeEvent } from "react";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

type Props = {
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  field: JafhField<string>;
  updateField: JafhUpdateField<string>;
};

const InputRadio = ({
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
    <>
      {options.map((option) => (
        <label
          className={`${labelStyles ?? ""} ${
            field.value === option.value ? "selected" : ""
          }`}
          key={option.value}
          htmlFor={`${id}-${option.value}`}
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
    </>
  );
};

export default InputRadio;
