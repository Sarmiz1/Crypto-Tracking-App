import CustomTabPanel from "../../../Components/CustomTabPanel";
import CustomTable from "../../../Components/CustomTable";
import { useContext } from "react";
import { appContext } from "../../../Context/AppContextProvider";
import { Typography, Box } from "@mui/material";

export default function MostVisitedCoinTable({ value }) {
  const { currency } = useContext(appContext);

  const coins = [];

  return (
    <CustomTabPanel value={value} index={4}>
      {coins.length === 0 ? (
        <Box sx={{mt: 2, p: 4, mx: 'auto', textAlign: 'center' }}> 
          <Typography variant="h5">Coming soon...</Typography>
        </Box>
      ) : (
        <CustomTable coins={coins} currency={currency} />
      )}
    </CustomTabPanel>
  );
}
