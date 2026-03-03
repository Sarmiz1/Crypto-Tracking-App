import { Box } from "@mui/material";
import { Header } from "./SpotMarket_Components/Header";
import { SpotFilterTable } from "./SpotMarket_Components/SpotFilterTable";
import CryptoMarketCapChart from "./CryptoMarketCapChart";
import AboutSpotMarket from "./SpotMarket_Components/AboutSpotMarket";

export default function SpotMarket({ mode }) {

  return (
    <Box sx={{ 
      px: 3, 
      pb: 2, 
      pt: 0, 
      display: "flex", 
      flexDirection: 'column', 
      gap: 2 }}
    >
      <Header />
      <SpotFilterTable mode={mode} />
      <CryptoMarketCapChart />
      <AboutSpotMarket mode={mode} />
    </Box>
  );
}