import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextProviderFunc from "./context/AppContexts.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProviderFunc>
      <App />
    </AppContextProviderFunc>
  </StrictMode>
);
