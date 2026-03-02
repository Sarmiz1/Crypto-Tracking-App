import { Box, Typography, Button } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        Crypto ETFs Net Flow
      </Typography>

      <Button
        variant="text"
        size="small"
        sx={{ textTransform: "none", color: "primary.main" }}
      >
        See More
      </Button>
    </Box>
  );
}
