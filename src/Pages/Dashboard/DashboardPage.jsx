import { Box, Drawer, useMediaQuery, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";
import TabSection from "./Components/TabSection";
import TopAppBar from "./Components/TopAppBar";
import ModalSection from "./Components/ModalSection";
import SidebarContent from "./Components/SidebarContent";
import CustomTabPanel from "../../Components/CustomTabPanel";
import SpotMarket from "./Components/SpotMarket";
import Overview from "./Components/Overview";


export default function DashboardPage() {
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedCoin, setSelectedCoin] = useState(null);

  const [activeLink, setActiveLink] = useState("Market Overview");

  const { mode, setMode } = useContext(appContext);

  const isMobile = useMediaQuery("(max-width:900px)");

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: mode === "dark" ? "#121212" : "#f5f5f5",
        color: mode === "dark" ? "#fff" : "#000",
        minHeight: "100vh",
        overflowX: "hidden",
        mb: -7.99,
      }}
    >
      <title>Dashboard</title>
      {/* MOBILE DRAWER */}
      {isMobile && (
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <SidebarContent
            collapsed={false}
            setCollapsed={() => { }}
            setTab={setTab}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            setMobileOpen={setMobileOpen}
            screenSize={"small"}
          />
        </Drawer>
      )}

      {/* DESKTOP STICKY SIDEBAR */}
      {!isMobile && (
        <Box
          sx={{
            width: collapsed ? 80 : 250,
            flexShrink: 0,
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            borderRight: "1px solid",
            borderColor: "divider",
            transition: "width 0.3s",
            bgcolor: "background.paper",
            zIndex: 10,
          }}
        >
          <SidebarContent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setTab={setTab}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            setMobileOpen={setMobileOpen}
            screenSize={"large"}
          />
        </Box>
      )}

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, overflowX: "hidden" }}>
        <TopAppBar
          mode={mode}
          setMode={setMode}
          isMobile={isMobile}
          setMobileOpen={setMobileOpen}
        />

        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
          <TabSection
            tab={tab}
            setTab={setTab}
            darkMode={mode === "dark"}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
          />
          {/* Overview Tab */}
          <Overview tab={tab} setSelectedCoin={setSelectedCoin} />

          {/* Spot Tab */}
          <CustomTabPanel value={tab} index={1}>
            <SpotMarket mode={mode} />
          </CustomTabPanel>

          {/* Derivatives Tab */}
          <CustomTabPanel value={tab} index={2}>
            <Typography align="center">Coming soon..</Typography>
          </CustomTabPanel>
        </Box>
      </Box>

      <ModalSection
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
    </Box>
  );
}
