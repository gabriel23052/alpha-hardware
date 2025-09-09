import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import fakeFetch from "@utils/fakeFetch";
import debounce from "@utils/debounce";

import classes from "./HeaderSearch.module.css";

const SUGGESTIONS_LIMIT = 5;
const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY = 1000;
const BLUR_DELAY = 100;

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const [suggestionsShown, setSuggestionsShown] = useState<
    IProductSuggestion[]
  >([]);

  const searchStateRef = useRef("");
  const prevSearchLength = useRef(0);
  const suggestions = useRef<IProductSuggestion[]>([]);
  const focused = useRef(false);
  const linksElem = useRef<HTMLAnchorElement[]>([]);
  const inputElem = useRef<HTMLInputElement>(null);
  const blurTimeout = useRef<number | null>(null);

  const suggestionsSearch = useRef(
    debounce((searchInApi: boolean) => {
      if (searchInApi) {
        fetchSuggestions();
        return;
      }
      setSuggestionsShown(
        suggestions.current
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(searchStateRef.current.toLowerCase())
          )
          .slice(0, SUGGESTIONS_LIMIT)
      );
    }, DEBOUNCE_DELAY)
  );

  useEffect(() => {
    searchStateRef.current = search;
    if (search.length < MIN_SEARCH_LENGTH) {
      setSuggestionsShown([]);
      suggestions.current = [];
      return;
    }
    if (
      search.length < prevSearchLength.current ||
      suggestions.current.length === 0
    ) {
      suggestions.current = [];
      suggestionsSearch.current(true);
      return;
    }
    suggestionsSearch.current(false);
  }, [search]);

  useEffect(() => {
    if (suggestionsShown.length === 0) return;
  }, [suggestionsShown]);

  useEffect(
    () => () => {
      if (blurTimeout.current) {
        clearTimeout(blurTimeout.current);
      }
    },
    []
  );

  const handleBlur = () => {
    focused.current = false;
    blurTimeout.current = window.setTimeout(() => {
      if (!focused.current) {
        setSuggestionsShown([]);
      }
    }, BLUR_DELAY);
  };

  const handleFocus = () => {
    focused.current = true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePaste = () => {
    suggestions.current = [];
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.currentTarget instanceof HTMLInputElement && e.key === "ArrowDown") {
      e.preventDefault();
      linksElem.current[0]?.focus();
      return;
    }
    if (e.currentTarget instanceof HTMLLIElement === false) return;
    const index = Number(e.currentTarget.dataset.index);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      linksElem.current[index + 1]?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        inputElem.current?.focus();
        return;
      }
      linksElem.current[index - 1]?.focus();
    }
  };

  const fetchSuggestions = async () => {
    const response = await fakeFetch<IProductSuggestion[]>(
      "GET /api/products/suggestions",
      { search: searchStateRef.current }
    );
    if (response.error) return;
    console.log(searchStateRef.current.length);
    if (
      response.data &&
      focused.current &&
      searchStateRef.current.length >= MIN_SEARCH_LENGTH
    ) {
      suggestions.current = response.data;
      prevSearchLength.current = searchStateRef.current.length;
      setSuggestionsShown(suggestions.current.slice(0, SUGGESTIONS_LIMIT));
    }
  };

  return (
    <div
      className={`${classes.container}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <input
        className={`text-default dneutral-dark ${classes.input} ${
          suggestionsShown.length > 0 ? classes.withSuggestions : ""
        }`}
        type="text"
        role="combobox"
        aria-controls="suggestion-list"
        aria-autocomplete="list"
        aria-label="Pesquisar produtos"
        aria-expanded={suggestionsShown.length > 0}
        ref={inputElem}
        value={search}
        onChange={handleChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
      />
      {suggestionsShown.length > 0 && (
        <ul
          className={`bg-lneutral-xlight ${classes.suggestions}`}
          id="suggestion-list"
          role="listbox"
        >
          {suggestionsShown.map((item, index) => (
            <li
              className={`text-default dneutral-dark ${classes.suggestionItem}`}
              key={item.id}
              role="option"
              data-index={index}
              onKeyDown={handleKeyDown}
            >
              <Link
                to={`/product/${item.id}`}
                data-index={index}
                tabIndex={-1}
                ref={(el) => {
                  linksElem.current[index] = el!;
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
