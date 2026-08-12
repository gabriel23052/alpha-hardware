import { Link } from "react-router";

import { CATEGORIES } from "../../config";

import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <nav className={classes.categories}>
      <div className={classes.titleWithLine}>
        <h2 className={`text-large bg-white dneutral-xlight ${classes.title}`}>
          O que você precisa?
        </h2>
      </div>
      <ul className={`text-default ${classes.list}`}>
        {CATEGORIES.map(({ name, label, Svg }) => (
          <li key={name}>
            <Link
              className="bg-lneutral-xlight"
              to={`/catalog?category=${name}`}
            >
              <Svg aria-hidden="true" width={116} height={64} />
              <span className="dneutral">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Categories;
