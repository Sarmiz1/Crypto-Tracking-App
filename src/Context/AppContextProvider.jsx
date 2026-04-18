import { useState, useMemo, useEffect } from "react";
import { useFetch } from "../Hooks/useFetch";
import { appContext as AppContext } from "./AppContext";

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  // Memoize sub-objects to ensure stable references for consumers
  const cryptoListingValue = useMemo(() => ({
    data: topCoinsFetch.data,
    loading: topCoinsFetch.loading,
    error: topCoinsFetch.error,
  }), [topCoinsFetch.data, topCoinsFetch.loading, topCoinsFetch.error]);

  const globalMetricsValue = useMemo(() => ({
    data: globalFetch.data?.data,
    loading: globalFetch.loading || fearGreedFetch.loading,
    error: globalFetch.error || fearGreedFetch.error,
    fearGreed: fearGreedFetch.data?.data?.[0] || null,
  }), [globalFetch.data, globalFetch.loading, fearGreedFetch.data, fearGreedFetch.loading, globalFetch.error, fearGreedFetch.error]);

  const trendingCryptosValue = useMemo(() => ({
    data: trendingWithSparkline,
    loading: trendingFetch.loading || topCoinsFetch.loading,
    error: trendingFetch.error || topCoinsFetch.error,
  }), [trendingWithSparkline, trendingFetch.loading, topCoinsFetch.loading, trendingFetch.error, topCoinsFetch.error]);

  const predictionMarketsValue = useMemo(() => ({
    data: predictionFetch.data,
    loading: predictionFetch.loading,
    error: predictionFetch.error,
  }), [predictionFetch.data, predictionFetch.loading, predictionFetch.error]);

  const defiValue = useMemo(() => ({
    data: defiFetch.data,
    loading: defiFetch.loading,
    error: defiFetch.error,
  }), [defiFetch.data, defiFetch.loading, defiFetch.error]);

  const stableCoinsValue = useMemo(() => ({
    data: stablecoinsFetch.data,
    loading: stablecoinsFetch.loading,
    error: stablecoinsFetch.error,
  }), [stablecoinsFetch.data, stablecoinsFetch.loading, stablecoinsFetch.error]);

  const bitcoinValue = useMemo(() => ({
    data: bitcoinFetch.data,
    loading: bitcoinFetch.loading,
    error: bitcoinFetch.error,
  }), [bitcoinFetch.data, bitcoinFetch.loading, bitcoinFetch.error]);

  const watchListValue = useMemo(() => ({
    watchlist,
    setWatchlist
  }), [watchlist]);

  // Wrap the final context value in useMemo to prevent unnecessary re-renders of all context consumers
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

    cryptoListing: cryptoListingValue,
    globalMetrics: globalMetricsValue,
    trendingCryptos: trendingCryptosValue,
    predictionMarkets: predictionMarketsValue,
    defi: defiValue,
    stableCoins: stableCoinsValue,
    bitcoin: bitcoinValue,
    watchList: watchListValue
  }), [
    tabValue,
    mode,
    currency,
    watchlist,
    cryptoListingValue,
    globalMetricsValue,
    trendingCryptosValue,
    predictionMarketsValue,
    defiValue,
    stableCoinsValue,
    bitcoinValue,
    watchListValue
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}