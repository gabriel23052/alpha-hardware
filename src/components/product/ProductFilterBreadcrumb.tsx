import type { MouseEventHandler, PropsWithChildren } from "react";

import SVGClose from "@svg/close.svg?react";

import classes from "./ProductItemBreadcrumb.module.css";

type Props = PropsWithChildren<{
  closeBlickHandler: MouseEventHandler<HTMLButtonElement>;
}>;

const ProductFilterBreadcrumb = ({ children, closeBlickHandler }: Props) => {
  return (
    <span className={`secondary-xdark text-small ${classes.breadcrumb}`}>
      {children}
      <button onClick={closeBlickHandler}>
        <SVGClose />
      </button>
    </span>
  );
};

export default ProductFilterBreadcrumb;
