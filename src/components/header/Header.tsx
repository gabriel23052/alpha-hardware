import { useEffect, useRef, useState } from "react";
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
  const [showAllHeaderContent, setShowAllHeaderContent] = useState(
    window.innerWidth > 700
  );

  const mediaQuery = useRef(window.matchMedia("(max-width: 700px)"));
  const mediaQueryCallback = useRef(() => setShowAllHeaderContent(true));

  useEffect(() => {
    mediaQuery.current.addEventListener("change", mediaQueryCallback.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mediaQuery.current.removeEventListener(
        "change",
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mediaQueryCallback.current
      );
    };
  }, []);

  const handleClick = () => {
    setShowAllHeaderContent((prev) => !prev);
  };

  return (
    <header className={`${classes.headerContainer}`}>
      <div
        className={`${classes.overflowContainer}  ${
          showAllHeaderContent ? classes.allContent : ""
        }`}
      >
        <div className={`bg-primary`}>
          <div className={`defaultContainer ${classes.wrapper}`}>
            <Link className={`${classes.logo}`} to="/">
              <SVGLogo />
            </Link>
            <HeaderSearch />
            {showAllHeaderContent && (
              <>
                <HeaderUserLinks />
                <nav className={`${classes.shortcuts}`} id="ariaShortcuts">
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
              </>
            )}
          </div>
        </div>
        {showAllHeaderContent && <HeaderNavBar />}
      </div>
      <button
        className={`bg-dneutral ${classes.mobileMenuBtn}`}
        aria-expanded={showAllHeaderContent ? "true" : "false"}
        aria-controls="ariaHeaderUserLinks ariaShortcuts ariaHeaderNavBar"
        onClick={handleClick}
      >
        <SVGMenu />
      </button>
    </header>
  );
};

export default Header;
