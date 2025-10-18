import React from "react";

interface SuggestionItemProps {
  item: string;
  searchedItem: string;
  onSelect: (item: string) => void;
  style?: React.CSSProperties;
  highlightMatch: (
    text: string,
    query: string
  ) => (string | React.ReactElement)[];
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  item,
  searchedItem,
  onSelect,
  style,
  highlightMatch,
}) => {
  // Memoize the onClick handler to prevent re-creating on every render
  const handleClick = React.useCallback(() => {
    onSelect(item);
  }, [onSelect, item]);

  return (
    <div className="suggestion-item" onClick={handleClick} style={style}>
      {highlightMatch(item, searchedItem)}
    </div>
  );
};

// Wrap with React.memo to prevent re-renders when props haven't changed
export default React.memo(SuggestionItem);
