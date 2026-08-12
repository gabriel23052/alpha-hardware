import CatalogBreadcrumbs from "./CatalogBreadcrumbs";
import CatalogSortSelect from "./CatalogSortSelect";

import SVGFilter from "@svg/filter.svg?react";

import classes from "./CatalogHeader.module.css";

type Props = {
  sort: IProductSort | undefined;
  filterContainerId: string;
  productsAmount: number;
  setSort: (sort: IProductSort | "") => void;
  openMobileFilter: () => void;
};

const CatalogHeader = ({
  sort,
  setSort,
  openMobileFilter,
  filterContainerId,
  productsAmount,
}: Props) => {
  return (
    <div className={classes.container}>
      <CatalogBreadcrumbs />
      <p className={`text-small lneutral-xdark ${classes.itemsDisplayed}`}>
        Exibindo {productsAmount} produtos
      </p>
      <button
        className={`bg-lneutral-xlight dneutral-light ${classes.filterBtn}`}
        onClick={openMobileFilter}
        aria-label="Abrir menu de filtros"
        aria-controls={filterContainerId}
      >
        <SVGFilter aria-hidden="true" width={20} height={20} />
      </button>
      <CatalogSortSelect sort={sort} setSort={setSort} />
    </div>
  );
};

export default CatalogHeader;
