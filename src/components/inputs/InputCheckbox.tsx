import type { Field, UpdateField } from "@hooks/useJafh";
import { type ChangeEvent } from "react";

type Props = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  field: Field<string[]>;
  updateField: UpdateField<string[]>;
};

const InputCheckbox = ({
  containerClassName,
  labelStyles,
  id,
  options,
  field,
  updateField,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id.split("-").pop()!;
    if (field.value.includes(value)) {
      updateField(
        id,
        field.value.filter((v) => v !== value)
      );
      return;
    }
    updateField(id, [...field.value, value]);
  };

  return (
    <fieldset className={`${containerClassName} ${labelStyles}`}>
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={`${id}-${option.value}`}
          className={`${field.value.includes(option.value) ? "selected" : ""}`}
        >
          <input
            type="checkbox"
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

export default InputCheckbox;
