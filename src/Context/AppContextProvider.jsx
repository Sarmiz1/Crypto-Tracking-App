import { createContext, useState } from "react";
import { useFetch } from "../Hooks/useFetch";

export const appContext = createContext();

export default function AppContextProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [tabValue, setTabValue] = useState(0);
  const [currency, setCurrency] = useState({name:'USD', symbol:'$'});

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // --- Top 100 Crypto List CoinGecko ---
  const { data, loading, error } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=true`,
  );

   // --- Global crypto metrics from CoinGecko ---
  const { data: globalData, loading: globalLoading, error: globalError } =
    useFetch("https://api.coingecko.com/api/v3/global");

  // --- Fear & Greed Index ---
  const { data: fearGreedData, loading: fgLoading, error: fgError } =
    useFetch("https://api.alternative.me/fng/");


  const value = {
    tabValue,
    setTabValue,
    handleTabChange,
    mode,
    setMode,
    currency,
    setCurrency,
    cryptoListing: { data, loading, error },
    globalMetrics: {
      data: globalData,
      loading: globalLoading || fgLoading,
      error: globalError || fgError,
      fearGreed: fearGreedData?.data?.[0] || null
    },
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}
