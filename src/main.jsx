import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./Context/AppContextProvider";
import { ErrorBoundary } from 'react-error-boundary';
import FallbackPage from "./Components/FallbackPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={FallbackPage}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>,
);
