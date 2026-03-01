import { useState, useMemo } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useFetch } from "../../../Hooks/useFetch";
import BottomSummary from "./CryptoMarketChart_Components/BottomSummary";
import CryptoMarketTabContent from "./CryptoMarketChart_Components/CryptoMarketTabContent";

export default function CryptoMarketCapChart({ mode }) {
  const [tabValue, setTabValue] = useState(2);

  // Only fetch when 30d, 1y, or All tab is selected
  const days =
    tabValue === 2 ? 30 :
    tabValue === 3 ? 365 :
    tabValue === 4 ? "max" :
    null;

  const {
    data: historical,
    loading,
    error,
  } = useFetch(
    days
      ? `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
      : null
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //  Transform API data safely
  const chartData = useMemo(() => {
    if (!historical?.market_caps || !historical?.total_volumes) return [];

    return historical.market_caps.map((item, index) => ({
      date: new Date(item[0]).toLocaleDateString(),
      marketCap: item[1] / 1e12, // Trillions
      volume: historical.total_volumes[index]?.[1] / 1e9 || 0, // Billions
    }));
  }, [historical]);

  //  Bottom summary calculation
  const summaryData = useMemo(() => {
    if (chartData.length < 2) return [];

    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];

    const marketCapChange =
      ((latest.marketCap - previous.marketCap) / previous.marketCap) * 100;

    const volumeChange =
      ((latest.volume - previous.volume) / previous.volume) * 100;

    return [
      {
        label: "Market Cap",
        value: `$${latest.marketCap.toFixed(2)}T`,
        change: `${marketCapChange >= 0 ? "+" : ""}${marketCapChange.toFixed(2)}%`,
      },
      {
        label: "24h Volume",
        value: `$${latest.volume.toFixed(2)}B`,
        change: `${volumeChange >= 0 ? "+" : ""}${volumeChange.toFixed(2)}%`,
      },
      { label: "BTC Dominance", value: "57.9%" },
      { label: "ETH Dominance", value: "10.4%" },
      { label: "Fear & Greed", value: "11/100" },
    ];
  }, [chartData]);

  // 🟡 Loading state (only for historical tabs)
  if ((tabValue === 2 || tabValue === 3 || tabValue === 4) && loading) {
    return (
      <Box sx={{ px: 6, py: 4 }}>
        <Typography>Loading historical market data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ px: 6, py: 4 }}>
        <Typography color="error">
          Failed to load Bitcoin historical data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        bgcolor: mode === "dark" ? "#222222" : "background.default",
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Crypto Market Cap
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Overview" />
        <Tab label="Breakdown" />
        <Tab label="30d" />
        <Tab label="1y" />
        <Tab label="All" />
      </Tabs>

      <CryptoMarketTabContent tabValue={tabValue} />

      {/* Chart only for historical tabs */}
      {(tabValue === 2 || tabValue === 3 || tabValue === 4) && (
        <Box sx={{ height: 220, mb: 2 }}>
          {chartData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis hide />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="marketCap"
                  stroke="#4caf50"
                  strokeWidth={2}
                  dot={false}
                  name="Market Cap (T)"
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#ef5350"
                  strokeWidth={2}
                  dot={false}
                  name="Volume (B)"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      )}

      <BottomSummary summaryData={summaryData} />
    </Box>
  );
}