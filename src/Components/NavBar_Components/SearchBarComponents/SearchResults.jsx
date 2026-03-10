import { Box, Paper, Typography } from "@mui/material";

export const SearchResults = ({ results, handleOnClick }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        width: "100%",
        mt: 1,
        maxHeight: 300,
        overflowY: "auto",
        zIndex: 10,
      }}
    >
      {results.map((coin) => (
        <Box
          key={coin.id}
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            "&:hover": { background: "#f5f5f5" },
          }}
          onClick={() => handleOnClick(coin)}
        >
          <img src={coin.thumb} width="20" />

          <Typography variant="body2">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};
