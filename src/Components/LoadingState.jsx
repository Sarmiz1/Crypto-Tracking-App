import { Box, CircularProgress } from "@mui/material";

export default function LoadingState() {
  return (
    <Box sx={{ px: 6, py: 6, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
