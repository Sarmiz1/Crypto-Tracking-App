import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export default function SpotFilters({
  search,
  setSearch,
  marketType,
  setMarketType,
  darkMode
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <TextField
        label="Search Pair (BTC/USDT)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ minWidth: 250 }}
      />

      <ToggleButtonGroup
        value={marketType}
        exclusive
        onChange={(e, val) => val && setMarketType(val)}
        size="small"
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="CEX">CEX</ToggleButton>
        <ToggleButton value="DEX">DEX</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}