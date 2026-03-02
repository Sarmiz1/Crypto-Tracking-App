import { useMarketInfo } from "../../../../../utils/useMarketInfo";
import { Box, Typography } from "@mui/material";
import { OverviewLabel } from "./OverViewLabel";
import { Breakdown } from "./Breakdown";


export default function CryptoMarketTabContent({ tabValue, loading }) {
  const { btcDominance, ethDominance, marketCap, marketVolume } = useMarketInfo();

  

  // Overview labels
  if (tabValue === 0) {
    return (
      <OverviewLabel marketCap={marketCap} marketVolume={marketVolume} />
    );
  }

  // Breakdown Pie chart
  if (tabValue === 1) {
    if (loading) {
      return (
        <Box sx={{ px: 2, py: 4 }}>
          <Typography>Loading Breakdown data...</Typography>
        </Box>
      );
    }

    return (
      <Breakdown btcDominance={btcDominance} ethDominance={ethDominance} />
    );
  }

  return null;
}