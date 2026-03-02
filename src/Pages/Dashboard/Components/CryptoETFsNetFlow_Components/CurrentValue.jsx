import { Typography } from "@mui/material";

export default function CurrentValue({ isPositive, latestFlow }) {
  return (
    <Typography
      variant="h4"
      fontWeight={700}
      sx={{
        color: isPositive ? "success.main" : "error.main",
        mb: 2,
      }}
    >
      {isPositive ? "+" : "-"}${Math.abs(latestFlow).toLocaleString()}M
    </Typography>
  );
}
