import { useEffect, useState } from "react";

import classes from "./HeaderSearch.module.css";
import fakeFetch from "@utils/fakeFetch";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<IProductSuggestion[]>([]);

  useEffect(() => {
    if (search.length < 3) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const response = await fakeFetch<IProductSuggestion[]>(
        "GET /api/products/suggestions",
        { search }
      );
      if (response.error) return;
      if (response.data) {
        setSuggestions(response.data);
      }
    };
    fetchSuggestions();
  }, [search]);

  return (
    <div className={`${classes.container}`}>
      <input
        className={`text-default dneutral-dark ${classes.input} ${
          suggestions.length > 0 ? classes.withSuggestions : ""
        }`}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {suggestions.length > 0 && (
        <ul className={`bg-lneutral-xlight ${classes.suggestions}`}>
          {suggestions.map((item) => (
            <li
              key={item.id}
              className={`text-default dneutral-dark ${classes.suggestionItem}`}
            >
              <a href={`/product/${item.id}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
