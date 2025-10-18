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
  return (
    <div
      className="suggestion-item"
      onClick={() => onSelect(item)}
      style={style}
    >
      {highlightMatch(item, searchedItem)}
    </div>
  );
};

export default SuggestionItem;
