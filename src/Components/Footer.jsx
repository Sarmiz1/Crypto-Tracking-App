import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LeftSideGrid from "./Footer_Components/LeftSideGrid";
import RightSideGrid from "./Footer_Components/RightSideGrid";
import AppsButton from "./Footer_Components/AppsButton";
import Copyrights from "./Footer_Components/Copyrights";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const textColor = isDark ? "#F4F4F4" : "#1A1A1A";
  const subTextColor = isDark ? "#B0B0B0" : "#555";

  return (
    <Box
      sx={{
        mt: 8,
        px: { xs: 3, md: 8 },
        py: 6,
        bgcolor: isDark ? "#1E1E1E" : "#FAF9F6",
      }}
    >
      {/* ===================== TOP SECTION ===================== */}
      <Grid
        container
        spacing={6}
        sx={{
          justifyContent: { md: "space-between" },
        }}
      >
        {/* Logo + Currency */}
        <LeftSideGrid isDark={isDark} textColor={textColor} />

        {/* Link Columns */}
        <RightSideGrid textColor={textColor} subTextColor={subTextColor} />
      </Grid>

      {/* ===================== DIVIDER ===================== */}
      <Box
        sx={{
          height: 1,
          bgcolor: isDark ? "#333" : "#E0E0E0",
          my: 6,
        }}
      />

      {/* ===================== BOTTOM SECTION ===================== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 3,
        }}
      >
        {/* Copyright */}
        <Copyrights subTextColor={subTextColor} />

        {/* App Buttons */}
        <AppsButton subTextColor={subTextColor} textColor={textColor} />
      </Box>
    </Box>
  );
}
