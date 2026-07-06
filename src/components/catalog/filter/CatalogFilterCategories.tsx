import InputRadio from "@components/inputs/InputRadio";

import type { JafhField } from "@hooks/useJafh";

import { CATEGORIES } from "../../../config";

import classes from "./CatalogFilterCategories.module.css";

const CATEGORIES_RADIO_OPTIONS = CATEGORIES.map((category) => ({
  label: category.label,
  value: category.name,
}));

type Props = {
  field: JafhField<string>;
  updateCategory: (newCategory: string) => void;
};

const CatalogFilterCategories = ({ field, updateCategory }: Props) => {
  const handleUpdate = (_: string, newValue: string) => {
    updateCategory(newValue);
  };

  return (
    <div className={classes.container}>
      <h2 className="text-default-b dneutral">Categorias</h2>
      <fieldset className={classes.input}>
        <InputRadio
          labelStyles="dneutral text-small"
          id="category"
          options={CATEGORIES_RADIO_OPTIONS}
          field={field}
          updateField={handleUpdate}
        />
      </fieldset>
    </div>
  );
};

export default CatalogFilterCategories;

