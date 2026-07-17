import { Link } from "react-router";

import SVGFavorite from "@svg/favorite.svg?react";
import SVGMyPurchases from "@svg/myPurchases.svg?react";
import SVGCart from "@svg/cart.svg?react";

import classes from "./HeaderShortcuts.module.css";

type Props = {
  shortcutsId: string;
};

const HeaderShortcuts = ({ shortcutsId }: Props) => {
  return (
    <nav className={classes.container} id={shortcutsId} aria-label="Atalhos">
      <Link to="/dashboard/favorites" title="Favoritos">
        <SVGFavorite aria-hidden="true" width={32} height={32} />
      </Link>
      <Link to="/dashboard/orders" title="Minhas compras">
        <SVGMyPurchases aria-hidden="true" width={32} height={32} />
      </Link>
      <Link to="/dashboard/cart" title="Carrinho">
        <SVGCart aria-hidden="true" width={32} height={32} />
      </Link>
    </nav>
  );
};

export default HeaderShortcuts;

