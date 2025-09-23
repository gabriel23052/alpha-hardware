type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  value: string;
  handler: (id: string, value: string) => void;
};

const InputNumber = ({ id, value, handler, ...attr }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (
      /^[\d,]*$/.test(newValue)
    ) {
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
      value={value}
      onChange={handleChange}
      {...attr}
    />
  );
};

export default InputNumber;
