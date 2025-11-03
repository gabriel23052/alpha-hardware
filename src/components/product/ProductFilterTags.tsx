import InputCheckbox from "@components/inputs/InputCheckbox";

import type { JafhField, JafhUpdateField } from "@hooks/useJafh";

import classes from "./ProductFilterTags.module.css";

type ProductFilterTagsProps = {
  tags: { label: string; values: string[] }[];
  field: JafhField<string[]>;
  updateField: JafhUpdateField<string[]>;
};

const ProductFilterTags = ({
  tags,
  field,
  updateField,
}: ProductFilterTagsProps) => {
  return (
    <div className={`${classes.filterTags}`}>
      {tags.map((tag) => (
        <div key={tag.label}>
          <h3 className="dneutral text-default-b">{tag.label}</h3>
          <InputCheckbox
            containerClassName={`${classes.tagsInput}`}
            labelStyles="dneutral text-small"
            id="tags"
            options={tag.values.map((value) => ({ label: value, value }))}
            field={field}
            updateField={updateField}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductFilterTags;
