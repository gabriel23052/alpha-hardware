import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

import { TAGS } from "../../config";

import { useSelector } from "@tanstack/react-form";
import { useAppForm } from "@hooks/useAppForm";

import { fieldValidators } from "@utils/fieldValidators";
import { convertTextPrice } from "@utils/convertTextPrice";

import type { FilterFormFields } from "./Catalog";

import SVGChevronLeft from "@svg/chevronLeft.svg?react";

import classes from "./FilterForm.module.css";

type Props = {
  filterContainerID: string;
  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterForm: (filter: FilterFormFields) => void;
};

const FilterForm = ({
  filterContainerID,
  showFilter,
  setShowFilter,
  setFilterForm,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRenderRef = useRef([true, true]);
  const ignoreListener = useRef(false);

  const form = useAppForm({
    defaultValues: {
      category: searchParams.get("category") || "",
      minPrice: "",
      maxPrice: "",
      tags: [] as [string, string][],
    },
    validators: {
      onChange: ({ value }) => {
        if (value.minPrice === "" || value.maxPrice === "") return undefined;
        const minPrice = convertTextPrice(value.minPrice);
        const maxPrice = convertTextPrice(value.maxPrice);
        if (minPrice > maxPrice) {
          return "Preço mínimo maior que o máximo";
        }
        return undefined;
      },
    },
  });

  const formValues = useSelector(form.store, (state) => state.values);
  const isMinPriceBlurred = useSelector(
    form.store,
    (state) => state.fieldMeta.minPrice?.isBlurred,
  );
  const isMaxPriceBlurred = useSelector(
    form.store,
    (state) => state.fieldMeta.maxPrice?.isBlurred,
  );

  useEffect(() => {
    if (firstRenderRef.current[0]) {
      firstRenderRef.current[0] = false;
      return;
    }
    if (!form.state.isFormValid) return;
    const { category, minPrice, maxPrice, tags } = formValues;
    const filter: FilterFormFields = {};
    if (category !== "") filter.category = category.trim();
    if (minPrice !== "") filter.minPrice = convertTextPrice(minPrice);
    if (maxPrice !== "") filter.maxPrice = convertTextPrice(maxPrice);
    if (tags.length !== 0) filter.tags = tags.map((tag) => tag[1].trim());
    setFilterForm(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  useEffect(() => {
    if (firstRenderRef.current[1]) {
      firstRenderRef.current[1] = false;
      return;
    }
    const category = searchParams.get("category") || "";
    if (form.state.values.category !== category) {
      ignoreListener.current = true;
      form.setFieldValue("category", category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const resetPriceAndTags = () => {
    form.setFieldValue("minPrice", "");
    form.setFieldValue("maxPrice", "");
    form.setFieldValue("tags", []);
  };

  const categoryChangeListener = (value: string) => {
    resetPriceAndTags();
    if (ignoreListener.current) {
      ignoreListener.current = false;
      return;
    }
    setSearchParams((prev) => {
      if (value === "") {
        prev.delete("category");
      } else {
        prev.set("category", value);
      }
      return prev;
    });
  };

  return (
    <form.AppForm>
      <form
        className={classes.container}
        data-expanded={showFilter}
        id={filterContainerID}
        onClick={(e) => {
          if (e.target instanceof HTMLFormElement) setShowFilter(false);
        }}
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
        }}
      >
        <button
          className={classes.closeButton}
          aria-label="Fechar os filtros"
          aria-controls={filterContainerID}
        >
          <SVGChevronLeft aria-hidden="true" width={12} height={24} />
        </button>
        <div className={classes.filters} data-expanded={showFilter}>
          <div className={classes.categories}>
            <h2 className="text-default-b dneutral">Categorias</h2>
            <form.AppField
              name="category"
              listeners={{
                onChange: ({ value }) => categoryChangeListener(value),
              }}
              children={(field) => <field.FieldCategories />}
            />
          </div>
          <button
            className={`text-small dneutral-light bg-lneutral-light ${classes.cleanButton}`}
            onClick={resetPriceAndTags}
          >
            Limpar Filtros
          </button>
          <div className={classes.prices}>
            <h2 className="text-default-b dneutral">Preço</h2>
            <fieldset className={classes.pricesFieldset}>
              <form.AppField
                validators={{
                  onChange: ({ value }) => fieldValidators.priceFilter(value),
                  onMount: ({ value }) => fieldValidators.priceFilter(value),
                }}
                name="minPrice"
                children={(field) => <field.FieldPrice label="Mínimo:" />}
              />
              <form.AppField
                name="maxPrice"
                validators={{
                  onChange: ({ value }) => fieldValidators.priceFilter(value),
                  onMount: ({ value }) => fieldValidators.priceFilter(value),
                }}
                children={(field) => <field.FieldPrice label="Máximo:" />}
              />
            </fieldset>
            {form.state.errorMap["onChange"] &&
              isMinPriceBlurred &&
              isMaxPriceBlurred && (
                <em className="text-small feedback-negative">
                  {form.state.errorMap["onChange"]}
                </em>
              )}
          </div>
          {form.state.values.category in TAGS && (
            <form.AppField
              name="tags"
              mode="array"
              children={(field) => (
                <field.FieldTags
                  groups={TAGS[form.state.values.category as keyof typeof TAGS]}
                />
              )}
            />
          )}
        </div>
      </form>
    </form.AppForm>
  );
};

export default FilterForm;
