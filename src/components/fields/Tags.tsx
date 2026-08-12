import type { ChangeEvent } from "react";

import { useFieldContext } from "@lib/form/formContexts";

import classes from "./Tags.module.css";

type Props = {
  groups: { legend: string; values: string[] }[];
};

const Tags = ({ groups }: Props) => {
  const field = useFieldContext<[string, string][]>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = field.state.value;
    const legend = e.target.dataset.legend;
    const value = e.target.dataset.value;
    if (value === undefined || legend === undefined) return;
    const index = tags.findIndex((tag) => tag[0] === legend);
    if (index === -1) {
      field.pushValue([legend, value]);
    } else {
      if (tags[index][0] === legend && tags[index][1] === value) {
        field.removeValue(index);
      } else {
        field.replaceValue(index, [legend, value]);
      }
    }
  };

  const isChecked = (legend: string, value: string) =>
    field.state.value.some((tag) => tag[0] === legend && tag[1] === value);

  return (
    <div className={classes.container}>
      {groups.map((group) => (
        <fieldset key={group.legend} className={classes.field}>
          <legend className="text-default-b dneutral">{group.legend}</legend>
          {group.values.map((value) => (
            <label
              key={value}
              className="text-small dneutral"
              data-ischecked={isChecked(group.legend, value)}
            >
              <input
                type="checkbox"
                name={`${field.name}-${group.legend}`}
                checked={isChecked(group.legend, value)}
                data-legend={group.legend}
                data-value={value}
                onChange={handleChange}
              />
              {value}
            </label>
          ))}
        </fieldset>
      ))}
    </div>
  );
};

export default Tags;
