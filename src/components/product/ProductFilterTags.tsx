import InputCheckbox from "@components/inputs/InputCheckbox";

import classes from "./ProductFilterTags.module.css";

type ProductFilterTagsProps = {
  tags: { label: string; values: string[] }[];
  value: string[];
  handler: (id: string, value: string[]) => void;
};

const ProductFilterTags = ({
  tags,
  handler,
  value,
}: ProductFilterTagsProps) => {
  return (
    <div>
      {tags.map((tag) => (
        <div key={tag.label}>
          <h3 className="dneutral text-default-b">{tag.label}</h3>
          <InputCheckbox
            containerClassName={`${classes.tagsInput}`}
            labelStyles="dneutral text-small"            
            id="tags"
            options={tag.values.map((value) => ({ label: value, value }))}
            value={value}
            handler={handler}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductFilterTags;
