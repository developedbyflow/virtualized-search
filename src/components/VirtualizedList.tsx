import React, { useState, useRef, useMemo, useCallback } from "react";
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

  // Memoize handleScroll to prevent re-creating on every render
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Memoize total height calculation
  const totalHeight = useMemo(() => {
    return items.length * itemHeight;
  }, [items.length, itemHeight]);

  // Memoize visible range calculations
  const { startIndex, visibleItems } = useMemo(() => {
    const start = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - BUFFERED_ITEMS
    );
    const end = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + BUFFERED_ITEMS
    );

    return {
      startIndex: start,
      visibleItems: items.slice(start, end + 1),
    };
  }, [scrollTop, itemHeight, containerHeight, items]);

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
