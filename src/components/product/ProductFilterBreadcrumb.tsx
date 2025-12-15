import type { MouseEventHandler, PropsWithChildren } from "react";

import SVGClose from "@svg/close.svg?react";

import classes from "./ProductItemBreadcrumb.module.css";

type Props = PropsWithChildren<{
  closeClickHandler: MouseEventHandler<HTMLButtonElement>;
}>;

const ProductFilterBreadcrumb = ({ children, closeClickHandler }: Props) => {
  return (
    <span className={`secondary-xdark text-small ${classes.breadcrumb}`}>
      {children}
      <button onClick={closeClickHandler}>
        <SVGClose />
      </button>
    </span>
  );
};

export default ProductFilterBreadcrumb;
