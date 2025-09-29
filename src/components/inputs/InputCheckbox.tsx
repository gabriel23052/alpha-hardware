import React from "react";

type InputCheckboxProps = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  value: IFormValue<string[]>;
  handler: (id: string, value: IJsonValue) => void;
};

const InputCheckbox = ({
  containerClassName,
  labelStyles,
  id,
  options,
  value,
  handler,
}: InputCheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.id.split("-").pop()!;
    if (value.value.includes(val)) {
      handler(
        id,
        value.value.filter((v) => v !== val)
      );
      return;
    }
    handler(id, [...value.value, val]);
  };

  return (
    <div className={`${containerClassName} ${labelStyles}`}>
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={`${id}-${option.value}`}
          className={`${value.value.includes(option.value) ? "selected" : ""}`}
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
    </div>
  );
};

export default InputCheckbox;
