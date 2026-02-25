import { createContext, useState } from "react";

export const appContext = createContext();

export default function AppProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [tabValue, setTabValue] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const value = {
    tabValue,
    setTabValue,
    handleTabChange,
    mode,
    setMode,
    currency,
    setCurrency,
  };

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
}