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

  /* ---------------- TOP 100 (refetch when currency changes) ---------------- */

  const topCoinsUrl = useMemo(() => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=true`;
  }, [currency.name]);

  const topCoinsFetch = useFetch(
    topCoinsUrl,
    {},
    [currency.name] // refetch ONLY when currency changes
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


  console.log(globalFetch.data?.data)

  /* ---------------- CONTEXT VALUE ---------------- */

  const value = {
    tabValue,
    setTabValue,
    handleTabChange,
    mode,
    setMode,
    currency,
    setCurrency,
    watchlist,
    setWatchlist,

    cryptoListing: {
      data: topCoinsFetch.data,
      loading: topCoinsFetch.loading,
      error: topCoinsFetch.error,
    },

    globalMetrics: {
      data: globalFetch.data?.data,
      loading: globalFetch.loading || fearGreedFetch.loading,
      error: globalFetch.error || fearGreedFetch.error,
      fearGreed: fearGreedFetch.data?.data?.[0] || null,
    },

    trendingCryptos: {
      data: trendingWithSparkline,
      loading: trendingFetch.loading || topCoinsFetch.loading,
      error: trendingFetch.error || topCoinsFetch.error,
    },

    predictionMarkets: {
      data: predictionFetch.data,
      loading: predictionFetch.loading,
      error: predictionFetch.error,
    },

    defi: {
      data: defiFetch.data,
      loading: defiFetch.loading,
      error: defiFetch.error,
    },

    stableCoins: {
      data: stablecoinsFetch.data,
      loading: stablecoinsFetch.loading,
      error: stablecoinsFetch.error,
    },

    bitcoin: {
      data: bitcoinFetch.data,
      loading: bitcoinFetch.loading,
      error: bitcoinFetch.error,
    },
    watchList: {watchlist , setWatchlist}
  };

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
}