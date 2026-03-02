import { Box, Typography } from "@mui/material";
export const OverviewLabel = ({ marketCap, marketVolume }) => {
  return (
    <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Market Cap
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {marketCap}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          Volume
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {marketVolume}
        </Typography>
      </Box>
    </Box>
  );
};
