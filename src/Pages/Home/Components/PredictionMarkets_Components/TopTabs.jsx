import {
  Box,
  Tabs,
  Tab,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function TopTabs({ setOpenDrawer, setTab, tab, mode  }) {

  const isMobile = useMediaQuery("(max-width:900px)");

  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      {isMobile && (
        <IconButton onClick={() => setOpenDrawer(true)}>
          <MenuIcon sx={{ color: mode === "dark" ? "#fff" : "#000" }} />
        </IconButton>
      )}

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        textColor="inherit"
        indicatorColor="primary"
        variant={isMobile ? "scrollable" : "standard"}
      >
        <Tab label="All" />
        <Tab label="Crypto" />
        <Tab label="Politics" />
        <Tab label="Economy" />
        <Tab label="Sports" />
      </Tabs>
    </Box>
  );
}
