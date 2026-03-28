import CustomTabPanel from "../../../../Components/CustomTabPanel";
import CustomTable from "../../../../Components/CustomTable";
import { useContext, useMemo } from "react";
import { appContext } from "../../../../Context/AppContextProvider";
import { CircularProgress, Box, Alert, Typography } from "@mui/material";

export default function MostVisitedCoinTable({ value }) {
  const { currency, cryptoListing } = useContext(appContext);
  const { data, loading, error } = cryptoListing || {};

  // Sort by useMemo (Most Visited Coin)
  const newCoins = useMemo(() => {
    if (!data) return [];

    return [...data]
      .filter((coin) => coin.market_cap_rank) // remove null ranks
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 20); // limit to 20 newest
  }, [data]);


  return (
    <CustomTabPanel value={value} index={4}>
      {loading ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )

        : error ? (
          <Alert severity="error">Failed to load Table</Alert>
        )

          : newCoins?.length === 0 ? (
            <Typography sx={{ textAlign: "center", py: 8, my: -5 }}>
              No coin found
            </Typography>
          )

            : (
              <CustomTable coins={newCoins} currency={currency} section='most-visited' />
            )
      }
    </CustomTabPanel>
  );
}
