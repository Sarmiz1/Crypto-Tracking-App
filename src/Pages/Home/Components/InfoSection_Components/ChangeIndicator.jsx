import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box"

export default function ChangeIndicator({ value }) {
  const isPositive = value >= 0;

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        color: isPositive ? "#16c784" : "#ea3943", // Coin-style colors
        fontWeight: 600
      }}
    >
      {isPositive ? (
        <ArrowDropUpIcon fontSize="small" />
      ) : (
        <ArrowDropDownIcon fontSize="small" />
      )}
      {Math.abs(value)}%
    </Box>
  );
}