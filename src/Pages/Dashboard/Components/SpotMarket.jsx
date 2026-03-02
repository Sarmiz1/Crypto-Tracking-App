import { Box } from "@mui/material";
import { Header } from "./SpotMarket_Components/Header";
import { SpotFilterTable } from "./SpotMarket_Components/SpotFilterTable";

export default function SpotMarket({ mode }) {
  const darkmode = mode === 'dark'

  return (
    <Box sx={{ px: 3, pb: 2, pt: 0 }}>
      <Header />
      <SpotFilterTable darkMode={darkmode} />
    </Box>
  );
}