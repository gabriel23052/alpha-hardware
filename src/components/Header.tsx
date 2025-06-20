import React from "react";
import { Link } from "react-router";
import NavBar from "./NavBar";
import HeaderUserLinks from "./HeaderUserLinks";

import svgLogo from "../assets/svg/logo.svg";
import svgFavorite from "../assets/svg/favorite.svg";
import svgMyPurchases from "../assets/svg/myPurchases.svg";
import svgCart from "../assets/svg/cart.svg";

const Header = () => {
  const [search, setSearch] = React.useState("");

  return (
    <header>
      <div className="bg-primary">
        <Link to="/">
          <img src={svgLogo} />
        </Link>
        <input //Improvisado
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <HeaderUserLinks />
        <nav>
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
      <NavBar />
    </header>
  );
};

export default Header;
