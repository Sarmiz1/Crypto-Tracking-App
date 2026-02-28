import CustomTable from "../../../Components/CustomTable";
import CustomTabPanel from "../../../Components/CustomTabPanel";
import { useContext, useMemo } from "react";
import { appContext } from "../../../Context/AppContextProvider";
import { CircularProgress, Box, Alert } from "@mui/material";

export default function NewCoinTable({ value }) { 
  const { currency, cryptoListing } = useContext(appContext);
  const { data, loading, error } = cryptoListing || {};

  // Sort by highest market_cap_rank (newest/lowest ranked coins)
  const newCoins = useMemo(() => {
    if (!data) return [];

    return [...data]
      .filter((coin) => coin.market_cap_rank) // remove null ranks
      .sort((a, b) => b.market_cap_rank - a.market_cap_rank)
      .slice(0, 50); // limit to 50 newest
  }, [data]);

  return (
    <CustomTabPanel value={value} index={5}>
      {loading ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <CustomTable coins={newCoins} currency={currency} section='new' />
      )}
    </CustomTabPanel>
  );
}