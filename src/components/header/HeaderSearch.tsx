import { useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router";

import useSuggestionsSearch from "@hooks/useSuggestionsSearch";

import classes from "./HeaderSearch.module.css";

const BLUR_DELAY = 100;

const HeaderSearch = () => {
  const {
    search,
    suggestionsShown,
    loading,
    error,
    setSearch,
    closeSuggestions,
    resetSuggestions,
    visible,
  } = useSuggestionsSearch();

  const navigate = useNavigate();

  const blurTimeout = useRef<number | null>(null);
  const inputElem = useRef<HTMLInputElement>(null);
  const linksElem = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    return () => {
      if (blurTimeout.current) {
        clearTimeout(blurTimeout.current);
      }
    };
  }, []);

  const handleBlur = () => {
    visible.current = false;
    blurTimeout.current = window.setTimeout(() => {
      if (!visible.current) {
        closeSuggestions();
      }
    }, BLUR_DELAY);
  };

  const handleFocus = () => {
    visible.current = true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.length > 0) {
      navigate(`/products?name=${search}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSuggestions();
    }
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

  return (
    <form
      className={`${classes.container}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    >
      <input
        className={`text-default dneutral-dark bg-lneutral-light ${
          classes.input
        } ${
          suggestionsShown.length > 0 || error || loading
            ? classes.withSuggestions
            : ""
        }`}
        type="text"
        ref={inputElem}
        value={search}
        onChange={handleChange}
        onPaste={resetSuggestions}
        onKeyDown={handleKeyDown}
        role="combobox"
        aria-controls="suggestion-list"
        aria-autocomplete="list"
        aria-label="Pesquisar produtos"
        aria-expanded={suggestionsShown.length > 0}
      />
      <div
        className={`bg-lneutral-xlight ${classes.suggestionsContainer} ${
          loading ? classes.loading : ""
        }`}
      >
        {error && (
          <div className={`primary text-default ${classes.error}`}>{error}</div>
        )}
        {suggestionsShown.length > 0 && (
          <ul
            className={`${classes.suggestions}`}
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
    </form>
  );
};

export default HeaderSearch;
