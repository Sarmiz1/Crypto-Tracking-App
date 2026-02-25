import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useState, useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";
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
          mode={mode}
          setMode={setMode}
          isMobile={isMobile}
          setMobileOpen={setMobileOpen}
        />

        <Box sx={{ px: { xs: 2, md: 4 }, py: 3,}}>
          <TabSection tab={tab} setTab={setTab} darkMode={mode === "dark"} />

          <CustomTabPanel value={tab} index={0}>
            <OverviewHeader mode={mode} />
            <TopMarketCards setSelectedCoin={setSelectedCoin} mode={mode} />
            <IndexSection mode={mode} />
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
