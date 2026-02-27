import { Box } from "@mui/material";
import CustomTable from "../../Components/CustomTable";

export default function Watchlist() {
  const coins = [
    {
      rank: 1,
      name: "Tether",
      symbol: "USDT",
      price: 0.99,
      change24h: 0.02,
      marketCap: "$99,995,578,123",
      volume: "$18,734,000,000",
      supply: "83.7B USDT",
      chart: [30, 25, 22, 18, 15, 12, 10],
    },
  ];

  return (
    <Box
      sx={{
        mt: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 2,
      }}
    >
      <CustomTable coins={coins} currency={'USD'}/>
    </Box>
  );
}
