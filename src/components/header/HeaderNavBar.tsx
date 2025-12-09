import { Link } from "react-router";

import { CATEGORIES } from "../../data";

import classes from "./HeaderNavBar.module.css";

type Props = { maxHeight: string; id: string };

const HeaderNavBar = ({ maxHeight, id }: Props) => {
  return (
    <nav
      className={`bg-dneutral-xdark ${classes.container}`}
      id={id}
      style={{ maxHeight }}
    >
      <ul
        className={`lneutral-light text-default defaultContainer ${classes.links}`}
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
