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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <ErrorBoundary fallback={<p>Something went wrong. Try again later.</p>}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </AppContextProvider>
  </StrictMode>,
);
