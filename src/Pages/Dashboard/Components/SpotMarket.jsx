import { Box } from "@mui/material";
import { Header } from "./SpotMarket_Components/Header";
import { SpotFilterTable } from "./SpotMarket_Components/SpotFilterTable";
import { lazy, Suspense } from "react";
import AboutSpotMarket from "./SpotMarket_Components/AboutSpotMarket";

const CryptoMarketCapChart = lazy(() => import("./CryptoMarketCapChart"));

export default function SpotMarket({ mode }) {

  return (
    <Box sx={{ 
      px: {
        xs: 0.5, md: 2
      }, 
      pb: 2, 
      pt: 0, 
      display: "flex", 
      flexDirection: 'column', 
      gap: 2 }}
    >
      <Header />
      <SpotFilterTable mode={mode} />
      <Suspense fallback={<p>Loading table...</p>}>
        <CryptoMarketCapChart />
      </Suspense>
      <AboutSpotMarket mode={mode} />
    </Box>
  );
}