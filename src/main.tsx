import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeContextProvider, TodoProvider } from "./components/Export.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeContextProvider>
  </StrictMode>
);
