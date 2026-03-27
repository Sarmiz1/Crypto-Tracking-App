import { lazy, Suspense } from "react";
import { Box } from "@mui/material";

const TopCoinTable = lazy(() => import("./CoinTable_Components/TopCoinTable"));
const TrendingCoinTable = lazy(() => import("./CoinTable_Components/TrendingCoinTable"));
const WatchlistTable = lazy(() => import("./CoinTable_Components/WatchlistTable"));
const MostVisitedCoinTable = lazy(() => import("./CoinTable_Components/MostVisitedCoinTable"));
const NewCoinTable = lazy(() => import("./CoinTable_Components/NewCoinTable"));
const PredictionMarket = lazy(() => import("./CoinTable_Components/PredictionMarket"));

export default function CoinTable({ tabValue }) {
  return (
    <Box sx={{ my: 2 }}>
      <Suspense fallback={<p>Loading...</p>}>
        {tabValue === 0 && <TopCoinTable value={tabValue} />}
        {tabValue === 1 && <TrendingCoinTable value={tabValue} />}
        {tabValue === 2 && <WatchlistTable value={tabValue} />}
        {tabValue === 3 && <MostVisitedCoinTable value={tabValue} />}
        {tabValue === 4 && <NewCoinTable value={tabValue} />}
        {tabValue === 5 && <PredictionMarket value={tabValue} />}
      </Suspense>
    </Box>
  );
}