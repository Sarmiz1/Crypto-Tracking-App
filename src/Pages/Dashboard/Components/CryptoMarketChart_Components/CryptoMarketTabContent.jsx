import { MarketInfo } from "../../../../utils/marketInfo";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#f7931a", "#627eea", "#e0e0e0"]; // BTC, ETH, Other

export default function CryptoMarketTabContent({ tabValue, loading }) {
  const { btcDominance, ethDominance } = MarketInfo() || {};

  const otherDominance =
    btcDominance && ethDominance
      ? 100 - btcDominance - ethDominance
      : 100;

  const breakdownData = [
    { name: "BTC", value: btcDominance || 0 },
    { name: "ETH", value: ethDominance || 0 },
    { name: "Other", value: otherDominance >= 0 ? otherDominance : 0 },
  ];

  // Overview labels
  if (tabValue === 0) {
    return (
      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Market Cap
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            $2.29T
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Volume
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            $94.08B
          </Typography>
        </Box>
      </Box>
    );
  }

  // Breakdown Pie chart
  if (tabValue === 1) {
    if (loading) {
      return (
        <Box sx={{ px: 2, py: 4 }}>
          <Typography>Loading Breakdown data...</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ width: "100%", height: 250, mb: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={breakdownData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              label={(entry) => `${entry.name} ${entry.value?.toFixed(1)}%`}
              isAnimationActive={true}     // ✅ Enable animation
              animationDuration={800}      // 0.8 seconds smooth transition
              animationEasing="ease-out"   // easing function
            >
              {breakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value?.toFixed(1)}%`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );
  }

  return null;
}