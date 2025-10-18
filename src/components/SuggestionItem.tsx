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

  const handleClick = React.useCallback(() => {
    onSelect(item);
  }, [onSelect, item]);

  return (
    <div className="suggestion-item" onClick={handleClick} style={style}>
      {highlightMatch(item, searchedItem)}
    </div>
  );
};


export default React.memo(SuggestionItem);
