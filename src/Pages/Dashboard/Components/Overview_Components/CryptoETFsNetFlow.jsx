import { Box } from "@mui/material";
import { generateETFData } from "../../../../Data/generateETFData";
import Header from "./CryptoETFsNetFlow_Components/Header";
import TabSection from "./CryptoETFsNetFlow_Components/Tabs";
import CurrentValue from "./CryptoETFsNetFlow_Components/CurrentValue";
import Chart from "./CryptoETFsNetFlow_Components/Chart";
import Footer from "./CryptoETFsNetFlow_Components/Footer";
import { useState, useMemo, useCallback } from "react";

export default function CryptoETFsNetFlow({ mode }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((event, newValue) => {
    setTabValue(newValue);
  }, []);

  // Performance optimization: Generate ETF data on-demand for active tab only,
  // memoizing the result to avoid recreating 2,200+ objects on every component re-render.
  const chartData = useMemo(() => {
    const days = tabValue === 0 ? 30 : tabValue === 1 ? 365 : 5 * 365;
    return generateETFData(days);
  }, [tabValue]);
  const latestFlow = chartData[chartData.length - 1]?.flow || 0;
  const isPositive = latestFlow >= 0;

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        bgcolor: mode === "dark" ? "#222222" : "background.default",
        borderRadius: 3,
        boxShadow: 1,
        mt: 4,
      }}
    >
      <Header />

      <TabSection  tabValue={tabValue} handleTabChange={handleTabChange} />

      <CurrentValue isPositive={isPositive} latestFlow ={latestFlow} />

      <Chart chartData={chartData} />

      <Footer />
    </Box>
  );
}
