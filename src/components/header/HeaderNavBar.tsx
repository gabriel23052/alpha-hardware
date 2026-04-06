import { Link } from "react-router";

import { CATEGORIES } from "../../config";

import classes from "./HeaderNavBar.module.css";

type Props = { id: string };

const HeaderNavBar = ({ id }: Props) => {
  return (
    <nav
      className={`bg-dneutral-xdark ${classes.container}`}
      id={id}
      aria-label="Categorias"
    >
      <ul
        className={`text-default lneutral-light defaultContainer ${classes.links}`}
      >
        {CATEGORIES.map(({ name, label }) => (
          <li key={name}>
            <Link className="lneutral-light" to={`/products?category=${name}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavBar;
