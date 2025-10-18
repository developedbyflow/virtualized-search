import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VirtualizedList from "./VirtualizedList";

const highlightMatch = (text: string) => [text];

describe("VirtualizedList", () => {
  const items = Array.from({ length: 50 }, (_, index) => `Product ${index + 1}`);

  it("renders a subset of items based on the viewport", () => {
    const { container } = render(
      <VirtualizedList
        items={items}
        searchedItem=""
        onSelect={vi.fn()}
        itemHeight={40}
        containerHeight={160}
        highlightMatch={highlightMatch}
      />
    );

    const renderedItems = container.querySelectorAll(".suggestion-item");
    expect(renderedItems.length).toBeLessThan(items.length);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
  });

  it("updates rendered items when scrolling", async () => {
    const { container } = render(
      <VirtualizedList
        items={items}
        searchedItem=""
        onSelect={vi.fn()}
        itemHeight={40}
        containerHeight={160}
        highlightMatch={highlightMatch}
      />
    );

    const virtualContainer = container.querySelector(
      ".virtualized-container"
    ) as HTMLDivElement;

    virtualContainer.scrollTop = 400;
    fireEvent.scroll(virtualContainer);

    expect(await screen.findByText("Product 15")).toBeInTheDocument();
  });

  it("invokes onSelect when an item is clicked", async () => {
    const onSelect = vi.fn();
    render(
      <VirtualizedList
        items={items}
        searchedItem=""
        onSelect={onSelect}
        itemHeight={40}
        containerHeight={160}
        highlightMatch={highlightMatch}
      />
    );

    const firstItem = await screen.findByText("Product 1");
    fireEvent.click(firstItem);

    expect(onSelect).toHaveBeenCalledWith("Product 1");
  });
});
