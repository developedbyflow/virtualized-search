import React, { useState, useRef } from "react";
import SuggestionItem from "./SuggestionItem";

interface VirtualizedListProps {
  items: string[];
  searchedItem: string;
  onSelect: (item: string) => void;
  itemHeight: number;
  containerHeight: number;
  highlightMatch: (
    text: string,
    query: string
  ) => (string | React.ReactElement)[];
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  searchedItem,
  onSelect,
  itemHeight,
  containerHeight,
  highlightMatch,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const BUFFERED_ITEMS = 4;
  console.log({ scrollTop });
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Calculate visible range
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - BUFFERED_ITEMS
  );
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + BUFFERED_ITEMS
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      className="virtualized-container"
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Spacer to maintain total height */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <SuggestionItem
              key={actualIndex}
              item={item}
              searchedItem={searchedItem}
              onSelect={onSelect}
              highlightMatch={highlightMatch}
              style={{
                position: "absolute",
                top: actualIndex * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
