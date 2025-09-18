import React from "react";

type InputRadioProps = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  handler: (id: string, value: string) => void;
};

const InputRadio = ({
  containerClassName,
  labelStyles,
  id,
  options,
  handler,
}: InputRadioProps) => {
  const [selection, setSelection] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelection(e.target.id);
    handler(id, e.target.id);
  };

  return (
    <div className={`${containerClassName} ${labelStyles}`}>
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className={`${selection === option.value ? "selected" : ""}`}
        >
          <input
            type="radio"
            name={id}
            id={option.value}
            onChange={handleChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default InputRadio;
