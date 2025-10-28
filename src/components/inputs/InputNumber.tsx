import { type InputHTMLAttributes, type ChangeEvent } from "react";

import type { Field, UpdateField } from "@hooks/useJafh";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  field: Field<string>;
  updateField: UpdateField<string>;
};

const InputNumber = ({ id, field, updateField, ...attr }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[\d,]*$/.test(newValue)) {
      updateField(id, newValue);
    }
  };

  return (
    <input
      id={id}
      name={id}
      type="text"
      inputMode="numeric"
      pattern="[0-9,]*"
      aria-label="Digite um número"
      value={field.value}
      onChange={handleChange}
      {...attr}
    />
  );
};

export default InputNumber;
