import { Box, Typography, LinearProgress } from "@mui/material";

export default function AltcoinSeasonBar() {
  return (
    <Box mt={6} sx={{ width: "100%", minWidth: 0 }}>
      <Typography fontWeight={700} mb={2}>
        Altcoin Season Index (32/100)
      </Typography>
      <LinearProgress
        variant="determinate"
        value={32}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
}