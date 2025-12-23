import { Link } from "react-router";

import { CATEGORIES } from "../../data";

import classes from "./HomeCategories.module.css";

const HomeCategories = () => {
  return (
    <nav className={`${classes.categories}`}>
      <div className={`${classes.titleWithLine}`}>
        <h2 className={`bg-white dneutral-xlight text-large ${classes.title}`}>
          O que você precisa?
        </h2>
      </div>
      <ul className={`text-default ${classes.list}`}>
        {CATEGORIES.map(({ name, label, Svg }) => (
          <li key={name}>
            <Link
              className="bg-lneutral-xlight"
              to={`/products?category=${name}`}
            >
              <Svg />
              <span className="dneutral">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HomeCategories;
