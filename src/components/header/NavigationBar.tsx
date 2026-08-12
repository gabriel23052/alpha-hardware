import { Link } from "react-router";

import { CATEGORIES } from "../../config";

import classes from "./NavigationBar.module.css";

type Props = { id: string };

const NavigationBar = ({ id }: Props) => {
  return (
    <nav className="bg-dneutral-xdark" id={id} aria-label="Categorias">
      <ul
        className={`text-default lneutral-light defaultContainer ${classes.links}`}
      >
        {CATEGORIES.map(({ name, label }) => (
          <li key={name}>
            <Link className="lneutral-light" to={`/catalog?category=${name}`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
