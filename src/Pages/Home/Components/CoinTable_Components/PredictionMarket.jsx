import { useState, memo, useMemo } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import CustomTabPanel from "../../../../Components/CustomTabPanel";
import { categoryKeywords } from "../../Features/categoriesKeywords";
import TopTabs from "./PredictionMarkets_Components/TopTabs";
import DrawerForMobile from "./PredictionMarkets_Components/DrawerForMobile";
import GridContainer from "./PredictionMarkets_Components/GridContainer";


const PredictionMarket = memo(({ value, predictionMarkets, mode }) => {
  const [tab, setTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    data: predictionMarket,
    loading: predictionLoading,
    error: predictionError,
  } = predictionMarkets || {};

  const categories = useMemo(() => ["all", "crypto", "politics", "economy", "sports"], []);

  const filteredMarkets = useMemo(() =>
    categories[tab] === "all"
      ? predictionMarket || []
      : (predictionMarket || []).filter((market) => {
        const questionLower = market.question?.toLowerCase() || "";
        return categoryKeywords[categories[tab]].some((kw) =>
          questionLower.includes(kw),
        );
      }), [categories, tab, predictionMarket]);



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
});

export default PredictionMarket;
