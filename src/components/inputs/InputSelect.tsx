import type { ChangeEvent, HTMLAttributes } from "react";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

type Props = HTMLAttributes<HTMLSelectElement> & {
  className: string;
  options: {
    value: string;
    label: string;
  }[];
  id: string;
  field: JafhField<string>;
  updateField: JafhUpdateField<string>;
};

const InputSelect = ({
  className,
  options,
  id,
  field,
  updateField,
  ...attr
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateField(id, e.target.value);
  };

  return (
    <select
      className={className}
      id={id}
      name={id}
      onChange={handleChange}
      value={field.value}
      {...attr}
    >
      {options.map(({ value, label }) => (
        <option value={value} key={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
