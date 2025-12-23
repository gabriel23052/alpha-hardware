import type { MouseEventHandler, PropsWithChildren } from "react";

import SVGClose from "@svg/close.svg?react";

import classes from "./CatalogFilterBreadcrumb.module.css";

type Props = PropsWithChildren<{
  closeClickHandler: MouseEventHandler<HTMLButtonElement>;
}>;

const CatalogFilterBreadcrumb = ({ children, closeClickHandler }: Props) => {
  return (
    <span className={`secondary-xdark text-small ${classes.breadcrumb}`}>
      {children}
      <button onClick={closeClickHandler}>
        <SVGClose />
      </button>
    </span>
  );
};

export default CatalogFilterBreadcrumb;
