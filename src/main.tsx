import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SearchInput from "./SearchInput.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchInput />
  </StrictMode>
);
