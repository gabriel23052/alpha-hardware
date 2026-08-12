import { useState, type InputHTMLAttributes } from "react";

import { useFieldContext } from "@lib/form/formContexts";

import classes from "./Password.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
};

const Password = ({ label, className, ...attr }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const field = useFieldContext<string>();

  return (
    <div className={`${classes.container} ${className ?? ""}`}>
      <label className="text-default dneutral" htmlFor={field.name}>
        {label}
      </label>
      <input
        className="text-default dneutral-light bg-lneutral-xlight"
        id={field.name}
        name={field.name}
        type={showPassword ? "text" : "password"}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        onBlur={field.handleBlur}
        {...attr}
      />
      <button
        onClick={() => {
          setShowPassword((prev) => !prev);
        }}
        type="button"
      >
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
      {!field.state.meta.isValid && field.state.meta.isBlurred && (
        <em className="text-small feedback-negative">
          {field.state.meta.errors.join(", ")}
        </em>
      )}
    </div>
  );
};

export default Password;
