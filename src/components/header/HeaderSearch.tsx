import { useEffect, useRef, useState } from "react";

import classes from "./HeaderSearch.module.css";
import fakeFetch from "@utils/fakeFetch";
import debounce from "@utils/debounce";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<IProductSuggestion[]>([]);

  const searchRef = useRef("");
  const lastLength = useRef(0);
  const suggestionsList = useRef<IProductSuggestion[]>([]);

  const DEBOUNCE_DELAY = 1000;

  const debouncedSuggestionSearch = useRef(
    debounce((searchInApi: boolean) => {
      if (searchInApi) {
        fetchSuggestions();
        return;
      }
      suggestionsList.current = suggestionsList.current.filter((product) =>
        product.name.toLowerCase().includes(searchRef.current.toLowerCase())
      );
      setSuggestions(suggestionsList.current.slice(0, 5));
    }, DEBOUNCE_DELAY)
  );

  const fetchSuggestions = async () => {
    const response = await fakeFetch<IProductSuggestion[]>(
      "GET /api/products/suggestions",
      { search: searchRef.current }
    );
    if (response.error) return;
    if (response.data) {
      suggestionsList.current = response.data;
      setSuggestions(suggestionsList.current.slice(0, 5));
    }
  };

  useEffect(() => {
    searchRef.current = search;
    if (search.length < 3) {
      setSuggestions([]);
      suggestionsList.current = [];
      lastLength.current = search.length;
      return;
    }
    if (
      search.length < lastLength.current ||
      suggestionsList.current.length === 0
    ) {
      lastLength.current = search.length;
      debouncedSuggestionSearch.current(true);
      return;
    }
    lastLength.current = search.length;
    debouncedSuggestionSearch.current(false);
  }, [search]);

  const handlePaste = () => {
    suggestionsList.current = [];
  };

  return (
    <div className={`${classes.container}`}>
      <input
        className={`text-default dneutral-dark ${classes.input} ${
          suggestions.length > 0 ? classes.withSuggestions : ""
        }`}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onPaste={handlePaste}
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
