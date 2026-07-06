import { Link } from "react-router";

import classes from "./HeaderSearchSuggestions.module.css";

type Props = {
  listId: string;
  results: IProduct_Suggestion[];
  query: string;
  show: boolean;
};

const NUMBER_OF_SUGGESTIONS = 5;

const HeaderSearchSuggestions = ({ listId, results, query, show }: Props) => {
  const maskedResults = results.slice(0, NUMBER_OF_SUGGESTIONS);
  return (
    <div
      className={`bg-white ${classes.container}`}
      id={listId}
      role="listbox"
      data-show={show}
    >
      <ul className={classes.list}>
        {maskedResults.map(({ id, name }) => (
          <li key={id} role="option">
            <Link
              className="text-default dneutral"
              to={`products/${id}`}
              tabIndex={show ? 0 : -1}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className={`text-small dneutral ${classes.moreItemsLink}`}
        to={`/catalog?name=${encodeURIComponent(query)}`}
        tabIndex={show ? 0 : -1}
      >
        Mostrar mais produtos
      </Link>
    </div>
  );
};

export default HeaderSearchSuggestions;

