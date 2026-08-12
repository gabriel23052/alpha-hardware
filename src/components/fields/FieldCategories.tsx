import { useFieldContext } from "@lib/form/formContexts";

import { CATEGORIES } from "../../config";

import classes from "./FieldCategories.module.css";

type Props = {
  className?: string;
};

const OPTIONS = CATEGORIES.map((category) => ({
  label: category.label,
  value: category.name,
}));

const FieldCategories = ({ className }: Props) => {
  const field = useFieldContext<string>();

  return (
    <fieldset className={`${classes.container} ${className || ""}`}>
      {OPTIONS.map((o) => (
        <label
          className="dneutral text-small"
          key={o.value}
          data-ischecked={field.state.value === o.value}
          htmlFor={`${field.name}-${o.value}`}
        >
          <input
            type="radio"
            name={field.name}
            id={`${field.name}-${o.value}`}
            checked={field.state.value === o.value}
            onChange={(e) => {
              field.handleChange(e.target.id.split("-").pop()!);
            }}
          />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
};

export default FieldCategories;
