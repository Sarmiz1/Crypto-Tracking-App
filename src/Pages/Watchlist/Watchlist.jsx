import { Box, Typography } from "@mui/material";
import CustomTable from "../../Components/CustomTable";
import { useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";

export default function Watchlist() {
  const {
    watchList: { watchlist },
    currency,
  } = useContext(appContext);

  return (
    <Box sx={{ padding: 2 }}>
      {watchlist.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 2, mt: 2, height: '100%', display: 'block'}}>
          <Typography variant="h6" sx={{fontWeight: 500}}>Your watchlist is empty </Typography>
        </Box>
      ) : (
        <CustomTable
          coins={watchlist}
          currency={currency}
          section="watchlist"
        />
      )}
    </Box>
  );
}
