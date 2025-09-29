import {type ChangeEvent} from "react";

type Props = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  field: IFormField<string>;
  fieldHandler: (id: string, value: IJsonValue) => void;
};

const InputRadio = ({
  containerClassName,
  labelStyles,
  id,
  options,
  field,
  fieldHandler,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldHandler(id, e.target.id.split("-").pop()!);
  };

  return (
    <div className={`${containerClassName ?? ""} ${labelStyles ?? ""}`}>
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
    </div>
  );
};

export default InputRadio;
