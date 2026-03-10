import { Typography, Stack } from "@mui/material";
import { formatLargeDigits } from "../../../utils/formatLargeDigits";

export const Stats = ({ coin, currencySymbol }) => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      <Typography>
        Market Cap: {formatLargeDigits(coin.market_data.market_cap.usd, currencySymbol).toLocaleString()}
      </Typography>

      <Typography>
        24h Volume: {formatLargeDigits(coin.market_data.total_volume.usd, currencySymbol).toLocaleString()}
      </Typography>

      <Typography
        color={
          coin.market_data.price_change_percentage_24h > 0
            ? "success.main"
            : "error.main"
        }
      >
        24h Change: {formatLargeDigits(coin.market_data.price_change_percentage_24h, '')}%
      </Typography>
    </Stack>
  );
};
