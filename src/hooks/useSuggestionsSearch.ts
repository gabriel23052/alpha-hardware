import { useEffect, useRef, useState } from "react";

import request from "@fakeAPI/request";

import useDebounce from "./useDebounce";

const SUGGESTIONS_LIMIT = 5;
const MIN_SEARCH_LENGTH = 3;
const DEBOUNCE_DELAY = 1000;

export default function useSuggestionsSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [suggestionsShown, setSuggestionsShown] = useState<
    IProductSuggestion[]
  >([]);

  const searchStateRef = useRef("");
  const fetchID = useRef(0);
  const prevSearchLength = useRef(0);
  const suggestions = useRef<IProductSuggestion[]>([]);
  const visible = useRef(false);

  const debouncedSuggestionsSearch = useDebounce((searchInApi: boolean) => {
    if (searchInApi) {
      if (
        visible.current &&
        searchStateRef.current.length >= MIN_SEARCH_LENGTH
      ) {
        setSuggestionsShown([]);
        setError(null);
        fetchSuggestions();
      }
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
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    searchStateRef.current = search;
    if (search.length < MIN_SEARCH_LENGTH) {
      closeSuggestions();
      suggestions.current = [];
      return;
    }
    if (
      search.length < prevSearchLength.current ||
      suggestions.current.length === 0
    ) {
      suggestions.current = [];
      fetchID.current++;
      debouncedSuggestionsSearch(true);
      return;
    }
    debouncedSuggestionsSearch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const closeSuggestions = () => {
    setSuggestionsShown([]);
    setLoading(false);
    setError(null);
  };

  const resetSuggestions = () => {
    suggestions.current = [];
  };

  const fetchSuggestions = async () => {
    const currentFetchID = fetchID.current;
    setLoading(true);
    const response = await request<IProductSuggestion[]>(
      "GET /api/products/suggestions",
      { search: searchStateRef.current.trim() }
    );
    if (currentFetchID !== fetchID.current) {
      return;
    }
    setLoading(false);
    if (!visible.current || searchStateRef.current.length < MIN_SEARCH_LENGTH)
      return;
    if (response.error) {
      setError("Erro ao buscar sugestões de produtos");
      setSuggestionsShown([]);
    }
    if (response.data) {
      suggestions.current = response.data;
      prevSearchLength.current = searchStateRef.current.length;
      setError(null);
      setSuggestionsShown(suggestions.current.slice(0, SUGGESTIONS_LIMIT));
    }
  };

  return {
    search,
    setSearch,
    error,
    loading,
    suggestionsShown,
    closeSuggestions,
    resetSuggestions,
    visible,
  };
}
