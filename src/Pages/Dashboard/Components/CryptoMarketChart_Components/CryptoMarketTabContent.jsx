import { Box, Tabs, Tab, Typography } from "@mui/material";


export default function CryptoMarketTabContent({ tabValue }) {
  return (
    <>
      {tabValue === 0 && (
        <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Market Cap
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              $2.29T
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Volume
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              $94.08B
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
