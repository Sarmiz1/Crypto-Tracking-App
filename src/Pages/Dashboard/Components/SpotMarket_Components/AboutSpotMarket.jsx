import { Box } from "@mui/material";
import { Header } from "./AboutSpot_Components/Header";
import { Contents } from "./AboutSpot_Components/Contents";

export default function AboutSpotMarket() {


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: 3,
        mt: 2,
        gap: 1,
        minWidth: 0,
        scrollBehavior: "smooth"
      }}
    >
      <Header />
      <Contents />
    </Box>
  )
}
