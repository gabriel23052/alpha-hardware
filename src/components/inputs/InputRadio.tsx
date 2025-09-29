import React from "react";

type InputRadioProps = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  value: IFormValue<string>;
  handler: (id: string, value: IJsonValue) => void;
};

const InputRadio = ({
  containerClassName,
  labelStyles,
  id,
  options,
  value,
  handler,
}: InputRadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(id, e.target.id.split("-").pop()!);
  };

  return (
    <div className={`${containerClassName ?? ""} ${labelStyles ?? ""}`}>
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={`${id}-${option.value}`}
          className={`${value.value === option.value ? "selected" : ""}`}
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
    </div>
  );
};

export default InputRadio;
