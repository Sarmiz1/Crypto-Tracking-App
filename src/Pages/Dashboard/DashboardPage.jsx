import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";

import MarketTable from "./Components/MarketTable";
import TabSection from "./Components/TabSection";
import TopAppBar from "./Components/TopAppBar";
import ModalSection from "./Components/ModalSection";
import SidebarContent from "./Components/SidebarContent";
import CustomTabPanel from "../../Components/CustomTabPanel";
import OverviewHeader from "./Components/OverviewHeader";
import TopMarketCards from "./Components/TopMarketCards";
import IndexSection from "./Components/IndexSection";
import CryptoMarketCapChart from "./Components/CryptoMarketCapChart";

export default function DashboardPage() {
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        overflowX: "hidden",
        mb: -10 
      }}
    >
      {/* MOBILE DRAWER */}
      {isMobile && (
        <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <SidebarContent collapsed={false} setCollapsed={() => {}} />
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
          <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
        </Box>
      )}

      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, overflowX: "hidden" }}>
        <TopAppBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMobile={isMobile}
          setMobileOpen={setMobileOpen}
        />

        <Box sx={{ px: { xs: 2, md: 4 }, py: 3,}}>
          <TabSection tab={tab} setTab={setTab} darkMode={darkMode} />

          <CustomTabPanel value={tab} index={0}>
            <OverviewHeader darkMode={darkMode} />
            <TopMarketCards setSelectedCoin={setSelectedCoin} darkMode={darkMode} />
            <IndexSection darkMode={darkMode} />
            <CryptoMarketCapChart />
            {/* <AltcoinSeasonBar /> */}
            <MarketTable />
          </CustomTabPanel>

          {/* other tabs if any */}
        </Box>
      </Box>

      <ModalSection
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
      />
    </Box>
  );
}
