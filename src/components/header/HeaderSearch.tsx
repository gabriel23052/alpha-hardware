import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

import useFakeAPI from "@hooks/useFakeAPI";
import useJafh from "@hooks/useJafh";
import useDebounce from "@hooks/useDebounce";

import classes from "./HeaderSearch.module.css";

const NUMBER_OF_SUGGESTIONS = 5;
const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY = 500;
const BLUR_DELAY = 200;

const HeaderSearch = () => {
  const searchForm = useJafh(
    {
      search: { value: "", validation: null },
    },
    "Erro na validação, tente novamente"
  );

  const api = useFakeAPI<IProductSuggestion[]>("GET /api/products/suggestions");

  const [focused, setFocused] = useState(false);

  const previousSearch = useRef("");
  const blurTimeout = useRef<number | null>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const moreItemsLinkRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const listId = useId();

  useEffect(() => {
    const search = searchForm.fields.search.value;
    setFocused(true);
    if (
      search.length < MIN_SEARCH_LENGTH ||
      (api.data &&
        api.data.length !== 0 &&
        search.substring(0, previousSearch.current.length) ===
          previousSearch.current)
    )
      return;
    fetchNewSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchForm.fields.search.value]);

  const suggestions = useMemo(() => {
    const search = searchForm.fields.search.value;
    if (search.length < MIN_SEARCH_LENGTH) {
      return [];
    }
    if (api.data && api.data.length > 0) {
      if (search === previousSearch.current) {
        return api.data.slice(0, NUMBER_OF_SUGGESTIONS);
      }
      if (search.length > previousSearch.current.length) {
        const filtered: IProductSuggestion[] = [];
        for (const suggestion of api.data) {
          if (
            suggestion &&
            suggestion.name.toLowerCase().includes(search.toLowerCase())
          ) {
            filtered.push(suggestion);
          }
          if (filtered.length >= NUMBER_OF_SUGGESTIONS) break;
        }
        return filtered;
      }
    }
    return [];
  }, [api.data, searchForm.fields.search.value]);

  const fetchNewSuggestions = useDebounce(() => {
    const search = searchForm.fields.search.value;
    previousSearch.current = search;
    api.fetch({ search });
  }, DEBOUNCE_DELAY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchForm.updateField("search", e.target.value);
  };

  const handleClick = () => {
    searchForm.updateField("search", "");
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        setFocused(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (e.currentTarget instanceof HTMLInputElement) {
          linksRef.current[0]?.focus();
        }
        if (e.currentTarget instanceof HTMLLIElement) {
          const index = Number(e.currentTarget.dataset.index);
          (linksRef.current[index + 1] || moreItemsLinkRef.current).focus();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (e.currentTarget instanceof HTMLLIElement) {
          const index = Number(e.currentTarget.dataset.index);
          (linksRef.current[index - 1] || inputRef.current).focus();
        }
        if (e.currentTarget instanceof HTMLAnchorElement) {
          linksRef.current[linksRef.current.length - 1].focus();
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFocused(false);
    searchForm.updateField("search", "");
    inputRef.current?.blur();
    navigate(
      `/products?name=${encodeURIComponent(searchForm.fields.search.value)}`
    );
  };

  const handleFocus = () => {
    if (blurTimeout.current !== null) window.clearTimeout(blurTimeout.current);
    setFocused(true);
  };

  const handleBlur = () => {
    blurTimeout.current = window.setTimeout(
      () => setFocused(false),
      BLUR_DELAY
    );
  };

  return (
    <form
      className={`${classes.container} ${api.loading ? classes.loading : ""}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    >
      <input
        className={`text-default dneutral-dark bg-lneutral-light ${
          classes.input
        } ${
          focused && (suggestions.length > 0 || api.error) ? classes.opened : ""
        }`}
        type="text"
        id="search"
        name="search"
        ref={inputRef}
        value={searchForm.fields.search.value}
        autoComplete="off"
        role="combobox"
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label="Pesquisar produtos"
        aria-expanded={suggestions.length > 0}
        maxLength={100}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {focused && api.error && (
        <div
          className={`bg-lneutral-xlight primary-dark text-default ${classes.contentContainer} ${classes.error}`}
        >
          {api.error}
        </div>
      )}
      {focused && suggestions.length > 0 && (
        <div className={`bg-white ${classes.contentContainer}`}>
          <ul className={`${classes.list}`} id={listId} role="listbox">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                role="option"
                data-index={index}
                onKeyDown={handleKeyDown}
              >
                <Link
                  className={`text-default dneutral`}
                  to={`/product/${suggestion.id}`}
                  data-index={index}
                  tabIndex={-1}
                  ref={(el) => {
                    linksRef.current[index] = el!;
                  }}
                  onClick={handleClick}
                >
                  {suggestion.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={`/products?name=${encodeURIComponent(
              searchForm.fields.search.value
            )}`}
            className={`text-small dneutral ${classes.moreItemsLink}`}
            onClick={handleClick}
            ref={moreItemsLinkRef}
            onKeyDown={handleKeyDown}
          >
            Exibir mais resultados
          </Link>
        </div>
      )}
    </form>
  );
};

export default HeaderSearch;
