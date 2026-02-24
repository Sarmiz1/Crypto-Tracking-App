import { Typography, Box } from "@mui/material";

export default function OverviewHeader({ darkMode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: 3,
        mt: -2,
        gap: 1,
        minWidth: 0
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Crypto Market Overview
      </Typography>
      <Typography variant="body1" color={darkMode ? "grey.400" : "grey.600"}>
        Stay updated on the latest cryptocurrency market trends, including Bitcoin dominance, altcoin season, ETF net flows, and real-time market sentiment, all conveniently accessible in one place on CoinVerse.
      </Typography>
    </Box>
  );
}