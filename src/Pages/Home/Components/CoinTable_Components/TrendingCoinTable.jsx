import { Typography, Alert } from "@mui/material";
import CustomTabPanel from "../../../../Components/CustomTabPanel";
import CustomTable from "../../../../Components/CustomTable";
import { useContext } from "react";
import { appContext } from "../../../../Context/AppContextProvider";

export default function TrendingCoinTable({ value }) {
  const { trendingCryptos, currency } = useContext(appContext);

  const { data, loading, error } = trendingCryptos;

  // Map CoinGecko data to match your table
  const trendingCoin = data?.map((coin) => ({
    id: coin.id,
    market_cap_rank: coin.market_cap_rank,
    name: coin.name,
    image: coin.image,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    total_supply: coin.total_supply,
    chart: coin.sparkline_in_7d?.price || [], // line chart
  }));


  return (
    <CustomTabPanel value={value} index={1}>
      {loading && <p>Loading coins...</p>}
      {error && <Alert severity="error">Failed to load Table</Alert>}
      {trendingCoin.length === 0 && (
        <Typography sx={{ textAlign: "center", py: 8 }}>
          No coin found
        </Typography>)}
      {data && <CustomTable coins={trendingCoin} currency={currency} />}
    </CustomTabPanel>
  );
}