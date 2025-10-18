import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

vi.mock("./utils/getApiData", () => ({
  getDataFromAlgolia: vi.fn(),
}));

import { getDataFromAlgolia } from "./utils/getApiData";

const mockGetDataFromAlgolia = vi.mocked(getDataFromAlgolia);

/**
 * Essential SearchInput Tests
 * Testing critical user flows
 */

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search input", () => {
    render(<SearchInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should display results after typing", async () => {
    mockGetDataFromAlgolia.mockResolvedValue(["iPhone", "iPad"]);

    const user = userEvent.setup();
    render(<SearchInput />);

    await user.type(screen.getByRole("textbox"), "apple");

    await waitFor(() => {
      expect(screen.getByText("iPhone")).toBeInTheDocument();
    });
  });

  it("should show loading state", async () => {
    mockGetDataFromAlgolia.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 1000))
    );

    const user = userEvent.setup();
    render(<SearchInput />);
    await user.type(screen.getByRole("textbox"), "test");

    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it("should clear input with X button", async () => {
    const user = userEvent.setup();
    render(<SearchInput />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");
    expect(input).toHaveValue("test");

    await user.click(screen.getByLabelText(/clear/i));
    expect(input).toHaveValue("");
  });
});
