import InputCheckbox from "@components/inputs/InputCheckbox";

import classes from "./ProductFilterTags.module.css";

type ProductFilterTagsProps = {
  tags: { label: string; values: string[] }[];
  field: IFormField<string[]>;
  fieldHandler: (id: string, value: IJsonValue) => void;
};

const ProductFilterTags = ({
  tags,
  field,
  fieldHandler,
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
            fieldHandler={fieldHandler}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductFilterTags;
