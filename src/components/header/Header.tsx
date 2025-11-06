import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import HeaderUserLinks from "./HeaderUserLinks";
import HeaderNavBar from "./HeaderNavBar";
import HeaderSearch from "./HeaderSearch";

import useDebounce from "@hooks/useDebounce";

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
  const [showLogo, setShowLogo] = useState(true);

  const mediaQuery = useRef(window.matchMedia("(max-width: 700px)"));
  const mediaQueryCallback = useRef(() => {
    setShowLogo(true);
    setShowAllHeaderContent(true);
  });
  const scrollCallback = useRef(
    useDebounce(() => {
      if (!mediaQueryMatch()) return;
      if (window.scrollY === 0) {
        setShowLogo(true);
        return;
      }
      setShowLogo(false);
    }, 100)
  );

  useEffect(() => {
    mediaQuery.current.addEventListener("change", mediaQueryCallback.current);
    window.addEventListener("scroll", scrollCallback.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mediaQuery.current.removeEventListener(
        "change",
        mediaQueryCallback.current
      );
      window.removeEventListener(
        "scroll",
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mediaQueryCallback.current
      );
    };
  }, []);

  const mediaQueryMatch = () => mediaQuery.current.matches;

  const handleClick = () => {
    setShowAllHeaderContent((prev) => !prev);
  };

  return (
    <header className={`${classes.headerContainer}`}>
      <div
        className={`${classes.overflowContainer}`}
        style={{
          maxHeight: showAllHeaderContent
            ? showLogo
              ? "9.5rem"
              : "6.3rem"
            : "33rem",
        }}
      >
        <div className={`bg-primary`}>
          <div className={`defaultContainer ${classes.wrapper}`}>
            <Link
              className={`${classes.logo}`}
              to="/"
              style={{
                maxHeight: showLogo ? "4rem" : "0px",
                opacity: showLogo ? "1" : "0",
              }}
            >
              <SVGLogo />
            </Link>
            <button
              className={`${classes.mobileMenuBtn}`}
              aria-expanded={showAllHeaderContent ? "true" : "false"}
              aria-controls="ariaHeaderUserLinks ariaShortcuts ariaHeaderNavBar"
              onClick={handleClick}
            >
              <SVGMenu />
            </button>
            <HeaderSearch />
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
          </div>
        </div>
        <HeaderNavBar />
      </div>
    </header>
  );
};

export default Header;
