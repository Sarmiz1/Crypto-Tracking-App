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

  // Performance Optimization: Memoize generated ETF datasets across renders
  // to avoid synchronously re-generating 2,200+ objects on every render.
  const datasets = useMemo(
    () => ({
      30: generateETFData(30),
      365: generateETFData(365),
      1825: generateETFData(5 * 365),
    }),
    []
  );

  const chartData = useMemo(() => {
    switch (tabValue) {
      case 0:
        return datasets[30];
      case 1:
        return datasets[365];
      case 2:
        return datasets[1825];
      default:
        return datasets[30];
    }
  }, [tabValue, datasets]);
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
