import type { ChangeEvent } from "react";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

import classes from "./CatalogFilterTags.module.css";

type Props = {
  id: string;
  groups: { legend: string; values: string[] }[];
  field: JafhField<[string, string][]>;
  updateField: JafhUpdateField<[string, string][]>;
};

const CatalogFilterTags = ({ id, groups, field, updateField }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = field.value;
    const legend = e.target.dataset.legend;
    const value = e.target.dataset.value;
    if (value === undefined || legend === undefined) return;
    const index = tags.findIndex((tag) => tag[0] === legend);
    if (index === -1) {
      tags.push([legend, value]);
    } else {
      if (tags[index][0] === legend && tags[index][1] === value) {
        tags.splice(index, 1);
      } else {
        tags[index] = [legend, value];
      }
    }
    updateField(id, tags);
  };

  const isChecked = (legend: string, value: string) =>
    field.value.some((tag) => tag[0] === legend && tag[1] === value);

  return (
    <div className={classes.container}>
      {groups.map((group) => (
        <fieldset key={group.legend} className={classes.field}>
          <legend className={"text-default-b dneutral"}>{group.legend}</legend>
          {group.values.map((value) => (
            <label
              key={value}
              className={"text-small dneutral"}
              data-ischecked={isChecked(group.legend, value)}
            >
              <input
                type="checkbox"
                name={`${id}-${group.legend}`}
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

export default CatalogFilterTags;
