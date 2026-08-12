import {
  useState,
  useEffect,
  useMemo,
  useId,
  useRef,
  type KeyboardEventHandler,
} from "react";
import { useLocation, useNavigate } from "react-router";

import type { TProduct } from "../../app.types";

import SearchSuggestions from "./SearchSuggestions";

import useFakeAPI from "@hooks/useFakeAPI";
import useDebounce from "@hooks/useDebounce";
import { useAppForm } from "@hooks/useAppForm";
import { useSelector } from "@tanstack/react-form";

import { normalizeSearchText } from "@utils/normalizeSearchText";

import classes from "./Search.module.css";

const SEARCH_MAX_LENGTH = 100;
const DEBOUNCE_DELAY = 1000;
const MIN_SEARCH_LENGTH = 2;
const BLUR_DELAY = 50;

const Search = () => {
  const [focused, setFocused] = useState(false);
  const lastSearchFetch = useRef<string>("");
  const blurTimeout = useRef<null | number>(null);
  const location = useLocation();
  const listId = useId();

  const navigate = useNavigate();

  const request = useFakeAPI<TProduct["suggestion"][]>("GET api/products/query");

  const form = useAppForm({
    defaultValues: { search: "" },
    onSubmit: ({ value }) => {
      navigate(`/catalog?search=${encodeURIComponent(value.search.trim())}`);
    },
  });
  const search = useSelector(form.store, (state) => state.values.search);

  const fetchSuggestions = useDebounce(() => {
    lastSearchFetch.current = search;
    request.fetch({
      filter: {
        search: search.trim(),
      },
      pattern: "suggestion",
      sort: "alphabetical",
    });
  }, DEBOUNCE_DELAY);

  const suggestions = useMemo(() => {
    if (search.length < MIN_SEARCH_LENGTH) return [];
    if (!request.data) {
      fetchSuggestions();
      return [];
    }
    if (search === lastSearchFetch.current) return request.data;
    if (search.startsWith(lastSearchFetch.current)) {
      return request.data.filter(({ searchName }) => {
        return searchName.includes(normalizeSearchText(search));
      });
    }
    fetchSuggestions();
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, request.data]);

  useEffect(() => {
    form.setFieldValue("search", "");
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

  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (e.key === "Escape") {
      setFocused(false);
    }
  };

  return (
    <form.AppForm>
      <form
        className={classes.container}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        data-loading={request.loading}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <form.Field
          name="search"
          children={(field) => (
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
              placeholder="Buscar produtos"
              value={field.state.value}
              onChange={(e) => {
                field.setValue(e.target.value);
              }}
            />
          )}
        />
        <SearchSuggestions
          listId={listId}
          results={suggestions}
          query={search}
          show={showSuggestions}
        />
      </form>
    </form.AppForm>
  );
};

export default Search;
