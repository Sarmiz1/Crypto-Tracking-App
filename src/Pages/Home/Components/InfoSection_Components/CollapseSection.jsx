import {
  Box,
  Typography,
  Collapse
} from "@mui/material";
import ChangeIndicator from "./ChangeIndicator";
import { useMarketInfo } from "../../../../utils/useMarketInfo";


export default function CollapseSection({ expanded, textColor }) {

  const { 
    marketVolume,
    volumeChange,
    defiVolume,
    defiVolumePercent,
    stableCoinVolume,
    stableCoinVolumePercent,
    btcDominance,
    btcDominanceChange
  } = useMarketInfo()


  return (
    <Collapse in={expanded}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ color: textColor }}>
          The total crypto market volume over the last 24 hours is {marketVolume},{" "}
          <ChangeIndicator value={volumeChange} /> decrease.
        </Typography>

        <Typography sx={{ color: textColor }}>
          The total volume in DeFi is currently {defiVolume}, {defiVolumePercent}% of total volume.
        </Typography>

        <Typography sx={{ color: textColor }}>
          The volume of all stable coins is now {stableCoinVolume}, {stableCoinVolumePercent}% of total volume.
        </Typography>

        <Typography sx={{ color: textColor }}>
          Bitcoin’s dominance is currently {btcDominance}%,{" "}
          <ChangeIndicator value={btcDominanceChange} /> over the day.
        </Typography>
      </Box>
    </Collapse>
  );
}
