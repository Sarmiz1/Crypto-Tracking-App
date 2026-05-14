import { lazy, Suspense, useContext } from "react";
import { Box } from "@mui/material";
import { TablesFallbackPage } from "../../../Suspense/TablesFallBackPage";
import { appContext } from "../../../Context/AppContextProvider";

// Lazy Loaded Components
const TopCoinTable = lazy(() => import("./CoinTable_Components/TopCoinTable"));
const TrendingCoinTable = lazy(() => import("./CoinTable_Components/TrendingCoinTable"));
const WatchlistTable = lazy(() => import("./CoinTable_Components/WatchlistTable"));
const MostVisitedCoinTable = lazy(() => import("./CoinTable_Components/MostVisitedCoinTable"));
const NewCoinTable = lazy(() => import("./CoinTable_Components/NewCoinTable"));
const PredictionMarket = lazy(() => import("./CoinTable_Components/PredictionMarket"));


export default function CoinTable({ tabValue = 0 }) {
  const {
    cryptoListing,
    currency,
    trendingCryptos,
    watchList,
    predictionMarkets,
    mode,
  } = useContext(appContext);

  return (
    <Box sx={{ my: 2 }}>
      <Suspense fallback={<TablesFallbackPage />}>
        {tabValue === 0 && (
          <TopCoinTable
            value={tabValue}
            cryptoListing={cryptoListing}
            currency={currency}
          />
        )}
        {tabValue === 1 && (
          <TrendingCoinTable
            value={tabValue}
            trendingCryptos={trendingCryptos}
            currency={currency}
          />
        )}
        {tabValue === 2 && (
          <WatchlistTable
            value={tabValue}
            watchList={watchList}
            currency={currency}
          />
        )}
        {tabValue === 3 && (
          <PredictionMarket
            value={tabValue}
            predictionMarkets={predictionMarkets}
            mode={mode}
          />
        )}
        {tabValue === 4 && (
          <MostVisitedCoinTable
            value={tabValue}
            cryptoListing={cryptoListing}
            currency={currency}
          />
        )}
        {tabValue === 5 && (
          <NewCoinTable
            value={tabValue}
            cryptoListing={cryptoListing}
            currency={currency}
          />
        )}
      </Suspense>
    </Box>
  );
}