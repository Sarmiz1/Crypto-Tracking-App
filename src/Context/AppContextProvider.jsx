import { createContext, useState, useMemo, useEffect, useCallback } from "react";
import { useFetch } from "../Hooks/useFetch";

/* eslint-disable-next-line react-refresh/only-export-components */
export const appContext = createContext();

export default function AppContextProvider({ children }) {

  const getSystemMode = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // fallback
  };

  const [mode, setMode] = useState(getSystemMode);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setMode(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);



  const [tabValue, setTabValue] = useState(0);
  const [currency, setCurrency] = useState({ name: "USD", symbol: "$" });
  const [watchlist, setWatchlist] = useState([]);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  /* ---------------- TOP 100 (refetch when currency changes) ---------------- */

  const topCoinsUrl = useMemo(() => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;
  }, [currency.name]);

  const topCoinsFetch = useFetch(
    topCoinsUrl,
    {},
    [currency.name]
  );

  /* ---------------- FETCH ONCE (mount only) ---------------- */

  const globalFetch = useFetch(
    "https://api.coingecko.com/api/v3/global"
  );

  const fearGreedFetch = useFetch(
    "https://api.alternative.me/fng/"
  );

  const trendingFetch = useFetch(
    "https://api.coingecko.com/api/v3/search/trending"
  );

  const predictionFetch = useFetch(
    "https://api.manifold.markets/v0/markets?limit=20&sort=last-bet-time"
  );

  const defiFetch = useFetch(
    "https://api.coingecko.com/api/v3/global/decentralized_finance_defi"
  );

  const stablecoinsFetch = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=50&page=1"
  );

  const bitcoinFetch = useFetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin"
  );


  /* ---------------- MERGE TRENDING + TOP COINS ---------------- */

  const trendingWithSparkline = useMemo(() => {
    if (!topCoinsFetch.data || !trendingFetch.data) return [];

    const topMap = new Map(
      topCoinsFetch.data.map((coin) => [coin.id, coin])
    );

    return trendingFetch.data.coins
      .map((coin) => topMap.get(coin.item.id))
      .filter(Boolean);
  }, [topCoinsFetch.data, trendingFetch.data]);

  /* ---------------- CONTEXT VALUE ---------------- */

  const cryptoListing = useMemo(() => ({
    data: topCoinsFetch.data,
    loading: topCoinsFetch.loading,
    error: topCoinsFetch.error,
  }), [topCoinsFetch.data, topCoinsFetch.loading, topCoinsFetch.error]);

  const globalMetrics = useMemo(() => ({
    data: globalFetch.data?.data,
    loading: globalFetch.loading || fearGreedFetch.loading,
    error: globalFetch.error || fearGreedFetch.error,
    fearGreed: fearGreedFetch.data?.data?.[0] || null,
  }), [globalFetch.data, globalFetch.loading, globalFetch.error, fearGreedFetch.loading, fearGreedFetch.error, fearGreedFetch.data]);

  const trendingCryptos = useMemo(() => ({
    data: trendingWithSparkline,
    loading: trendingFetch.loading || topCoinsFetch.loading,
    error: trendingFetch.error || topCoinsFetch.error,
  }), [trendingWithSparkline, trendingFetch.loading, trendingFetch.error, topCoinsFetch.loading, topCoinsFetch.error]);

  const predictionMarkets = useMemo(() => ({
    data: predictionFetch.data,
    loading: predictionFetch.loading,
    error: predictionFetch.error,
  }), [predictionFetch.data, predictionFetch.loading, predictionFetch.error]);

  const defi = useMemo(() => ({
    data: defiFetch.data,
    loading: defiFetch.loading,
    error: defiFetch.error,
  }), [defiFetch.data, defiFetch.loading, defiFetch.error]);

  const stableCoins = useMemo(() => ({
    data: stablecoinsFetch.data,
    loading: stablecoinsFetch.loading,
    error: stablecoinsFetch.error,
  }), [stablecoinsFetch.data, stablecoinsFetch.loading, stablecoinsFetch.error]);

  const bitcoin = useMemo(() => ({
    data: bitcoinFetch.data,
    loading: bitcoinFetch.loading,
    error: bitcoinFetch.error,
  }), [bitcoinFetch.data, bitcoinFetch.loading, bitcoinFetch.error]);

  const watchList = useMemo(() => ({
    watchlist,
    setWatchlist,
  }), [watchlist]);

  const value = useMemo(() => ({
    tabValue,
    setTabValue,
    handleTabChange,
    mode,
    setMode,
    currency,
    setCurrency,
    watchlist,
    setWatchlist,

    cryptoListing,
    globalMetrics,
    trendingCryptos,
    predictionMarkets,
    defi,
    stableCoins,
    bitcoin,
    watchList
  }), [
    tabValue,
    handleTabChange,
    mode,
    currency,
    watchlist,
    cryptoListing,
    globalMetrics,
    trendingCryptos,
    predictionMarkets,
    defi,
    stableCoins,
    bitcoin,
    watchList
  ]);

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
}