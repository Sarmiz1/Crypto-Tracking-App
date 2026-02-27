import { 
  Box, 
  Grid, 
  Select, 
  MenuItem, 
} from "@mui/material";
import Logo from "../Logo";
import { useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";
export default function LeftSideGrid({ isDark, textColor }) {
  const {currency, setCurrency} = useContext(appContext);

  const handleCurrencyChange = (event) => {
    const newValue = {
      name: event.target.value,
      symbol: event.target.value === "USD" ? "$" : event.target.value === "NGN" ? "₦" : "€"
    }
    setCurrency(newValue);
  };

  return (
    <Grid item xs={12} md={3}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Logo */}
        <Logo />

        {/* Currency Select */}
        <Select
          defaultValue={currency.name}
          onChange={handleCurrencyChange}
          size="small"
          sx={{
            width: 180,
            bgcolor: isDark ? "#2A2A2A" : "#fff",
            color: textColor,
          }}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="NGN">NGN</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </Box>
    </Grid>
  );
}
