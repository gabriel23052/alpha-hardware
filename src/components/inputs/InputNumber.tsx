import {type InputHTMLAttributes, type ChangeEvent} from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  field: IFormField<string>;
  fieldHandler: (id: string, value: IJsonValue) => void;
};

const InputNumber = ({ id, field, fieldHandler, ...attr }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[\d,]*$/.test(newValue)) {
      fieldHandler(id, newValue);
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
