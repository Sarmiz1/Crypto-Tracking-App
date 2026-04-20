import { Typography, Alert, Box, CircularProgress } from "@mui/material";
import CustomTable from "../../../../Components/CustomTable";
import CustomTabPanel from "../../../../Components/CustomTabPanel";
import { useContext, useMemo } from "react";
import { appContext } from "../../../../Context/AppContext";

export default function TopCoinTable({ value }) {

  const { cryptoListing, currency } = useContext(appContext);
  const { data: topCoins, loading: topLoading, error: topError } = cryptoListing;


  // Map CoinGecko data to match your table
  const mappedData = useMemo(() => {
    return topCoins?.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
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
  }, [topCoins]);


  return (
    <CustomTabPanel value={value} index={0}>
      {topLoading && <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress />
      </Box>}


      {topError ? (<Alert severity="error">Failed to load Table</Alert>)

        : mappedData?.length === 0 ? (
          <Typography sx={{ textAlign: "center", py: 8, my: -5 }}>
            No coin found
          </Typography>)

          : mappedData && <CustomTable coins={mappedData} currency={currency} />
      }


    </CustomTabPanel>
  );
}



