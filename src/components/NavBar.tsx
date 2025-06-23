import { Link } from "react-router";

import classes from "./styles/NavBar.module.css";

const NavBar = ({ visible }: { visible: boolean }) => {
  return (
    <div
      className={`bg-dneutral-xdark ${classes.container} ${
        visible ? classes.open : ""
      }`}
    >
      <nav className={`lneutral-light text-default defaultContainer`}>
        <ul className={`${classes.links}`}>
          <li>
            <Link className={`lneutral-light`} to="/">
              Placas de Vídeo
            </Link>
          </li>
          <li>
            <Link className={`lneutral-light`} to="/">
              Placas-mãe
            </Link>
          </li>
          <li>
            <Link className={`lneutral-light`} to="/">
              Processadores
            </Link>
          </li>
          <li>
            <Link className={`lneutral-light`} to="/">
              Memórias RAM
            </Link>
          </li>
          <li>
            <Link className={`lneutral-light`} to="/">
              SSDs
            </Link>
          </li>
          <li>
            <Link className={`lneutral-light`} to="/">
              HDs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
