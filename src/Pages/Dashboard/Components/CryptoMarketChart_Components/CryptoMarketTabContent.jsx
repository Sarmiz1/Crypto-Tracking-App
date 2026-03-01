import { useMarketInfo } from "../../../../utils/useMarketInfo";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#f7931a", "#627eea", "#e0e0e0"]; // BTC, ETH, Other

export default function CryptoMarketTabContent({ tabValue, loading }) {
  const { btcDominance, ethDominance } = useMarketInfo();

  // Safe numeric conversion + fallback
  const safeNum = (val) => (typeof val === 'number' && !isNaN(val) ? val : 0);

  const btc = safeNum(btcDominance);
  const eth = safeNum(ethDominance);
  const other = Math.max(0, 100 - btc - eth); // prevent negative

  const breakdownData = [
    { name: "BTC", value: btc },
    { name: "ETH", value: eth },
    { name: "Other", value: other },
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

    // Filter out zero/empty slices to avoid pie chart bugs
    const filteredData = breakdownData.filter(item => item.value > 0);

    return (
      <Box sx={{ width: "100%", height: 250, mb: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              // Fixed label: safe toFixed + fallback
              label={(entry) => {
                const val = typeof entry.value === 'number' && !isNaN(entry.value)
                  ? entry.value.toFixed(1)
                  : "0.0";
                return `${entry.name} ${val}%`;
              }}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => {
              const val = typeof value === 'number' && !isNaN(value)
                ? `${value.toFixed(1)}%`
                : "N/A";
              return val;
            }} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    );
  }

  return null;
}