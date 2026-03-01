import { useState, useMemo } from "react";
import { Box, Tabs, Tab, Typography, Divider, Paper, Chip, CircularProgress, Alert } from "@mui/material";
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
import { useMarketInfo } from "../../../utils/useMarketInfo";

export default function CryptoMarketCapChart({ mode }) {
  const [tabValue, setTabValue] = useState(0);

  // Get BTC/ETH dominance and Fear & Greed
  const { btcDominance, ethDominance, fearGreed } = useMarketInfo() || {};
  const { value: fearGreedValue, classification } = fearGreed || {};

  const getFearGreedColor = (value) => {
    if (!value) return "grey";
    if (value <= 25) return "red";
    if (value <= 45) return "orange";
    if (value <= 55) return "yellow";
    if (value <= 75) return "lightgreen";
    return "green";
  };
  const fearGreedColor = getFearGreedColor(fearGreedValue);

  // Only fetch historical data for 30d, 1y, All
  const days =
    tabValue === 2 ? 30 : tabValue === 3 ? 365 : tabValue === 4 ? "max" : null;

  const { data: historical, loading, error } = useFetch(
    days
      ? `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
      : null
  );

  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Transform historical data for Recharts
  const chartData = useMemo(() => {
    if (!historical?.market_caps || !historical?.total_volumes) return [];
    return historical.market_caps.map((item, index) => ({
      date: new Date(item[0]).toLocaleDateString(),
      marketCap: item[1] / 1e12, // Trillions
      volume: historical.total_volumes[index]?.[1] / 1e9 || 0, // Billions
    }));
  }, [historical]);

  // Bottom summary
  const summaryData = useMemo(() => {
    if (!chartData || chartData.length < 2) return [];
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
        color: marketCapChange >= 0 ? "success.main" : "error.main",
      },
      {
        label: "24h Volume",
        value: `$${latest.volume.toFixed(2)}B`,
        change: `${volumeChange >= 0 ? "+" : ""}${volumeChange.toFixed(2)}%`,
        color: volumeChange >= 0 ? "success.main" : "error.main",
      },
      { label: "BTC Dominance", value: btcDominance || "N/A" },
      { label: "ETH Dominance", value: ethDominance || "N/A" },
      {
        label: "Fear & Greed",
        value: `${fearGreedValue || "--"}/100 ${classification || ""}`,
        color: fearGreedColor,
      },
    ];
  }, [chartData, btcDominance, ethDominance, fearGreedValue, classification, fearGreedColor]);

  // Loading state
  if ((tabValue === 2 || tabValue === 3 || tabValue === 4) && loading)
    return (
      <Box sx={{ px: 6, py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  // Error state
  if (error)
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Failed to load Bitcoin historical data: {error}
      </Alert>
    );

  return (
    <Box
      sx={{
        py: 4,
        px: { xs: 2, md: 4 },
        bgcolor: mode === "dark" ? "#1a1a1a" : "background.default",
        borderRadius: 3,
        boxShadow: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title with subtle gradient background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: mode === "dark"
            ? "linear-gradient(180deg, rgba(30,30,30,0.8) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(250,249,246,0.8) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 3,
          position: "relative",
          zIndex: 2,
          color: mode === "dark" ? "#fff" : "text.primary",
        }}
      >
        Crypto Market Cap
      </Typography>

      {/* Tabs with better contrast */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{
          mb: 4,
          position: "relative",
          zIndex: 2,
          "& .MuiTab-root": {
            fontWeight: 600,
            color: mode === "dark" ? "#bbb" : "#555",
            "&.Mui-selected": {
              color: mode === "dark" ? "#fff" : "primary.main",
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.main",
            height: 3,
          },
        }}
      >
        <Tab label="Overview" />
        <Tab label="Breakdown" />
        <Tab label="30d" />
        <Tab label="1y" />
        <Tab label="All" />
      </Tabs>

      {/* Tab Content */}
      <CryptoMarketTabContent
        tabValue={tabValue}
        loading={loading}
        chartData={chartData}
      />

      {/* Historical charts with improved style */}
      {(tabValue === 2 || tabValue === 3 || tabValue === 4) && chartData.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            height: 280,
            mb: 4,
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: mode === "dark" ? "#222" : "#fff",
            border: `1px solid ${mode === "dark" ? "#444" : "#eee"}`,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
              <defs>
                <linearGradient id="marketCapGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef5350" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef5350" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: mode === "dark" ? "#aaa" : "#666" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: mode === "dark" ? "#222" : "#fff",
                  border: `1px solid ${mode === "dark" ? "#444" : "#ddd"}`,
                  borderRadius: 8,
                  color: mode === "dark" ? "#fff" : "#000",
                }}
              />
              <Legend
                verticalAlign="top"
                height={40}
                iconSize={12}
                wrapperStyle={{ color: mode === "dark" ? "#ddd" : "#333" }}
              />
              <Line
                type="monotone"
                dataKey="marketCap"
                stroke="#4caf50"
                strokeWidth={3}
                dot={false}
                name="Market Cap (T)"
                fill="url(#marketCapGradient)"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#ef5350"
                strokeWidth={3}
                dot={false}
                name="Volume (B)"
                fill="url(#volumeGradient)"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}

      {/* Bottom Summary – refined cards */}
      <BottomSummary summaryData={summaryData} />
    </Box>
  );
}