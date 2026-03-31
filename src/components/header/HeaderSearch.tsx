import {
  useState,
  useEffect,
  useMemo,
  useId,
  useRef,
  type ChangeEventHandler,
  type FormEventHandler,
  type KeyboardEventHandler,
} from "react";
import { useLocation, useNavigate } from "react-router";

import HeaderSearchSuggestions from "./HeaderSearchSuggestions";

import useJafh from "@hooks/useJafh";
import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";

import classes from "./HeaderSearch.module.css";

const SEARCH_MAX_LENGTH = 100;
const DEBOUNCE_DELAY = 1000;
const MIN_SEARCH_LENGTH = 2;
const BLUR_DELAY = 50;

const HeaderSearch = () => {
  const [focused, setFocused] = useState(false);
  const lastSearchFetch = useRef<string>("");
  const blurTimeout = useRef<null | number>(null);
  const request = useFakeAPI<IProduct_Suggestion[]>("GET api/products/query");
  const location = useLocation();
  const navigate = useNavigate();
  const listId = useId();

  const searchForm = useJafh(
    {
      search: { value: "", validation: null },
    },
    "Erro na validação, tente novamente",
  );

  const fetchSuggestions = useDebounce(() => {
    const search = searchForm.fields.search.value;
    lastSearchFetch.current = search;
    request.fetch({
      filter: {
        name: search,
      },
      format: "suggestion",
      sort: "alphabetical",
    });
  }, DEBOUNCE_DELAY);

  const suggestions = useMemo(() => {
    const search = searchForm.fields.search.value;
    if (search.length < MIN_SEARCH_LENGTH) return [];
    if (!request.data) {
      fetchSuggestions();
      return [];
    }
    if (search === lastSearchFetch.current) return request.data;
    if (search.startsWith(lastSearchFetch.current)) {
      return request.data.filter((suggestion) => {
        return suggestion.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    fetchSuggestions();
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchForm.fields.search.value, request.data]);

  useEffect(() => {
    searchForm.updateField("search", "");
    setFocused(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const showSuggestions = focused && suggestions.length !== 0;

  const handleFocus = () => {
    setFocused(true);
    if (blurTimeout.current !== null) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  };

  const handleBlur = () => {
    blurTimeout.current = window.setTimeout(() => {
      setFocused(false);
    }, BLUR_DELAY);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(
      `/products?name=${encodeURIComponent(searchForm.fields.search.value)}`,
    );
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    searchForm.updateField("search", e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === "Escape") {
      setFocused(false);
    }
  };

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit}
      data-loading={request.loading}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <input
        className={`text-default dneutral-dark bg-lneutral-light ${classes.input}`}
        id="search"
        name="search"
        type="text"
        maxLength={SEARCH_MAX_LENGTH}
        role="combobox"
        data-showingsuggestions={showSuggestions}
        autoComplete="off"
        aria-expanded={showSuggestions}
        aria-controls={listId}
        aria-autocomplete="list"
        value={searchForm.fields.search.value}
        placeholder="Buscar produtos"
        onChange={handleChange}
      />
      <HeaderSearchSuggestions
        listId={listId}
        results={suggestions}
        query={searchForm.fields.search.value}
        show={showSuggestions}
      />
    </form>
  );
};

export default HeaderSearch;
