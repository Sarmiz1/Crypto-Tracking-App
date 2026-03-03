import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function PortFolio() {
  return (
    <Box
      mt={4}
      p={4}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6" align="center">
        Comming Soon...
      </Typography>

      <Box sx={{ bgcolor: "blue", p: 1, borderRadius: 2 }}>
        <Link to={"/"}>Go back Home</Link>
      </Box>
    </Box>
  );
}
