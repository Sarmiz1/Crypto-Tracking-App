import { Box } from "@mui/material";
import { generateETFData } from "../../../../Data/generateETFData";
import Header from "./CryptoETFsNetFlow_Components/Header";
import TabSection from "./CryptoETFsNetFlow_Components/Tabs";
import CurrentValue from "./CryptoETFsNetFlow_Components/CurrentValue";
import Chart from "./CryptoETFsNetFlow_Components/Chart";
import Footer from "./CryptoETFsNetFlow_Components/Footer";
import { useState, useMemo } from "react";

export default function CryptoETFsNetFlow({ mode }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // ⚡ Performance Optimization: Memoize heavy ETF dataset generation (2,200+ data points)
  // Prevents synchronous array allocations and loop executions on every re-render or tab toggle.
  const etf30d = useMemo(() => generateETFData(30), []);
  const etf1y = useMemo(() => generateETFData(365), []);
  const etfAll = useMemo(() => generateETFData(5 * 365), []);

  const chartData = useMemo(() => {
    switch (tabValue) {
      case 0:
        return etf30d;
      case 1:
        return etf1y;
      case 2:
        return etfAll;
      default:
        return etf30d;
    }
  }, [tabValue, etf30d, etf1y, etfAll]);
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
