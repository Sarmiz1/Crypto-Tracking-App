import { Stack, Typography } from "@mui/material";
export const Header = ({ coin }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <img src={coin.image.large} width="60" />

      <Typography variant="h4">
        {coin.name} ({coin.symbol.toUpperCase()})
      </Typography>
    </Stack>
  );
};
