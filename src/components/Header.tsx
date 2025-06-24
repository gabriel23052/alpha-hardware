import React from "react";
import { Link } from "react-router";
import HeaderNavBar from "./HeaderNavBar";
import HeaderUserLinks from "./HeaderUserLinks";

import classes from "./styles/Header.module.css";

import SVGLogo from "../assets/svg/logo.svg?react";
import SVGFavorite from "../assets/svg/favorite.svg?react";
import SVGMyPurchases from "../assets/svg/myPurchases.svg?react";
import SVGCart from "../assets/svg/cart.svg?react";
import SVGMenu from "../assets/svg/menu.svg?react";

const Header = () => {
  const [search, setSearch] = React.useState("");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  return (
    <header className={`${classes.header}`}>
      <div className={`${classes.container} ${mobileMenu ? classes.open : ""}`}>
        <div className={`bg-primary`}>
          <div className={`defaultContainer ${classes.wrapper}`}>
            <Link className={`${classes.logo}`} to="/">
              <SVGLogo />
            </Link>
            <input //Improvisado
              className={`text-default dneutral-dark ${classes.search}`}
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <HeaderUserLinks />
            <nav className={`${classes.shortcuts}`}>
              <Link to="/">
                <SVGFavorite />
              </Link>
              <Link to="/">
                <SVGMyPurchases />
              </Link>
              <Link to="/">
                <SVGCart />
              </Link>
            </nav>
          </div>
        </div>
        <HeaderNavBar />
      </div>
      <button
        className={`bg-dneutral ${classes.menuBtn}`}
        onClick={() => setMobileMenu((val) => !val)}
      >
        <SVGMenu />
      </button>
    </header>
  );
};

export default Header;
