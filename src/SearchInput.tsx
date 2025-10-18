import React, { useCallback } from "react";
import VirtualizedList from "./components/VirtualizedList";
import useSearch from "./hooks/useSearch";
import highlightMatchSuggestions from "./utils/highlightMatchSuggestions";
import { getDataFromAlgolia } from "./utils/getApiData";
import "./SearchInput.css";

function SearchInput() {
  const {
    searchedItem,
    suggestedItems,
    handleChange,
    handleSelect,
    isLoading,
    error,
    clearCache,
    isItemSelected,
  } = useSearch(getDataFromAlgolia);

  const hasNoResults =
    !isLoading &&
    !error &&
    searchedItem.trim() !== "" &&
    suggestedItems.length === 0 &&
    !isItemSelected;

  const highlightMatch = useCallback(highlightMatchSuggestions, []);

  const handleClearInput = useCallback(() => {
    handleChange({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [handleChange]);

  return (
    <section className="search-container">
      <div className="search-header">
        <h1>Smart Search</h1>
      </div>
      <button onClick={clearCache} className="clear-cache-btn">
        <span>🧹</span>
        <span>Clear Cache</span>
      </button>

      <div className="search-input-wrapper">
        <label htmlFor="search-box" className="search-label">
          Search Product
        </label>
        <div className="input-with-clear">
          <input
            id="search-box"
            type="text"
            className="search-input"
            placeholder="Type to search..."
            value={searchedItem}
            onChange={handleChange}
          />
          {searchedItem && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={handleClearInput}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {isLoading && <div className="status-message loading">Loading...</div>}
      {error && <div className="status-message error">{error}</div>}

      {!isLoading && suggestedItems.length > 0 && (
        <div className="suggestions-list">
          <VirtualizedList
            items={suggestedItems}
            searchedItem={searchedItem}
            onSelect={handleSelect}
            itemHeight={60}
            containerHeight={400}
            highlightMatch={highlightMatch}
          />
        </div>
      )}

      {hasNoResults && (
        <div className="status-message no-results">
          No matches found for "{searchedItem.trim()}"
        </div>
      )}
    </section>
  );
}

export default SearchInput;
