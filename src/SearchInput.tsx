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
        <input
          id="search-box"
          type="text"
          className="search-input"
          placeholder="Type to search..."
          value={searchedItem}
          onChange={handleChange}
        />
      </div>

      {isLoading && <div className="status-message loading">Loading...</div>}
      {error && <div className="status-message error">{error}</div>}

      {!isLoading && suggestedItems.length > 0 && (
        <ul className="suggestions-list">
          {suggestedItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="suggestion-item"
            >
              {highlightMatchSuggestions(item, searchedItem)}
            </li>
          ))}
        </ul>
      )}

      {hasNoResults && (
        <div className="status-message no-results">
          No matches found for “{searchedItem.trim()}”
        </div>
      )}
    </section>
  );
}

export default SearchInput;
