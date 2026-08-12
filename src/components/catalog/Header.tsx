import Breadcrumbs from "./Breadcrumbs";
import SortSelect from "./SortSelect";

import SVGFilter from "@svg/filter.svg?react";

import classes from "./Header.module.css";

type Props = {
  sort: IProductSort | undefined;
  filterContainerId: string;
  productsAmount: number;
  setSort: (sort: IProductSort | "") => void;
  openMobileFilter: () => void;
};

const Header = ({
  sort,
  setSort,
  openMobileFilter,
  filterContainerId,
  productsAmount,
}: Props) => {
  return (
    <div className={classes.container}>
      <Breadcrumbs />
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
      <SortSelect sort={sort} setSort={setSort} />
    </div>
  );
};

export default Header;
