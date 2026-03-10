import { Typography } from "@mui/material";
import currencyFormat from "../../../utils/currencyFormat";

export const Price = ({ coin, currencySymbol }) => {
  return (
    <Typography variant="h3" sx={{ mt: 3 }}>
      {currencyFormat(coin.market_data.current_price.usd, {
        symbol: currencySymbol
      }).toLocaleString()}
    </Typography>
  );
};
