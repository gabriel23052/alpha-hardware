import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router";

import HeaderSearch from "./HeaderSearch";
import HeaderUserLinks from "./HeaderUserLinks";
import HeaderShortcuts from "./HeaderShortcuts";
import HeaderNavBar from "./HeaderNavBar";

import SVGLogo from "@svg/logo.svg?react";
import SVGMenu from "@svg/menu.svg?react";

import classes from "./Header.module.css";

const MOBILE_MAX_WIDTH = 700;

const Header = () => {
  const [expanded, setExpanded] = useState(
    window.innerWidth > MOBILE_MAX_WIDTH,
  );

  const location = useLocation();

  const authId = useId();
  const shortcutsId = useId();
  const navigationId = useId();

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <HeaderSearch />
      <div
        className={classes.shadow}
        aria-hidden="true"
        data-expanded={expanded}
      ></div>
      <header className={classes.container} data-expanded={expanded}>
        <div className="bg-primary">
          <div className={`defaultContainer ${classes.wrapper}`}>
            <Link className={classes.logo} to="/" title="Página inicial">
              <SVGLogo width={140} height={50} aria-hidden="true" />
            </Link>
            <button
              className={`${classes.mobileMenuBtn}`}
              title="Abrir menu"
              aria-expanded={expanded}
              aria-controls={`${authId} ${shortcutsId}`}
              onClick={handleClick}
            >
              <SVGMenu aria-hidden="true" />
            </button>
            <HeaderUserLinks id={authId} />
            <HeaderShortcuts shortcutsId={shortcutsId} />
          </div>
        </div>
        <HeaderNavBar id={navigationId} />
      </header>
    </>
  );
};

export default Header;
