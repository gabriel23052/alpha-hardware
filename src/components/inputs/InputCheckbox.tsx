import { type ChangeEvent } from "react";

type Props = {
  containerClassName?: string;
  labelStyles?: string;
  id: string;
  options: { label: string; value: string }[];
  field: IFormField<string[]>;
  fieldHandler: (id: string, value: IJsonValue) => void;
};

const InputCheckbox = ({
  containerClassName,
  labelStyles,
  id,
  options,
  field,
  fieldHandler,
}: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id.split("-").pop()!;
    if (field.value.includes(value)) {
      fieldHandler(
        id,
        field.value.filter((v) => v !== value)
      );
      return;
    }
    fieldHandler(id, [...field.value, value]);
  };

  return (
    <div className={`${containerClassName} ${labelStyles}`}>
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
    </div>
  );
};

export default InputCheckbox;
