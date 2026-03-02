import { Box, Alert } from "@mui/material";

export default function ErrorDisplay({message}) {
  return (
    <Box sx={{ px: 6, py: 4 }}>
      <Alert severity="error">{message}</Alert>
    </Box>
  );
}
