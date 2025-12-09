import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

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

const LOGO_UPDATE_STATE_DELAY = 1000;
const MOBILE_MAX_WIDTH = 700;

const Header = () => {
  const [showAllHeaderContent, setShowAllHeaderContent] = useState(
    window.innerWidth > MOBILE_MAX_WIDTH
  );
  const [showLogo, setShowLogo] = useState(true);

  const mediaQuery = useRef(window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`));

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
    }, LOGO_UPDATE_STATE_DELAY)
  );

  const containerId = useId();
  const navBarId = useId();

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

  const location = useLocation();

  useEffect(() => {
    if (!mediaQueryMatch()) return;
    setShowAllHeaderContent(false);
  }, [location]);

  const mediaQueryMatch = () => mediaQuery.current.matches;

  const handleClick = () => {
    setShowAllHeaderContent((prev) => !prev);
  };

  return (
    <header className={`${classes.container}`}>
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
            aria-expanded={showAllHeaderContent}
            aria-controls={`${containerId} ${navBarId}`}
            onClick={handleClick}
          >
            <SVGMenu />
          </button>
          <HeaderSearch />
          <div
            className={`${classes.hideOnMobile}`}
            id={containerId}
            style={{
              maxHeight: showAllHeaderContent ? "2.9rem" : "0px",
            }}
          >
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
      </div>
      <HeaderNavBar
        maxHeight={showAllHeaderContent ? "20rem" : "0px"}
        id={navBarId}
      />
    </header>
  );
};

export default Header;
