import { useState, useEffect, useMemo, useCallback } from "react";
import { createSimpleLRU } from "../utils/createSimpleLruCache";
import useDebounce from "./useDebounce";

type GetDataFunction = (query: string) => Promise<string[]>;

interface UseSearchReturn {
  searchedItem: string;
  suggestedItems: string[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (item: string) => void;
  isLoading: boolean;
  error: string | null;
  clearCache: () => void;
  isItemSelected: boolean;
}

export const useSearch = (getData: GetDataFunction): UseSearchReturn => {
  const [searchedItem, setSearchedItem] = useState("");
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isItemSelected, setIsItemSelected] = useState(false);

  const cache = useMemo(() => createSimpleLRU<string[]>(20), []);
  const debouncedQuery = useDebounce(searchedItem, 300);

  useEffect(() => {
    const query = debouncedQuery.trim().toLowerCase();

    if (!query) {
      setSuggestedItems([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    let ignore = false;

    const fetchSuggestions = async (): Promise<void> => {
      const cached = cache.get(query);
      if (cached) {
        console.log("Cache HIT for:", query);
        setSuggestedItems(cached);
        return;
      }

      console.log("API call for:", query);
      setIsLoading(true);
      setError(null);

      try {
        const result = await getData(query);
        if (!ignore) {
          setSuggestedItems(result);
          cache.set(query, result);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch suggestions"
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchSuggestions();

    return () => {
      ignore = true;
    };
  }, [debouncedQuery, getData, cache, isItemSelected]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setSearchedItem(event.target.value);
      setIsItemSelected(false);
    },
    []
  );

  const handleSelect = useCallback((item: string): void => {
    setSearchedItem(item);
    setSuggestedItems([]);
    setIsItemSelected(true);
  }, []);

  const clearCache = useCallback((): void => {
    cache.clear();
  }, [cache]);

  return {
    searchedItem,
    suggestedItems,
    handleChange,
    handleSelect,
    isLoading,
    error,
    clearCache,
    isItemSelected,
  };
};

export default useSearch;
