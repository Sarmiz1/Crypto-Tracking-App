import CustomTabPanel from "../../../Components/CustomTabPanel";
import CustomTable from "../../../Components/CustomTable";
import { useContext } from "react";
import { appContext } from "../../../Context/AppContextProvider";
import { Typography, Box } from "@mui/material";

export default function WatchlistTable({ value }) {
  const {
    watchList: { watchlist },
    currency,
  } = useContext(appContext);

  return (
    <CustomTabPanel value={value} index={2}>
      {watchlist.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 2,
            my: 3,
            height: "100%",
            display: "block",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Your watchlist is empty{" "}
          </Typography>
        </Box>
      ) : (
        <CustomTable
          coins={watchlist}
          currency={currency}
          section="watchlist"
        />
      )}
    </CustomTabPanel>
  );
}
