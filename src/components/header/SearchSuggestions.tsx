import { Link } from "react-router";

import type { TProduct } from "../../app.types";

import classes from "./SearchSuggestions.module.css";

type Props = {
  listId: string;
  results: TProduct["suggestion"][];
  query: string;
  show: boolean;
};

const NUMBER_OF_SUGGESTIONS = 5;

const SearchSuggestions = ({ listId, results, query, show }: Props) => {
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
              to={`product/${id}`}
              tabIndex={show ? 0 : -1}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className={`text-small dneutral ${classes.moreItemsLink}`}
        to={`/catalog?search=${encodeURIComponent(query)}`}
        tabIndex={show ? 0 : -1}
      >
        Mostrar mais produtos
      </Link>
    </div>
  );
};

export default SearchSuggestions;
