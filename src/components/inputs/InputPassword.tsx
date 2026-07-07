import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

import classes from "./InputPassword.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string;
  label: string;
  id: string;
  blurCallback?: (e: FocusEvent<HTMLInputElement>) => void;
  field: JafhField<string>;
  updateField: JafhUpdateField<string>;
};

const InputPassword = ({
  containerClassName,
  label,
  id,
  blurCallback,
  field,
  updateField,
  ...attr
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateField(id, e.currentTarget.value);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if(blurCallback) blurCallback(e);
    setShowError(true);
  };

  return (
    <div className={`${classes.container} ${containerClassName ?? ""}`}>
      <label className="text-default dneutral" htmlFor={id}>
        {label}
      </label>
      <input
        className="text-default dneutral-light bg-lneutral-xlight"
        id={id}
        name={id}
        type={showPassword ? "text" : "password"}
        value={field.value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...attr}
      />
      <button onClick={handleClick}>
        <svg
          width="24"
          height="20"
          viewBox="0 0 24 20"
          fill="none"
          color="#929292"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={`${classes.dash} ${
              !showPassword ? classes.show : undefined
            }`}
            d="M1.5 18.5L22.5 1.5"
            stroke="currentColor"
            strokeLinecap="round"
          />
          <path
            d="M12 3C14.9803 3 17.2061 3.8608 18.9219 5.1377C20.6466 6.42128 21.9047 8.16328 22.875 10C21.9047 11.8367 20.6466 13.5787 18.9219 14.8623C17.2061 16.1392 14.9803 17 12 17C8.92843 17 6.68746 16.3258 4.99316 15.1641C3.30091 14.0037 2.05963 12.292 1.10059 10.0439C2.07014 8.19826 3.32928 6.44494 5.05762 5.15234C6.7763 3.86701 9.00829 3 12 3Z"
            stroke="currentColor"
          />
          <circle cx="12" cy="10" r="4.5" stroke="currentColor" />
        </svg>
      </button>
      {field.error && showError && (
        <p className="text-small feedback-negative">{field.error}</p>
      )}
    </div>
  );
};

export default InputPassword;
