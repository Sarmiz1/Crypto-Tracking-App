import { createContext, useState, useMemo } from "react";
import { useFetch } from "../Hooks/useFetch";

export const appContext = createContext();

export default function AppContextProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [tabValue, setTabValue] = useState(0);
  const [currency, setCurrency] = useState({ name: "USD", symbol: "$" });
  const [watchlist, setWatchlist] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // --- Top 100 Crypto List CoinGecko with sparkline ---
  const {
    data: topCoins,
    loading: topLoading,
    error: topError,
  } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=true`,
  );

  // --- Global crypto metrics from CoinGecko ---
  const {
    data: globalData,
    loading: globalLoading,
    error: globalError,
  } = useFetch("https://api.coingecko.com/api/v3/global");

  // --- Fear & Greed Index ---
  const {
    data: fearGreedData,
    loading: fgLoading,
    error: fgError,
  } = useFetch("https://api.alternative.me/fng/");

  // --- Global Trending Coins from CoinGecko ---
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch("https://api.coingecko.com/api/v3/search/trending");

  // --- Merge trending coins with topCoins to get sparkline/chart data ---
  const trendingWithSparkline = useMemo(() => {
    if (!topCoins || !trendingData) return [];
    const topCoinsMap = new Map(topCoins.map((c) => [c.id, c]));
    return trendingData.coins
      .map((c) => topCoinsMap.get(c.item.id))
      .filter(Boolean); // only keep coins we have data for
  }, [topCoins, trendingData]);

  // --- Prediction Markets From ---
  const {
    data: predictionMarket,
    loading: predictionLoading,
    error: predictionError,
  } = useFetch(
    "https://api.manifold.markets/v0/markets?limit=20&sort=last-bet-time"
  );
          
  console.log(predictionMarket)
  console.log(predictionError)

  const value = {
    tabValue,
    setTabValue,
    handleTabChange,
    mode,
    setMode,
    currency,
    setCurrency,
    cryptoListing: { data: topCoins, loading: topLoading, error: topError },
    globalMetrics: {
      data: globalData,
      loading: globalLoading || fgLoading,
      error: globalError || fgError,
      fearGreed: fearGreedData?.data?.[0] || null,
    },
    trendingCryptos: {
      data: trendingWithSparkline,
      loading: trendingLoading || topLoading,
      error: trendingError || topError,
    },
    watchList: {
      watchlist,
      setWatchlist,
    },
    predictionMarkets: {
      data: predictionMarket,
      loading: predictionLoading,
      error: predictionError,
    },
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}
