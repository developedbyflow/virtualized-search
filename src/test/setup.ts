// Bring in jest-dom matchers for vitest
import "@testing-library/jest-dom/vitest";

// Cleanup after each test automatically
// This removes all rendered components from the DOM
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Run cleanup after every test
afterEach(() => {
  cleanup();
});
