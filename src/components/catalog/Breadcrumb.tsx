import type { MouseEventHandler, PropsWithChildren } from "react";

import SVGClose from "@svg/close.svg?react";

import classes from "./Breadcrumb.module.css";

type Props = PropsWithChildren<{
  close: MouseEventHandler<HTMLButtonElement>;
}>;

const Breadcrumb = ({ children, close }: Props) => {
  return (
    <span className={`text-small secondary-xdark ${classes.container}`}>
      {children}
      <button onClick={close}>
        <SVGClose title="Excluir filtro" width={12} height={12} />
      </button>
    </span>
  );
};

export default Breadcrumb;
