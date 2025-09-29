type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  val: IFormValue<string>;
  handler: (id: string, value: IJsonValue) => void;
};

const InputNumber = ({ id, val: value, handler, ...attr }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^[\d,]*$/.test(newValue)) {
      handler(id, newValue);
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
      value={value.value}
      onChange={handleChange}
      {...attr}
    />
  );
};

export default InputNumber;
