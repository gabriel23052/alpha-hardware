import type { MouseEventHandler, PropsWithChildren } from "react";

import SVGClose from "@svg/close.svg?react";

import classes from "./CatalogBreadcrumb.module.css";

type Props = PropsWithChildren<{
  close: MouseEventHandler<HTMLButtonElement>;
}>;

const CatalogBreadcrumb = ({ children, close }: Props) => {
  return (
    <span className={`text-small secondary-xdark ${classes.container}`}>
      {children}
      <button onClick={close}>
        <SVGClose title="Excluir filtro" />
      </button>
    </span>
  );
};

export default CatalogBreadcrumb;
