import { useState, useContext } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CustomTabPanel from "../../../../Components/CustomTabPanel";
import { appContext } from "../../../../Context/AppContextProvider";
import { categoryKeywords } from "../../Features/categoriesKeywords";
import TopTabs from "./PredictionMarkets_Components/TopTabs";
import DrawerForMobile from "./PredictionMarkets_Components/DrawerForMobile";
import GridContainer from "./PredictionMarkets_Components/GridContainer";


export default function PredictionMarket({ value }) {
  const [tab, setTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { mode, predictionMarkets } = useContext(appContext);
  const {
    data: predictionMarket,
    loading: predictionLoading,
    error: predictionError,
  } = predictionMarkets || {};

  const categories = ["all", "crypto", "politics", "economy", "sports"];

  const filteredMarkets =
    categories[tab] === "all"
      ? predictionMarket || []
      : (predictionMarket || []).filter((market) => {
        const questionLower = market.question?.toLowerCase() || "";
        return categoryKeywords[categories[tab]].some((kw) =>
          questionLower.includes(kw),
        );
      });



  return (
    <CustomTabPanel value={value} index={3}>
      <Box sx={{ p: 3 }}>
        {/* Top Tabs */}
        <TopTabs
          setOpenDrawer={setOpenDrawer}
          setTab={setTab}
          tab={tab}
          mode={mode}
        />

        {/* Drawer for mobile */}
        <DrawerForMobile
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          setTab={setTab}
          categories={categories}
        />

        {/* Content */}
        {predictionLoading ? (
          <Box sx={{
            mr: { md: 77, lg: 120 }, ml: { sm: 30, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: 2,
              }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>
              Loading prediction markets...
            </Typography>
          </Box>
        ) : predictionError ? (
          <Alert severity="error">Failed to load Market</Alert>
        ) : predictionMarket?.length === 0 ? (
          <Typography sx={{ textAlign: { xs: "center", sm: 'right', md: 'left' }, py: 8, my: -5, mr: { sm: 12 }, ml: { md: 4 } }}>
            No market found in {categories[tab]}
          </Typography>
        ) : (
          <GridContainer
            Date={Date}
            mode={mode}
            filteredMarkets={filteredMarkets}
          />
        )}
      </Box>
    </CustomTabPanel>
  );
}
