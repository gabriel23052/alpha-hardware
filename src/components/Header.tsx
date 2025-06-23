import React from "react";
import { Link } from "react-router";
import NavBar from "./NavBar";
import HeaderUserLinks from "./HeaderUserLinks";

import classes from "./styles/Header.module.css";

import svgLogo from "../assets/svg/logo.svg";
import svgFavorite from "../assets/svg/favorite.svg";
import svgMyPurchases from "../assets/svg/myPurchases.svg";
import svgCart from "../assets/svg/cart.svg";
import svgMenu from "../assets/svg/menu.svg";

const Header = () => {
  const [search, setSearch] = React.useState("");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  return (
    <header className={`${classes.header}`}>
      <div className={`${classes.container} ${mobileMenu ? classes.open : ""}`}>
        <div className={`bg-primary`}>
          <div className={`defaultContainer ${classes.wrapper}`}>
            <Link className={`${classes.logo}`} to="/">
              <img src={svgLogo} />
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
                <img src={svgFavorite} />
              </Link>
              <Link to="/">
                <img src={svgMyPurchases} />
              </Link>
              <Link to="/">
                <img src={svgCart} />
              </Link>
            </nav>
          </div>
        </div>
        <NavBar />
      </div>
      <button
        className={`bg-dneutral ${classes.menuBtn}`}
        onClick={() => setMobileMenu((val) => !val)}
      >
        <img src={svgMenu} />
      </button>
    </header>
  );
};

export default Header;
