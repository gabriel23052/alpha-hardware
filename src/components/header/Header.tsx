import { useState } from "react";
import { Link } from "react-router";

import HeaderUserLinks from "./HeaderUserLinks";
import HeaderNavBar from "./HeaderNavBar";
import HeaderSearch from "./HeaderSearch";

import SVGLogo from "@svg/logo.svg?react";
import SVGFavorite from "@svg/favorite.svg?react";
import SVGMyPurchases from "@svg/myPurchases.svg?react";
import SVGCart from "@svg/cart.svg?react";
import SVGMenu from "@svg/menu.svg?react";

import classes from "./Header.module.css";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className={`${classes.header}`}>
      <div
        className={`${classes.container} ${mobileMenu ? classes.open : ""}`}
        id="ariaHeader"
      >
        <div className="bg-primary">
          <div className={`defaultContainer ${classes.wrapper}`}>
            <Link className={`${classes.logo}`} to="/">
              <SVGLogo />
            </Link>
            <HeaderSearch />
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
        aria-expanded={mobileMenu ? "true" : "false"}
        aria-controls="ariaHeader"
        onClick={() => setMobileMenu((val) => !val)}
      >
        <SVGMenu />
      </button>
    </header>
  );
};

export default Header;
