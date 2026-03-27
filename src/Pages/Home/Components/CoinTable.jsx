import { lazy, Suspense } from "react";
import { Box } from "@mui/material";

const TopCoinTable = lazy(() => import("./CoinTable_Components/TopCoinTable"));
const TrendingCoinTable = lazy(() => import("./CoinTable_Components/TrendingCoinTable"));
const WatchlistTable = lazy(() => import("./CoinTable_Components/WatchlistTable"));
const MostVisitedCoinTable = lazy(() => import("./CoinTable_Components/MostVisitedCoinTable"));
const NewCoinTable = lazy(() => import("./CoinTable_Components/NewCoinTable"));
const PredictionMarket = lazy(() => import("./CoinTable_Components/PredictionMarket"));

export default function CoinTable({ tabValue }) {
  const tables = [
    TopCoinTable,
    TrendingCoinTable,
    WatchlistTable,
    MostVisitedCoinTable,
    NewCoinTable,
    PredictionMarket,
  ];

  const ActiveTable = tables[tabValue];

  return (
    <Box sx={{my: 4}}>
      <Suspense fallback={<p>Loading table...</p>}>
        {ActiveTable && <ActiveTable />}
      </Suspense>
    </Box>
  );
}